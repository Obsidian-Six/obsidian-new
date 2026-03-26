"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import clientLogos from "@/lib/store/client-logos";

const ClientTicker = () => {
  // We use a triple-duplicate to ensure that even on ultra-wide screens, 
  // the gap is never visible during the loop.
  const tickerLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <div className="w-full bg-white py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#024787] font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase block font-bold mb-4"
        >
          [ Trusted Partners ]
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-6xl font-light tracking-tight text-slate-900 leading-tight"
        >
          Behind Every Great <span className="italic font-serif text-[#024787]">Strategy</span>, <br className="hidden md:block" />
          There’s a Great <span className="italic font-serif text-[#024787]">Team</span>.
        </motion.h2>
      </div>

      {/* --- TICKER ANIMATION CONTAINER --- */}
      <div className="flex relative items-center">
        {/* Improved Responsive Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-6 md:gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35, // Slightly faster for energy, but still smooth
              ease: "linear",
            },
          }}
          // Pause animation on hover for better UX
          whileHover={{ animationPlayState: "paused" }}
        >
          {tickerLogos.map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 group"
            >
              {/* Responsive container: smaller on mobile, large on desktop */}
              <div className="relative h-20 md:h-32 w-36 md:w-60 flex items-center justify-center bg-gray-50/40 rounded-xl md:rounded-2xl border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(90,0,236,0.1)] hover:border-[#024787]/20">
                <div className="relative w-24 md:w-40 h-10 md:h-16">
                  <Image
                    src={logo.url}
                    alt={logo.name || "client logo"}
                    fill
                    className="object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100px, 160px"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom decorative divider */}
      <div className="mt-16 md:mt-24 flex justify-center px-6">
        <div className="h-[1px] w-full max-w-xl bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </div>
  );
};

export default ClientTicker;