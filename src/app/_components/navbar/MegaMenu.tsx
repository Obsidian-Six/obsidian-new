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

// const categories = [
//   {
//     title: "Branding",
//     href: "/services/branding",
//     items: [
//       { name: "Brand Consulting", href: "/services/branding/consulting" },
//       { name: "Logo Design", href: "/services/branding/logo-design" },
//       { name: "Industrial / Product Design", href: "/services/branding/industrial-design" },
//       { name: "Graphic Design", href: "/services/branding/graphic-design" },
//       { name: "2D / 3D Visualisation", href: "/services/branding/visualisation" },
//     ],
//   },
//   {
//     title: "Technology",
//     href: "/services/technology",
//     items: [
//       { name: "AI & Machine Learning", href: "/services/technology/ai-ml" },
//       { name: "DevOps Consulting", href: "/services/technology/devops" },
//       { name: "Data & Analytics", href: "/services/technology/data-analytics" },
//       { name: "Web Development", href: "/services/technology/web-development" },
//       { name: "Mobile App Development", href: "/services/technology/mobile-apps" },
//       { name: "E-commerce", href: "/services/technology/ecommerce" },
//       { name: "Quality Assurance & Testing", href: "/services/technology/qa" },
//       { name: "Cloud Services", href: "/services/technology/cloud" },
//       { name: "Cyber Security", href: "/services/technology/cyber-security" },
//     ],
//   },
//   {
//     title: "Digital Marketing",
//     href: "/services/marketing",
//     items: [
//       { name: "Search Engine Optimisation", href: "/services/marketing/seo" },
//       { name: "Social Media Management", href: "/services/marketing/smm" },
//       { name: "Performance Marketing", href: "/services/marketing/performance" },
//       { name: "Content Marketing", href: "/services/marketing/content" },
//       { name: "Marketing Automation", href: "/services/marketing/automation" },
//       { name: "Analytics", href: "/services/marketing/analytics" },
//     ],
//   },
// ];

export default function MegaMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          // Fixed + left-0 + w-screen ensures it ignores container and hits edges
          className="fixed left-0 top-[80px] md:top-[96px] w-screen bg-black text-white z-50 overflow-hidden border-t border-white/10 shadow-2xl"
        >
          {/* Bridge: Prevents menu closing on mouse move down */}
          <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />

          <div className="container mx-auto px-8 md:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              
              {/* Left Branding Section */}
              <div className="lg:w-1/4">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-8">
                  Building Strong Capabilities to <span className="text-[#FD7B28]">Empower</span> Your Brand
                </h2>
                <Link 
                  href="/services" 
                  className="group text-sm uppercase tracking-widest text-gray-500 hover:text-[#FD7B28] transition-colors flex items-center gap-2"
                >
                  Go to overview 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Right Categories Grid */}
              <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-10">
                {categories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-6">
                    <Link 
                      href={cat.href}
                      className="text-lg font-bold flex items-center gap-2 group hover:text-[#FD7B28] transition-colors"
                    >
                      {cat.title}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                    <ul className="flex flex-col gap-3">
                      {cat.items.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
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