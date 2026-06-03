"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TechTab } from "@/lib/store/template-services";

interface TechStackSectionProps {
  techStackTitle: string;
  techStackTabs: TechTab[];
}

function TechLogo({ type }: { type: string }) {
  switch (type) {
    case "react":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-12 h-12 text-[#61dafb] fill-none stroke-current" strokeWidth="1">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
          <g stroke="#61dafb">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 180 180" className="w-12 h-12 fill-black">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path d="M149.508 157.52L69.142 54H54v72h13.5v-49.86l68.568 88.08c4.604-5.32 8.761-11.135 12.39-17.3c.36-.62.71-1.24 1.05-1.87zM112.5 126H126V54h-13.5z" fill="white" />
        </svg>
      );
    case "vue":
      return (
        <svg viewBox="0 0 256 221" className="w-12 h-12">
          <path d="M204.8 0H256L128 220.8L0 0h97.92L128 51.84L158.08 0h46.72z" fill="#41B883" />
          <path d="M204.8 0H256L128 220.8L0 0h97.92L128 51.84L158.08 0h46.72z" fill="#35495E" style={{ clipPath: "polygon(38% 0%, 62% 0%, 128% 114px, 128% 114px)" }} />
        </svg>
      );
    case "angular":
      return (
        <svg viewBox="0 0 250 250" className="w-12 h-12">
          <path d="M125 30L31.9 63.2l14.1 122.3L125 220l79-34.5 14.1-122.3z" fill="#DD0031" />
          <path d="M125 30v190l79-34.5 14.1-122.3z" fill="#C3002F" />
          <path d="M125 52L66.8 182.6h21.7l11.7-29.2h50.7l11.7 29.2h21.7z" fill="#FFF" />
          <path d="M125 52v101.4h25.3z" fill="#F5F5F5" />
          <path d="M125 78.3l16.1 40.3H108.9z" fill="#DD0031" />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 256 288" className="w-12 h-12">
          <path d="M128 0L24 60v120l104 60 104-60V60L128 0zm76.5 161.4c-6.8 7.3-17.5 11.1-32.3 11.4l-1.9.1H128V90h42.3c14.2 0 24.3 3.5 30.6 10.4 5.9 6.5 8.9 15.6 8.9 27.2 0 14.1-4.7 25.1-14.3 33.8z" fill="#339933" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 110 110" className="w-12 h-12">
          <path d="M55 0C24.6 0 0 24.6 0 55s24.6 55 55 55 55-24.6 55-55S85.4 0 55 0zm-1.8 17.5c2.3 0 4.1 1.8 4.1 4.1s-1.8 4.1-4.1 4.1-4.1-1.8-4.1-4.1 1.8-4.1 4.1-4.1zm12.3 75.3H44.5c-7.9 0-14.3-6.4-14.3-14.3V67.8h10.7v7.2c0 2 1.6 3.6 3.6 3.6h22.8c2 0 3.6-1.6 3.6-3.6v-7.2h10.7v10.7c0 7.9-6.4 14.3-14.3 14.3z" fill="#3776AB" />
        </svg>
      );
    case "go":
      return (
        <svg viewBox="0 0 256 96" className="w-12 h-12">
          <path d="M52.3 48c0-18.7 15.2-33.9 33.9-33.9s33.9 15.2 33.9 33.9-15.2 33.9-33.9 33.9S52.3 66.7 52.3 48z" fill="#00ADD8" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm45 175H83v-10h90v10z" fill="#336791" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <path d="M128 0C85 50 85 150 128 256c43-106 43-206 0-256z" fill="#47A248" />
        </svg>
      );
    case "redis":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="80" rx="10" fill="#DC382D" />
          <rect y="100" width="256" height="80" rx="10" fill="#DC382D" />
        </svg>
      );
    default:
      return (
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
          {type.substring(0, 2).toUpperCase()}
        </div>
      );
  }
}

export default function TechStackSection({
  techStackTitle,
  techStackTabs
}: TechStackSectionProps) {
  const [activeTechTab, setActiveTechTab] = useState(
    techStackTabs[0]?.name || ""
  );

  const currentTabContent = techStackTabs.find((t) => t.name === activeTechTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <h2 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight mb-8 font-inter">
        {techStackTitle}
      </h2>

      {/* Inner Tech Sub-tabs */}
      <div className="flex gap-6 border-b border-slate-100 pb-4 mb-10 overflow-x-auto no-scrollbar">
        {techStackTabs.map((tab) => {
          const isSelected = activeTechTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTechTab(tab.name)}
              className={`text-[15px] font-semibold transition-all relative pb-2 shrink-0 ${
                isSelected ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.name}
              {isSelected && (
                <motion.div
                  layoutId="activeTechTabUnderline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {currentTabContent?.cards.map((card, idx) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="border border-slate-100 hover:border-slate-200 rounded-sm p-8 flex flex-col bg-white shadow-sm hover:shadow-md transition-all duration-300 min-h-[300px]"
            >
              <div className="mb-6 flex justify-start">
                <TechLogo type={card.logoType} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-4 font-poppins">
                {card.name}
              </h3>

              <p className="text-sm font-light text-slate-500 leading-relaxed mb-6 flex-1 font-sans">
                {card.description}
              </p>

              {card.learnMoreLink && (
                <Link
                  href={card.learnMoreLink}
                  className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors group mt-auto"
                >
                  Learn more
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
