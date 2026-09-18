// "use client";

// import { useRef, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
// import templateCaseStudiesData from "@/lib/store/template-case-studies";
// import { getSlug } from "@/lib/utils";

// const CARDS_VISIBLE = 3;

// export default function OurBlogs() {
//   const [startIndex, setStartIndex] = useState(0);
//   const trackRef = useRef<HTMLDivElement>(null);

//   const studies = templateCaseStudiesData;
//   const total = studies.length;
//   const canPrev = startIndex > 0;
//   const canNext = startIndex + CARDS_VISIBLE < total;

//   const prev = () => setStartIndex((i) => Math.max(0, i - 1));
//   const next = () =>
//     setStartIndex((i) => Math.min(total - CARDS_VISIBLE, i + 1));

//   const visible = studies.slice(startIndex, startIndex + CARDS_VISIBLE);

//   return (
//     <section id="case-studies" className="scroll-mt-36 mx-auto max-w-7xl overflow-hidden px-6 py-12 md:px-10">
//       {/* Header row */}
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
//           Case Studies
//         </h2>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={prev}
//             disabled={!canPrev}
//             className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 ${
//               canPrev
//                 ? "border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50"
//                 : "border-slate-200 text-slate-300 cursor-not-allowed"
//             }`}
//             aria-label="Previous case study"
//           >
//             <ArrowLeft size={15} />
//           </button>
//           <button
//             onClick={next}
//             disabled={!canNext}
//             className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 ${
//               canNext
//                 ? "border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50"
//                 : "border-slate-200 text-slate-300 cursor-not-allowed"
//             }`}
//             aria-label="Next case study"
//           >
//             <ArrowRight size={15} />
//           </button>
//         </div>
//       </div>

//       {/* Cards grid */}
//       <div
//         ref={trackRef}
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
//       >
//         {visible.map((study, idx) => (
//           <motion.div
//             key={study.id}
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.35, delay: idx * 0.07 }}
//           >
//             <Link
//               href={`/case-studies/${getSlug(study.slug)}`}
//               className="group block"
//             >
//               {/* Image */}
//               <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
//                 <Image
//                   src={study.image}
//                   alt={study.name}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                   unoptimized
//                 />
//                 {/* Hover overlay */}
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-end p-4">
//                   <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md">
//                     <ArrowUpRight size={15} className="text-slate-900" />
//                   </span>
//                 </div>
//               </div>

//               {/* Meta below image */}
//               <div className="mt-4 space-y-1.5">
//                 <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
//                   {study.category}
//                 </p>
//                 <h3 className="text-[15px] font-medium text-slate-900 leading-snug group-hover:text-slate-600 transition-colors">
//                   {study.name}
//                 </h3>
//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-1.5 pt-1">
//                   {study.tags.slice(0, 3).map((tag) => (
//                     <span
//                       key={tag}
//                       className="text-[10px] px-2 py-0.5 border border-slate-200 rounded-full text-slate-500 whitespace-nowrap"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* View all CTA */}
//       <div className="flex justify-center mt-12">
//         <Link
//           href="/case-studies"
//           className="inline-flex items-center gap-2.5 px-8 py-3 border border-slate-900 text-slate-900 text-sm font-medium rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300 group os-btn-slide"
//         >
//           View all works
//           <ArrowRight
//             size={14}
//             className="group-hover:translate-x-1 transition-transform"
//           />
//         </Link>
//       </div>
//     </section>
//   );
// }
// src/app/_components/Blogs/OurBlogs.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import BlogCard from "../common/BlogCard";
import { getBlogs, type BlogPost } from "../common/blogs.data";
import Button from "../common/Button";

const CARDS_VISIBLE = 3;

export default function OurBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadBlogs = async () => {
      try {
        setLoading(true);

        const data = await getBlogs();

        if (!cancelled) {
          setPosts(data);
        }
      } catch (error) {
        console.error("OurBlogs fetch error:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Only calculate visible posts when
   * posts/startIndex changes.
   */
  const visiblePosts = useMemo(() => {
    return posts.slice(startIndex, startIndex + CARDS_VISIBLE);
  }, [posts, startIndex]);

  const maxIndex = Math.max(0, posts.length - CARDS_VISIBLE);

  const canPrev = startIndex > 0;
  const canNext = startIndex < maxIndex;

  const prev = () => {
    setStartIndex((current) => Math.max(0, current - 1));
  };

  const next = () => {
    setStartIndex((current) => Math.min(maxIndex, current + 1));
  };

  return (
    <section
      id="our-blogs"
      className="scroll-mt-36 mx-auto max-w-7xl overflow-hidden px-6 py-12 md:px-10 md:py-16"
    >
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-light tracking-tight text-slate-900 md:text-4xl">
          Our Blogs
        </h2>

        {/* ARROWS */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={!canPrev}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200

              ${
                canPrev
                  ? "border-slate-300 text-slate-700 hover:border-slate-900 hover:bg-slate-50 hover:text-slate-900"
                  : "cursor-not-allowed border-slate-200 text-slate-300"
              }
            `}
            aria-label="Previous blog"
          >
            <ArrowLeft size={15} />
          </button>

          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200

              ${
                canNext
                  ? "border-slate-300 text-slate-700 hover:border-slate-900 hover:bg-slate-50 hover:text-slate-900"
                  : "cursor-not-allowed border-slate-200 text-slate-300"
              }
            `}
            aria-label="Next blog"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div
          className="flex min-h-[300px] items-center justify-center
          "
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-9 w-9 animate-spin rounded-full border-4 border-slate-100 border-t-[#052D69]
              "
            />

            <p className="text-sm text-slate-400">Loading blogs...</p>
          </div>
        </div>
      ) : posts.length === 0 ? (
        /* EMPTY */
        <div
          className="flex min-h-[250px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50 text-center
          "
        >
          <p className="text-slate-400">Coming Soon...</p>
        </div>
      ) : (
        <>
          {/* BLOG CARDS */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {visiblePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.07,
                }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          {/* VIEW ALL */}
          <div className="mt-12 flex justify-center">
            {/* <Link
              href="/blogs"
              className="os-btn-slide group inline-flex items-center gap-2.5 rounded-full border border-slate-900 px-8 py-3 text-sm font-medium text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white"
            >
              View all blogs
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link> */}
            <Button hlink="/blogs" text="View all blogs" />
          </div>
        </>
      )}
    </section>
  );
}
