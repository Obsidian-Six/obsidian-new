// "use client";
// import  { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { GoArrowUpRight } from "react-icons/go";
// import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
// import Link from "next/link";

// const slides = [
//   {
//     id: "design",
//     title: "Design",
//     tagline: "Design that feels like you!",
//     subtitle: "We believe to create design that tells your story. We capture your brand’s soul and craft captivating messages that encapsulate your brand’s essence.",
//     imgUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop",
//     imgStyles: "-top-12 -right-16 md:-top-20 md:-right-32 w-48 h-48",
//   },
//   {
//     id: "social",
//     title: "Socials",
//     tagline: "Make it real!",
//     subtitle: "We find your voices and grow the tribe. Turn your followers into fans! While we handle the algorithm, you master the relationships.",
//     imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
//     imgStyles: "top-0 -left-20 md:-top-10 md:-left-40 w-56 h-56",
//   },
//   {
//     id: "development",
//     title: "Build",
//     tagline: "It all starts here!",
//     subtitle: "We build a digital backbone that never breaks! From custom web applications to scalable e-commerce platforms, we take care of ‘how’ so your customers can enjoy the ‘Wow.’",
//     imgUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=400&auto=format&fit=crop",
//     imgStyles: "-top-20 -right-10 md:-top-32 md:-right-24 w-64 h-64",
//   }
// ];

// export default function Hero() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section
//       id="home"
//       className="relative pt-15 w-full h-screen overflow-hidden flex flex-col justify-center items-center px-6 bg-white text-black"
//     >
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />

//       <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center h-[60vh]">

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             exit={{ opacity: 0, y: -40, filter: "blur(15px)" }}
//             transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//             className="relative flex flex-col items-center"
//           >
//             <motion.div
//               animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//               className={`absolute z-0 pointer-events-none opacity-90 ${slides[currentSlide]?.imgStyles}`}
//             >
//               <img
//                 src={slides[currentSlide]?.imgUrl}
//                 alt="3D element"
//                 className="w-full h-full object-cover rounded-full shadow-2xl grayscale-[20%]"
//               />
//             </motion.div>

//             <h1 className="relative z-10 text-7xl md:text-[160px] font-normal text-slate-900 leading-none tracking-tighter mb-4">
//               {slides[currentSlide]?.title}
//             </h1>

//             <div className="space-y-4 max-w-2xl mx-auto">
//                 {/* Premium Italic look for tagline */}
//                 <h2 className="text-xl md:text-3xl font-light italic text-[#052D69] tracking-tight">
//                     {slides[currentSlide]?.tagline}
//                 </h2>
//                 <p className="text-sm md:text-xl text-slate-700 leading-relaxed tracking-wide font-light">
//                     {slides[currentSlide]?.subtitle}
//                 </p>
//             </div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//               className="mt-10"
//             >
//               <Link
//                 href="/#contactUs"
//                 className="group inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-slate-900 text-white rounded-full text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-[#052D69] transition-all duration-300 shadow-lg shadow-[#052D69]/10 os-btn-slide"
//               >
//                 Start Journey <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
//               </Link>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>

//         <div className="absolute bottom-[-100px] flex gap-4">
//           {slides.map((_, index) => (
//             <div
//               role="button"
//               suppressHydrationWarning
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`h-1 rounded-full transition-all duration-700 cursor-pointer ${
//                 currentSlide === index ? "bg-black w-12" : "bg-slate-200 w-4 hover:bg-slate-400"
//               }`}
//               aria-label={`Slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Sidebars with Italic labels */}
//       <div className="absolute left-10 bottom-12 hidden lg:flex flex-col items-center gap-4 text-black">
//         <span className="uppercase text-[11px] font-bold tracking-[0.3em] rotate-180 [writing-mode:vertical-lr] opacity-40 italic">
//           Scroll to explore
//         </span>
//         <div className="w-[1px] h-24 bg-black/10" />
//       </div>

