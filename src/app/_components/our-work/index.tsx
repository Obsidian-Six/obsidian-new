"use client";
import { MotionDiv, MotionP } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import caseStudiesData from "@/lib/store/case-studies";
import { GoArrowRight } from "react-icons/go";

const OurWork = () => {
  const variants = {
    start: { y: 40, opacity: 0 },
    end: { y: 0, opacity: 1 },
  };

  // Only take the first 6 items to match the layout request
  const displayWorks = caseStudiesData.slice(0, 6);

  return (
    <section id="blogs" className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      {/* Section Tag */}
      <h2 className="text-center mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
        Our Work
      </h2>

      {/* Main Heading */}
      <MotionP
        variants={variants}
        initial="start"
        whileInView="end"
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl text-slate-900 max-w-4xl mx-auto text-center font-normal leading-tight mb-20 tracking-tight"
      >
        We empowered many ambitious businesses to achieve and surpass their
        <span className="italic font-serif"> growth </span> objectives.
      </MotionP>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {displayWorks.map((caseStudy, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <Link href={`/case-studies/${caseStudy.slug}`}>
              {/* Image Container with Hover Zoom */}
              <div className="overflow-hidden bg-gray-100 mb-6">
                <Image
                  src={caseStudy.image}
                  className="w-full aspect-[4/5] md:aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={caseStudy.name}
                  width={600}
                  height={600}
                />
              </div>

              {/* Category */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                {caseStudy.category}
              </p>

              {/* Title / Description */}
              <h3 className="text-lg md:text-xl font-normal text-slate-900 leading-snug group-hover:text-[#5A00EC] transition-colors duration-300">
                <span className="font-bold">{caseStudy.name}:</span> {caseStudy.details.split('.')[0]}
              </h3>
            </Link>
          </MotionDiv>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex justify-center mt-20">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-3 px-10 py-4 border border-slate-900 text-slate-900 text-sm font-medium hover:bg-slate-900 hover:text-white transition-all duration-300 group"
        >
          View all works 
          <GoArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default OurWork;