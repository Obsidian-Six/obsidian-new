"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";
import ParallaxMedia from "@/app/_components/ui/ParallaxMedia";
import ParallaxText from "@/app/_components/ui/ParallaxText";

export default function HeroCase({
  ele,
}: {
  ele: TemplateCaseStudy;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    document
      .getElementById("case-study-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const heroMedia =
    ele.heroVideo && ele.heroVideo.length > 0
      ? ele.heroVideo
      : ele.heroImage;

  const heroMediaType =
    ele.heroVideo && ele.heroVideo.length > 0
      ? "video"
      : "image";

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-[#0a0a0b]"
    >
      {/* =====================================================
          HERO / PARALLAX MEDIA
      ====================================================== */}
      <div className="relative flex h-screen w-full items-center justify-center perspective-1000">
        <ParallaxMedia
          type={heroMediaType}
          src={heroMedia}
          alt={ele.name || "Case Study Hero"}
          speed={14}
          priority
          className="absolute inset-0"
          imageClassName="opacity-60 brightness-75"
        />

        {/* =====================================================
            SCROLL INDICATOR
        ====================================================== */}
        <motion.button
          type="button"
          onClick={scrollToNextSection}
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          aria-label="Explore case study"
          className="
            absolute
            bottom-6
            left-1/2
            z-20
            flex
            -translate-x-1/2
            flex-col
            items-center
            text-white/50
            transition-colors
            hover:text-white
          "
        >
          <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em]">
            Explore
          </span>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              backdrop-blur-md
            "
          >
            <FaArrowDown
              size={12}
              aria-hidden="true"
            />
          </div>
        </motion.button>
      </div>

      {/* =====================================================
          DATA / OVERVIEW SECTION
      ====================================================== */}
      <section
        id="case-study-section"
        className="relative z-20 bg-white py-12 md:py-16"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-16">
          {/* Section Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mb-8 flex items-center gap-6"
          >
            <div className="h-[1px] w-12 bg-black" />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.4em]
                text-black
              "
            >
              Overview
            </span>
          </motion.div>

          {/* =================================================
              CONTENT GRID
          ================================================== */}
          <div className="grid items-start gap-5 gap-y-8">
            {/* =================================================
                LEFT SIDE — HEADLINE
            ================================================== */}
            <motion.div
              className="lg:col-span-5"
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <ParallaxText
                speed={20}
                className="
                  text-4xl
                  font-light
                  leading-[1.1]
                  tracking-tighter
                  text-black
                  md:text-5xl
                  lg:text-5xl
                "
              >
                {ele.caseSection.data}

                <span
                  className="
                    mt-4
                    block
                    font-serif
                    text-3xl
                    italic
                    text-black/20
                    md:text-5xl
                  "
                >
                  {ele.caseSection.highlight}
                </span>
              </ParallaxText>
            </motion.div>

            {/* =================================================
                RIGHT SIDE — NARRATIVE
            ================================================== */}
            <motion.div
              className="space-y-8 lg:col-span-6 lg:col-start-6"
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
            >
              <ParallaxText speed={20}>
                <p
                  className="
                    font-inter
                    text-xl
                    font-light
                    leading-relaxed
                    text-black/50
                    md:text-2xl
                  "
                >
                  {ele.overview}
                </p>
              </ParallaxText>

              {/* Project Details */}
              <div
                className="
                  relative
                  flex
                  justify-between
                  border-t
                  border-black/5
                  pt-6
                "
              >
                {/* Timeline */}
                <div className="space-y-1">
                  <p
                    className="
                      font-serif
                      text-2xl
                      font-bold
                      italic
                      tracking-tighter
                      text-black
                    "
                  >
                    2026
                  </p>

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-black/30
                    "
                  >
                    Timeline
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-1 text-right">
                  <p
                    className="
                      font-serif
                      text-2xl
                      font-bold
                      italic
                      tracking-tighter
                      text-black
                    "
                  >
                    Strategy
                  </p>

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-black/30
                    "
                  >
                    Category
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CINEMATIC OVERVIEW VIDEO
      ====================================================== */}
      {ele.overviewVideo && ele.overviewVideo.length > 0 && (
        <section
          className="
            relative
            h-[80vh]
            w-full
            overflow-hidden
            bg-black
            md:h-[90vh]
          "
        >
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="relative h-full w-full"
          >
            <video
              src={ele.overviewVideo}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Project Branding */}
            <div className="absolute bottom-8 left-6 z-10 md:left-16">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.5em]
                  text-white/30
                "
              >
                Project Showcase
              </p>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}