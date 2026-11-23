const sanitizeHtml = require('sanitize-html');
const { marked } = require('marked');
const Blog = require('../models/Blog');

const WP_API =
  'https://public-api.wordpress.com/wp/v2/sites/obsidiansixblogs.wordpress.com/posts';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

// Only tags a blog post needs. Scripts, styles, forms and event handlers are removed.
const SANITIZE_OPTIONS = {
  allowedTags: [
    'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'blockquote',
    'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'sub', 'sup',
    'a', 'img', 'figure', 'figcaption', 'code', 'pre', 'span', 'div',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'iframe',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    iframe: ['src', 'width', 'height', 'title', 'allow', 'allowfullscreen', 'frameborder'],
    th: ['colspan', 'rowspan', 'scope'],
    td: ['colspan', 'rowspan'],
    '*': ['id'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesAppliedToAttributes: ['href', 'src'],
  allowProtocolRelative: false,
  // Only YouTube and Vimeo embeds.
  allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'],
  transformTags: {
    // A post has one H1 (its title), so any H1 in the body becomes an H2.
    h1: 'h2',
    a: (tagName, attribs) => {
      const href = attribs.href || '';
      const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?obsidiansix\.com/i.test(href);
      if (external) {
        return { tagName, attribs: { ...attribs, target: '_blank', rel: 'noopener noreferrer' } };
      }
      const { target, rel, ...rest } = attribs;
      return { tagName, attribs: rest };
    },
    img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy' } }),
  },
};

function cleanContent(content, format) {
  let html = String(content || '');
  if (format === 'markdown') html = marked.parse(html, { gfm: true, breaks: false });
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };

/** Strips tags and decodes entities, so titles like "SEO & Ads" stay readable. */
function plainText(html) {
  return sanitizeHtml(String(html || ''), { allowedTags: [], allowedAttributes: {} })
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m])
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim();
}

function trimTo(text, max) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

function cleanList(value) {
  const list = Array.isArray(value) ? value : String(value || '').split(',');
  return [...new Set(list.map((t) => String(t).trim()).filter(Boolean))].slice(0, 20);
}

/** Only fields an editor or the API may set. Everything else is computed. */
function pickFields(body) {
  const out = {};
  // Plain-text fields: any HTML in them is stripped.
  const str = (k) => {
    if (body[k] !== undefined) out[k] = plainText(body[k] ?? '');
  };
  ['title', 'excerpt', 'coverImage', 'coverImageAlt', 'author', 'category'].forEach(str);

  if (body.slug !== undefined) out.slug = Blog.toSlug(body.slug);
  if (body.tags !== undefined) out.tags = cleanList(body.tags);
  if (body.content !== undefined) out.content = cleanContent(body.content, body.contentFormat);

  if (body.status !== undefined) {
    if (!['draft', 'published', 'scheduled'].includes(body.status)) {
      const err = new Error("status must be 'draft', 'published' or 'scheduled'");
      err.status = 400;
      throw err;
    }
    out.status = body.status;
  }
  if (body.publishedAt !== undefined) {
    const d = body.publishedAt ? new Date(body.publishedAt) : null;
    if (d && isNaN(d.getTime())) {
      const err = new Error('publishedAt is not a valid date');
      err.status = 400;
      throw err;
    }
    out.publishedAt = d;
  }

  if (body.seo && typeof body.seo === 'object') {
    const s = body.seo;
    out.seo = {
      metaTitle: plainText(s.metaTitle ?? ''),
      metaDescription: plainText(s.metaDescription ?? ''),
      focusKeyword: plainText(s.focusKeyword ?? ''),
      canonicalUrl: String(s.canonicalUrl ?? '').trim(),
      ogImage: String(s.ogImage ?? '').trim(),
      noindex: Boolean(s.noindex),
    };
  }

  if (body.faq !== undefined) {
    out.faq = (Array.isArray(body.faq) ? body.faq : [])
      .map((f) => ({
        question: plainText(f && f.question),
        answer: plainText(f && f.answer),
      }))
      .filter((f) => f.question && f.answer)
      .slice(0, 20);
  }

  // A post without an excerpt gets one from its first paragraph.
  if (out.content && !out.excerpt && body.excerpt === undefined) {
    const firstParagraph = (out.content.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1];
    out.excerpt = trimTo(plainText(firstParagraph || out.content), 220);
  }
  return out;
}

