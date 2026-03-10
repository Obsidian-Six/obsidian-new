import BlogPostClient from './BlogPostClient';

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

  // Passing a 'key' tied to the slug forces the Client Component 
  // to reset its internal state whenever the user navigates between different blogs.
  return <BlogPostClient key={resolved.slug} slug={resolved.slug} />;
}