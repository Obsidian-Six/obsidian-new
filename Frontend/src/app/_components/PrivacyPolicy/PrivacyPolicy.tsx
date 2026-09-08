"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Globe, Lock, Cookie, UserCheck, ArrowRight } from "lucide-react";

const sections = [
    { id: "intro", title: "1. Introduction" },
    { id: "legal", title: "2. Legal Basis" },
    { id: "collect", title: "3. Information We Collect" },
    { id: "usage", title: "4. How We Use Information" },
    { id: "cookies", title: "5. Cookies" },
    { id: "security", title: "7. Data Security" },
    { id: "rights", title: "10. User Rights" },
    { id: "contact", title: "14. Contact Us" },
];

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section id="privacy" className="scroll-mt-20">
            <div className="min-h-screen bg-white text-gray-900 selection:bg-[#052D69] selection:text-white">
                
                <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16">
                    {/* STICKY SIDEBAR */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-12 space-y-2">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 px-4">Policy Contents</h4>
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="block text-xs font-bold text-gray-500 hover:text-[#052D69] hover:bg-gray-50 transition-all py-3 px-4 rounded-xl border-l-2 border-transparent hover:border-[#052D69]"
                                >
                                    {section.title}
                                </a>
                            ))}

                            {/* UPDATED: Bigger Links in Sidebar Box */}
                            <div className="mt-12 p-8 bg-black rounded-[2.5rem] text-white shadow-xl shadow-purple-500/10">
                                <p className="text-[10px] font-black text-[#052D69] uppercase tracking-[0.3em] mb-4">Navigation</p>
                                <div className="space-y-4">
                                    <Link href="/terms" className="text-lg font-black text-white hover:text-[#052D69] transition-colors flex items-center justify-between group">
                                        Terms <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <div className="h-[1px] bg-white/10 w-full"></div>
                                    <Link href="/terms" className="text-lg font-black text-[#052D69] transition-colors flex items-center justify-between group">
                                        Privacy <ArrowRight className="w-5 h-5 opacity-50" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <main className="flex-1 prose prose-lg prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-black prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-black max-w-none">

                        <section id="intro" className="scroll-mt-10">
                            <h2 className="text-3xl md:text-5xl mb-6">1. Introduction</h2>
                            <p>
                                Obsidian Six (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy, confidentiality, and security of your personal data. This Privacy Policy explains how we collect, use, process, store, disclose, and protect personal data you provide when you access or use the website
                                <Link href="https://obsidiansix.com" className="text-[#052D69] font-bold mx-1 hover:underline">https://obsidiansix.com</Link>
                                (the &ldquo;Website&rdquo;), use our services, or otherwise interact with us. By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                            </p>
                            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl my-8">
                                <p className="m-0 text-red-900 font-black text-sm uppercase tracking-tight">
                                    Warning: If you do not agree with any part of this Privacy Policy, you must discontinue using the Website immediately.
                                </p>
                            </div>
                        </section>

                        <section id="legal" className="mt-20 scroll-mt-10">
                            <h2 className="text-3xl md:text-4xl">2. Legal Basis and Consent</h2>
                            <p>
                                By voluntarily providing your personal data or by continuing to use the Website or our services, you expressly consent to the collection, processing, storage, and use of your personal data in accordance with this Privacy Policy and applicable law.
                            </p>
                        </section>

                        <section id="collect" className="mt-20 scroll-mt-10">
                            <h2 className="text-3xl md:text-4xl">3. Information We Collect</h2>
                            <div className="grid md:grid-cols-2 gap-8 mt-8">
                                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                    <h3 className="m-0 text-xl font-black mb-4 flex items-center gap-3">
                                        <UserCheck className="text-[#052D69]" /> Personal Data
                                    </h3>
                                    <p className="m-0 text-sm font-medium leading-relaxed">
                                        Full name, email address, phone number, company name, billing/contact address, and any information provided via inquiries.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                    <h3 className="m-0 text-xl font-black mb-4 flex items-center gap-3">
                                        <Globe className="text-[#052D69]" /> Automatic Data
                                    </h3>
                                    <p className="m-0 text-sm font-medium leading-relaxed">
                                        IP address, browser type, OS, pages visited, timestamps, device unique identifiers, and cookie-based information.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section id="usage" className="mt-20 scroll-mt-10">
                            <h2 className="text-3xl md:text-4xl">4. How We Use Your Information</h2>
                            <p>We leverage collected data for the following essential business purposes:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                                {["Operate & improve services", "Respond to specific inquiries", "Send promotional updates", "Analyze usage trends", "Prevent fraud & enhance security"].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 bg-white border-2 border-gray-50 p-4 rounded-2xl font-bold text-sm shadow-sm">
                                        <ShieldCheck className="text-[#052D69] shrink-0" size={20} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section id="cookies" className="mt-20 scroll-mt-10">
                            <h2 className="text-3xl md:text-4xl flex items-center gap-4">
                                5. Cookies <Cookie className="text-[#052D69]" />
                            </h2>
                            <p>
                                We use cookies and similar technologies to enhance user experience, analyze trends, and administer the Website. You may disable cookies through browser settings, though some features may not function properly.
                            </p>
                        </section>

                        <section id="security" className="mt-20 scroll-mt-10">
                            <h2 className="text-3xl md:text-4xl flex items-center gap-4">
                                7. Data Security <Lock className="text-[#052D69]" />
                            </h2>
                            <p>
                                We implement reasonable technical and organizational measures to protect your personal data. However, no system is completely secure, and absolute security cannot be guaranteed. We protect your data as if it were our own.
                            </p>
                        </section>

                        <section id="rights" className="mt-20 scroll-mt-10">
                            <h2 className="text-3xl md:text-4xl">10. User Rights</h2>
                            <p>
                                You maintain full control over your data. At any time, you may request access, correction, or deletion of your personal data, or withdraw consent by reaching out to our legal team.
                            </p>
                        </section>

                        {/* FINAL CONTACT SECTION */}
                        <section id="contact" className="mt-24 mb-10 p-8 md:p-16 bg-black rounded-[3rem] text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-white !mt-0 text-3xl md:text-5xl tracking-tighter">14. Contact Us</h2>
                                <p className="text-gray-400 font-bold mb-12">Have questions? We are here to provide clarity.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <a href="mailto:info@obsidiansix.com" className="flex items-center gap-6 group cursor-pointer">
                                        <div className="w-16 h-16 bg-[#052D69] rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
                                            <Mail size={32} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Email Support</p>
                                            <p className="text-lg md:text-xl font-black group-hover:text-[#052D69] transition-colors">info@obsidiansix.com</p>
                                        </div>
                                    </a>

                                    <a href="tel:+918085652729" className="flex items-center gap-6 group cursor-pointer">
                                        <div className="w-16 h-16 bg-[#052D69] rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
                                            <Globe size={32} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Inquiry Line</p>
                                            <p className="text-lg md:text-xl font-black group-hover:text-[#052D69] transition-colors">+91 80856 52729</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#052D69] rounded-full blur-[120px] opacity-20"></div>
                        </section>

                      
                    </main>
                </div>
            </div>
        </section>
    );
}