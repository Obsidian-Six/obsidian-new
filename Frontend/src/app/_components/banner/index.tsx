// "use client";

// import type React from "react";
// import {
// useCallback,
// useLayoutEffect,
// useRef,
// useState,
// } from "react";
// import { usePathname } from "next/navigation";
// import { Volume2, VolumeX } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./css/banner.css";

// gsap.registerPlugin(ScrollTrigger);

// const BannerVideo =
// "/newContent/downloadmedia-20260912 (1).mp4";

// const Banner = (): React.JSX.Element => {
// const pathname = usePathname();

// const bannerRef = useRef<HTMLDivElement | null>(null);
// const videoRef = useRef<HTMLVideoElement | null>(null);
// const buttonRef = useRef<HTMLButtonElement | null>(null);

// const [isMuted, setIsMuted] = useState(true);

// /*

// * ============================================================
// * CURSOR
// * ============================================================
//   */

// const target = useRef({
// x: 0,
// y: 0,
// });

// const current = useRef({
// x: 0,
// y: 0,
// });

// const isInside = useRef(false);

// /*

// * ============================================================
// * DESKTOP CHECK
// * ============================================================
// *
// * Desktop cursor animation is ONLY enabled when:
// *
// * 1. viewport is 991px+
// * 2. device supports hover
// * 3. pointer is fine
// *
// * This means resizing the browser also changes the behavior.
// * ============================================================
//   */

// const isDesktop = useCallback(() => {
// if (typeof window === "undefined") {
// return false;
// }


// return (
//   window.innerWidth >= 991 &&
//   window.matchMedia("(hover: hover) and (pointer: fine)").matches
// );


// }, []);

// /*

// * ============================================================
// * BANNER SCROLL ANIMATION
// * ============================================================
//   */

// useLayoutEffect(() => {
// const banner = bannerRef.current;


// if (!banner) {
//   return;
// }

// let refreshRaf1 = 0;
// let refreshRaf2 = 0;
// let refreshTimeout = 0;

// const ctx = gsap.context(() => {
//   const mm = gsap.matchMedia();

//   /*
//    * --------------------------------------------------------
//    * DESKTOP
//    * --------------------------------------------------------
//    */

//   mm.add("(min-width: 991px)", () => {
//     gsap.set(banner, {
//       scale: 0.6,
//       transformOrigin: "center center",
//       force3D: true,
//       willChange: "transform",
//     });

//     gsap.to(banner, {
//       scale: 1,
//       ease: "none",

//       scrollTrigger: {
//         trigger: banner,

//         start: "top bottom",
//         end: "top 15%",

//         scrub: 0.8,

//         invalidateOnRefresh: true,

//         onRefresh: () => {
//           if (!banner.isConnected) {
//             return;
//           }

//           gsap.set(banner, {
//             transformOrigin: "center center",
//           });
//         },
//       },
//     });

//     refreshRaf1 = requestAnimationFrame(() => {
//       refreshRaf2 = requestAnimationFrame(() => {
//         if (banner.isConnected) {
//           ScrollTrigger.refresh();
//         }
//       });
//     });

//     refreshTimeout = window.setTimeout(() => {
//       if (banner.isConnected) {
//         ScrollTrigger.refresh();
//       }
//     }, 300);
//   });

//   /*
//    * --------------------------------------------------------
//    * MOBILE / TABLET
//    * --------------------------------------------------------
//    *
//    * No banner scaling animation below 991px.
//    * ========================================================
//    */

//   mm.add("(max-width: 990px)", () => {
//     gsap.set(banner, {
//       scale: 1,
//       clearProps: "willChange",
//     });
//   });

//   return () => {
//     mm.revert();
//   };
// }, banner);

// /*
//  * ----------------------------------------------------------
//  * CLEANUP
//  * ----------------------------------------------------------
//  */

// return () => {
//   cancelAnimationFrame(refreshRaf1);
//   cancelAnimationFrame(refreshRaf2);
//   window.clearTimeout(refreshTimeout);

