
import { notFound } from "next/navigation";
import TemplatePage from "./_template/template-page";
import CustomPage from "./_custom/custom-page";
import caseStudiesData from "@/lib/store/case-studies";
import type CaseStudy from "@/lib/models/case-study.types";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";
import ContactUs from "@/app/_components/contact-us";
import { normalizeMediaUrls } from "@/lib/utils";

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
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  let caseStudy: CaseStudy | null = null;

  try {
    const res = await fetch(`${apiBase}/api/case-studies/slug/${slug}`, { cache: "no-store" });
    const data = await res.json();
    if (res.ok && data.success && data.data) {
      caseStudy = normalizeMediaUrls(data.data, apiBase);
    }
  } catch (err) {
    console.error("Failed to fetch dynamic case study from backend:", err);
  }

  // Fallback to static case studies if not found dynamically
  if (!caseStudy) {
    const staticCases: CaseStudy[] = caseStudiesData.filter(
      (cs) => cs.slug === slug
    );
    caseStudy = staticCases.length ? staticCases[0]! : null;
  }

  if (!caseStudy) {
    return notFound();
  }

  if (caseStudy.pageType === "custom") {
    return (
      <>
        <CustomPage slug={caseStudy.slug} />
        <ContactUs />
      </>
    );
  }

  if (caseStudy.pageType === "template") {
    return (
      <>
        <TemplatePage caseStudy={caseStudy as TemplateCaseStudy} />
        <ContactUs />
      </>
    );
  }

  return notFound();
}
