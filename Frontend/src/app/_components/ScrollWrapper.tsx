"use client";

import dynamic from "next/dynamic";

// Move the dynamic import here
const ScrollReveal = dynamic(
  () => import("./ScrollReveal/Scroll-section"),
  { ssr: false }
);

export default function ScrollWrapper({ paragraph }: { paragraph: string }) {
  return <ScrollReveal paragraph={paragraph} />;
}