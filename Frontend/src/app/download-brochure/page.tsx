"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function DownloadBrochurePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consentPolicy, setConsentPolicy] = useState(false);
  const [consentUpdates, setConsentUpdates] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!consentPolicy) {
      alert("Please accept the privacy consent checkbox to submit.");
      return;
    }

    setIsSubmitting(true);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${apiBase}/api/documents/brochure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to process brochure request");
      }

      setIsSubmitted(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setConsentPolicy(false);
      setConsentUpdates(false);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans grid lg:grid-cols-[1.1fr_1.4fr] overflow-x-hidden">
      
      {/* LEFT COLUMN: The Brochure Showcase Visual */}
      <div className="bg-[#D1D7DC]/40 min-h-[40vh] lg:min-h-screen flex flex-col justify-between p-8 md:p-12 relative overflow-hidden">
        {/* Top Spacer to maintain flex layout alignment */}
        <div className="h-9" />

        {/* Mockup Card Component */}
        <div className="my-auto py-16 flex items-center justify-center relative w-full h-full">
          <div className="relative w-80 h-[380px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 rotate-[-12deg] p-8 flex flex-col justify-between transition-transform hover:rotate-[0deg] duration-700">
            <div className="space-y-2 mt-4 font-poppins">
              <div className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">Design.</div>
              <div className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">Build.</div>
              <div className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">Market.</div>
            </div>
            
            {/* Bottom brand logo */}
            <div className="self-end opacity-90">
              <Image
                src="/images/logo/logo2.png"
                alt="Obsidian Six"
                width={100}
                height={28}
                className="h-7 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-xs text-slate-500 font-medium z-10">
          © 2026 Obsidian Six. Built for Growth.
        </p>
      </div>

      {/* RIGHT COLUMN: The Form */}
      <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20 bg-white">
        <div className="max-w-xl w-full mx-auto">
          
          {isSubmitted ? (
            <div className="py-12 animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="w-16 h-16 text-[#052D69] mb-6" />
              <h1 className="text-4xl font-light tracking-tight text-slate-900 mb-4 font-poppins">
                Brochure Sent!
              </h1>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Thank you for your request. We have forwarded our official brochure PDF directly to your email address: <strong className="text-slate-900">{email}</strong>. Please check your inbox (including your spam folder) in a few seconds.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-black text-white hover:bg-slate-900 transition-colors text-xs font-semibold uppercase tracking-wider rounded-none"
                >
                  Request Again
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold uppercase tracking-wider rounded-none inline-block text-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-8 font-poppins">
                Download Our Brochure
              </h1>

              {errorMessage && (
                <div className="p-4 bg-red-50 text-red-600 text-xs font-medium border-l-4 border-red-500 rounded-none">
                  {errorMessage}
                </div>
              )}

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1.5" htmlFor="first-name">
                    First Name
                  </label>
                  <input
                    className="w-full border border-[#C3C3C3] px-4 py-3 text-sm outline-none focus:border-[#052D69] transition-all rounded-none placeholder:text-[#A3A3A3] font-sans h-12 bg-white"
                    id="first-name"
                    placeholder="Enter first name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1.5" htmlFor="last-name">
                    Last Name
                  </label>
                  <input
                    className="w-full border border-[#C3C3C3] px-4 py-3 text-sm outline-none focus:border-[#052D69] transition-all rounded-none placeholder:text-[#A3A3A3] font-sans h-12 bg-white"
                    id="last-name"
                    placeholder="Enter last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email & Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1.5" htmlFor="email">
                    Email*
                  </label>
                  <input
                    required
                    className="w-full border border-[#C3C3C3] px-4 py-3 text-sm outline-none focus:border-[#052D69] transition-all rounded-none placeholder:text-[#A3A3A3] font-sans h-12 bg-white"
                    id="email"
                    placeholder="Enter email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1.5" htmlFor="phone-number">
                    Phone Number
                  </label>
                  {isMounted ? (
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={(value: string) => setPhone(value)}
                      enableSearch={true}
                      searchPlaceholder="Search country..."
                      inputClass="!w-full !border !border-[#C3C3C3] !pl-[52px] !pr-4 !py-3 !text-sm !outline-none !rounded-none focus:!border-[#052D69] !font-sans !h-12 bg-white"
                      containerClass="!w-full !rounded-none"
                      buttonClass="!rounded-none !border-y-0 !border-l-0 !border-r !border-[#C3C3C3] !bg-white"
                      dropdownClass="!rounded-none"
                      searchClass="!text-xs !p-2"
                    />
                  ) : (
                    <div className="w-full h-12 border border-[#C3C3C3] bg-white animate-pulse rounded-none" />
                  )}
                </div>
              </div>

              {/* Checkbox 1: Privacy Policy */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  required
                  type="checkbox"
                  id="consent-policy"
                  checked={consentPolicy}
                  onChange={(e) => setConsentPolicy(e.target.checked)}
                  className="mt-1 h-3.5 w-3.5 border-[#C3C3C3] rounded-none focus:ring-[#052D69] text-[#052D69]"
                />
                <label htmlFor="consent-policy" className="text-[11px] text-slate-500 leading-normal">
                  I have read the{" "}
                  <Link href="/terms" target="_blank" className="text-blue-600 font-semibold underline hover:text-blue-700">
                    privacy policy
                  </Link>{" "}
                  and consent to the processing of my data for the purpose of handling my enquiry
                </label>
              </div>

              {/* Checkbox 2: Brand Updates */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent-updates"
                  checked={consentUpdates}
                  onChange={(e) => setConsentUpdates(e.target.checked)}
                  className="mt-1 h-3.5 w-3.5 border-[#C3C3C3] rounded-none focus:ring-[#052D69] text-[#052D69]"
                />
                <label htmlFor="consent-updates" className="text-[11px] text-slate-500 leading-normal">
                  Yes, I agree to receive updates on services, events and exciting projects
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-black text-white hover:bg-slate-900 transition-colors flex items-center gap-2.5 font-semibold text-xs uppercase tracking-widest rounded-none disabled:opacity-50 font-poppins"
                >
                  {isSubmitting ? (
                    <>
                      Processing... <Loader2 className="animate-spin h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      Submit <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
      
    </main>
  );
}