//   ctx.revert();

//   /*
//    * Kill ONLY triggers belonging to this banner.
//    */

//   ScrollTrigger.getAll().forEach((trigger) => {
//     const triggerElement = trigger.trigger;

//     if (
//       triggerElement === banner ||
//       (triggerElement instanceof Element &&
//         banner.contains(triggerElement))
//     ) {
//       trigger.kill();
//     }
//   });

//   requestAnimationFrame(() => {
//     if (document.body) {
//       ScrollTrigger.refresh();
//     }
//   });
// };


// }, [pathname]);

// /*

// * ============================================================
// * CURSOR / MOBILE BUTTON RESPONSIVE BEHAVIOR
// * ============================================================
// *
// * Desktop >= 991px:
// * * Button follows mouse
// * * Button appears on mouse enter
// * * Button disappears on mouse leave
// *
// * Mobile / Tablet <= 990px:
// * * Mouse animation completely disabled
// * * Button always visible
// * * Button stays at bottom
// *
// * The resize listener makes this work when resizing the
// * browser window live.
// * ============================================================
//   */

// useLayoutEffect(() => {
// const button = buttonRef.current;


// if (!button) {
//   return;
// }

// const updateResponsiveButton = () => {
//   const desktop = isDesktop();

//   /*
//    * --------------------------------------------------------
//    * MOBILE / TABLET
//    * --------------------------------------------------------
//    */

//   if (!desktop) {
//     isInside.current = false;

//     target.current.x = 0;
//     target.current.y = 0;

//     current.current.x = 0;
//     current.current.y = 0;

//     gsap.killTweensOf(button);

//     gsap.set(button, {
//       x: 0,
//       y: 0,
//       xPercent: 0,
//       yPercent: 0,
//       autoAlpha: 1,
//       clearProps: "willChange",
//     });

//     return;
//   }

//   /*
//    * --------------------------------------------------------
//    * DESKTOP
//    * --------------------------------------------------------
//    */

//   gsap.killTweensOf(button);

//   gsap.set(button, {
//     xPercent: -50,
//     yPercent: -50,
//     x: current.current.x,
//     y: current.current.y,
//     autoAlpha: isInside.current ? 1 : 0,
//     force3D: true,
//     willChange: "transform, opacity",
//   });
// };

// /*
//  * Initial state.
//  */

// updateResponsiveButton();

// /*
//  * Resize listener.
//  *
//  * This is important because simply calling isDesktop()
//  * inside mouse events does not reinitialize the animation
//  * when the browser changes from desktop to mobile width.
//  */

// const handleResize = () => {
//   updateResponsiveButton();
// };

// window.addEventListener("resize", handleResize);

// /*
//  * Also listen to viewport media-query changes.
//  */

// const mediaQuery = window.matchMedia(
//   "(hover: hover) and (pointer: fine)"
// );

// const handleMediaChange = () => {
//   updateResponsiveButton();
// };

// if (mediaQuery.addEventListener) {
//   mediaQuery.addEventListener("change", handleMediaChange);
// } else {
//   mediaQuery.addListener(handleMediaChange);
// }

// /*
//  * LERP cursor animation.
//  */

// const updateCursor = () => {
//   /*
//    * Never run the mouse-follow animation below 991px.
//    */

//   if (!isDesktop()) {
//     return;
//   }

//   if (
//     !isInside.current &&
//     Math.abs(current.current.x) < 0.1 &&
//     Math.abs(current.current.y) < 0.1 &&
//     Math.abs(target.current.x) < 0.1 &&
//     Math.abs(target.current.y) < 0.1
//   ) {
//     return;
//   }

//   const lerp = 0.12;

//   current.current.x +=
//     (target.current.x - current.current.x) * lerp;

//   current.current.y +=
//     (target.current.y - current.current.y) * lerp;

//   gsap.set(button, {
//     x: current.current.x,
//     y: current.current.y,
//   });
// };

// gsap.ticker.add(updateCursor);

