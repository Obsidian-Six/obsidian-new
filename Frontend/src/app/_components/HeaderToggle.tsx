"use client";

import Navbar from "./navbar";
import { usePathname } from "next/navigation";

export default function HeaderToggle() {
  const pathname = usePathname();
  const hideHeader = pathname?.startsWith("/secure");

  if (hideHeader) {
    return null;
  }

  return (
    <header>
      <Navbar />
    </header>
  );
}
