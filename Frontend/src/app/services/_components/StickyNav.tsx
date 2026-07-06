"use client";

import { motion } from "framer-motion";

interface StickyNavProps {
  title: string;
  navItems: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSticky: boolean;
}

export default function StickyNav({
  title,
  navItems,
  activeTab,
  setActiveTab,
  isSticky
}: StickyNavProps) {
  return (
    <nav
      className={`z-40 transition-all duration-300 ${
        isSticky
          ? "fixed top-[0.5rem] md:top-[1rem] left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-7xl bg-white/95 backdrop-blur-md shadow-md rounded-xl md:rounded-2xl border border-slate-100"
          : "relative w-full bg-white/95 border-b border-slate-100"
      }`}
    >
      {/* Container wrapper matching the exact width and padding constraints of the main header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 xl:px-20 flex items-center justify-between">
        
        {/* Left aligned title element */}
        <div className={`flex items-center min-w-0 transition-all duration-300 ${isSticky ? "py-3 md:py-3.5" : "py-5"}`}>
          <h2 className="font-bold text-base md:text-lg text-slate-900 truncate pr-4 border-r border-slate-200">
            {title}
          </h2>
        </div>

        {/* Right aligned scrolling tab menu */}
        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar ml-4">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <div
                role="button"
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  if (isSticky) {
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }
                }}
                className={`text-sm font-semibold tracking-wide relative shrink-0 transition-all duration-300 cursor-pointer select-none ${
                  isSticky ? "py-3 md:py-3.5" : "py-5"
                } ${
                  isActive ? "text-slate-900 font-bold" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <span className="relative z-10">{item}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeStickyTab"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </nav>
  );
}