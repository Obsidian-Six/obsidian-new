import { getAllPosts, toCardPost } from "@/lib/blog";
import BlogListClient from "./BlogListClient";

// Fresh posts from the CMS appear within a minute without a redeploy.
export const revalidate = 60;

export default async function BlogPage() {
  const posts = (await getAllPosts(100)).map((p, i) => toCardPost(p, i));

  return (
    <section className="relative min-h-screen bg-white pt-20 md:pt-32 lg:pt-40 pb-12 md:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 md:h-200 -z-10 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[80%] md:w-[40%] h-[40%] rounded-full bg-[#052D69]/5 blur-[60px] md:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <header className="relative z-10 mb-8 md:mb-12">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#052D69] text-center md:text-left">
            Obsidian Six Blog
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 leading-[0.95] md:leading-[0.9] mb-6 text-center md:text-left">
            Stories &amp; <br className="block md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#052D69] to-blue-400">
              Perspectives.
            </span>
          </h1>
          <p className="mb-8 max-w-2xl text-base md:text-lg text-slate-600 text-center md:text-left">
            Practical articles on SEO, paid ads, social media, branding and websites for businesses in India and the UAE.
          </p>
        </header>

        <div className="relative z-10">
          <BlogListClient posts={posts} />
        </div>
      </div>
    </section>
  );
}
