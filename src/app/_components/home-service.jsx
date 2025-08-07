"use client"

import React, { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { MotionDiv } from "../utils/page";

const services = [
  {
    name: "Branding & Identity",
  image: "/images/branding.jpg",
    description:
      "We craft unique brand identities, including logo design, color schemes, typography, and messaging, to create a lasting impact for your business.",
  },
  {
    name: "Web Development",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "From custom websites to scalable web applications, we develop high-performance, responsive, and user-friendly digital solutions tailored to your needs.",
  },
  {
    name: "E-Commerce Solutions",
    image: "https://images.pexels.com/photos/8939307/pexels-photo-8939307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "We build and optimize e-commerce platforms, integrating secure payment gateways, seamless user experiences, and conversion-focused designs.",
  },
  {
    name: "Digital Marketing & SEO",
    image: "https://images.pexels.com/photos/38547/office-freelancer-computer-business-38547.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Our expert digital marketing strategies, including SEO, paid advertising, and content marketing, help boost visibility, drive traffic, and increase conversions.",
  },
  {
    name: "UI/UX & Motion Graphics",
    image: "https://images.pexels.com/photos/2584076/pexels-photo-2584076.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "We create intuitive, user-centered designs with engaging animations, interactive elements, and conversion-optimized interfaces.",
  },
  {
    name: "Custom Web Applications",
    image: "https://images.pexels.com/photos/7634159/pexels-photo-7634159.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "We build scalable SaaS platforms, real-time web applications, and automation tools to streamline business operations and enhance user experiences.",
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
        // key={selectedService.name}
        variants={variants}
        // initial={variants.start}
        // whileInView={variants.end}
        // transition={{ duration: 0.4, delay: 0.1 }}
        // viewport={{ once: false }}
         className="md:col-span-2 col-span-1">
          <img
            src={selectedService.image}
            alt={selectedService.name}
            className="w-full md:h-[26rem] h-44 object-cover rounded-lg "
          />

          {/* Service Description */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-14 mt-5  leading-normal">
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