//       <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 text-black">
//          <span className="uppercase text-[11px] font-bold tracking-[0.3em] [writing-mode:vertical-lr] mb-4 opacity-40 italic">
//             Connect
//          </span>
//          <div className="w-[1px] h-12 bg-black/10 mb-4" />
//          <a href="https://instagram.com/obsidiansixofficial" className="hover:text-[#052D69] opacity-40 hover:opacity-100 transition-all duration-300"><FaInstagram size={22} /></a>
//          <a href="https://linkedin.com/company/obsidian-six" className="hover:text-[#052D69] opacity-40 hover:opacity-100 transition-all duration-300"><FaLinkedin size={22} /></a>
//          <a href="https://wa.me/918085652729" className="hover:text-[#052D69] opacity-40 hover:opacity-100 transition-all duration-300"><FaWhatsapp size={22} /></a>
//       </div>
//     </section>
//   );
// }

// "use client";

// import Image from "next/image";
// import type React from "react";

// function RevealText({
//   children,
//   className = "",
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
// }): React.JSX.Element {
//   return (
//     <span className="hero-text-mask">
//       <span
//         className={`hero-text ${className}`}
//         style={{ animationDelay: `${delay}ms` }}
//       >
//         {children}
//       </span>
//     </span>
//   );
// }

// export default function Hero(): React.JSX.Element {
//   return (
//     <div className="hero-stack">
//       <section className="intro">
//         <h1
//           className="hero-art"
//           aria-label="We turn great ideas into brands people remember"
//         >
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={0}
//           >
//             We
//           </RevealText>

//           <span className="hero-avatars" aria-hidden="true">
//             <span className="hero-avatar">
//               <Image
//                 className="is-cover"
//                 src="https://www.upsunday.co/hero-book.webp"
//                 alt=""
//                 fill
//                 sizes="(max-width: 768px) 28vw, 220px"
//               />
//             </span>

//             <span className="hero-avatar">
//               <Image
//                 className="is-cover"
//                 src="https://www.upsunday.co/hero-watch.webp"
//                 alt=""
//                 fill
//                 sizes="(max-width: 768px) 28vw, 220px"
//               />
//             </span>

//             <span className="hero-avatar">
//               <Image
//                 className="is-cover is-zoom"
//                 src="https://www.upsunday.co/hero-card.webp"
//                 alt=""
//                 fill
//                 sizes="(max-width: 768px) 28vw, 220px"
//               />
//             </span>
//           </span>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={80}
//           >
//             turn
//           </RevealText>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={140}
//           >
//             great
//           </RevealText>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={200}
//           >
//             ideas
//           </RevealText>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={260}
//           >
//             into
//           </RevealText>

//           {/* Arrow */}
//           <svg
//             className="hero-arrow"
//             viewBox="0 0 258.001 92.0106"
//             preserveAspectRatio="none"
//             fill="none"
//             aria-hidden="true"
//           >
//             <path
//               className="hero-arrow__stroke"
//               d="M4.00069 82.8423C19.0382 56.3869 64.0773 3.57925 115.131 4.00253C134.167 4.16036 142.382 12.6036 146.49 24.1087C150.842 36.2972 148.819 54.3525 144.29 66.9665C138.761 82.3641 129.373 90.9504 121.733 87.0727C110.8 81.5232 109.333 62.3606 122.834 45.8022C133.79 32.3644 150.839 15.4298 185.551 19.8758C202.056 21.9897 207.522 24.9853 224.062 34.6884C232.779 39.8023 243.706 49.4253 253.77 56.9135"
//               stroke="#E5804B"
//               strokeWidth={8}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />

//             <path
//               className="hero-arrow__head"
//               d="M253.77 56.9135C252.853 59.559 238.916 60.6172 208.107 60.6172M253.77 56.9135C255.054 53.9152 251.679 37.1223 225.712 12.9949"
//               stroke="#E5804B"
//               strokeWidth={8}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={320}
//           >
//             brands
//           </RevealText>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={380}
//           >
//             people
//           </RevealText>

//           <span className="hero-reel">
//             {/* i want this video goes to reel-full > reffl-full__card container using morpho using gsap in fly way */}
//             <video
//               loop
//               playsInline
//               autoPlay
//               muted
//               src="/newContent/downloadmedia-20260912 (1).mp4"
//             />
//           </span>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={440}
//           >
//             remember
//           </RevealText>
//         </h1>
//       </section>

