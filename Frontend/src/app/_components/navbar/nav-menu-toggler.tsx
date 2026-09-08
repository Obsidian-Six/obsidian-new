"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { usePathname } from "next/navigation";
import { IoMenu, IoCall } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import MobileMenu from "./MobileMenu";

interface NavbarMenuTogglerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavbarMenuToggler({
  isOpen,
  setIsOpen,
}: NavbarMenuTogglerProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ============================================
  // MOBILE MENU SCROLL LOCK
  // ============================================
  useEffect(() => {
    if (!isOpen) {
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

    // Lock body
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    // Lock html
    document.documentElement.style.overflow = "hidden";

    // Prevent background wheel scrolling
    const preventWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest("[data-mobile-menu-scroll]")) {
        return;
      }

      event.preventDefault();
    };

    // Prevent background touch scrolling
    const preventTouchMove = (event: TouchEvent) => {
      const target = event.target as HTMLElement;

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
  }, [isOpen]);

  const isDarkTheme =
    pathname === "/digital-marketing-agency-uae" &&
    !isScrolled &&
    !isOpen;

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
        {!isOpen && (
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
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex items-center justify-center border-0 bg-transparent p-0"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
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

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}