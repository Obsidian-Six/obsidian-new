"use client";
import { MotionDiv, MotionH2 } from "@/lib/motion";
import Slider from "./slider";

const Reviews = () => {
  return (
    <section className=" font-sans">
      <div className="max-w-7xl mx-auto pb-32 px-4">
        {/* CHANGED: Added flex, items-center, and text-center to align everything to the middle */}
        <div className="mb-12 pt-14 flex flex-col items-center text-center">
          <MotionDiv
            /* CHANGED: Swapped x: -20 to y: 20 so it animates upwards instead of from the left, which looks better centered */
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#052D69] font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-medium"
          >
            [ Testimonials ]
          </MotionDiv>
          <MotionH2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl text-slate-950 font-light tracking-tighter leading-[1.1]"
          >
            Hear from Those We’ve Helped <br className="hidden md:block" />
            <span className="italic font-serif text-[#052D69]">Grow.</span>
          </MotionH2>
        </div>

        <div className="grid grid-cols-12 items-end gap-4 max-md:grid-cols-1 relative">
          <Slider />
        </div>
      </div>
    </section>
  );
};

export default Reviews;