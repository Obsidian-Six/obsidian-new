import type { ReactNode } from "react";
import { servicesStore } from "@/lib/store/template-services";
import { serviceSeo } from "@/lib/store/service-seo";
import { pageMeta, faqSchema, breadcrumbSchema, jsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(servicesStore).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesStore[slug];
  if (!service) return {};
  const seo = serviceSeo[slug];
  return pageMeta({
    path: `/services/${slug}`,
    title: seo?.title ?? `${service.title} Services`,
    description: seo?.description ?? service.description,
  });
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesStore[slug];
  const seo = serviceSeo[slug];

  return (
    <>
      {service && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLd({
                "@context": "https://schema.org",
                "@type": "Service",
                name: seo?.h1 ?? service.title,
                serviceType: service.title,
                description: seo?.description ?? service.description,
                provider: { "@id": "https://obsidiansix.com/#organization" },
                areaServed: { "@type": "Country", name: "India" },
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLd(
                breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Services", path: "/services" },
                  { name: service.title, path: `/services/${slug}` },
                ])
              ),
            }}
          />
          {service.faq && service.faq.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(service.faq)) }}
            />
          )}
        </>
      )}
      {children}
    </>
  );
}
