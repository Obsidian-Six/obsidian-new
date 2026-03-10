"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaArrowLeft, FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";

export default function HeroCase({ ele }: { ele: TemplateCaseStudy }) {
  const containerRef = useRef(null);

  // Advanced Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 3D & Parallax Transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]); // 3D tilt on scroll

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const scrollToNextSection = () => {
    document.getElementById("case-study-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden bg-[#0a0a0b]">
      {/* --- 1. 3D VISUAL LAYER --- */}
      <div className="relative h-screen w-full flex items-center justify-center perspective-1000">
        <motion.div
          style={{ y: smoothY, scale, rotateX, opacity }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <Image
            alt={ele.name}
            src={ele.heroImage}
            fill
            priority
            className="object-cover opacity-60 brightness-75"
            sizes="100vw"
          />
          {/* Gradient Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#19183A]/20 to-[#19183A]" />
        </motion.div>

        {/* --- 2. FLOATING BACK BUTTON --- */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-24 md:left-20 left-6 z-20"
        >
          <Link href="/case-studies" className="group flex items-center text-white/70 hover:text-white transition-colors">
            <div className="p-2 rounded-full border border-white/20 group-hover:border-purple-500 transition-all">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="ml-4 text-xs tracking-[0.2em] font-bold uppercase">Back to Works</span>
          </Link>
        </motion.div>

        {/* --- 3. CENTERED TITLE (Glassmorphism) --- */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white text-5xl md:text-8xl font-black tracking-tighter"
          >
            {ele.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex justify-center"
          >
            <span className="h-[1px] w-20 bg-purple-500 self-center"></span>
            <span className="mx-4 text-purple-400 uppercase tracking-widest text-sm font-bold">Premium Case Study</span>
            <span className="h-[1px] w-20 bg-purple-500 self-center"></span>
          </motion.div>
        </div>

        {/* --- 4. SCROLL INDICATOR (Tucked closer to bottom) --- */}
        <motion.button
          onClick={scrollToNextSection}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/50 hover:text-white"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">Explore</span>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <FaArrowDown size={12} />
          </div>
        </motion.button>
      </div>

      {/* --- 5. DATA SECTION (Padding Heavily Reduced) --- */}
      <section id="case-study-section" className="relative z-20 bg-white py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="h-[1px] w-12 bg-black" />
            <span className="text-black font-bold tracking-[0.4em] uppercase text-xs">Overview</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-y-8 items-start">

            {/* LEFT SIDE: Broad Headline */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl text-black font-light leading-[1.1] tracking-tighter">
                {ele.caseSection.data}
                <span className="text-black/20 italic font-serif block mt-4 text-3xl md:text-5xl">
                  {ele.caseSection.highlight}
                </span>
              </h2>
            </motion.div>

            {/* RIGHT SIDE: Narrative */}
            <motion.div
              className="lg:col-span-4 lg:col-start-9 space-y-8 lg:pt-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="text-xl md:text-2xl text-black/50 leading-relaxed font-light font-inter">
                {ele.overview}
              </p>

              <div className="pt-6 border-t border-black/5 flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-black font-bold text-2xl tracking-tighter italic font-serif">2026</p>
                  <p className="text-black/30 text-[10px] uppercase tracking-[0.2em] font-bold">Timeline</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-black font-bold text-2xl tracking-tighter italic font-serif">Strategy</p>
                  <p className="text-black/30 text-[10px] uppercase tracking-[0.2em] font-bold">Category</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}