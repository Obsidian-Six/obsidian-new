import { pageMeta } from "@/lib/seo";
import OverviewPage from "../_components/overview/page";

export const metadata = pageMeta({
  path: "/services",
  title: "Digital Marketing, Branding & Tech Services",
  description:
    "SEO, performance marketing, social media, branding, web development, app development and e-commerce. See every service Obsidian Six offers in India.",
});

export default function Services() {
  return (
    <main>
      <OverviewPage />
    </main>
  );
}