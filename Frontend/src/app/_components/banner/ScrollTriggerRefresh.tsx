
"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerRefresh() {
  useEffect(() => {
    let raf = 0;
    let refreshTimer = 0;
    let lastHeight = 0;
    let refreshing = false;

    const refresh = () => {
      if (refreshing) return;

      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => {
          if (document.hidden) return;

          refreshing = true;

          try {
            ScrollTrigger.refresh();
          } finally {
            // Don't immediately allow another ResizeObserver
            // callback to cause a refresh loop.
            requestAnimationFrame(() => {
              refreshing = false;
            });
          }
        });
      });
    };

    const scheduleRefresh = () => {
      if (document.hidden) return;

      clearTimeout(refreshTimer);

      refreshTimer = window.setTimeout(() => {
        refresh();
      }, 80);
    };

    /*
     * Watch the main page layout.
     *
     * This catches:
     * - API/CMS content
     * - tabs changing height
     * - images loading
     * - videos changing dimensions
     * - fonts changing text height
     * - dynamically rendered components
     */
    const page = document.querySelector("main");

    const resizeObserver = new ResizeObserver(() => {
      const height = document.documentElement.scrollHeight;

      if (height !== lastHeight) {
        lastHeight = height;
        scheduleRefresh();
      }
    });

    if (page) {
      resizeObserver.observe(page);
    }

    /*
     * Initial refresh after React/browser layout settles.
     */
    lastHeight = document.documentElement.scrollHeight;
    scheduleRefresh();

    /*
     * Fonts can change the layout after initial render.
     */
    document.fonts?.ready.then(() => {
      scheduleRefresh();
    });

    /*
     * Images can change layout after loading.
     */
    const images = Array.from(document.images);

    const handleImageLoad = () => {
      scheduleRefresh();
    };

    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", handleImageLoad);
      }
    });

    /*
     * Browser resize.
     */
    const handleResize = () => {
      scheduleRefresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(refreshTimer);

      resizeObserver.disconnect();

      images.forEach((image) => {
        image.removeEventListener("load", handleImageLoad);
      });

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}

