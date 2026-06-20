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

const whyContactUs = [
  {
    title: "CLARITY-FIRST",
    desc: "Expect transparent, strategy-led guidance before any commitment is made.",
    img: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg",
  },
  {
    title: "FAST REPLIES",
    desc: "Because every minute counts- We respond within 24 hours to keep your ideas flowing",
    img: "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "TAILORED SYSTEMS",
    desc: "Every recommendation is engineered specifically for your commercial objectives.",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  },
];

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
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white pt-28 pb-20 px-6">
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
                  <p className="text-slate-500 font-medium mt-6 text-sm md:text-base leading-relaxed max-w-md">
                    {currentLeft.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Brochure Card */}
            <div className="pt-4">
              <Link
                href="/download-brochure"
                className="group flex items-center gap-6 p-4 bg-white border border-[#E5E7EB] hover:border-slate-300 transition-all shadow-sm max-w-sm"
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
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                    Download Our Brochure
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1.5 uppercase">
                    PDF 7.1 MB <Download size={12} className="text-slate-400" />
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
                  <h2 className="text-3xl font-bold mb-2">Message Sent!</h2>
                  <p className="text-slate-500 text-base mb-6">
                    Our strategy team will review your details and reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#024787] font-bold uppercase tracking-widest text-xs hover:underline"
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
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-sans h-14 md:h-14 bg-white"
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
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-sans h-14 md:h-14 bg-white"
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
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-sans h-14 md:h-14 bg-white"
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
                          inputClass="!w-full !border !border-[#C3C3C3] !pl-[52px] !pr-4 !py-3.5 !text-sm md:!text-base !outline-none !rounded-none focus:!border-[#024787] !font-sans !h-14 bg-white"
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
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-sans h-14 md:h-14 bg-white"
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
                        className="w-full border border-[#C3C3C3] px-4 py-3.5 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-sans h-14 md:h-14 bg-white"
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
                      <span className="text-xs text-slate-400 font-medium font-sans">
                        {message.length}/1000
                      </span>
                    </div>
                    <textarea
                      required
                      maxLength={1000}
                      className="w-full border border-[#C3C3C3] p-4 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-sans h-44 resize-none bg-white"
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
                      <label htmlFor="consent-checkbox" className="text-xs text-slate-500 leading-tight">
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

      {/* --- WHY PARTNER SECTION --- */}
      <section className="bg-slate-50 pt-20 pb-40 px-6 rounded-[60px] mx-4 mt-20 mb-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-24">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-950 mb-8 font-poppins">
              Why partner <br /> with us?
            </h2>
            <div className="h-1 w-20 bg-blue-600" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {whyContactUs.map((item, idx) => (
              <div key={idx} className="group">
                <div className="relative h-[400px] w-full rounded-[40px] overflow-hidden mb-8 shadow-lg">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-blue-600 font-bold text-[10px] tracking-widest uppercase">
                  0{idx + 1} — {item.title}
                </span>
                <p className="text-slate-600 mt-4 text-lg font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsRouter;