"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
  AlertCircle,
  Eye,
} from "lucide-react";
import { recordDocumentAccess } from "@/lib/services/contact.api";

interface CanvasPageProps {
  pdf: any;
  pageNum: number;
  scale: number;
  watermarkEmail?: string;
}

const CanvasPage = ({ pdf, pageNum, scale, watermarkEmail }: CanvasPageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pdf) return;

    // Cancel any in-flight render from a previous effect run BEFORE starting a new one
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    setLoading(true);

    // Track whether this effect instance has been cleaned up
    let cancelled = false;

    pdf.getPage(pageNum).then((page: any) => {
      // Effect was cleaned up while getPage() was still resolving — bail out
      if (cancelled) return;

      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;

      task.promise
        .then(() => {
          renderTaskRef.current = null;
          if (cancelled) return; // Don't update state after cleanup

          // ── Paint email watermark directly onto the canvas pixels ──
          // This is captured in ANY screenshot because it is part of the rendered image.
          if (watermarkEmail) {
            const w = canvas.width;
            const h = canvas.height;
            const text = `Confidential – Obsidian Six`;

            context.save();

            // Tiled diagonal repeating watermark
            const step = 280;
            context.font = `bold ${Math.max(11, scale * 11)}px Arial, sans-serif`;
            context.fillStyle = "rgba(0, 0, 0, 0.13)";
            context.strokeStyle = "rgba(255,255,255,0.07)";
            context.lineWidth = 0.4;
            context.textAlign = "center";
            context.textBaseline = "middle";

            for (let y = -h; y < h * 2; y += step) {
              for (let x = -w; x < w * 2; x += step) {
                context.save();
                context.translate(x + step / 2, y + step / 2);
                context.rotate(-Math.PI / 6); // -30°
                context.fillText(text, 0, 0);
                context.strokeText(text, 0, 0);
                context.restore();
              }
            }

            // Bold centred stamp
            context.font = `900 ${Math.max(14, scale * 14)}px Arial, sans-serif`;
            context.fillStyle = "rgba(0,0,0,0.9)";
            context.save();
            context.translate(w / 2, h / 2);
            context.rotate(-Math.PI / 8);
            context.fillText(`Confidential – Obsidian SIX`, 0, 0);
            context.restore();

            context.restore();
          }

          setLoading(false);
        })
        .catch((err: any) => {
          renderTaskRef.current = null;
          if (err.name !== "RenderingCancelledException") {
            console.error("Page render error:", err);
          }
        });
    });

    return () => {
      cancelled = true;
      // Cancel task if it started (set inside the async callback)
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdf, pageNum, scale, watermarkEmail]);

  return (
    <div className="relative border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl bg-[#090d16] flex justify-center items-center transition-all duration-300">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm z-10">
          <Loader2 className="animate-spin text-[#086ddd] size-10" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="max-w-full block select-none rounded-2xl"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default function HiddenDocumentClient() {
  const [email, setEmail] = useState("");
  const [isGated, setIsGated] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeDoc, setActiveDoc] = useState<"task1" | "google_ads">("task1");

  // PDF States
  const [isPdfJsLoaded, setIsPdfJsLoaded] = useState(false);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomScale, setZoomScale] = useState(1.2);
  const [pdfLoading, setPdfLoading] = useState(false);

  // 1. Check local storage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("obsidian_gated_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsGated(false);
    }
  }, []);

  // 2. Security Lockouts: Right-Click, Print Screen, Copy shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl/Cmd + P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        alert("Printing of this exclusive document is strictly disabled.");
      }
      // Prevent Ctrl/Cmd + S (Save / Download)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        alert("Downloading of this secure document is disabled.");
      }
      // Prevent Ctrl/Cmd + C (Copy)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        alert("Text copying is disabled on this document.");
      }
      // Prevent Ctrl/Cmd + U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === "u") {
        e.preventDefault();
      }
      // Prevent Ctrl/Cmd + Shift + I / F12 (Dev Tools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
        e.preventDefault();
      }
      if (e.key === "F12") {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 3. Dynamically load PDF.js from CDN
  useEffect(() => {
    if (isGated) return; // Load PDF.js only after user is authenticated to keep initial load lightweight

    if ((window as any).pdfjsLib) {
      setIsPdfJsLoaded(true);
      return;
    }

    setPdfLoading(true);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      setIsPdfJsLoaded(true);
    };
    script.onerror = () => {
      setErrorMessage("Failed to load secure document viewer dependencies. Please refresh.");
      setPdfLoading(false);
    };
    document.body.appendChild(script);
  }, [isGated]);

  // 4. Load PDF Document from assets when PDF.js is ready
  useEffect(() => {
    if (!isPdfJsLoaded) return;

    setPdfLoading(true);
    const pdfjsLib = (window as any).pdfjsLib;
    const docPath = activeDoc === "google_ads" ? "/GOOGLE_ADS_X_OBS.pdf" : "/Task1.pdf";
    const loadingTask = pdfjsLib.getDocument(docPath);

    loadingTask.promise
      .then((pdf: any) => {
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setPdfLoading(false);
        setCurrentPage(1); // Reset page selection on document switch
      })
      .catch((err: any) => {
        console.error("Error loading PDF:", err);
        setErrorMessage("Secure document file not found or corrupted.");
        setPdfLoading(false);
      });
  }, [isPdfJsLoaded, activeDoc]);

  // 4b. Log document access on switcher change if verified
  useEffect(() => {
    if (!isGated && email) {
      const docName = activeDoc === "google_ads" ? "GOOGLE_ADS_X_OBS.pdf" : "task1.pdf";
      recordDocumentAccess(email, docName).catch((err) =>
        console.error("Failed to log document access:", err)
      );
    }
  }, [activeDoc, isGated, email]);

  // 5. Handle Gated Form Submission
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanedEmail = email.trim();
    if (!cleanedEmail) {
      setErrorMessage("Email address is required.");
      return;
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(cleanedEmail)) {
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const docName = activeDoc === "google_ads" ? "GOOGLE_ADS_X_OBS.pdf" : "task1.pdf";
      // API call to log gated document access in database & trigger email notification
      await recordDocumentAccess(cleanedEmail, docName);

      // Persist in localStorage and state
      localStorage.setItem("obsidian_gated_email", cleanedEmail);
      setIsGated(false);
    } catch (error: any) {
      console.error("Verification failed:", error);
      // Fallback: if server is temporarily offline but email is valid, we can allow viewing to prevent user blocking,
      // but let's notify the user or log error first
      setErrorMessage("Database logging error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const zoomIn = () => setZoomScale((prev) => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setZoomScale((prev) => Math.max(prev - 0.2, 0.6));

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden no-select">
      {/* Absolute background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(8,109,221,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.05),transparent_50%)] pointer-events-none" />

      {/* SECURE PRINT PROTECT STYLESHEET */}
      <style jsx global>{`
        @media print {
          body {
            display: none !important;
          }
          html {
            display: none !important;
          }
        }
        .no-select {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>

      {/* Header bar */}
      <div className="w-full bg-slate-950/80 border-b border-slate-900 backdrop-blur-md px-6 py-4 flex items-center justify-between z-40 relative">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-tr from-[#024787] to-[#086ddd] rounded-xl flex items-center justify-center shadow-lg shadow-[#024787]/25">
            <Lock className="text-white size-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-slate-100 uppercase poppins">
              Obsidian Six
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-[0.15em] flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Secure Document Vault
            </p>
          </div>
        </div>
        {!isGated && (
          <div className="flex items-center gap-2 bg-slate-900/50 px-3.5 py-1.5 rounded-full border border-slate-800/80">
            <Mail className="text-[#086ddd] size-3.5" />
            <span className="text-[11px] text-slate-300 font-semibold tracking-wide max-w-[150px] truncate">
              {email}
            </span>
          </div>
        )}
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center z-30 relative">
        <AnimatePresence mode="wait">
          {isGated ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-lg bg-slate-950/40 border border-slate-900/80 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#086ddd]/10 rounded-full blur-3xl" />

              <div className="text-center relative z-10">
                <div className="inline-flex p-4 rounded-3xl bg-slate-900/80 border border-slate-800/60 shadow-inner mb-6 text-[#086ddd] animate-pulse">
                  <Lock size={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight poppins">
                  Protected Document Access
                </h2>
                <p className="text-slate-400 text-sm md:text-base font-medium mt-3.5 max-w-[320px] mx-auto leading-relaxed">
                  Enter your email address to unlock and securely view the requested document.
                </p>
              </div>

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-2xl bg-red-950/20 border border-red-900/40 flex items-start gap-3 text-red-400 text-xs font-semibold leading-relaxed relative z-10"
                >
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              <form onSubmit={handleVerify} className="mt-8 space-y-5 relative z-10">
                <div className="relative group">
                  <Mail className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#086ddd] transition-all size-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-slate-950/50 border border-slate-900/80 pl-13 pr-4 py-4.5 rounded-2xl text-sm md:text-base font-medium text-slate-100 placeholder:text-slate-500 outline-none focus:border-[#086ddd] focus:ring-4 focus:ring-[#086ddd]/5 transition-all shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#024787] hover:bg-[#086ddd] text-white font-bold text-sm md:text-base py-4.5 rounded-2xl shadow-xl shadow-[#024787]/20 hover:shadow-2xl hover:shadow-[#086ddd]/30 transition-all flex items-center justify-center gap-3 transform active:scale-[0.98] hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin size-5" />
                      Decrypting & Gating...
                    </>
                  ) : (
                    <>
                      <Eye className="size-5" />
                      View Exclusive Document
                    </>
                  )}
                </button>
              </form>

              {/* Secure Trust Disclaimer */}
              <div className="mt-8 pt-6 border-t border-slate-900 flex items-center justify-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-widest relative z-10">
                <FileText size={12} className="text-slate-500" />
                <span>Anti-copy & print protection enabled</span>
              </div>
            </motion.div>
          ) : (
            // ================= SECURE PDF VIEWER =================
            <motion.div
              key="viewer"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex flex-col items-center gap-6"
            >
              {/* Document Switcher Tabs */}
              <div className="flex bg-slate-950/60 p-1.5 rounded-2xl border border-slate-900/80 backdrop-blur-md shadow-inner gap-2">
                <button
                  onClick={() => setActiveDoc("task1")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    activeDoc === "task1"
                      ? "bg-gradient-to-tr from-[#024787] to-[#086ddd] text-white shadow-lg shadow-[#024787]/25"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <FileText size={14} />
                  Task 1 Blueprint
                </button>
                <button
                  onClick={() => setActiveDoc("google_ads")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    activeDoc === "google_ads"
                      ? "bg-gradient-to-tr from-[#024787] to-[#086ddd] text-white shadow-lg shadow-[#024787]/25"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <FileText size={14} />
                  Google Ads X OBS
                </button>
              </div>

              {/* Document Info Header */}
              <div className="w-full max-w-4xl bg-slate-950/30 border border-slate-900/80 rounded-2xl p-4.5 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 poppins">
                      {activeDoc === "google_ads" ? "GOOGLE_ADS_X_OBS.pdf" : "task1.pdf"}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                      {activeDoc === "google_ads" ? "Obsidian Six Marketing Blueprint" : "Obsidian Six Proprietary Blueprint"}
                    </p>
                  </div>
                </div>

                {/* PDF rendering toolbar controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={zoomOut}
                      title="Zoom Out"
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-all"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <span className="text-xs font-bold text-slate-300 w-12 text-center select-none">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      onClick={zoomIn}
                      title="Zoom In"
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-all"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
                    <button
                      disabled={currentPage <= 1 || pdfLoading}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-semibold text-slate-300 px-1 select-none">
                      Page <strong className="font-bold text-white">{currentPage}</strong> of{" "}
                      {numPages}
                    </span>
                    <button
                      disabled={currentPage >= numPages || pdfLoading}
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, numPages))}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Rendering Area */}
              <div className="w-full max-w-4xl flex flex-col items-center min-h-[50vh] relative">
                {pdfLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/20 backdrop-blur-sm rounded-3xl z-30">
                    <Loader2 className="animate-spin text-[#086ddd] size-12" />
                    <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
                      Loading Blueprint Pages...
                    </span>
                  </div>
                ) : errorMessage ? (
                  <div className="w-full bg-red-950/15 border border-red-900/30 rounded-3xl p-8 flex flex-col items-center text-center max-w-md mx-auto my-12">
                    <AlertCircle className="text-red-500 size-12 mb-4" />
                    <h4 className="text-base font-bold text-slate-200 poppins">Failed to load document</h4>
                    <p className="text-xs text-slate-400 font-medium mt-2 leading-relaxed">
                      {errorMessage}
                    </p>
                  </div>
                ) : (
                  pdfDoc && (
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden"
                    >
                      <CanvasPage pdf={pdfDoc} pageNum={currentPage} scale={zoomScale} watermarkEmail={email} />
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer disclaimer */}
      <div className="w-full text-center py-6 border-t border-slate-900 bg-slate-950/40 relative z-30">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-relaxed">
          &copy; {new Date().getFullYear()} Obsidian Six. All rights reserved. Secure gated content system.
        </p>
      </div>
    </div>
  );
}
