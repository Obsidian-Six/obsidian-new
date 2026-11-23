import BlogPostClient from './BlogPostClient';
import { cache } from 'react';
import { pageMeta, breadcrumbSchema, jsonLd, SITE_URL } from '@/lib/seo';

const WP_API = 'https://public-api.wordpress.com/wp/v2/sites/obsidiansixblogs.wordpress.com/posts';

type WpPost = {
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string }[] };
};

function stripHtml(html: string) {
  return (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&hellip;|&#8230;|\[…\]|\[&hellip;\]/g, '…')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimTo(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

const getPost = cache(async (slug: string): Promise<WpPost | null> => {
  try {
    const res = await fetch(`${WP_API}?slug=${encodeURIComponent(slug)}&_embed`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    const posts = await res.json();
    return Array.isArray(posts) && posts.length ? posts[0] : null;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return pageMeta({ path: `/blogs/${slug}`, title: 'Blog', description: 'Read this article on the Obsidian Six blog.' });
  }
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  return pageMeta({
    path: `/blogs/${slug}`,
    title: trimTo(stripHtml(post.title.rendered), 55),
    description: trimTo(stripHtml(post.excerpt.rendered), 158),
    image,
  });
}

// ISR: Revalidate the page in the background at most every 60 seconds
export const revalidate = 60;

/**
 * Pre-renders the most recent 100 blog posts at build time 
 * to ensure lightning-fast initial loads.
 */
export async function generateStaticParams() {
  try {
    const res = await fetch(
      'https://public-api.wordpress.com/wp/v2/sites/obsidiansixblogs.wordpress.com/posts?per_page=100'
    );
    const posts = await res.json();
    if (!Array.isArray(posts)) return [];
    return posts.map((p: any) => ({ slug: p.slug }));
  } catch (err) {
    console.error('generateStaticParams error:', err);
    return [];
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  const post = await getPost(resolved.slug);

  // Passing a 'key' tied to the slug forces the Client Component 
  // to reset its internal state whenever the user navigates between different blogs.
  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: stripHtml(post.title.rendered),
              description: trimTo(stripHtml(post.excerpt.rendered), 300),
              datePublished: post.date,
              dateModified: post.modified,
              image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
              mainEntityOfPage: `${SITE_URL}/blogs/${resolved.slug}/`,
              author: { '@type': 'Organization', name: 'Obsidian Six' },
              publisher: { '@id': `${SITE_URL}/#organization` },
            }),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blogs' },
              { name: post ? stripHtml(post.title.rendered) : resolved.slug, path: `/blogs/${resolved.slug}` },
            ])
          ),
        }}
      />
      <BlogPostClient key={resolved.slug} slug={resolved.slug} />
    </>
  );
}