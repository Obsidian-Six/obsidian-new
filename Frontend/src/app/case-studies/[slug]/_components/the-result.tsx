"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";

export default function TheResult({ ele }: { ele: TemplateCaseStudy }) {
  if (!ele.results || ele.results.length < 1) return null;

  return (
    <section className="bg-[#fafafa] py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* --- 1. REFINED HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-purple-600 font-bold block mb-4">
            03 — The Transformation
          </span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-[#19183A] leading-none uppercase">
            The <span className="italic font-serif text-slate-400">Results</span>
          </h2>
          <div className="h-1 w-20 bg-purple-600 mt-6 hidden md:block" />
        </motion.div>

        {/* --- 2. COMPACT EXHIBIT GRID --- */}
        <div className="space-y-32 md:space-y-40">
          {ele.results.map((result, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
              >
                {/* Visual Content: Floating Image Frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 relative group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl shadow-black/5 bg-white p-2">
                    <motion.div
                      className="relative w-full h-full overflow-hidden rounded-xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        alt={result.title}
                        src={result.img}
                        fill
                        className="object-contain transition-transform duration-700"
                        unoptimized
                      />
                    </motion.div>
                  </div>

                  {/* Floating Result Badge (Glassmorphism) */}
                  <div className={`absolute -top-6 ${isEven ? "-left-6" : "-right-6"} z-20`}>
                    <div className="bg-white/80 backdrop-blur-md border border-white shadow-xl w-16 h-16 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-light text-purple-600">0{index + 1}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-[1px] w-8 bg-purple-600" />
                      <span className="text-[10px] text-slate-400 font-bold tracking-[0.3em] uppercase">
                        Milestone
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-light text-[#19183A] mb-6 leading-tight tracking-tight">
                      {result.title} <br />
                      <span className="text-purple-600 font-medium italic text-2xl md:text-3xl">
                        {result.highlight}
                      </span>
                    </h3>

                    <p className="text-lg text-slate-500 font-light leading-relaxed max-w-md">
                      {result.data}
                    </p>

                    <motion.div
                      className="mt-8 flex gap-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: "auto" }}
                    >
                      {[1, 2, 3].map((dot) => (
                        <div key={dot} className="h-1 w-1 rounded-full bg-purple-600/30" />
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}