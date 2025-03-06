import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const OurTeam = () => {
  const arr = ["", "", "", "", "",""];
  return (
    <div className="relative">
      <img
        src="/images/logo/bg.png"
        alt="No Preview"
        className="h-full w-full opacity-20 absolute object-cover"
      />
      <div className="p-12">
        <div className="text-6xl text-center font-light max-w-5xl mx-auto leading-snug">
          Behind Every Great
          <span className={`highlight`}> Strategy </span>
          is a Great
          <span className={`highlight`}> Team </span>— Reach Out to Us.
        </div>
        <button className="font-medium text-sm mx-auto px-5 py-3 bg-white flex items-center justify-between gap-2 text-[#5A00EC] border-[#5A00EC] border my-6">
          Contact Us
          <GoArrowUpRight className="text-2xl" />
        </button>
      </div>
      <div className="flex gap-10 overflow-hidden">
        {arr.map((ele, i) => (
          <div key={i} className="relative w-60 h-72 group">
            <img
              src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fbharat-bajaj.jpg&w=1920&q=75"
              alt="No Preview"
              className="w-60 h-72 object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 "
            />
            <div className="absolute bottom-0  p-2.5 left-0 w-full ">
              <div className="textmain bg-white w-full p-2.5">
                <p className="text-sm inter font-medium">Aniket Kalawat</p>
                <p className="text-xs poppins font-light">Software Developer</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
