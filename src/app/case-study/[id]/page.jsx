import React from "react";
import HeroCase from "../_components/hero-case";
import ApproachSection from "../_components/approch-section";
import TheResult from "../_components/the-result";
import TheImpact from "../_components/the-impact";
import ChallengeSection from "../_components/challenge-section";

const page = () => {
  return (
    <div>
      <HeroCase />
      <ChallengeSection />
      <ApproachSection />
      <TheResult />
      <TheImpact />
    </div>
  );
};

export default page;
