import Link from "next/link";
import Image from "next/image";
import caseStudiesData from "@/lib/store/case-studies";
import type { LandingPageData } from "@/lib/store/landing-pages";
import {
  BUSINESS,
  SITE_URL,
  canonicalUrl,
  faqSchema,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/seo";

/**
 * Server-rendered landing page used by the India and city pages.
 * All text is in the HTML on first load, so Google reads it without running JavaScript.
 */
export default function LandingPage({ data }: { data: LandingPageData }) {
  const caseStudies = data.caseStudySlugs
    .map((slug) => caseStudiesData.find((cs) => cs.slug === slug))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.h1,
    serviceType: data.serviceType,
    description: data.metaDescription,
    url: canonicalUrl(data.path),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": data.areaServed.type, name: data.areaServed.name },
  };

  return (
    <div className="bg-white text-slate-900 font-inter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(data.faq)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: data.breadcrumb, path: data.path },
            ])
          ),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e7f5fd] to-[#fcebe0] px-6 pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#052D69]">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700">{data.breadcrumb}</li>
            </ol>
          </nav>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#052D69]">
            {data.eyebrow}
          </p>
          <h1 className="max-w-4xl font-poppins text-4xl font-medium leading-[1.05] tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
            {data.h1}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            {data.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contactus"
              className="inline-flex items-center gap-2 bg-[#052D69] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black"
            >
              Get a free audit
            </Link>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="inline-flex items-center gap-2 border border-slate-900 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-slate-900 transition-colors hover:border-[#052D69] hover:text-[#052D69]"
            >
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* BODY COPY */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 md:gap-20">
          {data.sections.map((section) => (
            <div key={section.heading} className="grid gap-6 md:grid-cols-12 md:gap-12">
              <h2 className="font-poppins text-3xl font-light leading-tight tracking-tight md:col-span-5 md:text-4xl">
                {section.heading}
              </h2>
              <div className="space-y-5 text-base leading-8 text-slate-600 md:col-span-7 md:text-lg">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-y border-slate-100 bg-slate-50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 max-w-3xl font-poppins text-3xl font-light tracking-tight md:text-5xl">
            {data.servicesHeading}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex h-full flex-col justify-between border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <div>
                  <h3 className="mb-3 font-poppins text-xl font-medium text-slate-950 group-hover:text-[#052D69]">
                    {service.name}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600">{service.summary}</p>
                </div>
                <span className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#052D69]">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 font-poppins text-3xl font-light tracking-tight md:text-5xl">
            {data.processHeading}
          </h2>
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {data.process.map((step, i) => (
              <li key={step.title} className="border-t-2 border-[#052D69] pt-6">
                <span className="text-xs font-semibold tracking-[0.2em] text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 mb-3 font-poppins text-xl font-medium">{step.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-slate-950 px-6 py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 font-poppins text-3xl font-light tracking-tight md:text-4xl">
            Industries we work with
          </h2>
          <ul className="flex flex-wrap gap-3">
            {data.industries.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/80"
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CASE STUDIES */}
      {caseStudies.length > 0 && (
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-poppins text-3xl font-light tracking-tight md:text-5xl">
                Related case studies
              </h2>
              <Link
                href="/case-studies"
                className="text-xs font-semibold uppercase tracking-widest text-[#052D69] hover:underline"
              >
                All case studies →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group flex flex-col overflow-hidden border border-slate-100 bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    {cs.image && (
                      <Image
                        src={cs.image}
                        alt={`${cs.name} – ${cs.category} project by Obsidian Six`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {cs.category}
                    </span>
                    <h3 className="mb-3 font-poppins text-lg font-medium text-slate-950 group-hover:text-[#052D69]">
                      {cs.name}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600">{cs.details}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-slate-100 bg-slate-50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 font-poppins text-3xl font-light tracking-tight md:text-5xl">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {data.faq.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-poppins text-lg font-medium text-slate-950">
                  <h3 className="text-lg font-medium">{item.question}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-xl leading-none text-[#052D69] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 text-base leading-8 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#052D69] px-6 py-20 text-white md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-poppins text-3xl font-light tracking-tight md:text-5xl">{data.ctaHeading}</h2>
            <p className="mt-5 text-base leading-8 text-white/75 md:text-lg">{data.ctaText}</p>
            <p className="mt-6 text-sm text-white/60">
              {BUSINESS.offices
                .map((o) => `${o.streetAddress}, ${o.addressLocality} ${o.postalCode}`)
                .join("  ·  ")}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contactus"
              className="inline-flex items-center bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#052D69] transition-colors hover:bg-slate-100"
            >
              Contact us
            </Link>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="inline-flex items-center border border-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#052D69]"
            >
              {BUSINESS.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
