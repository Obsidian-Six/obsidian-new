"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoMenu, IoCall } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import MobileMenu from "./MobileMenu";

export default function NavbarMenuToggler() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ============================================
  // MOBILE MENU SCROLL LOCK
  // ============================================
  useEffect(() => {
    if (!isOpened) {
      document.body.classList.remove("mobile-menu-open");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      document.documentElement.style.overflow = "";

      return;
    }

    // Save current scroll position
    const scrollY = window.scrollY;

    // Add global class
    document.body.classList.add("mobile-menu-open");

    // Lock the body in its current position
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    // Also lock html
    document.documentElement.style.overflow = "hidden";

    // Prevent background wheel scrolling
    const preventWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;

      // Allow scrolling inside mobile menu
      if (target.closest("[data-mobile-menu-scroll]")) {
        return;
      }

      event.preventDefault();
    };

    // Prevent background touch scrolling
    const preventTouchMove = (event: TouchEvent) => {
      const target = event.target as HTMLElement;

      // Allow scrolling inside mobile menu
      if (target.closest("[data-mobile-menu-scroll]")) {
        return;
      }

      event.preventDefault();
    };

    document.addEventListener("wheel", preventWheel, {
      passive: false,
    });

    document.addEventListener("touchmove", preventTouchMove, {
      passive: false,
    });

    return () => {
      document.body.classList.remove("mobile-menu-open");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      document.documentElement.style.overflow = "";

      document.removeEventListener("wheel", preventWheel);
      document.removeEventListener("touchmove", preventTouchMove);

      // Restore exact scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isOpened]);

  const isDarkTheme =
    pathname === "/digital-marketing-agency-uae" && !isScrolled && !isOpened;

  return (
    <>
      <div
        className="
          fixed
          top-5
          right-5
          z-[120]
          flex
          items-center
          gap-5
          transition-all
          duration-300
          lg:hidden
        "
      >
        {!isOpened && (
          <a
            href="tel:+918085652729"
            className="flex items-center justify-center p-1"
            title="Call Us"
          >
            <IoCall
              className={`cursor-pointer text-2xl ${
                isDarkTheme ? "text-white" : "text-black"
              }`}
            />
          </a>
        )}

        <button
          id="menu-btn"
          type="button"
          aria-label={isOpened ? "Close menu" : "Open menu"}
          aria-expanded={isOpened}
          className="flex items-center justify-center border-0 bg-transparent p-0"
          onClick={() => setIsOpened((prev) => !prev)}
        >
          {isOpened ? (
            <RxCross1 className="cursor-pointer text-3xl text-black" />
          ) : (
            <IoMenu
              className={`cursor-pointer text-3xl ${
                isDarkTheme ? "text-white" : "text-black"
              }`}
            />
          )}
        </button>
      </div>

      <MobileMenu isOpen={isOpened} onClose={() => setIsOpened(false)} />
    </>
  );
}
