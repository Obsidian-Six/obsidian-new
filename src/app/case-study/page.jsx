import React from "react";
import { MotionDiv } from "@/lib/motion";
import Link from "next/link";
import { CaseStudyData } from "@/data";

const page = () => {
  const projects = [
    {
      title: "Pachmarhi Ayurveda",
      category: "Healthcare",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75",
      tags: ["Website", "Branding", "Marketing"],
      description:
        "Filled nearly 90% seats for a newly started Amazon Delivery Service Partner. A US-based Amazon delivery service partner in mid-2021 and our collaboration with them began in November of the same year.",
    },
    {
      title: "Project X",
      category: "Finance",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F03.png&w=1920&q=75",
      tags: ["Consulting", "SEO"],
      description:
        "Helped optimize operations and drive significant revenue growth for a fintech startup.",
    },
    {
      title: "E-commerce Store",
      category: "Retail",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F04.png&w=1920&q=75",
      tags: ["E-commerce", "UI/UX"],
      description:
        "Built a seamless shopping experience with cutting-edge UI/UX and growth marketing strategies.",
    },
    {
      title: "E-commerce Store",
      category: "Retail",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F04.png&w=1920&q=75",
      tags: ["E-commerce", "UI/UX"],
      description:
        "Built a seamless shopping experience with cutting-edge UI/UX and growth marketing strategies.",
    },
    {
      title: "E-commerce Store",
      category: "Retail",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F04.png&w=1920&q=75",
      tags: ["E-commerce", "UI/UX"],
      description:
        "Built a seamless shopping experience with cutting-edge UI/UX and growth marketing strategies.",
    },
    {
      title: "Pachmarhi Ayurveda",
      category: "Healthcare",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75",
      tags: ["Website", "Branding", "Marketing"],
      description:
        "Filled nearly 90% seats for a newly started Amazon Delivery Service Partner. A US-based Amazon delivery service partner in mid-2021 and our collaboration with them began in November of the same year.",
    },
    {
      title: "Project X",
      category: "Finance",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F03.png&w=1920&q=75",
      tags: ["Consulting", "SEO"],
      description:
        "Helped optimize operations and drive significant revenue growth for a fintech startup.",
    },
    {
      title: "E-commerce Store",
      category: "Retail",
      img: "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F04.png&w=1920&q=75",
      tags: ["E-commerce", "UI/UX"],
      description:
        "Built a seamless shopping experience with cutting-edge UI/UX and growth marketing strategies.",
    },
  ];
  return (
    <div>
      <p className="p-10 w-full bg-gray-400"></p>
      <div className="md:text-6xl sm:text-4xl text-3xl textmain font-light poppins  my-10 w-[80%] mx-auto">
        CASE STUDIES
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 w-[80%] mx-auto gap-14 my-10">
        {CaseStudyData.map((ele, i) => (
          <MotionDiv
            key={i}
            whileTap={{ scale: 0.85 }}
            className="textmain cursor-pointer"
          >
            <Link href={`/case-study/${ele.id}`}>
              {/* Project Title */}
              <div className="text-xs text-[#5A00EC] flex items-center gap-2 uppercase">
                <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> {ele.name}
              </div>
              <p className="my-1.5 text-xl max-md:text-lg">{ele.category}</p>
              {/* Image */}
              <img
                src={ele.cardImg}
                className="my-2.5 w-full rounded-md md:h-80 h-52 object-cover"
                alt={ele.name}
              />
              {/* Tags */}
              <div className="text-xs textmain space-x-3 space-y-2 flex flex-wrap max-md:space-x-2 max-md:gap-2">
                {ele.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bordermain rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Project Description */}
              <p className="textmain mt-8 inter opacity-60 max-md:mt-4 max-md:text-sm">
                {ele.cardData}
              </p>
            </Link>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default page;
