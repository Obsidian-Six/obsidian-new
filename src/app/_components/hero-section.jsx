/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoArrowUpRight } from "react-icons/go";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const HeroSection = () => {
  const arr = [""];

  return (
    <Swiper
      // spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      id="home"
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper relative bg-gradient-to-r from-primary-main to-heading-main text-white overflow-hidden h-screen"
    >
      {arr.map((ele, i) => (
        <SwiperSlide key={i} className="h-full w-full bg-[#d9d9d9]">
          <div className="relative text-color z-10 flex flex-col justify-center items-center h-full text-center max-w-4xl mx-auto md:p-0 sm:p-4 p-6">
            {/* Heading */}
            <div className="text-6xl text-center font-light max-md:text-4xl max-sm:text-4xl">
              <span className="highlight max-sm:block">future-ready </span>
              e-commerce <br />
              <p className="md:flex md:mt-6">
                solutions for your{" "}
                <span className="highlight flex flex-col items-center md:pl-2">
                  brand.
                  <svg
                    className="w-24 md:w-36"
                    xmlns="http://www.w3.org/2000/svg"
                    width="148"
                    height="14"
                    viewBox="0 0 148 14"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_2382_1860)">
                      <path
                        d="M147.404 8.08289C146.252 7.43553 145.309 6.47793..."
                        fill="#5A00EC"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2382_1860">
                        <rect width="148" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </p>
            </div>

            {/* Subtext */}
            <p className="text-2xl textmain max-w-lg font-light mx-auto my-6 max-md:text-lg">
              Crafting digital experiences that engage, convert, and retain
              customers
            </p>

            {/* Call-to-Action Button */}
            <button className="font-medium text-sm mx-auto px-5 py-3 bg-white flex items-center justify-between gap-2 text-[#5A00EC] my-6 max-md:w-fit">
              Let’s Grow <GoArrowUpRight className="text-2xl" />
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
