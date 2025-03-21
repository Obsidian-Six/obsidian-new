"use client"

import React, { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { MotionDiv } from "../utils/page";

const services = [
  {
    name: "Branding",
    image: "https://designshack.net/wp-content/uploads/responsive-website-app-templates.jpg",
    description:
      "We’ll craft unique brand identities, including logos, color schemes, and messaging, to help your business stand out and leave a lasting impression.",
  },
  {
    name: "Web Development",
    image: "https://designshack.net/wp-content/uploads/responsive-website-app-templates.jpg",
    description:
      "We create modern, responsive, and high-performance websites tailored to your business needs, ensuring a seamless user experience.",
  },
  {
    name: "Digital Marketing",
    image: "https://designshack.net/wp-content/uploads/responsive-website-app-templates.jpg",
    description:
      "Our expert digital marketing strategies help boost your brand’s online presence, drive traffic, and increase conversions effectively.",
  },
];

const HomeService = () => {
  const [selectedService, setSelectedService] = useState(services[0]);
  const variants = {
    start: { x: 500, opacity: 0 },
    end: { x: 0, opacity: 1 },
    startUp: { x: -200, opacity: 0 },
    endUp: { x: 0, opacity: 1 },
  };

  return (
    <div id="services" className="max-w-7xl mx-auto my-20 px-4 overflow-hidden">
      {/* Title */}
      <div className="text-6xl font-light poppins uppercase max-md:text-4xl">
        Services
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 my-10 items-end">
        {/* Service List */}
        <MotionDiv
         variants={variants}
         initial={variants.startUp}
         whileInView={variants.endUp}
         transition={{ duration: 0.4, delay: 0.1 }}
         viewport={{ once: true }}
        >
          {services.map((service) => (
            <div
              key={service.name}
              className={`flex items-center justify-between text-2xl max-md:text-xl uppercase poppins py-5 border-b border-b-[#19183A]/20 cursor-pointer ${
                selectedService.name === service.name ? "text-[#5A00EC]" : "textmain"
              }`}
              onClick={() => setSelectedService(service)}
            >
              {service.name} <BsArrowRightCircle />
            </div>
          ))}
        </MotionDiv>

        {/* Image & Description */}
        <MotionDiv
        key={selectedService.name}
        variants={variants}
        initial={variants.start}
        whileInView={variants.end}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: false }}
         className="col-span-2 max-md:col-span-1">
          <img
            src={selectedService.image}
            alt={selectedService.name}
            className="w-full h-[26rem] max-md:h-auto object-cover rounded-lg transition-all duration-300"
          />

          {/* Service Description */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-24 mt-5">
            <div className="text-4xl max-md:text-2xl font-light poppins uppercase">
              {selectedService.name}
              <p className="h-[1px] bg-[#5A00EC] w-[80%] md:ml-auto" />
            </div>
            <p className="textmain inter opacity-90 max-md:text-sm">
              {selectedService.description}
            </p>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default HomeService;
