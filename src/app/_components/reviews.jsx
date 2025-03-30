"use client"

import React, { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MotionDiv } from "../utils/page";


const reviews = [
  {
    name: "Vanya",
    title: "The Geeky Youngin",
    feedback:
      "I am so impressed with the details and the planning that it felt like we have been working together for such a long time. Would strongly recommend them if you want anything to do with video.",
    company: "AB CAPITAL",
    image:
      "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fbharat-bajaj.jpg&w=1920&q=75",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY", // Replace with actual video link
  },
  {
    name: "John Doe",
    title: "Entrepreneur",
    feedback:
      "Amazing team! They understood my vision and delivered more than I expected. Will definitely work with them again.",
    company: "Startup X",
    image:
      "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2FHoem%20pages%20images%2FIGMB%20Home%20page%201.png&w=1920&q=75",
    video: "https://www.youtube.com/embed/3JZ_D3ELwOQ", // Replace with actual video link
  },
  {
    name: "Sarah Smith",
    title: "Business Coach",
    feedback:
      "Their attention to detail and strategic approach helped my business scale rapidly. Highly recommend them!",
    company: "Success Hub",
    image:
      "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fpushpendra_tiwari.jpeg&w=1920&q=75",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video link
  },
];



const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // useEffect(() => {
  //   const interval = setInterval(nextSlide, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="bg-[#5A00EC]/10">
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

        {/* Slider */}
        <div className="grid grid-cols-12 items-end gap-4 max-md:grid-cols-1 relative">
          {/* Left Image (Previous Slide) */}
          <div className="col-span-2 relative max-md:hidden cursor-pointer" onClick={prevSlide}>
            <img
              src={reviews[(currentIndex - 1 + reviews.length) % reviews.length].image}
              alt="Previous"
              className="w-full h-28 object-cover"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent top-0 left-0" />
            <div className="absolute bottom-0 text-white p-2.5">
              <p className="text-xs poppins">
                {reviews[(currentIndex - 1 + reviews.length) % reviews.length].role}
              </p>
              <p className="text-sm inter">
                {reviews[(currentIndex - 1 + reviews.length) % reviews.length].company}
              </p>
            </div>
          </div>

          {/* Main Review Section */}
          <div className="col-span-8 h-[30rem] grid grid-cols-2 max-md:grid-cols-1">
            <div className="bg-[#19183A] max-md:h-48"> 
                <iframe
                width="100%"
                height="100%"
                src={reviews[currentIndex].video}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
             </div>
            <div className="bg-white p-8 relative">
           
              <p className="textmain text-2xl my-2.5 max-md:text-xl">{reviews[currentIndex].name}</p>
              <p className="textmain text-sm inter my-2.5 max-md:text-xs">{reviews[currentIndex].title}</p>
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
                <p className="px-5 text-sm inter max-md:px-3 max-md:text-xs">{reviews[currentIndex].feedback}</p>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute md:top-1/3 top-[115%] -right-10  max-md:left-1/2 max-md:-translate-x-1/4 transform -translate-y-1/2 flex space-x-2">
                <button className="p-2.5 bg-[#5A00EC] cursor-pointer border border-[#5A00EC] hover:bg-white hover:text-[#5A00EC]" onClick={prevSlide}>
                  <BsArrowLeft className="text-2xl text-white" />
                </button>
                <button className="p-2.5 bg-[#5A00EC] cursor-pointer border border-[#5A00EC] hover:bg-white hover:text-[#5A00EC]" onClick={nextSlide}>
                  <BsArrowRight className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Image (Next Slide) */}
          <div className="col-span-2 relative max-md:hidden cursor-pointer" onClick={nextSlide}>
            <img
              src={reviews[(currentIndex + 1) % reviews.length].image}
              alt="Next"
              className="w-full h-28 object-cover"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent top-0 left-0" />
            <div className="absolute bottom-0 text-white p-2.5">
              <p className="text-xs poppins">{reviews[(currentIndex + 1) % reviews.length].role}</p>
              <p className="text-sm inter">{reviews[(currentIndex + 1) % reviews.length].company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
