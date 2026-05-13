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
          /* UPDATED: Changed bg to white, text to black, and adjusted border/shadow */
          className="absolute left-0 top-full w-screen bg-white text-slate-900 z-50 overflow-hidden border-t border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.1)] font-poppins"
        >
          {/* Bridge to prevent menu closing */}
          <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />

          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

              {/* Left Branding Section */}
              <div className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] mb-8 text-slate-900">
                  Strong Capabilities <br />
                  To <span className="text-[#FD7B28]">Empower</span> Your Brand
                </h2>
                <Link
                  href="/services"
                  /* UPDATED: text opacity color for white background */
                  className="group text-[11px] uppercase tracking-[0.4em] font-black text-slate-400 hover:text-[#FD7B28] transition-all flex items-center gap-3"
                >
                  Explore All Services
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>

              {/* Right Categories Grid */}
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12">
                {categories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-6">
                    <div
                      /* UPDATED: border-black/5 for a subtle divider */
                      className="text-sm font-black uppercase tracking-[0.2em] flex items-center justify-between text-slate-900 border-b border-gray-100 pb-4"
                    >
                      {cat.title}
                    </div>
                    <ul className="flex flex-col gap-4">
                      {cat.items.map((item, index) => (
                        <li key={index}>
                          <span
                            /* UPDATED: Adjusted text colors for better readability */
                            className="text-[15px] font-medium text-slate-500 hover:text-black transition-colors cursor-default block"
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