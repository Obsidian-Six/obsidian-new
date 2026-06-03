"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface OverviewSectionProps {
  overviewTitle: string;
  overviewParagraphs: string[];
  ctaText?: string | undefined;
  ctaLink?: string | undefined;
  onTechKeywordClick: () => void;
  hasTechStack: boolean;
}

export default function OverviewSection({
  overviewTitle,
  overviewParagraphs,
  ctaText,
  ctaLink,
  onTechKeywordClick,
  hasTechStack
}: OverviewSectionProps) {
  
  const linkableKeywords = [
    { word: "technologies", href: "#technologies", customAction: true },
    { word: "eCommerce", href: "/services/e-commerce" },
    { word: "web applications", href: "#web-applications" },
    { word: "CMS", href: "#cms" },
    { word: "SaaS", href: "#saas" }
  ];

  const renderParagraphWithLinks = (text: string) => {
    let elements: (string | React.ReactNode)[] = [text];

    linkableKeywords.forEach((kw) => {
      const nextElements: (string | React.ReactNode)[] = [];

      elements.forEach((el) => {
        if (typeof el !== "string") {
          nextElements.push(el);
          return;
        }

        const regex = new RegExp(`\\b(${kw.word})\\b`, "gi");
        const parts = el.split(regex);

        parts.forEach((part, index) => {
          if (part.toLowerCase() === kw.word.toLowerCase()) {
            if (kw.customAction && hasTechStack) {
              nextElements.push(
                <span
                  key={`${kw.word}-${index}`}
                  onClick={onTechKeywordClick}
                  className="text-blue-600 hover:text-blue-800 underline decoration-blue-500 hover:decoration-blue-700 transition-colors cursor-pointer"
                >
                  {part}
                </span>
              );
            } else {
              nextElements.push(
                <Link
                  key={`${kw.word}-${index}`}
                  href={kw.href}
                  className="text-blue-600 hover:text-blue-800 underline decoration-blue-500 hover:decoration-blue-700 transition-colors"
                >
                  {part}
                </Link>
              );
            }
          } else if (part !== "") {
            nextElements.push(part);
          }
        });
      });

      elements = nextElements;
    });

    return elements;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl"
    >
      <h2 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight mb-8 font-inter">
        {overviewTitle}
      </h2>
      
      <div className="space-y-6 text-slate-600 text-[15px] md:text-[16px] leading-relaxed font-light font-inter max-w-3xl font-sans">
        {overviewParagraphs.map((para, idx) => (
          <p key={idx}>
            {renderParagraphWithLinks(para)}
          </p>
        ))}
      </div>

      {ctaText && (
        <div className="mt-10">
          <Link
            href={ctaLink || "#"}
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-blue-600 text-blue-600 rounded-sm text-sm font-medium tracking-wide hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/10"
          >
            {ctaText}
            <span className="text-lg">→</span>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
