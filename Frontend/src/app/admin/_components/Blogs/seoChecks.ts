export interface BlogDraft {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  category: string;
  tags: string;
  status: "draft" | "published" | "scheduled";
  publishedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
    canonicalUrl: string;
    ogImage: string;
    noindex: boolean;
  };
  faq: { question: string; answer: string }[];
}

export interface SeoCheck {
  label: string;
  ok: boolean;
  tip: string;
  weight: number;
}

export function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
    .replace(/-+$/g, "");
}

function text(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
}

/** Title as Google will show it: the SEO title, or the post title plus the brand. */
export function effectiveTitle(d: BlogDraft) {
  return d.seo.metaTitle || (d.title ? `${d.title} | Obsidian Six` : "");
}

export function effectiveDescription(d: BlogDraft) {
  return d.seo.metaDescription || d.excerpt || text(d.content).slice(0, 160);
}

export function runSeoChecks(d: BlogDraft): { checks: SeoCheck[]; score: number; words: number } {
  const body = text(d.content);
  const words = body ? body.split(" ").length : 0;
  const kw = d.seo.focusKeyword.trim().toLowerCase();
  const title = effectiveTitle(d);
  const desc = effectiveDescription(d);
  const firstPara = text((d.content.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || "").toLowerCase();
  const h2Count = (d.content.match(/<h2[\s>]/gi) || []).length;
  const imgs = d.content.match(/<img [^>]*>/gi) || [];
  const imgsMissingAlt = imgs.filter((i) => !/alt="[^"]+"/i.test(i)).length;
  const links = Array.from(d.content.matchAll(/<a [^>]*href="([^"]+)"/gi)).map((m) => m[1] || "");
  const internal = links.filter((h) => h.startsWith("/") || /obsidiansix\.com/i.test(h)).length;
  const external = links.length - internal;
  const kwSlug = toSlug(kw);

  const checks: SeoCheck[] = [
    { label: "Focus keyword is set", ok: Boolean(kw), weight: 10, tip: "Pick the one search phrase this post should rank for." },
    { label: "Keyword in the SEO title", ok: Boolean(kw) && title.toLowerCase().includes(kw), weight: 10, tip: "Put the focus keyword near the start of the title." },
    { label: "Keyword in the meta description", ok: Boolean(kw) && desc.toLowerCase().includes(kw), weight: 6, tip: "Mention the keyword once in the description." },
    { label: "Keyword in the URL", ok: Boolean(kwSlug) && d.slug.includes(kwSlug), weight: 6, tip: "Keep the slug short and include the keyword." },
    { label: "Keyword in the first paragraph", ok: Boolean(kw) && firstPara.includes(kw), weight: 6, tip: "Say what the post is about in the first two sentences." },
    { label: "SEO title is 30–60 characters", ok: title.length >= 30 && title.length <= 60, weight: 8, tip: `Now ${title.length}. Google cuts titles longer than about 60 characters.` },
    { label: "Meta description is 120–160 characters", ok: desc.length >= 120 && desc.length <= 160, weight: 8, tip: `Now ${desc.length}. Write it as a short reason to click.` },
    { label: "At least 600 words", ok: words >= 600, weight: 10, tip: `Now ${words} words. Most pages that rank cover the topic in depth.` },
    { label: "Uses H2 subheadings", ok: h2Count >= 2, weight: 8, tip: "Break the post into sections with at least two H2 headings." },
    { label: "Links to another Obsidian Six page", ok: internal >= 1, weight: 8, tip: "Link to a service page, case study or another post." },
    { label: "Links to an outside source", ok: external >= 1, weight: 4, tip: "Cite one trustworthy source (Google docs, a study, a news report)." },
    { label: "Cover image with alt text", ok: Boolean(d.coverImage && d.coverImageAlt), weight: 6, tip: "Add a cover image and describe it in the alt text." },
    { label: "All images in the post have alt text", ok: imgsMissingAlt === 0, weight: 5, tip: `${imgsMissingAlt} image(s) have no alt text.` },
    { label: "Slug is short", ok: Boolean(d.slug) && d.slug.length <= 60 && d.slug.split("-").length <= 8, weight: 5, tip: "Aim for 3–6 words in the URL." },
  ];

  const total = checks.reduce((s, c) => s + c.weight, 0);
  const got = checks.reduce((s, c) => s + (c.ok ? c.weight : 0), 0);
  return { checks, score: Math.round((got / total) * 100), words };
}
