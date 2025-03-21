import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MotionDiv } from "../utils/page";

const Reviews = () => {
  const variants = {
    start: { y: 200, opacity: 0 },
    end: { y: 0, opacity: 1 },
    startUp: { x: 200, opacity: 0 },
    endUp: { x: 0, opacity: 1 },
  };
  return (
    <div className="bg-[#5A00EC]/10">
      <div className="max-w-6xl mx-auto pb-32 px-4">
        <MotionDiv
          variants={variants}
          initial={variants.start}
          whileInView={variants.end}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-6xl py-14 textmain max-w-5xl mx-auto text-center font-light leading-snug max-md:text-4xl max-md:leading-normal"
        >
          Hear from Those We’ve Helped
          <span className="highlight block">grow </span>
        </MotionDiv>

        {/* Slider */}
        <div className="grid grid-cols-12 items-end gap-4 max-md:grid-cols-1">
          {/* Left Image */}
          <div className="col-span-2 relative max-md:hidden">
            <img
              src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fbharat-bajaj.jpg&w=1920&q=75"
              alt="No Preview"
              className="w-full h-28 object-cover"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent top-0 left-0" />
            <div className="absolute bottom-0 text-white p-2.5">
              <p className="text-xs poppins">Founder</p>
              <p className="text-sm inter">AB CAPITAL</p>
            </div>
          </div>

          {/* Main Review Section */}
          <div className="col-span-8 h-[30rem] grid grid-cols-2 max-md:grid-cols-1">
            <div className="bg-[#19183A] max-md:h-48">{/* youtube add */}</div>
            <div className="bg-white p-8 relative">
              <p className="textmain text-2xl my-2.5 max-md:text-xl">Vanya</p>
              <p className="textmain text-sm inter my-2.5 max-md:text-xs">
                The Geeky Yougin
              </p>
              <div className="textmain opacity-80 mt-[30%] max-md:mt-6">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M9.50536 1.93115C5.6069 2.20509 0.00308 2.82751 0 10.4624V20.0686H8.69924V9.79071H5.81068C5.62769 7.04634 7.88755 6.3377 10.345 5.79373L9.50536 1.93115ZM21.1603 1.93115C17.2618 2.20509 11.658 2.82752 11.655 10.4624V20.0686H20.3542V9.79071H17.4657C17.2826 7.04634 19.5425 6.3377 22 5.79373L21.1603 1.93115Z"
                    fill="#BCBCD4"
                  />
                </svg>
                <p className="px-5 text-sm inter max-md:px-3 max-md:text-xs">
                  I am so impressed with the details and the planning that it
                  felt like we have been working together for such a long time.
                  Would strongly recommend them if you want anything to do with
                  video.
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="md:absolute top-1/4 -right-10 max-md:-right-4">
                <button className="p-2.5 bg-[#5A00EC]">
                  <BsArrowLeft className="text-2xl text-white" />
                </button>
                <button className="p-2.5 bg-[#5A00EC]">
                  <BsArrowRight className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-span-2 relative max-md:hidden">
            <img
              src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fbharat-bajaj.jpg&w=1920&q=75"
              alt="No Preview"
              className="w-full h-28 object-cover"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent top-0 left-0" />
            <div className="absolute bottom-0 text-white p-2.5">
              <p className="text-xs poppins">Founder</p>
              <p className="text-sm inter">AB CAPITAL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
