import React from "react";
import { MotionDiv } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import { CaseStudyData, type CaseStudy } from "@/data";

export default function Page() {
  return (
    <div>
      <p className="p-10 w-full bg-gray-400"></p>
      <div className="md:text-6xl sm:text-4xl text-3xl textmain font-light poppins  my-10 w-[80%] mx-auto">
        CASE STUDIES
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 w-[80%] mx-auto gap-14 my-10">
        {CaseStudyData.map((ele: CaseStudy, i: number) => (
          <MotionDiv
            key={i}
            whileTap={{ scale: 0.85 }}
            className="textmain cursor-pointer"
          >
            <Link href={`/case-study/${ele.id}`}>
              <div className="text-xs text-[#5A00EC] flex items-center gap-2 uppercase">
                <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> {ele.name}
              </div>
              <p className="my-1.5 text-xl max-md:text-lg">{ele.category}</p>
              <Image
                src={ele.cardImg}
                alt={ele.name}
                width={800}
                height={320}
                className="my-2.5 w-full rounded-md md:h-80 h-52 object-cover"
                unoptimized
              />
              <div className="text-xs textmain space-x-3 space-y-2 flex flex-wrap max-md:space-x-2 max-md:gap-2">
                {ele.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bordermain rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="textmain mt-8 inter opacity-60 max-md:mt-4 max-md:text-sm">
                {ele.cardData}
              </p>
            </Link>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
}
