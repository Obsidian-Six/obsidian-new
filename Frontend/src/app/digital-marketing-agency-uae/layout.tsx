import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/digital-marketing-agency-uae",
  title: "Digital Marketing Agency in UAE – SEO & Ads",
  description:
    "Performance-driven digital marketing agency for Dubai and the UAE. SEO, social media, Google and Meta ads, and branding that bring in qualified leads.",
});

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
