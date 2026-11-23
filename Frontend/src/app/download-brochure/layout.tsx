import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/download-brochure",
  title: "Download Our Agency Brochure",
  description:
    "Get the Obsidian Six brochure: our services, process and selected work in digital marketing, branding and web development.",
});

export default function DownloadBrochureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
