"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsArrowRightCircle } from "react-icons/bs";
import { MotionDiv } from "@/lib/motion";
import services, { type Service } from "./data";

const HomeService = () => {
  const [selectedService, setSelectedService] = useState<Service>(services[0]!);

  const variants = {
    start: { x: 500, opacity: 0 },
    end: { x: 0, opacity: 1 },
    startUp: { x: -200, opacity: 0 },
    endUp: { x: 0, opacity: 1 },
  } as const;

  return (
    <section
      id="services"
      className="max-w-7xl mx-auto my-20 px-4 overflow-hidden"
    >
      {/* Title */}
      <h2 className="text-6xl font-light poppins uppercase max-md:text-4xl">
        Services
      </h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-12 leading-normal my-10 items-end">
        {/* Service List */}
        <MotionDiv
          variants={variants}
          initial={variants.startUp}
          whileInView={variants.endUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <button
              type="button"
              key={service.name}
              aria-pressed={selectedService.name === service.name}
              className={`w-full text-left flex items-center justify-between text-2xl max-md:text-xl uppercase poppins py-5 border-b border-b-[#19183A]/20 cursor-pointer ${
                selectedService.name === service.name
                  ? "text-[#5A00EC]"
                  : "text-main"
              }`}
              onClick={() => setSelectedService(service)}
            >
              {service.name} <BsArrowRightCircle aria-hidden="true" />
            </button>
          ))}
        </MotionDiv>

        {/* Image & Description */}
        <MotionDiv className="md:col-span-2 col-span-1">
          <div className="relative w-full md:h-[26rem] h-44">
            <Image
              src={selectedService.image}
              alt={selectedService.name}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>

          {/* Service Description */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-14 mt-5 leading-normal">
            <div className="text-4xl max-md:text-2xl font-light poppins uppercase">
              {selectedService.name}
              <p className="h-[1px] bg-[#5A00EC] w-[80%] md:ml-auto" />
            </div>
            <p className="text-main inter opacity-90 max-md:text-sm">
              {selectedService.description}
            </p>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default HomeService;
