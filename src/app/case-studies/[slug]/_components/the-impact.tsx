"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";
import ScrollSection from "../../../_components/ScrollReveal/Scroll-section";

export default function TheImpact({ ele }: { ele: TemplateCaseStudy }) {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="bg-white pt-20">
      {/* 1. TITLE & 2. IMPACT LIST (In centered container) */}
      <div className="w-[90%] md:w-[80%] mx-auto mb-32">
        
        {/* --- 1. RESTORED TITLE SECTION ANIMATION --- */}
        <div className="flex flex-col items-center justify-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-light tracking-tighter text-[#19183A] text-center uppercase"
          >
            The <span className="italic font-serif text-slate-400">Impact</span>
          </motion.h2>

          {/* SVG Animated Underline */}
          <motion.svg width="148" height="14" viewBox="0 0 148 14" fill="none" className="w-24 md:w-48 mt-4">
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              d="M1 11C30 4 118 -3 147 11"
              stroke="#024787"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>

        {/* --- 2. RESTORED IMPACT LIST STAGGERED ANIMATION --- */}
        <div className="space-y-16">
          {ele.impacts.map((item: any, j: number) => (
            <motion.div 
              key={j} 
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: j * 0.1, duration: 0.8 }} // Staggers each item
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-32 items-center">
                <div className="relative">
                  {/* Floating Number with Hover Transition */}
                  <span className="absolute -left-8 -top-8 text-slate-50 text-8xl font-bold -z-10 group-hover:text-purple-50 transition-colors duration-500">
                    0{j + 1}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-light text-[#19183A] leading-tight tracking-tight group-hover:text-[#024787] transition-colors duration-500">
                    {item.name}
                  </h3>
                </div>
                <p className="text-lg md:text-xl font-light text-slate-500 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* Animated Divider Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-slate-100 h-[1px] mt-12 group-hover:bg-[#024787]/30 transition-colors duration-500 origin-left" 
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- 3. THE FULL SCREEN BLACK SECTION --- */}
      <div className="w-full relative">
        <ScrollSection paragraph={ele.detail} />
      </div>

      {/* --- 4. FINAL LOGO SECTION --- */}
      <div className="w-[90%] md:w-[80%] mx-auto py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ rotateY: 5, rotateX: 2, scale: 1.02 }}
          viewport={{ once: true }}
          className="flex justify-center perspective-1000"
        >
          <div className="p-10 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-purple-900/5 transition-all duration-500">
            <Image
              src="/images/logo/logo2.png"
              alt="Client Logo"
              width={240}
              height={120}
              className="h-40 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}