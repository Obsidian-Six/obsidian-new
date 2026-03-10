"use client";
import { motion } from "framer-motion";
import type { CaseStudyApproachItem } from "@/lib/models/case-study.types";

export default function ApproachSection({
  approaches,
}: {
  approaches: CaseStudyApproachItem[];
}) {
  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden perspective-2000">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-purple-600 font-medium tracking-[0.4em] text-[10px] uppercase mb-3">
            Strategy & Execution
          </h2>
          {/* UPDATED: Changed to font-light and tracking-tight to match the "The client faced..." style */}
          <p className="text-3xl md:text-5xl font-light text-[#19183A] tracking-tight leading-tight">
            Our Approach
          </p>
          <div className="h-1 w-12 bg-purple-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* 3D Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 preserve-3d">
          {approaches.map((approach, index) => {
            const isLastOdd = approaches.length % 2 !== 0 && index === approaches.length - 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                className={`group relative preserve-3d ${isLastOdd ? "md:col-span-2 md:max-w-xl md:mx-auto" : ""}`}
              >
                {/* 3D Floating Card Container */}
                <motion.div
                  whileHover={{ 
                    rotateY: index % 2 === 0 ? 8 : -8,
                    rotateX: 5,
                    translateZ: 50
                  }}
                  className="relative h-full bg-white border border-slate-100 rounded-3xl p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_30px_60px_rgba(90,0,236,0.1)] transition-all duration-500 preserve-3d"
                >
                  {/* LAYER 1: Large Ghost Number */}
                  <div 
                    className="absolute -top-4 -right-4 opacity-[0.05] pointer-events-none select-none transition-transform duration-700 group-hover:translate-z-[-100px] group-hover:scale-110"
                    style={{ transform: "translateZ(-50px)" }}
                  >
                    <span className="text-[120px] font-extralight text-[#19183A] leading-none">
                      0{index + 1}
                    </span>
                  </div>

                  {/* LAYER 2: Main Content */}
                  <div className="relative z-10 preserve-3d" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-600 text-white text-xs font-bold shadow-lg shadow-purple-200">
                        {index + 1}
                      </div>
                      {/* UPDATED: Changed card titles to font-light to match the reference style */}
                      <h3 className="text-base font-light text-[#19183A] uppercase tracking-widest">
                        {approach.name}
                      </h3>
                    </div>

                    {/* UPDATED: Changed body text to font-light and slightly larger to match the image precisely */}
                    <p className="text-lg text-slate-700 leading-relaxed font-light tracking-wide">
                      {approach.detail}
                    </p>
                  </div>

                  {/* LAYER 3: Interactive Accent */}
                  <motion.div 
                    style={{ transform: "translateZ(60px)" }}
                    className="absolute -bottom-2 -left-2 w-12 h-12 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-colors"
                  />

                  {/* Aesthetic Bottom Progress Trace */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-slate-50 overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="w-full h-full bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                    />
                  </div>
                </motion.div>
                
                {/* 3D Drop Shadow Projection */}
                <div className="absolute inset-0 bg-black/5 rounded-3xl blur-2xl translate-y-8 scale-90 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
