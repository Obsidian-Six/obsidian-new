import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";
import { servicesStore } from "@/lib/store/template-services";
import { landingPageSlugs } from "@/lib/store/landing-pages";
import caseStudiesData from "@/lib/store/case-studies";
import { getAllPosts } from "@/lib/blog";
import { cleanSlug } from "@/lib/utils";

// Rebuild the sitemap at most once an hour so new blog posts and case studies
// appear without a redeploy.
export const revalidate = 3600;

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
    const res = await fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function caseStudyEntries(): Promise<Entry[]> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const data = await fetchJson<{ success: boolean; data: { slug: string; name?: string; updatedAt?: string }[] }>(
    `${apiBase}/api/case-studies`
  );
  const slugs = new Map<string, string | undefined>();
  const names = new Set<string>();
  if (data?.success && Array.isArray(data.data)) {
    for (const cs of data.data) {
      if (!cs.slug) continue;
      slugs.set(cleanSlug(cs.slug), cs.updatedAt);
      if (cs.name) names.add(cleanSlug(cs.name));
    }
  }
  // Built-in case studies only fill gaps: skip any the admin already has (same slug or same name)
  for (const cs of caseStudiesData) {
    const slug = cleanSlug(cs.slug);
    if (!slugs.has(slug) && !names.has(cleanSlug(cs.name || ""))) slugs.set(slug, undefined);
  }
  return [...slugs].map(([slug, updated]) => entry(`/case-studies/${slug}`, 0.7, "monthly", updated));
}

async function blogEntries(): Promise<Entry[]> {
  const posts = await getAllPosts(500);
  return posts
    .filter((p) => !p.seo?.noindex && !p.seo?.canonicalUrl)
    .map((p) => entry(`/blogs/${p.slug}`, 0.6, "monthly", p.updatedAt || p.publishedAt));
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
