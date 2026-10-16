// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import type { TemplateCaseStudy } from "@/lib/models/case-study.types";

// export default function TheResult({ ele }: { ele: TemplateCaseStudy }) {
//   if (!ele.results || ele.results.length < 1) return null;

//   return (
//     <section className="bg-[#fafafa] py-24 md:py-32 overflow-hidden">
//       <div className="max-w-6xl mx-auto px-6">

//         {/* --- 1. REFINED HEADER --- */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-20 text-center md:text-left"
//         >
//           <span className="text-[10px] tracking-[0.5em] uppercase text-purple-600 font-bold block mb-4">
//             03 — The Transformation
//           </span>
//           <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-[#19183A] leading-none uppercase">
//             The <span className="italic font-serif text-slate-400">Results</span>
//           </h2>
//           <div className="h-1 w-20 bg-purple-600 mt-6 hidden md:block" />
//         </motion.div>

//         {/* --- 2. COMPACT EXHIBIT GRID --- */}
//         <div className="space-y-32 md:space-y-40">
//           {ele.results.map((result, index) => {
//             const isEven = index % 2 === 0;

//             return (
//               <div
//                 key={index}
//                 className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
//               >
//                 {/* Visual Content: Floating Image Frame */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9, x: isEven ? -50 : 50 }}
//                   whileInView={{ opacity: 1, scale: 1, x: 0 }}
//                   viewport={{ once: true, margin: "-50px" }}
//                   transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//                   className="w-full md:w-1/2 relative group"
//                 >
//                   <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl shadow-black/5 bg-white p-2">
//                     <motion.div
//                       className="relative w-full h-full overflow-hidden rounded-xl"
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       <Image
//                         alt={result.title}
//                         src={result.img}
//                         fill
//                         className="object-contain transition-transform duration-700"
//                         unoptimized
//                       />
//                     </motion.div>
//                   </div>

//                   {/* Floating Result Badge (Glassmorphism) */}
//                   <div className={`absolute -top-6 ${isEven ? "-left-6" : "-right-6"} z-20`}>
//                     <div className="bg-white/80 backdrop-blur-md border border-white shadow-xl w-16 h-16 rounded-2xl flex items-center justify-center">
//                       <span className="text-2xl font-light text-purple-600">0{index + 1}</span>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Text Content */}
//                 <div className="w-full md:w-1/2">
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.2, duration: 0.8 }}
//                   >
//                     <div className="flex items-center gap-4 mb-6">
//                       <div className="h-[1px] w-8 bg-purple-600" />
//                       <span className="text-[10px] text-slate-400 font-bold tracking-[0.3em] uppercase">
//                         Milestone
//                       </span>
//                     </div>

//                     <h3 className="text-3xl md:text-4xl font-light text-[#19183A] mb-6 leading-tight tracking-tight">
//                       {result.title} <br />
//                       <span className="text-purple-600 font-medium italic text-2xl md:text-3xl">
//                         {result.highlight}
//                       </span>
//                     </h3>

//                     <p className="text-lg text-slate-500 font-light leading-relaxed max-w-md">
//                       {result.data}
//                     </p>

//                     <motion.div
//                       className="mt-8 flex gap-2"
//                       initial={{ width: 0 }}
//                       whileInView={{ width: "auto" }}
//                     >
//                       {[1, 2, 3].map((dot) => (
//                         <div key={dot} className="h-1 w-1 rounded-full bg-purple-600/30" />
//                       ))}
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";

export default function TheResult({
  ele,
}: {
  ele: TemplateCaseStudy;
}) {
  if (!ele.results || ele.results.length < 1) return null;

  return (
    <section className="overflow-hidden bg-[#fafafa] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:mb-20 md:text-left"
        >
          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-purple-600">
            03 — The Transformation
          </span>

          <h2 className="text-4xl font-light uppercase leading-none tracking-tight text-[#19183A] sm:text-5xl md:text-7xl">
            The{" "}
            <span className="font-serif italic text-slate-400">
              Results
            </span>
          </h2>

          <div className="mt-6 hidden h-1 w-20 bg-purple-600 md:block" />
        </motion.div>

        {/* Results */}
        <div className="space-y-20 md:space-y-32">
          {ele.results.map((result, index) => {
            const isEven = index % 2 === 0;

            // Never pass an empty string to next/image.
            const resultImage =
              typeof result.img === "string" && result.img.trim().length > 0
                ? result.img.trim()
                : null;

            return (
              <div
                key={`${result.title}-${index}`}
                className={`flex flex-col items-center gap-10 md:gap-16 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isEven ? -25 : 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className="group relative w-full min-w-0 md:w-1/2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white p-2 shadow-xl shadow-black/[0.04]">
                    {resultImage ? (
                      <motion.div
                        className="relative h-full w-full overflow-hidden rounded-lg"
                        whileHover={{ scale: 1.025 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <Image
                          src={resultImage}
                          alt={result.title || "Case study result"}
                          fill
                          sizes="(max-width: 767px) 100vw, 50vw"
                          className="object-contain"
                          unoptimized
                        />
                      </motion.div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
                        <p className="text-sm text-gray-400">
                          Result image not available
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Number badge */}
                  <div
                    className={`absolute -top-3 z-10 sm:-top-5 ${
                      isEven ? "-left-2 sm:-left-4" : "-right-2 sm:-right-4"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-lg sm:h-16 sm:w-16">
                      <span className="text-xl font-light text-purple-600 sm:text-2xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Text */}
                <div className="w-full min-w-0 md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="mb-5 flex items-center gap-4">
                      <div className="h-px w-8 bg-purple-600" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                        Milestone
                      </span>
                    </div>

                    <h3 className="mb-5 text-3xl font-light leading-tight tracking-tight text-[#19183A] sm:text-4xl">
                      {result.title}

                      {result.highlight && (
                        <>
                          <br />
                          <span className="mt-1 inline-block font-serif text-2xl italic text-purple-600 sm:text-3xl">
                            {result.highlight}
                          </span>
                        </>
                      )}
                    </h3>

                    {result.data && (
                      <p className="max-w-md text-base font-light leading-7 text-slate-500 sm:text-lg sm:leading-8">
                        {result.data}
                      </p>
                    )}

                    <div className="mt-8 flex items-center gap-2">
                      <span className="h-1 w-8 rounded-full bg-purple-600" />
                      <span className="h-1 w-2 rounded-full bg-purple-600/30" />
                      <span className="h-1 w-2 rounded-full bg-purple-600/30" />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
