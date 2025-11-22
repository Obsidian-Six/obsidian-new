import type { CaseStudyApproachItem } from "@/lib/models/case-study.types";
import React from "react";

export default function ApproachSection({
  approaches,
}: {
  approaches: CaseStudyApproachItem[];
}) {
  return (
    <section className="md:py-20 py-10 md:w-[60%] w-[80%] mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-base text-[#5A00EC] my-10 uppercase mb-6 poppins">
        OUR APPROACH
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-14">
        {approaches
          .slice(
            0,
            approaches.length % 2 === 0
              ? approaches.length
              : approaches.length - 1
          )
          .map((approach: CaseStudyApproachItem, index: number) => (
            <div key={index} className="w-full">
              <div className="relative h-full">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#5A00EC] rounded" />
                <div className="relative h-full p-5 bg-white border border-[#19183A] rounded">
                  <div className="w-full">
                    <h3 className="my-2 ml-3 text-lg text-[#19183A]">
                      {approach.name}
                    </h3>
                  </div>
                  <p className="mb-2 text-[#19183A]/80 text-xl mt-5">
                    {approach.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {approaches.length % 2 !== 0 && approaches.length > 0 && (
        <div className="w-full mt-10">
          <div className="relative h-full">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#5A00EC] rounded" />
            <div className="relative h-full p-5 bg-white border border-[#19183A] rounded">
              <div className="w-full">
                {(() => {
                  const lastIndex = approaches.length - 1;
                  const last = approaches[lastIndex]!;
                  return (
                    <h3 className="my-2 ml-3 text-lg text-[#19183A]">
                      {last.name}
                    </h3>
                  );
                })()}
              </div>
              {(() => {
                const lastIndex = approaches.length - 1;
                const last = approaches[lastIndex]!;
                return (
                  <p className="mb-2 text-[#19183A]/80 text-xl mt-5 max-w-md mx-auto">
                    {last.detail}
                  </p>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
