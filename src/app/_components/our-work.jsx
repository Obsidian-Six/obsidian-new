import React from "react";

const OurWork = () => {
  const arr = ["", "", ""];
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center my-14 text-xs font-semibold textmain">
        [Our Work]
      </div>
      <div className="text-6xl my-16 textmain max-w-5xl mx-auto text-center font-light leading-snug">
        We empowered many ambitious businesses to achieve and surpass their
        <span className="highlight"> growth </span> objectives.
      </div>
      <div className="grid grid-cols-3 gap-16">
        {arr.map((ele, i) => (
          <div key={i} className="textmain">
            <div className="text-xs text-[#5A00EC] flex items-center gap-2 uppercase">
              <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> Pachmarhi ayurveda
            </div>
            <p className="my-1.5 text-xl">Healthcare</p>
            <img
              src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75"
              className="my-2.5"
            />
            <div className="text-xs textmain space-x-3">
              <span className="px-3 bordermain py-1 rounded-full">Website</span>
              <span className="px-3 bordermain py-1 rounded-full">
                Branding
              </span>
              <span className="px-3 bordermain py-1 rounded-full">
                Marketing
              </span>
            </div>
            <p className="textmain mt-8 inter opacity-60">
              Filled nearly 90% seats for a newly started Amazon Delivery
              Service Partner A US-based Amazon delivery service partnerin Mid
              2021 and our collaboration with them began in November of the same
              year.
            </p>
          </div>
        ))}
      </div>
      <button className="textmain text-xl bordermain mx-auto px-2 py-0.5 flex self-center my-20">
        View More
      </button>
    </div>
  );
};

export default OurWork;
