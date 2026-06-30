"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoMenu, IoCall } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import MobileMenu from "./MobileMenu"; // We will create this below

export default function NavbarMenuToggler() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkTheme = pathname === "/digital-marketing-agency-uae" && !isScrolled && !isOpened;

  return (
    <>
      <div className="lg:hidden fixed top-5 right-5 z-[120] flex items-center gap-5 transition-all duration-300">
        {!isOpened && (
          <a
            href="tel:+918085652729"
            className="flex items-center justify-center p-1"
            title="Call Us"
          >
            <IoCall className={`text-2xl cursor-pointer ${isDarkTheme ? 'text-white' : 'text-black'}`} />
          </a>
        )}

        <button
          suppressHydrationWarning
          id="menu-btn"
          className="bg-transparent border-0 flex items-center justify-center p-0"
          type="button"
          onClick={() => setIsOpened(!isOpened)}
        >
          {isOpened ? (
            <RxCross1 className="text-3xl cursor-pointer text-black" />
          ) : (
            <IoMenu className={`text-3xl cursor-pointer ${isDarkTheme ? 'text-white' : 'text-black'}`} />
          )}
        </button>
      </div>

      {/* The Actual Menu Container */}
      <MobileMenu isOpen={isOpened} onClose={() => setIsOpened(false)} />
    </>
  );
}