const LIVE_FILTER = () => ({
  $or: [
    { status: 'published' },
    { status: 'scheduled', publishedAt: { $lte: new Date() } },
  ],
});

async function slugTaken(slug, exceptId) {
  const q = { $or: [{ slug }, { previousSlugs: slug }] };
  if (exceptId) q._id = { $ne: exceptId };
  return Blog.exists(q);
}

function handleError(res, error, label) {
  if (error.status) return res.status(error.status).json({ success: false, message: error.message });
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ success: false, message });
  }
  if (error.code === 11000) {
    return res.status(409).json({ success: false, message: 'A post with this slug already exists' });
  }
  console.error(`${label}:`, error.message);
  return res.status(500).json({ success: false, message: 'Server error' });
}

/* ------------------------------------------------------------------ */
/* Public                                                              */
/* ------------------------------------------------------------------ */

// @route GET /api/blogs?page=1&limit=12&category=SEO&tag=ads
const getPublishedBlogs = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 12));
    const filter = LIVE_FILTER();
    if (typeof req.query.category === 'string' && req.query.category) filter.category = req.query.category;
    if (typeof req.query.tag === 'string' && req.query.tag) filter.tags = req.query.tag;

    const [items, total] = await Promise.all([
      Blog.find(filter)
        .select('-content -previousSlugs -faq -wordpressId')
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Blog.countDocuments(filter),
    ]);

    res.json({ success: true, page, limit, total, pages: Math.ceil(total / limit), data: items });
  } catch (error) {
    handleError(res, error, 'Get Blogs Error');
  }
};

// @route GET /api/blogs/slug/:slug
// Returns { redirect: "<new-slug>" } when the slug was renamed.
const getBlogBySlug = async (req, res) => {
  try {
    const slug = Blog.toSlug(req.params.slug);
    const post = await Blog.findOne({ slug, ...LIVE_FILTER() }).select('-previousSlugs -wordpressId').lean();
    if (post) return res.json({ success: true, data: post });

    const renamed = await Blog.findOne({ previousSlugs: slug, ...LIVE_FILTER() }).select('slug').lean();
    if (renamed) return res.json({ success: true, redirect: renamed.slug });

    res.status(404).json({ success: false, message: 'Post not found' });
  } catch (error) {
    handleError(res, error, 'Get Blog Error');
  }
};

/* ------------------------------------------------------------------ */
/* Admin + API key                                                     */
/* ------------------------------------------------------------------ */

// @route GET /api/blogs/admin/all?status=draft&q=seo
const getAllBlogsAdmin = async (req, res) => {
  try {
    const filter = {};
    if (['draft', 'published', 'scheduled'].includes(req.query.status)) filter.status = req.query.status;
    if (typeof req.query.q === 'string' && req.query.q.trim()) {
      const q = req.query.q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [{ title: new RegExp(q, 'i') }, { slug: new RegExp(q, 'i') }];
    }
    const items = await Blog.find(filter).select('-content').sort({ updatedAt: -1 }).lean();
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    handleError(res, error, 'Admin Get Blogs Error');
  }
};

// @route GET /api/blogs/admin/:id
const getBlogByIdAdmin = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).lean();
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (error) {
    handleError(res, error, 'Admin Get Blog Error');
  }
};

// @route POST /api/blogs
// Body: { title, content, contentFormat?: "html" | "markdown", slug?, excerpt?, status?, seo?, faq?, ... }
const createBlog = async (req, res) => {
  try {
    const fields = pickFields(req.body || {});
    if (!fields.title) return res.status(400).json({ success: false, message: 'Please add a title' });
    if (!fields.slug) fields.slug = Blog.toSlug(fields.title);
    if (!fields.slug) return res.status(400).json({ success: false, message: 'Could not make a slug from the title' });

    if (await slugTaken(fields.slug)) {
      return res.status(409).json({
        success: false,
        message: `The slug '${fields.slug}' is already used. Choose a different slug.`,
      });
    }

    fields.source = req.user && req.user.viaApiKey ? 'api' : 'cms';
    const post = await Blog.create(fields);
    res.status(201).json({ success: true, message: 'Post created', data: post });
  } catch (error) {
    handleError(res, error, 'Create Blog Error');
  }
};

