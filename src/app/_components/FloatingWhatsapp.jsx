"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsapp = () => {
  return (
    <>
      <a
        href="https://wa.me/+918085652729"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bounce-smooth"
      >
        <div className="bg-[#25D366] text-white p-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaWhatsapp className="text-[24px]" />
        </div>
      </a>

      {/* Inline CSS for animation */}
      <style jsx global>{`
        @keyframes bounce-smooth {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .bounce-smooth {
          animation: bounce-smooth 1.8s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsapp;
