"use client";

import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export default function NavbarMenuToggler() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const toggleMenu = () => {
    const menu = document.getElementById("nav-menu"); // Get the menu element
    // Toggle the menu's opened state
    if (menu) {
      const isOpened = menu.getAttribute("data-opened") === "true";
      menu.setAttribute("data-opened", isOpened ? "false" : "true");
      setIsOpened(!isOpened);
    }

    // Change menu icon color on toggle
    // define elements which are to be changed on toggle
    const menuBtn = document.getElementById("menu-btn");
    // Check if the user has scrolled down 50 pixels
    const isScrolled = window.scrollY > 50;
    if (isScrolled) {
      menuBtn?.classList.add("text-black");
      menuBtn?.classList.remove("text-white");
    } else {
      menuBtn?.classList.remove("text-black");
      menuBtn?.classList.add("text-white");
    }
  };

  const handleResize = () => {
    // define elements which are to be changed on resize
    const menu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("nav a");

    // Check if the user has scrolled down 50 pixels
    const isScrolled = window.scrollY > 50;

    // Close menu if switching to desktop view
    if (window.innerWidth >= 1024) {
      if (menu) {
        menu.setAttribute("data-opened", "true");
        navLinks.forEach((link) => {
          if (isScrolled) {
            link.classList.add("text-black");
            link.classList.remove("text-white");
          } else {
            link.classList.add("text-white");
            link.classList.remove("text-black");
          }
        });
        setIsOpened(true);
      }
      // Make the menu close when switching to mobile view
    } else {
      if (menu) {
        menu.setAttribute("data-opened", "false");
        setIsOpened(false);
        navLinks.forEach((link) => {
          link.classList.add("text-black");
          link.classList.remove("text-white");
        });
      }
    }
  };

  useEffect(() => {
    // Close menu when resizing window to desktop view
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener for resize
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on unmount
    };
  }, []);

  return (
    <button
      id="menu-btn"
      className="lg:hidden bg-transparent border-0 z-20 text-white"
      type="button"
      onClick={() => toggleMenu()}
    >
      {isOpened ? (
        <RxCross1 className="text-2xl cursor-pointer transition-colors duration-300 text-black" />
      ) : (
        <IoMenu className="text-2xl cursor-pointer transition-colors duration-300" />
      )}
    </button>
  );
}
