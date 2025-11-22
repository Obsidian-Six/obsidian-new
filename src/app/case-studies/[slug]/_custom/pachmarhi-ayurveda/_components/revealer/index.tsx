"use client";

import { useEffect } from "react";

export default function Revealer() {
  useEffect(() => {
    // Reveal animation for elements
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal");
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // stop tracking once revealed
        }
      });
    });

    elements.forEach((el) => observer.observe(el));
  }, []);
  return <></>;
}
