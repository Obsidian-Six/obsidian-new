"use client";

import { useMemo, useState } from "react";
import BlogGrid from "../_components/Blogs/BlogGrid";
import type { BlogPost } from "../_components/common/blogs.data";

/** Search and category filter over posts that were already rendered on the server. */
export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean) as string[]);
    return ["All", ...Array.from(set).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.title.rendered.toLowerCase().includes(q) || p.excerpt.rendered.toLowerCase().includes(q)
      );
    });
  }, [posts, query, category]);

  return (
    <>
      <div className="relative w-full max-w-xl mx-auto md:mx-0 mb-6 group">
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <input
          id="blog-search"
          type="search"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#052D69]/10 focus:border-[#052D69] transition-all text-base"
        />
      </div>

      {categories.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === c
                  ? "border-[#052D69] bg-[#052D69] text-white"
                  : "border-slate-200 text-slate-600 hover:border-[#052D69] hover:text-[#052D69]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <BlogGrid posts={filtered} />
      ) : (
        <div className="py-16 md:py-24 px-6 text-center border-2 border-dashed border-slate-100 rounded-2xl md:rounded-3xl bg-slate-50/50">
          <p className="text-lg md:text-xl font-bold text-slate-400">
            {posts.length === 0 ? "New articles are on the way." : "No articles match your search."}
          </p>
          {posts.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-4 text-[#052D69] font-bold underline decoration-2 underline-offset-4"
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </>
  );
}
