"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BlogSidebarForm from '../../_components/Blogs/BlogsSidebarForm';

/**
 * HELPER: Extracts the featured image from WordPress data
 */
const getPostImage = (post: any) => {
  if (!post) return '/founder.jpg';
  if (post.jetpack_featured_media_url) return post.jetpack_featured_media_url;
  const embeddedImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  if (embeddedImage) return embeddedImage;
  const contentMatch = post.content.rendered.match(/<img [^>]*src="([^"]+)"/);
  return contentMatch ? contentMatch[1] : '/founder.jpg';
};

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<any>(null);
  const [morePosts, setMorePosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const cb = new Date().getTime();

        const postRes = await fetch(
          `https://public-api.wordpress.com/wp/v2/sites/obsidiansixblogs.wordpress.com/posts?slug=${slug}&_embed&cb=${cb}`
        );
        const posts = await postRes.json();
        
        if (posts && posts.length > 0) {
          setPost(posts[0]);
          
          const allRes = await fetch(
            `https://public-api.wordpress.com/wp/v2/sites/obsidiansixblogs.wordpress.com/posts?_embed&per_page=4&cb=${cb}`
          );
          const allPosts = await allRes.json();
          if (Array.isArray(allPosts)) {
            setMorePosts(allPosts.filter((p: any) => p.slug !== slug).slice(0, 3));
          }
        }
      } catch (err) {
        console.error("Failed to fetch blog data:", err);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }

    if (slug) {
      loadData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-100 border-t-[#5A00EC] rounded-full animate-spin"></div>
          <div className="text-[#5A00EC] font-bold">Loading Story...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-40 text-center text-slate-500 font-bold min-h-screen">
        Post not found
      </div>
    );
  }

  const imageUrl = getPostImage(post);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. HERO/HEADER SECTION */}
      <section className="pt-32 md:pt-44 pb-12 md:pb-16 bg-[#F3E8FF]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tighter"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6 text-slate-600 text-sm md:text-base font-bold">
               <span className="text-[#5A00EC] italic underline decoration-[#5A00EC] underline-offset-4">By Obsidian Six</span>
               <span className="opacity-70">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
               <span className="hidden sm:flex items-center gap-2 opacity-70">
                 <span className="w-1.5 h-1.5 bg-[#5A00EC] rounded-full"></span> 
                 10 min read
               </span>
            </div>
          </div>

          <div className="w-full lg:flex-1 relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-white bg-slate-200">
            <Image
              src={imageUrl}
              alt="featured"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTION */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8 order-1">
  {post.content?.rendered ? (
    <div 
      className="wp-content-styled prose prose-lg md:prose-2xl max-w-none 
      /* Main Body Text: Pure Black & Bold */
      text-black font-bold
      prose-p:text-black prose-p:leading-[1.8] prose-p:font-bold prose-p:opacity-100
      
      /* Headings: Heavy Black */
      prose-headings:text-black prose-headings:font-black prose-headings:opacity-100
      
      /* Lists & Bullets */
      prose-li:text-black prose-li:font-bold prose-li:marker:text-black
      
      /* Strong/Bold tags inside WP */
      prose-strong:text-black prose-strong:font-black
      
      /* Links */
      prose-a:text-[#5A00EC] prose-a:font-black prose-a:underline
      
      /* Blockquotes */
      prose-blockquote:text-black prose-blockquote:border-l-black prose-blockquote:font-bold"
      dangerouslySetInnerHTML={{ __html: post.content.rendered }}
    />
  ) : (
    <p className="text-black font-black text-2xl italic">No content available for this post.</p>
  )}
</div>

          <aside className="lg:col-span-4 order-2">
            <div className="lg:sticky lg:top-28 bg-[#F9F9FB] p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#5A00EC] mb-4 md:mb-6 tracking-tight">Book Free Consultation</h3>
              <div className="overflow-visible">
                 <BlogSidebarForm />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. RELATED POSTS */}
      <section className="py-12 md:py-20 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">More Blogs</h2>
            <Link href="/blogs" className="text-[#5A00EC] font-black text-sm uppercase tracking-widest hover:underline">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {morePosts.map((p: any) => {
              const pImg = getPostImage(p);
              return (
                <Link href={`/blogs/${p.slug}`} key={p.id} className="group space-y-5">
                  <div className="aspect-[16/10] bg-slate-200 rounded-3xl overflow-hidden relative shadow-lg">
                    <Image 
                      src={pImg}
                      alt="thumbnail"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                  </div>
                  <p 
                    className="font-extrabold text-slate-900 text-xl md:text-2xl group-hover:text-[#5A00EC] transition-colors line-clamp-2 leading-tight tracking-tight"
                    dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}