// /*
//  * Cleanup.
//  */

// return () => {
//   window.removeEventListener("resize", handleResize);

//   if (mediaQuery.removeEventListener) {
//     mediaQuery.removeEventListener(
//       "change",
//       handleMediaChange
//     );
//   } else {
//     mediaQuery.removeListener(handleMediaChange);
//   }

//   gsap.ticker.remove(updateCursor);
//   gsap.killTweensOf(button);

//   gsap.set(button, {
//     x: 0,
//     y: 0,
//     autoAlpha: 0,
//   });
// };


// }, [pathname, isDesktop]);

// /*

// * ============================================================
// * MOUSE ENTER
// * ============================================================
//   */

// const handleMouseEnter = (
// e: React.MouseEvent<HTMLDivElement>
// ) => {
// /*
// * Completely disable mouse animation below 991px.
// */


// if (!isDesktop()) {
//   return;
// }

// const banner = bannerRef.current;
// const button = buttonRef.current;

// if (!banner || !button) {
//   return;
// }

// const rect = banner.getBoundingClientRect();

// target.current.x =
//   e.clientX -
//   (rect.left + rect.width / 2);

// target.current.y =
//   e.clientY -
//   (rect.top + rect.height / 2);

// current.current.x = 0;
// current.current.y = 0;

// isInside.current = true;

// gsap.killTweensOf(button);

// gsap.to(button, {
//   autoAlpha: 1,
//   duration: 0.25,
//   ease: "power2.out",
//   overwrite: true,
// });


// };

// /*

// * ============================================================
// * MOUSE MOVE
// * ============================================================
//   */

// const handleMouseMove = (
// e: React.MouseEvent<HTMLDivElement>
// ) => {
// /*
// * Completely disable mouse animation below 991px.
// */


// if (!isDesktop()) {
//   return;
// }

// const banner = bannerRef.current;

// if (!banner) {
//   return;
// }

// const rect = banner.getBoundingClientRect();

// target.current.x =
//   e.clientX -
//   (rect.left + rect.width / 2);

// target.current.y =
//   e.clientY -
//   (rect.top + rect.height / 2);


// };

// /*

// * ============================================================
// * MOUSE LEAVE
// * ============================================================
//   */

// const handleMouseLeave = () => {
// /*
// * On mobile/tablet this function does absolutely nothing.
// * The button must remain visible.
// */


// if (!isDesktop()) {
//   return;
// }

// const button = buttonRef.current;

// isInside.current = false;

// target.current.x = 0;
// target.current.y = 0;

// if (!button) {
//   return;
// }

// gsap.killTweensOf(button);

// gsap.to(button, {
//   autoAlpha: 0,
//   duration: 0.3,
//   delay: 0.12,
//   ease: "power2.out",
//   overwrite: true,
// });


// };

// /*

// * ============================================================
// * SOUND
// * ============================================================
//   */

// const toggleSound = async (
// e: React.MouseEvent<HTMLButtonElement>
// ) => {
// e.stopPropagation();


// const video = videoRef.current;

// if (!video) {
//   return;
// }

// const nextMuted = !video.muted;

// video.muted = nextMuted;

// setIsMuted(nextMuted);

// /*
//  * Safari / iOS
//  */

// if (!nextMuted) {
//   try {
//     await video.play();
//   } catch {
//     /*
//      * Browser can reject playback depending on
//      * autoplay/user interaction rules.
//      */
//   }
// }


// };

// /*

// * ============================================================
// * VIDEO PLAY AFTER ROUTE CHANGE
// * ============================================================
//   */

// useLayoutEffect(() => {
// const video = videoRef.current;


// if (!video) {
//   return;
// }

// const playVideo = async () => {
//   try {
//     video.muted = true;
//     setIsMuted(true);

//     await video.play();
//   } catch {
//     /*
//      * Autoplay may be blocked by the browser.
//      */
//   }
// };

// const raf = requestAnimationFrame(() => {
//   playVideo();
// });

// return () => {
//   cancelAnimationFrame(raf);
// };


