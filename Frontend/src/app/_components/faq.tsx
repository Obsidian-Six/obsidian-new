"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "How soon will I see results?",
    answer: "Most ad accounts show the first leads or orders in the first 2 to 3 weeks. Steady results usually take 60 to 90 days, because we test creatives and audiences first. Before we start, you get a 30-day plan with clear targets. [confirm]"
  },
  {
    question: "How is Obsidian Six different from other agencies?",
    answer: "One team for brand, ads, content and your website. You do not manage three vendors. Every campaign is tied to one number you care about: leads, orders or enquiries."
  },
  {
    question: "What guarantee do I have on my ad spend?",
    answer: "No honest agency can guarantee sales. What we do promise: your budget is spent in your own ad account, you see every rupee in a monthly report, we move money away from what is not working, and we agree targets in writing before we start. [confirm]"
  },
  {
    question: "How good will the leads and conversions be?",
    answer: "We aim for quality, not only a low cost per lead. We use qualifying questions in forms, filter out junk enquiries and review lead quality with you every week. For one college client this brought in 400+ qualified admission leads."
  },
  {
    question: "How will you work with us? What is the process and onboarding?",
    answer: "Week 1: audit and account access. Week 2: strategy, creatives and tracking. Week 3: launch and testing. After that: a weekly check-in and a monthly report. You get one point of contact. [confirm timings]"
  },
  {
    question: "For content: how do scripting and approvals work?",
    answer: "We share the script or content calendar first. You approve it, we make the content, and nothing is posted without your approval. You get up to two revision rounds on each piece. [confirm]"
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#052D69] font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-medium"
          >
            [ FAQ ]
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-slate-950 font-light tracking-tighter leading-none">
            Questions<span className="text-[#052D69]">.</span>
          </h2>
        </div>

        {/* High-Contrast Accordion */}
        <div className="divide-y divide-gray-100">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <motion.div key={index} className="group" initial={false}>
                <div
                  role="button"
                  suppressHydrationWarning
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-8 text-left transition-all cursor-pointer select-none"
                >
                  <div className="flex items-center gap-5">
                    <motion.div
                      animate={{ 
                        rotate: isOpen ? 90 : 0,
                        scale: isOpen ? 1.1 : 1,
                        color: isOpen ? "#052D69" : "#111" 
                      }}
                    >
                      {/* Bolder Icon */}
                      <ChevronRight size={22} strokeWidth={3} />
                    </motion.div>
                    
                    {/* Bold Question Text */}
                    <span className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-300 ${
                      isOpen ? "text-[#052D69]" : "text-black group-hover:text-[#052D69]"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                </div>

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