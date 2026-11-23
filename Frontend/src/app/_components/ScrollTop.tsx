"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop(): null {
  const pathname = usePathname();

  useEffect(() => {
    // Scrolling to the top on page change is handled in SmoothScroll.tsx.

    // Show navbar again
    const header = document.querySelector("header");

    if (header) {
      header.classList.remove("hide-on-scroll");
    }
  }, [pathname]);

  return null;
}