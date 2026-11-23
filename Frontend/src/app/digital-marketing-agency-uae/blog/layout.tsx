import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/digital-marketing-agency-uae/blog",
  title: "Digital Marketing in the UAE – Guide",
  description:
    "A practical guide to digital marketing in the UAE: SEO, social media, paid ads and what works for businesses in Dubai.",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <main>{children}</main>
    </div>
  );
}
