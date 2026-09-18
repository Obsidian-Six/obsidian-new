
// "use client";

// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// type MatchMediaConditions = {
//   desktop?: boolean;
//   mobile?: boolean;
// };

// export function useHomeAboutAnimation() {
//   const rootRef = useRef<HTMLElement | null>(null);
//   const highlightRef = useRef<HTMLDivElement | null>(null);

//   const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

//   useLayoutEffect(() => {
//     const root = rootRef.current;

//     if (!root) return;

//     let context: gsap.Context | null = null;

//     const setup = () => {
//       context = gsap.context(() => {
//         const highlight = highlightRef.current;

//         const items = itemRefs.current.filter(
//           (item): item is HTMLDivElement => item !== null
//         );

//         const videos = videoRefs.current.filter(
//           (video): video is HTMLVideoElement => video !== null
//         );

//         if (!items.length) {
//           return;
//         }

//         const mm = gsap.matchMedia();

//         mm.add(
//           {
//             desktop: "(min-width: 991px)",
//             mobile: "(max-width: 990px)",
//           },
//           (conditions) => {
//             const ctx =
//               conditions as unknown as {
//                 conditions?: MatchMediaConditions;
//               };

//             const isMobile =
//               ctx.conditions?.mobile ?? false;

//             /* =====================================================
//                HIGHLIGHT ELEMENTS
//             ===================================================== */

//             const highlightSection =
//               highlight?.querySelector<HTMLElement>(
//                 ".homeHighlight_section"
//               );

//             const highlightTitle =
//               highlight?.querySelector<HTMLElement>(
//                 ".homeHighlight_title"
//               );

//             const nonBled =
//               highlight?.querySelector<HTMLElement>(
//                 ".homeHighlight_nonBled"
//               );

//             const bled =
//               highlight?.querySelector<HTMLElement>(
//                 ".homeHighlight_bled"
//               );

//             /* =====================================================
//                INITIAL HIGHLIGHT STATE
//             ===================================================== */

//             if (highlight) {
//               gsap.set(highlight, {
//                 opacity: 1,
//                 visibility: "visible",
//                 y: 0,
//                 position: "relative",
//               });
//             }

//             if (highlightSection) {
//               gsap.set(highlightSection, {
//                 opacity: 1,
//               });
//             }

//             if (highlightTitle) {
//               gsap.set(highlightTitle, {
//                 opacity: 1,
//                 filter: "blur(0px)",
//                 y: 0,
//               });
//             }

//             if (nonBled) {
//               gsap.set(nonBled, {
//                 opacity: 1,
//                 filter: "blur(0px)",
//               });
//             }

//             if (bled) {
//               gsap.set(bled, {
//                 opacity: 1,
//                 filter: "blur(0px)",
//                 "--size-blend": "0%",
//               });
//             }

//             /* =====================================================
//                INITIAL SERVICE STATE
//             ===================================================== */

//             items.forEach((item, index) => {
//               const title =
//                 item.querySelector<HTMLElement>(
//                   ".obsidianService_textHero"
//                 );

//               const letters = title
//                 ? title.querySelectorAll<HTMLElement>(
//                   ":scope > span > span"
//                 )
//                 : [];

//               const butterfly =
//                 item.querySelector<HTMLElement>(
//                   ".obsidianService_butterfly"
//                 );

//               const description =
//                 item.querySelectorAll<HTMLElement>(
//                   ".obsidianService_content_wrap p > span"
//                 );

//               const button =
//                 item.querySelector<HTMLButtonElement>(
//                   ".obsidianService_button"
//                 );

//               gsap.set(item, {
//                 position: "absolute",
//                 inset: 0,
//                 autoAlpha: index === 0 ? 1 : 0,
//                 zIndex: index === 0 ? 3 : 1,
//               });

//               if (letters.length) {
//                 gsap.set(letters, {
//                   opacity: 0,
//                   filter: "blur(10px)",
//                   x: 0,
//                   transformOrigin: "50% 50%",
//                 });
//               }

