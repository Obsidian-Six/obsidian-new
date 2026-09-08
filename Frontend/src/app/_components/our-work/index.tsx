"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

import { MotionDiv, MotionP } from "@/lib/motion";
import caseStudiesData from "@/lib/store/case-studies";

type CaseStudy = {
  slug: string;
  image: string;
  name: string;
  category: string;
  details: string;
};

type WorkCardProps = {
  caseStudy: CaseStudy;
  index: number;
};

const OurWork = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const displayWorks: CaseStudy[] = caseStudiesData.slice(0, 6);

  return (
    <section
      ref={containerRef}
      id="blogs"
      className="mx-auto max-w-7xl overflow-hidden px-6 py-12 md:px-10"
    >
      {/* Section Tag */}
      <div className="mb-12">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mb-4 block font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-[#052D69] md:text-xs"
        >
          [ Our Work ]
        </motion.span>

        {/* Main Heading */}
        <MotionP
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-12 text-4xl font-light leading-[1.1] tracking-tighter text-slate-950 md:text-5xl lg:text-6xl"
        >
          Carving digital dominance for <br className="hidden md:block" />
          brands that{" "}
          <span className="font-serif italic text-[#052D69]">
            refuse to settle.
          </span>
        </MotionP>
      </div>

      {/* Portfolio Grid */}
      <motion.div style={{ y }}>
        <div className="grid grid-cols-1 gap-x-3 gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
          {displayWorks.map((caseStudy, index) => (
            <WorkCard
              key={caseStudy.slug || index}
              caseStudy={caseStudy}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Action Button */}
      <MotionDiv
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.1,
        }}
        className="mt-2 flex justify-center"
      >
        <Link
          href="/case-studies"
          className="os-btn-slide group inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#052D69]/10 transition-all duration-300 hover:bg-[#052D69] md:px-10 md:py-4"
        >
          View all works
          <GoArrowUpRight className="text-xl transition-transform duration-300 group-hover:rotate-45" />
        </Link>
      </MotionDiv>
    </section>
  );
};

const WorkCard = ({ caseStudy, index }: WorkCardProps) => {
  const imageRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(imageRef, {
    once: true,
    amount: 0.1,
  });

  return (
    <div className="group flex flex-col">
      <Link href={`/case-studies/${caseStudy.slug}`}>
        {/* Image */}
        <div
          ref={imageRef}
          className="relative overflow-hidden rounded-sm bg-slate-200"
        >
          <motion.div
            initial={{
              clipPath: "inset(0% 0% 100% 0%)",
            }}
            animate={{
              clipPath: isInView
                ? "inset(0% 0% 0% 0%)"
                : "inset(0% 0% 100% 0%)",
            }}
            transition={{
              duration: 1,
              ease: [0.19, 1, 0.22, 1],
              delay: (index % 3) * 0.1,
            }}
          >
            <Image
              src={caseStudy.image}
              className="aspect-[4/5] w-full object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 md:aspect-square"
              alt={caseStudy.name}
              width={600}
              height={600}
            />
          </motion.div>

          {/* Explore Case */}
          <div className="absolute right-4 top-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="rounded-full bg-white/90 px-4 py-2 text-[9px] font-bold uppercase tracking-tighter shadow-xl backdrop-blur-md">
              Explore Case
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-8 space-y-3">
          {/* Category */}
          <motion.div
            initial={{
              opacity: 0,
              x: -10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.3 + (index % 3) * 0.1,
            }}
            className="flex items-center gap-2"
          >
            <span className="h-[1px] w-6 bg-[#052D69]" />

            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {caseStudy.category}
            </p>
          </motion.div>

          {/* Title + Description */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.4 + (index % 3) * 0.1,
            }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-bold leading-tight text-slate-900 md:text-xl">
              {caseStudy.name}
            </h3>

            <p className="mt-2 min-h-[2.5rem] line-clamp-2 text-xs font-light leading-relaxed text-slate-500 md:text-sm">
              {caseStudy.details.split(".")[0]}.
            </p>
          </motion.div>
        </div>
      </Link>
    </div>
  );
};

export default OurWork;
