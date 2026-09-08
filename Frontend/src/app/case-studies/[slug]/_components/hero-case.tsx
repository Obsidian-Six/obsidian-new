"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";
import ParallaxMedia from "@/app/_components/ui/ParallaxMedia";
import ParallaxText from "@/app/_components/ui/ParallaxText";

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
    document
      .getElementById("case-study-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-[#0a0a0b]"
    >
      {/* --- 1. 3D VISUAL LAYER --- */}
      <div className="relative h-screen w-full flex items-center justify-center perspective-1000">
        {/* --- VIDEO / IMAGE CONDITIONAL LOGIC --- */}
        {/* <motion.div
          style={{ y: smoothY, scale, rotateX, opacity }}
          className="absolute inset-0 w-full h-full z-0"
        >
          {ele.heroVideo && ele.heroVideo.length > 0 ? (
            <video
              src={ele.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 brightness-75"
            />
          ) : ele.heroImage ? (
            <Image
              alt={ele.name || "Case Study Hero"}
              src={ele.heroImage}
              fill
              priority
              unoptimized
              className="object-cover opacity-60 brightness-75"
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-900 opacity-60 brightness-75" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0a0a0b]" />
        </motion.div> */}

        <ParallaxMedia
          type={ele.heroVideo && ele.heroVideo.length > 0 ? "video" : "image"}
          src={
            ele.heroVideo && ele.heroVideo.length > 0
              ? ele.heroVideo
              : ele.heroImage
          }
          alt={ele.name || "Case Study Hero"}
          speed={14}
          priority
          className="absolute inset-0"
          imageClassName="opacity-60 brightness-75"
        />

        {/* Overlays removed as requested */}

        {/* --- 4. SCROLL INDICATOR (Tucked closer to bottom) --- */}
        <motion.button
          onClick={scrollToNextSection}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/50 hover:text-white"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">
            Explore
          </span>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <FaArrowDown size={12} />
          </div>
        </motion.button>
      </div>

      {/* --- 5. DATA SECTION (Padding Heavily Reduced) --- */}
      <section
        id="case-study-section"
        className="relative z-20 bg-white py-12 md:py-16"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="h-[1px] w-12 bg-black" />
            <span className="text-black font-bold tracking-[0.4em] uppercase text-xs">
              Overview
            </span>
          </motion.div>

          {/* <div className="grid lg:grid-cols-12 gap-y-8 items-start"> */}
          <div className="grid gap-y-8 gap-5 items-start justify-between">
            {/* LEFT SIDE: Broad Headline */}
            <motion.div
              // className="lg:col-span-7"
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* <h2 className="text-5xl md:text-7xl lg:text-8xl text-black font-light leading-[1.1] tracking-tighter"> */}
              {/* <h2 className="text-4xl md:text-5xl lg:text-5xl text-black font-light leading-[1.1] tracking-tighter">
                {ele.caseSection.data}
                <span className="text-black/20 italic font-serif block mt-4 text-3xl md:text-5xl">
                  {ele.caseSection.highlight}
                </span>
              </h2> */}
              <ParallaxText
                speed={20}
                className="text-4xl md:text-5xl lg:text-5xl text-black font-light leading-[1.1] tracking-tighter"
              >
                {ele.caseSection.data}
                 <span className="text-black/20 italic font-serif block mt-4 text-3xl md:text-5xl">
                  {ele.caseSection.highlight}
                </span>
              </ParallaxText>
            </motion.div>

            {/* RIGHT SIDE: Narrative */}
            <motion.div
              // className="lg:col-span-4 lg:col-start-9 space-y-8 lg:pt-4"
              className="lg:col-span-6 lg:col-start-6 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              >
              <ParallaxText speed={20}>

              <p className="text-xl md:text-2xl text-black/50 leading-relaxed font-light font-inter">
                {ele.overview}
              </p>
              </ParallaxText>

              <div className="relative pt-6 border-t border-black/5 flex justify-between">
                <div className="space-y-1">
                  <p className="text-black font-bold text-2xl tracking-tighter italic font-serif">
                    2026
                  </p>
                  <p className="text-black/30 text-[10px] uppercase tracking-[0.2em] font-bold">
                    Timeline
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-black font-bold text-2xl tracking-tighter italic font-serif">
                    Strategy
                  </p>
                  <p className="text-black/30 text-[10px] uppercase tracking-[0.2em] font-bold">
                    Category
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 6. CINEMATIC OVERVIEW VIDEO --- */}
      {ele.overviewVideo && ele.overviewVideo.length > 0 && (
        <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <video
              src={ele.overviewVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Project Branding */}
            <div className="absolute bottom-8 left-6 md:left-16 z-10">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">
                Project Showcase
              </p>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