//               if (butterfly) {
//                 gsap.set(butterfly, {
//                   opacity: 0,
//                   filter: "blur(12px)",
//                   x: 0,
//                   y: 0,
//                   rotation: 0,
//                 });
//               }

//               if (description.length) {
//                 gsap.set(description, {
//                   opacity: 0,
//                   y: 18,
//                   filter: "blur(5px)",
//                 });
//               }

//               if (button) {
//                 gsap.set(button, {
//                   opacity: 0,
//                   y: 18,
//                   filter: "blur(5px)",
//                 });
//               }
//             });

//             /* =====================================================
//                VIDEO PLAYBACK
//             ===================================================== */

//             videos.forEach((video) => {
//               video.muted = true;
//               video.playsInline = true;

//               video.setAttribute("muted", "");
//               video.setAttribute("playsinline", "");

//               const playVideo = () => {
//                 const promise = video.play();

//                 if (promise) {
//                   promise.catch(() => {
//                     // Browser may block autoplay.
//                   });
//                 }
//               };

//               if (video.readyState >= 2) {
//                 playVideo();
//               } else {
//                 video.addEventListener(
//                   "loadeddata",
//                   playVideo,
//                   { once: true }
//                 );
//               }
//             });

//             /* =====================================================
//                MASTER TIMELINE
//             ===================================================== */

//             const timeline = gsap.timeline({
//               defaults: {
//                 ease: "power3.out",
//               },

//               scrollTrigger: {
//                 trigger: root,
//                 start: "top top",

//                 end: isMobile
//                   ? `+=${Math.max(
//                     window.innerHeight * 3.5,
//                     1450
//                   )}`
//                   : `+=${Math.max(
//                     window.innerHeight * 5.1,
//                     3200
//                   )}`,

//                 scrub: isMobile ? true : 1,

//                 pin: true,
//                 pinSpacing: true,
//                 anticipatePin: 1,
//                 invalidateOnRefresh: true,
//                 refreshPriority: 20,

//                 onRefresh: () => {
//                   ScrollTrigger.update();
//                 },
//               },
//             });

//             /* =====================================================
//                01 — HIGHLIGHT BLUR / REVEAL
//             ===================================================== */

//             if (highlightTitle) {
//               timeline.fromTo(
//                 highlightTitle,
//                 {
//                   filter: "blur(9px)",
//                   y: isMobile ? 18 : 24,
//                 },
//                 {
//                   filter: "blur(0px)",
//                   y: 0,
//                   duration: isMobile ? 0.65 : 0.85,
//                   ease: "power2.out",
//                 },
//                 0
//               );
//             }

//             /* =====================================================
//                GREY → WHITE
//             ===================================================== */

//             if (bled) {
//               timeline.to(
//                 bled,
//                 {
//                   "--size-blend": "100%",
//                   duration: isMobile ? 1.15 : 1.7,
//                   ease: "none",
//                 },
//                 0.15
//               );
//             }

//             /* =====================================================
//                HOLD
//             ===================================================== */

//             timeline.to({}, {
//               duration: isMobile ? 0.18 : 0.35,
//             });

//             /* =====================================================
//                02 — HIGHLIGHT EXIT
//             ===================================================== */

//             if (highlightTitle) {
//               timeline.to(highlightTitle, {
//                 filter: "blur(7px)",
//                 y: isMobile ? -15 : -25,
//                 opacity: 0,
//                 duration: isMobile ? 0.45 : 0.7,
//                 ease: "power2.inOut",
//               });
//             }

//             if (highlight) {
//               timeline.to(
//                 highlight,
//                 {
//                   opacity: 0,
//                   y: isMobile ? -25 : -40,
//                   duration: isMobile ? 0.35 : 0.55,
//                   ease: "power2.inOut",
//                 },
//                 "<"
//               );
//             }

//             /* =====================================================
//                03 — SERVICES
//             ===================================================== */

