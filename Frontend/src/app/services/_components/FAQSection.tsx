"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection({ faqData }: { faqData?: FaqItem[] }) {
  // Tracking open index. Using number | null allows only one item to be open at a time.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fallback: FaqItem[] = [
    {
      question: "What is brand consulting, and how can it benefit my business?",
      answer: "Brand consulting helps companies define their unique value proposition, clarify their core messaging, and design cohesive visual systems. This alignment ensures consistency across touchpoints, driving customer loyalty and supporting enterprise scale growth.",
    },
    {
      question: "What is the ideal timeline for a brand consulting project?",
      answer: "A standard comprehensive framework typically runs between 4 to 8 weeks. This accommodates complete initial competitive audits, user persona formulation blueprint discovery phases, visual layout iterations, and final deployment parameter handoffs.",
    },
    {
      question: "What types of businesses can benefit from brand consulting services?",
      answer: "Any entity looking to establish market authoritative stance—ranging from early-stage venture-backed startups needing a product go-to-market position, to established corporate enterprises modernizing outdated design frameworks for newer consumer cohorts.",
    },
    {
      question: "How can I select the right brand consulting service for my business?",
      answer: "Evaluate consulting groups by reviewing their case studies, industry horizontal insights, and engineering workflow synchronization capabilities. The best partner maps conceptual brand goals directly to functional engineering metrics.",
    },
  ];

  const list = faqData && faqData.length ? faqData : fallback;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Component Header Match */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-slate-900">
            FAQ
          </h2>
        </div>

        {/* Accordion Stream Wrapper */}
        <div className="flex flex-col border-t border-slate-900">
          {list.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="border-b border-slate-900 w-full"
              >
                {/* Clickable Header Trigger Row */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-6 flex items-center justify-between text-left group transition-colors duration-200 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span 
                    className={`text-base md:text-lg font-medium tracking-tight transition-colors duration-200 ${
                      isOpen ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"
                    }`}
                  >
                    {item.question}
                  </span>
                  
                  {/* Plus / Minus Custom Vector Indicator */}
                  <div className="relative flex items-center justify-center w-5 h-5 ml-4 flex-shrink-0">
                    {/* Horizontal Bar */}
                    <span 
                      className={`absolute w-4 h-[1.5px] rounded-full transition-transform duration-300 ${
                        isOpen ? "bg-blue-600 rotate-180" : "bg-slate-900"
                      }`} 
                    />
                    {/* Vertical Bar (Fades out / rotates when open) */}
                    <span 
                      className={`absolute h-4 w-[1.5px] rounded-full transition-all duration-300 ${
                        isOpen ? "bg-blue-600 opacity-0 rotate-90" : "bg-slate-900 opacity-100"
                      }`} 
                    />
                  </div>
                </button>

                {/* Collapsible Content Area */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-3xl">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}