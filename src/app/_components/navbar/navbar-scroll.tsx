"use client";

import { MotionDiv } from "@/lib/motion";
import { useScroll } from "framer-motion";
import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function NavbarScroll() {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 0;
    const onOverview = pathname?.includes("overview");
    
    const header = document.querySelector("header");
    const navLinks = header?.querySelectorAll("a");
    const menuIcon = document.getElementById("menu-btn");

    // --- 1. ALWAYS BLACK TEXT LOGIC ---
    // We add text-black and remove text-white immediately every time
    menuIcon?.classList.add("text-black");
    menuIcon?.classList.remove("text-white");
    
    navLinks?.forEach(a => {
      a.classList.add("text-black");
      a.classList.remove("text-white");
    });

    // --- 2. BACKGROUND LOGIC ---
    if (onOverview || isScrolled) {
      // White background with shadow
      header?.classList.add("bg-white", "shadow-md");
      header?.classList.remove("bg-transparent");
    } else {
      // Transparent background (at top of other pages), but text stays black
      header?.classList.add("bg-transparent");
      header?.classList.remove("bg-white", "shadow-md");
    }
  }, [pathname]);

  useEffect(() => {
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
        top: 0,
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