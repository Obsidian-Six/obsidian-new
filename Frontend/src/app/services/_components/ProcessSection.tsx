"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProcessStep } from "@/lib/store/template-services";

interface ProcessSectionProps {
  processTitle: string;
  processSteps: ProcessStep[];
}

export default function ProcessSection({
  processTitle,
  processSteps,
}: ProcessSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const activeStep = processSteps[openIndex];

  const toggle = (idx: number) => {
    setOpenIndex(idx === openIndex ? -1 : idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight mb-12 font-inter">
        {processTitle}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-start">
        {/* Left: Image Panel */}
        <div className="hidden lg:block sticky top-28">
          <AnimatePresence mode="wait">
            {openIndex >= 0 && activeStep && (
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-slate-100"
              >
                <Image
                  src={activeStep.image}
                  alt={activeStep.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Accordion */}
        <div className="flex flex-col divide-y divide-slate-100">
          {processSteps.map((step, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="group">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between py-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-[17px] font-medium transition-colors duration-200 ${
                      isOpen
                        ? "text-slate-900"
                        : "text-slate-500 group-hover:text-slate-800"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span
                    className={`ml-4 flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-slate-900 bg-slate-900 text-white rotate-45"
                        : "border-slate-300 text-slate-400 group-hover:border-slate-500"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        {/* Mobile: show image inline */}
                        <div className="lg:hidden mb-4 relative w-full aspect-video rounded-sm overflow-hidden bg-slate-100">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                        <p className="text-sm font-light text-slate-500 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
