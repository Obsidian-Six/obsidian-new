
import type { Metadata } from 'next';
import Image from 'next/image';

// 1. Meta Tags Implementation (SEO Blueprint Section 3 & 4)
export const metadata: Metadata = {
    title: 'Digital Marketing Agency in UAE | SEO & SMM',
    description: 'Performance-driven digital marketing agency in UAE offering SEO, SMM, PPC and branding services. Grow your business with expert strategies. Contact us today.',
    alternates: { canonical: '/digital-marketing-agency-uae' },
};

export default function SEOLandingPage() {
    const services = [
        "SEO Services in UAE", "Social Media Marketing in UAE",
        "Performance Marketing & PPC", "Branding & Identity Solutions",
        "Website & Corporate Development", "E-commerce Development Services"
    ];

    return (
        /* RESPONSIVE CONTAINER: 
           - pt-40: Clears top navigation to prevent overlapping.
           - max-w-7xl: Standard professional width.
        */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 font-sans text-slate-900">

            {/* 2. HERO SECTION (H1 Strategy - Technical Instruction #1) */}
            <section className="mb-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-blue-900 mb-6 uppercase">
                        Digital Marketing <br />
                        Agency in UAE
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                        Scale your business with the leading performance-driven agency.
                        Expert strategies tailored for the <span className="text-blue-600 font-semibold">UAE market</span>.
                    </p>
                </div>

                {/* 3. SERVICES GRID (H2 Strategy - Section 5) */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">
                    Our Digital Marketing Services in UAE
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={i} className="group p-10 border border-slate-100 rounded-3xl shadow-sm hover:shadow-2xl transition-all bg-white border-b-8 border-b-blue-600 hover:-translate-y-2">
                            <h3 className="font-bold text-2xl text-slate-800 group-hover:text-blue-600 transition-colors">{service}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. VISUAL BREAK (Image Alt Optimization - Section 6) */}
            <div className="relative h-64 md:h-[600px] w-full rounded-[3rem] overflow-hidden mb-24 shadow-2xl border-8 border-white">
                <Image
                    src="/images/Social-media.webp"
                    alt="digital marketing agency in uae" // Primary Keyword Alt Tag
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* 5. INDUSTRIES & VALUE PROPOSITION (H2 Strategy) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
                {/* Industries List */}
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

                {/* Why Choose Us List */}
                <div className="bg-blue-900 text-white p-12 rounded-[2.5rem] shadow-2xl flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-10">Why Choose Obsidian Six in UAE</h2>
                    <ul className="space-y-6">
                        {[
                            "Experience working with UAE clients", "ROI-focused marketing strategies",
                            "Data-driven campaign execution", "Industry-specific marketing expertise",
                            "Complete digital solutions under one roof"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start space-x-4 text-xl text-blue-100">
                                <span className="text-blue-400 font-black text-2xl">✓</span>
                                <span className="leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* 6. FAQ SECTION - Animated Professional Implementation */}
            <section className="max-w-5xl mx-auto mb-20">
                <h2 className="text-4xl font-black mb-16 text-center text-blue-900 uppercase tracking-widest">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {[
                        {
                            q: "1. What services does a digital marketing agency in UAE provide?",
                            a: "A digital marketing agency in UAE typically offers SEO, social media marketing, PPC advertising, performance marketing, branding, and website development to help businesses grow online."
                        },
                        {
                            q: "2. How much does digital marketing cost in UAE?",
                            a: "The cost depends on your business goals, industry competition, and required services. Pricing varies based on campaign scope and marketing channels used."
                        },
                        {
                            q: "3. How long does it take to see results from SEO in UAE?",
                            a: "SEO usually takes 3 to 6 months to show measurable improvements, depending on competition, website condition, and strategy implementation."
                        },
                        {
                            q: "4. Do you provide digital marketing services in Dubai and Abu Dhabi?",
                            a: "Yes, we work with businesses across Dubai, Abu Dhabi, and other regions of the UAE, delivering customized marketing strategies."
                        },
                        {
                            q: "5. Can you handle digital marketing for finance and corporate companies in UAE?",
                            a: "Yes, we have experience working with finance and corporate businesses, providing industry-focused digital strategies and performance campaigns."
                        },
                        {
                            q: "6. Why should I hire a digital marketing agency instead of doing it in-house?",
                            a: "Hiring a digital marketing agency gives you access to experienced specialists, advanced tools, and data-driven strategies without the overhead costs of building an in-house team."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="group bg-white rounded-3xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-md overflow-hidden">
                            {/* Hidden Checkbox to handle state */}
                            <input type="checkbox" id={`faq-${i}`} className="peer hidden" />

                            {/* Clickable Header */}
                            <label
                                htmlFor={`faq-${i}`}
                                className="flex justify-between items-center cursor-pointer p-8 select-none"
                            >
                                <span className="text-xl font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
                                    {faq.q}
                                </span>
                                <span className="flex-shrink-0 ml-4 transition-transform duration-500 peer-checked:rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </label>

                            {/* Animated Body using Grid Trick */}
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