//             items.forEach((item, index) => {
//               const title =
//                 item.querySelector<HTMLElement>(
//                   ".obsidianService_textHero"
//                 );

//               const letters = title
//                 ? title.querySelectorAll<HTMLElement>(
//                   ":scope > span > span"
//                 )
//                 : [];

//               const butterfly =
//                 item.querySelector<HTMLElement>(
//                   ".obsidianService_butterfly"
//                 );

//               const description =
//                 item.querySelectorAll<HTMLElement>(
//                   ".obsidianService_content_wrap p > span"
//                 );

//               const button =
//                 item.querySelector<HTMLButtonElement>(
//                   ".obsidianService_button"
//                 );

//               /* =================================================
//                  VIDEO POSITION
//               ================================================= */

//               let videoFromX = 0;
//               let videoFromY = 0;
//               let videoRotation = 0;

//               if (index === 0) {
//                 videoFromX = isMobile ? 55 : 110;
//                 videoFromY = isMobile ? -45 : -60;
//                 videoRotation = -8;
//               }

//               if (index === 1) {
//                 videoFromX = isMobile ? -60 : 50;
//                 videoFromY = isMobile ? 10 : 125;
//                 videoRotation = 7;
//               }

//               if (index === 2) {
//                 videoFromX = isMobile ? 60 : -80;
//                 videoFromY = isMobile ? 45 : 65;
//                 videoRotation = -5;
//               }

//               /* =================================================
//                  SERVICE ENTER
//               ================================================= */

//               timeline.to(item, {
//                 autoAlpha: 1,
//                 zIndex: 10,
//                 duration: 0.01,
//               });

//               /* =================================================
//                  TITLE ANIMATION
//               ================================================= */

//               if (letters.length) {
//                 timeline.to(
//                   letters,
//                   {
//                     opacity: 1,
//                     filter: "blur(0px)",

//                     duration: isMobile
//                       ? 0.55
//                       : 0.75,

//                     stagger: {
//                       each: isMobile
//                         ? 0.025
//                         : 0.045,
//                     },

//                     ease: "power3.out",
//                   },
//                   "<"
//                 );
//               }

//               /* =================================================
//                  VIDEO ANIMATION
//               ================================================= */

//               if (butterfly) {
//                 timeline.fromTo(
//                   butterfly,
//                   {
//                     opacity: 0,
//                     x: videoFromX,
//                     y: videoFromY,
//                     scale: 0.7,
//                     rotation: videoRotation,
//                     filter: "blur(12px)",
//                   },
//                   {
//                     opacity: 1,
//                     x: 0,
//                     y: 0,
//                     scale: 1,
//                     rotation: 0,
//                     filter: "blur(0px)",

//                     duration: isMobile
//                       ? 0.7
//                       : 1,

//                     ease: "power3.out",
//                   },
//                   "<0.1"
//                 );
//               }

//               /* =================================================
//                  DESCRIPTION
//               ================================================= */

//               if (description.length) {
//                 timeline.to(
//                   description,
//                   {
//                     opacity: 1,
//                     y: 0,
//                     filter: "blur(0px)",

//                     duration: isMobile
//                       ? 0.4
//                       : 0.55,

//                     stagger: {
//                       each: isMobile
//                         ? 0.045
//                         : 0.08,
//                     },

//                     ease: "power2.out",
//                   },
//                   "-=0.4"
//                 );
//               }

//               /* =================================================
//                  BUTTON
//               ================================================= */

//               if (button) {
//                 timeline.to(
//                   button,
//                   {
//                     opacity: 1,
//                     y: 0,
//                     filter: "blur(0px)",

//                     duration: isMobile
//                       ? 0.4
//                       : 0.5,

//                     ease: "power2.out",
//                   },
//                   "-=0.2"
//                 );
//               }

//               /* =================================================
//                  SERVICE HOLD
//               ================================================= */

//               timeline.to({}, {
//                 duration: isMobile
//                   ? 0.25
//                   : 0.55,
//               });

