"use client"

import React, { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MotionDiv } from "../utils/page";


const reviews = [
  {
    name: "Bharat Bajaj",
    title: "Founder, AB Capital Services",
    feedback:
      "Hii Obsidian Team let me take this opportunity to Thank you from the bottom of my Heart. The Campaigns you started running for us gave us recognition and much-needed clients in the form of Leads and my business took off. I got many potential clients and the chain continues even today. All of us have to take different pathways to move ahead in life and let me reaffirm you that the foundation you gave AB Capital social media from the beginning will remain warm in our hearts.",
    company: "AB CAPITAL",
    image:
      "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fbharat-bajaj.jpg&w=1920&q=75",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY", // Replace with actual video link
  },
  {
    name: "Dr. Pushpendra Tiwari",
    title: "Founder of Rehab Masters",
    feedback:
      "Built a Great Website for me Great efforts from team , listened to all My queries and cleared them all , Thank you Obsidian",
    company: "Rehab Master",
    image:
      "https://rehabmasters.in/wp-content/uploads/2024/07/Dr-pushpendra-tiwari-300x300.jpg",
    video: "https://www.youtube.com/embed/3JZ_D3ELwOQ", // Replace with actual video link
  },
  {
    name: "Dr. Komal Taneja",
    title: "shim.co.in",
    feedback:
      "You people are doing amazing job..I would like to thank you for handling all the social media platforms of SHIM College with so much of efficiency and hard-work. Your team is highly dedicated towards their clients. You understand the needs so well and do the work accordingly.",
    company: "SHIM",
    image:
      "https://www.shim.co.in/wp-content/uploads/2023/05/komaltaneja.png",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video link
  },
  {
    name: "Mr. Rahul Singh",
    title: "True Value Ventures",
    feedback:
      "Working with Obsidian has been an exceptional experience. The way they handled our branding and digital strategy brought measurable results in a short time. Highly professional and creative team!",
    company: "Success Hub",
    image:
      "https://www.truevalueventures.in/owner.png",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video link
  },
  {
    name: "Deepak Chhabra",
    title: "The Global Youth Empowerment Foundation",
    feedback:
      "Obsidian understood our business goals perfectly and executed our vision across all platforms. The team’s energy and creativity are unmatched. We are seeing amazing growth in engagement and conversions!",
    company: "TheGYEF",
    image:
      "https://www.thegyef.com/images/deepak.jpg", 
    video: "https://www.youtube.com/embed/ScMzIvxBSi4", // Placeholder video link
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
            {/* <div className="bg-[#19183A] max-md:h-48"> 
                <iframe
                width="100%"
                height="100%"
                src={reviews[currentIndex].video}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
             </div> */}
             <div className="bg-[#19183A] flex items-center justify-center max-md:h-48 max-md:mt-3">
                <img
                  src={reviews[currentIndex].image}
                  alt={reviews[currentIndex].name}
                  className="w-full md:h-96 h-48 object-contain"
                />
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
                <p className="px-5 text-sm inter max-md:px-3 max-md:text-xs md:h-56 h-28 overflow-y-scroll">{reviews[currentIndex].feedback}</p>
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
