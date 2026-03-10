"use client";

import { useEffect, useRef } from "react";

export default function PachmarhiPage() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const resize = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          const height = Math.max(
            doc.body.scrollHeight,
            doc.documentElement.scrollHeight
          );
          iframe.style.height = height + "px";
        }
      } catch (e) {
        // cross-origin or other error — ignore
      }
    };

    iframe.addEventListener("load", resize);

    // try resizing periodically for dynamic content
    const interval = setInterval(resize, 500);

    return () => {
      iframe.removeEventListener("load", resize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen pt-20">
      <iframe
        ref={iframeRef}
        src="/projects/pachmarhi/index.html"
        style={{ width: "100%", border: "none", minHeight: "80vh" }}
        title="Pachmarhi Ayurveda"
      />
      <div className="max-w-[1100px] mx-auto px-6 mt-6 text-center text-sm text-black/60">
        If the preview above does not load, open the case study directly:
        <div className="mt-2">
          <a
            href="/projects/pachmarhi/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary"
          >
            Open Pachmarhi Ayurveda case study in a new tab
          </a>
        </div>
      </div>
    </div>
  );
}