//               /* =================================================
//                  SERVICE EXIT
//               ================================================= */

//               if (index < items.length - 1) {
//                 /* TITLE EXIT */

//                 if (letters.length) {
//                   timeline.to(letters, {
//                     opacity: 0,
//                     filter: "blur(8px)",

//                     duration: isMobile
//                       ? 0.35
//                       : 0.55,

//                     stagger: {
//                       each: isMobile
//                         ? 0.018
//                         : 0.03,
//                       from: "end",
//                     },

//                     ease: "power2.in",
//                   });
//                 }

//                 /* VIDEO EXIT */

//                 if (butterfly) {
//                   timeline.to(
//                     butterfly,
//                     {
//                       opacity: 0,
//                       scale: 0.78,
//                       filter: "blur(10px)",

//                       x:
//                         index === 0
//                           ? isMobile
//                             ? 55
//                             : 100
//                           : isMobile
//                             ? -55
//                             : -105,

//                       y:
//                         index === 0
//                           ? isMobile
//                             ? -35
//                             : -50
//                           : isMobile
//                             ? 25
//                             : 50,

//                       duration: isMobile
//                         ? 0.4
//                         : 0.55,

//                       ease: "power2.inOut",
//                     },
//                     "<"
//                   );
//                 }

//                 /* DESCRIPTION EXIT */

//                 if (description.length) {
//                   timeline.to(
//                     description,
//                     {
//                       opacity: 0,
//                       y: -12,
//                       filter: "blur(5px)",
//                       duration: isMobile
//                         ? 0.25
//                         : 0.35,
//                     },
//                     "<"
//                   );
//                 }

//                 /* BUTTON EXIT */

//                 if (button) {
//                   timeline.to(
//                     button,
//                     {
//                       opacity: 0,
//                       y: -12,
//                       filter: "blur(5px)",
//                       duration: isMobile
//                         ? 0.25
//                         : 0.35,
//                     },
//                     "<"
//                   );
//                 }

//                 /* HIDE CURRENT ITEM */

//                 timeline.to(item, {
//                   autoAlpha: 0,
//                   zIndex: 1,
//                   duration: 0.01,
//                 });
//               }
//             });

//             /* =====================================================
//                LAST ITEM STAYS VISIBLE
//             ===================================================== */

//             const lastItem =
//               items[items.length - 1];

//             if (lastItem) {
//               timeline.to(
//                 lastItem,
//                 {
//                   autoAlpha: 1,
//                   zIndex: 20,
//                   duration: 0.01,
//                 },
//                 ">"
//               );
//             }

//             if (isMobile && lastItem) {
//               timeline.to(
//                 lastItem,
//                 {
//                   opacity: 1,
//                   duration: 0.01,
//                 },
//                 ">"
//               );
//             }

//             /* =====================================================
//                MATCH MEDIA CLEANUP
//             ===================================================== */

//             return () => {
//               timeline.scrollTrigger?.kill();
//               timeline.kill();
//             };
//           }
//         );

//         /* =======================================================
//            REFRESH AFTER SETUP
//         ======================================================= */

//         requestAnimationFrame(() => {
//           requestAnimationFrame(() => {
//             ScrollTrigger.refresh();
//           });
//         });
//       }, root);
//     };

//     /*
//      * Wait for DOM/layout/video dimensions.
//      */
//     const timer = window.setTimeout(setup, 50);

//     return () => {
//       window.clearTimeout(timer);

//       /*
//        * IMPORTANT:
//        * gsap.context() returns a Context object.
//        * Cleanup must use .revert().
//        */
//       if (context) {
//         context.revert();
//       }
//     };
//   }, []);

//   return {
//     rootRef,
//     itemRefs,
//     videoRefs,
//     highlightRef,
//   };
// }

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MatchMediaConditions = {
  desktop?: boolean;
  mobile?: boolean;
};

