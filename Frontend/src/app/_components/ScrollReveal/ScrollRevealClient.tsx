"use client";

import dynamic from "next/dynamic";


const ScrollReveal = dynamic(
  () => import("./Scroll-section").then((m) => m.default),
  { ssr: false }
);

interface Props {
  paragraph: string;
}

export default function ScrollRevealClient({ paragraph }: Props) {
  return <ScrollReveal paragraph={paragraph} />;
}
