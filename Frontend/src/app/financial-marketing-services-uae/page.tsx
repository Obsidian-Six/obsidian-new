import type { Metadata } from 'next';
import Image from 'next/image';

// 1. Meta Tags Implementation (Technical Instruction #1 & #5)
export const metadata: Metadata = {
    title: 'Financial Marketing Services UAE | Finance Experts',
    description: 'Specialized financial marketing services in UAE for finance firms and consultancies. Drive leads and visibility with expert digital strategies. Contact us today.',
    alternates: { canonical: 'https://abcapitalglobal.com/financial-marketing-services-uae' },
    robots: { index: true, follow: true }, // Technical Instruction #5 (Ensure indexable)
};

export default function FinancialMarketingLandingPage() {
    // Service list aligned with Section 5 Heading Structure
    const financialServices = [
        "SEO for Financial Services",
        "Social Media Marketing for Finance Firms",
        "Performance Marketing & Lead Generation",
        "Corporate Website Development for Financial Companies",
        "Branding & Digital Strategy for Finance Sector"
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 font-sans text-slate-900">

            {/* 2. HERO SECTION (H1 Strategy - Technical Instruction #2) */}
            <section className="mb-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-blue-900 mb-6 uppercase">
                        Financial Marketing <br />
                        Services in UAE
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                        Scale your finance firm with the leading performance-driven agency. 
                        Expert strategies tailored for the <span className="text-blue-600 font-semibold">UAE financial market</span>.
                    </p>
                </div>

                {/* 3. SERVICES GRID (H2 Strategy) */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">
                    Marketing Solutions for Financial Companies in UAE
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {financialServices.map((service, i) => (
                        <div key={i} className="group p-10 border border-slate-100 rounded-3xl shadow-sm hover:shadow-2xl transition-all bg-white border-b-8 border-b-blue-600 hover:-translate-y-2">
                            {/* H3 Hierarchy - Technical Instruction #3 */}
                            <h3 className="font-bold text-2xl text-slate-800 group-hover:text-blue-600 transition-colors">
                                {service}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. VISUAL BREAK (Alt Tag Optimization - Technical Instruction #4) */}
            <div className="relative h-64 md:h-[600px] w-full rounded-[3rem] overflow-hidden mb-24 shadow-2xl border-8 border-white">
                <Image
                    src="https://images.unsplash.com/photo-1707761918029-1295034aa31e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="financial marketing agency in uae"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* 5. INDUSTRIES & VALUE PROPOSITION (H2 Strategy) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
                
                {/* Industries List */}
                <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200">
                    <h2 className="text-3xl font-bold mb-10 text-slate-800">Industries We Support</h2>
                    <ul className="grid grid-cols-1 gap-5">
                        {[
                            "Financial Consultancies", 
                            "Investment Firms", 
                            "Accounting & Tax Advisory Firms", 
                            "Corporate Finance Companies"
                        ].map((industry, i) => (
                            <li key={i} className="flex items-center space-x-4 text-xl text-slate-700 bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
                                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                                <span className="font-medium">{industry}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Why Choose Us */}
                <div className="bg-blue-900 text-white p-12 rounded-[2.5rem] shadow-2xl flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-10">Why Choose Us for Financial Marketing in UAE</h2>
                    <ul className="space-y-6">
                        {[
                            "Understanding of UAE financial market", 
                            "Compliance-aware marketing strategies",
                            "Lead-focused performance campaigns", 
                            "Experience with corporate financial clients"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start space-x-4 text-xl text-blue-100">
                                <span className="text-blue-400 font-black text-2xl">✓</span>
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
                        {
                            q: "1. What marketing services do you provide for financial companies in UAE?",
                            a: "We provide specialized financial marketing services in UAE including SEO for financial services, social media marketing, performance marketing, PPC campaigns, corporate website development, and lead generation strategies tailored for finance firms."
                        },
                        {
                            q: "2. How do you ensure compliance in financial marketing campaigns?",
                            a: "We understand that financial marketing requires strict compliance. Our strategies follow industry regulations, platform advertising policies, and ethical marketing standards to ensure safe and compliant campaigns."
                        },
                        {
                            q: "3. Can you generate qualified leads for finance firms in UAE?",
                            a: "Yes, we create targeted lead generation campaigns designed specifically for finance firms, investment companies, and consultancies in UAE. Our approach focuses on attracting high-intent prospects through SEO, paid ads, and performance marketing."
                        },
                        {
                            q: "4. Do you offer SEO specifically for financial services?",
                            a: "Yes, we provide SEO for financial services in UAE, including keyword research, on-page optimization, technical SEO, and authority-building strategies tailored to finance-related search intent."
                        },
                        {
                            q: "5. How much do financial marketing services cost in UAE?",
                            a: "The cost of financial marketing services in UAE depends on the scope of services, campaign objectives, and competition level. We offer customized marketing solutions based on your business goals and growth targets."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="group bg-white rounded-3xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-md overflow-hidden">
                            <input type="checkbox" id={`faq-${i}`} className="peer hidden" />
                            <label htmlFor={`faq-${i}`} className="flex justify-between items-center cursor-pointer p-8 select-none">
                                <span className="text-xl font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                                    {faq.q}
                                </span>
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