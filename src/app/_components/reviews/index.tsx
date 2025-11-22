import { MotionH2 } from "@/lib/motion";
import Slider from "./slider";

const Reviews = () => {
  return (
    <section id="aboutUs" className="bg-[#5A00EC]/10">
      <div className="max-w-6xl mx-auto pb-32 px-4">
        <MotionH2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-6xl py-14 text-main max-w-5xl mx-auto text-center font-light leading-snug max-md:text-4xl max-md:leading-normal"
        >
          Hear from Those We’ve Helped
          <span className="highlight block">grow</span>
        </MotionH2>

        <div className="grid grid-cols-12 items-end gap-4 max-md:grid-cols-1 relative">
          <Slider />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
