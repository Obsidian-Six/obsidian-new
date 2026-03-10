"use client";
import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";

export default function PurposeSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    // Cast `ease` to `any` because framer-motion's TypeScript definitions may not accept named easing strings
    transition: { duration: 0.8, ease: "easeInOut" as any },
  };

  return (
    <div className="relative w-full">
      {/* Targeted Ambient Glow - positioned to feel like part of the main page flow */}
      <div className="absolute top-0 -right-[10%] w-[500px] h-[500px] bg-[#6000FF]/15 blur-[120px] rounded-full z-0 pointer-events-none" />

      <div className="relative z-10">
        {/* --- TOP GRID SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24 md:mb-32">
          <motion.div className="lg:col-span-8" {...fadeInUp}>
            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-60 font-mono block mb-6">
              [ Our Purpose ]
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight max-w-3xl">
              What Defines Our Approach to Growth and Digital Innovation
            </h2>
          </motion.div>

          <motion.div 
            className="lg:col-span-4 flex flex-col items-start lg:pt-24"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mb-6">
              <div className="w-14 h-14 rounded-full border border-white/20 p-1 bg-black overflow-hidden mb-4 ring-4 ring-[#6000FF]/10">
                <div className="w-full h-full bg-gradient-to-tr from-[#6000FF] to-purple-400 rounded-full flex items-center justify-center text-lg">
                  🚀
                </div>
              </div>
              <div className="bg-[#6000FF] px-4 py-1 inline-block">
                <span className="text-[11px] font-bold tracking-wider uppercase block">
                  Purposeful Creativity
                </span>
              </div>
            </div>
            <p className="text-sm opacity-40 leading-relaxed max-w-[200px]">
              Design driven by intention, not just aesthetics.
            </p>
          </motion.div>
        </div>

        {/* --- CENTERED QUOTE --- */}
        <motion.div 
          className="text-center pb-20"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-light italic font-serif leading-tight text-black/90">
            “We exist to turn vision into{" "}
            <span className="bg-[#6000FF] px-3 py-1 not-italic font-sans font-bold text-white tracking-tighter">
              results
            </span>
            —<br className="hidden md:block" />
            and brands into{" "}
            <span className="bg-[#6000FF] px-3 py-1 not-italic font-sans font-bold text-white tracking-tighter">
              experiences
            </span>.”
          </h3>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 group inline-flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#6000FF] hover:text-white"
          >
            Lets Grow <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}