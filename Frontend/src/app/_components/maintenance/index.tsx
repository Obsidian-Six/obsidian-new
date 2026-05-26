"use client";
import { GoArrowUpRight } from "react-icons/go";
import { MotionDiv, MotionH2, MotionP } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";

export default function Maintenance() {
  const variants = {
    start: { y: 50, opacity: 0 },
    end: { y: 0, opacity: 1 },
  };

  // Storing card data in an array makes it easier to manage the complex grid classes
  const cards = [
    {
      title: "PERFORMANCE & SPEED",
      desc: "We Optimize Your Website For Fast Loading, Smooth Performance, And Better SEO. Caching, Code Optimization, And Monitoring Ensure A Seamless User Experience.",
      image: "https://img.freepik.com/free-vector/speed-motion-background-with-fast-speedometer-car-racing-velocity-background_60438-2063.jpg?semt=ais_hybrid&w=740&q=80",
      // Right-aligned on large screens
      gridClass: "col-span-12 md:col-span-10 md:col-start-3 lg:col-span-8 lg:col-start-5",
    },
    {
      title: "SECURITY & RELIABILITY",
      desc: "We Protect Your Site With 24/7 Monitoring, Firewalls, And Regular Updates. Stay Secure From Malware, Hacking, And Data Breaches",
      image: "/images/ProactiveImage.jpeg",
      // Shifted slightly left
      gridClass: "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-4",
    },
    {
      title: "ONGOING SUPPORT",
      desc: "Get Continuous Updates, Bug Fixes, And Content Changes. We Keep Your Website Fresh, Functional, And Aligned With Your Business Needs.",
      image: "/images/ProactiveImage3.jpeg",
      // Shifted further left + blue highlight from design
      gridClass: "col-span-12 md:col-span-10 md:col-start-1 lg:col-span-8 lg:col-start-3",
    
    },
    {
      title: "DISASTER RECOVERY",
      desc: "Our Automated Backups And Quick Restoration Minimize Downtime. Stay Prepared With Reliable Recovery Solutions.",
      image: "/images/ProactiveImage2.jpeg",
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
          className="text-[#024787] font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-medium"
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
        viewport={{ once: true }}
        className="text-2xl max-w-2xl text-slate-700 my-10 max-md:text-lg opacity-80 leading-relaxed font-light"
      >
        Transforming brands into opportunities through high-performance digital strategy and relentless technical excellence.
      </MotionP>
      
      {/* CTA Button */}
      <Link
        href={"/#contactUs"}
        className="group inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-slate-900 text-white rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-[#024787] transition-all duration-300 shadow-lg shadow-[#024787]/10 w-fit my-6 mb-20"
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

              {/* Right Side: Image */}
              <figure className="w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={500}
                  height={400}
                  // Removed rounded corners to match the sharp edges in Figma
                  className="w-full h-[220px] md:h-[280px] object-cover bg-slate-100"
                />
              </figure>

            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}