import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/services/experience-design",
  title: "UI/UX & Experience Design Services",
  description:
    "UI/UX design, product design and website design that make visitors stay and act. Experience design services from Obsidian Six in India.",
});

export default function ExperienceDesignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
