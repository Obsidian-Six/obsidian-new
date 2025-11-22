import React from "react";
import Image from "next/image";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";

export default function TheResult({ ele }: { ele: TemplateCaseStudy }) {
  // Guard against unexpected data shape
  if (!ele.results || ele.results.length < 4) {
    // Optionally render a fallback; for now, render nothing to satisfy types
    return null;
  }

  const r0 = ele.results[0]!;
  const r1 = ele.results[1]!;
  const r2 = ele.results[2]!;
  const r3 = ele.results[3]!;
  return (
    <div className="bg-[#19183A] md:py-32 py-10">
      <div className="md:w-[60%] w-[80%] mx-auto">
        <p className="md:text-6xl sm:text-4xl text-3xl text-center poppins text-white">
          THE RESULTS
        </p>

        <div>
          <div className="md:py-20 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex justify-center">
                <Image
                  alt="Result 1"
                  className="rounded-lg md:h-72 sm:h-52 h-44 w-full object-cover"
                  src={r0.img}
                  width={400}
                  height={288}
                  unoptimized
                />
              </div>
              <div className="bg-white p-6 rounded-lg flex flex-col justify-center md:col-span-3">
                <h2 className="text-center text-[#5A00EC] md:text-3xl text-xl">
                  {r0.title} <span className="highlight">{r0.highlight}</span>
                </h2>
                <p className="text-center text-gray-600 md:text-2xl text-base md:px-10 md:mt-10 mt-6">
                  {r0.data}
                </p>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <div className="border-l-2 border-[#5A00EC] md:h-16 h-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg flex flex-col justify-center md:col-span-3 order-last md:order-none">
                <h2 className="text-center text-[#5A00EC] md:text-3xl text-xl">
                  {r1.title} <span className="highlight">{r1.highlight}</span>
                </h2>
                <p className="text-center text-gray-600 md:text-2xl text-base md:px-10 md:mt-10 mt-6">
                  {r1.data}
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  alt="Result 2"
                  className="rounded-lg md:h-72 sm:h-52 h-44 w-full object-cover"
                  src={r1.img}
                  width={400}
                  height={288}
                  unoptimized
                />
              </div>
            </div>

            <div className="flex justify-center my-4">
              <div className="border-l-2 border-[#5A00EC] md:h-16 h-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex justify-center">
                <Image
                  alt="Result 3"
                  className="rounded-lg md:h-72 sm:h-52 h-44 w-full object-cover"
                  src={r2.img}
                  width={400}
                  height={288}
                  unoptimized
                />
              </div>
              <div className="bg-white p-6 rounded-lg flex flex-col justify-center md:col-span-3">
                <h2 className="text-center text-[#5A00EC] md:text-3xl text-xl">
                  {r2.title} <span className="highlight">{r2.highlight}</span>
                </h2>
                <p className="text-center text-gray-600 md:text-2xl text-base md:px-10 md:mt-10 mt-6">
                  {r2.data}
                </p>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <div className="border-l-2 border-[#5A00EC] md:h-16 h-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg flex flex-col justify-center md:col-span-3 order-last md:order-none">
                <h2 className="text-center text-[#5A00EC] md:text-3xl text-xl">
                  {r3.title} <span className="highlight">{r3.highlight}</span>
                </h2>
                <p className="text-center text-gray-600 md:text-2xl text-base md:px-10 md:mt-10 mt-6">
                  {r3.data}
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  alt="Result 4"
                  className="rounded-lg md:h-72 sm:h-52 h-44 w-full object-cover"
                  src={r3.img}
                  width={400}
                  height={288}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
