"use client";
import { useRef } from "react";
import { MotionDiv, MotionP } from "@/lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import caseStudiesData from "@/lib/store/case-studies";
import { GoArrowUpRight } from "react-icons/go";

const OurWork = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for the grid
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const displayWorks = caseStudiesData.slice(0, 6);

  return (
    <section
      ref={containerRef}
      id="blogs"
      className="max-w-7xl mx-auto px-6 md:px-10 py-32 overflow-hidden"
    >
      {/* Section Tag */}
      <div className="mb-12">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[#024787] font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-medium"
        >
          [ Our Work ]
        </motion.span>
        
        {/* Main Heading */}
        <MotionP
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl text-slate-950 font-light tracking-tighter leading-[1.1] mb-12"
        >
          Carving digital dominance for <br className="hidden md:block" />
          brands that <span className="italic font-serif text-[#024787]">refuse to settle.</span>
        </MotionP>
      </div>
      {/* Grid Layout */}
      <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
        {displayWorks.map((caseStudy, index) => (
          <WorkCard key={index} caseStudy={caseStudy} index={index} />
        ))}
      </motion.div>

      {/* Action Button */}
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }} // Repeat animation
        transition={{ delay: 0.1 }}
        className="flex justify-center mt-32"
      >
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-slate-900 text-white rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-[#024787] transition-all duration-300 shadow-lg shadow-[#024787]/10 os-btn-slide"
        >
          View all works <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
        </Link>
      </MotionDiv>
    </section>
  );
};

const WorkCard = ({ caseStudy, index }: { caseStudy: any; index: number }) => {
  return (
    <div className="group flex flex-col">
      <Link href={`/case-studies/${caseStudy.slug}`}>
        {/* Image Mask Reveal */}
        <div className="relative overflow-hidden bg-slate-200 rounded-sm">
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: false, margin: "-5%" }} // Trigger slightly before full view
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: (index % 3) * 0.1 }}
          >
            <Image
              src={caseStudy.image}
              className="w-full aspect-[4/5] md:aspect-square object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              alt={caseStudy.name}
              width={600}
              height={600}
            />
          </motion.div>

          <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-tighter shadow-xl">
              Explore Case
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-8 space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 + (index % 3) * 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="w-6 h-[1px] bg-[#024787]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {caseStudy.category}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.4 + (index % 3) * 0.1 }}
            className="flex flex-col"
          >
            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
              {caseStudy.name}
            </h3>
            <p className="text-xs md:text-sm font-light text-slate-500 leading-relaxed mt-2 line-clamp-2 min-h-[2.5rem]">
              {caseStudy.details.split('.')[0]}.
            </p>
          </motion.div>
        </div>
      </Link>
    </div>
  );
};

export default OurWork;