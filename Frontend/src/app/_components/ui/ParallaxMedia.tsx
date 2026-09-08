"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type ParallaxMediaProps = {
  type: "image" | "video";
  src: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  speed?: number;
  priority?: boolean;
};

export default function ParallaxMedia({
  type,
  src,
  alt = "",
  className = "",
  imageClassName = "",
  speed = 15,
  priority = false,
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const media = mediaRef.current;

    if (!container || !media) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Reduce movement on mobile
      const movement = isMobile ? speed * 0.55 : speed;

      gsap.set(media, {
        yPercent: -movement / 2,
        scale: 1.08,
        force3D: true,
        willChange: "transform",
      });

      gsap.to(media, {
        yPercent: movement / 2,
        ease: "none",

        scrollTrigger: {
          trigger: container,

          start: "top bottom",
          end: "bottom top",

          scrub: 1.2,

          invalidateOnRefresh: true,

          fastScrollEnd: true,

          // Prevents unnecessary callbacks
          onRefresh: () => {
            gsap.set(media, {
              force3D: true,
            });
          },
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <div
        ref={mediaRef}
        className="absolute -inset-[8%] h-[116%] w-[116%] transform-gpu"
      >
        {type === "video" ? (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`h-full w-full object-cover ${imageClassName}`}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className={`object-cover ${imageClassName}`}
          />
        )}
      </div>
    </div>
  );
}