// }, [pathname]);

// /*

// * ============================================================
// * JSX
// * ============================================================
//   */

// return ( <div
//    ref={bannerRef}
//    className="banner-video"
//    onMouseEnter={handleMouseEnter}
//    onMouseMove={handleMouseMove}
//    onMouseLeave={handleMouseLeave}
//  >
// {/*
// * VIDEO
// */}


//   <video
//     ref={videoRef}
//     className="banner-video__media"
//     autoPlay
//     loop
//     muted
//     playsInline
//     preload="metadata"
//     src={BannerVideo}
//   />

//   {/*
//    * SOUND BUTTON
//    */}

//   <button
//     ref={buttonRef}
//     type="button"
//     className="banner-sound-button"
//     onClick={toggleSound}
//     aria-label={
//       isMuted
//         ? "Turn video sound on"
//         : "Turn video sound off"
//     }
//     aria-pressed={!isMuted}
//   >
//     {isMuted ? (
//       <VolumeX
//         size={20}
//         strokeWidth={1.8}
//         aria-hidden="true"
//       />
//     ) : (
//       <Volume2
//         size={20}
//         strokeWidth={1.8}
//         aria-hidden="true"
//       />
//     )}
//   </button>
// </div>


// );
// };

// export default Banner;


"use client";

import type React from "react";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./css/banner.css";

gsap.registerPlugin(ScrollTrigger);

const BannerVideo =
  "/newContent/downloadmedia-20260912 (1).mp4";

