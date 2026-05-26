"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";

export default function HorizontalRevealGallery({ ele }: { ele: TemplateCaseStudy }) {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Ensure the scroll offset is well-defined
    offset: ["start start", "end end"]
  });

  // 1. ADD SPRING PHYSICS: This removes the "stutter" and makes it feel fluid
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 2. Adjust translation based on the actual number of items
  // Calculation: (Items - 1) * -itemWidthPercentage
  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${(ele.gallery.length - 1) * 20}%`]);
  
  // 3. Add a spring on the derived x transform for buttery-smooth motion
  const springX = useSpring(x, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    // Increased height to 500vh gives the user more "room" to breathe while scrolling
    <section ref={targetRef} className="relative h-[500vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          style={{ x: springX }} 
          className="flex gap-8 px-10 will-change-transform" // 3. will-change-transform enables GPU rendering
        >
          {ele.gallery.map((item, index) => (
            <div
              key={index}
              className="group relative h-[450px] w-[350px] md:h-[600px] md:w-[650px] flex-shrink-0 overflow-hidden bg-slate-100 shadow-xl"
            >
              <Image
                src={item.img}
                alt={`Gallery image ${index}`}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 350px, 650px"
                priority={index < 2} // Preload first two images for performance
              />
              
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

              <motion.div 
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
              >
                <p className="text-sm font-mono text-purple-400 mb-2 uppercase tracking-widest">
                  Insight 0{index + 1}
                </p>
                <p className="text-white text-xl font-medium leading-tight">
                  {item.text}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

    
    </section>
  );
}