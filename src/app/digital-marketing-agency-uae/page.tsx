'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DigitalMarketingBlog from './digitalmarketingBlog';
import { CheckCircle2, ArrowRight, X, BookOpen } from 'lucide-react';

export default function SEOLandingPage() {
    const [isBlogOpen, setIsBlogOpen] = useState(false);

    const services = [
        "SEO Services in UAE", "Social Media Marketing in UAE",
        "Performance Marketing & PPC", "Branding & Identity Solutions",
        "Website & Corporate Development", "E-commerce Development Services"
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 font-sans text-slate-900">

            {/* 1. HERO SECTION */}
            <section className="mb-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-blue-900 mb-6 uppercase text-balance">
                        Digital Marketing <br />
                        Agency in UAE
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                        Scale your business with the leading performance-driven agency.
                        Expert strategies tailored for the <span className="text-blue-600 font-semibold">UAE market</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={i} className="group p-10 border border-slate-100 rounded-3xl shadow-sm hover:shadow-2xl transition-all bg-white border-b-8 border-b-blue-600 hover:-translate-y-2">
                            <h3 className="font-bold text-2xl text-slate-800 group-hover:text-blue-600 transition-colors">{service}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. FEATURED BLOG CARD */}
            <section className="mb-24">
                <div className="bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl border-4 border-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                        <div className="p-12 md:p-20">
                            <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-sm mb-6">
                                <BookOpen size={20} />
                                <span>Featured Guide</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                                Digital Marketing in UAE: A Complete Guide
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Learn how the landscape in Dubai has shifted and why your business needs a tailored strategy to compete in 2026.
                            </p>
                            <Link
                                href="/digital-marketing-agency-uae/blog"
                                className="group flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all active:scale-95"
                            >
                                Read Full Article
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="hidden lg:block relative h-full min-h-[500px]">
                            <Image
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                                alt="Marketing Analysis"
                                fill
                                className="object-cover opacity-60"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. BLOG OVERLAY */}
            {isBlogOpen && (
                <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-300">
                    <div className="sticky top-0 z-[110] bg-white/80 backdrop-blur-md border-b border-slate-100">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                            <span className="font-bold text-blue-900 uppercase tracking-widest">Industry Insights</span>
                            <button
                                onClick={() => setIsBlogOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={28} className="text-slate-600" />
                            </button>
                        </div>
                    </div>
                    <div className="pt-10 pb-20">
                        <DigitalMarketingBlog />
                    </div>
                </div>
            )}

            {/* 4. VISUAL BREAK */}
            <div className="relative h-64 md:h-[600px] w-full rounded-[3rem] overflow-hidden mb-24 shadow-2xl border-8 border-white">
                <Image
                    src="/images/Social-media.webp"
                    alt="digital marketing agency in uae"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* 5. INDUSTRIES & VALUE PROPOSITION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
                <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200">
                    <h2 className="text-3xl font-bold mb-10 text-slate-800">Industries We Serve in UAE</h2>
                    <ul className="grid grid-cols-1 gap-5">
                        {["Finance & Corporate Sector", "Healthcare & Hospitality", "Travel & NGOs"].map((industry, i) => (
                            <li key={i} className="flex items-center space-x-4 text-xl text-slate-700 bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
                                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                                <span className="font-medium">{industry}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-blue-900 text-white p-12 rounded-[2.5rem] shadow-2xl flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-10 text-white">Why Choose Obsidian Six</h2>
                    <ul className="space-y-6">
                        {[
                            "Experience working with UAE clients", "ROI-focused marketing strategies",
                            "Data-driven campaign execution", "Industry-specific marketing expertise",
                            "Complete digital solutions under one roof"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start space-x-4 text-xl text-blue-100">
                                <CheckCircle2 className="text-blue-400 mt-1" size={24} />
                                <span className="leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 6. FAQ SECTION */}
            <section className="max-w-5xl mx-auto mb-20">
                <h2 className="text-4xl font-black mb-16 text-center text-blue-900 uppercase tracking-widest">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {[
                        { q: "1. What services does a digital marketing agency in UAE provide?", a: "A digital marketing agency in UAE typically offers SEO, social media marketing, PPC advertising, and performance marketing." },
                        { q: "2. How much does digital marketing cost in UAE?", a: "The cost depends on your business goals and industry competition. Pricing varies based on campaign scope." },
                        { q: "3. How long does it take to see results from SEO in UAE?", a: "SEO usually takes 3 to 6 months to show measurable improvements depending on competition." },
                        { q: "4. Do you provide digital marketing services in Dubai and Abu Dhabi?", a: "Yes, we work with businesses across Dubai, Abu Dhabi, and other regions of the UAE." }
                    ].map((faq, i) => (
                        <div key={i} className="group bg-white rounded-3xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-blue-400 overflow-hidden">
                            <input type="checkbox" id={`faq-${i}`} className="peer hidden" />
                            <label htmlFor={`faq-${i}`} className="flex justify-between items-center cursor-pointer p-8 select-none">
                                <span className="text-xl font-bold text-slate-800 group-hover:text-blue-900">{faq.q}</span>
                                <span className="flex-shrink-0 ml-4 transition-transform duration-500 peer-checked:rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </label>
                            <div className="grid transition-all duration-500 ease-in-out grid-rows-[0fr] peer-checked:grid-rows-[1fr] opacity-0 peer-checked:opacity-100">
                                <div className="overflow-hidden">
                                    <div className="px-8 pb-8 text-slate-600 text-lg leading-relaxed pt-2 border-t border-slate-50">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}