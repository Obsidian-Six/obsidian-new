import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/blogs",
  title: "Blog – Digital Marketing & Web Insights",
  description:
    "Practical articles on SEO, paid ads, social media, branding and websites for Indian and UAE businesses, from the Obsidian Six team.",
});

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