// @route PUT /api/blogs/:id
const updateBlog = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const fields = pickFields(req.body || {});
    if (fields.slug === '') delete fields.slug;

    if (fields.slug && fields.slug !== post.slug) {
      if (await slugTaken(fields.slug, post._id)) {
        return res.status(409).json({ success: false, message: `The slug '${fields.slug}' is already used.` });
      }
      // Keep the old URL working: it will redirect to the new slug.
      if (post.isLive() && !post.previousSlugs.includes(post.slug)) post.previousSlugs.push(post.slug);
      post.previousSlugs = post.previousSlugs.filter((s) => s !== fields.slug);
    }

    Object.assign(post, fields);
    if (fields.seo) post.markModified('seo');
    await post.save();
    res.json({ success: true, message: 'Post updated', data: post });
  } catch (error) {
    handleError(res, error, 'Update Blog Error');
  }
};

// @route DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    handleError(res, error, 'Delete Blog Error');
  }
};

// @route POST /api/blogs/upload  (multipart field "image")
const uploadBlogImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Please upload an image file' });
  if (!/^image\//.test(req.file.mimetype)) {
    return res.status(400).json({ success: false, message: 'Only image files are allowed here' });
  }
  res.json({ success: true, message: 'Image uploaded', path: `/uploads/${req.file.filename}` });
};

// @route POST /api/blogs/import/wordpress?overwrite=false
// Copies every post from the old WordPress.com blog into the CMS, keeping slugs and dates.
const importFromWordPress = async (req, res) => {
  const overwrite = req.query.overwrite === 'true';
  const summary = { created: 0, updated: 0, skipped: 0, failed: [] };
  try {
    for (let page = 1; page <= 20; page++) {
      const r = await fetch(`${WP_API}?per_page=50&page=${page}&_embed`);
      if (r.status === 400) break; // past the last page
      if (!r.ok) throw new Error(`WordPress returned ${r.status}`);
      const posts = await r.json();
      if (!Array.isArray(posts) || posts.length === 0) break;

      for (const wp of posts) {
        try {
          const slug = Blog.toSlug(wp.slug);
          const existing = await Blog.findOne({ $or: [{ wordpressId: wp.id }, { slug }] });
          if (existing && !overwrite) {
            summary.skipped++;
            continue;
          }
          const media = wp._embedded && wp._embedded['wp:featuredmedia'] && wp._embedded['wp:featuredmedia'][0];
          const terms = (wp._embedded && wp._embedded['wp:term']) || [];
          const categories = (terms[0] || []).map((t) => t.name).filter((n) => n && n !== 'Uncategorized');
          const tags = (terms[1] || []).map((t) => t.name);
          const content = cleanContent(wp.content && wp.content.rendered, 'html');
          const title = plainText(wp.title && wp.title.rendered);

          const data = {
            title,
            slug,
            content,
            excerpt: trimTo(plainText(wp.excerpt && wp.excerpt.rendered).replace(/\[…\]|\[\.\.\.\]/g, '').trim(), 220),
            coverImage: (media && media.source_url) || '',
            coverImageAlt: (media && media.alt_text) || title,
            category: categories[0] || '',
            tags: cleanList(tags),
            status: 'published',
            publishedAt: new Date(wp.date_gmt ? wp.date_gmt + 'Z' : wp.date),
            source: 'wordpress',
            wordpressId: wp.id,
          };

          if (existing) {
            Object.assign(existing, data);
            await existing.save();
            summary.updated++;
          } else {
            await Blog.create(data);
            summary.created++;
          }
        } catch (err) {
          summary.failed.push({ slug: wp.slug, error: err.message });
        }
      }
      if (posts.length < 50) break;
    }
    res.json({ success: true, message: 'WordPress import finished', ...summary });
  } catch (error) {
    console.error('WordPress Import Error:', error.message);
    res.status(502).json({ success: false, message: `Import failed: ${error.message}`, ...summary });
  }
};

module.exports = {
  getPublishedBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  getBlogByIdAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  importFromWordPress,
};
