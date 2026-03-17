"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  TrendingUp,
  Search,
  Share2,
  MousePointerClick,
  BarChart3,
  Globe,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

const DigitalMarketingBlog: React.FC = () => {
  const faqs = [
    { q: "What is digital marketing in UAE?", a: "Digital marketing in UAE refers to promoting products or services using online channels such as search engines, social media platforms, websites, and paid advertising within the UAE market." },
    { q: "Why is digital marketing in Dubai important?", a: "It helps businesses reach online audiences, increase brand visibility, and generate leads in one of the world’s most competitive business environments." },
    { q: "Which services are included?", a: "Common services include SEO, social media marketing, content marketing, paid advertising, email marketing, and website optimization." },
    { q: "How does SEO help?", a: "SEO improves a website’s ranking on Google, allowing businesses to attract organic traffic and reach potential customers searching for their services." },
    { q: "Is it suitable for small businesses?", a: "Yes. It allows small businesses to target specific audiences and compete with larger companies online effectively." },
    { q: "How long to see results?", a: "Results vary: SEO may take several months, while paid advertising campaigns can generate results more quickly." },
  ];

  const services = [
    { title: "SEO", icon: <Search size={20} />, desc: "Improving search rankings to attract organic traffic." },
    { title: "Social Media", icon: <Share2 size={20} />, desc: "Engaging audiences on Instagram, LinkedIn, and Facebook." },
    { title: "Paid Ads", icon: <MousePointerClick size={20} />, desc: "Targeted Google and Social Ads for immediate reach." },
    { title: "Content", icon: <TrendingUp size={20} />, desc: "Educating customers through high-quality blogs and videos." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {/* --- Back Button --- */}
        <nav className="mb-12">
          <Link
            href="/digital-marketing-agency-uae"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#762375] transition-colors font-medium group"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-sm tracking-widest uppercase">Back to Digital Marketing</span>
          </Link>
        </nav>

        <div className="space-y-20">
          {/* --- 1. Intro & PHOTO 1 --- */}
          <section className="prose prose-zinc lg:prose-lg max-w-none">
            <div className="md:flex md:items-start md:gap-8">
              <div className="flex-1">
                <p className="leading-relaxed text-zinc-700 font-medium">
                  Companies are now using platforms more to reach customers and grow their brands. This is why <strong>digital marketing in UAE</strong> has become very important for businesses of all sizes. Dubai has become a business center where companies compete not just locally but also globally.
                </p>
              </div>
              <div className="relative w-full md:w-64 h-64 mt-6 md:mt-0 shadow-lg rounded-xl overflow-hidden">
                <Image
                  src="/DigitalMarketingPhotos/image1.png"
                  alt="A professional team discussing digital marketing in UAE"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* --- PHOTO 2 (Full Width Break) --- */}
          <section>
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/DigitalMarketingPhotos/image2.png"
                alt="Overview of the high-tech digital marketing in Dubai landscape"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-xs text-zinc-400 mt-3 tracking-wider uppercase">Visualizing Dubais Digital Connectivity</p>
          </section>

          {/* --- 2. Why Dubai Section & PHOTO 3 --- */}
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Globe className="text-[#762375]" /> Why Businesses Need Digital Marketing in Dubai
            </h2>
            <div className="md:flex md:items-start md:gap-10">
              <div className="relative w-full md:w-72 h-56 mb-6 md:mb-0 shadow-md rounded-xl overflow-hidden">
                <Image
                  src="/DigitalMarketingPhotos/image3.png"
                  alt="Concept of global digital connectivity and networking in UAE"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 bg-zinc-50 p-8 border-l-4 border-[#762375]">
                <p className="text-zinc-700 leading-relaxed font-medium">
                  Dubai has one of the most digitally connected populations in the world. With high smartphone and social media penetration, companies must reach customers where they spend time: <strong>Online.</strong> Without a digital presence, businesses struggle to stay ahead.
                </p>
              </div>
            </div>
          </section>

          {/* --- PHOTO 4 --- */}
          <section className="flex justify-center">
            <div className="relative w-full max-w-2xl aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/DigitalMarketingPhotos/image4.png"
                alt="Digital marketing strategy and planning session"
                fill
                className="object-cover"
              />
            </div>
          </section>

          {/* --- 3. Services Grid --- */}
          <section>
            <h2 className="text-2xl font-bold mb-10">Key Services Included in Digital Marketing UAE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((s, i) => (
                <div key={i} className="p-8 border border-zinc-100 rounded-xl hover:shadow-lg transition-all bg-white hover:-translate-y-1">
                  <div className="text-[#762375] mb-5 p-3 bg-violet-50 inline-block rounded-lg">{s.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-zinc-950">{s.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* --- 4. Benefits Section & PHOTO 5 --- */}
          <section>
            <div className="md:flex md:items-center md:gap-12">
              <div className="flex-1 space-y-8">
                <h2 className="text-2xl font-bold">Benefits of Going Digital</h2>
                <div className="space-y-5">
                  {[
                    "Global reach from a local hub",
                    "Measurable results through analytics",
                    "Cost-effective compared to traditional media",
                    "Better customer relationship management"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="text-[#762375] mt-1 shrink-0" size={20} />
                      <p className="text-zinc-800 font-semibold text-lg">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full md:w-80 h-[400px] mt-10 md:mt-0 shadow-xl rounded-xl overflow-hidden">
                <Image
                  src="/DigitalMarketingPhotos/image5.png"
                  alt="Business growth charts and digital success metrics"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* --- CTA Section --- */}
          <section className="bg-black text-white p-12 md:p-20 rounded-3xl relative overflow-hidden shadow-2xl shadow-violet-950/20">
            <div className="relative z-10 grid md:grid-cols-5 gap-10 items-center">
              <div className="md:col-span-3">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight tracking-tight">Ready to Grow Your Business?</h2>
                <p className="text-zinc-300 mb-10 max-w-lg leading-relaxed text-lg font-medium">
                  Obsidian Six helps businesses dominate the internet with SEO, performance marketing, and data-driven campaigns tailored for the UAE market.
                </p>
                <a
                  href="https://obsidiansix.com"
                  className="inline-flex items-center gap-4 bg-[#762375] hover:bg-[#8e2a8d] text-white px-10 py-5 rounded-full font-bold transition-all group text-lg"
                >
                  Visit Obsidiansix.com
                  <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
              <div className="md:col-span-2 flex justify-center md:justify-end">
                <div className="w-40 h-40 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center text-zinc-600">
                  <BarChart3 size={64} strokeWidth={1} />
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#762375] opacity-20 blur-[120px]"></div>
          </section>

          {/* --- FAQ Section --- */}
          <section className="border-t border-zinc-100 pt-20">
            <h2 className="text-3xl font-extrabold mb-12 flex items-center gap-4 tracking-tight">
              <BarChart3 className="text-[#762375]" size={28} /> Frequently Asked Questions
            </h2>
            <div className="grid gap-10 md:grid-cols-2">
              {faqs.map((faq, i) => (
                <div key={i} className="group bg-white p-6 rounded-lg border border-zinc-50 hover:border-violet-100 transition-colors hover:shadow-inner">
                  <h3 className="font-bold text-lg mb-3 group-hover:text-[#762375] transition-colors leading-snug">
                    {faq.q}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed text-sm font-medium">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="py-12 border-t border-zinc-100 text-center text-xs text-zinc-400 uppercase tracking-widest bg-zinc-50">
        © 2026 Obsidian Six Digital Insights • Bhopal, MP, India
      </footer>
    </div>
  );
};

export default DigitalMarketingBlog;