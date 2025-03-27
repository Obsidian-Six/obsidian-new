import React from "react";

const ChallengeSection = () => {
  return (
    <div className="bg-[#5A00EC] text-white py-10">
      <div className="w-[60%] mx-auto py-20 ">
        <p className="text-2xl md:text-3xl font-base uppercase mb-6 poppins">
          The Challenge
        </p>
        <p className="text-lg md:text-2xl font-light my-10 inter">
          Despite their strong offline reputation,{" "}
          <span className="highlight">Pachmarhi Ayurveda</span> faced several hurdles
          in the digital space:
        </p>
        <ul className="space-y-4 text-2xl inter font-light">
          <li>
            <span className="font-normal">▪ Limited Digital Presence –</span> No
            significant reach or branding across online platforms.
          </li>
          <li>
            <span className="font-normal">▪ No Social Media Strategy –</span>{" "}
            Struggled with organic reach and lacked engaging content.
          </li>
          <li>
            <span className="font-normal">
              ▪ Skepticism About Digital Marketing –
            </span>{" "}
            Initially, the client did not believe in the power of digital
            platforms.
          </li>
          <li>
            <span className="font-normal">
              ▪ No E-commerce Website –
            </span>{" "}
            Without an online store, their sales were restricted to offline retail.
          </li>
          <li>
            <span className="font-normal">
              ▪ Trust Issues in the Ayurveda Industry –
            </span>{" "}
             Many fake brands existed in the market, making credibility a key factor.
          </li>
        </ul>
      </div>

    </div>
  );
};

export default ChallengeSection;
