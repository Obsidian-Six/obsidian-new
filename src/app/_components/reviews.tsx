"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MotionDiv } from "@/lib/motion";

type Review = {
  name: string;
  title: string;
  feedback: string;
  company: string;
  image: string;
  video: string;
};

const reviews: Review[] = [
  // Keeping same data as JSX version
  {
    name: "Bharat Bajaj",
    title: "Founder, AB Capital Services",
    feedback:
      "Hii Obsidian Team let me take this opportunity to Thank you from the bottom of my Heart. The Campaigns you started running for us gave us recognition and much-needed clients in the form of Leads and my business took off. I got many potential clients and the chain continues even today. All of us have to take different pathways to move ahead in life and let me reaffirm you that the foundation you gave AB Capital social media from the beginning will remain warm in our hearts.",
    company: "AB CAPITAL",
    image:
      "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fbharat-bajaj.jpg&w=1920&q=75",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  // ... (keeping remaining entries identical)
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  // If no reviews, render nothing
  if (reviews.length === 0) {
    return null;
  }

  const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  const nextIndex = (currentIndex + 1) % reviews.length;
  const currentReview = reviews[currentIndex]!;
  const prevReview = reviews[prevIndex]!;
  const nextReview = reviews[nextIndex]!;

  return (
    <div id="aboutUs" className="bg-[#5A00EC]/10">
      <div className="max-w-6xl mx-auto pb-32 px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-6xl py-14 textmain max-w-5xl mx-auto text-center font-light leading-snug max-md:text-4xl max-md:leading-normal"
        >
          Hear from Those We’ve Helped
          <span className="highlight block">grow</span>
        </MotionDiv>

        <div className="grid grid-cols-12 items-end gap-4 max-md:grid-cols-1 relative">
          <div
            className="col-span-2 relative max-md:hidden cursor-pointer"
            onClick={prevSlide}
          >
            <Image
              src={prevReview.image}
              alt="Previous"
              width={320}
              height={112}
              className="w-full h-28 object-cover"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent top-0 left-0" />
            <div className="absolute bottom-0 text-white p-2.5">
              <p className="text-xs poppins">{prevReview.title}</p>
              <p className="text-sm inter">{prevReview.company}</p>
            </div>
          </div>

          <div className="col-span-8 h-[30rem] grid grid-cols-2 max-md:grid-cols-1">
            <div className="bg-[#19183A] flex items-center justify-center max-md:h-48 max-md:mt-3">
              <Image
                src={currentReview.image}
                alt={currentReview.name}
                width={640}
                height={384}
                className="w-full md:h-96 h-48 object-contain"
              />
            </div>

            <div className="bg-white p-8 relative">
              <p className="textmain text-2xl my-2.5 max-md:text-xl">
                {currentReview.name}
              </p>
              <p className="textmain text-sm inter my-2.5 max-md:text-xs">
                {currentReview.title}
              </p>
              <div className="textmain opacity-80 mt-[30%] max-md:mt-6">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M9.50536 1.93115C5.6069 2.20509 0.00308 2.82751 0 10.4624V20.0686H8.69924V9.79071H5.81068C5.62769 7.04634 7.88755 6.3377 10.345 5.79373L9.50536 1.93115ZM21.1603 1.93115C17.2618 2.20509 11.658 2.82752 11.655 10.4624V20.0686H20.3542V9.79071H17.4657C17.2826 7.04634 19.5425 6.3377 22 5.79373L21.1603 1.93115Z"
                    fill="#BCBCD4"
                  />
                </svg>
                <p className="px-5 text-sm inter max-md:px-3 max-md:text-xs md:h-56 h-28 overflow-y-scroll">
                  {currentReview.feedback}
                </p>
              </div>

              <div className="absolute md:top-1/3 top-[115%] -right-10  max-md:left-1/2 max-md:-translate-x-1/4 transform -translate-y-1/2 flex space-x-2">
                <button
                  className="p-2.5 bg-[#5A00EC] cursor-pointer border border-[#5A00EC] hover:bg-white hover:text-[#5A00EC]"
                  onClick={prevSlide}
                >
                  <BsArrowLeft className="text-2xl text-white" />
                </button>
                <button
                  className="p-2.5 bg-[#5A00EC] cursor-pointer border border-[#5A00EC] hover:bg-white hover:text-[#5A00EC]"
                  onClick={nextSlide}
                >
                  <BsArrowRight className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </div>

          <div
            className="col-span-2 relative max-md:hidden cursor-pointer"
            onClick={nextSlide}
          >
            <Image
              src={nextReview.image}
              alt="Next"
              width={320}
              height={112}
              className="w-full h-28 object-cover"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent top-0 left-0" />
            <div className="absolute bottom-0 text-white p-2.5">
              <p className="text-xs poppins">{nextReview.title}</p>
              <p className="text-sm inter">{nextReview.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
