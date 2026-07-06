"use client";

import { useState } from "react";
import Image from "next/image";
import { BsArrowRightCircle } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { MotionDiv } from "@/lib/motion";
import { AnimatePresence } from "framer-motion";
import services, { type Service } from "./data";
import ContactPopup from "../ContactPopup/ContactPopup";

const HomeService = () => {
  const [selectedService, setSelectedService] = useState<Service>(services[0]!);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Content block engineered to scale precisely inside the parent viewport budget
  const ServiceContent = ({ service, isDesktop = false }: { service: Service; isDesktop?: boolean }) => (
    <MotionDiv
      initial={isDesktop ? { opacity: 0, y: 10 } : { opacity: 0, height: 0 }}
      animate={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, height: "auto" }}
      exit={isDesktop ? { opacity: 0, y: -10 } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`w-full overflow-hidden ${isDesktop ? "h-full flex flex-col justify-between" : ""}`}
    >
      {/* Constrained Image Box matching vertical limits perfectly */}
      <div className="relative w-full overflow-hidden rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] aspect-[16/9] border border-slate-100/60">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Structured Content Grid fits entirely within the fold */}
      <div className={`grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr] gap-4 items-start ${isDesktop ? "h-[40%] pt-4" : "mt-4 pb-4"}`}>
        <div className="flex flex-col items-start gap-4">
          <div>
            <div className="text-xl md:text-2xl font-semibold font-poppins uppercase tracking-tight text-[#19183A] leading-tight">
              {service.name}
            </div>
            <div className="h-[2px] bg-[#024787] w-10 mt-2" />
          </div>

          <button
            suppressHydrationWarning
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPopupOpen(true);
            }}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#024787] transition-all duration-300 shadow-md shadow-[#024787]/10 whitespace-nowrap os-btn-slide"
          >
            Inquire Now
            <GoArrowUpRight className="text-base group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>

        <p className="text-main font-inter text-sm md:text-base opacity-80 leading-relaxed text-slate-700 max-h-full overflow-y-auto pr-1">
          {service.description}
        </p>
      </div>
    </MotionDiv>
  );

  return (
    <section id="services" className="max-w-7xl mx-auto my-12 lg:my-16 px-6 overflow-hidden h-fit lg:h-[75vh] lg:max-h-[650px] flex flex-col justify-between">

      {/* Core Structural Layout Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-x-12 lg:gap-x-16 items-stretch h-full w-full">

        {/* Left Column Container: Houses Headers and Navigation List in Unity */}
        <div className="flex flex-col justify-start h-full">
          {/* Header block element */}
          <div className="mb-6 lg:mb-8">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#024787] font-poppins text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 block font-semibold"
            >
              [ Our Services ]
            </MotionDiv>
            <h2 className="text-4xl md:text-5xl text-slate-950 font-light tracking-tighter leading-none uppercase font-poppins">
              Services
            </h2>
          </div>

          {/* Selector Navigation List Stack */}
          <div className="flex flex-col border-t border-t-[#19183A]/10 w-full">
            {services.map((service) => (
              <div key={service.name} className="border-b border-b-[#19183A]/10">
                <button
                  suppressHydrationWarning
                  type="button"
                  className={`w-full text-left flex items-center justify-between text-lg md:text-xl uppercase font-poppins py-4 transition-all duration-300 ${selectedService.name === service.name
                    ? "text-[#024787] font-medium pl-2"
                    : "text-main opacity-60 hover:opacity-100 hover:pl-1"
                    }`}
                  onClick={() => setSelectedService(service)}
                >
                  <span className="max-w-[85%] tracking-tight">{service.name}</span>
                  <BsArrowRightCircle
                    className={`text-lg md:text-xl transition-transform duration-300 ${selectedService.name === service.name ? 'rotate-[-45deg] text-[#024787]' : 'text-slate-400'
                      }`}
                  />
                </button>

                {/* Mobile Dropdown Views Accordion */}
                <div className="lg:hidden">
                  <AnimatePresence>
                    {selectedService.name === service.name && (
                      <ServiceContent service={service} isDesktop={false} />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Container: Fixed-Height Desktop Showcase Window */}
        {/* Placed side-by-side with the left column, matching top alignment with [Our Services] */}
        <div className="hidden lg:block w-full lg:h-[min(550px,65vh)] self-start mt-1">
          <AnimatePresence mode="wait">
            <ServiceContent key={selectedService.name} service={selectedService} isDesktop={true} />
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