"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check } from "lucide-react";
import Button from "./common/Button";

const steps = [
  {
    number: "01",
    label: "DISCOVER",
    title: "Free audit.",
    description:
      "We review your ads, website and social channels to uncover what's working, what's not, and where your biggest opportunities lie.",
    deliverable: "A clear, actionable audit report",
    points: [
      "Ads & campaign review",
      "Website experience",
      "Social media presence",
    ],
  },
  {
    number: "02",
    label: "STRATEGIZE",
    title: "The plan.",
    description:
      "We create a focused 30-day roadmap with clear priorities, the work we'll deliver, and the outcomes we're aiming for.",
    deliverable: "Your personalised 30-day roadmap",
    points: [
      "Defined priorities",
      "Clear deliverables",
      "Measurable objectives",
    ],
  },
  {
    number: "03",
    label: "EXECUTE",
    title: "Launch & report.",
    description:
      "We put the plan into action, track the numbers and share transparent monthly reports so you always know how things are performing.",
    deliverable: "Monthly performance reports",
    points: ["Campaign execution", "Performance tracking", "Monthly reporting"],
  },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <section
      id="how-we-work"
      className="relative overflow-hidden bg-white px-5 py-20 text-[#111827] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#052D69]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#052D69] sm:text-xs">
                Our process
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-light uppercase leading-[0.98] tracking-[-0.025em] sm:text-4xl md:text-5xl lg:text-6xl">
              Good work starts
              <br />
              with a <span className="text-[#052D69]">clear plan.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
            A simple, transparent process that turns business goals into focused
            action and measurable progress.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <article
                key={step.number}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                className={`group relative flex min-h-[430px] flex-col overflow-hidden rounded-2xl border p-6 transition-colors duration-700 ease-in-out sm:p-8 lg:min-h-[450px] ${
                  isActive
                    ? "border-[#19183a] bg-[#19183a] text-white"
                    : "border-gray-200 bg-[#FAFBFD] text-[#111827] hover:border-[#19183a]/40"
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span
                    className={`text-xs font-bold tracking-[0.2em] transition-colors duration-700 ${
                      isActive ? "text-white/70" : "text-[#19183a]"
                    }`}
                  >
                    STEP / {step.number}
                  </span>

                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-700 ${
                      isActive
                        ? "rotate-45 border-white/30 bg-white text-[#19183a]"
                        : "border-gray-200 bg-white text-[#19183a] group-hover:border-[#19183a]"
                    }`}
                  >
                    {isActive ? (
                      <ArrowUpRight size={20} />
                    ) : (
                      <ArrowDownRight size={20} />
                    )}
                  </span>
                </div>

                {/* Step label */}
                <div
                  className={`mt-10 text-[10px] font-bold tracking-[0.25em] transition-colors duration-700 ${
                    isActive ? "text-white/60" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </div>

                {/* Main content */}
                <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {step.title}
                </h3>

                <p
                  className={`mt-4 text-sm leading-7 transition-colors duration-700 ${
                    isActive ? "text-white/75" : "text-gray-500"
                  }`}
                >
                  {step.description}
                </p>

                {/* Always visible details */}
                <div
                  className={`mt-5 border-t pt-4 transition-colors duration-700 ${
                    isActive ? "border-white/20" : "border-gray-200"
                  }`}
                >
                  <div className="space-y-3">
                    {step.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Check
                          size={14}
                          className={`shrink-0 transition-colors duration-700 ${
                            isActive ? "text-white" : "text-[#19183a]"
                          }`}
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverable */}
                <div
                  className={`mt-auto flex items-center gap-3 border-t pt-5 mt-6 transition-colors duration-700 ${
                    isActive ? "border-white/20" : "border-gray-200"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-700 ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-[#19183a]/10 text-[#19183a]"
                    }`}
                  >
                    <Check size={15} />
                  </span>

                  <span
                    className={`text-xs font-medium leading-5 transition-colors duration-700 ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {step.deliverable}
                  </span>
                </div>

                {/* Subtle background accent */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full transition-colors duration-700 ${
                    isActive ? "bg-white/[0.04]" : "bg-[#19183a]/[0.025]"
                  }`}
                />
              </article>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 flex flex-col justify-between gap-5 border-t border-gray-200 pt-7 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-500">
            Three steps. One clear direction. Measurable growth.
          </p>
          <Button
            hlink={"contactus"}
            text="Let's get started"
            textColor="white"
            borderColor="white"
            hoverBgColor=""
            hoverTextColor="hover:text-white"
          />
        </div>
      </div>
    </section>
  );
}
