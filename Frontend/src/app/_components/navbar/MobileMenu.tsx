"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const mainNavItems = [
    { name: "Works", link: "/case-studies" },
    { name: "About Us", link: "/aboutus" },
    { name: "Blogs", link: "/blogs" },
    { name: "AI Audit", link: "/uae-ai-marketing-audit.html" },
  ];

  const serviceSubItems = [
    { name: "Explore Services", link: "/services" },
    { name: "Digital Marketing", link: "/digital-marketing-agency-uae" },
    { name: "Technology", link: "/services/technology" },
    { name: "Branding", link: "/branding-agency-uae" },
    { name: "Experience Design", link: "/services/experience-design" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[115] flex h-[100dvh] w-full flex-col overflow-hidden bg-white lg:hidden"
        >
          {/* Top Header of Menu Panel to align with standard mobile header */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100 shrink-0">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center h-full"
            >
              <Image
                src="/images/logo/logo2.png"
                width={120}
                height={36}
                className="h-9 w-auto"
                alt="Logo"
                priority
              />
            </Link>
            {/* The close button is rendered as an overlay by nav-menu-toggler.tsx */}
            <div className="w-8 h-8" />
          </div>

          {/* Navigation Options Section */}
          <div
            data-mobile-menu-scroll
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 md:py-6 flex flex-col"
          >
            <nav className="w-full flex flex-col">
              {/* Collapsible Services Item */}
              <div className="w-full border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full py-4 md:py-5 flex items-center justify-between text-base font-poppins font-medium tracking-tight text-[#19183A] hover:text-[#052D69] transition-colors focus:outline-none"
                >
                  <span className="text-xl">Services</span>
                  {isServicesOpen ? (
                    <IoChevronUp className="text-slate-400 text-lg" />
                  ) : (
                    <IoChevronDown className="text-slate-400 text-lg" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-slate-50/50 rounded-lg px-4 mb-3"
                    >
                      {serviceSubItems.map((subItem, index) => (
                        <Link
                          key={index}
                          href={subItem.link}
                          onClick={onClose}
                          className="text-lg block py-3 text-sm font-poppins font-normal text-slate-600 hover:text-[#052D69] border-b border-slate-100/50 last:border-b-0"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Items */}
              {mainNavItems.map((item, i) => (
                <div key={i} className="w-full border-b border-slate-100">
                  <Link
                    href={item.link}
                    onClick={onClose}
                    className="text-xl block py-4 md:py-4 text-base font-poppins font-medium tracking-tight text-[#19183A] hover:text-[#052D69] transition-colors"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Bottom Section containing the CTA button */}
            <div className="pt-8 pb-6">
              <Link
                href="/contactus"
                onClick={onClose}
                className="w-full bg-[#052D69] hover:bg-blue-700 text-white font-poppins font-semibold py-4 text-center tracking-wide block transition-colors rounded-none"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
