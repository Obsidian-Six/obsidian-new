"use client";

import { useRef } from "react";
import { motion,
  //  useInView,
    useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
// import { GoArrowUpRight } from "react-icons/go";

import { MotionDiv, MotionP } from "@/lib/motion";
import caseStudiesData from "@/lib/store/case-studies";
import Button from "../common/Button";
import { ArrowUpRight } from "lucide-react";

type CaseStudy = {
  slug: string;
  image: string;
  name: string;
  category: string;
  details: string;
  tags?:string[];
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
        <Button hlink="/case-studies" text="View all works" />
      </MotionDiv>
    </section>
  );
};

const WorkCard = ({ caseStudy }: WorkCardProps) => {
  // console.log(caseStudy.tags)
  // const imageRef = useRef<HTMLDivElement | null>(null);

  // const isInView = useInView(imageRef, {
  //   once: true,
  //   amount: 0.1,
  // });

  return (
    <div className="group flex flex-col">
      {/* <Link href={`/case-studies/${caseStudy.slug}`}>
       
        <div
          ref={imageRef}
          className="relative overflow-hidden bg-slate-200"
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

          <div className="absolute right-4 top-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="rounded-full bg-white/90 px-4 py-2 text-[9px] font-bold uppercase tracking-tighter shadow-xl backdrop-blur-md">
              Explore Case
            </span>
          </div>
        </div>


        <div className="mt-8 space-y-3">
      
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
      </Link> */}
      <Link
              href={`/case-studies/${caseStudy.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-end p-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md">
                    <ArrowUpRight size={15} className="text-slate-900" />
                  </span>
                </div>
              </div>

              {/* Meta below image */}
              <div className="mt-4 space-y-1.5">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                  {caseStudy.category}
                </p>
                <h3 className="text-[16px] font-bold text-slate-800 leading-snug group-hover:text-slate-900 transition-colors">
                  {caseStudy.name}
                </h3>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {caseStudy?.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[14px] px-2 py-0.5 border border-slate-500 rounded-full text-slate-600 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
    </div>
    

  );
};

export default OurWork;
