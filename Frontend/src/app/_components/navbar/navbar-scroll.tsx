"use client";

import { MotionDiv } from "@/lib/motion";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NavbarScroll() {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const header = document.querySelector("header");

        if (!header) {
          ticking.current = false;
          return;
        }

        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollY.current;

        const scrollingDown = currentScrollY > previousScrollY;
        const scrollingUp = currentScrollY < previousScrollY;
        const atTop = currentScrollY <= 5;

        // ============================================
        // MOBILE MENU
        // ============================================

        const mobileMenuOpen =
          document.body.classList.contains("mobile-menu-open");

        if (mobileMenuOpen) {
          header.classList.remove("hide-on-scroll");

          header.classList.remove("bg-transparent");
          header.classList.add("bg-white", "shadow-md");

          lastScrollY.current = currentScrollY;
          ticking.current = false;

          return;
        }

        // ============================================
        // PAGE CONDITIONS
        // ============================================

        const isServicesPage =
          pathname === "/services" || pathname?.startsWith("/services");

        const forceWhiteBackground =
          pathname?.includes("overview") || isServicesPage;

        const isDarkPage =
          pathname === "/digital-marketing-agency-uae" ||
          pathname === "/branding-agency-uae";

        // ============================================
        // BACKGROUND
        // ============================================

        if (atTop && !forceWhiteBackground) {
          header.classList.remove("bg-white", "shadow-md");
          header.classList.add("bg-transparent");
        } else {
          header.classList.remove("bg-transparent");
          header.classList.add("bg-white", "shadow-md");
        }

        // ============================================
        // TEXT COLOR
        // ============================================

        const shouldUseWhiteText = isDarkPage && atTop;

        const navLinks = header.querySelectorAll("a");
        const menuIcon = document.getElementById("menu-btn");

        if (shouldUseWhiteText) {
          menuIcon?.classList.add("text-white");
          menuIcon?.classList.remove("text-black");

          navLinks.forEach((link) => {
            if (!link.querySelector("img")) {
              link.classList.add("text-white");
              link.classList.remove("text-black");
            }
          });
        } else {
          menuIcon?.classList.add("text-black");
          menuIcon?.classList.remove("text-white");

          navLinks.forEach((link) => {
            if (!link.querySelector("img")) {
              link.classList.add("text-black");
              link.classList.remove("text-white");
            }
          });
        }

        // ============================================
        // HEADER ANIMATION
        // ============================================

        if (atTop) {
          // At top → visible
          header.classList.remove("hide-on-scroll");
        } else if (scrollingUp) {
          // SCROLL UP → HIDE
          header.classList.add("hide-on-scroll");
        } else if (scrollingDown) {
          // SCROLL DOWN → SHOW
          header.classList.remove("hide-on-scroll");
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    lastScrollY.current = window.scrollY;

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
