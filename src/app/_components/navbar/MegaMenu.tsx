"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    title: "Branding",
    items: [
      { name: "Brand Consulting" },
      { name: "Logo Design" },
      { name: "Industrial / Product Design" },
      { name: "Graphic Design" },
      { name: "2D / 3D Visualisation" },
    ],
  },
  {
    title: "Technology",
    items: [
      { name: "AI & Machine Learning" },
      { name: "DevOps Consulting" },
      { name: "Data & Analytics" },
      { name: "Web Development" },
      { name: "Mobile App Development" },
      { name: "E-commerce" },
      { name: "Quality Assurance & Testing" },
    ],
  },
  {
    title: "Digital Marketing",
    items: [
      { name: "Search Engine Optimisation" },
      { name: "Social Media Management" },
      { name: "Performance Marketing" },
      { name: "Content Marketing" },
      { name: "Marketing Automation" },
      { name: "Analytics" },
    ],
  },
];

export default function MegaMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-0 top-full w-screen bg-black text-white z-50 overflow-hidden border-t border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
        >
          <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />

          <div className="container mx-auto px-8 md:px-16 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

              {/* Left Branding Section - STAYING CLICKABLE */}
              <div className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-none mb-8 text-white">
                  Strong Capabilities <br />
                  To <span className="text-[#FD7B28]">Empower</span> Your Brand
                </h2>
                <Link
                  href="/overview"
                  className="group text-xs uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-3"
                >
                  Explore All Services
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>

              {/* Right Categories Grid - NOW NON-CLICKABLE */}
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12">
                {categories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-6">
                    <div
                      className="text-lg font-black uppercase tracking-tight flex items-center justify-between text-white border-b border-white/10 pb-3"
                    >
                      {cat.title}
                      {/* Arrow remains but hover logic removed from parent */}
                    </div>
                    <ul className="flex flex-col gap-3">
                      {cat.items.map((item, index) => (
                        <li key={index}>
                          <span
                            className="text-[14px] font-medium text-gray-400 cursor-default"
                          >
                            {item.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}