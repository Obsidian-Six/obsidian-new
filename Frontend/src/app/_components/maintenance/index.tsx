"use client";
// import { GoArrowUpRight } from "react-icons/go";
import { MotionDiv, MotionH2, MotionP } from "@/lib/motion";
// import Link from "next/link";
import ServicesScroll from "./ServicesScroll";
import Button from "../common/Button";
import { usePathname } from "next/navigation";
// const cards = [
//   {
//     title: "AI Audit",
//     desc: "We analyse your brand, digital presence and opportunities to identify where AI can create meaningful growth.",
//     video: "/videos/ai-audit.mp4",
//   },
//   {
//     title: "Brand Strategy",
//     desc: "We build strategic foundations that help brands communicate clearly and create lasting impact.",
//     video: "/videos/brand-strategy.mp4",
//   },
//   {
//     title: "Design",
//     desc: "We create distinctive visual systems and digital experiences designed around your audience.",
//     video: "/videos/design.mp4",
//   },
//   {
//     title: "Development",
//     desc: "We turn ideas into fast, responsive and highly interactive digital experiences.",
//     video: "/videos/development.mp4",
//   },
// ];

export default function Maintenance() {
  const pathname = usePathname();

  // Apne actual About Us route ke according check karo
  const isAboutPage = pathname === "/aboutus/";
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
      gridClass:
        "col-span-12 md:col-span-10 md:col-start-3 lg:col-span-8 lg:col-start-5",
    },
    {
      title: "THE FIRST DOOR",
      desc: "Visitors Decide In Seconds Whether To Stay Or Leave. We Design That First Door To Feel Effortless, Inviting, And Worth Walking Through.",
      video: "/videos/Services/ExperienceDesignVedio.mp4",
      // Shifted slightly left
      gridClass:
        "col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-4",
    },
    {
      title: "THE DAILY SCROLL",
      desc: "Your Audience Scrolls Past Hundreds Of Brands Daily. We Make Sure Yours Is The One They Stop For And Remember.",
      video: "/videos/Services/TechnologyVedio.mp4",
      // Shifted further left + blue highlight from design
      gridClass:
        "col-span-12 md:col-span-10 md:col-start-1 lg:col-span-8 lg:col-start-3",
    },
    {
      title: "THE SIGNATURE",
      desc: "A Name Means Nothing Until It Means Something. We Shape That Meaning Into A Signature People Recognize And Trust.",
      video: "/videos/Services/BrandingVedio.mp4",
      // Far left aligned
      gridClass:
        "col-span-12 md:col-span-10 md:col-start-1 lg:col-span-8 lg:col-start-1",
    },
  ];

  return (
    <>
      {isAboutPage && (
        <section
          className="max-w-7xl mx-auto px-4 overflow-hidden font-sans pb-5 md:pb-32"
          id="maintenance"
        >
          {/* Heading Section */}
          <div className="mb-12 mt-28">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#052D69] font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-medium"
            >
              [ Our Mission ]{/* [ Our Brands ] */}
            </MotionDiv>
            <MotionH2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl text-slate-950 font-light tracking-tighter leading-[1.1]"
            >
              We Exist To Convert Your <br className="hidden md:block" />
              <span className="italic font-serif text-[#052D69]">
                Imagination
              </span>{" "}
              Into Achievements.
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
            Transforming brands into opportunities through high-performance
            digital strategy and relentless technical excellence.
          </MotionP>

          {/* CTA Button */}
          <Button hlink="/contactus" text="Start Growing" />
        </section>
      )}
      <ServicesScroll cards={cards} />
    </>
  );
}
