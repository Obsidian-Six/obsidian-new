const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, trim: true, default: '' },
    answer: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const SeoSchema = new mongoose.Schema(
  {
    // Shown in Google. Falls back to the post title when empty.
    metaTitle: { type: String, trim: true, maxlength: 120, default: '' },
    // Shown under the title in Google. Falls back to the excerpt.
    metaDescription: { type: String, trim: true, maxlength: 320, default: '' },
    // The main keyword this post should rank for. Used for the SEO checklist.
    focusKeyword: { type: String, trim: true, default: '' },
    // Leave empty to use https://obsidiansix.com/blogs/<slug>/
    canonicalUrl: { type: String, trim: true, default: '' },
    // Image for WhatsApp, LinkedIn, Facebook and X previews. Falls back to cover image.
    ogImage: { type: String, trim: true, default: '' },
    // Hide this post from Google.
    noindex: { type: Boolean, default: false },
  },
  { _id: false }
);

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Please add a title'], trim: true, maxlength: 200 },
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only use lowercase letters, numbers and dashes'],
    },
    // Old slugs keep working and redirect to the current one.
    previousSlugs: { type: [String], default: [], index: true },
    excerpt: { type: String, trim: true, maxlength: 500, default: '' },
    // Sanitised HTML. Markdown sent by the API is converted to HTML on save.
    content: { type: String, default: '' },
    coverImage: { type: String, trim: true, default: '' },
    coverImageAlt: { type: String, trim: true, default: '' },
    author: { type: String, trim: true, default: 'Obsidian Six' },
    category: { type: String, trim: true, default: '' },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled'],
      default: 'draft',
      index: true,
    },
    // For scheduled posts this is when the post goes live.
    publishedAt: { type: Date, index: true },
    seo: { type: SeoSchema, default: () => ({}) },
    faq: { type: [FaqSchema], default: [] },
    wordCount: { type: Number, default: 0 },
    readingTime: { type: Number, default: 1 },
    source: { type: String, enum: ['cms', 'api', 'wordpress'], default: 'cms' },
    wordpressId: { type: Number, index: true, sparse: true },
  },
  { timestamps: true }
);

BlogSchema.index({ status: 1, publishedAt: -1 });

/** "Hello World! 2026" -> "hello-world-2026" */
BlogSchema.statics.toSlug = function toSlug(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
    .replace(/-+$/g, '');
};

BlogSchema.pre('validate', function () {
  if (!this.slug && this.title) this.slug = this.constructor.toSlug(this.title);

  const text = String(this.content || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  this.wordCount = words;
  this.readingTime = Math.max(1, Math.round(words / 220));

  if (this.status !== 'draft' && !this.publishedAt) this.publishedAt = new Date();
});

/** Is this post visible on the public site right now? */
BlogSchema.methods.isLive = function isLive(now = new Date()) {
  if (this.status === 'published') return true;
  return this.status === 'scheduled' && this.publishedAt && this.publishedAt <= now;
};

module.exports = mongoose.model('Blog', BlogSchema);
