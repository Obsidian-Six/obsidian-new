"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const countries = [
  "Germany", "France", "Spain", "UAE", "Saudi Arabia", 
  "Korea", "Singapore", "Australia", "USA", "Canada", 
  "United Kingdom", "India", "Japan", "Brazil"
];

const Map = () => {
  const tickerVariants: any = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 35,
          ease: "linear",
        },
      },
    },
  };

  return (
    // Changed pb-24 to pb-4 to remove bottom gap
    <section className="pt-16 pb-4 md:pt-24 md:pb-8 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* Title Section */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-lato text-[#1a1a1a] mb-2 tracking-tighter uppercase"
        >
          Powering Businesses <span className="italic font-serif normal-case">Worldwide</span>
        </motion.h2>

        {/* Ticker Tape */}
        <div className="relative mt-8 md:mt-10 flex overflow-hidden whitespace-nowrap py-4 border-y border-gray-100 bg-transparent">
          <motion.div 
            className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24"
            variants={tickerVariants}
            animate="animate"
          >
            {[...countries, ...countries].map((country, index) => (
              <span 
                key={index} 
                className="text-base md:text-lg font-medium text-gray-400 uppercase tracking-[0.2em] poppins"
              >
                {country}
              </span>
            ))}
          </motion.div>
          
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
        </div>

        {/* Map Container - Reduced height and margin to stop it pushing the next section down */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" as any }}
          className="relative mt-6 md:mt-8 mx-auto w-full max-w-5xl h-[200px] sm:h-[300px] md:h-[400px]"
        >
          <div className="relative w-full h-full">
            <Image
              src="/world-map-blue.png" 
              alt="Global Presence Map"
              fill
              className="object-contain z-10 opacity-80"
              priority
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#5A00EC]/5 blur-[80px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Map;