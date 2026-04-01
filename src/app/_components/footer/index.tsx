"use client";

import Link from "next/link";
import Image from "next/image";
// 1. Added FaTelegramPlane to imports
import { FaInstagram, FaLinkedin, FaTelegramPlane } from "react-icons/fa"; 
import { HiArrowSmallRight } from "react-icons/hi2";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/#home" },
    { name: "Works", href: "/case-studies" },
    { name: "Services", href: "/services" },
    { name: "Blogs", href: "/blogs" },
    { name: "About us", href: "/aboutus" },
    { name: "Contact us", href: "/contactus" },
    { name: "Digital Agency", href: "/digital-marketing-agency-uae" },
    { name: "Financial Services", href: "/financial-marketing-services-uae" },
  ];

  return (
    <>
      {/* CTA Section */}
      <div className="bg-[#024787] text-white py-10 px-8 flex flex-col md:flex-row justify-evenly items-center text-center md:text-left">
        <div className="text-3xl md:text-5xl font-light leading-tight">
          Your path to progress
          <span className="font-bold underline decoration-wavy ml-2">starts here</span>
        </div>
        <Link
          href="/#contactUs"
          className="p-4 md:p-5 text-[#19183a] hover:text-[#024787] hover:bg-gray-100 transition-all rounded-full bg-white flex items-center justify-center mt-6 md:mt-0"
        >
          <HiArrowSmallRight className="text-3xl md:text-5xl" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
              <Image
                src="/images/logo/logo2.png"
                alt="Logo"
                width={140}
                height={35}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-xs font-bold text-black max-w-xs text-center md:text-left leading-relaxed opacity-80">
              Your growth partner in the digital age — we design brands, build
              websites, and market businesses for success.
            </p>
            <p className="mt-4 text-[10px] font-black text-[#024787] uppercase tracking-widest">
              Mumbai | Bhopal | Indore | Delhi
            </p>
          </div>

          {/* Column 2: Offices */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h4 className="font-black text-black uppercase tracking-widest text-[10px]">Our Offices</h4>
            <div className="space-y-3">
              <div>
                <p className="text-[9px] font-black text-[#024787] uppercase">Mumbai Office</p>
                <p className="text-xs text-black font-bold">Platinum BKC, 3rd Floor, Bandra, Mumbai 400051</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-[#024787] uppercase">Bhopal Office</p>
                <p className="text-xs text-black font-bold">Danish Nagar, Hoshangabad Road, Bhopal 462026</p>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-black text-black uppercase tracking-widest text-[10px] mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2 text-center md:text-right">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-black hover:text-[#024787] transition-colors block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="border-t border-gray-100 mt-10 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-y-4 gap-x-10 text-center md:text-left">
              <div>
                <p className="text-[9px] font-black text-[#024787] uppercase mb-1">Business Inquiry</p>
                <Link href="tel:+918085652729" className="text-sm font-black text-black hover:text-[#024787] block">
                  +91 80856 52729
                </Link>
                <Link href="mailto:info@obsidiansix.com" className="text-[11px] font-bold text-black/60 hover:text-[#024787]">
                  info@obsidiansix.com
                </Link>
              </div>

              <div>
                <p className="text-[9px] font-black text-[#024787] uppercase mb-1">HR or Careers</p>
                <Link href="tel:+918982992729" className="text-sm font-black text-black hover:text-[#024787] block">
                  +91 89829 92729
                </Link>
                <Link href="mailto:hr@obsidiansix.com" className="text-[11px] font-bold text-black/60 hover:text-[#024787]">
                  hr@obsidiansix.com
                </Link>
              </div>
            </div>

            {/* Social Icons - Telegram Added Here */}
            <div className="flex justify-center md:justify-end space-x-5">
              <a href="https://t.me/aadarsh11" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#024787] transition-all">
                <FaTelegramPlane className="text-2xl" />
              </a>
              <a href="https://www.linkedin.com/company/obsidian-six/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#024787] transition-all">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="https://www.instagram.com/obsidiansixofficial?igsh=dWNoenEwZXR3dGlj" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#024787] transition-all">
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 border-t border-gray-50 pt-6">
            <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em]">
              © Copyright 2026 Obsidian Six.
            </p>
            <div className="flex justify-center items-center gap-4 mt-2">
                <Link href="/terms" className="text-[12px] font-black text-black/50 hover:text-[#024787] uppercase tracking-widest">
                Privacy
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;