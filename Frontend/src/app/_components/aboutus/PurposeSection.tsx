"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const purposeItems = [
  { icon: "🚀", title: "Purposeful Creativity", desc: "Design driven by intention, not just aesthetics." },
  { icon: "📈", title: "Strategic Growth", desc: "Scaling businesses with data-driven precision." },
  { icon: "💡", title: "Digital Innovation", desc: "Building future-proof tech solutions." },
  { icon: "🎯", title: "Brand Dominance", desc: "Securing your position as a market leader." }
];

export function PurposeContent() {
  const containerRef = useRef(null);
  
  // We use a smaller scroll range so the items rotate quickly as you pass the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTransform = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "-75%"]);

  return (
    <div ref={containerRef} className="relative w-full py-20 md:py-32 overflow-hidden bg-transparent">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#052D69]/5 blur-[120px] rounded-full z-0 pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 max-w-7xl mx-auto w-full">
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-60 font-mono block mb-6 text-[#052D69] font-medium">
            [ Our Purpose ]
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-slate-900">
            Obsidian Six: Crafting the <span className="italic font-serif">digital edge</span> your brand deserves
          </h2>
        </motion.div>

        <div className="lg:col-span-5 flex flex-col items-start lg:pl-12">
          {/* Masked Scroll Area - Adjusted height to fit exactly one item at a time */}
          <div className="h-[200px] overflow-hidden relative w-full" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' }}>
            <motion.div style={{ y: yTransform }} className="flex flex-col w-full">
              {purposeItems.map((item, idx) => (
                <div key={idx} className="h-[200px] flex flex-col justify-center shrink-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg bg-[#052D69] text-white shadow-lg shadow-[#052D69]/20">
                      {item.icon}
                    </div>
                    <div className="bg-[#052D69] px-3 py-1">
                      <span className="text-[11px] font-bold text-white tracking-wider uppercase">{item.title}</span>
                    </div>
                  </div>
                  <p className="text-base text-slate-500 max-w-[280px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}