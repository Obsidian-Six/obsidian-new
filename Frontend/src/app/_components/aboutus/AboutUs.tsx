"use client";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { MotionDiv } from "@/lib/motion";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { PurposeContent } from "./PurposeSection";
import { VisionQuote } from "./VisionQuote";
import ContactPopup from "../ContactPopup/ContactPopup";
import OurStory from "../OurStory";

export default function AboutUs() {
  const { scrollYProgress } = useScroll();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const yGlow1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yGlow2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  };

  const teamCategories = [
    {
      title: "Strategy & Leadership",
      desc: "Our strategic thinkers bring clarity and a growth-driven mindset to guide every project toward impactful results.",
      image: "/StratergyTeamcrop1.jpeg",
      gradient: "from-[#052D69]/20"
    },
    {
      title: "Creative & Design",
      desc: "Designers specializing in branding, UI/UX, and motion graphics craft visuals that are purposeful.",
      image: "/creativecrop.jpeg",
      gradient: "from-[#052D69]/20"
    },
    {
      title: "Technology & Dev",
      desc: "Our developers build fast, reliable, and scalable digital experiences from websites to custom apps.",
      image: "/developerscrop.jpeg",
      gradient: "from-[#052D69]/20"
    },
    {
      title: "Marketing & Growth",
      desc: "Digital marketers and SEO specialists work together to drive visibility and measurable results.",
      image: "/marketing&seoCrop.jpeg",
      gradient: "from-[#052D69]/20"
    },
  ];

  return (
    /* 
       ADDED: pt-28 (mobile) and md:pt-36 (desktop) 
       This pushes the entire page content down so it doesn't collide with the Header.
    */
    <section id="aboutus" className="relative bg-[#F8F9FA] text-slate-900 pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden">

      {/* --- AMBIENT BACKGROUND --- */}
      <motion.div
        style={{ y: yGlow1 }}
        className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[#052D69]/5 blur-[120px] rounded-full z-0"
      />
      <motion.div
        style={{ y: yGlow2 }}
        className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-[#052D69]/5 blur-[120px] rounded-full z-0"
      />

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">

        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-12">
          <MotionDiv className="lg:col-span-8" {...fadeInUp}>
            <span className="inline-block px-3 py-1 border border-slate-900/10 rounded-full text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-6 bg-white shadow-sm">
              [ About the Agency ]
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-slate-950">
              Digital experiences <br className="hidden md:block" />
              carved for the <br className="hidden md:block" />
              <span className="italic font-serif font-light text-[#052D69]">real-world results.</span>
            </h1>
          </MotionDiv>

          <MotionDiv
            className="lg:col-span-4 lg:pt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg md:text-xl text-slate-500 border-l-2 border-[#052D69] pl-6 leading-relaxed max-w-md">
              At Obsidian Six, we assist brands to uplift, evolve, and dominate their digital space through Expansionist strategy and refined creativity.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPopupOpen(true)}
              className="mt-8 md:mt-12 group flex items-center gap-4 bg-slate-900 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-sm transition-all hover:bg-[#052D69] shadow-lg shadow-[#052D69]/10"
            >
              Start Your Journey <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform" />
            </motion.button>
          </MotionDiv>
        </div>

        {/* --- PURPOSE CONTENT --- */}
        <div className="mt-12 md:mt-16">
          <PurposeContent />
        </div>

        {/* --- VISION QUOTE --- */}
        <div className="-mt-32 md:-mt-48 relative z-20">
          <VisionQuote />
        </div>

        {/* --- TEAM SECTION --- */}
        <div className="mt-16 md:mt-24">
          <MotionDiv {...fadeInUp} className="mb-10 md:mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#052D69] font-bold">01 // Our Squad</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-slate-900">The Minds Behind</h2>
          </MotionDiv>

          <div className="divide-y divide-slate-900/5 border-b border-slate-900/5">
            {teamCategories.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-12 items-start md:items-center hover:bg-white transition-all duration-500"
              >
                <div className="hidden md:block md:col-span-1 text-slate-200 font-mono text-xl group-hover:text-[#052D69] transition-colors">
                  0{idx + 1}
                </div>

                <div className="w-full md:col-span-4 relative overflow-hidden rounded-2xl bg-slate-50 group-hover:shadow-lg transition-all duration-500">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto max-h-[300px] object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} to-transparent opacity-10 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`} />
                </div>

                <div className="md:col-span-7">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-[#052D69] md:group-hover:translate-x-2 transition-all duration-300 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- COMPACT FOUNDER SECTION --- */}
        <MotionDiv
          {...fadeInUp}
          className="mt-20 md:mt-32 relative group p-[1px] bg-white shadow-2xl shadow-slate-200 rounded-[32px] overflow-hidden"
        >
          <div className="bg-white rounded-[31px] flex flex-col lg:grid lg:grid-cols-12 overflow-hidden items-stretch">
            <div className="lg:col-span-5 relative overflow-hidden aspect-[4/5] lg:aspect-auto">
              <Image
                src="/founder.jpeg"
                alt="Founder"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <span className="text-[#052D69] font-mono tracking-widest mb-3 block text-xs uppercase font-bold">
                Founder & Growth Strategist
              </span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">Meet Aadarsh.</h3>

              <div className="relative mb-8">
                <span className="absolute -left-6 top-0 text-6xl text-slate-100 font-serif">“</span>
                <p className="text-xl md:text-2xl font-light text-slate-700 leading-relaxed italic font-serif relative z-10">
                  Our philosophy is simple: we don’t just build digital presence, we build <span className="text-slate-900 font-bold not-italic border-b-2 border-[#052D69]/20">long-term partnerships</span> that help businesses grow with clarity and confidence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black font-medium md:text-base mb-10 border-t border-slate-100 pt-8">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#052D69] rounded-full" />
                  7+ years digital media consulting
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#052D69] rounded-full" />
                  Digital growth & revenue strategy
                </p>
              </div>

              <div className="flex items-center gap-8">
                {[
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/obsidian-six/' },
                  { name: 'Telegram', href: 'https://t.me/aadarsh11' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest font-black text-slate-400 hover:text-[#052D69] transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>

      <OurStory />

      <AnimatePresence>
        {isPopupOpen && (
          <ContactPopup
            key="contact-modal"
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}