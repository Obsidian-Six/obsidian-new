"use client";

import { useState } from "react";
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SliderLeft from "./slider-left";
import SliderRight from "./slider-right";
import reviews from "@/lib/store/reviews";

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
    <>
      <SliderLeft review={prevReview} prevSlide={prevSlide} />
      <div className="col-span-8 h-[30rem] grid grid-cols-2 max-md:grid-cols-1">
        <figure className="bg-[#19183A] flex items-center justify-center max-md:h-48 max-md:mt-3">
          <Image
            src={currentReview.image}
            alt={currentReview.name}
            width={640}
            height={384}
            className="w-full md:h-96 h-48 object-contain"
            priority
          />
        </figure>

        <div className="bg-white p-8 relative">
          <h2 className="textmain text-2xl my-2.5 max-md:text-xl">
            {currentReview.name}
          </h2>
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
              data-variant="opener"
              className="p-2.5 bg-[#5A00EC] cursor-pointer border border-[#5A00EC] hover:bg-white hover:text-[#5A00EC]"
              onClick={prevSlide}
            >
              <BsArrowLeft className="text-2xl text-white" />
            </button>
            <button
              data-variant="opener"
              className="p-2.5 bg-[#5A00EC] cursor-pointer border border-[#5A00EC] hover:bg-white hover:text-[#5A00EC]"
              onClick={nextSlide}
            >
              <BsArrowRight className="text-2xl text-white" />
            </button>
          </div>
        </div>
      </div>
      <SliderRight review={nextReview} nextSlide={nextSlide} />
    </>
  );
};

export default Slider;
