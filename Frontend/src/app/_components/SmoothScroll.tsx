"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One Lenis instance for the whole site.
 *
 * - Driven by GSAP's ticker so Lenis and ScrollTrigger share the same frame.
 *   Two separate animation loops made pinned sections stutter.
 * - On every page change it jumps to the top instantly. Before, Lenis kept
 *   animating towards the old page's scroll position, so a new page could
 *   open half-way down.
 */
export default function SmoothScroll(): null {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Respect users who turn off motion in their OS settings.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.start();
    }
    window.scrollTo(0, 0);

    // Let the new page lay out, then recalculate scroll-based animations.
    const id = window.setTimeout(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    }, 150);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
