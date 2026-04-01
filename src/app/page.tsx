import Banner from "./_components/banner";
import ContactUs from "./_components/contact-us";
import HomeService from "./_components/service";
import Maintenance from "./_components/maintenance";
import OurWork from "./_components/our-work";
import Reviews from "./_components/reviews";
import OurClients from "./_components/our-clients";
import Hero from "./_components/hero";
import ContactPopup from "./_components/ContactPopup/ContactPopup";
import Map from "./_components/map/map";
import FAQ from "./_components/faq";

export default function Home() {
  // Define the structured data as a constant
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does Obsidian Six offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Obsidian Six provides end-to-end digital marketing services including SEO, performance marketing, paid advertising (Google & Meta Ads), lead generation, content marketing, and conversion rate optimization for businesses across industries."
        }
      },
      {
        "@type": "Question",
        "name": "How can SEO help my business grow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO improves your website’s visibility on search engines, drives qualified organic traffic, increases brand credibility, and generates consistent leads without ongoing ad spend dependency."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see results from SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO typically takes 3–6 months to show measurable results, depending on competition, website authority, and industry. However, technical improvements and on-page optimizations can show early impact."
        }
      },
      {
        "@type": "Question",
        "name": "What industries does Obsidian Six specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Obsidian Six works with startups, educational institutions, B2B companies, real estate brands, and service-based businesses looking to scale through data-driven digital marketing strategies."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide performance marketing and paid ads management?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Obsidian Six specializes in performance marketing including Google Ads, Meta Ads, and paid campaigns designed to maximize ROI and generate high-quality leads."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Obsidian Six different from other digital marketing agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Obsidian Six focuses on data-backed strategies, transparent reporting, ROI-driven campaigns, and customized growth plans tailored to each client’s business goals."
        }
      },
      {
        "@type": "Question",
        "name": "How do you measure digital marketing performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We track KPIs such as traffic growth, conversion rate, cost per lead (CPL), return on ad spend (ROAS), keyword rankings, and overall revenue impact."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer customized digital marketing strategies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Every business receives a customized marketing strategy based on industry analysis, competition research, and growth objectives."
        }
      }
    ]
  };

  return (
    <>
      {/* FAQ Schema Script Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Persistent lead capture popup */}
      <ContactPopup />

      {/* Hero Section - Above the fold */}
      <Hero />

  
      {/* Portfolio / Case Studies */}
      <OurWork />

      {/* Core Agency Services */}
      <HomeService />

      {/* Call to Action / Mid-page Banner */}
      <Banner />
      <Maintenance />

      <Reviews />

      <OurClients />
      <Map />
      <FAQ />
      <ContactUs />
    </>
  );
}