import React from "react";
import type { CaseStudy } from "@/data";

export default function ApproachSection({ ele }: { ele: CaseStudy }) {
  return (
    <section className="md:py-20 py-10 md:w-[60%] w-[80%] mx-auto text-center">
      <p className="text-2xl md:text-3xl font-base text-[#5A00EC] my-10 uppercase mb-6 poppins">
        OUR APPROACH
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-14">
        {ele.approch
          .slice(
            0,
            ele.approch.length % 2 === 0
              ? ele.approch.length
              : ele.approch.length - 1
          )
          .map((item: any, index: number) => (
            <div key={index} className="w-full">
              <div className="relative h-full">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#5A00EC] rounded" />
                <div className="relative h-full p-5 bg-white border border-[#19183A] rounded">
                  <div className="w-full">
                    <h3 className="my-2 ml-3 text-lg text-[#19183A]">
                      {item.name}
                    </h3>
                  </div>
                  <p className="mb-2 text-[#19183A]/80 text-xl mt-5">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {ele.approch.length % 2 !== 0 && ele.approch.length > 0 && (
        <div className="w-full mt-10">
          <div className="relative h-full">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#5A00EC] rounded" />
            <div className="relative h-full p-5 bg-white border border-[#19183A] rounded">
              <div className="w-full">
                {(() => {
                  const lastIndex = ele.approch.length - 1;
                  const last = ele.approch[lastIndex]!;
                  return (
                    <h3 className="my-2 ml-3 text-lg text-[#19183A]">
                      {last.name}
                    </h3>
                  );
                })()}
              </div>
              {(() => {
                const lastIndex = ele.approch.length - 1;
                const last = ele.approch[lastIndex]!;
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
