import { cache } from "react";

import { notFound } from "next/navigation";
import TemplatePage from "./_template/template-page";
import CustomPage from "./_custom/custom-page";
import caseStudiesData from "@/lib/store/case-studies";
import type CaseStudy from "@/lib/models/case-study.types";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";
import ContactUs from "@/app/_components/contact-us";
import { normalizeMediaUrls } from "@/lib/utils";
import { pageMeta, breadcrumbSchema, jsonLd } from "@/lib/seo";

const loadCaseStudy = cache(async (slug: string): Promise<CaseStudy | null> => {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiBase}/api/case-studies/slug/${encodeURIComponent(slug)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const data = await res.json();
    if (res.ok && data.success && data.data) {
      return normalizeMediaUrls(data.data, apiBase);
    }
  } catch (err) {
    console.error("Failed to fetch dynamic case study from backend:", err);
  }
  return caseStudiesData.find((cs) => cs.slug === slug) ?? null;
});

function trimTo(text: string, max: number) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await loadCaseStudy(slug);
  if (!cs) return {};
  return pageMeta({
    path: `/case-studies/${cs.slug}`,
    title: trimTo(`${cs.name} – ${cs.category} Case Study`, 44),
    description: trimTo(cs.details, 158),
    image: cs.image || undefined,
  });
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  return caseStudiesData.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await loadCaseStudy(slug);

  if (!caseStudy) {
    return notFound();
  }

  const crumbs = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
            { name: caseStudy.name, path: `/case-studies/${caseStudy.slug}` },
          ])
        ),
      }}
    />
  );

  if (caseStudy.pageType === "custom") {
    return (
      <>
        {crumbs}
        <CustomPage slug={caseStudy.slug} />
        <ContactUs />
      </>
    );
  }

  if (caseStudy.pageType === "template") {
    return (
      <>
        {crumbs}
        <TemplatePage caseStudy={caseStudy as TemplateCaseStudy} />
        <ContactUs />
      </>
    );
  }

  return notFound();
}
