"use client";
import { motion } from "framer-motion";

export function VisionQuote() {
  return (
    /* FIXED: 
       - pt-40 md:pt-60 -> Large gap ABOVE to stop mixing with top component.
       - pb-10 md:pb-12 -> Small gap BELOW to keep the next section close.
    */
    <section className="relative w-full pt-40 md:pt-60 pb-10 md:pb-12 px-10 flex justify-center items-center bg-transparent">
      <motion.div
        className="text-center max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-light italic font-serif leading-[1.7] md:leading-[1.5] text-slate-900 tracking-tight">
          “We exist to turn vision into{" "}
          <span className="relative inline-block align-middle my-1">
            <span className="bg-[#052D69] px-3 py-1 md:px-4 md:py-1 not-italic font-sans font-bold text-white tracking-tighter inline-block transform -rotate-1 shadow-lg shadow-[#052D69]/10">
              results
            </span>
          </span>
          <span className="mx-1 md:mx-2">—</span>
          <br className="hidden md:block" />
          and brands into{" "}
          <span className="relative inline-block align-middle my-1">
            <span className="bg-[#052D69] px-3 py-1 md:px-4 md:py-1 not-italic font-sans font-bold text-white tracking-tighter inline-block transform rotate-1 shadow-lg shadow-[#052D69]/10">
              experiences
            </span>
          </span>.”
        </h3>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mt-10"
        />
      </motion.div>
    </section>
  );
}