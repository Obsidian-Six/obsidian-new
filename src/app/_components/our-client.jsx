import React from "react";
import { HiArrowSmallRight } from "react-icons/hi2";

const OurClient = () => {
  const arr = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  return (
    <>
    <div className="bg-[#19183A] p-16 text-white">
      <div className="text-6xl text-center font-light max-w-5xl mx-auto leading-snug">
        They
        <span className={`highlight`}> believe </span>
        in us
      </div>
      <div className="grid grid-cols-5 gap-8 max-w-6xl mx-auto my-14 justify-center">
        {arr.map((ele, i) => (
          <div key={i} className="bg-white flex justify-center p-5">
            <img
              src="https://www.shim.co.in/wp-content/uploads/elementor/thumbs/12-q7r8iwctozlshe0edhjelc7pqk67vw1dmgyjlzgr68.png"
              alt="No Preview"
              className=" h-20 w-fit"
            />
          </div>
        ))}
      </div>
    </div>
    <div className="bg-[#5A00EC] text-white p-6 flex justify-evenly items-center">
      <div className="text-6xl  font-light leading-snug">
      Start your journey towards 
        <span className={`highlight`}> growth </span>
      </div>
      <p className="p-4 textmain px-10 bg-white ">
        <HiArrowSmallRight className='text-7xl textmain ' />

      </p>

    </div>
    </>
  );
};

export default OurClient;
