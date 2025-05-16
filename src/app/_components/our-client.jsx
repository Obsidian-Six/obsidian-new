import React from "react";
import { HiArrowSmallRight } from "react-icons/hi2";

const OurClient = () => {
  const arr = [
    "https://cdn.dribbble.com/userupload/22025714/file/original-2ced14db767d6e643d72603d798b9b39.png",
    "https://1000logos.net/wp-content/uploads/2021/05/Swiggy-logo.jpg",
    "https://www.shim.co.in/wp-content/uploads/elementor/thumbs/12-q7r8iwctozlshe0edhjelc7pqk67vw1dmgyjlzgr68.png",
    "https://www.tenontenstays.com/assests/logo.png",
    "https://www.rezmytour.com/assets/images/logo.png",
    "https://abcapital.ae/wp-content/uploads/2023/07/abcap-logo-e1703014705681.png.webp",
    "https://pachmarhiayurveda.com/assets/logo-CKua0_W6.png",
    "http://sportxcoins.com/wp-content/uploads/2024/09/Sportx-Coins-Logo.png",
    "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fmagha-6b5980fd.png&w=1920&q=75",
    "https://www.truevalueventures.in/logo3.png",
    // "https://www.thegyef.com/_next/image?url=%2Fimages%2Flogo1.png&w=1920&q=75",
    // "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fmore-09e1cd70.png&w=1920&q=75"
  ];

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
                src={ele}
                alt="No Preview"
                className="h-20 w-fit object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurClient;
