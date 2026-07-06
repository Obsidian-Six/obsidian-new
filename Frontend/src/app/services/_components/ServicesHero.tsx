"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll mapping transforms for premium movement
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex items-center bg-slate-950 pt-20 md:pt-24"
    >
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <motion.div
          animate={{
            x: ["-1%", "1%", "-1%"],
            y: ["-1%", "1%", "-1%"],
            scale: [1.02, 1.05, 1.02]
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="w-full h-full relative"
        >
          <Image
            src="/images/gradient-hero.png"
            alt="Services Hero"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Dark overlay gradient behind text area for readability against busy background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-10 pointer-events-none" />

      {/* Content Stream */}
      <div className="container mx-auto px-6 md:px-12 xl:px-20 z-20 relative mt-16">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.25)" }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.5px] text-white leading-[1.1] font-poppins"
          >
            Our Services
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
