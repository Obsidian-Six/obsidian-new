import type { TemplateCaseStudy } from "@/lib/models/case-study.types";
import TheImpact from "../_components/the-impact";
import HeroCase from "../_components/hero-case";
import ChallengeSection from "../_components/challenge-section";
import ApproachSection from "../_components/approch-section";
import TheResult from "../_components/the-result";
import HorizontalRevealGallery from "../_components/Horizontalreveal";
import TwoImageSection from "../_components/twoimage-section";

export default function TemplatePage({
  caseStudy,
}: {
  caseStudy: TemplateCaseStudy;
}) {
  return (
    <>
      <HeroCase ele={caseStudy} />

      <ChallengeSection data={caseStudy} />
      {caseStudy.twoImage && caseStudy.twoImage.leftPanel?.bgImage && caseStudy.twoImage.rightPanel?.bgImage && (
        <TwoImageSection data={caseStudy.twoImage as any} />
      )}

      <ApproachSection approaches={caseStudy.approaches} />

      {/* Adding the Gallery here creates a visual break 
         and showcases the work before showing the final results.
      */}
      {caseStudy.gallery && (
        <HorizontalRevealGallery ele={caseStudy} />
      )}

      <TheResult ele={caseStudy} />
      <TheImpact ele={caseStudy} />

    </>
  );
}