"use client";

import { MotionDiv } from "@/lib/motion";
import { useScroll } from "framer-motion";
import { useEffect } from "react";

export default function NavbarScroll() {
  const { scrollYProgress } = useScroll(); // get scroll progress

  // function to handle scroll and change navbar styles
  const handleScroll = () => {
    // Check if the user has scrolled down 50 pixels
    const isScrolled = window.scrollY > 50;

    // define elements which are to be changed on scroll
    const header = document.querySelector("header");
    const navLogo = document.getElementById("nav-logo");
    const menuIcon = document.getElementById("menu-btn");
    const navLinks = document.querySelectorAll("nav a");

    // Change styles based on scroll position
    if (isScrolled) {
      header?.classList.add("bg-white", "shadow-md", "py-3");
      header?.classList.remove("bg-transparent", "py-5");

      navLogo?.setAttribute("src", "/images/logo/logo2.png");

      menuIcon?.classList.remove("text-white");
      menuIcon?.classList.add("text-black");

      // Change nav link colors based on screen size
      navLinks.forEach((link) => {
        if (window.innerWidth >= 1024) {
          link.classList.add("text-black");
          link.classList.remove("text-white");
        } else {
          link.classList.add("text-black");
          link.classList.remove("text-white");
        }
      });
    } else {
      header?.classList.add("bg-transparent", "py-5");
      header?.classList.remove("bg-white", "shadow-md", "py-3");

      navLogo?.setAttribute("src", "/images/logo/logo1.png");

      menuIcon?.classList.remove("text-black");
      menuIcon?.classList.add("text-white");

      // Explicitly check for mobile view before changing colors
      navLinks.forEach((link) => {
        if (window.innerWidth < 1024) {
          link.classList.add("text-black");
          link.classList.remove("text-white");
        } else {
          link.classList.remove("text-black");
          link.classList.add("text-white");
        }
      });
    }
  };

  // Add scroll event listener on component mount and clean up on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
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
    </>
  );
}
