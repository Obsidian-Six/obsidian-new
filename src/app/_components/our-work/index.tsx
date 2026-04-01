"use client";
import { useRef } from "react";
import { MotionDiv, MotionP } from "@/lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import caseStudiesData from "@/lib/store/case-studies";
import { GoArrowRight } from "react-icons/go";

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
      {/* Section Tag with line animation */}
      <div className="flex flex-col items-center mb-12">
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "40px" }}
          viewport={{ once: false, amount: 0.5 }} // Runs every time 50% is visible
          className="h-[1px] bg-slate-400 mb-4"
        />
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
          Our Work
        </h2>
      </div>

      {/* Main Heading */}
      <MotionP
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }} // Repeat animation
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl text-slate-900 max-w-5xl mx-auto text-center font-normal leading-[1.1] mb-24 tracking-tighter"
      >
        Carving digital dominance for <br className="hidden md:block" />
        brands that <span className="italic font-serif text-[#024787]">refuse to settle.</span>
      </MotionP>
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
          className="relative inline-flex items-center gap-4 px-12 py-5 overflow-hidden group border border-slate-900 transition-all duration-500 rounded-full"
        >
          <span className="relative z-10 text-slate-900 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-500">
            View all works
          </span>
          <GoArrowRight className="relative z-10 text-xl group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
          <div className="absolute inset-0 bg-slate-900 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
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
          >
            <h3 className="text-xl md:text-2xl font-light text-slate-900 leading-tight">
              <span className="font-bold">{caseStudy.name}</span> - {caseStudy.details.split('.')[0]}
            </h3>
          </motion.div>
        </div>
      </Link>
    </div>
  );
};

export default OurWork;