"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop(): null {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll the new page to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Show navbar again
    const header = document.querySelector("header");

    if (header) {
      header.classList.remove("hide-on-scroll");
    }
  }, [pathname]);

  return null;
}