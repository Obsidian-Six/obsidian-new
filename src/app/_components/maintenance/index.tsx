import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { MotionDiv, MotionH2, MotionP } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";

export default function Maintenance() {
  const variants = {
    start: { y: 200, opacity: 0 },
    end: { y: 0, opacity: 1 },
    startUp: { x: 200, opacity: 0 },
    endUp: { x: 0, opacity: 1 },
  } as const;
  return (
    <section className="max-w-7xl mx-auto px-4 overflow-hidden" id="blogs">
      {/* Heading */}
      <MotionH2
        variants={variants}
        initial={variants.start}
        whileInView={variants.end}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-6xl mt-28 textmain font-light leading-snug max-md:text-3xl max-md:leading-normal"
      >
        Our maintenance services ensure peak performance, security, and
        reliability for your website.
      </MotionH2>

      {/* Subtitle */}
      <MotionP
        variants={variants}
        initial={variants.start}
        whileInView={variants.end}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-2xl max-w-md textmain my-10 max-md:text-lg"
      >
        Unlock repeatable SEO revenue growth with Obsidian’s experience,
        services, and tools.
      </MotionP>

      {/* CTA Button */}
      <Link
        href={"/#contactUs"}
        className="font-medium text-sm px-5 py-3 text-white flex items-center gap-2 bg-[#5A00EC] my-6 w-fit"
      >
        Let’s Grow <GoArrowUpRight className="text-2xl" />
      </Link>

      {/* Maintenance Service Cards */}
      <div className="grid grid-cols-5 gap-10 max-md:grid-cols-1 my-10">
        {/* Card 1 */}
        <div className="col-span-3 max-md:hidden"></div>
        <MotionDiv
          variants={variants}
          initial={variants.startUp}
          whileInView={variants.endUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-main col-span-2 grid grid-cols-5 gap-4 max-md:grid-cols-1 "
        >
          <article className="col-span-3">
            <h3 className="py-2 text-xl border-t border-t-[#19183A]/50">
              Performance & Speed
            </h3>
            <p className="text-main mt-4 inter opacity-60 max-md:text-sm max-md:text-justify">
              We optimize your website for fast loading, smooth performance, and
              better SEO. Caching, code optimization, and monitoring ensure a
              seamless user experience.
            </p>
          </article>
          <figure className="col-span-2 max-md:col-span-1  max-md:ml-4">
            <Image
              src="https://sdg.esa.int/sites/default/files/laser.PNG"
              alt="Performance and Speed"
              width={400}
              height={256}
              className="h-64 w-full object-cover rounded-md"
            />
          </figure>
        </MotionDiv>

        {/* Card 2 */}
        <div className="col-span-2 max-md:hidden"></div>
        <MotionDiv
          variants={variants}
          initial={variants.startUp}
          whileInView={variants.endUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-main col-span-2 grid grid-cols-5 gap-4 max-md:grid-cols-1"
        >
          <article className="col-span-3">
            <h3 className="py-2 text-xl border-t border-t-[#19183A]/50">
              Security & Protection
            </h3>
            <p className="text-main mt-4 inter opacity-60 max-md:text-sm max-md:text-justify">
              Our security updates protect your website from vulnerabilities and
              threats, keeping your data safe and ensuring trust with users.
            </p>
          </article>
          <figure className="col-span-2 max-md:col-span-1 max-md:ml-4">
            <Image
              src="https://boxxinsurance.com/ca/wp-content/uploads/sites/3/2022/09/BOXX-Blog-2102288.jpg"
              alt="Security and Protection"
              width={400}
              height={256}
              className="h-64 w-full max-md:h-auto object-cover rounded-md"
            />
          </figure>
        </MotionDiv>
        <div className="col-span-1 max-md:hidden" />

        {/* Card 3 */}
        <div className="col-span-1 max-md:hidden"></div>
        <MotionDiv
          variants={variants}
          initial={variants.startUp}
          whileInView={variants.endUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-main col-span-2 grid grid-cols-5 gap-4 max-md:grid-cols-1"
        >
          <article className="col-span-3">
            <h3 className="py-2 text-xl border-t border-t-[#19183A]/50">
              SEO Optimization
            </h3>
            <p className="text-main mt-4 inter opacity-60 max-md:text-sm max-md:text-justify">
              Regular SEO enhancements ensure that your website ranks higher,
              bringing in more organic traffic and business growth.
            </p>
          </article>
          <figure className="col-span-2 max-md:col-span-1  max-md:ml-4">
            <Image
              src="https://associationoflearning.com/wp-content/uploads/2020/06/83130279_s-300x300.jpg"
              alt="SEO Optimization"
              width={400}
              height={256}
              className="h-64 w-full max-md:h-auto object-cover rounded-md"
            />
          </figure>
        </MotionDiv>
        <div className="col-span-2 max-md:hidden" />

        {/* Card 4 */}
        <MotionDiv
          variants={variants}
          initial={variants.startUp}
          whileInView={variants.endUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-main col-span-2 grid grid-cols-5 gap-4 max-md:grid-cols-1"
        >
          <article className="col-span-3">
            <h3 className="py-2 text-xl border-t border-t-[#19183A]/50">
              Bug Fixes & Updates
            </h3>
            <p className="text-main mt-4 inter opacity-60 max-md:text-sm max-md:text-justify">
              We provide ongoing updates, patching bugs and ensuring your
              website remains fully functional and user-friendly.
            </p>
          </article>
          <figure className="col-span-2 max-md:col-span-1 max-md:ml-4">
            <Image
              src="https://5.imimg.com/data5/SELLER/Default/2023/8/337404133/KG/EI/QM/1951268/network-security-assessment.jpg"
              alt="Bug Fixes and Updates"
              width={400}
              height={256}
              className="h-64 w-full max-md:h-auto object-cover rounded-md"
            />
          </figure>
        </MotionDiv>
        <div className="col-span-2 max-md:hidden" />
      </div>
    </section>
  );
}
