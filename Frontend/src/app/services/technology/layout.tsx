import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/services/technology",
  title: "Web, App & Software Development in India",
  description:
    "Websites, mobile apps, e-commerce stores, AI and DevOps built by the Obsidian Six engineering team in India. Custom code, fast pages, clean handover.",
});

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