//       <section className="reel-full p-2">
//         <div className="reel-full__card border-rounded-3xl">
//           <video
//             loop
//             playsInline
//             autoPlay
//             muted
//             src="/newContent/downloadmedia-20260912 (1).mp4"
//           />
//         </div>
//       </section>
//     </div>
//   );
// }


// "use client";

// import Image from "next/image";
// import type React from "react";
// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./css/hero.css"
// gsap.registerPlugin(ScrollTrigger);

// const VIDEO_SRC = "/newContent/downloadmedia-20260912 (1).mp4";

// function RevealText({
//   children,
//   className = "",
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
// }): React.JSX.Element {
//   return (
//     <span className="hero-text-mask">
//       <span
//         className={`hero-text ${className}`}
//         style={{ animationDelay: `${delay}ms` }}
//       >
//         {children}
//       </span>
//     </span>
//   );
// }

// export default function Hero(): React.JSX.Element {
//   const heroVideoRef = useRef<HTMLVideoElement | null>(null);
//   const reelCardRef = useRef<HTMLDivElement | null>(null);


// useLayoutEffect(() => {
//   const video = heroVideoRef.current;
//   const card = reelCardRef.current;

//   if (!video || !card) return;

//   const ctx = gsap.context(() => {
//     /*
//      * Keep the transform origin in the center.
//      */
//     gsap.set(video, {
//       transformOrigin: "50% 50%",
//       willChange: "transform",
//     });

//     /*
//      * Calculate the current position and size.
//      *
//      * IMPORTANT:
//      * This function runs again whenever ScrollTrigger
//      * refreshes, so resize always gets the latest values.
//      */
//     const getVideoTransform = () => {
//       const videoRect = video.getBoundingClientRect();
//       const cardRect = card.getBoundingClientRect();

//       const videoCenterX =
//         videoRect.left + videoRect.width / 2;

//       const videoCenterY =
//         videoRect.top + videoRect.height / 2;

//       const cardCenterX =
//         cardRect.left + cardRect.width / 2;

//       const cardCenterY =
//         cardRect.top + cardRect.height / 2;

//       return {
//         x: cardCenterX - videoCenterX,
//         y: cardCenterY - videoCenterY,

//         scaleX:
//           videoRect.width > 0
//             ? cardRect.width / videoRect.width
//             : 1,

//         scaleY:
//           videoRect.height > 0
//             ? cardRect.height / videoRect.height
//             : 1,
//       };
//     };

//     /*
//      * One timeline only.
//      *
//      * Do NOT create a new timeline inside resize.
//      */
//     const timeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".reel-full",

//         start: "top 80%",
//         end: "top top",

//         scrub: true,

//         pin: false,

//         invalidateOnRefresh: true,

//         /*
//          * Recalculate everything when ScrollTrigger refreshes.
//          */
//         onRefresh: () => {
//           const values = getVideoTransform();

//           gsap.set(video, {
//             x: values.x,
//             y: values.y,
//             scaleX: values.scaleX,
//             scaleY: values.scaleY,
//           });
//         },
//       },
//     });

//     /*
//      * Use function-based values.
//      *
//      * These are recalculated when ScrollTrigger
//      * invalidates the animation.
//      */
//     timeline.to(video, {
//       x: () => getVideoTransform().x,
//       y: () => getVideoTransform().y,

//       scaleX: () => getVideoTransform().scaleX,
//       scaleY: () => getVideoTransform().scaleY,

//       borderRadius: "0.2cqw",

//       ease: "none",

//       duration: 1,

//       /*
//        * Forces GSAP to recalculate function values
//        * after resize/refresh.
//        */
//       invalidateOnRefresh: true,
//     });

//     /*
//      * Initial refresh after the browser has calculated
//      * the actual layout.
//      */
//     requestAnimationFrame(() => {
//       ScrollTrigger.refresh();
//     });

//     /*
//      * ResizeObserver is better than only window.resize.
//      *
//      * It also catches changes caused by:
//      * - responsive CSS
//      * - scrollbar changes
//      * - font loading
//      * - container size changes
//      * - mobile browser viewport changes
//      */
//     const resizeObserver = new ResizeObserver(() => {
//       requestAnimationFrame(() => {
//         ScrollTrigger.refresh();
//       });
//     });

