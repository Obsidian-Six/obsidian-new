"use client";

import  { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { MotionDiv } from "@/lib/motion";
import Image from "next/image";

type SwiperRef = React.MutableRefObject<any>;

const OurTeam = () => {
  const swiperRef = useRef<any>(null) as SwiperRef;
  
  // Example team members - ensure these images are high quality
  const teamMembers = Array(10).fill({
    img: "/images/team/member.jpg", // Replace with actual path
    name: "Aniket Kalawat",
    role: "Software Developer",
  });

  const variants = {
    start: { y: 40, opacity: 0 },
    end: { y: 0, opacity: 1 },
  } as const;

  return (
    <div id="Team" className="relative bg-white overflow-hidden">
      {/* Background Image - Cleaned up opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/logo/bg.png"
          alt="Background"
          fill
          className="opacity-5 object-cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <MotionDiv
          variants={variants}
          initial="start"
          whileInView="end"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="pt-20 pb-12 text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1]">
            Behind Every Great <br className="hidden md:block" />
            <span className="text-[#5A00EC]">Strategy</span> is a Great <br className="hidden md:block" />
            <span className="text-[#5A00EC]">Team</span>
          </h2>
          
          <button className="mt-8 group mx-auto px-8 py-4 bg-[#5A00EC] text-white rounded-full flex items-center gap-3 hover:bg-black transition-all duration-300 font-semibold text-sm">
            Work With Us
            <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform" />
          </button>
        </MotionDiv>

        {/* Swiper Slider */}
        <div
          className="pb-24"
          onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
          onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
        >
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={5000} // Smoother continuous scroll
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 15 },
              640: { slidesPerView: 2.5, spaceBetween: 20 },
              1024: { slidesPerView: 4.5, spaceBetween: 25 },
            }}
          >
            {teamMembers.map((member, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-transparent group">
                  {/* The Image - object-cover removes the "border" gaps */}
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-700 md:grayscale group-hover:grayscale-0 group-hover:scale-105"
                  />
                  
                  {/* Text Overlay - Neater Mobile look */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-sm font-bold text-black uppercase tracking-wider">{member.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{member.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;