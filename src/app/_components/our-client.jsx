import React from "react";
import { HiArrowSmallRight } from "react-icons/hi2";

const OurClient = () => {
  const arr = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];

  return (
    <>
      {/* Clients Section */}
      <div className="bg-[#19183A] p-16 text-white max-md:p-8">
        <div className="text-6xl text-center font-light max-w-5xl mx-auto leading-snug max-md:text-4xl max-sm:text-3xl">
          They
          <span className={`highlight`}> believe </span>
          in us
        </div>

        {/* Clients Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto my-14 justify-center">
          {arr.map((ele, i) => (
            <div key={i} className="bg-white flex justify-center p-5">
              <img
                src="https://www.shim.co.in/wp-content/uploads/elementor/thumbs/12-q7r8iwctozlshe0edhjelc7pqk67vw1dmgyjlzgr68.png"
                alt="No Preview"
                className="h-20 w-fit"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurClient;
