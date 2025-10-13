"use client";

import { useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { MotionDiv } from "@/lib/motion";
import Image from "next/image";

const Navbar = () => {
  const path = usePathname();
  const [isDrawer, setIsDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", link: "/#home" },
    { name: "Works", link: "/#ourWork" },
    { name: "Services", link: "/#services" },
    { name: "Blogs", link: "/#blogs" },
    { name: "About Us", link: "/#aboutUs" },
    { name: "Contact Us", link: "/#contactUs" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="flex items-center justify-between max-w-screen-xl px-4 mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={
                isScrolled ? "/images/logo/logo2.png" : "/images/logo/logo1.png"
              }
              width={140}
              height={40}
              className="h-8 mr-3 sm:h-10 w-auto transition-all duration-300"
              alt="Logo"
              priority
            />
          </Link>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <IoMenu
              className={`text-2xl cursor-pointer transition-colors duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
              onClick={() => setIsDrawer(true)}
            />
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex justify-between text-lg w-full max-w-xl">
            {navItems.map((ele, i) => (
              <li key={i}>
                <Link
                  href={ele.link}
                  className={`relative px-3 py-1 transition-colors duration-300
    ${isScrolled ? "text-black" : "text-white"}
     hover:font-semibold
    ${path === ele.link ? "text-[#FD7B28] font-semibold" : ""}
  `}
                >
                  {ele.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Scroll Indicator */}
        <MotionDiv
          id="scroll-indicator"
          style={{
            scaleX: scrollYProgress,
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            height: 4,
            originX: 0,
            backgroundColor: "#FD7B28",
          }}
        />
      </nav>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed top-0 right-0 z-[9999] h-full p-4 bg-gradient-to-r from-[#d9d9d9] to-white border-l border-[#FD7B28] transition-transform duration-300 ease-in-out transform ${
          isDrawer ? "translate-x-0" : "translate-x-full"
        } w-4/5 max-w-sm sm:w-80 lg:hidden shadow-xl backdrop-blur-md`}
      >
        <button
          type="button"
          onClick={() => setIsDrawer(false)}
          className="absolute top-4 right-2"
        >
          <RxCross1 className="text-2xl textmain" />
        </button>

        <div className="mt-1 flex justify-center">
          <Image
            src="/images/logo/logo2.png"
            width={160}
            height={40}
            className="h-10 w-auto"
            alt="Logo"
          />
        </div>

        <div className="py-6 overflow-y-auto max-h-[80vh]">
          <ul className="space-y-4">
            {navItems.map((ele, i) => (
              <li key={i}>
                <Link
                  href={ele.link}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    path === ele.link
                      ? "bg-[#FD7B28] text-white shadow"
                      : "text-gray-800 hover:bg-[#fef0e7] hover:text-[#FD7B28]"
                  }`}
                  onClick={() => setIsDrawer(false)}
                >
                  <span className="text-xl">●</span>
                  {ele.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
