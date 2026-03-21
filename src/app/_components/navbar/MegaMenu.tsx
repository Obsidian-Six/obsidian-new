"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    title: "Branding",
    href: "/services/branding",
    items: [
      { name: "Brand Consulting", href: "/services/branding/consulting" },
      { name: "Logo Design", href: "/services/branding/logo-design" },
      { name: "Industrial / Product Design", href: "/services/branding/industrial-design" },
      { name: "Graphic Design", href: "/services/branding/graphic-design" },
      { name: "2D / 3D Visualisation", href: "/services/branding/visualisation" },
    ],
  },
  {
    title: "Technology",
    href: "/services/technology",
    items: [
      { name: "AI & Machine Learning", href: "/services" },
      { name: "DevOps Consulting", href: "/services" },
      { name: "Data & Analytics", href: "/services" },
      { name: "Web Development", href: "/services" },
      { name: "Mobile App Development", href: "/services" },
      { name: "E-commerce", href: "/services" },
      { name: "Quality Assurance & Testing", href: "/services" },
    ],
  },
  {
    title: "Digital Marketing",
    href: "/services/marketing",
    items: [
      { name: "Search Engine Optimisation", href: "/services" },
      { name: "Social Media Management", href: "/services" },
      { name: "Performance Marketing", href: "/services" },
      { name: "Content Marketing", href: "/services" },
      { name: "Marketing Automation", href: "/services" },
      { name: "Analytics", href: "/services" },
    ],
  },
];

export default function MegaMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        // Inside MegaMenu.tsx
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          /* Change 'fixed' to 'absolute' so it pins to the bottom of the header */
          /* Keep top-full or use the exact pixel height like top-[80px] */
          className="absolute left-0 top-full w-screen bg-black text-white z-50 overflow-hidden border-t border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
        >
          <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />

          <div className="container mx-auto px-8 md:px-16 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

              {/* Left Branding Section */}
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

              {/* Right Categories Grid */}
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12">
                {categories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-6">
                    <Link
                      href={cat.href}
                      className="text-lg font-black uppercase tracking-tight flex items-center justify-between group text-white border-b border-white/10 pb-3"
                    >
                      {cat.title}
                      <span className="translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-[#FD7B28]">→</span>
                    </Link>
                    <ul className="flex flex-col gap-3">
                      {cat.items.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.href}
                            className="text-[14px] font-medium text-gray-400 hover:text-[#FD7B28] hover:translate-x-1 transition-all inline-block"
                          >
                            {item.name}
                          </Link>
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