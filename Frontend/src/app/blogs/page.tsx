"use client";

import { useEffect, useState } from 'react';
import BlogGrid from '../_components/Blogs/BlogGrid';

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function getBlogs() {
      try {
        setLoading(true);
        const cb = new Date().getTime();
        const res = await fetch(
          `https://public-api.wordpress.com/wp/v2/sites/obsidiansixblogs.wordpress.com/posts?_embed&cb=${cb}`,
          { method: 'GET', mode: 'cors' }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        const posts = Array.isArray(data) ? data : [];
        setAllPosts(posts);
        setFilteredPosts(posts);
      } catch (error) {
        console.error("Fetch error details:", error);
      } finally {
        setLoading(false);
      }
    }
    getBlogs();
  }, []);

  // Combined Filter Logic: Handles both Search Input and Category Buttons
  useEffect(() => {
    let results = allPosts;

    // 1. Filter by Category
    if (activeCategory !== "All") {
      results = results.filter((post) => 
        post.content.rendered.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter((post) => {
        const title = post.title.rendered.toLowerCase();
        const excerpt = post.excerpt.rendered.toLowerCase();
        return title.includes(query) || excerpt.includes(query);
      });
    }

    setFilteredPosts(results);
  }, [activeCategory, searchQuery, allPosts]);

  

return (
  <section className="relative min-h-screen bg-white pt-20 md:pt-32 lg:pt-40 pb-12 md:pb-24 overflow-hidden">
    {/* Background Decor - Reduced height for mobile to prevent weird scrolling */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 md:h-200 -z-10 pointer-events-none">
      <div className="absolute top-[-5%] left-[-5%] w-[80%] md:w-[40%] h-[40%] rounded-full bg-[#024787]/5 blur-[60px] md:blur-[120px]" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
      <header className="relative z-10 mb-8 md:mb-12">
       

        {/* Heading - Fluid typography and tighter leading for mobile */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 leading-[0.95] md:leading-[0.9] mb-8 text-center md:text-left">
          Stories & <br className="block md:hidden" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#024787] to-blue-400">
            Perspectives.
          </span>
        </h1>

        {/* SEARCH INPUT - Full width on mobile, max-width on desktop */}
        <div className="relative w-full max-w-xl mx-auto md:mx-0 mb-6 group">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // Adjusting padding and font size for touch friendliness (16px prevents iOS zoom on focus)
            className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#024787]/10 focus:border-[#024787] transition-all text-base text-slate-800 placeholder:text-slate-400"
          />
          <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#024787]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        {loading ? (
          <div className="py-20 md:py-24 text-center flex flex-col items-center gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-slate-100 border-t-[#024787] rounded-full animate-spin"></div>
            <p className="text-sm md:text-base text-slate-400 font-medium">Loading stories...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <BlogGrid posts={filteredPosts} />
        ) : (
          <div className="py-16 md:py-24 px-6 text-center border-2 border-dashed border-slate-100 rounded-2xl md:rounded-3xl bg-slate-50/50">
            <h2 className="text-lg md:text-xl font-bold text-slate-400">
              No stories found matching <span className="text-slate-600 italic">{searchQuery || activeCategory}</span>
            </h2>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All")}}
              className="mt-4 text-[#024787] font-bold underline decoration-2 underline-offset-4"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  </section>
);
}