"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react"; // Or use an inline SVG arrow if you don't use lucide-react

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function ServicesWeOffer({ items }: { items?: ServiceItem[] }) {
  const services = items && items.length ? items : [];

  return (
    <section id="services" className="w-full bg-slate-50/50 py-16 md:py-24 border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
        
        {/* Section Title */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            Services We Offer
          </h2>
        </div>

        {/* Responsive Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_25px_-12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)] hover:border-slate-200/60 transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1"
            >
              <div className={`w-full h-36 relative bg-gradient-to-br ${service.gradientFrom || 'from-slate-100'} ${service.gradientTo || 'to-white'} overflow-hidden border-b border-slate-50`}>
                <div className="absolute inset-0 opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-white/8" />
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                {service.href && (
                  <Link href={service.href} className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-blue-600">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}