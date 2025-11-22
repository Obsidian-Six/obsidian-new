import type {
  CaseStudyChallenge,
  CaseStudyChallengePoint,
} from "@/lib/models/case-study.types";

export default function ChallengeSection({
  challenge,
}: {
  challenge: CaseStudyChallenge;
}) {
  return (
    <div className="bg-[#5A00EC] text-white md:py-10">
      <div className="md:w-[60%] w-[80%] mx-auto py-20 ">
        <p className="text-2xl md:text-3xl font-base uppercase mb-6 poppins">
          The Challenge
        </p>
        <p className="text-lg md:text-2xl font-light my-10 inter">
          {challenge.data}
        </p>
        <ul className="space-y-4 md:text-2xl sm:text-xl text-base inter font-light">
          {challenge.point.map(
            (point: CaseStudyChallengePoint, index: number) => (
              <li key={index}>
                <span className="font-normal">▪ {point.name} –</span>{" "}
                {point.detail}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
