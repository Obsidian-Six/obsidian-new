import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";
import { servicesStore } from "@/lib/store/template-services";
import { landingPageSlugs } from "@/lib/store/landing-pages";
import caseStudiesData from "@/lib/store/case-studies";

// Rebuild the sitemap at most once a day so new case studies and blog posts appear
// without a redeploy.
export const revalidate = 86400;

type Entry = MetadataRoute.Sitemap[number];

function entry(path: string, priority: number, changeFrequency: Entry["changeFrequency"], lastModified?: string | Date): Entry {
  return {
    url: canonicalUrl(path),
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function caseStudyEntries(): Promise<Entry[]> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const data = await fetchJson<{ success: boolean; data: { slug: string; updatedAt?: string }[] }>(
    `${apiBase}/api/case-studies`
  );
  const slugs = new Map<string, string | undefined>();
  if (data?.success && Array.isArray(data.data)) {
    for (const cs of data.data) if (cs.slug) slugs.set(cs.slug, cs.updatedAt);
  }
  for (const cs of caseStudiesData) if (!slugs.has(cs.slug)) slugs.set(cs.slug, undefined);
  return [...slugs].map(([slug, updated]) => entry(`/case-studies/${slug}`, 0.7, "monthly", updated));
}

async function blogEntries(): Promise<Entry[]> {
  const posts = await fetchJson<{ slug: string; modified: string }[]>(
    "https://public-api.wordpress.com/wp/v2/sites/obsidiansixblogs.wordpress.com/posts?per_page=100&_fields=slug,modified"
  );
  if (!Array.isArray(posts)) return [];
  return posts.map((p) => entry(`/blogs/${p.slug}`, 0.6, "monthly", p.modified));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const core: Entry[] = [
    entry("/", 1, "weekly"),
    entry("/services", 0.9, "weekly"),
    entry("/case-studies", 0.8, "weekly"),
    entry("/aboutus", 0.7, "monthly"),
    entry("/contactus", 0.7, "monthly"),
    entry("/blogs", 0.7, "weekly"),
    entry("/services/technology", 0.8, "monthly"),
    entry("/services/experience-design", 0.8, "monthly"),
    entry("/digital-marketing-agency-uae", 0.8, "monthly"),
    entry("/branding-agency-uae", 0.8, "monthly"),
    entry("/digital-marketing-agency-uae/blog", 0.5, "monthly"),
    entry("/download-brochure", 0.4, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];

  const landing = landingPageSlugs.map((slug) => entry(`/${slug}`, 0.9, "monthly"));
  const services = Object.keys(servicesStore).map((slug) => entry(`/services/${slug}`, 0.8, "monthly"));

  const [caseStudies, blogs] = await Promise.all([caseStudyEntries(), blogEntries()]);

  // Not listed on purpose:
  // /overview – same content as /services (canonical points there)
  // /financial-marketing-services-uae – canonical points to abcapitalglobal.com
  // /secure, /admin – private, noindex
  return [...core, ...landing, ...services, ...caseStudies, ...blogs];
}
