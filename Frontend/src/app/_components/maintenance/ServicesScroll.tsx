"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ServiceCard = {
  title: string;
  desc: string;
  video?: string;
  image?: string;
};

type ServicesScrollProps = {
  cards: ServiceCard[];
};

export default function ServicesScroll({
  cards,
}: ServicesScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaItemsRef = useRef<HTMLDivElement[]>([]);
  const textItemsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);

  const setMediaRef = (
    element: HTMLDivElement | null,
    index: number
  ) => {
    if (element) {
      mediaItemsRef.current[index] = element;
    }
  };

  const setTextRef = (
    element: HTMLDivElement | null,
    index: number
  ) => {
    if (element) {
      textItemsRef.current[index] = element;
    }
  };

  useLayoutEffect(() => {
    if (!sectionRef.current || !cards.length) return;

    const section = sectionRef.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
    const mediaItems = mediaItemsRef.current;
    const textItems = textItemsRef.current;

    if (!mediaItems.length || !textItems.length) return;

    /*
     * -----------------------------------------
     * INITIAL STATE
     * -----------------------------------------
     */

    gsap.set(mediaItems, {
      clipPath: "inset(0% 0% 0% 0%)",
    });

    gsap.set(mediaItems.slice(1), {
      clipPath: "inset(100% 0% 0% 0%)",
    });

    gsap.set(textItems, {
      opacity: 0,
      y: 25,
    });

    const firstText = textItems[0];

    if (firstText) {
      gsap.set(firstText, {
        opacity: 1,
        y: 0,
      });
    }

    /*
     * -----------------------------------------
     * SCROLL TIMELINE
     * -----------------------------------------
     */

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,

        start: "top top",

        end: () =>
          `+=${cards.length * window.innerHeight * 0.85}`,

        scrub: 1,

        pin: true,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          const activeIndex = Math.min(
            cards.length - 1,
            Math.floor(progress * cards.length)
          );

          const percentage = Math.round(
            ((activeIndex + 1) / cards.length) * 100
          );

          if (progressRef.current) {
            progressRef.current.style.width = `${percentage}%`;
          }

          if (numberRef.current) {
            numberRef.current.textContent = String(
              activeIndex + 1
            ).padStart(2, "0");
          }
        },
      },
    });

    /*
     * -----------------------------------------
     * CARD TRANSITIONS
     * -----------------------------------------
     */

    cards.forEach((_, index) => {
      if (index === 0) return;

      const previousMedia = mediaItems[index - 1];
      const currentMedia = mediaItems[index];

      const previousText = textItems[index - 1];
      const currentText = textItems[index];

      // With noUncheckedIndexedAccess enabled, array[index]
      // can be undefined. Make sure every DOM node exists
      // before passing it to GSAP.
      if (
        !previousMedia ||
        !currentMedia ||
        !previousText ||
        !currentText
      ) {
        return;
      }

      timeline
        .to(
          previousMedia,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            ease: "power3.inOut",
            duration: 1,
          },
          index - 0.15
        )
        .to(
          currentMedia,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power3.inOut",
            duration: 1,
          },
          "<"
        )
        .to(
          previousText,
          {
            opacity: 0,
            y: -25,
            ease: "power2.inOut",
            duration: 0.45,
          },
          index - 0.05
        )
        .fromTo(
          currentText,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.55,
          },
          "<0.2"
        );
    });

    /*
     * -----------------------------------------
     * REFRESH
     * -----------------------------------------
     */

    let resizeFrame = 0;

    const refresh = () => {
      cancelAnimationFrame(resizeFrame);

      resizeFrame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(refresh);
    });

    const resizeObserver = new ResizeObserver(() => {
      refresh();
    });

    resizeObserver.observe(section);

    window.addEventListener("resize", refresh);

    return () => {
      cancelAnimationFrame(resizeFrame);

      resizeObserver.disconnect();

      window.removeEventListener("resize", refresh);
    };
    });

    return () => {
      mm.revert();
    };
  }, [cards]);

  if (!cards.length) return null;

  return (
    <>
      {/* =====================================================
          DESKTOP / TABLET
      ====================================================== */}

      <section
        ref={sectionRef}
        className="
          relative
          hidden
          min-h-screen
          w-full
          overflow-hidden
          min-[992px]:block
        "
      >
        <div
          className="
            mx-auto
            flex
            h-screen
            w-full
            max-w-[1600px]
            items-center
            px-8
            xl:px-14
            2xl:px-20
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              relative
              flex
              h-full
              w-[42%]
              flex-col
              justify-center
              pr-12
              xl:pr-20
            "
          >
            {/* Small heading */}

            <div className="mb-8 flex items-center gap-4">
              <span
                className="
                  h-px
                  w-10
                  bg-[#19183A]/30
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#19183A]/50
                "
              >
                Our Services
              </span>
            </div>

            {/* =================================================
                TEXT STACK
            ================================================= */}

            <div className="relative min-h-[330px] w-full">
              {cards.map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                  ref={(element) =>
                    setTextRef(element, index)
                  }
                  className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    justify-center
                  "
                >
                  {/* Number */}

                  <div className="mb-7 flex items-center gap-4">
                    <span
                      className="
                        text-[11px]
                        font-medium
                        tracking-[0.2em]
                        text-[#19183A]/40
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="h-px w-16 bg-[#19183A]/10" />
                  </div>

                  {/* Title */}

                  <h2
                    className="
                      max-w-[600px]
                      text-4xl
                      font-semibold
                      uppercase
                      leading-[0.95]
                      tracking-[-0.04em]
                      text-[#19183A]

                      xl:text-6xl

                      2xl:text-7xl
                    "
                  >
                    {card.title}
                  </h2>

                  {/* Description */}

                  <p
                    className="
                      mt-8
                      max-w-[470px]
                      text-sm
                      font-light
                      leading-7
                      text-[#19183A]/60

                      xl:text-base
                      xl:leading-8
                    "
                  >
                    {card.desc}
                  </p>

                  {/* Explore */}

                  <div
                    className="
                      mt-10
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <span
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#19183A]/20
                        text-[#19183A]
                      "
                    >
                      ↗
                    </span>

                    <span
                      className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-[#19183A]
                      "
                    >
                      Explore service
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* =================================================
                PROGRESS
            ================================================= */}

            <div
              className="
                absolute
                bottom-12
                left-8
                right-12
                xl:left-14
                2xl:left-20
              "
            >
              <div
                className="
                  mb-3
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[#19183A]/40
                  "
                >
                  Services
                </span>

                <span
                  className="
                    text-[10px]
                    tracking-[0.2em]
                    text-[#19183A]/50
                  "
                >
                  <span ref={numberRef}>01</span>
                  {" / "}
                  {String(cards.length).padStart(2, "0")}
                </span>
              </div>

              <div
                className="
                  h-[2px]
                  w-full
                  overflow-hidden
                  bg-[#19183A]/10
                "
              >
                <div
                  ref={progressRef}
                  className="
                    h-full
                    w-0
                    bg-[#19183A]
                  "
                />
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT MEDIA
          ================================================= */}

          <div
            className="
              relative
              h-[72vh]
              w-[58%]
              overflow-hidden
              bg-[#e9e9e6]
            "
          >
            {cards.map((card, index) => (
              <div
                key={`${card.title}-media-${index}`}
                ref={(element) =>
                  setMediaRef(element, index)
                }
                className="
                  absolute
                  inset-0
                  overflow-hidden
                "
              >
                {card.video ? (
                  <video
                    src={card.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <div className="h-full w-full bg-[#e9e9e6]" />
                )}

                {/* Media overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-black/[0.04]
                  "
                />

                {/* Media number */}

                <span
                  className="
                    absolute
                    right-6
                    top-6
                    z-10
                    border
                    border-white/20
                    bg-black/20
                    px-3
                    py-2
                    text-[9px]
                    tracking-[0.2em]
                    text-white/80
                    backdrop-blur-md
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MOBILE
          Simple / Smooth / No Sticky Scroll
      ====================================================== */}

      <section
        className="
          block
          w-full
          px-1
          py-5
          min-[992px]:hidden
        "
      >
        {/* Heading */}

        <div className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#19183A]/30" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-[#19183A]/50
              "
            >
              Our Services
            </span>
          </div>

          <h2
            className="
              max-w-[500px]
              text-4xl
              font-semibold
              uppercase
              leading-[0.95]
              tracking-[-0.04em]
              text-[#19183A]
            "
          >
            What we do
          </h2>
        </div>

        {/* =================================================
            MOBILE CARDS
        ================================================= */}

        <div className="space-y-16">
          {cards.map((card, index) => (
            <article
              key={`${card.title}-mobile-${index}`}
              className="w-full"
            >
              {/* Media */}

              <div
                className="
                  relative
                  aspect-[4/3]
                  w-full
                  overflow-hidden
                "
              >
                {card.video ? (
                  <video
                    src={card.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : null}

                <span
                  className="
                    absolute
                    left-4
                    top-4
                    border
                    border-white/20
                    bg-black/20
                    px-3
                    py-2
                    text-[9px]
                    tracking-[0.2em]
                    text-white/80
                    backdrop-blur-md
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Text */}

              <div className="pt-5">
                <div className="mb-4 h-px w-full bg-[#19183A]/15" />

                <h3
                  className="
                    text-xl
                    font-semibold
                    uppercase
                    leading-tight
                    tracking-[-0.02em]
                    text-[#19183A]
                  "
                >
                  {card.title}
                </h3>

                <p
                  className="
                    mt-4
                    max-w-[550px]
                    text-sm
                    font-light
                    leading-6
                    text-[#19183A]/60
                  "
                >
                  {card.desc}
                </p>

                {/* <div className="mt-6 flex items-center gap-3">
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#19183A]/20
                      text-sm
                      text-[#19183A]
                    "
                  >
                    ↗
                  </span>

                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-[#19183A]/60
                    "
                  >
                    Explore service
                  </span>
                </div> */}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}