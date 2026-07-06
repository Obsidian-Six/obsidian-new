"use client";
import  { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";


const slides = [
  {
    id: "design",
    title: "Design",
    tagline: "Design that feels like you!",
    subtitle: "We believe to create design that tells your story. We capture your brand’s soul and craft captivating messages that encapsulate your brand’s essence.",
    imgUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop", 
    imgStyles: "-top-12 -right-16 md:-top-20 md:-right-32 w-48 h-48",
  },
  {
    id: "social",
    title: "Socials",
    tagline: "Make it real!",
    subtitle: "We find your voices and grow the tribe. Turn your followers into fans! While we handle the algorithm, you master the relationships.",
    imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop", 
    imgStyles: "top-0 -left-20 md:-top-10 md:-left-40 w-56 h-56",
  },
  {
    id: "development",
    title: "Build",
    tagline: "It all starts here!",
    subtitle: "We build a digital backbone that never breaks! From custom web applications to scalable e-commerce platforms, we take care of ‘how’ so your customers can enjoy the ‘Wow.’",
    imgUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=400&auto=format&fit=crop", 
    imgStyles: "-top-20 -right-10 md:-top-32 md:-right-24 w-64 h-64",
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="relative pt-15 w-full h-screen overflow-hidden flex flex-col justify-center items-center px-6 bg-white text-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center h-[60vh]">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(15px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute z-0 pointer-events-none opacity-90 ${slides[currentSlide]?.imgStyles}`}
            >
              <img 
                src={slides[currentSlide]?.imgUrl} 
                alt="3D element" 
                className="w-full h-full object-cover rounded-full shadow-2xl grayscale-[20%]"
              />
            </motion.div>

            <h1 className="relative z-10 text-7xl md:text-[160px] font-normal text-slate-900 leading-none tracking-tighter mb-4">
              {slides[currentSlide]?.title}
            </h1>

            <div className="space-y-4 max-w-2xl mx-auto">
                {/* Premium Italic look for tagline */}
                <h2 className="text-xl md:text-3xl font-light italic text-[#024787] tracking-tight">
                    {slides[currentSlide]?.tagline}
                </h2>
                <p className="text-sm md:text-xl text-slate-700 leading-relaxed tracking-wide font-light">
                    {slides[currentSlide]?.subtitle}
                </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-10"
            >
              <Link
                href="/#contactUs"
                className="group inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-slate-900 text-white rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-[#024787] transition-all duration-300 shadow-lg shadow-[#024787]/10 os-btn-slide"
              >
                Start Journey <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-[-100px] flex gap-4">
          {slides.map((_, index) => (
            <div
              role="button"
              suppressHydrationWarning
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-700 cursor-pointer ${
                currentSlide === index ? "bg-black w-12" : "bg-slate-200 w-4 hover:bg-slate-400"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Sidebars with Italic labels */}
      <div className="absolute left-10 bottom-12 hidden lg:flex flex-col items-center gap-4 text-black">
        <span className="uppercase text-[11px] font-bold tracking-[0.3em] rotate-180 [writing-mode:vertical-lr] opacity-40 italic">
          Scroll to explore
        </span>
        <div className="w-[1px] h-24 bg-black/10" />
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 text-black">
         <span className="uppercase text-[11px] font-bold tracking-[0.3em] [writing-mode:vertical-lr] mb-4 opacity-40 italic">
            Connect
         </span>
         <div className="w-[1px] h-12 bg-black/10 mb-4" />
         <a href="https://instagram.com/obsidiansixofficial" className="hover:text-[#024787] opacity-40 hover:opacity-100 transition-all duration-300"><FaInstagram size={22} /></a>
         <a href="https://linkedin.com/company/obsidian-six" className="hover:text-[#024787] opacity-40 hover:opacity-100 transition-all duration-300"><FaLinkedin size={22} /></a>
         <a href="https://wa.me/918085652729" className="hover:text-[#024787] opacity-40 hover:opacity-100 transition-all duration-300"><FaWhatsapp size={22} /></a>
      </div>
    </section>
  );
}