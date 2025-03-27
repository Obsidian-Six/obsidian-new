import React from "react";
import { FaArrowLeft, FaArrowDown } from "react-icons/fa";
import ChallengeSection from "./challenge-section";

const HeroCase = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        <img
          alt="A scenic waterfall in a forest with a large rock in the foreground. The rock has 'Pachmarhi Ayurveda' written on it in blue letters."
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/case-study/pach.png"
        />
        <div className="absolute top-24 left-32 text-white flex items-center">
          <FaArrowLeft className="mx-2" />
          <span className="font-semibold">BACK TO WORKS</span>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button className="bg-purple-600 text-white p-4 rounded-full">
            <FaArrowDown />
          </button>
        </div>
      </div>
      <div className="bg-[#19183A] text-white py-20">
        <div className="w-[80%] mx-auto poppins">
          <div className="text-xl flex items-center gap-2 uppercase">
            <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> Case Study - pachmarhi
            ayuveda
          </div>
          <p className="text-6xl font-light max-w-3xl leading-normal">
            How We Transformed a Legacy Ayurveda Brand into a <span className="highlight"> Digital Success</span>
          </p>
        </div>
      </div>
      <div className="py-20 poppins">
        <div className="w-[60%] mx-auto ">
            <p className="text-[#5A00EC] text-3xl mb-10 uppercase">Overview</p>
            <p className="text-2xl text-[#19183A]/75 font-light inter leading-9">Pachmarhi Ayurveda is a well-established Ayurvedic brand rooted in the heart of Madhya Pradesh. Known for its pure and effective natural oils and remedies, the brand has built a loyal customer base through offline sales and word-of-mouth marketing. However, in an increasingly digital world, their lack of an online presence limited their growth potential. In 2022, we partnered with them to take their brand digital, establish a strong online identity, and unlock nationwide sales opportunities.</p>
        </div>
      </div>
      <ChallengeSection />
    </>
  );
};

export default HeroCase;
