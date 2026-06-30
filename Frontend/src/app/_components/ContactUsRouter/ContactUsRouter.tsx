"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type Contact from "@/lib/models/contact.types";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { handleContactUsFormSubmission } from "@/lib/services/contact.api";
import { ArrowRight, CheckCircle2, Loader2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type TabType = "quote" | "partnership" | "general";



const ContactUsRouter = () => {
  const [activeTab, setActiveTab] = useState<TabType>("quote");
  const [isMounted, setIsMounted] = useState(false);

  // --- FORM STATE ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset tab-specific fields when tab changes
  useEffect(() => {
    setCompanyName("");
    setSubject("");
    setMessage("");
    setConsent(false);
  }, [activeTab]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let selectedServices: string[] = [];
    if (activeTab === "quote") {
      selectedServices = ["Get a Quote", "Project Details: " + message];
    } else if (activeTab === "partnership") {
      if (!consent) {
        alert("Please accept the privacy consent checkbox to submit.");
        setIsSubmitting(false);
        return;
      }
      selectedServices = ["Partnership Enquiry", "Details: " + message];
    } else if (activeTab === "general") {
      if (!consent) {
        alert("Please accept the privacy consent checkbox to submit.");
        setIsSubmitting(false);
        return;
      }
      selectedServices = ["General Enquiry", "Subject: " + subject, "Details: " + message];
    }

    const contactData: Contact = {
      firstName,
      lastName,
      email,
      phone,
      selectedServices,
      companyName: activeTab === "partnership" ? companyName : "",
      companyWebsite: "",
    };

    try {
      await handleContactUsFormSubmission(contactData);
      setIsSubmitted(true);
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompanyName("");
      setSubject("");
      setMessage("");
      setConsent(false);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Content configurations based on active tab
  const leftContent = {
    quote: {
      desc: "Please feel free to share your thoughts and we can discuss it over a cup of tea.",
    },
    partnership: {
      desc: "Together, let's get a taste of industry leadership.",
    },
    general: {
      desc: "Shoot anything that pops up in your head. From artificial intelligence to fun memes, we are all ears!",
    },
  };

  const currentLeft = leftContent[activeTab];

  return (
    <main className="min-h-screen bg-white text-slate-900 font-poppins selection:bg-blue-600 selection:text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto mt-12 md:mt-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Headings & Brochure */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <span className="inline-block px-4 py-1 bg-blue-50 text-[#024787] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">
              [ Contact Us ]
            </span>

            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-[76px] font-extrabold text-slate-950 tracking-tighter leading-[0.9] font-poppins">
                Let&apos;s Recreate <br />
                <span className="text-slate-300 italic font-serif font-light">
                  The Future.
                </span>
              </h2>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-slate-500 font-medium mt-6 text-sm md:text-base leading-relaxed max-w-md font-inter">
                    {currentLeft.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Brochure Card */}
            <div className="pt-4">
              <Link
                href="/download-brochure"
                className="group flex items-center gap-6 p-4 bg-white border border-[#E5E7EB] hover:border-[#024787] hover:-translate-y-1 hover:shadow-md transition-all duration-300 max-w-sm cursor-pointer"
              >
                {/* Obsidian Six Logo Thumbnail */}
                <div className="relative w-20 h-20 bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 p-2">
                  <Image
                    src="/images/logo/logo2.png"
                    alt="Obsidian Six"
                    width={80}
                    height={24}
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight font-poppins group-hover:text-[#024787] transition-colors">
                    Download Our Brochure
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1.5 uppercase font-inter">
                    PDF 7.1 MB <Download size={12} className="text-slate-400 group-hover:text-[#024787] group-hover:translate-y-0.5 transition-all" />
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form & Tabs */}
          <div className="lg:col-span-7">
            <div className="bg-white p-2 md:p-6">
              
              {/* Horizontal Tabs - Left Aligned */}
              <div className="flex items-center space-x-6 md:space-x-10 border-b border-slate-100 pb-0 mb-8 font-poppins">
                {(["quote", "partnership", "general"] as TabType[]).map((tab) => {
                  const label =
                    tab === "quote"
                      ? "Get a Quote"
                      : tab === "partnership"
                      ? "Partnership"
                      : "General Enquiry";
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`relative pb-4 text-sm md:text-base font-semibold transition-colors duration-300 ${
                        activeTab === tab
                          ? "text-slate-900"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {label}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {isSubmitted ? (
                <div className="py-16 text-center animate-in fade-in zoom-in duration-500">
                  <CheckCircle2 className="w-16 h-16 text-[#024787] mx-auto mb-6" />
                  <h2 className="text-3xl font-bold mb-2 font-poppins">Message Sent!</h2>
                  <p className="text-slate-500 text-base mb-6 font-inter">
                    Our strategy team will review your details and reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#024787] font-bold uppercase tracking-widest text-xs hover:underline font-poppins"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2" htmlFor="first-name">
                        First Name*
                      </label>
                      <input
                        required
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 md:h-14 bg-white"
                        id="first-name"
                        placeholder="Enter first name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2" htmlFor="last-name">
                        Last Name
                      </label>
                      <input
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 md:h-14 bg-white"
                        id="last-name"
                        placeholder="Enter last name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Email & Phone Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2" htmlFor="email">
                        Email*
                      </label>
                      <input
                        required
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 md:h-14 bg-white"
                        id="email"
                        placeholder="Enter email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2" htmlFor="phone-number">
                        Phone Number*
                      </label>
                      {isMounted ? (
                        <PhoneInput
                          country={"in"}
                          value={phone}
                          onChange={(value: string) => setPhone(value)}
                          enableSearch={true}
                          searchPlaceholder="Search country..."
                          inputClass="!w-full !border !border-[#C3C3C3] !pl-[52px] !pr-4 !py-3.5 !text-sm md:!text-base !outline-none !rounded-none focus:!border-[#024787] !font-inter !h-14 bg-white"
                          containerClass="!w-full !rounded-none"
                          buttonClass="!rounded-none !border-y-0 !border-l-0 !border-r !border-[#C3C3C3] !bg-white"
                          dropdownClass="!rounded-none"
                          searchClass="!text-xs !p-2"
                        />
                      ) : (
                        <div className="w-full h-14 border border-[#C3C3C3] bg-white animate-pulse rounded-none" />
                      )}
                    </div>
                  </div>

                  {/* Tab-specific Company Name */}
                  {activeTab === "partnership" && (
                    <div className="animate-in fade-in slide-in-from-top-3 duration-300">
                      <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2" htmlFor="company-name">
                        Company Name
                      </label>
                      <input
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 md:h-14 bg-white"
                        id="company-name"
                        placeholder="Enter your company name"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Tab-specific Subject */}
                  {activeTab === "general" && (
                    <div className="animate-in fade-in slide-in-from-top-3 duration-300">
                      <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 md:h-14 bg-white"
                        id="subject"
                        placeholder="Enter your subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Tell Us More / Message Textarea */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[13px] md:text-sm font-semibold text-slate-900" htmlFor="tell-us-more">
                        Tell Us More
                      </label>
                      <span className="text-xs text-slate-400 font-medium font-inter">
                        {message.length}/1000
                      </span>
                    </div>
                    <textarea
                      required
                      maxLength={1000}
                      className="w-full border border-[#C3C3C3] p-4 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-44 resize-none bg-white"
                      id="tell-us-more"
                      placeholder={
                        activeTab === "quote"
                          ? "Brief about your project"
                          : activeTab === "partnership"
                          ? "We'd love to hear more"
                          : "Give us a brief about your query"
                      }
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* Tab-specific Checkboxes */}
                  {activeTab !== "quote" && (
                    <div className="flex items-start gap-3 pt-2 animate-in fade-in duration-300">
                      <input
                        required
                        type="checkbox"
                        id="consent-checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-3.5 w-3.5 border-[#C3C3C3] rounded-none focus:ring-[#024787] text-[#024787]"
                      />
                      <label htmlFor="consent-checkbox" className="text-xs text-slate-500 leading-tight font-inter">
                        I have read the{" "}
                        <a href="/terms" target="_blank" className="text-[#024787] font-semibold underline hover:text-blue-700">
                          privacy policy
                        </a>{" "}
                        and consent to the processing of my data for the purpose of handling my enquiry.
                      </label>
                    </div>
                  )}

                  {/* Submit Button - Rectangular, Right-Aligned */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 bg-black text-white hover:bg-slate-900 transition-colors flex items-center gap-3 font-semibold text-xs uppercase tracking-widest rounded-none disabled:opacity-50 font-poppins"
                    >
                      {isSubmitting ? (
                        <>
                          Processing... <Loader2 className="animate-spin h-3.5 w-3.5" />
                        </>
                      ) : (
                        <>
                          {activeTab === "quote" ? "Send Enquiry" : "Submit"}
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* --- OUR LOCATIONS SECTION --- */}
      <section className="bg-slate-50 pt-20 pb-28 px-6 rounded-[60px] mx-4 mt-20 mb-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mb-4 font-poppins">
              Our Locations
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-normal font-inter">
              We work in all corners of the world. Find an Obsidian Six location near you.
            </p>
          </div>

          {/* Two Office Locations Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Mumbai Location */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-6 text-left">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/images/locations/mumbai.png"
                  alt="Mumbai BKC Office"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🇮🇳</span>
                  <h3 className="text-lg font-bold text-slate-900 font-poppins uppercase tracking-wide">Mumbai Office</h3>
                </div>
                <div className="text-slate-600 font-inter text-sm md:text-base leading-relaxed space-y-1">
                  <p className="font-semibold text-slate-800">Obsidian Six Technology Solutions Pvt. Ltd.</p>
                  <p>Platinum BKC, 3rd Floor,</p>
                  <p>Bandra, Mumbai 400051</p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Platinum+BKC+Bandra+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#024787] hover:underline font-poppins"
                  >
                    <span>📍 Google Map</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bhopal Location */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-6 text-left">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/images/locations/bhopal.png"
                  alt="Bhopal Office"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🇮🇳</span>
                  <h3 className="text-lg font-bold text-slate-900 font-poppins uppercase tracking-wide">Bhopal Office</h3>
                </div>
                <div className="text-slate-600 font-inter text-sm md:text-base leading-relaxed space-y-1">
                  <p className="font-semibold text-slate-800">Obsidian Six Technology Solutions Pvt. Ltd.</p>
                  <p>Danish Nagar, Hoshangabad Road,</p>
                  <p>Bhopal 462026</p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Danish+Nagar+Hoshangabad+Road+Bhopal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#024787] hover:underline font-poppins"
                  >
                    <span>📍 Google Map</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Details Grid below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            
            {/* Card 1: General Enquiry */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 text-left">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-poppins">General Enquiry</h4>
                <a href="tel:+918085652729" className="text-sm font-bold text-slate-800 hover:text-blue-600 mt-1 block font-inter truncate">+91 80856 52729</a>
              </div>
            </div>

            {/* Card 2: Sales Enquiry */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 text-left">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-poppins">Sales Enquiry</h4>
                <a href="tel:+918085652729" className="text-sm font-bold text-slate-800 hover:text-blue-600 mt-1 block font-inter truncate">+91 80856 52729</a>
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 text-left">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-poppins">Email</h4>
                <a href="mailto:info@obsidiansix.com" className="text-sm font-bold text-slate-800 hover:text-blue-600 mt-1 block font-inter break-all">info@obsidiansix.com</a>
              </div>
            </div>

            {/* Card 4: HR Enquiry */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 text-left">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-poppins">HR Enquiry</h4>
                <a href="mailto:hr@obsidiansix.com" className="text-sm font-bold text-slate-800 hover:text-blue-600 mt-1 block font-inter break-all">hr@obsidiansix.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsRouter;