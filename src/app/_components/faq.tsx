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
    <section className="py-20 bg-[#fafafa] font-[family-name:var(--font-poppins)] overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Compact Header */}
        <div className="mb-12 border-l-2 border-black pl-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1b2e] tracking-tight font-[family-name:var(--font-playfair)]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
            Answers for the ambitious
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <motion.div 
                key={index} 
                className="group py-2"
                initial={false}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ 
                        rotate: isOpen ? 90 : 0,
                        color: isOpen ? "#000" : "#9ca3af" 
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <ChevronRight size={18} />
                    </motion.div>
                    <span className={`text-base md:text-lg font-medium transition-all duration-300 ${
                      isOpen ? "text-black translate-x-2" : "text-gray-600 group-hover:text-black"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0, y: -10 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{ 
                        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                        opacity: { duration: 0.25, delay: 0.1 }
                      }}
                    >
                      <div className="pl-9 pb-6 pr-4 text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl font-light">
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