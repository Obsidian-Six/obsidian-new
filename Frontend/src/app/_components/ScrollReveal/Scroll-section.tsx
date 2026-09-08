// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// interface Props {
//   paragraph: string;
// }

// export default function TextScrollReveal({ paragraph }: Props) {
//   const container = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start start", "end end"],
//   });

//   const words = paragraph.split(" ");

//   return (
//     /* Increased height to 400vh for a smoother, less rushed scroll experience */
//     <div ref={container} className="relative h-[400vh] bg-black w-full overflow-visible">

//       {/* Sticky container stays fixed while words light up */}
//       <div className="sticky top-0 left-0 flex h-screen w-full flex-col items-center justify-center bg-black overflow-hidden px-6">

//         {/* Subtle Section Label */}
//         <motion.span
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 0.4 }}
//           className="text-[10px] uppercase tracking-[0.4em] text-white mb-12 font-medium"
//         >
//           Executive Summary
//         </motion.span>

//         <div className="max-w-4xl w-full">
//           <p className="flex flex-wrap justify-center text-xl md:text-3xl lg:text-4xl font-light leading-[1.4] text-white tracking-tight">
//             {words.map((word, i) => {
//               const start = i / words.length;
//               const end = start + 1 / words.length;
//               return (
//                 <Word key={i} progress={scrollYProgress} range={[start, end]}>
//                   {word}
//                 </Word>
//               );
//             })}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
//   // Professional contrast: start very dim (0.05) and go to pure white (1)
//   const opacity = useTransform(progress, range, [0.05, 1]);
//   // Subtle lift effect: words move up 2px as they light up
//   const y = useTransform(progress, range, [2, 0]);

//   return (
//     <span className="relative mx-[0.2em] my-[0.1em] inline-block">
//       {/* Ghost text for layout stability - very faint */}
//       <span className="absolute opacity-[0.03] select-none" aria-hidden="true">
//         {children}
//       </span>
//       <motion.span style={{ opacity, y }} className="relative inline-block">
//         {children}
//       </motion.span>
//     </span>
//   );
// };

"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

interface Props {
  paragraph: string;
}

export default function TextScrollReveal({ paragraph }: Props) {
  const words = paragraph.split(" ");

  return (
    <section className="w-full bg-black px-6 py-32 md:py-48">
      <div className="mx-auto max-w-5xl">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 block text-center text-[10px] font-medium uppercase tracking-[0.4em] text-white"
        >
          Executive Summary
        </motion.span>

        {/* Text */}
        <p className="flex flex-wrap justify-center text-center text-xl font-light leading-[1.5] tracking-tight text-white md:text-3xl lg:text-4xl">
          {words.map((word, index) => (
            <Word key={`${word}-${index}`}>
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [
      "start 90%",
      "start 45%",
    ],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  return (
    <span
      ref={ref}
      className="mx-[0.2em] my-[0.1em] inline-block"
    >
      <motion.span
        style={{ opacity }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

