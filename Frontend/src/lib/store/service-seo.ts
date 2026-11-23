/**
 * Search titles, descriptions and H1s for each /services/<slug> page.
 * Titles stay under ~60 characters once " | Obsidian Six" is added.
 * Descriptions stay under 160 characters.
 */
export interface ServiceSeo {
  title: string;
  description: string;
  h1: string;
}

export const serviceSeo: Record<string, ServiceSeo> = {
  "brand-consulting": {
    title: "Brand Consulting Agency in India",
    description: "Brand strategy, positioning and messaging for growing Indian businesses. Obsidian Six helps you decide what your brand stands for, then makes it consistent.",
    h1: "Brand Consulting Services in India",
  },
  "logo-design": {
    title: "Logo Design Company in India",
    description: "Custom logo and visual identity design with full brand guidelines and source files you own. Logo design by Obsidian Six, Mumbai and Bhopal.",
    h1: "Logo Design Services in India",
  },
  "industrial-product-design": {
    title: "Product & Industrial Design Services",
    description: "Industrial and product design, 3D visualisation and packaging concepts that are ready for manufacturing and for the shelf. By Obsidian Six.",
    h1: "Industrial & Product Design Services",
  },
  "graphic-design": {
    title: "Graphic Design Services in India",
    description: "Social media creatives, brochures, packaging, presentations and ad designs that stay on-brand. Graphic design services from Obsidian Six.",
    h1: "Graphic Design Services in India",
  },
  "ai-machine-learning": {
    title: "AI & Machine Learning Development",
    description: "AI chatbots, automation and machine learning built into your website or business workflows. AI development services from Obsidian Six in India.",
    h1: "AI & Machine Learning Development Services",
  },
  "devops-consulting": {
    title: "DevOps Consulting & Cloud Setup",
    description: "Hosting, CI/CD pipelines, Docker and cloud setup that keep your website and apps fast, secure and online. DevOps consulting by Obsidian Six.",
    h1: "DevOps Consulting & Cloud Services",
  },
  "data-analytics": {
    title: "Data Analytics Services for Business",
    description: "Dashboards, reporting and data analysis that show where your revenue and leads come from. Data analytics services from Obsidian Six.",
    h1: "Data Analytics Services",
  },
  "web-development": {
    title: "Web Development Company in India",
    description: "Custom-coded websites in Next.js and React that load fast, rank on Google and convert visitors. Web development by Obsidian Six, Mumbai and Bhopal.",
    h1: "Web Development Company in India",
  },
  "mobile-app-development": {
    title: "Mobile App Development Company in India",
    description: "Android and iOS app development for startups and businesses, from design to Play Store and App Store launch. Built by Obsidian Six in India.",
    h1: "Mobile App Development Company in India",
  },
  "e-commerce": {
    title: "E-commerce Website Development in India",
    description: "E-commerce stores with payment gateways, product catalogues and fast checkout, plus the ads and SEO to sell from them. Built by Obsidian Six.",
    h1: "E-commerce Website Development in India",
  },
  "quality-assurance-testing": {
    title: "QA & Software Testing Services",
    description: "Manual and automated testing for websites and apps so bugs are caught before your customers find them. QA services from Obsidian Six.",
    h1: "Quality Assurance & Software Testing",
  },
  "search-engine-optimisation": {
    title: "SEO Agency in India – SEO Services",
    description: "Technical SEO, on-page fixes, content and local SEO that grow organic traffic and leads. SEO services from Obsidian Six in Mumbai and Bhopal.",
    h1: "SEO Services in India",
  },
  "social-media-management": {
    title: "Social Media Marketing Agency in India",
    description: "Instagram, Facebook and LinkedIn management: content, reels, posting and community handling. Social media marketing by Obsidian Six.",
    h1: "Social Media Marketing Agency in India",
  },
  "performance-marketing": {
    title: "Performance Marketing Agency in India",
    description: "Google Ads and Meta Ads managed for leads and sales, with tracking set up properly and weekly reporting. Performance marketing by Obsidian Six.",
    h1: "Performance Marketing Agency in India",
  },
  "content-marketing": {
    title: "Content Marketing Services in India",
    description: "Blogs, landing page copy and case studies written to rank on Google and win customers. Content marketing services from Obsidian Six.",
    h1: "Content Marketing Services in India",
  },
  "marketing-automation": {
    title: "Marketing Automation Services",
    description: "WhatsApp, email and CRM automation that follows up with every lead so none slip through. Marketing automation by Obsidian Six.",
    h1: "Marketing Automation Services",
  },
  analytics: {
    title: "Marketing Analytics & Tracking Setup",
    description: "GA4, Google Tag Manager, Meta Pixel and conversion tracking set up correctly, so you know which ads and pages bring in money.",
    h1: "Marketing Analytics & Tracking",
  },
};
