"use client"
import React from "react";
import HeroCase from "../_components/hero-case";
import ApproachSection from "../_components/approch-section";
import TheResult from "../_components/the-result";
import TheImpact from "../_components/the-impact";
import ChallengeSection from "../_components/challenge-section";
import { useParams } from "next/navigation";
import { CaseStudyData } from "@/data";

const CaseDetail = () => {
  const { id } = useParams();
  return (
    <>
    {
    CaseStudyData.filter(item => item.id === id).map((ele,i) => (
      <div key={i}>
        <HeroCase ele={ele} />
        <ChallengeSection ele={ele} />
        <ApproachSection ele={ele} />
        <TheResult ele={ele} />
        <TheImpact ele={ele} />
      </div>

    ))
    }
    </>
  );
};

export default CaseDetail;
