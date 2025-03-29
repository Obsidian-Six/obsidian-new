"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { MotionDiv } from "../utils/page";
import { CaseStudyData } from "@/data";
import Link from "next/link";

const OurWork = () => {
  const swiperRef = useRef(null);

  const projects = [
    {
      title: "Pachmarhi Ayurveda",
      category: "Healthcare",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75",
      tags: ["Website", "Branding", "Marketing"],
      description:
        "Filled nearly 90% seats for a newly started Amazon Delivery Service Partner. A US-based Amazon delivery service partner in mid-2021 and our collaboration with them began in November of the same year.",
    },
    {
      title: "Project X",
      category: "Finance",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F03.png&w=1920&q=75",
      tags: ["Consulting", "SEO"],
      description:
        "Helped optimize operations and drive significant revenue growth for a fintech startup.",
    },
    {
      title: "E-commerce Store",
      category: "Retail",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F04.png&w=1920&q=75",
      tags: ["E-commerce", "UI/UX"],
      description:
        "Built a seamless shopping experience with cutting-edge UI/UX and growth marketing strategies.",
    },
    {
      title: "E-commerce Store",
      category: "Retail",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F04.png&w=1920&q=75",
      tags: ["E-commerce", "UI/UX"],
      description:
        "Built a seamless shopping experience with cutting-edge UI/UX and growth marketing strategies.",
    },
    {
      title: "E-commerce Store",
      category: "Retail",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F04.png&w=1920&q=75",
      tags: ["E-commerce", "UI/UX"],
      description:
        "Built a seamless shopping experience with cutting-edge UI/UX and growth marketing strategies.",
    },
  ];

  const variants = {
    start: { y: 200, opacity: 0 },
    end: { y: 0, opacity: 1 }
  };

  return (
    <div id="ourWork" className="max-w-7xl mx-auto px-4">
      {/* Title Section */}
      <div className="text-center md:my-14 my-6 text-xs font-semibold textmain">
        [Our Work]
      </div>

      <MotionDiv
        variants={variants}
        initial={variants.start}
        whileInView={variants.end}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-6xl md:my-16 my-10 textmain max-w-5xl mx-auto text-center font-light leading-snug max-md:text-3xl  max-md:leading-normal poppins">
        We empowered many ambitious businesses to achieve and surpass their
        <span className="highlight"> growth </span> objectives.
      </MotionDiv>

      {/* Swiper Slider */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
      >
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          // slidesPerView={2}
          spaceBetween={15}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000} // Controls smoothness of sliding
          breakpoints={{
            640: { slidesPerView: 1 , spaceBetween :10},
            1024: { slidesPerView: 2 , spaceBetween :10},
            1280: { slidesPerView: 3.5 , spaceBetween :30},
          }}
        >
          {CaseStudyData.map((ele, i) => (
            <SwiperSlide key={i}>
              <MotionDiv whileHover={{ scale: 0.85 }} className="textmain hover:">
                  <Link href={`/case-study/${ele.id}`}>
                    <div className="text-xs text-[#5A00EC] flex items-center gap-2 uppercase">
                      <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> {ele.name}
                    </div>
                    <p className="my-1.5 text-xl max-md:text-lg">{ele.category}</p>
                    <img
                      src={ele.cardImg}
                      className="my-2.5 w-full rounded-md md:h-72 h-52 object-cover"
                      alt="Project"
                    />
                    <div className="text-xs textmain space-x-3 space-y-2 flex flex-wrap max-md:space-x-2 max-md:gap-2">
                      {ele.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bordermain rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="textmain mt-8 inter opacity-60 max-md:mt-4 max-md:text-sm">
                      {ele.cardData}
                    </p>
                  </Link>
              </MotionDiv>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* View More Button */}
      <Link href={'/case-study'} className=" button text-[#19183A] w-fit text-xl bordermain mx-auto px-4 py-2 flex self-center my-20 max-md:my-10 max-md:text-lg hover:bg-[#5A00EC] hover:text-white transition-transform duration-300 ease-linear" >
        View More
      </Link>
    </div>
  );
};

export default OurWork;
