/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
// import { londrinasketch } from "../font";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoArrowUpRight } from "react-icons/go";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { playfair } from "../fonts/font";



const HeroSection = () => {
  
  const arr = [""];
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper relative bg-gradient-to-r from-primary-main to-heading-main text-white overflow-hidden h-screen"
    >
      {arr.map((ele, i) => (
        <SwiperSlide key={i} className="h-full w-full bg-[#d9d9d9]">
          {/* <div className="absolute inset-0">
            <img
              src="/assets/images/01.png"
              alt="Background Image"
              className="object-cover object-center w-full h-full"
            />
            <div className="absolute inset-0 " />
          </div> */}
          <div className="relative text-color  z-10 flex flex-col justify-center items-center h-full text-center max-w-4xl mx-auto md:p-0 sm:p-4 p-6">
            <div className="text-6xl text-center font-light">
              <span className={`highlight`}>
                future-ready {" "}
              </span>
              e-commerce <br/> <p className="flex mt-6"> solutions for your {" "}
              <span className={`highlight flex flex-col items-center`}>
                brand
                <svg className="" xmlns="http://www.w3.org/2000/svg" width="148" height="14" viewBox="0 0 148 14" fill="none">
                  <g clipPath="url(#clip0_2382_1860)">
                    <path d="M147.404 8.08289C146.252 7.43553 145.309 6.47793 138.484 5.25601C136.15 4.84945 133.82 4.40929 131.484 4.01953C114.042 1.54881 112.525 1.64065 99.6568 0.596807C92.7641 0.155527 85.8536 0.123047 78.9514 -0.000152834C74.0845 -0.0124728 69.2166 0.174567 64.3508 0.279847C38.1481 1.51745 47.2661 0.860007 29.0092 2.59265C21.1427 3.73169 13.2949 5.04097 5.43465 6.23713C4.26255 6.50705 3.0727 6.70417 1.91626 7.04577C0.636653 7.42881 0.588642 7.41313 0.40599 7.59233C-0.427945 8.23969 0.0949607 9.84801 1.31612 9.55233C4.86373 8.49169 4.68526 8.59249 19.9007 6.23041C20.3453 6.73217 20.6615 6.60897 21.8232 6.57873C23.1999 6.54289 24.5765 6.51937 25.9522 6.45329C31.5371 6.02657 37.1075 5.37585 42.6893 4.89089C44.6108 4.74529 46.5302 4.54145 48.4517 4.36449C50.8742 4.23457 53.2977 4.10801 55.7213 3.98369C68.2752 3.74177 64.6409 3.63313 80.2122 3.81345C82.6566 3.92433 80.3761 3.79329 93.3339 4.58625C103.417 5.58081 114.304 7.71553 124.168 9.75169C128.433 10.6376 136.345 12.3501 140.482 13.871C140.88 13.9886 141.346 13.8408 141.579 13.4701C141.91 13.0534 141.857 12.3837 141.498 11.9995C141.158 11.6501 140.648 11.6142 140.226 11.4306C138.359 10.7754 135.614 10.0765 133.581 9.57585L136.311 9.94321C138.714 10.2938 141.142 10.3822 143.549 10.6992C144.676 10.8067 146.203 10.9019 147.133 10.2075C147.369 10.035 147.64 9.89953 147.781 9.61729C148.069 9.10321 147.899 8.37857 147.406 8.08513L147.404 8.08289ZM96.5862 2.66209C100.515 2.81889 112.658 3.87729 117.11 4.33537C121.906 4.95249 126.701 5.57073 131.488 6.26065C134.019 6.79489 139.225 7.51617 142.105 8.29233C140.866 8.16353 139.624 8.07169 138.384 7.94961C124.455 6.16881 110.538 4.25137 96.5862 2.66209Z" fill="#5A00EC"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2382_1860">
                      <rect width="148" height="14" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

              </span>
              .
              </p>
            </div>
            <p className="text-2xl textmain max-w-lg font-light mx-auto my-6">
              Crafting digital experiences that engage, convert, and retain
              customers
            </p>
            <button className="font-medium text-sm mx-auto px-5 py-3 bg-white flex items-center justify-between gap-2 text-[#5A00EC] my-6">
              Let’s Grow <GoArrowUpRight className="text-2xl" />
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
