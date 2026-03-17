"use client";
import { GoArrowUpRight } from "react-icons/go";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MotionDiv, MotionH1, MotionP } from "@/lib/motion";
import Link from "next/link";

export default function Hero() {
  const variants = {
    start: { opacity: 0, y: 20 },
    end: { opacity: 1, y: 0 },
  } as const;

  return (
    <section 
      id="home" 
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center px-6"
      style={{
        background: "radial-gradient(circle at center, #ffffff 0%, #f0f0f0 40%, #e5e5e5 100%)",
      }}
    >
<div className="relative z-10 text-center max-w-4xl mx-auto">
  <MotionH1
    initial="start"
    animate="end"
    variants={variants}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-5xl md:text-7xl font-normal text-[#1a1a1a] leading-[1.1] tracking-tight"
  >
    Future Where <br />
    Brands Become {" "}
    <span className="relative inline-block">
      <span className="italic font-serif font-medium text-[#1a1a1a]">Icons.</span>
      
      {/* Hand-drawn Purple Underline from Figma */}
      <svg 
        className="absolute -bottom-1 -right-1 w-[110%] h-4 text-[#5A00EC] opacity-80" 
        viewBox="0 0 100 10" 
        preserveAspectRatio="none"
        style={{ transform: 'rotate(-1deg)' }}
      >
        <path 
          d="M3 8 Q 30 2 55 7 T 97 5" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
      </svg>
    </span>
  </MotionH1>

  <MotionP
    initial="start"
    animate="end"
    variants={variants}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    className="text-lg md:text-xl text-slate-500 font-light mt-8 max-w-2xl mx-auto"
  >
    Elevating growth beyond limits.
  </MotionP>

  <MotionDiv
    initial="start"
    animate="end"
    variants={variants}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="mt-10"
  >
    <Link
      href="/#contactUs"
      className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-300 shadow-lg"
    >
      Start Your Journey <GoArrowUpRight className="text-lg" />
    </Link>
  </MotionDiv>
</div>
      
      {/* Sidebars */}
      <div className="absolute left-10 bottom-12 hidden lg:flex flex-col items-center gap-4 text-slate-900">
        <span className="uppercase text-[10px] font-bold tracking-[0.2em] rotate-180 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-[1px] h-24 bg-slate-900/40" />
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 text-slate-900">
         <span className="uppercase text-[10px] font-bold tracking-[0.2em] [writing-mode:vertical-lr] mb-4 text-slate-900/60">
           Contact Us
         </span>
         <div className="w-[1px] h-12 bg-slate-900/40 mb-4" />
         <a href="#" className="hover:text-indigo-700 transition-colors duration-300"><FaInstagram size={20} /></a>
         <a href="#" className="hover:text-indigo-700 transition-colors duration-300"><FaLinkedin size={20} /></a>
         <a href="#" className="hover:text-indigo-700 transition-colors duration-300"><FaWhatsapp size={20} /></a>
      </div>
    </section>
  );
}