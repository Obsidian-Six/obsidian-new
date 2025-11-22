import React from "react";
import { MotionDiv } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import type CaseStudy from "@/lib/models/case-study.types";
import caseStudiesData from "@/lib/store/case-studies";

export default function Page() {
  return (
    <div>
      <p className="p-10 w-full bg-gray-400"></p>
      <div className="md:text-6xl sm:text-4xl text-3xl text-main font-light poppins  my-10 w-[80%] mx-auto">
        CASE STUDIES
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 w-[80%] mx-auto gap-14 my-10">
        {caseStudiesData.map((caseStudy: CaseStudy, index: number) => (
          <MotionDiv
            key={index}
            whileTap={{ scale: 0.85 }}
            className="text-main cursor-pointer"
          >
            <Link href={`/case-studies/${caseStudy.slug}`}>
              <div className="text-xs text-[#5A00EC] flex items-center gap-2 uppercase">
                <p className="h-2.5 w-2.5 bg-[#5A00EC]" /> {caseStudy.name}
              </div>
              <p className="my-1.5 text-xl max-md:text-lg">
                {caseStudy.category}
              </p>
              <Image
                src={caseStudy.image}
                alt={caseStudy.name}
                width={800}
                height={320}
                className="my-2.5 w-full rounded-md md:h-80 h-52 object-cover"
                unoptimized
              />
              <div className="text-xs text-main space-x-3 space-y-2 flex flex-wrap max-md:space-x-2 max-md:gap-2">
                {caseStudy.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 border-main rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-main mt-8 inter opacity-60 max-md:mt-4 max-md:text-sm">
                {caseStudy.details}
              </p>
            </Link>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
}
