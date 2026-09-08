// "use client";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import { useRef } from "react";
// import Image from "next/image";
// import type { TemplateCaseStudy } from "@/lib/models/case-study.types";

// export default function HorizontalRevealGallery({ ele }: { ele: TemplateCaseStudy }) {
//   const targetRef = useRef<HTMLDivElement>(null);
  
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     // Ensure the scroll offset is well-defined
//     offset: ["start start", "end end"]
//   });

//   // 1. ADD SPRING PHYSICS: This removes the "stutter" and makes it feel fluid
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   // 2. Adjust translation based on the actual number of items
//   // Calculation: (Items - 1) * -itemWidthPercentage
//   const x = useTransform(smoothProgress, [0, 1], ["0%", `-${((ele.gallery?.length || 0) - 1) * 20}%`]);
  
//   // 3. Add a spring on the derived x transform for buttery-smooth motion
//   const springX = useSpring(x, {
//     stiffness: 120,
//     damping: 35,
//     restDelta: 0.001,
//   });

//   return (
//     // Increased height to 500vh gives the user more "room" to breathe while scrolling
//     <section ref={targetRef} className="relative h-[500vh] bg-white">
//       <div className="sticky top-0 flex h-screen items-center overflow-hidden">
//         <motion.div 
//           style={{ x: springX }} 
//           className="flex gap-8 px-10 will-change-transform" // 3. will-change-transform enables GPU rendering
//         >
//           {ele.gallery?.map((item, index) => (
//             <div
//               key={index}
//               className="group relative h-[450px] w-[350px] md:h-[600px] md:w-[650px] flex-shrink-0 overflow-hidden bg-slate-100 shadow-xl"
//             >
//               <Image
//                 src={item.img}
//                 alt={`Gallery image ${index}`}
//                 fill
//                 unoptimized
//                 className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                 sizes="(max-width: 768px) 350px, 650px"
//                 priority={index < 2} // Preload first two images for performance
//               />
              
//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

//               <motion.div 
//                 className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
//               >
//                 <p className="text-sm font-mono text-purple-400 mb-2 uppercase tracking-widest">
//                   Insight 0{index + 1}
//                 </p>
//                 <p className="text-white text-xl font-medium leading-tight">
//                   {item.text}
//                 </p>
//               </motion.div>
//             </div>
//           ))}
//         </motion.div>
//       </div>

    
//     </section>
//   );
// }

"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";

export default function HorizontalRevealGallery({
  ele,
}: {
  ele: TemplateCaseStudy;
}) {
  const gallery = ele.gallery ?? [];

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [scrollDistance, setScrollDistance] = useState(0);

  // ---------------------------------------
  // Calculate exact horizontal distance
  // ---------------------------------------
  useLayoutEffect(() => {
    if (gallery.length <= 1) {
      setScrollDistance(0);
      return;
    }

    const calculateDistance = () => {
      if (!trackRef.current) return;

      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      const distance = Math.max(
        0,
        trackWidth - viewportWidth
      );

      setScrollDistance(distance);
    };

    calculateDistance();

    const resizeObserver = new ResizeObserver(
      calculateDistance
    );

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", calculateDistance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener(
        "resize",
        calculateDistance
      );
    };
  }, [gallery.length]);

  // ---------------------------------------
  // IMPORTANT:
  // Don't use targetRef with useScroll()
  // ---------------------------------------
  const { scrollY } = useScroll();

  // ---------------------------------------
  // Get section position
  // ---------------------------------------
  const [sectionTop, setSectionTop] = useState(0);

  useLayoutEffect(() => {
    const calculatePosition = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      setSectionTop(rect.top + window.scrollY);
    };

    calculatePosition();

    window.addEventListener("resize", calculatePosition);

    return () => {
      window.removeEventListener(
        "resize",
        calculatePosition
      );
    };
  }, []);

  // ---------------------------------------
  // Calculate vertical scroll distance
  // ---------------------------------------
  const verticalDistance =
    scrollDistance;

  // ---------------------------------------
  // Convert window scroll to gallery progress
  // ---------------------------------------
  const galleryProgress = useTransform(
    scrollY,
    [sectionTop, sectionTop + verticalDistance],
    [0, 1],
    {
      clamp: true,
    }
  );

  // ---------------------------------------
  // Smooth horizontal progress
  // ---------------------------------------
  const smoothProgress = useSpring(
    galleryProgress,
    {
      stiffness: 300,
      damping: 35,
      mass: 0.35,
    }
  );

  // ---------------------------------------
  // Horizontal movement
  // ---------------------------------------
  const x = useTransform(
    smoothProgress,
    [0, 1],
    [0, -scrollDistance]
  );

  // ---------------------------------------
  // NO GALLERY
  // ---------------------------------------
  if (gallery.length === 0) {
    return null;
  }

  // ---------------------------------------
  // ONE IMAGE
  // ---------------------------------------
  if (gallery.length === 1) {
    return (
      <section className="relative bg-white py-20">
        <div className="px-10">
          <div className="relative h-[450px] w-full overflow-hidden md:h-[600px]">
            <Image
              src={gallery[0].img}
              alt="Gallery image"
              fill
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------
  // MULTIPLE IMAGES
  // ---------------------------------------
  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{
        height: `calc(100vh + ${scrollDistance}px)`,
      }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-8 px-10 will-change-transform"
        >
          {gallery.map((item, index) => (
            <div
              key={index}
              className="
                group
                relative
                h-[450px]
                w-[350px]
                shrink-0
                overflow-hidden
                bg-slate-100
                shadow-xl
                md:h-[600px]
                md:w-[650px]
              "
            >
              <Image
                src={item.img}
                alt={`Gallery image ${index + 1}`}
                fill
                unoptimized
                priority={index < 2}
                sizes="(max-width: 768px) 350px, 650px"
                onLoad={() => {
                  if (!trackRef.current) return;

                  const distance = Math.max(
                    0,
                    trackRef.current.scrollWidth -
                      window.innerWidth
                  );

                  setScrollDistance(distance);
                }}
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />

              <div className="absolute inset-x-0 bottom-0 translate-y-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="mb-2 text-sm font-mono uppercase tracking-widest text-purple-400">
                  Insight 0{index + 1}
                </p>

                <p className="text-xl font-medium leading-tight text-white">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}