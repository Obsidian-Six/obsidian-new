"use client";

import clientLogos from "@/lib/store/client-logos";
import Image from "next/image";
import { motion } from "framer-motion";

export default function OurClients() {
  return (
    <section id="ourClients" className="bg-white py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-16">
          <div className="w-full md:w-1/2">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#5A00EC] font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-bold"
            >
              [ Trusted Partners ]
            </motion.span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl text-black font-extrabold tracking-tighter leading-none uppercase">
              Clients
            </h2>
          </div>
          <div className="w-full md:w-1/3 border-l-2 border-black pl-6">
            <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">

              Empowering business throughout the world.

            </p>
          </div>
        </div>

        {/* --- Logo Grid: 3 per row on mobile, 4 per row on desktop --- */}
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {clientLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              viewport={{ once: true }}
              /* Adjusted padding to maintain a "medium" look with 3 items on small screens */
              className="group relative flex items-center justify-center bg-gray-50/40 rounded-xl p-6 md:p-12 hover:bg-white hover:shadow-[0_20px_40px_rgba(90,0,236,0.06)] transition-all duration-500 border border-transparent hover:border-gray-100"
            >
              <figure className="relative z-10 w-full aspect-[3/2] flex items-center justify-center">
                <Image
                  src={logo.url}
                  alt={logo.name || `client-logo-${index}`}
                  width={180}
                  height={90}
                  /* Medium sizing: max-w 150px on desktop, 90px on mobile */
                  className="w-auto h-auto max-w-[80px] sm:max-w-[100px] md:max-w-[150px] max-h-[35px] sm:max-h-[45px] md:max-h-[65px] object-contain transition-all duration-500 
                  grayscale-0 opacity-80
                  md:grayscale md:opacity-40 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-105"
                />
              </figure>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}