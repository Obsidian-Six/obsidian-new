"use client"

import React, { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";

const services = [
  {
    name: "Branding",
    image: "https://designshack.net/wp-content/uploads/responsive-website-app-templates.jpg",
    description:
      "We’ll craft unique brand identities, including logos, color schemes, and messaging, to help your business stand out and leave a lasting impression.",
  },
  {
    name: "Web Development",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*hRmFxnHzppZkNTRxCIqNXw.png",
    description:
      "We create modern, responsive, and high-performance websites tailored to your business needs, ensuring a seamless user experience.",
  },
  {
    name: "Digital Marketing",
    image: "https://www.elegantthemes.com/blog/wp-content/uploads/2023/03/Digital-Marketing-Examples.png",
    description:
      "Our expert digital marketing strategies help boost your brand’s online presence, drive traffic, and increase conversions effectively.",
  },
];

const HomeService = () => {
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <div id="services" className="max-w-7xl mx-auto my-20 px-4">
      {/* Title */}
      <div className="text-6xl font-light poppins uppercase max-md:text-4xl">
        Services
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 my-10 items-end">
        {/* Service List */}
        <div>
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
        </div>

        {/* Image & Description */}
        <div className="col-span-2 max-md:col-span-1">
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
        </div>
      </div>
    </div>
  );
};

export default HomeService;
