"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/aboutus" },
    { name: "Works", link: "/case-studies" },
    { name: "Services", link: "/services" },
    { name: "Blogs", link: "/blogs" },
    { name: "Contact Us", link: "/contactus" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay/Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[110] lg:hidden backdrop-blur-sm"
          />

          {/* Sliding Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-[80%] max-w-[350px] bg-white z-[115] lg:hidden shadow-2xl flex flex-col p-10 pt-24"
          >
            <nav className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.link}
                    onClick={onClose}
                    className="text-2xl font-light tracking-tight text-[#19183A] hover:text-[#024787] transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pb-10">
               <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Get in Touch</p>
               <p className="text-sm mt-2 text-[#19183A]">hr@obsidiansix.com</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}