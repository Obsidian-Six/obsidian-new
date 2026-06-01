"use client";

import { useEffect } from "react";

/**
 * Tab Blur Protection – Snipping Tool Blocker
 *
 * Strategy: Apply CSS `filter: blur()` directly to <body> so the browser
 * renders the page blurred at paint time. Whatever the OS (Snipping Tool /
 * PrintScreen) captures is already blurred in the GPU render layer.
 *
 * - Page starts unblurred (window is focused on load).
 * - Blurs immediately whenever:
 *   • The window loses focus  (blur event)
 *   • The tab becomes hidden  (visibilitychange)
 *   • PrintScreen / Win+Shift+S key is pressed
 * - Unblurs when the window regains focus.
 */
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
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;padding:32px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <circle cx="12" cy="15" r="0.5" fill="rgba(255,255,255,0.85)" stroke="none"/>
        </svg>
        <p style="color:#fff;font-size:22px;font-weight:800;letter-spacing:0.04em;margin:0;font-family:sans-serif;">Confidential – Obsidian SIX</p>
        <span style="color:rgba(255,255,255,0.5);font-size:13px;font-family:sans-serif;font-weight:500;">Return to this tab to continue viewing the document</span>
        <div style="margin-top:8px;padding:6px 18px;border:1px solid rgba(255,255,255,0.15);border-radius:999px;color:rgba(255,255,255,0.35);font-size:10px;font-family:sans-serif;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">Protected Document</div>
      </div>
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
