"use client";
import { GoArrowUpRight } from "react-icons/go";
import { MotionDiv, MotionH2, MotionP } from "@/lib/motion";
import Link from "next/link";

export default function Maintenance() {
  const variants = {
    start: { y: 50, opacity: 0 },
    end: { y: 0, opacity: 1 },
  };

  // Storing card data in an array makes it easier to manage the complex grid classes
  const cards = [
    {
      title: "THE SPOTLIGHT",
      desc: "Being Great Means Nothing If No One Sees It. We Put Your Brand Where Customers Are Already Looking. And Turn That Visibility Into Demand.",
      video: "/videos/Services/DigitalMarketingVedio.mp4",
      // Right-aligned on large screens
      gridClass: "col-span-12 md:col-span-10 md:col-start-3 lg:col-span-8 lg:col-start-5",
    },
    {
      title: "THE FIRST DOOR",
      desc: "Visitors Decide In Seconds Whether To Stay Or Leave. We Design That First Door To Feel Effortless, Inviting, And Worth Walking Through.",
      video: "/videos/Services/ExperienceDesignVedio.mp4",
      // Shifted slightly left
      gridClass: "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-4",
    },
    {
      title: "THE DAILY SCROLL",
      desc: "Your Audience Scrolls Past Hundreds Of Brands Daily. We Make Sure Yours Is The One They Stop For And Remember.",
      video: "/videos/Services/TechnologyVedio.mp4",
      // Shifted further left + blue highlight from design
      gridClass: "col-span-12 md:col-span-10 md:col-start-1 lg:col-span-8 lg:col-start-3",
    },
    {
      title: "THE SIGNATURE",
      desc: "A Name Means Nothing Until It Means Something. We Shape That Meaning Into A Signature People Recognize And Trust.",
      video: "/videos/Services/BrandingVedio.mp4",
      // Far left aligned
      gridClass: "col-span-12 md:col-span-10 md:col-start-1 lg:col-span-8 lg:col-start-1",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 overflow-hidden font-sans pb-32" id="maintenance">
      {/* Heading Section */}
      <div className="mb-12 mt-28">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[#052D69] font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-medium"
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
          <span className="italic font-serif text-[#052D69]">Imagination</span> Into Achievements.
        </MotionH2>
      </div>

      {/* Subtitle */}
      <MotionP
        variants={variants}
        initial="start"
        whileInView="end"
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-2xl max-w-2xl text-slate-700 my-10 max-md:text-lg opacity-80 leading-relaxed font-light"
      >
        Transforming brands into opportunities through high-performance digital strategy and relentless technical excellence.
      </MotionP>
      
      {/* CTA Button */}
      <Link
        href={"/#contactUs"}
        className="group inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-slate-900 text-white rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-[#052D69] transition-all duration-300 shadow-lg shadow-[#052D69]/10 w-fit my-6 mb-20 os-btn-slide"
      >
        Start Growing <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
      </Link>

      {/* Maintenance Service Cards (Cascading Layout) */}
      <div className="grid grid-cols-12 gap-y-16 md:gap-y-24 w-full">
        {cards.map((card, index) => (
          <MotionDiv
            key={index}
            variants={variants}
            initial="start"
            whileInView="end"
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={card.gridClass}
          >
            {/* Inner Card Grid (Text Left | Image Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
              
              {/* Left Side: Text Content */}
              <article className="flex flex-col pt-2">
                {/* Thin horizontal line from design */}
                <hr className="w-full border-t border-slate-300 mb-6" />
                <h3 className="text-[#19183A] text-lg lg:text-xl font-semibold uppercase tracking-wide mb-4">
                  {card.title}
                </h3>
                <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
                  {card.desc}
                </p>
              </article>

              {/* Right Side: Video */}
              <figure className="w-full">
                <div className="w-full h-[220px] md:h-[280px] relative bg-slate-100 overflow-hidden">
                  <video
                    src={card.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </figure>

            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}