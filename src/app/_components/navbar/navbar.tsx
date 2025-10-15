import Link from "next/link";
import React from "react";
import Image from "next/image";
import NavbarScroll from "./navbar-scroll";
import NavbarMenuToggler from "./nav-menu-toggler";

export default async function Navbar() {
  const navItems = [
    { name: "Home", link: "/#home" },
    { name: "Works", link: "/#ourWork" },
    { name: "Services", link: "/#services" },
    { name: "Blogs", link: "/#blogs" },
    { name: "About Us", link: "/#aboutUs" },
    { name: "Contact Us", link: "/#contactUs" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav>
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            id="nav-logo"
            src="/images/logo/logo2.png"
            width={140}
            height={40}
            className="h-8 mr-3 sm:h-10 w-auto transition-all duration-300"
            alt="Logo"
            priority
          />
        </Link>

        {/* Mobile Menu Icon */}
        <NavbarMenuToggler />

        {/* Desktop Nav */}
        <ul id="nav-menu" data-opened="false">
          <li>
            <Image
              id="nav-logo"
              src="/images/logo/logo2.png"
              width={140}
              height={40}
              className="h-8 sm:h-10 w-auto transition-all duration-300 my-6 mx-auto lg:hidden"
              alt="Logo"
              priority
            />
          </li>
          {navItems.map((ele, i) => (
            <li key={i}>
              <Link
                className="relative px-3 py-1 transition-colors duration-300 text-white text-base lg:text-lg font-medium hover:font-semibold"
                href={ele.link}
              >
                {ele.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <NavbarScroll />
    </>
  );
}