//     resizeObserver.observe(card);

//     /*
//      * Also watch the video itself.
//      */
//     resizeObserver.observe(video);

//     /*
//      * Window resize fallback.
//      */
//     const handleResize = () => {
//       requestAnimationFrame(() => {
//         ScrollTrigger.refresh();
//       });
//     };

//     window.addEventListener("resize", handleResize);

//     /*
//      * Cleanup.
//      */
//     return () => {
//       resizeObserver.disconnect();
//       window.removeEventListener("resize", handleResize);
//     };
//   });

//   return () => ctx.revert();
// }, []);

//   return (
//     <div id="home" className="hero-stack">
//       <section className="intro">
//         <h1
//           className="hero-art"
//           aria-label="We turn great ideas into brands people remember"
//         >
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={0}
//           >
//             We
//           </RevealText>

//           <span className="hero-avatars" aria-hidden="true">
//             <span className="hero-avatar">
//               <Image
//                 className="is-cover"
//                 src="https://www.upsunday.co/hero-book.webp"
//                 alt=""
//                 fill
//                 sizes="(max-width: 768px) 28vw, 220px"
//               />
//             </span>

//             <span className="hero-avatar">
//               <Image
//                 className="is-cover"
//                 src="https://www.upsunday.co/hero-watch.webp"
//                 alt=""
//                 fill
//                 sizes="(max-width: 768px) 28vw, 220px"
//               />
//             </span>

//             <span className="hero-avatar">
//               <Image
//                 className="is-cover is-zoom"
//                 src="https://www.upsunday.co/hero-card.webp"
//                 alt=""
//                 fill
//                 sizes="(max-width: 768px) 28vw, 220px"
//               />
//             </span>
//           </span>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={80}
//           >
//             turn
//           </RevealText>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={140}
//           >
//             great
//           </RevealText>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={200}
//           >
//             ideas
//           </RevealText>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={260}
//           >
//             into
//           </RevealText>

//           {/* Arrow */}
//           <svg
//             className="hero-arrow"
//             viewBox="0 0 258.001 92.0106"
//             preserveAspectRatio="none"
//             fill="none"
//             aria-hidden="true"
//           >
//             <path
//               className="hero-arrow__stroke"
//               d="M4.00069 82.8423C19.0382 56.3869 64.0773 3.57925 115.131 4.00253C134.167 4.16036 142.382 12.6036 146.49 24.1087C150.842 36.2972 148.819 54.3525 144.29 66.9665C138.761 82.3641 129.373 90.9504 121.733 87.0727C110.8 81.5232 109.333 62.3606 122.834 45.8022C133.79 32.3644 150.839 15.4298 185.551 19.8758C202.056 21.9897 207.522 24.9853 224.062 34.6884C232.779 39.8023 243.706 49.4253 253.77 56.9135"
//               stroke="#E5804B"
//               strokeWidth={8}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />

//             <path
//               className="hero-arrow__head"
//               d="M253.77 56.9135C252.853 59.559 238.916 60.6172 208.107 60.6172M253.77 56.9135C255.054 53.9152 251.679 37.1223 225.712 12.9949"
//               stroke="#E5804B"
//               strokeWidth={8}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={320}
//           >
//             brands
//           </RevealText>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={380}
//           >
//             people
//           </RevealText>

//           {/* Small hero video */}
//           <span className="hero-reel">
//             <video
//               ref={heroVideoRef}
//               loop
//               playsInline
//               autoPlay
//               muted
//               src={VIDEO_SRC}
//             />
//           </span>

//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={440}
//           >
//             remember
//           </RevealText>
//         </h1>
//       </section>

//       {/* Destination */}
//       <section className="reel-full p-2">
//         <div
//           ref={reelCardRef}
//           className="reel-full__card"
//         >
//           {/* Destination placeholder */}
//         </div>
//       </section>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import type React from "react";
// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./css/hero.css";

// gsap.registerPlugin(ScrollTrigger);

