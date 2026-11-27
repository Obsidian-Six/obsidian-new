/**
 * Content for the India and city landing pages.
 * Each page: keyword H1, 400+ words of body copy, services, process,
 * related case studies, FAQ and a contact call to action.
 *
 * Keep every claim provable. Do not add numbers here that a client
 * or a reviewer could not check against a real case study.
 */

export interface LandingSection {
  heading: string;
  paragraphs: string[];
}

export interface LandingService {
  name: string;
  href: string;
  summary: string;
}

export interface LandingPageData {
  path: string;
  /** Title without the brand. The layout adds "| Obsidian Six". Keep under ~46 chars. */
  metaTitle: string;
  /** Under 160 characters. */
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
  servicesHeading: string;
  services: LandingService[];
  processHeading: string;
  process: { title: string; text: string }[];
  industries: string[];
  caseStudySlugs: string[];
  faq: { question: string; answer: string }[];
  ctaHeading: string;
  ctaText: string;
  areaServed: { type: "Country" | "City"; name: string };
  serviceType: string;
}

const PROCESS_MARKETING = [
  {
    title: "Audit and goals",
    text: "We look at your website, ads accounts, Google Business Profile and competitors, then agree on the numbers that matter to you: leads, sales or bookings.",
  },
  {
    title: "Plan",
    text: "You get a written plan for the first 90 days: which channels, which keywords, what budget and what we expect each month.",
  },
  {
    title: "Build and launch",
    text: "We fix the website, set up tracking, write the content and launch campaigns. Nothing goes live without your sign-off.",
  },
  {
    title: "Report and improve",
    text: "Monthly reports show spend, leads, cost per lead and rankings in plain language, followed by what we will change next month.",
  },
];

const PROCESS_WEB = [
  {
    title: "Scope",
    text: "We map your pages, features, payment and CRM needs into a fixed scope with a timeline and a single price.",
  },
  {
    title: "Design",
    text: "Wireframes and designs in Figma for desktop and mobile. You approve every screen before development starts.",
  },
  {
    title: "Develop and test",
    text: "Custom code in Next.js and React with an admin panel where you need one. We test on real phones and check page speed before launch.",
  },
  {
    title: "Launch and support",
    text: "We handle domain, hosting, SSL, redirects and Search Console, then hand over the code and logins. Support plans are available after launch.",
  },
];

const SERVICES_MARKETING: LandingService[] = [
  { name: "SEO", href: "/services/search-engine-optimisation", summary: "Technical fixes, on-page SEO, content and local SEO so you show up when customers search." },
  { name: "Performance marketing", href: "/services/performance-marketing", summary: "Google Ads and Meta Ads run for leads and sales, with proper conversion tracking." },
  { name: "Social media marketing", href: "/services/social-media-management", summary: "Instagram, Facebook and LinkedIn content, reels and posting, managed every week." },
  { name: "Branding", href: "/services/brand-consulting", summary: "Positioning, logo and brand guidelines so every touchpoint looks and sounds like you." },
  { name: "Content marketing", href: "/services/content-marketing", summary: "Blogs, landing pages and case studies written to rank and to convince." },
  { name: "Website development", href: "/services/web-development", summary: "Fast, custom-coded websites built to turn visitors into enquiries." },
];

const SERVICES_WEB: LandingService[] = [
  { name: "Website development", href: "/services/web-development", summary: "Business websites and landing pages in Next.js and React, built from scratch." },
  { name: "E-commerce development", href: "/services/e-commerce", summary: "Online stores with payment gateways, product catalogues and quick checkout." },
  { name: "Mobile app development", href: "/services/mobile-app-development", summary: "Android and iOS apps, from first design to Play Store and App Store." },
  { name: "UI/UX design", href: "/services/experience-design", summary: "Clear layouts and journeys that make it easy to enquire or buy." },
  { name: "AI and automation", href: "/services/ai-machine-learning", summary: "Chatbots, lead routing and workflow automation built into your site." },
  { name: "DevOps and hosting", href: "/services/devops-consulting", summary: "Hosting, deployment, backups and monitoring so the site stays fast and online." },
];

