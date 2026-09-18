// "use client";

// import Image from "next/image";
// import {
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from "react";
// import { BsArrowLeft, BsArrowRight, BsQuote } from "react-icons/bs";
// import gsap from "gsap";

// import reviews from "@/lib/store/reviews";

// const Slider: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const imageRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   const touchStartX = useRef(0);
//   const touchStartY = useRef(0);

//   if (!reviews.length) {
//     return null;
//   }

//   const totalReviews = reviews.length;

//   const getIndex = useCallback(
//     (index: number) => {
//       return (index + totalReviews) % totalReviews;
//     },
//     [totalReviews],
//   );

//   const previousIndex = getIndex(currentIndex - 1);
//   const nextIndex = getIndex(currentIndex + 1);

//   const currentReview = reviews[currentIndex];
//   const previousReview = reviews[previousIndex];
//   const nextReview = reviews[nextIndex];

//   /* -----------------------------------------
//      Initial animation
//   ----------------------------------------- */

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.set([imageRef.current, contentRef.current], {
//         opacity: 1,
//         x: 0,
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   /* -----------------------------------------
//      Slide animation
//   ----------------------------------------- */

//   const changeSlide = useCallback(
//     (newIndex: number, direction: 1 | -1) => {
//       if (isAnimating || newIndex === currentIndex) {
//         return;
//       }

//       setIsAnimating(true);

//       const image = imageRef.current;
//       const content = contentRef.current;

//       const elements = [image, content].filter(Boolean);

//       gsap.to(elements, {
//         opacity: 0,
//         x: direction * -35,
//         duration: 0.25,
//         ease: "power2.inOut",
//         overwrite: true,

//         onComplete: () => {
//           setCurrentIndex(newIndex);

//           gsap.set(elements, {
//             opacity: 0,
//             x: direction * 35,
//           });

//           gsap.to(elements, {
//             opacity: 1,
//             x: 0,
//             duration: 0.55,
//             ease: "power3.out",
//             overwrite: true,

//             onComplete: () => {
//               setIsAnimating(false);
//             },
//           });
//         },
//       });
//     },
//     [currentIndex, isAnimating],
//   );

//   const nextSlide = useCallback(() => {
//     changeSlide(getIndex(currentIndex + 1), 1);
//   }, [changeSlide, currentIndex, getIndex]);

//   const prevSlide = useCallback(() => {
//     changeSlide(getIndex(currentIndex - 1), -1);
//   }, [changeSlide, currentIndex, getIndex]);

//   const goToSlide = (index: number) => {
//     if (index === currentIndex || isAnimating) {
//       return;
//     }

//     const direction = index > currentIndex ? 1 : -1;

//     changeSlide(index, direction);
//   };

//   /* -----------------------------------------
//      Keyboard navigation
//   ----------------------------------------- */

//   useEffect(() => {
//     const handleKeyboard = (event: KeyboardEvent) => {
//       if (event.key === "ArrowRight") {
//         nextSlide();
//       }

//       if (event.key === "ArrowLeft") {
//         prevSlide();
//       }
//     };

//     window.addEventListener("keydown", handleKeyboard);

//     return () => {
//       window.removeEventListener("keydown", handleKeyboard);
//     };
//   }, [nextSlide, prevSlide]);

//   /* -----------------------------------------
//      Touch / Swipe
//   ----------------------------------------- */

//   const handleTouchStart = (event: React.TouchEvent) => {
//     touchStartX.current = event.touches[0]?.clientX ?? 0;

//     touchStartY.current = event.touches[0]?.clientY ?? 0;
//   };

//   const handleTouchEnd = (event: React.TouchEvent) => {
//     const endX = event.changedTouches[0]?.clientX ?? 0;

//     const endY = event.changedTouches[0]?.clientY ?? 0;

//     const diffX = touchStartX.current - endX;

//     const diffY = touchStartY.current - endY;

//     // Allow normal vertical page scrolling
//     if (Math.abs(diffY) > Math.abs(diffX)) {
//       return;
//     }

//     if (Math.abs(diffX) < 50) {
//       return;
//     }

//     if (diffX > 0) {
//       nextSlide();
//     } else {
//       prevSlide();
//     }
//   };

//   return (
//     <section
//       className="
//         w-full
//       "
//     >
//       <div
//         className="
//           mx-auto
//           w-full
//           max-w-[1500px]
//           px-0
//           sm:px-4
//           md:px-6
//           lg:px-8
//           xl:px-10
//         "
//       >
//         {/* =====================================
//             FIXED HEIGHT SLIDER
//         ===================================== */}

//         <div
//           className="
//             relative
//             mx-auto
//             h-[620px]
//             w-full
//             max-w-[1250px]

//             sm:h-[680px]

//             md:h-[500px]

//             lg:h-[95vh]
//             lg:max-h-none
//           "
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {/* ===================================
//               PREVIOUS IMAGE
//           =================================== */}

//           <button
//             type="button"
//             onClick={prevSlide}
//             disabled={isAnimating}
//             aria-label="Previous review"
//             className="
//               group
//               absolute
//               left-0
//               top-1/2
//               z-30
//               hidden
//               h-[150px]
//               w-[90px]
//               -translate-x-[65%]
//               -translate-y-1/2
//               overflow-hidden
//               bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
//               shadow-xl
//               opacity-60
//               transition-all
//               duration-500
//               hover:w-[105px]
//               hover:opacity-100
//               disabled:pointer-events-none
//               xl:block
//             "
//           >
//             <Image
//               src={previousReview.image}
//               alt={previousReview.name}
//               fill
//               sizes="105px"
//               className="
//                 object-contain
//                 p-2
//                 transition-transform
//                 duration-700
//                 group-hover:scale-105
//               "
//             />

//             <div
//               className="
//                 absolute
//                 inset-0
//                 bg-black/15
//                 transition
//                 group-hover:bg-black/0
//               "
//             />
//           </button>

//           {/* ===================================
//               NEXT IMAGE
//           =================================== */}

//           <button
//             type="button"
//             onClick={nextSlide}
//             disabled={isAnimating}
//             aria-label="Next review"
//             className="
//               group
//               absolute
//               right-0
//               top-1/2
//               z-30
//               hidden
//               h-[150px]
//               w-[90px]
//               translate-x-[65%]
//               -translate-y-1/2
//               overflow-hidden
//               bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
//               shadow-xl
//               opacity-60
//               transition-all
//               duration-500
//               hover:w-[105px]
//               hover:opacity-100
//               disabled:pointer-events-none
//               xl:block
//             "
//           >
//             <Image
//               src={nextReview.image}
//               alt={nextReview.name}
//               fill
//               sizes="105px"
//               className="
//                 object-contain
//                 p-2
//                 transition-transform
//                 duration-700
//                 group-hover:scale-105
//               "
//             />

//             <div
//               className="
//                 absolute
//                 inset-0
//                 bg-black/15
//                 transition
//                 group-hover:bg-black/0
//               "
//             />
//           </button>

//           {/* ===================================
//               MAIN CARD
//               NO RADIUS
//               NO PADDING
//           =================================== */}

//           <div
//             className="
//               grid
//               h-full
//               w-full
//               overflow-hidden
//               bg-white
//               shadow-[0_20px_70px_rgba(25,24,58,0.08)]

//               md:grid-cols-[0.9fr_1.1fr]
//             "
//           >
//             {/* =================================
//                 IMAGE
//             ================================= */}

//             <div
//               className="
//                 relative
//                 h-[300px]
//                 min-h-0
//                 overflow-hidden
     

//                 sm:h-[340px]

//                 md:h-full
//               "
//             >
//               {/* IMAGE WRAPPER */}

//               <div
//                 ref={imageRef}
//                 className="
//                   absolute
//                   inset-0
//                   flex
//                   items-center
//                   justify-center
//                   p-5

//                   sm:p-7

//                   md:p-10

//                   lg:p-14

//                   xl:p-16
//                 "
//               >
//                 <Image
//                   src={currentReview.image}
//                   alt={currentReview.name}
//                   width={900}
//                   height={650}
//                   priority
//                   sizes="
//                     (max-width: 767px) 100vw,
//                     (max-width: 1199px) 45vw,
//                     600px
//                   "
//                   className="
//                     block
//                     h-auto
//                     max-h-full
//                     w-auto
//                     max-w-full
//                     object-contain
//                     drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]
//                   "
//                 />
//               </div>

//               {/* Label */}

//               <div className="absolute bottom-4 left-4 z-10 border border-white/10 bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)] px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-xl sm:bottom-6 sm:left-6">
//                 Client Review
//               </div>

//               {/* Counter */}

//               <div className="absolute right-4 top-4 z-10 border border-white/10 bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)] px-3 py-1.5 text-[10px] tracking-widest text-white/80 backdrop-blur-xl sm:right-6 sm:top-6">
//                 {String(currentIndex + 1).padStart(2, "0")}
//                 {" / "}
//                 {String(totalReviews).padStart(2, "0")}
//               </div>
//             </div>

//             {/* =================================
//                 CONTENT
//             ================================= */}

//             <div
//               className="relative flex h-[320px] min-h-0 flex-col justify-between overflow-hidden bg-white p-5 sm:h-[340px] sm:p-7 md:h-full md:p-9 lg:p-12 xl:p-14
//               "
//             >
//               <div
//                 ref={contentRef}
//                 className="
//                   min-h-0
//                   overflow-hidden
//                 "
//               >
//                 {/* Header */}

//                 <div
//                   className="
//                     mb-4
//                     flex
//                     items-center
//                     justify-between

//                     sm:mb-6

//                     md:mb-8
//                   "
//                 >
//                   <span
//                     className="
//                       text-[9px]
//                       font-semibold
//                       uppercase
//                       tracking-[0.22em]
//                       text-[#052D69]

//                       sm:text-[10px]
//                     "
//                   >
//                     Testimonials
//                   </span>

//                   <span
//                     className="
//                       text-[10px]
//                       tracking-widest
//                       text-black/30
//                     "
//                   >
//                     {String(currentIndex + 1).padStart(2, "0")}
//                     {" — "}
//                     {String(totalReviews).padStart(2, "0")}
//                   </span>
//                 </div>

//                 {/* Quote */}

//                 {/* <div
//                   className="
//                     mb-4
//                     flex
//                     h-8
//                     w-8
//                     items-center
//                     justify-center
//                     bg-[#052D69]/[0.06]
//                     text-[#052D69]

//                     sm:mb-5
//                     sm:h-10
//                     sm:w-10
//                   "
//                 >
//                   <BsQuote className="text-base sm:text-lg" />
//                 </div> */}

//                 {/* Name */}

//                 <h2
//                   className="
//                     textmain
//                     max-w-[650px]
//                     text-2xl
//                     font-semibold
//                     leading-[1.05]
//                     tracking-[-0.03em]
//                     text-[#19183A]

//                     sm:text-3xl

//                     md:text-4xl

//                     lg:text-5xl

//                     xl:text-[56px]
//                   "
//                 >
//                   {currentReview.name}
//                 </h2>

//                 {/* Title */}

//                 <p
//                   className="
//                     textmain
//                     mt-2
//                     text-[9px]
//                     font-medium
//                     uppercase
//                     tracking-[0.18em]
//                     text-black/40

//                     sm:text-xs
//                   "
//                 >
//                   {currentReview.title}
//                 </p>

//                 {/* Feedback */}

//                 <div
//                   className="
//                     mt-5
//                     max-h-[100px]
//                     overflow-y-auto
//                     pr-3

//                     sm:mt-6
//                     sm:max-h-[120px]

//                     md:mt-8
//                     md:max-h-[190px]
//                   "
//                 >
//                   <p
//                     className="
//                       textmain
//                       text-sm
//                       leading-6
//                       text-[#19183A]/65

//                       sm:text-base
//                       sm:leading-7

//                       md:leading-8
//                     "
//                   >
//                     {currentReview.feedback}
//                   </p>
//                 </div>
//               </div>

//               {/* =================================
//                   CONTROLS
//               ================================= */}

//               <div
//                 className="
//                   relative
//                   z-10
//                   mt-3
//                   shrink-0

//                   sm:mt-5
//                 "
//               >
//                 {/* Progress */}

//                 <div
//                   className="
//                     mb-3
//                     flex
//                     items-center
//                     gap-3

//                     sm:mb-4
//                   "
//                 >
//                   <div
//                     className="
//                       h-[2px]
//                       flex-1
//                       overflow-hidden
//                       bg-black/[0.06]
//                     "
//                   >
//                     <div
//                       className="
//                         h-full
//                         bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
//                         transition-all
//                         duration-700
//                         ease-out
//                       "
//                       style={{
//                         width: `${((currentIndex + 1) / totalReviews) * 100}%`,
//                       }}
//                     />
//                   </div>

//                   <span
//                     className="
//                       text-[9px]
//                       tracking-widest
//                       text-black/30
//                     "
//                   >
//                     {String(currentIndex + 1).padStart(2, "0")}
//                   </span>
//                 </div>

//                 {/* Buttons */}

//                 <div
//                   className="
//                     flex
//                     items-center
//                     justify-between
//                   "
//                 >
//                   <span
//                     className="
//                       hidden
//                       text-[9px]
//                       uppercase
//                       tracking-[0.2em]
//                       text-black/30

//                       sm:block
//                     "
//                   >
//                     Explore reviews
//                   </span>

//                   <div className="flex gap-2">
//                     <button
//                       type="button"
//                       onClick={prevSlide}
//                       disabled={isAnimating}
//                       aria-label="Previous review"
//                       className="
//                         group
//                         flex
//                         h-10
//                         w-10
//                         items-center
//                         justify-center
//                         border
//                         border-[#052D69]/15
//                         text-[#fff]
//                         transition-all
//                         duration-300
//                         hover:bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
//                         bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
//                         hover:text-white
//                         active:scale-90
//                         disabled:pointer-events-none
//                         disabled:opacity-40

//                         sm:h-11
//                         sm:w-11
//                       "
//                     >
//                       <BsArrowLeft
//                         className="
//                           transition-transform
//                           duration-300
//                           group-hover:-translate-x-1
                          
//                         "
//                       />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={nextSlide}
//                       disabled={isAnimating}
//                       aria-label="Next review"
//                       className="
//                         group
//                         flex
//                         h-10
//                         w-10
//                         items-center
//                         justify-center
//                         bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
//                         text-white
//                         shadow-lg
//                         shadow-[#052D69]/20
//                         transition-all
//                         duration-300
//                         hover:bg-[#19183A]
//                         active:scale-90
//                         disabled:pointer-events-none
//                         disabled:opacity-40

//                         sm:h-11
//                         sm:w-11
//                       "
//                     >
//                       <BsArrowRight
//                         className="
//                           transition-transform
//                           duration-300
//                           group-hover:translate-x-1
//                         "
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Decorative number */}

//               <span
//                 className="
//                   pointer-events-none
//                   absolute
//                   bottom-[-25px]
//                   right-5
//                   select-none
//                   text-[120px]
//                   font-bold
//                   leading-none
//                   text-[#052D69]/[0.025]

//                   sm:text-[160px]

//                   md:text-[190px]
//                 "
//               >
//                 {String(currentIndex + 1).padStart(2, "0")}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* =====================================
//             THUMBNAILS
//         ===================================== */}

//         <div
//           className="
//             mx-auto
//             mt-4
//             w-full
//             max-w-[1250px]

//             sm:mt-5

//             lg:mt-6
//           "
//         >
//           <div
//             className="
//               flex
//               gap-2
//               overflow-x-auto
//               pb-2
//               scrollbar-none

//               sm:gap-3
//             "
//           >
//             {reviews.map((review, index) => {
//               const isActive = index === currentIndex;

//               return (
//                 <button
//                   key={`${review.name}-${index}`}
//                   type="button"
//                   onClick={() => goToSlide(index)}
//                   disabled={isAnimating}
//                   aria-label={`View review from ${review.name}`}
//                   className={`
//                       group
//                       relative
//                       shrink-0
//                       overflow-hidden
//                       bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
//                       transition-all
//                       duration-500

//                       ${
//                         isActive
//                           ? `
//                             h-[62px]
//                             w-[88px]
//                             scale-100
//                             opacity-100
//                             ring-2
//                             ring-[#052D69]
//                             ring-offset-2

//                             sm:h-[75px]
//                             sm:w-[105px]
//                           `
//                           : `
//                             h-[56px]
//                             w-[78px]
//                             opacity-45

//                             hover:scale-[1.04]
//                             hover:opacity-90

//                             sm:h-[66px]
//                             sm:w-[92px]
//                           `
//                       }
//                     `}
//                 >
//                   <Image
//                     src={review.image}
//                     alt={review.name}
//                     fill
//                     sizes="105px"
//                     className="
//                         object-contain
//                         p-2
//                         transition-transform
//                         duration-500
//                         group-hover:scale-105
//                       "
//                   />

//                   <span
//                     className="
//                         absolute
//                         bottom-1
//                         left-1.5
//                         z-10
//                         text-[7px]
//                         tracking-widest
//                         text-white/70
//                       "
//                   >
//                     {String(index + 1).padStart(2, "0")}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Slider;


"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import gsap from "gsap";

import reviews from "@/lib/store/reviews";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const totalReviews = reviews.length;

  const getIndex = useCallback(
    (index: number) => {
      if (totalReviews === 0) {
        return 0;
      }

      return (index + totalReviews) % totalReviews;
    },
    [totalReviews],
  );

  const previousIndex = getIndex(currentIndex - 1);
  const nextIndex = getIndex(currentIndex + 1);

  const currentReview = reviews[currentIndex];
  const previousReview = reviews[previousIndex];
  const nextReview = reviews[nextIndex];

  /* -----------------------------------------
     Initial animation
  ----------------------------------------- */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([imageRef.current, contentRef.current], {
        opacity: 1,
        x: 0,
      });
    });

    return () => ctx.revert();
  }, []);

  /* -----------------------------------------
     Slide animation
  ----------------------------------------- */

  const changeSlide = useCallback(
    (newIndex: number, direction: 1 | -1) => {
      if (isAnimating || newIndex === currentIndex) {
        return;
      }

      setIsAnimating(true);

      const image = imageRef.current;
      const content = contentRef.current;

      const elements = [image, content].filter(
        (element): element is HTMLDivElement => element !== null,
      );

      if (elements.length === 0) {
        setIsAnimating(false);
        return;
      }

      gsap.to(elements, {
        opacity: 0,
        x: direction * -35,
        duration: 0.25,
        ease: "power2.inOut",
        overwrite: true,

        onComplete: () => {
          setCurrentIndex(newIndex);

          gsap.set(elements, {
            opacity: 0,
            x: direction * 35,
          });

          gsap.to(elements, {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: "power3.out",
            overwrite: true,

            onComplete: () => {
              setIsAnimating(false);
            },
          });
        },
      });
    },
    [currentIndex, isAnimating],
  );

  const nextSlide = useCallback(() => {
    changeSlide(getIndex(currentIndex + 1), 1);
  }, [changeSlide, currentIndex, getIndex]);

  const prevSlide = useCallback(() => {
    changeSlide(getIndex(currentIndex - 1), -1);
  }, [changeSlide, currentIndex, getIndex]);

  const goToSlide = (index: number) => {
    if (index === currentIndex || isAnimating) {
      return;
    }

    const direction = index > currentIndex ? 1 : -1;

    changeSlide(index, direction);
  };

  /* -----------------------------------------
     Keyboard navigation
  ----------------------------------------- */

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [nextSlide, prevSlide]);

  /* -----------------------------------------
     Touch / Swipe
  ----------------------------------------- */

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;

    touchStartY.current = event.touches[0]?.clientY ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0]?.clientX ?? 0;

    const endY = event.changedTouches[0]?.clientY ?? 0;

    const diffX = touchStartX.current - endX;

    const diffY = touchStartY.current - endY;

    // Allow normal vertical page scrolling
    if (Math.abs(diffY) > Math.abs(diffX)) {
      return;
    }

    if (Math.abs(diffX) < 50) {
      return;
    }

    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  // Keep the Rules of Hooks intact: the empty-state check must happen
  // after every hook has been called.
  if (!currentReview || !previousReview || !nextReview) {
    return null;
  }

  return (
    <section
      className="
        w-full
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]
          px-0
          sm:px-4
          md:px-6
          lg:px-8
          xl:px-10
        "
      >
        {/* =====================================
            FIXED HEIGHT SLIDER
        ===================================== */}

        <div
          className="
            relative
            mx-auto
            h-[620px]
            w-full
            
            max-w-[1250px]

            sm:h-[680px]

            md:h-full
            "
            // md:h-[500px]
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* ===================================
              PREVIOUS IMAGE
          =================================== */}

          <button
            type="button"
            onClick={prevSlide}
            disabled={isAnimating}
            aria-label="Previous review"
            className="
              group
              absolute
              left-0
              top-1/2
              z-30
              hidden
              h-[150px]
              w-[90px]
              -translate-x-[65%]
              -translate-y-1/2
              overflow-hidden
              bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
              shadow-xl
              opacity-60
              transition-all
              duration-500
              hover:w-[105px]
              hover:opacity-100
              disabled:pointer-events-none
              xl:block
            "
          >
            <Image
              src={previousReview.image}
              alt={previousReview.name}
              fill
              sizes="105px"
              className="
                object-contain
                p-2
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-black/15
                transition
                group-hover:bg-black/0
              "
            />
          </button>

          {/* ===================================
              NEXT IMAGE
          =================================== */}

          <button
            type="button"
            onClick={nextSlide}
            disabled={isAnimating}
            aria-label="Next review"
            className="
              group
              absolute
              right-0
              top-1/2
              z-30
              hidden
              h-[150px]
              w-[90px]
              translate-x-[65%]
              -translate-y-1/2
              overflow-hidden
              bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
              shadow-xl
              opacity-60
              transition-all
              duration-500
              hover:w-[105px]
              hover:opacity-100
              disabled:pointer-events-none
              xl:block
            "
          >
            <Image
              src={nextReview.image}
              alt={nextReview.name}
              fill
              sizes="105px"
              className="
                object-contain
                p-2
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-black/15
                transition
                group-hover:bg-black/0
              "
            />
          </button>

          {/* ===================================
              MAIN CARD
              NO RADIUS
              NO PADDING
          =================================== */}

          <div
            className="grid h-full md:h-[80%] w-full overflow-hidden bg-white shadow-[0_20px_70px_rgba(25,24,58,0.08)]
 md:grid-cols-[0.9fr_1.1fr]
            "
          >
            {/* =================================
                IMAGE
            ================================= */}

            <div
              className="
                relative
                h-[300px]
                min-h-0
                overflow-hidden
     

                sm:h-[340px]

                md:h-full
              "
            >
              {/* IMAGE WRAPPER */}

              <div
                ref={imageRef}
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  p-5

                  sm:p-7

                  md:p-10

                  lg:p-14

                  xl:p-16
                "
              >
                <Image
                  src={currentReview.image}
                  alt={currentReview.name}
                  width={900}
                  height={650}
                  priority
                  sizes="
                    (max-width: 767px) 100vw,
                    (max-width: 1199px) 45vw,
                    600px
                  "
                  className="
                    block
                    h-auto
                    max-h-full
                    w-auto
                    max-w-full
                    object-contain
                    drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]
                  "
                />
              </div>

              {/* Label */}

              <div className="absolute bottom-4 left-4 z-10 border border-white/10 bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)] px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-xl sm:bottom-6 sm:left-6">
                Client Review
              </div>

              {/* Counter */}

              <div className="absolute right-4 top-4 z-10 border border-white/10 bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)] px-3 py-1.5 text-[10px] tracking-widest text-white/80 backdrop-blur-xl sm:right-6 sm:top-6">
                {String(currentIndex + 1).padStart(2, "0")}
                {" / "}
                {String(totalReviews).padStart(2, "0")}
              </div>
            </div>

            {/* =================================
                CONTENT
            ================================= */}

            <div
              className="relative flex h-[320px] min-h-0 flex-col justify-between overflow-hidden bg-white p-5 sm:h-[340px] sm:p-7 md:h-full md:p-9 lg:p-12 xl:p-14
              "
            >
              <div
                ref={contentRef}
                className="
                  min-h-0
                  overflow-hidden
                "
              >
                {/* Header */}

                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between

                    sm:mb-6

                    md:mb-8
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-[#052D69]

                      sm:text-[10px]
                    "
                  >
                    Testimonials
                  </span>

                  <span
                    className="
                      text-[10px]
                      tracking-widest
                      text-black/30
                    "
                  >
                    {String(currentIndex + 1).padStart(2, "0")}
                    {" — "}
                    {String(totalReviews).padStart(2, "0")}
                  </span>
                </div>

                {/* Quote */}

                {/* <div
                  className="
                    mb-4
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    bg-[#052D69]/[0.06]
                    text-[#052D69]

                    sm:mb-5
                    sm:h-10
                    sm:w-10
                  "
                >
                  <BsQuote className="text-base sm:text-lg" />
                </div> */}

                {/* Name */}

                <h2
                  className="textmain max-w-[650px] text-2xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#19183A] sm:text-3xl md:text-4xl lg:text-4xl xl:text-[36px]
                  "
                >
                  {currentReview.name}
                </h2>

                {/* Title */}

                <p
                  className="textmain mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-black/40
 sm:text-xs"
                >
                  {currentReview.title}
                </p>

                {/* Feedback */}

                <div
                  className="mt-5 max-h-[100px] overflow-y-auto pr-3
 sm:mt-6 sm:max-h-[120px]
 md:mt-8 md:max-h-[190px]
                  "
                >
                  <p
                    className="
                      textmain
                      text-sm
                      leading-6
                      text-[#19183A]/65

                      sm:text-base
                      sm:leading-7

                      md:leading-8
                    "
                  >
                    {currentReview.feedback}
                  </p>
                </div>
              </div>

              {/* =================================
                  CONTROLS
              ================================= */}

              <div
                className="
                  relative
                  z-10
                  mt-3
                  shrink-0

                  sm:mt-5
                "
              >
                {/* Progress */}

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-3

                    sm:mb-4
                  "
                >
                  <div
                    className="
                      h-[2px]
                      flex-1
                      overflow-hidden
                      bg-black/[0.06]
                    "
                  >
                    <div
                      className="
                        h-full
                        bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
                        transition-all
                        duration-700
                        ease-out
                      "
                      style={{
                        width: `${((currentIndex + 1) / totalReviews) * 100}%`,
                      }}
                    />
                  </div>

                  <span
                    className="
                      text-[9px]
                      tracking-widest
                      text-black/30
                    "
                  >
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Buttons */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      hidden
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-black/30

                      sm:block
                    "
                  >
                    Explore reviews
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={prevSlide}
                      disabled={isAnimating}
                      aria-label="Previous review"
                      className="
                        group
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        border
                        border-[#052D69]/15
                        text-[#fff]
                        transition-all
                        duration-300
                        hover:bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
                        bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
                        hover:text-white
                        active:scale-90
                        disabled:pointer-events-none
                        disabled:opacity-40

                        sm:h-11
                        sm:w-11
                      "
                    >
                      <BsArrowLeft
                        className="
                          transition-transform
                          duration-300
                          group-hover:-translate-x-1
                          
                        "
                      />
                    </button>

                    <button
                      type="button"
                      onClick={nextSlide}
                      disabled={isAnimating}
                      aria-label="Next review"
                      className="
                        group
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
                        text-white
                        shadow-lg
                        shadow-[#052D69]/20
                        transition-all
                        duration-300
                        hover:bg-[#19183A]
                        active:scale-90
                        disabled:pointer-events-none
                        disabled:opacity-40

                        sm:h-11
                        sm:w-11
                      "
                    >
                      <BsArrowRight
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative number */}

              <span
                className="
                  pointer-events-none
                  absolute
                  bottom-[-25px]
                  right-5
                  select-none
                  text-[120px]
                  font-bold
                  leading-none
                  text-[#052D69]/[0.025]

                  sm:text-[160px]

                  md:text-[190px]
                "
              >
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

      </div>
        {/* =====================================
            THUMBNAILS
        ===================================== */}

        <div
          className="
            mx-auto
            mt-4
            w-full
            max-w-[1250px]

            sm:mt-5

            lg:mt-6
          "
        >
          <div
            className="
              flex
              gap-2
              overflow-x-auto
              pb-2
              scrollbar-none

              sm:gap-3
            "
          >
            {reviews.map((review, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={`${review.name}-${index}`}
                  type="button"
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  aria-label={`View review from ${review.name}`}
                  className={`
                      group
                      relative
                      shrink-0
                      overflow-hidden
                      bg-[linear-gradient(to_right,#19183a_0%,#052D69_51%,#16222A_100%)]
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? `
                            h-[62px]
                            w-[88px]
                            scale-100
                            opacity-100
                            ring-2
                            ring-[#052D69]
                            ring-offset-2

                            sm:h-[75px]
                            sm:w-[105px]
                          `
                          : `
                            h-[56px]
                            w-[78px]
                            opacity-45

                            hover:scale-[1.04]
                            hover:opacity-90

                            sm:h-[66px]
                            sm:w-[92px]
                          `
                      }
                    `}
                >
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    sizes="105px"
                    className="
                        object-contain
                        p-2
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                  />

                  <span
                    className="
                        absolute
                        bottom-1
                        left-1.5
                        z-10
                        text-[7px]
                        tracking-widest
                        text-white/70
                      "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
    </section>
  );
};

export default Slider;