export function useHomeAboutAnimation() {
  const rootRef = useRef<HTMLElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    let context: gsap.Context | null = null;
    let setupTimer: number | null = null;

    const setup = () => {
      context = gsap.context(() => {
        const highlight = highlightRef.current;

        const items = itemRefs.current.filter(
          (item): item is HTMLDivElement => item !== null
        );

        const videos = videoRefs.current.filter(
          (video): video is HTMLVideoElement => video !== null
        );

        if (!items.length) return;

        const mm = gsap.matchMedia();

        mm.add(
          {
            desktop: "(min-width: 991px)",
            mobile: "(max-width: 990px)",
          },
          (conditions) => {
            const ctx =
              conditions as unknown as {
                conditions?: MatchMediaConditions;
              };

            const isMobile = Boolean(ctx.conditions?.mobile);

            /*
             * -------------------------------------------------------
             * PERFORMANCE SETTINGS
             * -------------------------------------------------------
             */

            // Mobile browsers struggle with animated CSS filters.
            // We only use blur on the main highlight title.
            const useBlur = !isMobile;

            /*
             * -------------------------------------------------------
             * ELEMENT CACHE
             * -------------------------------------------------------
             */

            const highlightTitle =
              highlight?.querySelector<HTMLElement>(
                ".homeHighlight_title"
              );

            const nonBled =
              highlight?.querySelector<HTMLElement>(
                ".homeHighlight_nonBled"
              );

            const bled =
              highlight?.querySelector<HTMLElement>(
                ".homeHighlight_bled"
              );

            const services = items.map((item) => {
              const title =
                item.querySelector<HTMLElement>(
                  ".obsidianService_textHero"
                );

              const letters = title
                ? Array.from(
                    title.querySelectorAll<HTMLElement>(
                      ":scope > span > span"
                    )
                  )
                : [];

              const butterfly =
                item.querySelector<HTMLElement>(
                  ".obsidianService_butterfly"
                );

              const description = Array.from(
                item.querySelectorAll<HTMLElement>(
                  ".obsidianService_content_wrap p > span"
                )
              );

              const button =
                item.querySelector<HTMLButtonElement>(
                  ".obsidianService_button"
                );

              return {
                item,
                letters,
                butterfly,
                description,
                button,
              };
            });

            /*
             * -------------------------------------------------------
             * GPU / PAINT OPTIMIZATION
             * -------------------------------------------------------
             */

            gsap.set(
              [
                highlightTitle,
                ...services.flatMap((service) => [
                  service.item,
                  service.butterfly,
                  service.button,
                  ...service.letters,
                  ...service.description,
                ]),
              ].filter(Boolean),
              {
                force3D: true,
              }
            );

            /*
             * -------------------------------------------------------
             * INITIAL HIGHLIGHT
             * -------------------------------------------------------
             */

            if (highlight) {
              gsap.set(highlight, {
                opacity: 1,
                visibility: "visible",
                y: 0,
                position: "relative",
                force3D: true,
              });
            }

            if (highlightTitle) {
              gsap.set(highlightTitle, {
                opacity: 1,
                y: 0,
                ...(useBlur && {
                  filter: "blur(0px)",
                }),
              });
            }

            if (nonBled) {
              gsap.set(nonBled, {
                opacity: 1,
              });
            }

            if (bled) {
              gsap.set(bled, {
                opacity: 1,
                "--size-blend": "0%",
              });
            }

            /*
             * -------------------------------------------------------
             * INITIAL SERVICES
             * -------------------------------------------------------
             */

            services.forEach(
              (
                {
                  item,
                  letters,
                  butterfly,
                  description,
                  button,
                },
                index
              ) => {
                gsap.set(item, {
                  position: "absolute",
                  inset: 0,
                  autoAlpha: index === 0 ? 1 : 0,
                  zIndex: index === 0 ? 3 : 1,
                  force3D: true,
                });

                /*
                 * MOBILE:
                 * Don't animate blur on every letter.
                 *
                 * Desktop keeps the original blur effect.
                 */
                if (letters.length) {
                  gsap.set(letters, {
                    opacity: 0,
                    x: 0,
                    y: 0,
                    ...(useBlur && {
                      filter: "blur(10px)",
                    }),
                    force3D: true,
                  });
                }

                if (butterfly) {
                  gsap.set(butterfly, {
                    opacity: 0,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    ...(useBlur && {
                      filter: "blur(12px)",
                    }),
                    force3D: true,
                  });
                }

                if (description.length) {
                  gsap.set(description, {
                    opacity: 0,
                    y: 18,
                    ...(useBlur && {
                      filter: "blur(5px)",
                    }),
                    force3D: true,
                  });
                }

                if (button) {
                  gsap.set(button, {
                    opacity: 0,
                    y: 18,
                    ...(useBlur && {
                      filter: "blur(5px)",
                    }),
                    force3D: true,
                  });
                }
              }
            );

            /*
             * -------------------------------------------------------
             * VIDEO PLAYBACK
             * -------------------------------------------------------
             */

            videos.forEach((video) => {
              video.muted = true;
              video.playsInline = true;

              video.setAttribute("muted", "");
              video.setAttribute("playsinline", "");

              // Prevent unnecessary browser work.
              video.preload = "metadata";

              const playVideo = () => {
                if (video.paused) {
                  const promise = video.play();

                  promise?.catch(() => {
                    // Autoplay can be blocked by the browser.
                  });
                }
              };

              if (video.readyState >= 2) {
                playVideo();
              } else {
                video.addEventListener(
                  "loadeddata",
                  playVideo,
                  { once: true }
                );
              }
            });

            /*
             * -------------------------------------------------------
             * MASTER TIMELINE
             * -------------------------------------------------------
             */

            const timeline = gsap.timeline({
              defaults: {
                ease: "power3.out",
                overwrite: "auto",
              },

              scrollTrigger: {
                trigger: root,
                start: "top top",

                end: isMobile
                  ? `+=${Math.max(
                      window.innerHeight * 3,
                      1200
                    )}`
                  : `+=${Math.max(
                      window.innerHeight * 5.1,
                      3200
                    )}`,

                /*
                 * TRUE causes every tiny touch movement to directly
                 * control the timeline.
                 *
                 * 0.55 gives mobile a much smoother interpolation.
                 */
                scrub: isMobile ? 0.55 : 1,

                pin: true,
                pinSpacing: true,

                /*
                 * Avoid aggressive pin anticipation on mobile.
                 */
                anticipatePin: isMobile ? 0 : 1,

                invalidateOnRefresh: true,

                refreshPriority: 20,

                /*
                 * Don't call ScrollTrigger.update() inside
                 * onRefresh. It is unnecessary and can cause
                 * additional layout work.
                 */
              },
            });

            /*
             * -------------------------------------------------------
             * 01 — HIGHLIGHT REVEAL
             * -------------------------------------------------------
             */

            if (highlightTitle) {
              timeline.fromTo(
                highlightTitle,
                {
                  y: isMobile ? 12 : 24,
                  ...(useBlur && {
                    filter: "blur(9px)",
                  }),
                },
                {
                  y: 0,
                  ...(useBlur && {
                    filter: "blur(0px)",
                  }),
                  duration: isMobile ? 0.7 : 0.85,
                  ease: "power2.out",
                },
                0
              );
            }

            /*
             * -------------------------------------------------------
             * GREY → WHITE
             * -------------------------------------------------------
             */

            if (bled) {
              timeline.to(
                bled,
                {
                  "--size-blend": "100%",
                  duration: isMobile ? 1 : 1.7,
                  ease: "none",
                },
                0.15
              );
            }

            /*
             * -------------------------------------------------------
             * HIGHLIGHT HOLD
             * -------------------------------------------------------
             */

            timeline.to({}, {
              duration: isMobile ? 0.12 : 0.35,
            });

            /*
             * -------------------------------------------------------
             * 02 — HIGHLIGHT EXIT
             * -------------------------------------------------------
             */

            if (highlightTitle) {
              timeline.to(highlightTitle, {
                y: isMobile ? -12 : -25,
                opacity: 0,
                ...(useBlur && {
                  filter: "blur(7px)",
                }),
                duration: isMobile ? 0.4 : 0.7,
                ease: "power2.inOut",
              });
            }

            if (highlight) {
              timeline.to(
                highlight,
                {
                  opacity: 0,
                  y: isMobile ? -20 : -40,
                  duration: isMobile ? 0.35 : 0.55,
                  ease: "power2.inOut",
                },
                "<"
              );
            }

            /*
             * -------------------------------------------------------
             * 03 — SERVICES
             * -------------------------------------------------------
             */

            services.forEach(
              (
                {
                  item,
                  letters,
                  butterfly,
                  description,
                  button,
                },
                index
              ) => {
                /*
                 * VIDEO START POSITION
                 */

                let videoFromX = 0;
                let videoFromY = 0;
                let videoRotation = 0;

                if (index === 0) {
                  videoFromX = isMobile ? 40 : 110;
                  videoFromY = isMobile ? -30 : -60;
                  videoRotation = -8;
                } else if (index === 1) {
                  videoFromX = isMobile ? -40 : 50;
                  videoFromY = isMobile ? 8 : 125;
                  videoRotation = 7;
                } else if (index === 2) {
                  videoFromX = isMobile ? 40 : -80;
                  videoFromY = isMobile ? 30 : 65;
                  videoRotation = -5;
                }

                /*
                 * ---------------------------------------------------
                 * SERVICE ENTER
                 * ---------------------------------------------------
                 */

                timeline.set(item, {
                  autoAlpha: 1,
                  zIndex: 10,
                });

                /*
                 * ---------------------------------------------------
                 * TITLE
                 * ---------------------------------------------------
                 */

                if (letters.length) {
                  timeline.to(
                    letters,
                    {
                      opacity: 1,

                      /*
                       * MOBILE = opacity + transform only.
                       * This is considerably cheaper than animating
                       * blur on every character.
                       */
                      ...(useBlur && {
                        filter: "blur(0px)",
                      }),

                      duration: isMobile ? 0.5 : 0.75,

                      stagger: {
                        each: isMobile ? 0.015 : 0.045,
                      },

                      ease: "power3.out",
                    },
                    "<"
                  );
                }

                /*
                 * ---------------------------------------------------
                 * VIDEO / BUTTERFLY
                 * ---------------------------------------------------
                 */

                if (butterfly) {
                  timeline.fromTo(
                    butterfly,
                    {
                      opacity: 0,
                      x: videoFromX,
                      y: videoFromY,
                      scale: isMobile ? 0.85 : 0.7,
                      rotation: videoRotation,

                      ...(useBlur && {
                        filter: "blur(12px)",
                      }),
                    },
                    {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotation: 0,

                      ...(useBlur && {
                        filter: "blur(0px)",
                      }),

                      duration: isMobile ? 0.65 : 1,
                      ease: "power3.out",
                    },
                    "<0.05"
                  );
                }

                /*
                 * ---------------------------------------------------
                 * DESCRIPTION
                 * ---------------------------------------------------
                 */

                if (description.length) {
                  timeline.to(
                    description,
                    {
                      opacity: 1,
                      y: 0,

                      ...(useBlur && {
                        filter: "blur(0px)",
                      }),

                      duration: isMobile ? 0.35 : 0.55,

                      /*
                       * Much smaller mobile stagger.
                       */
                      stagger: {
                        each: isMobile ? 0.02 : 0.08,
                      },

                      ease: "power2.out",
                    },
                    isMobile ? "-=0.3" : "-=0.4"
                  );
                }

                /*
                 * ---------------------------------------------------
                 * BUTTON
                 * ---------------------------------------------------
                 */

                if (button) {
                  timeline.to(
                    button,
                    {
                      opacity: 1,
                      y: 0,

                      ...(useBlur && {
                        filter: "blur(0px)",
                      }),

                      duration: isMobile ? 0.35 : 0.5,
                      ease: "power2.out",
                    },
                    isMobile ? "-=0.15" : "-=0.2"
                  );
                }

                /*
                 * ---------------------------------------------------
                 * SERVICE HOLD
                 * ---------------------------------------------------
                 */

                timeline.to({}, {
                  duration: isMobile ? 0.2 : 0.55,
                });

                /*
                 * ---------------------------------------------------
                 * SERVICE EXIT
                 * ---------------------------------------------------
                 */

                if (index < services.length - 1) {
                  /*
                   * TITLE EXIT
                   */

                  if (letters.length) {
                    timeline.to(
                      letters,
                      {
                        opacity: 0,

                        ...(useBlur && {
                          filter: "blur(8px)",
                        }),

                        duration: isMobile ? 0.3 : 0.55,

                        stagger: {
                          each: isMobile ? 0.01 : 0.03,
                          from: "end",
                        },

                        ease: "power2.in",
                      }
                    );
                  }

                  /*
                   * VIDEO EXIT
                   */

                  if (butterfly) {
                    const exitX =
                      index === 0
                        ? isMobile
                          ? 40
                          : 100
                        : isMobile
                          ? -40
                          : -105;

                    const exitY =
                      index === 0
                        ? isMobile
                          ? -25
                          : -50
                        : isMobile
                          ? 20
                          : 50;

                    timeline.to(
                      butterfly,
                      {
                        opacity: 0,
                        scale: isMobile ? 0.86 : 0.78,
                        x: exitX,
                        y: exitY,

                        ...(useBlur && {
                          filter: "blur(10px)",
                        }),

                        duration: isMobile ? 0.35 : 0.55,
                        ease: "power2.inOut",
                      },
                      "<"
                    );
                  }

                  /*
                   * DESCRIPTION EXIT
                   */

                  if (description.length) {
                    timeline.to(
                      description,
                      {
                        opacity: 0,
                        y: isMobile ? -8 : -12,

                        ...(useBlur && {
                          filter: "blur(5px)",
                        }),

                        duration: isMobile ? 0.22 : 0.35,
                      },
                      "<"
                    );
                  }

                  /*
                   * BUTTON EXIT
                   */

                  if (button) {
                    timeline.to(
                      button,
                      {
                        opacity: 0,
                        y: isMobile ? -8 : -12,

                        ...(useBlur && {
                          filter: "blur(5px)",
                        }),

                        duration: isMobile ? 0.22 : 0.35,
                      },
                      "<"
                    );
                  }

                  /*
                   * HIDE CURRENT SERVICE
                   */

                  timeline.set(item, {
                    autoAlpha: 0,
                    zIndex: 1,
                  });
                }
              }
            );

            /*
             * -------------------------------------------------------
             * LAST SERVICE
             * -------------------------------------------------------
             */

            const lastItem = services.at(-1)?.item;

            if (lastItem) {
              timeline.set(lastItem, {
                autoAlpha: 1,
                zIndex: 20,
              });
            }

            /*
             * -------------------------------------------------------
             * CLEANUP
             * -------------------------------------------------------
             */

            return () => {
              timeline.scrollTrigger?.kill();
              timeline.kill();
            };
          }
        );

        /*
         * ---------------------------------------------------------
         * INITIAL REFRESH
         * ---------------------------------------------------------
         */

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        });
      }, root);
    };

    /*
     * Give React/browser one frame to finish layout.
     */
    setupTimer = window.setTimeout(setup, 50);

    return () => {
      if (setupTimer !== null) {
        window.clearTimeout(setupTimer);
      }

      context?.revert();
    };
  }, []);

  return {
    rootRef,
    itemRefs,
    videoRefs,
    highlightRef,
  };
}


