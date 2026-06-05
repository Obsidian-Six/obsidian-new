
import { MotionDiv } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import type CaseStudy from "@/lib/models/case-study.types";
import caseStudiesData from "@/lib/store/case-studies";
import { normalizeMediaUrls, getSlug } from "@/lib/utils";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  let dynamicCaseStudies: CaseStudy[] = [];

  try {
    const res = await fetch(`${apiBase}/api/case-studies`, { cache: "no-store" });
    const data = await res.json();
    if (res.ok && data.success && Array.isArray(data.data)) {
      dynamicCaseStudies = normalizeMediaUrls(data.data, apiBase);
    }
  } catch (err) {
    console.error("Failed to fetch dynamic case studies:", err);
  }

  // Combine dynamic case studies with static ones, preventing duplicate slugs
  const combinedCaseStudies: CaseStudy[] = [...dynamicCaseStudies];
  const dynamicSlugs = new Set(dynamicCaseStudies.map((cs) => cs.slug));

  for (const staticCase of caseStudiesData) {
    if (!dynamicSlugs.has(staticCase.slug)) {
      // Cast static ID if missing to keep types happy
      combinedCaseStudies.push(staticCase as CaseStudy);
    }
  }

  return (
    <div>
      <p className="p-10 w-full bg-white"></p>
      <div className="md:text-6xl sm:text-4xl text-3xl text-main font-light poppins  my-10 w-[80%] mx-auto">
        CASE STUDIES
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 w-[80%] mx-auto gap-14 my-10">
        {combinedCaseStudies.map((caseStudy: CaseStudy, index: number) => (
          <MotionDiv
            key={index}
            whileTap={{ scale: 0.85 }}
            className="text-main cursor-pointer"
          >
            <Link href={`/case-studies/${getSlug(caseStudy.slug)}`}>
              <div className="text-xs text-[#024787] flex items-center gap-2 uppercase">
                <p className="h-2.5 w-2.5 bg-[#024787]" /> {caseStudy.name}
              </div>
              <p className="my-1.5 text-xl max-md:text-lg">
                {caseStudy.category}
              </p>
              <Image
                src={caseStudy.image}
                alt={caseStudy.name}
                width={800}
                height={320}
                className="my-2.5 w-full rounded-md md:h-80 h-52 object-cover"
                unoptimized
              />
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-main">
                {caseStudy.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 border border-main rounded-full whitespace-nowrap inline-block"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-main mt-8 inter opacity-60 max-md:mt-4 max-md:text-sm line-clamp-3 overflow-hidden text-ellipsis">
                {caseStudy.details}
              </p>
            </Link>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
}
