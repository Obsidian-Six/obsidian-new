"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ParallaxTextProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

export default function ParallaxText({
  children,
  className = "",
  speed = 30,
}: ParallaxTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    const ctx = gsap.context(() => {
      const movement = window.innerWidth < 768 ? speed * 0.45 : speed;

      gsap.fromTo(
        text,
        {
          yPercent: movement,
        },
        {
          yPercent: -movement,
          ease: "none",

          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        },
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [speed]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={textRef} className={className}>
        {children}
      </div>
    </div>
  );
}