const Banner = (): React.JSX.Element => {
  const pathname = usePathname();

  const bannerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isMuted, setIsMuted] = useState(true);

  /* ============================================================
   * CURSOR
   * ============================================================ */

  const target = useRef({
    x: 0,
    y: 0,
  });

  const current = useRef({
    x: 0,
    y: 0,
  });

  const isInside = useRef(false);

  /* ============================================================
   * DESKTOP CHECK
   * ============================================================ */

  const isDesktop = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.innerWidth >= 991 &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  /* ============================================================
   * BANNER SCROLL ANIMATION
   *
   * IMPORTANT:
   * This effect runs again whenever pathname changes.
   * This makes Home -> Other -> Home initialize GSAP again.
   * ============================================================ */

  useLayoutEffect(() => {
    const banner = bannerRef.current;
    const video = videoRef.current;

    if (!banner) {
      return;
    }

    let refreshRaf1 = 0;
    let refreshRaf2 = 0;
    let refreshRaf3 = 0;
    let refreshTimeout = 0;

    let destroyed = false;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ---------------------------------------------------------
       * DESKTOP
       * --------------------------------------------------------- */

      mm.add("(min-width: 991px)", () => {
        if (destroyed) {
          return;
        }

        gsap.set(banner, {
          scale: 0.6,
          transformOrigin: "50% 50%",
          force3D: true,
          willChange: "transform",
        });

        gsap.to(banner, {
          scale: 1,
          ease: "none",

          scrollTrigger: {
            trigger: banner,

            start: "top bottom",
            end: "top 15%",

            scrub: 0.8,

            invalidateOnRefresh: true,

            anticipatePin: 1,

            onRefresh: () => {
              if (destroyed || !banner.isConnected) {
                return;
              }

              gsap.set(banner, {
                transformOrigin: "50% 50%",
              });
            },
          },
        });
      });

      /* ---------------------------------------------------------
       * MOBILE / TABLET
       * --------------------------------------------------------- */

      mm.add("(max-width: 990px)", () => {
        if (destroyed) {
          return;
        }

        gsap.set(banner, {
          scale: 1,
          transformOrigin: "50% 50%",
          clearProps: "willChange",
        });
      });

      /*
       * --------------------------------------------------------
       * ROUTE CHANGE REFRESH
       *
       * The important part is that we wait for several browser
       * paint cycles before refreshing ScrollTrigger.
       * --------------------------------------------------------
       */

      const refresh = () => {
        if (destroyed || !banner.isConnected) {
          return;
        }

        ScrollTrigger.refresh();
      };

      refreshRaf1 = requestAnimationFrame(() => {
        refreshRaf2 = requestAnimationFrame(() => {
          refreshRaf3 = requestAnimationFrame(() => {
            refresh();
          });
        });
      });

      /*
       * Extra refresh after the browser has finished layout.
       */

      refreshTimeout = window.setTimeout(() => {
        refresh();
      }, 500);

      /*
       * Video dimensions can change after navigation.
       * Refresh again when metadata is ready.
       */

      if (video) {
        const handleLoadedMetadata = () => {
          refresh();
        };

        const handleLoadedData = () => {
          refresh();
        };

        video.addEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );

        video.addEventListener(
          "loadeddata",
          handleLoadedData
        );

        return () => {
          video.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );

          video.removeEventListener(
            "loadeddata",
            handleLoadedData
          );

          mm.revert();
        };
      }

      return () => {
        mm.revert();
      };
    }, banner);

    /* ---------------------------------------------------------
     * CLEANUP
     * --------------------------------------------------------- */

    return () => {
      destroyed = true;

      cancelAnimationFrame(refreshRaf1);
      cancelAnimationFrame(refreshRaf2);
      cancelAnimationFrame(refreshRaf3);

      window.clearTimeout(refreshTimeout);

      /*
       * ctx.revert() automatically removes the ScrollTriggers
       * created inside this context.
       *
       * Do NOT loop through ScrollTrigger.getAll() here.
       */

      ctx.revert();
    };
  }, [pathname]);

  /* ============================================================
   * CURSOR / MOBILE BUTTON RESPONSIVE BEHAVIOR
   * ============================================================ */

  useLayoutEffect(() => {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    const updateResponsiveButton = () => {
      const desktop = isDesktop();

      /* ---------------------------------------------------------
       * MOBILE / TABLET
       * --------------------------------------------------------- */

      if (!desktop) {
        isInside.current = false;

        target.current.x = 0;
        target.current.y = 0;

        current.current.x = 0;
        current.current.y = 0;

        gsap.killTweensOf(button);

        gsap.set(button, {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          autoAlpha: 1,
          force3D: false,
          clearProps: "willChange",
        });

        return;
      }

      /* ---------------------------------------------------------
       * DESKTOP
       * --------------------------------------------------------- */

      gsap.killTweensOf(button);

      gsap.set(button, {
        xPercent: -50,
        yPercent: -50,
        x: current.current.x,
        y: current.current.y,
        autoAlpha: isInside.current ? 1 : 0,
        force3D: true,
        willChange: "transform, opacity",
      });
    };

    /*
     * Initial setup.
     */

    updateResponsiveButton();

    /*
     * Browser resize.
     */

    const handleResize = () => {
      updateResponsiveButton();

      /*
       * Let layout settle before ScrollTrigger measures again.
       */

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    window.addEventListener("resize", handleResize);

    /*
     * Pointer capability change.
     */

    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const handleMediaChange = () => {
      updateResponsiveButton();
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener(
        "change",
        handleMediaChange
      );
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    /* ---------------------------------------------------------
     * LERP CURSOR
     * --------------------------------------------------------- */

    const updateCursor = () => {
      /*
       * Completely disabled below 991px.
       */

      if (!isDesktop()) {
        return;
      }

      /*
       * Don't run unnecessary updates when cursor is outside.
       */

      if (
        !isInside.current &&
        Math.abs(current.current.x) < 0.1 &&
        Math.abs(current.current.y) < 0.1 &&
        Math.abs(target.current.x) < 0.1 &&
        Math.abs(target.current.y) < 0.1
      ) {
        return;
      }

      const lerp = 0.12;

      current.current.x +=
        (target.current.x - current.current.x) * lerp;

      current.current.y +=
        (target.current.y - current.current.y) * lerp;

      gsap.set(button, {
        x: current.current.x,
        y: current.current.y,
      });
    };

    gsap.ticker.add(updateCursor);

    /* ---------------------------------------------------------
     * CLEANUP
     * --------------------------------------------------------- */

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener(
          "change",
          handleMediaChange
        );
      } else {
        mediaQuery.removeListener(
          handleMediaChange
        );
      }

      gsap.ticker.remove(updateCursor);

      gsap.killTweensOf(button);

      gsap.set(button, {
        x: 0,
        y: 0,
        autoAlpha: 0,
      });
    };
  }, [pathname, isDesktop]);

  /* ============================================================
   * MOUSE ENTER
   * ============================================================ */

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    /*
     * Disabled below 991px.
     */

    if (!isDesktop()) {
      return;
    }

    const banner = bannerRef.current;
    const button = buttonRef.current;

    if (!banner || !button) {
      return;
    }

    const rect = banner.getBoundingClientRect();

    target.current.x =
      e.clientX -
      (rect.left + rect.width / 2);

    target.current.y =
      e.clientY -
      (rect.top + rect.height / 2);

    current.current.x = 0;
    current.current.y = 0;

    isInside.current = true;

    gsap.killTweensOf(button);

    gsap.to(button, {
      autoAlpha: 1,
      duration: 0.25,
      ease: "power2.out",
      overwrite: true,
    });
  };

  /* ============================================================
   * MOUSE MOVE
   * ============================================================ */

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isDesktop()) {
      return;
    }

    const banner = bannerRef.current;

    if (!banner) {
      return;
    }

    const rect = banner.getBoundingClientRect();

    target.current.x =
      e.clientX -
      (rect.left + rect.width / 2);

    target.current.y =
      e.clientY -
      (rect.top + rect.height / 2);
  };

  /* ============================================================
   * MOUSE LEAVE
   * ============================================================ */

  const handleMouseLeave = () => {
    /*
     * On mobile/tablet do absolutely nothing.
     */

    if (!isDesktop()) {
      return;
    }

    const button = buttonRef.current;

    isInside.current = false;

    target.current.x = 0;
    target.current.y = 0;

    if (!button) {
      return;
    }

    gsap.killTweensOf(button);

    gsap.to(button, {
      autoAlpha: 0,
      duration: 0.3,
      delay: 0.12,
      ease: "power2.out",
      overwrite: true,
    });
  };

  /* ============================================================
   * SOUND
   * ============================================================ */

  const toggleSound = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextMuted = !video.muted;

    video.muted = nextMuted;

    setIsMuted(nextMuted);

    /*
     * Safari / iOS
     */

    if (!nextMuted) {
      try {
        await video.play();
      } catch {
        /*
         * Browser can reject playback depending on
         * autoplay/user interaction rules.
         */
      }
    }
  };

  /* ============================================================
   * VIDEO PLAY AFTER ROUTE CHANGE
   * ============================================================ */

  useLayoutEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    let cancelled = false;

    const playVideo = async () => {
      if (cancelled) {
        return;
      }

      try {
        video.muted = true;

        setIsMuted(true);

        await video.play();
      } catch {
        /*
         * Autoplay may be blocked by browser.
         */
      }
    };

    /*
     * Wait for the new route DOM to paint.
     */

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        playVideo();
      });
    });

    return () => {
      cancelled = true;

      cancelAnimationFrame(raf1);
    };
  }, [pathname]);

  /* ============================================================
   * JSX
   * ============================================================ */

  return (
    <div
      ref={bannerRef}
      className="banner-video"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* VIDEO */}

      <video
        ref={videoRef}
        className="banner-video__media"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        src={BannerVideo}
      />

      {/* SOUND BUTTON */}

      <button
        ref={buttonRef}
        type="button"
        className="banner-sound-button"
        onClick={toggleSound}
        aria-label={
          isMuted
            ? "Turn video sound on"
            : "Turn video sound off"
        }
        aria-pressed={!isMuted}
      >
        {isMuted ? (
          <VolumeX
            size={20}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        ) : (
          <Volume2
            size={20}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
};

export default Banner;


