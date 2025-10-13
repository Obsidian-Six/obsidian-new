import React from "react";
import type { CaseStudy } from "@/data";

export default function ChallengeSection({ ele }: { ele: CaseStudy }) {
  return (
    <div className="bg-[#5A00EC] text-white md:py-10">
      <div className="md:w-[60%] w-[80%] mx-auto py-20 ">
        <p className="text-2xl md:text-3xl font-base uppercase mb-6 poppins">
          The Challenge
        </p>
        <p className="text-lg md:text-2xl font-light my-10 inter">
          {ele.challenge.data}
        </p>
        <ul className="space-y-4 md:text-2xl sm:text-xl text-base inter font-light">
          {ele.challenge.point.map((data: any, j: number) => (
            <li key={j}>
              <span className="font-normal">▪ {data.name} –</span> {data.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
