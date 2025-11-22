"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";

export default function HeroCase({ ele }: { ele: TemplateCaseStudy }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("case-study-section");
    if (nextSection) {
      window.scrollTo({ top: nextSection.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative w-full md:h-screen h-[90vh] overflow-hidden">
        <Image
          alt={ele.name}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 ease-out"
          src={ele.heroImage}
          fill
          sizes="100vw"
          priority
          unoptimized
          style={{ transform: `translateY(${offset}px)` }}
        />
        <div
          className="absolute top-24 md:left-32 left-3 text-white flex items-center transition-transform duration-300"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        >
          <FaArrowLeft className="mx-2" />
          <span className="font-semibold">BACK TO WORKS</span>
        </div>
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-transform duration-300"
          style={{ transform: `translateY(${offset * 0.2}px)` }}
        >
          <button
            onClick={scrollToNextSection}
            className="bg-purple-600 text-white p-4 rounded-full cursor-pointer animate-bounce"
          >
            <FaArrowDown />
          </button>
        </div>
      </div>

      <div id="case-study-section" className="bg-[#19183A] text-white py-20">
        <div className="w-[80%] mx-auto poppins">
          <div
            className="md:text-xl sm:text-base text-sm flex items-center gap-2 uppercase transition-transform duration-300"
            style={{ transform: `translateY(${offset * 0.1}px)` }}
          >
            <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> Case Study - {ele?.name}
          </div>
          <p
            className="md:text-6xl sm:text-4xl max-md:mt-3 text-3xl font-light max-w-3xl leading-normal transition-transform duration-300"
            style={{ transform: `translateY(${offset * 0.2}px)` }}
          >
            {ele.caseSection.data}
            <span className="highlight"> {ele.caseSection.highlight}</span>
          </p>
        </div>
      </div>

      <div className="py-20 poppins">
        <div className="md:w-[60%] w-[80%] mx-auto">
          <p
            className="text-[#5A00EC] text-3xl md:mb-10 mb-6 uppercase transition-transform duration-300"
            style={{ transform: `translateY(${offset * 0.1}px)` }}
          >
            Overview
          </p>
          <p
            className="md:text-2xl sm:text-xl text-base text-[#19183A]/75 font-light inter leading-9 max-md:text-justify"
            style={{ transform: `translateY(${offset * 0.05}px)` }}
          >
            {ele.overview}
          </p>
        </div>
      </div>
    </>
  );
}
