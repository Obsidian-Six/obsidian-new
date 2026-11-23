import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import BlogSidebarForm from "../../_components/Blogs/BlogsSidebarForm";
import { getAllPosts, getPost, mediaUrl, stripHtml, trimTo, type CmsPost } from "@/lib/blog";
import { pageMeta, breadcrumbSchema, faqSchema, jsonLd, canonicalUrl, SITE_URL } from "@/lib/seo";

// Edits in the CMS show up within a minute.
export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

function headingId(text: string) {
  return stripHtml(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Adds ids to H2/H3 headings (for the table of contents) and returns the list. */
function withHeadingIds(html: string) {
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
    const text = stripHtml(inner);
    if (!text) return match;
    const existing = /\sid="([^"]+)"/i.exec(attrs)?.[1];
    let id = existing || headingId(text) || `section-${toc.length + 1}`;
    while (!existing && used.has(id)) id = `${id}-${toc.length + 1}`;
    used.add(id);
    toc.push({ id, text, level: Number(level) as 2 | 3 });
    return existing ? match : `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
  return { html: out, toc };
}

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const found = await getPost(slug);
  if (!found || "redirect" in found) return {};
  const post = found.post;
  const seo = post.seo || {};
  const meta = pageMeta({
    path: `/blogs/${post.slug}`,
    title: trimTo(seo.metaTitle || post.title, 60),
    absoluteTitle: Boolean(seo.metaTitle),
    description: trimTo(seo.metaDescription || post.excerpt || stripHtml(post.content).slice(0, 200), 160),
    image: mediaUrl(seo.ogImage || post.coverImage) || undefined,
    noIndex: seo.noindex,
  });
  return {
    ...meta,
    alternates: { canonical: seo.canonicalUrl || canonicalUrl(`/blogs/${post.slug}`) },
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author || "Obsidian Six"],
      tags: post.tags,
    },
    ...(post.tags?.length ? { keywords: post.tags } : {}),
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const found = await getPost(slug);
  if (!found) notFound();
  if ("redirect" in found) permanentRedirect(`/blogs/${found.redirect}/`);

  const post: CmsPost = found.post;
  const { html, toc } = withHeadingIds(post.content || "");
  const cover = mediaUrl(post.coverImage);
  const url = canonicalUrl(`/blogs/${post.slug}`);
  const related = (await getAllPosts(4)).filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt,
    image: cover || `${SITE_URL}/images/logo/logo2.png`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    wordCount: post.wordCount,
    keywords: post.tags?.join(", "),
    articleSection: post.category || undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: post.author || "Obsidian Six", url: `${SITE_URL}/` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blogs" },
              { name: post.title, path: `/blogs/${post.slug}` },
            ])
          ),
        }}
      />
      {post.faq && post.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(post.faq)) }} />
      )}

      {/* HEADER */}
      <section className="pt-32 md:pt-44 pb-12 md:pb-16 bg-[#E6F0F9]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left">
            <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
              <ol className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <li><Link href="/" className="hover:text-[#052D69]">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/blogs/" className="hover:text-[#052D69]">Blog</Link></li>
                {post.category && (
                  <>
                    <li aria-hidden="true">/</li>
                    <li>{post.category}</li>
                  </>
                )}
              </ol>
            </nav>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tighter">
              {post.title}
            </h1>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6 text-slate-600 text-sm md:text-base font-semibold">
              <span className="text-[#052D69]">By {post.author || "Obsidian Six"}</span>
              {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
              <span className="flex items-center gap-2 opacity-80">
                <span className="w-1.5 h-1.5 bg-[#052D69] rounded-full" />
                {post.readingTime || 1} min read
              </span>
            </div>
          </div>

          {cover && (
          <div className="w-full lg:flex-1 relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-white bg-slate-200">
            <Image
              src={cover}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </div>
          )}
        </div>
      </section>

      {/* BODY */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <article className="lg:col-span-8 order-1 min-w-0">
            {toc.length >= 3 && (
              <nav aria-label="Table of contents" className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="w-full">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">In this article</p>
                <ol className="space-y-2 text-sm">
                  {toc.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                      <a href={`#${h.id}`} className="text-[#052D69] hover:underline">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
                </div>
              </nav>
            )}

            {html ? (
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <p className="text-slate-500">This article has no content yet.</p>
            )}

            {post.faq && post.faq.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">Frequently asked questions</h2>
                <div className="divide-y divide-slate-200 border-y border-slate-200">
                  {post.faq.map((f) => (
                    <details key={f.question} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                        <h3 className="text-lg font-semibold text-slate-900">{f.question}</h3>
                        <span aria-hidden="true" className="text-xl text-[#052D69] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-base leading-8 text-slate-700">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {post.tags && post.tags.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((t) => (
                  <li key={t} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </article>

          <aside className="lg:col-span-4 order-2">
            <div className="lg:sticky lg:top-28 bg-[#F9F9FB] p-6 md:p-4 rounded-3xl border border-slate-200 shadow-sm max-h-[calc(100vh-150px)] overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#052D69] mb-4 md:mb-6 tracking-tight">
                Book Free Consultation
              </h2>
              <BlogSidebarForm />
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-12 md:py-20 border-t border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">More articles</h2>
              <Link href="/blogs/" className="text-[#052D69] font-black text-sm uppercase tracking-widest hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {related.map((p) => (
                <Link href={`/blogs/${p.slug}/`} key={p.slug} className="group space-y-5">
                  <div className="aspect-[16/10] bg-slate-200 rounded-3xl overflow-hidden relative shadow-lg">
                    <Image
                      src={mediaUrl(p.coverImage) || "/images/gradient-hero.png"}
                      alt={p.coverImageAlt || p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-xl md:text-2xl group-hover:text-[#052D69] transition-colors line-clamp-2 leading-tight tracking-tight">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
