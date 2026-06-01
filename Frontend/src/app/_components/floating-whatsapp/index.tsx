"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function FloatingWhatsapp() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isHiddenDocument = pathname?.startsWith("/hidden-document");

  if (isAdminRoute || isHiddenDocument) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[99999]">
      <Link
        href="https://wa.me/918085652729"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group block"
      >
        {/* Large high-quality container */}
        <div className="flex items-center justify-center w-16 h-16 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-transform duration-300 group-hover:scale-110 active:scale-95">
          {/* Large sharp icon */}
          <FaWhatsapp className="text-white text-4xl md:text-5xl" />
        </div>
      </Link>
    </div>
  );
}