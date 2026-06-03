"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface WhyUsSectionProps {
  whyUsTitle: string;
  whyUsSubtitle: string;
  whyUsStats: WhyUsStat[];
  whyUsCtaText?: string;
  whyUsCtaLink?: string;
}

// Animated counter hook
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

// Parse value like "6+", "300+", "50+" into number + suffix
function parseStatValue(raw: string): { number: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: "" };
  return { number: parseInt(match[1], 10), suffix: match[2] };
}

// Highlight keywords in subtitle with alternating colors (blue, red, green, orange)
const HIGHLIGHT_COLORS = [
  "text-blue-600",
  "text-red-500",
  "text-green-600",
  "text-orange-500",
];

const HIGHLIGHT_WORDS = [
  "multitude", "projects", "managing", "all", "aspects",
  "optimised", "process", "meaningful", "value", "services"
];

function ColoredSubtitle({ text }: { text: string }) {
  let colorIndex = 0;
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, i) => {
        const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        if (HIGHLIGHT_WORDS.includes(clean)) {
          const color = HIGHLIGHT_COLORS[colorIndex % HIGHLIGHT_COLORS.length];
          colorIndex++;
          return (
            <span key={i} className={color}>
              {word}{" "}
            </span>
          );
        }
        return <span key={i}>{word} </span>;
      })}
    </span>
  );
}

function AnimatedStat({ stat, startCount }: { stat: WhyUsStat; startCount: boolean }) {
  const { number, suffix } = parseStatValue(stat.value);
  const count = useCounter(number, 1800, startCount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center px-6"
    >
      <span className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-3">
        {startCount ? count : 0}
        {suffix}
      </span>
      <span className="text-sm text-slate-500 font-light leading-snug max-w-[140px]">
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function WhyUsSection({
  whyUsTitle,
  whyUsSubtitle,
  whyUsStats,
  whyUsCtaText,
  whyUsCtaLink,
}: WhyUsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="w-full flex flex-col items-center text-center py-4"
    >
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight max-w-3xl mb-6 font-inter">
        {whyUsTitle}
      </h2>

      {/* Colorful subtitle */}
      <p className="text-base md:text-[17px] text-slate-500 font-light leading-relaxed max-w-2xl mb-14">
        <ColoredSubtitle text={whyUsSubtitle} />
      </p>

      {/* Stats row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 w-full max-w-3xl mb-14">
        {whyUsStats.map((stat, idx) => (
          <AnimatedStat key={idx} stat={stat} startCount={isInView} />
        ))}
      </div>

      {/* CTA Button */}
      {whyUsCtaText && whyUsCtaLink && (
        <Link
          href={whyUsCtaLink}
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-3.5 rounded-sm transition-all duration-300 hover:gap-4 group"
        >
          {whyUsCtaText}
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      )}
    </motion.div>
  );
}
