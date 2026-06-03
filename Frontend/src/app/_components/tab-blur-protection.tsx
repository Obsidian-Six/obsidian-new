"use client";

import { useEffect } from "react";


export default function TabBlurProtection() {
  useEffect(() => {
    // Inject a <style> tag once so the blur class is always available
    const styleId = "tab-blur-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        body.tab-blurred * {
          filter: blur(12px) !important;
          user-select: none !important;
          pointer-events: none !important;
          transition: filter 0.15s ease;
        }
        .tab-blur-shield {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(0,0,0,0.55);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .tab-blur-shield p {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          filter: none !important;
        }
        .tab-blur-shield span {
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          margin: 0;
          filter: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Create a shield overlay element (rendered outside React tree for speed)
    const shield = document.createElement("div");
    shield.className = "tab-blur-shield";
    shield.id = "tab-blur-shield";
    shield.style.display = "none";
    shield.innerHTML = `
      <p>🔒 Content Protected</p>
      <span>Return to this tab to continue viewing</span>
    `;
    document.body.appendChild(shield);

    const blur = () => {
      document.body.classList.add("tab-blurred");
      shield.style.display = "flex";
    };

    const unblur = () => {
      document.body.classList.remove("tab-blurred");
      shield.style.display = "none";
    };

    // Trigger blur on these screenshot keys BEFORE the OS captures
    const handleKeyDown = (e: KeyboardEvent) => {
      const isPrintScreen = e.key === "PrintScreen";
      const isSnippingTool = e.key === "PrintScreen" || (e.metaKey && e.shiftKey && e.key === "s") || (e.ctrlKey && e.shiftKey && e.key === "s");
      if (isPrintScreen || isSnippingTool) {
        blur();
        // Re-enable after a short delay so normal use is not disrupted
        setTimeout(unblur, 2000);
      }
    };

    document.addEventListener("visibilitychange", () => {
      document.hidden ? blur() : unblur();
    });

    window.addEventListener("blur", blur);
    window.addEventListener("focus", unblur);
    window.addEventListener("keydown", handleKeyDown);

    // Ensure page starts unblurred if already focused
    if (!document.hidden && document.hasFocus()) {
      unblur();
    }

    return () => {
      document.removeEventListener("visibilitychange", () => {
        document.hidden ? blur() : unblur();
      });
      window.removeEventListener("blur", blur);
      window.removeEventListener("focus", unblur);
      window.removeEventListener("keydown", handleKeyDown);
      shield.remove();
    };
  }, []);

  return null; // All DOM work is done imperatively for speed
}
