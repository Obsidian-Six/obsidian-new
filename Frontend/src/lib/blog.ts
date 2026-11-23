/**
 * Blog data for the public site.
 *
 * Posts come from the Obsidian Six CMS (api.obsidiansix.com/api/blogs).
 * Until the old WordPress.com posts are imported into the CMS, the site falls
 * back to WordPress so no post disappears during the switch.
 */

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSeo {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface CmsPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  coverImageAlt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  wordCount?: number;
  seo?: BlogSeo;
  faq?: BlogFaq[];
}

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const WP_API = "https://public-api.wordpress.com/wp/v2/sites/obsidiansixblogs.wordpress.com/posts";

/** Turns "/uploads/x.jpg" from the CMS into a full URL. */
export function mediaUrl(path?: string): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&#39;": "'",
  "&nbsp;": " ", "&#8217;": "’", "&#8216;": "‘", "&#8220;": "“", "&#8221;": "”",
  "&#8211;": "–", "&#8212;": "—", "&#8230;": "…", "&hellip;": "…",
};

export function stripHtml(html?: string): string {
  return (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[#a-z0-9]+;/gi, (m) => ENTITIES[m] ?? m)
    .replace(/\[…\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function trimTo(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

async function getJson<T>(url: string, revalidate = 60): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate }, signal: AbortSignal.timeout(5000) });
    if (!res.ok && res.status !== 404) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/* ---------------- WordPress fallback ---------------- */

type WpPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  jetpack_featured_media_url?: string;
  _embedded?: { "wp:featuredmedia"?: { source_url?: string; alt_text?: string }[] };
};

function fromWordPress(p: WpPost): CmsPost {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const title = stripHtml(p.title.rendered);
  const words = stripHtml(p.content.rendered).split(" ").filter(Boolean).length;
  return {
    title,
    slug: p.slug,
    excerpt: trimTo(stripHtml(p.excerpt.rendered), 220),
    content: p.content.rendered,
    coverImage: p.jetpack_featured_media_url || media?.source_url || "",
    coverImageAlt: media?.alt_text || title,
    author: "Obsidian Six",
    publishedAt: p.date,
    updatedAt: p.modified,
    wordCount: words,
    readingTime: Math.max(1, Math.round(words / 220)),
  };
}

/* ---------------- Public helpers ---------------- */

/** Every live post, newest first. */
export async function getAllPosts(limit = 100): Promise<CmsPost[]> {
  const cms = await getJson<{ success: boolean; data: CmsPost[] }>(`${API_BASE}/api/blogs?limit=${limit}`);
  if (cms?.success && Array.isArray(cms.data) && cms.data.length > 0) return cms.data;

  const wp = await getJson<WpPost[]>(`${WP_API}?per_page=${Math.min(limit, 100)}&_embed`, 3600);
  return Array.isArray(wp) ? wp.map(fromWordPress) : [];
}

export type PostLookup = { post: CmsPost } | { redirect: string } | null;

/** One post by slug, or a redirect when the slug was renamed in the CMS. */
export async function getPost(slug: string): Promise<PostLookup> {
  const cms = await getJson<{ success: boolean; data?: CmsPost; redirect?: string }>(
    `${API_BASE}/api/blogs/slug/${encodeURIComponent(slug)}`
  );
  if (cms?.success && cms.redirect) return { redirect: cms.redirect };
  if (cms?.success && cms.data) return { post: cms.data };

  const wp = await getJson<WpPost[]>(`${WP_API}?slug=${encodeURIComponent(slug)}&_embed`, 3600);
  if (Array.isArray(wp) && wp[0]) return { post: fromWordPress(wp[0]) };
  return null;
}

/* ---------------- Card adapter ---------------- */

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Shape used by the existing BlogCard component (WordPress-style fields). */
export function toCardPost(p: CmsPost, index = 0) {
  return {
    id: index,
    slug: p.slug,
    date: p.publishedAt || p.updatedAt || new Date().toISOString(),
    title: { rendered: escapeHtml(p.title) },
    excerpt: { rendered: escapeHtml(p.excerpt || "") },
    content: { rendered: "" },
    jetpack_featured_media_url: mediaUrl(p.coverImage) || undefined,
    category: p.category || "",
    coverImageAlt: p.coverImageAlt || p.title,
  };
}
