"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowDown } from "react-icons/fa";

const HeroCase = ({ele}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.2); // Adjust scrolling speed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("case-study-section"); // Target section
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth", // Smooth scroll effect
      });
    }
  };

  return (
    <>
      <div className="relative w-full md:h-screen h-[90vh] overflow-hidden">
        <img
          alt="A scenic waterfall in a forest with a large rock in the foreground. The rock has 'Pachmarhi Ayurveda' written on it in blue letters."
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 ease-out"
          src={ele.img}
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
          <button  onClick={scrollToNextSection} className="bg-purple-600 text-white p-4 rounded-full cursor-pointer animate-bounce">
            <FaArrowDown />
          </button>
        </div>
      </div>
      
      {/* Case Study Section */}
      <div id="case-study-section" className="bg-[#19183A] text-white py-20">
        <div className="w-[80%] mx-auto poppins">
          <div
            className="md:text-xl sm:text-base text-sm flex items-center gap-2 uppercase transition-transform duration-300"
            style={{ transform: `translateY(${offset * 0.1}px)` }} // Subtle movement
          >
            <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> Case Study - {ele?.name}
          </div>
          <p
            className="md:text-6xl sm:text-4xl max-md:mt-3 text-3xl font-light max-w-3xl leading-normal transition-transform duration-300"
            style={{ transform: `translateY(${offset * 0.2}px)` }}
          >
            {ele.casesection.data}
            <span className="highlight"> {ele.casesection.highlight}</span>
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="py-20 poppins">
        <div className="md:w-[60%] w-[80%] mx-auto">
          <p
            className="text-[#5A00EC] text-3xl md:mb-10 mb-6 uppercase transition-transform duration-300"
            style={{ transform: `translateY(${offset * 0.1}px)` }} // Slight motion
          >
            Overview
          </p>
          <p
            className="md:text-2xl sm:text-xl text-base text-[#19183A]/75 font-light inter leading-9"
            style={{ transform: `translateY(${offset * 0.05}px)` }} // Minimal movement for readability
          >
            {ele.overview}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroCase;
