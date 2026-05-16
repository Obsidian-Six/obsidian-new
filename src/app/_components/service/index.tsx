"use client";

import { useState } from "react";
import Image from "next/image";
import { BsArrowRightCircle } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { MotionDiv } from "@/lib/motion";
import { AnimatePresence } from "framer-motion"; // Added for smooth mobile opening
import services, { type Service } from "./data";
import ContactPopup from "../ContactPopup/ContactPopup";

const HomeService = () => {
  const [selectedService, setSelectedService] = useState<Service>(services[0]!);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Content block to avoid repeating code for Mobile and Desktop
  const ServiceContent = ({ service }: { service: Service }) => (
    <MotionDiv
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full overflow-hidden"
    >
      <div className="relative w-full aspect-video md:h-[28rem] rounded-2xl overflow-hidden shadow-xl mt-4 lg:mt-0">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 mt-10 items-start pb-8 lg:pb-0">
        <div>
          <div className="text-4xl max-md:text-2xl font-medium font-poppins uppercase tracking-tight text-[#19183A]">
            {service.name}
            <div className="h-[2px] bg-[#024787] w-16 mt-3" />
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent trigger parent clicks
              setIsPopupOpen(true);
            }}
            className="mt-8 group inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-slate-900 text-white rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-[#024787] transition-all duration-300 shadow-lg shadow-[#024787]/10"
          >
            Inquire Now
            <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>
        
        <p className="text-main font-inter text-lg opacity-80 max-md:text-base leading-snug">
          {service.description}
        </p>
      </div>
    </MotionDiv>
  );

  return (
    <section id="services" className="max-w-7xl mx-auto my-24 px-4 overflow-hidden">
      <div className="mb-12">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[#024787] font-poppins text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-medium"
        >
          [ Our Services ]
        </MotionDiv>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-slate-950 font-light tracking-tighter leading-none">
          Services
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
        
        {/* Interactive Service List */}
        <div className="flex flex-col">
          {services.map((service) => (
            <div key={service.name} className="border-b border-b-[#19183A]/10">
              <button
                type="button"
                className={`w-full text-left flex items-center justify-between text-2xl max-md:text-xl uppercase font-poppins py-6 transition-colors duration-300 ${
                  selectedService.name === service.name
                    ? "text-[#024787]"
                    : "text-main opacity-60 hover:opacity-100"
                }`}
                onClick={() => setSelectedService(service)}
              >
                <span className="max-w-[80%]">{service.name}</span>
                <BsArrowRightCircle 
                  className={`transition-transform duration-300 ${
                    selectedService.name === service.name ? 'rotate-[-45deg]' : ''
                  }`} 
                />
              </button>

              {/* Mobile View Content: Only visible under the button on small screens */}
              <div className="lg:hidden">
                <AnimatePresence>
                  {selectedService.name === service.name && (
                    <ServiceContent service={service} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View Content: Always on the right, hidden on mobile */}
        <div className="hidden lg:block w-full">
           <AnimatePresence mode="wait">
              <ServiceContent key={selectedService.name} service={selectedService} />
           </AnimatePresence>
        </div>
      </div>

      {isPopupOpen && (
        <ContactPopup 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)} 
          defaultService={selectedService.name} 
        />
      )}
    </section>
  );
};

export default HomeService;