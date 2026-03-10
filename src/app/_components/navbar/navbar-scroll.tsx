"use client";

import { MotionDiv } from "@/lib/motion";
import { useScroll } from "framer-motion";
import { useEffect, useCallback } from "react";

export default function NavbarScroll() {
  const { scrollYProgress } = useScroll();

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 0;

    const header = document.querySelector("header");
    const navLogo = document.getElementById("nav-logo");
    const menuIcon = document.getElementById("menu-btn");
    const navLinks = document.querySelectorAll("nav a");

    // 1. Force Black Text immediately (Removes white dependency)
    menuIcon?.classList.add("text-black");
    menuIcon?.classList.remove("text-white");
    
    navLinks.forEach((link) => {
      link.classList.add("text-black");
      link.classList.remove("text-white");
    });

    // 2. Handle Header Background & Logo
    if (isScrolled) {
      header?.classList.add("bg-white", "shadow-md", "py-3");
      header?.classList.remove("bg-transparent", "py-5");
      navLogo?.setAttribute("src", "/images/logo/logo2.png");
    } else {
      header?.classList.add("bg-transparent", "py-5");
      header?.classList.remove("bg-white", "shadow-md", "py-3");
      navLogo?.setAttribute("src", "/images/logo/logo2.png");
    }
  }, []);

  useEffect(() => {
    // Run immediately to snap colors to black before user even scrolls
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <MotionDiv
      id="scroll-indicator"
      style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0, // Adjusted to top 0 if header is sticky
        left: 0,
        right: 0,
        height: 4,
        originX: 0,
        backgroundColor: "#FD7B28",
        zIndex: 1000,
      }}
    />
  );
}