// const VIDEO_SRC = "/newContent/downloadmedia-20260912 (1).mp4";

// function RevealText({
//   children,
//   className = "",
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
// }): React.JSX.Element {
//   return (
//     <span className="hero-text-mask">
//       <span
//         className={`hero-text ${className}`}
//         style={{ animationDelay: `${delay}ms` }}
//       >
//         {children}
//       </span>
//     </span>
//   );
// }

// export default function Hero(): React.JSX.Element {
//   const heroVideoRef = useRef<HTMLVideoElement | null>(null);
//   const reelCardRef = useRef<HTMLDivElement | null>(null);

//   useLayoutEffect(() => {
//     const video = heroVideoRef.current;
//     const card = reelCardRef.current;

//     if (!video || !card) return;

//     const ctx = gsap.context(() => {
//       /*
//        * -----------------------------------------
//        * INITIAL VIDEO POSITION
//        * -----------------------------------------
//        *
//        * Very important:
//        * Do NOT move the video to the destination
//        * when the page initially loads.
//        */
//       gsap.set(video, {
//         x: 0,
//         y: 0,
//         scaleX: 1,
//         scaleY: 1,
//         transformOrigin: "50% 50%",
//         willChange: "transform",
//       });

//       /*
//        * -----------------------------------------
//        * GET DESTINATION TRANSFORM
//        * -----------------------------------------
//        *
//        * Calculates how much the video needs to move
//        * so its center matches the destination card.
//        */
//       const getVideoTransform = () => {
//         const videoRect = video.getBoundingClientRect();
//         const cardRect = card.getBoundingClientRect();

//         const videoCenterX = videoRect.left + videoRect.width / 2;
//         const videoCenterY = videoRect.top + videoRect.height / 2;

//         const cardCenterX = cardRect.left + cardRect.width / 2;
//         const cardCenterY = cardRect.top + cardRect.height / 2;

//         return {
//           x: cardCenterX - videoCenterX,
//           y: cardCenterY - videoCenterY,

//           scaleX:
//             videoRect.width > 0
//               ? cardRect.width / videoRect.width
//               : 1,

//           scaleY:
//             videoRect.height > 0
//               ? cardRect.height / videoRect.height
//               : 1,
//         };
//       };

//       /*
//        * -----------------------------------------
//        * GSAP TIMELINE
//        * -----------------------------------------
//        *
//        * The video starts from its natural hero position
//        * and moves toward the destination card only
//        * while scrolling.
//        */
//       const timeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: card,

//           start: "top 80%",
//           end: "top top",

//           scrub: true,
//           pin: false,

//           invalidateOnRefresh: true,

//           /*
//            * IMPORTANT:
//            * Don't use gsap.set() here.
//            *
//            * Doing that would immediately move the video
//            * to the destination when ScrollTrigger refreshes.
//            */
//           onRefreshInit: () => {
//             gsap.set(video, {
//               transformOrigin: "50% 50%",
//             });
//           },
//         },
//       });

//       timeline.to(video, {
//         x: () => getVideoTransform().x,
//         y: () => getVideoTransform().y,

//         scaleX: () => getVideoTransform().scaleX,
//         scaleY: () => getVideoTransform().scaleY,

//         borderRadius: "0.2cqw",

//         ease: "none",

//         duration: 1,

//         /*
//          * Recalculate function-based values
//          * after resize/refresh.
//          */
//         invalidateOnRefresh: true,
//       });

//       /*
//        * -----------------------------------------
//        * INITIAL REFRESH
//        * -----------------------------------------
//        */
//       const refresh = () => {
//         requestAnimationFrame(() => {
//           ScrollTrigger.refresh();
//         });
//       };

//       refresh();

//       /*
//        * -----------------------------------------
//        * RESIZE OBSERVER
//        * -----------------------------------------
//        *
//        * ResizeObserver can fire many times on mobile.
//        * requestAnimationFrame prevents excessive refreshes.
//        */
//       let resizeFrame = 0;

//       const resizeObserver = new ResizeObserver(() => {
//         cancelAnimationFrame(resizeFrame);

//         resizeFrame = requestAnimationFrame(() => {
//           ScrollTrigger.refresh();
//         });
//       });

