"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import MobileMenu from "./MobileMenu"; // We will create this below

export default function NavbarMenuToggler() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  return (
    <>
      <button
        suppressHydrationWarning
        id="menu-btn"
        className="lg:hidden bg-transparent border-0 z-[120] fixed top-5 right-5 transition-all duration-300"
        type="button"
        onClick={() => setIsOpened(!isOpened)}
      >
        {isOpened ? (
          <RxCross1 className="text-3xl cursor-pointer text-black" />
        ) : (
          <IoMenu className={`text-3xl cursor-pointer ${isOpened ? 'text-black' : 'text-black'}`} />
        )}
      </button>

      {/* The Actual Menu Container */}
      <MobileMenu isOpen={isOpened} onClose={() => setIsOpened(false)} />
    </>
  );
}