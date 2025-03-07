import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const OurMaintenance = () => {
  return (
    <div className="max-w-7xl mx-auto px-4" id="blogs">
      {/* Heading */}
      <div className="text-6xl mt-28 textmain font-light leading-snug max-md:text-4xl max-md:leading-normal">
        Our maintenance services ensure peak performance, security, and
        reliability for your website.
      </div>

      {/* Subtitle */}
      <p className="text-2xl max-w-md textmain my-10 max-md:text-lg">
        Unlock repeatable SEO revenue growth with Obsidian’s experience,
        services, and tools.
      </p>

      {/* CTA Button */}
      <button className="font-medium text-sm px-5 py-3 text-white flex items-center gap-2 bg-[#5A00EC] my-6">
        Let’s Grow <GoArrowUpRight className="text-2xl" />
      </button>

      {/* Maintenance Service Cards */}
      <div className="grid grid-cols-5 gap-10 max-md:grid-cols-1">
        {/* Card 1 */}
        <div className="col-span-3 max-md:hidden"></div>
        <div className="textmain col-span-2 grid grid-cols-5 gap-4 max-md:grid-cols-1">
          <div className="col-span-3">
            <p className="py-2 text-xl border-t border-t-[#19183A]/50">
              Performance & Speed
            </p>
            <p className="textmain mt-4 inter opacity-60 max-md:text-sm">
              We optimize your website for fast loading, smooth performance, and
              better SEO. Caching, code optimization, and monitoring ensure a
              seamless user experience.
            </p>
          </div>
          <div className="col-span-2 max-md:col-span-1">
            <img
              src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75"
              className="h-64 w-full max-md:h-auto object-cover rounded-md"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-span-2 max-md:hidden"></div>
        <div className="textmain col-span-2 grid grid-cols-5 gap-4 max-md:grid-cols-1">
          <div className="col-span-3">
            <p className="py-2 text-xl border-t border-t-[#19183A]/50">
              Security & Protection
            </p>
            <p className="textmain mt-4 inter opacity-60 max-md:text-sm">
              Our security updates protect your website from vulnerabilities and
              threats, keeping your data safe and ensuring trust with users.
            </p>
          </div>
          <div className="col-span-2 max-md:col-span-1">
            <img
              src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75"
              className="h-64 w-full max-md:h-auto object-cover rounded-md"
            />
          </div>
        </div>
        <div className="col-span-1 max-md:hidden" />

        {/* Card 3 */}
        <div className="col-span-1 max-md:hidden"></div>
        <div className="textmain col-span-2 grid grid-cols-5 gap-4 max-md:grid-cols-1">
          <div className="col-span-3">
            <p className="py-2 text-xl border-t border-t-[#19183A]/50">
              SEO Optimization
            </p>
            <p className="textmain mt-4 inter opacity-60 max-md:text-sm">
              Regular SEO enhancements ensure that your website ranks higher,
              bringing in more organic traffic and business growth.
            </p>
          </div>
          <div className="col-span-2 max-md:col-span-1">
            <img
              src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75"
              className="h-64 w-full max-md:h-auto object-cover rounded-md"
            />
          </div>
        </div>
        <div className="col-span-2 max-md:hidden" />

        {/* Card 4 */}
        <div className="textmain col-span-2 grid grid-cols-5 gap-4 max-md:grid-cols-1">
          <div className="col-span-3">
            <p className="py-2 text-xl border-t border-t-[#19183A]/50">
              Bug Fixes & Updates
            </p>
            <p className="textmain mt-4 inter opacity-60 max-md:text-sm">
              We provide ongoing updates, patching bugs and ensuring your
              website remains fully functional and user-friendly.
            </p>
          </div>
          <div className="col-span-2 max-md:col-span-1">
            <img
              src="https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fportfolio-images%2F02.png&w=1920&q=75"
              className="h-64 w-full max-md:h-auto object-cover rounded-md"
            />
          </div>
        </div>
        <div className="col-span-2 max-md:hidden" />
      </div>
    </div>
  );
};

export default OurMaintenance;
