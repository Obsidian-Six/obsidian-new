"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarScroll from "./navbar-scroll";
import NavbarMenuToggler from "./nav-menu-toggler";
import MegaMenu from "./MegaMenu";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");
  const isHiddenDocument = pathname?.startsWith("/hidden-document");

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
  if (pathname !== "/") {
    setIsHeroVisible(false);
    return;
  }

  const hero = document.getElementById("home");

  if (!hero) {
    setIsHeroVisible(false);
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsHeroVisible(entry.isIntersecting);
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(hero);

  return () => observer.disconnect();
}, [pathname]);


  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsScrolled(false);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down → hide header
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up → show header
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", link: "/#home" },
    { name: "About", link: "/aboutus" },
    { name: "Works", link: "/case-studies" },
    { name: "Services", link: "/services" },
    { name: "Blogs", link: "/blogs" },
    { name: "Contact", link: "/contactus" },
    { name: "Ai Audit", link: "/uae-ai-marketing-audit.html" },
  ];

  const isWhiteBg = !isHeroVisible ||
    isScrolled ||
    isMegaMenuOpen ||
    pathname?.startsWith("/services") ||
    (pathname !== "/" &&
      pathname !== "/digital-marketing-agency-uae" &&
      pathname !== "/branding-agency-uae");

  const isDarkTheme =
    !isWhiteBg &&
    (pathname === "/digital-marketing-agency-uae" ||
      pathname === "/branding-agency-uae");

  if (isAdminRoute || isHiddenDocument) return null;




  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[1000] w-full transition-all duration-300 ${
          isWhiteBg ? "bg-white shadow-md z-[1000]" : "bg-transparent"
        } ${isScrolled ? "hide-on-scroll" : ""}`}
      >
        <nav className="container mx-auto flex h-20 items-center justify-between px-6 transition-all duration-300 md:h-24">
          {/* Logo */}
          <Link href="/" className="z-50" onClick={closeMenu}>
            <Image
              id="nav-logo"
              src="/images/logo/logo2.png"
              width={140}
              height={40}
              className={`h-10 w-auto ${
                isDarkTheme ? "invert brightness-200" : ""
              }`}
              alt="Logo"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden h-full items-center gap-6 lg:flex xl:gap-8">
            {navItems.map((ele, i) => {
              const isServices = ele.name === "Services";

              return (
                <li
                  key={i}
                  onMouseEnter={() => isServices && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => isServices && setIsMegaMenuOpen(false)}
                  onClick={closeMenu}
                  className={`flex h-full items-center ${
                    isServices ? "static" : "relative"
                  }`}
                >
                  <Link
                    className={`px-2 py-1 ${
                      isDarkTheme
                        ? "text-white hover:text-[#FD7B28]"
                        : "text-black hover:text-[#FD7B28]"
                    } whitespace-nowrap font-poppins text-lg font-normal transition-colors`}
                    href={ele.link}
                  >
                    {ele.name}
                  </Link>

                  {isServices && (
                    <div onClick={closeMenu}>
                      <MegaMenu isOpen={isMegaMenuOpen} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu */}
          <NavbarMenuToggler
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
          />
        </nav>
      </header>

      <NavbarScroll />
    </>
  );
}
