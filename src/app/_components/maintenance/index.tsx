"use client";
import { GoArrowUpRight } from "react-icons/go";
import { MotionDiv, MotionH2, MotionP } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";

export default function Maintenance() {
  const variants = {
    start: { y: 100, opacity: 0 },
    end: { y: 0, opacity: 1 },
    startUp: { x: 50, opacity: 0 },
    endUp: { x: 0, opacity: 1 },
  } as const;

  return (
    <section className="max-w-7xl mx-auto px-4 overflow-hidden font-sans" id="maintenance">
      {/* Heading */}
      <div className="mb-12 mt-28">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[#024787] font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-bold"
        >
          [ Our Mission ]
        </MotionDiv>
        <MotionH2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl text-slate-950 font-light tracking-tighter leading-[1.1]"
        >
          We Exist To Convert Your <br className="hidden md:block" />
          <span className="italic font-serif text-[#024787]">Imagination</span> Into Achievements.
        </MotionH2>
      </div>

      {/* Subtitle */}
      <MotionP
        variants={variants}
        initial="start"
        whileInView="end"
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: false }}
        className="text-2xl max-w-2xl textmain my-10 max-md:text-lg opacity-80 leading-relaxed font-light"
      >
        Transforming brands into opportunities through high-performance digital strategy and relentless technical excellence.
      </MotionP>
      
      {/* CTA Button */}
      <Link
        href={"/#contactUs"}
        className="group inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-slate-900 text-white rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-[#024787] transition-all duration-300 shadow-lg shadow-[#024787]/10 w-fit my-6"
      >
        Start Growing <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
      </Link>

      {/* Maintenance Service Cards */}
      <div className="flex flex-col gap-20 md:grid md:grid-cols-5 md:gap-10 my-20">

        {/* Card 1 */}
        <div className="col-span-3 hidden md:block" />
        <MotionDiv
          variants={variants}
          initial={variants.startUp}
          whileInView={variants.endUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-main col-span-2 flex flex-col gap-6"
        >
          <figure className="w-full">
            <Image
              src="https://img.freepik.com/free-vector/speed-motion-background-with-fast-speedometer-car-racing-velocity-background_60438-2063.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Performance"
              width={400}
              height={256}
              className="h-64 w-full object-cover rounded-xl shadow-lg"
            />
          </figure>
          <article>
            <h3 className="py-2 text-xl border-t border-t-[#19183A]/50 font-medium">
              Performance & Speed
            </h3>
            <p className="text-main mt-4 font-light opacity-70 max-md:text-sm">
              Lightning-fast load times and code optimization designed to boost your rankings and user retention.
            </p>
          </article>
        </MotionDiv>

        {/* Card 2 */}
        <div className="col-span-2 hidden md:block" />
        <MotionDiv
          variants={variants}
          initial={variants.startUp}
          whileInView={variants.endUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-main col-span-2 flex flex-col gap-6"
        >
          <figure className="w-full">
            <Image
              src="/images/ProactiveImage.jpeg"
              alt="Security"
              width={400}
              height={256}
              className="h-64 w-full object-cover rounded-xl shadow-lg"
            />
          </figure>
          <article>
            <h3 className="py-2 text-xl border-t border-t-[#19183A]/50 font-medium">
              Proactive Security
            </h3>
            <p className="text-main mt-4 font-light opacity-70 max-md:text-sm">
              Continuous monitoring and vulnerability patching to keep your data protected and your brand trusted.
            </p>
          </article>
        </MotionDiv>
        <div className="col-span-1 hidden md:block" />

        {/* Card 3 */}
        <div className="col-span-1 hidden md:block" />
        <MotionDiv
          variants={variants}
          initial={variants.startUp}
          whileInView={variants.endUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-main col-span-2 flex flex-col gap-6"
        >
          <figure className="w-full">
            <Image
              src="/images/ProactiveImage3.jpeg"
              alt="SEO"
              width={400}
              height={256}
              className="h-64 w-full object-cover rounded-xl shadow-lg"
            />
          </figure>
          <article>
            <h3 className="py-2 text-xl border-t border-t-[#19183A]/50 font-medium">
              SEO Dominance
            </h3>
            <p className="text-main mt-4 font-light opacity-70 max-md:text-sm">
              Data-driven enhancements that ensure your site stays at the top of search results as algorithms evolve.
            </p>
          </article>
        </MotionDiv>
        <div className="col-span-2 hidden md:block" />

        {/* Card 4 */}
        <MotionDiv
          variants={variants}
          initial={variants.startUp}
          whileInView={variants.endUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-main col-span-2 flex flex-col gap-6"
        >
          <figure className="w-full">
            <Image
              src="/images/ProactiveImage2.jpeg"
              alt="Updates"
              width={400}
              height={256}
              className="h-64 w-full object-cover rounded-xl shadow-lg"
            />
          </figure>
          <article>
            <h3 className="py-2 text-xl border-t border-t-[#19183A]/50 font-medium">
              Bug-Free Experience
            </h3>
            <p className="text-main mt-4 font-light opacity-70 max-md:text-sm">
              We eliminate technical friction with regular updates and bug fixes for a seamless user journey.
            </p>
          </article>
        </MotionDiv>
        <div className="col-span-3 hidden md:block" />
      </div>
    </section>
  );
}