export const landingPages: Record<string, LandingPageData> = {
  "digital-marketing-agency-india": {
    path: "/digital-marketing-agency-india",
    metaTitle: "Digital Marketing Agency in India",
    metaDescription:
      "Obsidian Six is a digital marketing agency in India for SEO, Google and Meta ads, social media and branding. Offices in Mumbai and Bhopal. Book a free audit.",
    breadcrumb: "Digital Marketing Agency India",
    eyebrow: "Mumbai · Bhopal · Clients across India",
    h1: "Digital Marketing Agency in India",
    intro:
      "Obsidian Six helps Indian businesses get found online and turn that attention into enquiries and sales. We run SEO, Google Ads, Meta Ads, social media and branding from our offices in Mumbai and Bhopal, for clients in every part of the country.",
    sections: [
      {
        heading: "Marketing that is measured in leads and sales",
        paragraphs: [
          "Most businesses do not need more likes. They need more phone calls, more form fills and more orders. That is how we plan every engagement. Before we spend a rupee on ads or write a single blog post, we agree with you on what a good result looks like and set up tracking so both of us can see it.",
          "From there we pick the channels that fit your business. A D2C brand selling across India usually needs Meta Ads, Google Shopping and strong product pages. A school, clinic or real estate developer in one city needs local SEO, a well-kept Google Business Profile and lead ads. A B2B manufacturer needs LinkedIn, search ads on high-intent keywords and case studies that sales can share. We do not sell every service to every client.",
        ],
      },
      {
        heading: "Organic and paid, working together",
        paragraphs: [
          "Paid ads bring leads this week. SEO and content bring cheaper leads for years. We run both side by side, so the keywords that convert in Google Ads tell us what to write about, and the pages that rank reduce what you spend on ads over time.",
          "Social media sits in the middle. Reels, carousels and founder content build the trust that makes someone click your ad or call after finding you on Google. Our team plans, designs and posts that content every week, and community replies are handled the same day.",
        ],
      },
      {
        heading: "Why Indian businesses work with Obsidian Six",
        paragraphs: [
          "Our founder, Aadarsh Kumar, has spent more than seven years launching brands and fixing underperforming ones across Ayurveda and wellness, education, hospitality, real estate, travel and e-commerce. Strategy, design, development and ads sit in one team, so your website, campaigns and content are built to work together instead of being handed between three vendors.",
          "You talk to the people doing the work, you get reports in plain language, and you own every ad account, website and asset we build for you.",
        ],
      },
    ],
    servicesHeading: "Digital marketing services we offer across India",
    services: SERVICES_MARKETING,
    processHeading: "How we work",
    process: PROCESS_MARKETING,
    industries: ["Ayurveda and wellness", "Education and colleges", "Hospitality and hotels", "Real estate", "Travel and tourism", "E-commerce and D2C", "B2B and manufacturing", "Financial services"],
    caseStudySlugs: ["pachmarhi-ayurveda", "ten-on-ten-stays", "sweet-protection-custom-tech-ecommerce-performance-gear"],
    faq: [
      {
        question: "What does a digital marketing agency in India do?",
        answer:
          "A digital marketing agency plans and runs your online growth: SEO, Google and Meta ads, social media, content, email and WhatsApp marketing, and often the website itself. At Obsidian Six we also set up tracking so you can see which channel brings in leads and sales.",
      },
      {
        question: "How much do digital marketing services cost in India?",
        answer:
          "It depends on the channels, your market and how much content is needed. Ad budgets are paid directly to Google or Meta and are separate from our management fee. We share a fixed monthly quote after a free audit call, with no long lock-in.",
      },
      {
        question: "How long does it take to see results?",
        answer:
          "Paid ads can bring leads within the first two weeks. SEO usually takes three to six months to show steady growth, depending on competition and the state of your website.",
      },
      {
        question: "Do you only work with businesses in Mumbai and Bhopal?",
        answer:
          "No. Our offices are in Mumbai and Bhopal, but we work with clients across India and in the UAE. Most work happens over calls, WhatsApp and shared reports, and we can visit for shoots or workshops when needed.",
      },
      {
        question: "Will I own my ad accounts and website?",
        answer:
          "Yes. Ad accounts, Google Analytics, Search Console, the website code and all creative files are set up in your name. If you ever leave, everything stays with you.",
      },
    ],
    ctaHeading: "Get a free marketing audit",
    ctaText: "Tell us about your business and we will review your website, ads and search presence, then send you a short list of what to fix first.",
    areaServed: { type: "Country", name: "India" },
    serviceType: "Digital marketing",
  },

  "web-development-company-india": {
    path: "/web-development-company-india",
    metaTitle: "Web Development Company in India",
    metaDescription:
      "Custom websites, e-commerce stores and apps built in Next.js and React by Obsidian Six, a web development company in India. Fast, SEO-ready, yours to own.",
    breadcrumb: "Web Development Company India",
    eyebrow: "Custom code · Mumbai · Bhopal",
    h1: "Web Development Company in India",
    intro:
      "Obsidian Six designs and builds custom websites, e-commerce stores and web apps for Indian businesses. We write the code ourselves in Next.js and React, so your site loads fast, ranks well on Google and does exactly what your business needs.",
    sections: [
      {
        heading: "Custom websites instead of heavy templates",
        paragraphs: [
          "Many business websites in India run on page builders and stacks of plugins. They look fine on day one, then slow down, break after updates and become hard to change. We build custom sites instead. Every page is coded for speed, every form goes straight to your inbox or CRM, and there is no plugin bill to renew each year.",
          "Where you need to edit content yourself, we add a simple admin panel for blogs, case studies, products or job listings. Your team updates the site without calling a developer for every change.",
        ],
      },
      {
        heading: "Built to rank and built to convert",
        paragraphs: [
          "Because our team also runs SEO and ads, we build sites the way marketers need them. Clean URLs, correct titles and meta descriptions, structured data, image compression, sitemaps and redirects are part of the build, not an extra. Landing pages are designed around one action, whether that is a call, a WhatsApp message, a form or a purchase.",
          "When we rebuild an existing site, we map every old URL to its new home so your Google rankings carry over. This is where many redesigns lose traffic, and it is the part we check most carefully.",
        ],
      },
      {
        heading: "E-commerce, apps and integrations",
        paragraphs: [
          "For online stores we set up product catalogues, Razorpay or other Indian payment gateways, shipping rules and order emails. For service businesses we connect forms to CRMs, WhatsApp and calling systems so every lead is tracked. For startups we build web apps and mobile apps with a proper backend, admin dashboard and cloud hosting.",
          "At launch you get the source code, hosting logins and domain access in your name. We offer support plans after launch, but you are never locked in.",
        ],
      },
    ],
    servicesHeading: "Web and app development services",
    services: SERVICES_WEB,
    processHeading: "How a website project runs",
    process: PROCESS_WEB,
    industries: ["Hotels and travel", "Schools and colleges", "Ayurveda and wellness brands", "Real estate", "Consulting and finance", "E-commerce and D2C", "Manufacturing", "Startups"],
    caseStudySlugs: ["sweet-protection-custom-tech-ecommerce-performance-gear", "usa-based-ngo", "sportsxcoin"],
    faq: [
      {
        question: "How much does a website cost in India?",
        answer:
          "A business website, an e-commerce store and a custom web app are very different projects. We price each one as a fixed quote after a short scoping call, so you know the full cost and timeline before any work starts.",
      },
      {
        question: "How long does it take to build a website?",
        answer:
          "A focused business website usually takes three to five weeks from approved design to launch. E-commerce stores and web apps take longer depending on features and integrations.",
      },
      {
        question: "Do you use WordPress?",
        answer:
          "We build most sites with custom code in Next.js and React because they are faster, more secure and cheaper to maintain over time. If you already run WordPress, we can improve it or move you off it without losing your SEO.",
      },
      {
        question: "Will my website be SEO-friendly and mobile-friendly?",
        answer:
          "Yes. Every site is designed mobile-first and ships with clean URLs, page titles, meta descriptions, structured data, a sitemap and compressed images. We also connect Google Search Console at launch.",
      },
      {
        question: "Do I own the code and the domain?",
        answer:
          "Yes. The domain, hosting and code are in your name. We hand over the repository and logins at launch.",
      },
    ],
    ctaHeading: "Plan your website with us",
    ctaText: "Share what you need built and we will come back with a clear scope, timeline and fixed price.",
    areaServed: { type: "Country", name: "India" },
    serviceType: "Web development",
  },

  "digital-marketing-agency-mumbai": {
    path: "/digital-marketing-agency-mumbai",
    metaTitle: "Digital Marketing Agency in Mumbai",
    metaDescription:
      "Digital marketing agency in Mumbai, based at Platinum BKC, Bandra. SEO, Google and Meta ads, social media, branding and websites by Obsidian Six.",
    breadcrumb: "Digital Marketing Agency Mumbai",
    eyebrow: "Platinum BKC, Bandra, Mumbai",
    h1: "Digital Marketing Agency in Mumbai",
    intro:
      "Obsidian Six runs SEO, Google Ads, Meta Ads, social media and websites for Mumbai businesses from our office at Platinum BKC in Bandra. We work with founders and marketing teams who want campaigns tied to real leads and sales.",
    sections: [
      {
        heading: "Marketing built for a crowded Mumbai market",
        paragraphs: [
          "Mumbai is one of the most expensive places in India to buy attention online. Cost per click on Google is high, Instagram feeds are crowded and buyers compare five options before they call. Winning here means tight targeting, strong creative and landing pages that make the decision easy.",
          "We start with your numbers: what a customer is worth, what you can pay for a lead and which areas or customer types matter most. Campaigns are built around those limits, and we cut spend quickly on anything that does not pay back.",
        ],
      },
      {
        heading: "Local search for Mumbai neighbourhoods",
        paragraphs: [
          "For clinics, studios, restaurants, real estate projects and service businesses, a large share of enquiries comes from people searching near them. We set up and maintain your Google Business Profile, build location pages for the areas you serve and help you collect genuine reviews from customers.",
          "For brands selling across India from Mumbai, we combine national SEO and performance marketing with content that builds trust, so you are not relying on ads alone.",
        ],
      },
      {
        heading: "One team for strategy, content, ads and web",
        paragraphs: [
          "Our Mumbai clients work with one team that plans the strategy, shoots and edits the content, runs the ads and builds the website. That keeps the message consistent and saves the back-and-forth of managing several vendors.",
          "We are a short drive from most of Bandra, BKC, Andheri and Lower Parel, so in-person reviews, shoots and workshops are easy to arrange.",
        ],
      },
    ],
    servicesHeading: "Services for Mumbai businesses",
    services: SERVICES_MARKETING,
    processHeading: "How we work",
    process: PROCESS_MARKETING,
    industries: ["Real estate", "D2C and e-commerce", "Hospitality and food", "Healthcare and wellness", "Financial services", "B2B and manufacturing"],
    caseStudySlugs: ["sweet-protection-custom-tech-ecommerce-performance-gear", "pachmarhi-ayurveda", "ten-on-ten-stays"],
    faq: [
      {
        question: "Where is your Mumbai office?",
        answer: "Our Mumbai office is at Platinum BKC, 3rd Floor, Bandra, Mumbai 400051. Call +91 80856 52729 to book a meeting.",
      },
      {
        question: "Do you run Google Ads for Mumbai-only targeting?",
        answer:
          "Yes. We can target the whole city, specific areas such as Bandra, Andheri or Thane, or a radius around your store, and adjust bids by location based on which areas bring in paying customers.",
      },
      {
        question: "Can you help my business show up on Google Maps in Mumbai?",
        answer:
          "Yes. We set up or clean up your Google Business Profile, fix your name, address and phone across listings, add photos and posts, and help you ask customers for reviews.",
      },
      {
        question: "What does a digital marketing agency in Mumbai charge?",
        answer:
          "Fees depend on the channels and the amount of content involved. Ad budgets are paid directly to Google or Meta and are separate from our fee. We share a fixed monthly quote after a free audit call.",
      },
    ],
    ctaHeading: "Meet us in Mumbai",
    ctaText: "Tell us about your business and goals. We will audit your current marketing and suggest where to start.",
    areaServed: { type: "City", name: "Mumbai" },
    serviceType: "Digital marketing",
  },

  "digital-marketing-agency-bhopal": {
    path: "/digital-marketing-agency-bhopal",
    metaTitle: "Digital Marketing Agency in Bhopal",
    metaDescription:
      "Digital marketing agency in Bhopal for SEO, Google and Meta ads, social media, branding and websites. Obsidian Six, Hoshangabad Road. Book a free audit.",
    breadcrumb: "Digital Marketing Agency Bhopal",
    eyebrow: "Danish Nagar, Hoshangabad Road, Bhopal",
    h1: "Digital Marketing Agency in Bhopal",
    intro:
      "Obsidian Six helps Bhopal businesses grow online with SEO, Google Ads, Meta Ads, social media, branding and websites. Our Bhopal office on Hoshangabad Road works with colleges, hotels, healthcare and wellness brands, retailers and growing companies across Madhya Pradesh.",
    sections: [
      {
        heading: "A Bhopal team with national-level work",
        paragraphs: [
          "Bhopal businesses often have to choose between a local freelancer and a big-city agency that never visits. We offer a third option: a team based in Bhopal that runs the same strategy, ads and development work we do for clients in Mumbai and Dubai.",
          "Because we are here, we can meet in person, shoot content at your location, coordinate with local creators and understand how customers in Bhopal, Indore, Jabalpur and the rest of Madhya Pradesh search and buy.",
        ],
      },
      {
        heading: "Admissions, bookings and walk-ins",
        paragraphs: [
          "For colleges and institutes, we run admission campaigns on Google and Meta, build landing pages for each course and work on rankings for searches like the best MBA colleges in Bhopal. For hotels, we focus on direct bookings, Google Maps visibility and event packages. For clinics, stores and showrooms, local SEO and lead ads bring in calls and walk-ins.",
          "Every campaign is tracked, so you see how many enquiries came in, what each one cost and which source they came from.",
        ],
      },
      {
        heading: "Websites and branding, built in-house",
        paragraphs: [
          "Our Bhopal team includes designers and developers, so your logo, social creatives and website are made under one roof. We build custom websites that load fast on mobile data, rank on Google and send every enquiry straight to WhatsApp or email.",
          "You own every account, file and line of code we create for you.",
        ],
      },
    ],
    servicesHeading: "Services for Bhopal businesses",
    services: SERVICES_MARKETING,
    processHeading: "How we work",
    process: PROCESS_MARKETING,
    industries: ["Colleges and coaching", "Hotels and hospitality", "Healthcare and Ayurveda", "Retail and showrooms", "Real estate", "Manufacturing"],
    caseStudySlugs: ["pachmarhi-ayurveda", "ten-on-ten-stays", "usa-based-ngo"],
    faq: [
      {
        question: "Where is your Bhopal office?",
        answer: "Our Bhopal office is in Danish Nagar, Hoshangabad Road, Bhopal 462026. Call +91 80856 52729 to book a visit.",
      },
      {
        question: "Do you handle admission campaigns for colleges in Bhopal?",
        answer:
          "Yes. We plan and run Google and Meta admission campaigns, build course landing pages, manage lead follow-up and work on SEO for course and college searches.",
      },
      {
        question: "Can you shoot reels and content at our location in Bhopal?",
        answer:
          "Yes. Our team can plan and shoot on-site content, and coordinate with local creators and influencers for campaigns.",
      },
      {
        question: "Do you work with businesses outside Bhopal?",
        answer:
          "Yes. We work with clients across Madhya Pradesh, the rest of India and the UAE. Bhopal clients simply get the advantage of meeting us in person.",
      },
    ],
    ctaHeading: "Visit our Bhopal office",
    ctaText: "Tell us what you want to grow and we will review your current marketing and suggest the first steps.",
    areaServed: { type: "City", name: "Bhopal" },
    serviceType: "Digital marketing",
  },
};

export const landingPageSlugs = Object.keys(landingPages);