//       resizeObserver.observe(card);

//       /*
//        * Watch the video dimensions too.
//        */
//       resizeObserver.observe(video);

//       /*
//        * -----------------------------------------
//        * WINDOW RESIZE
//        * -----------------------------------------
//        */
//       const handleResize = () => {
//         cancelAnimationFrame(resizeFrame);

//         resizeFrame = requestAnimationFrame(() => {
//           ScrollTrigger.refresh();
//         });
//       };

//       window.addEventListener("resize", handleResize);

//       /*
//        * -----------------------------------------
//        * CLEANUP
//        * -----------------------------------------
//        */
//       return () => {
//         cancelAnimationFrame(resizeFrame);

//         resizeObserver.disconnect();

//         window.removeEventListener("resize", handleResize);
//       };
//     });

//     return () => {
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <div id="home" className="hero-stack">
//       {/* =====================================================
//           HERO / INTRO
//       ====================================================== */}
//       <section className="intro">
//         <h1
//           className="hero-art"
//           aria-label="We turn great ideas into brands people remember"
//         >
//           {/* WE */}
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={0}
//           >
//             We
//           </RevealText>

//           {/* HERO AVATARS */}
//           <span className="hero-avatars" aria-hidden="true">
//             <span className="hero-avatar">
//               <Image
//                 className="is-cover"
//                 // src="https://www.upsunday.co/hero-book.webp"
//                 src="/newContent/downloadmedia-20260912.jpg"
//                 alt=""
//                 fill
//                 sizes="(max-width: 768px) 28vw, 220px"
//               />
//             </span>

//             <span className="hero-avatar">
//               <Image
//                 className="is-cover"
//                 src="https://www.upsunday.co/hero-watch.webp"
//                 alt=""
//                 fill
//                 sizes="(max-width: 768px) 28vw, 220px"
//               />
//             </span>

//             <span className="hero-avatar">
//               <Image
//                 className="is-cover is-zoom"
//                 src="https://www.upsunday.co/hero-card.webp"
//                 alt=""
//                 fill
//                 sizes="(max-width: 768px) 28vw, 220px"
//               />
//             </span>
//           </span>

//           {/* TURN */}
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={80}
//           >
//             turn
//           </RevealText>

//           {/* GREAT */}
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={140}
//           >
//             great
//           </RevealText>

//           {/* IDEAS */}
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={200}
//           >
//             ideas
//           </RevealText>

//           {/* INTO */}
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={260}
//           >
//             into
//           </RevealText>

//           {/* =====================================================
//               ARROW
//           ====================================================== */}
//           <svg
//             className="hero-arrow"
//             viewBox="0 0 258.001 92.0106"
//             preserveAspectRatio="none"
//             fill="none"
//             aria-hidden="true"
//           >
//             <path
//               className="hero-arrow__stroke"
//               d="M4.00069 82.8423C19.0382 56.3869 64.0773 3.57925 115.131 4.00253C134.167 4.16036 142.382 12.6036 146.49 24.1087C150.842 36.2972 148.819 54.3525 144.29 66.9665C138.761 82.3641 129.373 90.9504 121.733 87.0727C110.8 81.5232 109.333 62.3606 122.834 45.8022C133.79 32.3644 150.839 15.4298 185.551 19.8758C202.056 21.9897 207.522 24.9853 224.062 34.6884C232.779 39.8023 243.706 49.4253 253.77 56.9135"
//               stroke="#E5804B"
//               strokeWidth={8}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />

//             <path
//               className="hero-arrow__head"
//               d="M253.77 56.9135C252.853 59.559 238.916 60.6172 208.107 60.6172M253.77 56.9135C255.054 53.9152 251.679 37.1223 225.712 12.9949"
//               stroke="#E5804B"
//               strokeWidth={8}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>

//           {/* BRANDS */}
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={320}
//           >
//             brands
//           </RevealText>

//           {/* PEOPLE */}
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={380}
//           >
//             people
//           </RevealText>

