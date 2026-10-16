
"use client";

import { motion, useReducedMotion } from "framer-motion";

const results = [
  "3,324 orders in 5 months for a pet food brand",
  "450+ leads in month one for a Dubai consultancy",
  "All 300 seats filled for an MBA college",
];

export default function ResultsMarquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden border-y border-white/10 bg-[#fff] py-5 sm:py-6">
      {/* Gradient edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#fff] to-transparent sm:w-24 md:w-40" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#fff] to-transparent sm:w-24 md:w-40" />

      {/* Marquee viewport */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex w-max shrink-0 items-center"
          initial={{ x: "0%" }}
          animate={
            shouldReduceMotion
              ? { x: "0%" }
              : { x: "-50%" }
          }
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
          }}
          style={{ willChange: "transform" }}
        >
          {/* Two identical groups create a seamless loop */}
          {[0, 1].map((group) => (
            <div
              key={group}
              aria-hidden={group === 1}
              className="flex shrink-0 items-center justify-center"
            >
              {results.map((result, index) => (
                <>
                <div
                  key={`${group}-${index}`}
                  className="flex shrink-0 items-center justify-center gap-5 px-5 sm:gap-8 sm:px-8 md:gap-1 md:px-5"
                >
                  <p className="whitespace-nowrap text-sm font-medium tracking-wide text-black sm:text-base md:text-lg flex">
                    {result}
                  </p>

                </div>
                  <span
                    aria-hidden="true"
                    className="h-8 w-0.5 shrink-0 bg-black"
                  />
                </>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
