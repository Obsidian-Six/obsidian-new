"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

  return (
    <div id="ourWork" className="max-w-7xl mx-auto px-4">
      {/* Title Section */}
      <div className="text-center my-14 text-xs font-semibold textmain">
        [Our Work]
      </div>

      <div className="text-6xl my-16 textmain max-w-5xl mx-auto text-center font-light leading-snug max-md:text-4xl max-md:leading-normal">
        We empowered many ambitious businesses to achieve and surpass their
        <span className="highlight"> growth </span> objectives.
      </div>

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
          // spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000} // Controls smoothness of sliding
          breakpoints={{
            640: { slidesPerView: 1 , spaceBetween :5},
            1024: { slidesPerView: 2 , spaceBetween :10},
            1280: { slidesPerView: 3.5 , spaceBetween :30},
          }}
        >
          {projects.map((project, i) => (
            <SwiperSlide key={i}>
              <div className="textmain">
                {/* Project Title */}
                <div className="text-xs text-[#5A00EC] flex items-center gap-2 uppercase">
                  <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> {project.title}
                </div>

                <p className="my-1.5 text-xl max-md:text-lg">{project.category}</p>

                {/* Image */}
                <img
                  src={project.img}
                  className="my-2.5 w-full rounded-md md:h-72 h-52 object-cover"
                  alt="Project"
                />

                {/* Tags */}
                <div className="text-xs textmain space-x-3 flex flex-wrap max-md:space-x-2 max-md:gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bordermain rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Description */}
                <p className="textmain mt-8 inter opacity-60 max-md:mt-4 max-md:text-sm">
                  {project.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* View More Button */}
      <button className="textmain text-xl bordermain mx-auto px-4 py-2 flex self-center my-20 max-md:my-12 max-md:text-lg">
        View More
      </button>
    </div>
  );
};

export default OurWork;