//           {/* =====================================================
//               SMALL HERO VIDEO
//           ====================================================== */}
//           <span className="hero-reel">
//             <video
//               ref={heroVideoRef}
//               loop
//               playsInline
//               autoPlay
//               muted
//               preload="auto"
//               src={VIDEO_SRC}
//             />
//           </span>

//           {/* REMEMBER */}
//           <RevealText
//             className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
//             delay={440}
//           >
//             remember
//           </RevealText>
//         </h1>
//       </section>

//       {/* =====================================================
//           DESTINATION
//       ====================================================== */}
//       <section className="reel-full p-2">
//         <div
//           ref={reelCardRef}
//           className="reel-full__card"
//         >
//           {/* Destination card */}
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./css/hero.css";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "/newContent/downloadmedia-20260912 (1).mp4";

function RevealText({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}): React.JSX.Element {
  return (
    <span className="hero-text-mask">
      <span
        className={`hero-text ${className}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </span>
  );
}

export default function Hero(): React.JSX.Element {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const reelCardRef = useRef<HTMLDivElement | null>(null);

  /*
   * =========================================================
   * iOS / SAFARI VIDEO AUTOPLAY
   * =========================================================
   */
 useEffect(() => {
  const video = heroVideoRef.current;

  if (!video) return;

  video.muted = true;
  video.playsInline = true;

  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  const tryPlay = () => {
    video.muted = true;

    const promise = video.play();

    if (promise !== undefined) {
      promise.catch(() => {
        // Safari may reject autoplay until the video is ready.
      });
    }
  };

  video.addEventListener("loadedmetadata", tryPlay);
  video.addEventListener("canplay", tryPlay);
  video.addEventListener("loadeddata", tryPlay);

  tryPlay();

  return () => {
    video.removeEventListener("loadedmetadata", tryPlay);
    video.removeEventListener("canplay", tryPlay);
    video.removeEventListener("loadeddata", tryPlay);
  };
}, []);

  /*
   * =========================================================
   * GSAP / SCROLLTRIGGER
   * =========================================================
   */
  useLayoutEffect(() => {
    const video = heroVideoRef.current;
    const card = reelCardRef.current;

    if (!video || !card) return;

    const ctx = gsap.context(() => {
      /*
       * -----------------------------------------
       * INITIAL VIDEO POSITION
       * -----------------------------------------
       */
      gsap.set(video, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        transformOrigin: "50% 50%",
        willChange: "transform",
      });

      /*
       * -----------------------------------------
       * GET DESTINATION TRANSFORM
       * -----------------------------------------
       */
      const getVideoTransform = () => {
        const videoRect = video.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const videoCenterX =
          videoRect.left + videoRect.width / 2;

        const videoCenterY =
          videoRect.top + videoRect.height / 2;

        const cardCenterX =
          cardRect.left + cardRect.width / 2;

        const cardCenterY =
          cardRect.top + cardRect.height / 2;

        return {
          x: cardCenterX - videoCenterX,
          y: cardCenterY - videoCenterY,

          scaleX:
            videoRect.width > 0
              ? cardRect.width / videoRect.width
              : 1,

          scaleY:
            videoRect.height > 0
              ? cardRect.height / videoRect.height
              : 1,
        };
      };

      /*
       * -----------------------------------------
       * GSAP TIMELINE
       * -----------------------------------------
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,

          start: "top 80%",
          end: "top top",

          scrub: true,
          pin: false,

          invalidateOnRefresh: true,

          onRefreshInit: () => {
            gsap.set(video, {
              transformOrigin: "50% 50%",
            });
          },
        },
      });

      timeline.to(video, {
        x: () => getVideoTransform().x,
        y: () => getVideoTransform().y,

        scaleX: () => getVideoTransform().scaleX,
        scaleY: () => getVideoTransform().scaleY,

        borderRadius: "0.2cqw",

        ease: "none",
        duration: 1,

        invalidateOnRefresh: true,
      });

      /*
       * -----------------------------------------
       * INITIAL REFRESH
       * -----------------------------------------
       */
      const refresh = () => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      };

      refresh();

      /*
       * -----------------------------------------
       * RESIZE OBSERVER
       * -----------------------------------------
       */
      let resizeFrame = 0;

      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(resizeFrame);

        resizeFrame = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });

      resizeObserver.observe(card);
      resizeObserver.observe(video);

      /*
       * -----------------------------------------
       * WINDOW RESIZE
       * -----------------------------------------
       */
      const handleResize = () => {
        cancelAnimationFrame(resizeFrame);

        resizeFrame = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      };

      window.addEventListener("resize", handleResize);

      /*
       * -----------------------------------------
       * CLEANUP
       * -----------------------------------------
       */
      return () => {
        cancelAnimationFrame(resizeFrame);

        resizeObserver.disconnect();

        window.removeEventListener(
          "resize",
          handleResize
        );
      };
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div id="home" className="hero-stack">

      {/* =====================================================
          HERO / INTRO
      ====================================================== */}

      <section className="intro">
        <h1
          className="hero-art"
          aria-label="We turn great ideas into brands people remember"
        >
          {/* WE */}

          <RevealText
            className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
            delay={0}
          >
            We
          </RevealText>

          {/* HERO AVATARS */}

          <span className="hero-avatars" aria-hidden="true">
            <span className="hero-avatar">
              <Image
                className="cover"
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop"
                alt=""
                fill
                sizes="(max-width: 768px) 28vw, 220px"
              />
            </span>

            <span className="hero-avatar">
              <Image
                className="cover"
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop"
                alt=""
                fill
                sizes="(max-width: 768px) 28vw, 220px"
              />
            </span>

            <span className="hero-avatar">
              <Image
                className="cover is-zoom"
                src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=400&auto=format&fit=crop"
                alt=""
                fill
                sizes="(max-width: 768px) 28vw, 220px"
              />
            </span>
          </span>

          {/* TURN */}

          <RevealText
            className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
            delay={80}
          >
            turn
          </RevealText>

          {/* GREAT */}

          <RevealText
            className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
            delay={140}
          >
            great
          </RevealText>

          {/* IDEAS */}

          <RevealText
            className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
            delay={200}
          >
            ideas
          </RevealText>

          {/* INTO */}

          <RevealText
            className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
            delay={260}
          >
            into
          </RevealText>

          {/* =====================================================
              ARROW
          ====================================================== */}

          <svg
            className="hero-arrow"
            viewBox="0 0 258.001 92.0106"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="hero-arrow__stroke"
              d="M4.00069 82.8423C19.0382 56.3869 64.0773 3.57925 115.131 4.00253C134.167 4.16036 142.382 12.6036 146.49 24.1087C150.842 36.2972 148.819 54.3525 144.29 66.9665C138.761 82.3641 129.373 90.9504 121.733 87.0727C110.8 81.5232 109.333 62.3606 122.834 45.8022C133.79 32.3644 150.839 15.4298 185.551 19.8758C202.056 21.9897 207.522 24.9853 224.062 34.6884C232.779 39.8023 243.706 49.4253 253.77 56.9135"
              stroke="#E5804B"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              className="hero-arrow__head"
              d="M253.77 56.9135C252.853 59.559 238.916 60.6172 208.107 60.6172M253.77 56.9135C255.054 53.9152 251.679 37.1223 225.712 12.9949"
              stroke="#E5804B"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* BRANDS */}

          <RevealText
            className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
            delay={320}
          >
            brands
          </RevealText>

          {/* PEOPLE */}

          <RevealText
            className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
            delay={380}
          >
            people
          </RevealText>

          {/* =====================================================
              SMALL HERO VIDEO
          ====================================================== */}

          <span className="hero-reel">
            <video
              ref={heroVideoRef}
              src={VIDEO_SRC}
              autoPlay
              muted
              playsInline
              preload="auto"
              loop
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate"
              aria-hidden="true"
            />
          </span>

          {/* REMEMBER */}

          <RevealText
            className="font-sf text-6xl md:text-7xl lg:text-8xl mx-5 font-extrabold"
            delay={440}
          >
            remember
          </RevealText>
        </h1>
      </section>

      {/* =====================================================
          DESTINATION
      ====================================================== */}

      <section className="reel-full p-2">
        <div
          ref={reelCardRef}
          className="reel-full__card"
        />
      </section>
    </div>
  );
}
