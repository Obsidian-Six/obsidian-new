"use client";

import { useState } from "react";
import Image from "next/image";
import type Contact from "@/lib/models/contact.types";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { handleContactUsFormSubmission } from "@/lib/services/contact.api";
import { Phone, Mail, MapPin, ArrowRight, Linkedin,Instagram , CheckCircle2, Loader2 } from "lucide-react";
import {FaTelegramPlane} from "react-icons/fa";

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

const serviceTags = [
  "Website Development", "Complete Digital Marketing", "Social Media Marketing",
  "Content Marketing", "SEO", "PPC Ads", "Email Marketing", "Design Services", "Others",
];

const ContactUsRouter = () => {
  // --- FORM STATE ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- HANDLERS ---
  const toggleService = (tag: string) => {
    setSelectedServices(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contactData: Contact = {
      firstName,
      lastName,
      email,
      phone,
      selectedServices,
      companyName,
      companyWebsite,
    };

    try {
      await handleContactUsFormSubmission(contactData);
      setIsSubmitted(true);
      // Reset form
      setFirstName(""); setLastName(""); setEmail(""); setPhone("");
      setCompanyName(""); setCompanyWebsite(""); setSelectedServices([]);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            Contact Obsidian Six
          </span>
          <h1 className="text-6xl md:text-[120px] font-bold tracking-tighter leading-[0.85] text-slate-950 mb-12">
            Let&apos;s Recreate  <br />
            <span className="text-slate-300 italic font-serif font-light">The Future.</span>
          </h1>
        </div>
      </section>

      {/* --- FORM & INFO SECTION --- */}
      <section className="pb-20 px-6 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">

            {/* LEFT: THE MODERN GUIDED FORM */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[40px] p-8 md:p-14 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]">

                {isSubmitted ? (
                  <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                    <CheckCircle2 className="w-20 h-20 text-[#024787] mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-4">Message Received.</h2>
                    <p className="text-slate-500 text-lg mb-8">Our strategy team will reach out within 24 hours.</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#024787] font-bold uppercase tracking-widest text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-16" onSubmit={handleFormSubmit}>

                    {/* STEP 01: IDENTITY */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center">01</span>
                        <p className="text-[14px] font-bold text-slate-400 uppercase tracking-[0.2em]">Personal Details</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="relative group">
                          <input
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            placeholder="First Name"
                            className="w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-[#024787] transition-all text-xl font-medium placeholder:text-slate-300"
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#024787] group-focus-within:w-full transition-all duration-500" />
                        </div>
                        <div className="relative group">
                          <input
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            placeholder="Last Name"
                            className="w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-[#024787] transition-all text-xl font-medium placeholder:text-slate-300"
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#024787] group-focus-within:w-full transition-all duration-500" />
                        </div>
                      </div>
                    </div>

                    {/* STEP 02: CONTACT */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center">02</span>
                        <p className="text-[14px] font-bold text-slate-400 uppercase tracking-[0.2em]">Reachability</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="relative group">
                          <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-[#024787] transition-all text-xl font-medium placeholder:text-slate-300"
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#024787] group-focus-within:w-full transition-all duration-500" />
                        </div>

                        {/* PHONE INPUT WITH FIXES */}
                        <div className="relative group border-b border-slate-200 focus-within:border-[#024787] transition-all">
                          <PhoneInput
                            country={"in"}
                            value={phone}
                            onChange={(val : string) => setPhone(val)}
                            placeholder="Phone Number"
                            // Fixed styles for dropdown and scrolling
                            containerClass="!w-full !border-none"
                            inputClass="!w-full !bg-transparent !border-none !text-xl !font-medium !h-[60px] !pl-14 !outline-none font-sans"
                            buttonClass="!bg-transparent !border-none !transition-all hover:!bg-transparent"
                            dropdownClass="!rounded-2xl !border-slate-100 !shadow-2xl !text-base !max-h-[300px] !overflow-y-auto"
                            searchClass="!font-sans !text-sm !py-2"
                            enableSearch={true}
                          />
                        </div>
                      </div>
                    </div>
                    {/* STEP 03: SERVICES */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center">03</span>
                        <p className="text-[14px] font-bold text-slate-400 uppercase tracking-[0.2em]">Inquiry Interest</p>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {serviceTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleService(tag)}
                            className={`px-6 py-3 rounded-full border text-[13px] font-bold transition-all duration-300 ${selectedServices.includes(tag)
                                ? "bg-[#024787] border-[#024787] text-white shadow-xl shadow-purple-200 scale-105"
                                : "border-slate-100 text-slate-500 hover:border-slate-900 hover:text-slate-900"
                              }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* STEP 04: BUSINESS */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center">04</span>
                        <p className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.2em]">Company Details</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="relative group">
                          <input
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            type="text"
                            placeholder="Company Name"
                            className="w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-[#024787] transition-all text-xl font-medium placeholder:text-slate-300"
                          />
                        </div>
                        <div className="relative group">
                          <input
                            value={companyWebsite}
                            onChange={(e) => setCompanyWebsite(e.target.value)}
                            type="text"
                            placeholder="Website URL (Optional)"
                            className="w-full bg-transparent border-b border-slate-200 py-4 outline-none focus:border-[#024787] transition-all text-xl font-medium placeholder:text-slate-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SUBMIT */}
                    <div className="pt-10">
                      <button
                        disabled={isSubmitting}
                        className="group relative w-full flex items-center justify-between bg-[#024787] text-white p-7 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm hover:bg-slate-900 transition-all shadow-2xl shadow-purple-200 disabled:opacity-50"
                      >
                        {isSubmitting ? "Initiating Sync..." : "Claim Your Free Strategy"}
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <ArrowRight className="group-hover:translate-x-2 transition-transform" />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT: CONTACT INFO */}
            <div className="lg:col-span-5 space-y-12 py-8">
              <div>
                <h3 className="text-sm font-bold text-[#024787] uppercase tracking-[0.3em] mb-8">Reach Out</h3>
                <div className="space-y-10">
                  <ContactItem icon={<Mail size={24} />} label="Email Us" value="info@obsidiansix.io" />
                  <ContactItem icon={<Phone size={24} />} label="Call Us" value="+91 80856 52729" />
                  <ContactItem icon={<MapPin size={24} />} label="Visit Us" value="Platinum BKC, Bandra, Mumbai" />
                </div>
              </div>

              <div className="pt-12 border-t border-slate-100">
                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  Ready for a technical edge? Join 50+ brands that scaled their revenue through our digital systems.
                </p>
                <div className="flex items-center gap-6 group">
                  <div className="p-3 bg-slate-50 rounded-full group-hover:bg-[#024787] group-hover:text-white transition-all">
                    <Linkedin size={20} className="cursor-pointer" />
                  </div>
                  <a
                    href="https://www.linkedin.com/company/obsidian-six/"
                    target="_blank"
                    className="text-slate-900 font-bold text-sm tracking-[0.2em] cursor-pointer hover:text-[#024787] transition-colors"
                  >
                    LINKEDIN
                  </a>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="p-3 bg-slate-50 rounded-full group-hover:bg-[#024787] group-hover:text-white transition-all">
                    <Instagram size={20} className="cursor-pointer" />
                  </div>
                  <a
                    href="https://www.instagram.com/obsidiansixofficial?igsh=dWNoenEwZXR3dGlj"
                    target="_blank"
                    className="text-slate-900 font-bold text-sm tracking-[0.2em] cursor-pointer hover:text-[#024787] transition-colors"
                  >
                    INSTAGRAM
                  </a>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="p-3 bg-slate-50 rounded-full group-hover:bg-[#024787] group-hover:text-white transition-all">
                    <FaTelegramPlane size={20} className="cursor-pointer" />
                  </div>
                  <a
                    href="https://t.me/aadarsh11"
                    target="_blank"
                    className="text-slate-900 font-bold text-sm tracking-[0.2em] cursor-pointer hover:text-[#024787] transition-colors"
                  >
                    TELEGRAM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- WHY PARTNER SECTION --- */}
      <section className="bg-slate-50 pt-0 pb-40 px-6 rounded-[60px] mx-4 mb-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-24">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-950 mb-8">
              Why partner <br /> with us?
            </h2>
            <div className="h-1 w-20 bg-blue-600" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {whyContactUs.map((item, idx) => (
              <div key={idx} className="group">
                <div className="relative h-[400px] w-full rounded-[40px] overflow-hidden mb-8 shadow-lg">
                  <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-blue-600 font-bold text-[10px] tracking-widest uppercase">0{idx + 1} — {item.title}</span>
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

const ContactItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-start gap-6 group">
    <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-50 text-slate-400 group-hover:text-blue-600 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-900 tracking-tight">{value}</p>
    </div>
  </div>
);

export default ContactUsRouter;