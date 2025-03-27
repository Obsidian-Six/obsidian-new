import React from "react";

const ApproachSection = () => {
  const approaches = [
    {
      title: "REBRANDING DIGITAL PRESENCE",
      description:
        "Established Pachmarhi Ayurveda as a credible and trustworthy brand in the online market.",
    },
    {
      title: "ORGANIC SOCIAL MEDIA GROWTH",
      description:
        "Developed engaging and educational content that resonated with Ayurveda audiences.",
    },
    {
      title: "TARGETED PAID AD CAMPAIGNS",
      description:
        "Established Pachmarhi Ayurveda as a credible and trustworthy brand in the online market.",
    },
    {
      title: "E-COMMERCE WEBSITE DEVELOPMENT",
      description:
        "Designed and launched a user-friendly, conversion-optimized website within one month.",
    },
    {
      title: "PR & BRAND AWARENESS INITIATIVES",
      description:
        "Built credibility through media coverage and online trust-building efforts.",
    },
  ];

  return (
    <section className="py-20 w-[60%] mx-auto text-center">
      <p className="text-2xl md:text-3xl font-base text-[#5A00EC] my-10 uppercase mb-6 poppins">
      OUR APPROACH
        </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-14">
        {approaches.slice(0, 4).map((item, index) => (
          <div className="w-full">
          <div className="relative h-full">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#5A00EC] rounded" />
            <div className="relative h-full p-5 bg-white border border-[#19183A] rounded">
              <div className="w-full">
                <h3 className="my-2 ml-3  text-lg text-[#19183A]">
                  {item.title}
                </h3>
              </div>
              <p className="mb-2 text-[#19183A]/80 text-xl mt-5">
                {item.description}
              </p>
            </div>
          </div>
        </div>
        
        ))}
      </div>

      <div className="w-full mt-10">
          <div className="relative h-full">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#5A00EC] rounded" />
            <div className="relative h-full p-5 bg-white border border-[#19183A] rounded">
              <div className="w-full">
                <h3 className="my-2 ml-3  text-lg text-[#19183A]">
                {approaches[4].title}
                </h3>
              </div>
              <p className="mb-2 text-[#19183A]/80 text-xl mt-5 max-w-md mx-auto">
              {approaches[4].description}
              </p>
            </div>
          </div>
        </div>
      
    </section>
  );
};

export default ApproachSection;
