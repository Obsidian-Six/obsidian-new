import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/branding-agency-uae",
  title: "Branding Agency in UAE – Brand Identity & Logo Design",
  absoluteTitle: true,
  description:
    "Brand strategy, logo design, packaging and identity systems for businesses in Dubai and the UAE, from Obsidian Six.",
});

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
