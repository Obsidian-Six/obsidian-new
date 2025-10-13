import React from "react";
import Image from "next/image";

const arr: string[] = [
  "https://animationvisarts.com/wp-content/uploads/2023/10/image-15.png",
  "/our-client/swiggy.png",
  "/our-client/kotak.png",
  "https://logos-world.net/wp-content/uploads/2020/11/Zomato-Logo.png",
  "https://pachmarhiayurveda.com/assets/logo-CKua0_W6.png",
  "https://funnel.io/hubfs/Connectors/amazon-dsp.svg",
  "/our-client/AB.png",
  "https://www.tenontenstays.com/assests/logo.png",
  "https://www.rezmytour.com/assets/images/logo.png",
  "https://www.truevalueventures.in/logo3.png",
  "/our-client/lt.png",
  "https://www.shim.co.in/wp-content/uploads/elementor/thumbs/12-q7r8iwctozlshe0edhjelc7pqk67vw1dmgyjlzgr68.png",
  "/our-client/indian.png",
  "/our-client/BB.png",
  "/our-client/tb.png",
  "/our-client/khoshnaw.png",
  "/our-client/Eurotech.png",
  "/our-client/nidan.png",
  "/our-client/sporxcoin.png",
  "https://upload.wikimedia.org/wikipedia/commons/7/75/DTDC_logo.png",
];

const OurClient = () => (
  <section className="bg-black py-20 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-20">
      <h2 className="text-5xl md:text-6xl text-white font-light mb-7 md:mb-0 md:text-left w-full md:w-1/2 tracking-wide">
        Clients
      </h2>
      <p className="text-lg md:text-xl text-white font-light md:text-right w-full md:w-1/2">
        Our clients are everything to us; so are we to them.
      </p>
    </div>
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-10">
      {arr.map((src, i) => (
        <div key={i} className="flex items-center justify-center">
          <Image
            src={src}
            alt={`client-logo-${i}`}
            width={160}
            height={64}
            className="
              max-h-16 object-contain 
              transition-all duration-300
              filter logo-white
              hover:filter-none
            "
          />
        </div>
      ))}
    </div>
    <style>{`
      .logo-white {
        filter: brightness(0) invert(1);
      }
      .logo-white:hover {
        filter: none;
      }
    `}</style>
  </section>
);

export default OurClient;
