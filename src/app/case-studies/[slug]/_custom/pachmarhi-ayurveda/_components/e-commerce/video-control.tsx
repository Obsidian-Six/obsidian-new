"use client";
import { useEffect } from "react";

export default function VideoControl() {
  useEffect(() => {
    // Video Play Control Logic
    const videoWrapper = document.getElementById(
      "e-commerce-video-wrapper"
    ) as HTMLElement | null;
    const video = document.getElementById(
      "e-commerce-video"
    ) as HTMLVideoElement | null;
    if (!videoWrapper || !video) return;
    videoWrapper.addEventListener("mouseenter", () => {
      video.play();
    });
    videoWrapper.addEventListener("mouseleave", () => {
      video.pause();
    });
  }, []);
  return <></>;
}
