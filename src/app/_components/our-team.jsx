"use client";

import React, { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { MotionDiv } from "../utils/page";

const OurTeam = () => {
  const swiperRef = useRef(null);
  const teamMembers = Array(10).fill({
    img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fbharat-bajaj.jpg&w=1920&q=75",
    name: "Aniket Kalawat",
    role: "Software Developer",
  });

  const variants = {
    start: { y: 200, opacity: 0 },
    end: { y: 0, opacity: 1 },
    startUp: { x: 200, opacity: 0 },
    endUp: { x: 0, opacity: 1 },
  };

  return (
    <div id="aboutUs" className="relative">
      {/* Background Image */}
      <img
        src="/images/logo/bg.png"
        alt="No Preview"
        className="h-full w-full opacity-20 absolute object-cover"
      />

<div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-80"></div>


      {/* Header Section */}
      <MotionDiv
      variants={variants}
      initial={variants.start}
      whileInView={variants.end}
      transition={{ duration: 0.4, delay: 0.1 }}
      viewport={{ once: true }}

       className="p-12 text-center">
        <div className="text-6xl font-light max-w-5xl mx-auto leading-snug max-md:text-4xl max-sm:text-3xl">
          Behind Every Great
          <span className="highlight"> Strategy </span>
          is a Great
          <span className="highlight"> Team </span>— Reach Out to Us.
        </div>
        <button className="font-medium text-sm mx-auto px-5 py-3 bg-white flex items-center justify-between gap-2 text-[#5A00EC] border-[#5A00EC] border my-6 max-md:w-full">
          Contact Us
          <GoArrowUpRight className="text-2xl" />
        </button>
      </MotionDiv>

      {/* Swiper Slider */}
      <div
        className="overflow-hidden pb-28"
        onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
      >
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={3000}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 10 }, // Mobile
            640: { slidesPerView: 2, spaceBetween: 20 }, // Tablet
            1024: { slidesPerView: 5.5, spaceBetween: 30 }, // Desktop
          }}
        >
          {teamMembers.map((member, i) => (
            <SwiperSlide key={i}>
              <div className="relative md:w-60 h-72 group mx-auto">
                <img
                  src={member.img}
                  alt="No Preview"
                  className="md:w-60 h-72 object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute bottom-0 p-2.5 left-0 w-full">
                  <div className="textmain bg-white w-full p-2.5">
                    <p className="text-sm inter font-medium">{member.name}</p>
                    <p className="text-xs poppins font-light">{member.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurTeam;
