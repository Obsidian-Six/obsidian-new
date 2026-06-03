"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  category: string;
  bgImage: string;
}

export default function HeroSection({ title, category, bgImage }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[380px] md:h-[450px] flex items-center overflow-hidden bg-white">
      {/* Background Image with Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover object-center opacity-85"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 xl:px-20 z-10 relative mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="text-slate-600 text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            {category}
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-slate-900 leading-tight font-inter">
            {title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-slate-300 to-slate-500 mt-6 rounded-full opacity-70" />
        </motion.div>
      </div>
    </section>
  );
}
