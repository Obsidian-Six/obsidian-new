"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { MotionDiv, MotionP } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import caseStudiesData from "@/lib/store/case-studies";

const OurWork = () => {
  const swiperRef = useRef<any>(null);

  const variants = {
    start: { y: 200, opacity: 0 },
    end: { y: 0, opacity: 1 },
  };

  return (
    <section id="ourWork" className="max-w-7xl mx-auto px-4">
      <h2 className="text-center md:my-14 my-6 text-xs font-semibold text-main">
        [Our Work]
      </h2>

      <MotionP
        variants={variants}
        initial={variants.start}
        whileInView={variants.end}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-6xl md:my-16 my-10 text-main max-w-5xl mx-auto text-center font-light leading-snug max-md:text-3xl  max-md:leading-normal poppins"
      >
        We empowered many ambitious businesses to achieve and surpass their
        <span className="highlight"> growth </span> objectives.
      </MotionP>

      <div
        className="overflow-hidden"
        onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
      >
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          spaceBetween={15}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            1024: { slidesPerView: 2, spaceBetween: 10 },
            1280: { slidesPerView: 3.5, spaceBetween: 30 },
          }}
        >
          {caseStudiesData.map((caseStudy, index) => (
            <SwiperSlide key={index}>
              <MotionDiv
                initial={{ scale: 0.85 }}
                whileHover={{ scale: 1 }}
                className="text-main hover:"
              >
                <Link href={`/case-studies/${caseStudy.slug}`}>
                  <div className="text-xs text-[#5A00EC] flex items-center gap-2 uppercase">
                    <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> {caseStudy.name}
                  </div>
                  <p className="my-1.5 text-xl max-md:text-lg">
                    {caseStudy.category}
                  </p>
                  <Image
                    src={caseStudy.image}
                    className="my-2.5 w-full rounded-md md:h-72 h-52 object-cover"
                    alt="Project"
                    width={640}
                    height={288}
                  />
                  <div className="text-xs text-main space-x-3 space-y-2 flex flex-wrap max-md:space-x-2 max-md:gap-2">
                    {caseStudy.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 border-main rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-main mt-8 inter opacity-60 max-md:mt-4 max-md:text-sm">
                    {caseStudy.details}
                  </p>
                </Link>
              </MotionDiv>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link
        href={"/case-studies"}
        className=" button text-[#19183A] w-fit text-xl border-main mx-auto px-4 py-2 flex self-center my-20 max-md:my-10 max-md:text-lg hover:bg-[#5A00EC] hover:text-white transition-transform duration-300 ease-linear"
      >
        View More
      </Link>
    </section>
  );
};

export default OurWork;
