import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const OurMaintaince = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-6xl mt-28 textmain font-light leading-snug">
        Our maintenance services ensure peak performance, security, and
        reliability for your website.
      </div>
      <p className="text-2xl max-w-md textmain my-10">
        Unlock repeatable SEO revenue growth with Obsidian’s experience,
        services and tools.
      </p>
      <button className="font-medium text-sm px-5 py-3 text-white flex items-center justify-between gap-2 bg-[#5A00EC] my-6">
        Let’s Grow <GoArrowUpRight className="text-2xl" />
      </button>
      <div className="grid grid-cols-5 space-y-10">

        {/* card 1 */}
        <div className="col-span-3"></div>
        <div className="textmain col-span-2 grid grid-cols-5 gap-4">
            <div className="col-span-3">
                <p className="py-2 text-xl  border-t border-t-[#19183A]/50">Performance & Speed</p>
                <p className="textmain mt-4 inter opacity-60">
               We optimize your website for fast loading, smooth performance, and better SEO. Caching, code optimization, and monitoring ensure a seamless user experience.
                </p>
            </div>
            <div className="col-span-2">
                <img
                src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75"
                className=" h-64 object-cover"
                />
            </div>
        </div>

         {/* card 2 */}
         <div className="col-span-2"></div>
         <div className="textmain col-span-2 grid grid-cols-5 gap-4">
            <div className="col-span-3">
                <p className="py-2 text-xl  border-t border-t-[#19183A]/50">Performance & Speed</p>
                <p className="textmain mt-4 inter opacity-60">
               We optimize your website for fast loading, smooth performance, and better SEO. Caching, code optimization, and monitoring ensure a seamless user experience.
                </p>
            </div>
            <div className="col-span-2">
                <img
                src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75"
                className=" h-64 object-cover"
                />
            </div>
        </div>
        <div className="col-span-1" />
        
         {/* card 3 */}
         <div className="col-span-1"></div>
         <div className="textmain col-span-2 grid grid-cols-5 gap-4">
            <div className="col-span-3">
                <p className="py-2 text-xl  border-t border-t-[#19183A]/50">Performance & Speed</p>
                <p className="textmain mt-4 inter opacity-60">
               We optimize your website for fast loading, smooth performance, and better SEO. Caching, code optimization, and monitoring ensure a seamless user experience.
                </p>
            </div>
            <div className="col-span-2">
                <img
                src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75"
                className=" h-64 object-cover"
                />
            </div>
        </div>
        <div className="col-span-2" />

        
         {/* card 4 */}
         <div className="textmain col-span-2 grid grid-cols-5 gap-4">
            <div className="col-span-3">
                <p className="py-2 text-xl  border-t border-t-[#19183A]/50">Performance & Speed</p>
                <p className="textmain mt-4 inter opacity-60">
               We optimize your website for fast loading, smooth performance, and better SEO. Caching, code optimization, and monitoring ensure a seamless user experience.
                </p>
            </div>
            <div className="col-span-2">
                <img
                src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75"
                className=" h-64 object-cover"
                />
            </div>
        </div>
        <div className="col-span-2" />

      </div>
    </div>
  );
};

export default OurMaintaince;
