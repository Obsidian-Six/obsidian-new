import React from "react";
import { MotionDiv } from "@/lib/motion";

const HomeService = () => {
  const variants = {
    start: { y: 40, opacity: 0 },
    end: { y: 0, opacity: 1 },
  } as const;

  const services: { title: string; desc: string }[] = [
    { title: "Branding", desc: "Identity, guidelines, and creative systems." },
    {
      title: "Web Development",
      desc: "Modern, fast, conversion-focused websites.",
    },
    {
      title: "SEO",
      desc: "Technical, on-page, and content to rank and convert.",
    },
    {
      title: "Paid Ads",
      desc: "Performance campaigns to drive qualified leads.",
    },
  ];

  return (
    <section id="services" className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center md:my-6 my-2 text-xs font-semibold textmain">
        [Services]
      </div>

      <MotionDiv
        variants={variants}
        initial={variants.start}
        whileInView={variants.end}
        transition={{ duration: 0.4, delay: 0.05 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl textmain font-light leading-snug text-center max-w-4xl mx-auto"
      >
        We craft digital experiences that scale your
        <span className="highlight"> growth</span>
      </MotionDiv>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-12">
        {services.map((s, i) => (
          <MotionDiv
            key={i}
            variants={variants}
            initial={variants.start}
            whileInView={variants.end}
            transition={{ duration: 0.35, delay: 0.08 + i * 0.05 }}
            viewport={{ once: true }}
            className="p-6 border rounded-md bordermain bg-white/50"
          >
            <h3 className="text-xl font-medium textmain">{s.title}</h3>
            <p className="text-sm inter opacity-70 mt-2 textmain">{s.desc}</p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default HomeService;
