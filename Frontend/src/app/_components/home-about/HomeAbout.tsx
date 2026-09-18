
"use client";

// import { useRouter } from "next/navigation";
import { useHomeAboutAnimation } from "@/hooks/useHomeAboutAnimation";
import "./homeabout.css";
import Button from "../common/Button";
const Design = "/newContent/homeaboutvideos/butterfly.mp4";
const Tech = "/newContent/homeaboutvideos/build.mp4";
const Social = "/newContent/homeaboutvideos/market.mp4";

type Service = {
  id: string;
  title: string;
  hero: string;
  description: string;
  href?: string;
  video: string;
};

const SERVICES: Service[] = [
  {
    id: "brand",
    title: "Brand",
    hero: "Brand that feels like you!",
    description:
      "We believe to create design that tells your story. We capture your brand’s soul and craft captivating messages that encapsulate your brand’s essence.",
    href: "/contactus",
    video: Design,
  },
  {
    id: "digital",
    title: "Digital",
    hero: "Make it real!",
    description:
      "We find your voices and grow the tribe. Turn your followers into fans! While we handle the algorithm, you master the relationships.",
    href: "/contactus",
    video: Social,
  },
  {
    id: "tech",
    title: "Tech",
    hero: "It all starts here!",
    description:
    "We build a digital backbone that never breaks! From custom web applications to scalable e-commerce platforms, we take care of ‘how’ so your customers can enjoy the ‘Wow.’",
    video: Tech,
    href: "/contactus",
  }
];

const HIGHLIGHT_TEXT =
  "We build, design, and grow digital experiences that make brands impossible to ignore. Obsidian Six is a digital creative studio bringing development, design, and social under one roof. From high-performance websites and digital products to distinctive brand experiences and social content, we turn ideas into things people remember. We believe great work happens where strategy meets creativity and technology. No unnecessary layers. No cookie-cutter solutions. Just thoughtful ideas, sharp design, solid technology, and work built to move businesses forward.";

function splitLetters(value: string): React.ReactNode[] {
  return [...value].map((letter, index) => (
    <span key={`${value}-${index}`}>
      <span>{letter}</span>
    </span>
  ));
}

export default function HomeAbout(): React.ReactElement {
  // const router = useRouter();

  const {
    rootRef,
    itemRefs,
    // videoRefs,
    highlightRef,
  } = useHomeAboutAnimation();

  // const navigate = (href?: string): void => {
  //   if (!href) return;
  //   router.push(href);
  // };

  return (
    <section
      ref={rootRef}
      className="homeDesignWrap_section"
      aria-label="Obsidian services"
    >
      {/* =========================================
         HIGHLIGHT — FIRST TIMELINE
         ========================================= */}
      <div ref={highlightRef} className="homeDesignWrap_title_anim">
        <section className="homeHighlight_section">
          <div className="container">
            <div className="homeHighlight_textWrapper">
              <h2 className="homeHighlight_title">
                <span className="homeHighlight_nonBled">
                  {HIGHLIGHT_TEXT}
                </span>

                <span className="homeHighlight_bled">
                  {HIGHLIGHT_TEXT}
                </span>
              </h2>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================
         SERVICES — START AFTER HIGHLIGHT
         ========================================= */}
      <div className="homeDesignWrap_section_inner">
        {SERVICES.map((service, index) => (
          <div
            key={service.id}
            ref={(element: HTMLDivElement | null) => {
              itemRefs.current[index] = element;
            }}
            className={`homeDesignWrap_section_item homeDesignWrap_item_${service.id}`}
          >
            <section
              className={`obsidianServiceHero obsidianServiceHero_${service.id}`}
            >
              <div className="container">
                <div className="obsidianService_textWrapper">
                  <div className="obsidianService_textAnimInner">
                    {/* HERO WORD — KEEP */}
                    <div
                      className={`obsidianService_textHero obsidianService_heroWord obsidianService_hero_${service.id}`}
                    >
                      {splitLetters(service.title)}
                    </div>

                    {/* VIDEO — KEEP */}
                    <div className="obsidianService_butterfly">
                      {/* <video
                        ref={(element: HTMLVideoElement | null) => {
                          videoRefs.current[index] = element;
                        }}
                        className="obsidianService_video"
                        width="100%"
                        height="100%"
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                      >
                        <source
                          src={service.video}
                          type="video/mp4"
                        />
                      </video> */}
                    </div>
                  </div>

                  {/* DESCRIPTION + CTA — KEEP */}
                  <div className="obsidianService_content">
                    <div className="obsidianService_content_wrap">
                      <p>
                        {service.description
                          .split(" ")
                          .reduce<string[]>(
                            (lines, word, i, words) => {
                              const line = `${word}${
                                i < words.length - 1 ? " " : ""
                              }`;

                              const bucket = Math.floor(i / 6);

                              if (!lines[bucket]) {
                                lines[bucket] = "";
                              }

                              lines[bucket] += line;

                              return lines;
                            },
                            []
                          )
                          .map((line, lineIndex) => (
                            <span
                              key={`${service.id}-line-${lineIndex}`}
                            >
                              {line}
                            </span>
                          ))}
                      </p>

                      {/* <button
                        type="button"
                        onClick={() => navigate(service.href)}
                        className="obsidianService_button"
                        disabled={!service.href}
                      >
                        Start Journey

                        <span
                          className="arrow-two"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </button> */}
                      <Button hlink={service.href || "#"} text="Start Journey" textColor="black" borderColor="white" bgColor="white" hoverBgColor="hover:bg-slate-900" hoverTextColor="hover:text-white" className="obsidianService_button" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </section>
  );
}


