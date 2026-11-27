import { cache } from "react";

import { notFound, permanentRedirect } from "next/navigation";
import TemplatePage from "./_template/template-page";
import CustomPage from "./_custom/custom-page";
import caseStudiesData from "@/lib/store/case-studies";
import type CaseStudy from "@/lib/models/case-study.types";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";
import ContactUs from "@/app/_components/contact-us";
import { normalizeMediaUrls, cleanSlug } from "@/lib/utils";
import { pageMeta, breadcrumbSchema, jsonLd } from "@/lib/seo";

const loadCaseStudy = cache(async (rawSlug: string): Promise<CaseStudy | null> => {
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // keep as is
  }
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiBase}/api/case-studies/slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    });
    const data = await res.json();
    if (res.ok && data.success && data.data) {
      return normalizeMediaUrls(data.data, apiBase);
    }
  } catch (err) {
    console.error("Failed to fetch dynamic case study from backend:", err);
  }
  return caseStudiesData.find((cs) => cs.slug === slug || cleanSlug(cs.slug) === cleanSlug(slug)) ?? null;
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
    path: `/case-studies/${cleanSlug(cs.slug)}`,
    title: trimTo(`${cs.name} – ${cs.category} Case Study`, 44),
    description: trimTo(cs.details, 158),
    image: cs.image || undefined,
  });
}

// Cache each case study for a minute; edits in the admin panel appear within 60 seconds.
export const revalidate = 60;

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

  // Old or messy links (spaces, capitals) go to the one clean address.
  const clean = cleanSlug(caseStudy.slug);
  if (slug !== clean) {
    permanentRedirect(`/case-studies/${clean}/`);
  }

  const crumbs = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
            { name: caseStudy.name, path: `/case-studies/${clean}` },
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
