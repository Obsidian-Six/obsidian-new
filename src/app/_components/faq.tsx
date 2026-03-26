"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "What services does Obsidian Six offer?",
    answer: "Obsidian Six provides end-to-end digital marketing services including SEO, performance marketing, paid advertising (Google & Meta Ads), lead generation, content marketing, and conversion rate optimization."
  },
  {
    question: "How can SEO help my business grow?",
    answer: "SEO improves your website’s visibility on search engines, drives qualified organic traffic, increases brand credibility, and generates consistent leads without ongoing ad spend dependency."
  },
  {
    question: "How long does it take to see results from SEO?",
    answer: "SEO typically takes 3–6 months to show measurable results, depending on competition, website authority, and industry. Technical improvements can show early impact."
  },
  {
    question: "What industries does Obsidian Six specialize in?",
    answer: "We work with startups, educational institutions, B2B companies, real estate brands, and service-based businesses looking to scale through data-driven strategies."
  },
  {
    question: "Do you provide performance marketing and paid ads management?",
    answer: "Yes, Obsidian Six specializes in performance marketing including Google Ads, Meta Ads, and paid campaigns designed to maximize ROI and generate high-quality leads."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Bold Header - White Layout */}
        <div className="mb-14 border-l-4 border-[#024787] pl-6">
          <h2 className="text-4xl md:text-6xl  text-black tracking-tighter leading-none">
            FAQ<span className="text-[#024787]">.</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-[0.2em] font-bold">
            Support Center
          </p>
        </div>

        {/* High-Contrast Accordion */}
        <div className="divide-y divide-gray-100">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <motion.div key={index} className="group" initial={false}>
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-8 text-left transition-all"
                >
                  <div className="flex items-center gap-5">
                    <motion.div
                      animate={{ 
                        rotate: isOpen ? 90 : 0,
                        scale: isOpen ? 1.1 : 1,
                        color: isOpen ? "#024787" : "#111" 
                      }}
                    >
                      {/* Bolder Icon */}
                      <ChevronRight size={22} strokeWidth={3} />
                    </motion.div>
                    
                    {/* Bold Question Text */}
                    <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                      isOpen ? "text-[#024787]" : "text-black group-hover:text-[#024787]"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0, y: -5 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -5 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Readable Answer Text */}
                      <div className="pl-12 pb-10 pr-4 text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}