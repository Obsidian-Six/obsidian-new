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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMegaMenuOpen(false);

  const navItems = [
    { name: "Home", link: "/#home" },
    { name: "About", link: "/aboutus" },
    { name: "Works", link: "/case-studies" },
    { name: "Services", link: "/services" },
    { name: "Blogs", link: "/blogs" },
    { name: "Contact", link: "/contactus" },
  ];


  const isWhiteBg = isScrolled || isMegaMenuOpen;

  if (isAdminRoute || isHiddenDocument) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isWhiteBg ? "bg-white shadow-md" : "bg-transparent"} ${isScrolled ? "hide-on-scroll" : ""}`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 h-20 md:h-24 transition-all duration-300">

          {/* Logo Section */}
          <Link href="/" className="z-50" onClick={closeMenu}>
            <Image
              id="nav-logo"
              src="/images/logo/logo2.png"
              width={140}
              height={40}
              className="h-10 w-auto"
              alt="Logo"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            {navItems.map((ele, i) => {
              const isServices = ele.name === "Services";
              return (
                <li
                  key={i}
                  onMouseEnter={() => isServices && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => isServices && setIsMegaMenuOpen(false)}
                  onClick={closeMenu}
                  className={`h-full flex items-center ${isServices ? "static" : "relative"}`}
                >
                  <Link
                    className="px-2 py-1 text-black text-lg font-poppins font-normal hover:text-[#FD7B28] transition-colors whitespace-nowrap"
                    href={ele.link}
                  >
                    {ele.name}
                  </Link>

                  {isServices && (
                    <div onClick={() => closeMenu()}>
                      <MegaMenu isOpen={isMegaMenuOpen} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <NavbarMenuToggler />
        </nav>
      </header>
      <NavbarScroll />
    </>
  );
}