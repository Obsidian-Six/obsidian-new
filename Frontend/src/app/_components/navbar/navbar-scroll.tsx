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
    const forceWhiteBg = pathname?.includes("overview") || pathname?.startsWith("/services");
    const isDigitalOrBranding = pathname === "/digital-marketing-agency-uae" || pathname === "/branding-agency-uae";

    const header = document.querySelector("header");
    const navLinks = header?.querySelectorAll("a");
    const menuIcon = document.getElementById("menu-btn");

    // --- 1. TEXT COLOR LOGIC ---
    // If we are on the digital marketing/branding page and NOT scrolled, text should be white.
    // Otherwise, text should be black.
    const shouldBeWhiteText = isDigitalOrBranding && !isScrolled;

    if (shouldBeWhiteText) {
      menuIcon?.classList.add("text-white");
      menuIcon?.classList.remove("text-black");
      
      navLinks?.forEach(a => {
        // Skip modifying if it is the logo container that has the image
        if (!a.querySelector("img")) {
          a.classList.add("text-white");
          a.classList.remove("text-black");
        }
      });
    } else {
      menuIcon?.classList.add("text-black");
      menuIcon?.classList.remove("text-white");
      
      navLinks?.forEach(a => {
        if (!a.querySelector("img")) {
          a.classList.add("text-black");
          a.classList.remove("text-white");
        }
      });
    }

    // --- 2. BACKGROUND LOGIC ---
    if (forceWhiteBg || isScrolled) {
      // White background with shadow
      header?.classList.add("bg-white", "shadow-md");
      header?.classList.remove("bg-transparent");
      
      const onServices = pathname?.includes("/services") || pathname === "/services";
      if (onServices && isScrolled) {
        header?.classList.add("hide-on-scroll");
      } else {
        header?.classList.remove("hide-on-scroll");
      }
    } else {
      // Transparent background
      header?.classList.add("bg-transparent");
      header?.classList.remove("bg-white", "shadow-md", "hide-on-scroll");
    }
  }, [pathname]);

  // Timed hide-on-scroll for services pages
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // Depend on pathname only so the dependency array size stays constant
  }, [pathname]);

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