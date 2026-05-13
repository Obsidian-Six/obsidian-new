
import { notFound } from "next/navigation";
import TemplatePage from "./_template/template-page";
import CustomPage from "./_custom/custom-page";
import caseStudiesData from "@/lib/store/case-studies";
import type CaseStudy from "@/lib/models/case-study.types";
import type { TemplateCaseStudy } from "@/lib/models/case-study.types";
import ContactUs from "@/app/_components/contact-us";

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
  const caseStudies: CaseStudy[] = caseStudiesData.filter(
    (caseStudy) => caseStudy.slug === slug
  );
  const caseStudy = caseStudies.length ? caseStudies[0] : null;

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
