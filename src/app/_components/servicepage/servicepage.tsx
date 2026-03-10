"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import services from "../service/data";

const ServicePage = () => {
  const getTagline = (name: string) => {
    switch (name) {
      case "Branding & Identity": return "DEFINE YOUR BRAND";
      case "Web Development": return "BUILD YOUR DIGITAL FOUNDATION";
      case "Social Media Marketing": return "AMPLIFY YOUR VOICE";
      case "E-Commerce Solutions": return "SELL SMARTER ONLINE";
      case "Digital Marketing": return "DRIVE GROWTH & VISIBILITY";
      case "UI/UX & Graphics": return "DESIGN EXPERIENCES THAT MOVE";
      case "Performance Marketing": return "DATA DRIVEN RESULTS";
      case "Custom Web Applications": return "SOLUTIONS BUILT FOR YOU";
      default: return "OUR EXPERTISE";
    }
  };

  return (
    <section className="bg-white py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-light text-black tracking-tighter uppercase poppins">
            Our Services
          </h2>
          <div className="w-full h-[1px] bg-gray-100 mt-6" />
        </div>

        {/* Services List */}
        <div className="space-y-12 md:space-y-16">
          {services.map((service) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start group"
            >
              {/* Column 1: Label & Title */}
              <div className="lg:col-span-4 space-y-3">
                <span className="inline-block bg-[#5A00EC] text-white text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-[0.2em]">
                  {getTagline(service.name)}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight leading-tight">
                  {service.name}
                </h3>
              </div>

              {/* Column 2: Description */}
              <div className="lg:col-span-5 lg:pt-1">
                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md italic font-medium">
                  {service.description}
                </p>
              </div>

              {/* Column 3: Image Wrapper */}
              <div className="lg:col-span-3">
                {/* Removed group-hover:shadow-[#5A00EC]/5 to stop shadow change on hover */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md shadow-lg transition-all duration-500">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    /* Removed 'grayscale' and 'group-hover:grayscale-0' 
                       Removed 'group-hover:scale-105'
                    */
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </div>

              {/* Decorative Divider */}
              <div className="col-span-full h-[1px] bg-gray-50 mt-8 group-last:hidden" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePage;