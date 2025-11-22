import type { TemplateCaseStudy } from "@/lib/models/case-study.types";
import TheImpact from "../_components/the-impact";
import HeroCase from "../_components/hero-case";
import ChallengeSection from "../_components/challenge-section";
import ApproachSection from "../_components/approch-section";
import TheResult from "../_components/the-result";

export default function TemplatePage({
  caseStudy,
}: {
  caseStudy: TemplateCaseStudy;
}) {
  return (
    <>
      <HeroCase ele={caseStudy} />
      <ChallengeSection challenge={caseStudy.challenge} />
      <ApproachSection approaches={caseStudy.approaches} />
      <TheResult ele={caseStudy} />
      <TheImpact ele={caseStudy} />
    </>
  );
}
