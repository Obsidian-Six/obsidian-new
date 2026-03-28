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
      <MotionH2
        variants={variants}
        initial="start"
        whileInView="end"
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false }}
        className="text-6xl mt-28 textmain font-medium  leading-[1.1] max-md:text-4xl max-md:leading-snug tracking-tighter"
      >
        We Exist To Convert Your <span className="italic font-serif font-light text-[#024787]">Imagination</span> Into Achievements.
      </MotionH2>

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
        href={"/"}
        className="font-bold text-sm px-8 py-4 text-white flex items-center gap-2 bg-[#024787] my-6 w-fit rounded-full hover:bg-[#0864b9] transition-all"
      >
        Start Growing <GoArrowUpRight className="text-2xl" />
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
              src="https://associationoflearning.com/wp-content/uploads/2020/06/83130279_s-300x300.jpg"
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
              src="https://5.imimg.com/data5/SELLER/Default/2023/8/337404133/KG/EI/QM/1951268/network-security-assessment.jpg"
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