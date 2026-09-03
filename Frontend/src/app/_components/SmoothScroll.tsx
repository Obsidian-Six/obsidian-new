"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll(): null {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      // smoothTouch: false,
    });

    let rafId: number;

    const raf = (time: number): void => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
