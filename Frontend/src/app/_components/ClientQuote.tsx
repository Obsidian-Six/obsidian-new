
"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

type ClientQuoteProps = {
  quote: string;
  clientName: string;
  clientRole: string;
  clientImage?: string;
  companyName?: string;
  companyLogo?: string;
};

export default function ClientQuote({
  quote,
  clientName,
  clientRole,
  clientImage,
  companyName,
  companyLogo,
}: ClientQuoteProps) {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50/80 p-7 shadow-[0_20px_70px_rgba(5,45,105,0.07)] md:p-12 lg:p-16">
        {/* Decorative quote mark */}
        <Quote
          aria-hidden="true"
          className="absolute right-6 top-6 h-24 w-24 text-[#052D69]/[0.06] md:right-12 md:top-10 md:h-36 md:w-36"
          strokeWidth={1}
        />

        {/* Top label */}
        <div className="relative z-10 mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#052D69]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#052D69] md:text-xs">
            Client Perspective
          </span>
        </div>

        {/* Quote */}
        <blockquote className="relative z-10 max-w-5xl">
          <p className="font-serif text-2xl font-normal leading-[1.4] tracking-tight text-[#171923] sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[1.3]">
            “{quote}”
          </p>
        </blockquote>

        {/* Bottom client information */}
        <div className="relative z-10 mt-10 flex flex-col gap-6 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between md:mt-12 md:pt-8">
          <div className="flex items-center gap-4">
            {clientImage ? (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white md:h-20 md:w-20">
                <Image
                  src={clientImage}
                  alt={clientName}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#052D69]/[0.07] text-xl font-semibold text-[#052D69] md:h-20 md:w-20">
                {clientName
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )}

            <div>
              <h3 className="text-base font-semibold text-slate-900 md:text-lg">
                {clientName}
              </h3>
              <p className="mt-1 text-sm text-slate-500 md:text-base">
                {clientRole}
              </p>
            </div>
          </div>

          {companyLogo ? (
            <div className="flex items-center gap-3 sm:justify-end">
              <div className="relative h-10 w-32">
                <Image
                  src={companyLogo}
                  alt={companyName || "Client company logo"}
                  fill
                  sizes="128px"
                  className="object-contain object-left sm:object-right"
                />
              </div>
            </div>
          ) : companyName ? (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-right">
              {companyName}
            </p>
          ) : null}
        </div>

        {/* Decorative bottom accent */}
        <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full border border-[#052D69]/[0.06] md:-bottom-36 md:-right-24 md:h-80 md:w-80" />
        <div className="absolute -bottom-16 -right-8 h-40 w-40 rounded-full border border-[#052D69]/[0.05] md:-bottom-24 md:-right-12 md:h-60 md:w-60" />
      </div>
    </section>
  );
}
