export interface TechCard {
  name: string;
  logoType: "react" | "nextjs" | "vue" | "angular" | "node" | "python" | "go" | "postgres" | "mongodb" | "redis" | "figma" | "photoshop" | "illustrator" | "blender" | "docker" | "kubernetes" | "aws" | "googleanalytics" | "hubspot" | "meta";
  description: string;
  learnMoreLink?: string;
}

export interface TechTab {
  name: string;
  cards: TechCard[];
}

export interface ProcessStep {
  title: string;
  description: string;
  image: string;
}

export interface WhyUsStat {
  value: string;
  label: string;
}

export interface ServiceData {
  title: string;
  category: string;
  bgImage: string;
  description: string;
  navItems: string[];
  overviewTitle: string;
  overviewParagraphs: string[];
  ctaText?: string;
  ctaLink?: string;
  techStackTitle?: string;
  techStackTabs?: TechTab[];
  processTitle?: string;
  processSteps?: ProcessStep[];
  whyUsTitle?: string;
  whyUsSubtitle?: string;
  whyUsStats?: WhyUsStat[];
  whyUsCtaText?: string;
  whyUsCtaLink?: string;
  servicesOffered?: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
    gradientFrom?: string;
    gradientTo?: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  deliverablesTitle?: string;
  deliverables?: Array<{
    title: string;
    description: string;
  }>;
}

export const servicesStore: Record<string, ServiceData> = {
  // BRANDING CATEGORY
  "brand-consulting": {
    title: "Brand Consulting",
    category: "Branding",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Shape a unique brand identity, comprehensive strategy, and clear messaging architectures that build deep market value.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Strategic Brand Consulting Services to Define Your Market Position",
    overviewParagraphs: [
      "Brand consulting bridges corporate philosophy and consumer perception. We help enterprises map out target audience archetypes, craft sustainable visual guidelines, and design foundational communication strategies that foster loyalty.",
      "Our consultants dive deep into market white spaces and competitor friction points to uncover specific opportunities, helping your brand voice remain authoritative across all print, physical, and digital touchpoints."
    ],
    ctaText: "Let's talk strategy",
    ctaLink: "/contactus",
    processTitle: "Our Strategic Brand Development Process",
    processSteps: [
      {
        title: "Discovery & Competitive Audit",
        description: "We analyze your business goals, baseline assets, audience behaviors, and direct industry competitors to find strategic market gaps.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Positioning & Framework Design",
        description: "We define your core purpose, brand promise, value propositions, and unique messaging pillars to formalize an identity foundation.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Architecture & Implementation",
        description: "We deliver concrete guidelines for deployment across internal product roadmaps, global corporate PR campaigns, and external operations.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Invest in Brand Consulting With Us?",
    whyUsSubtitle: "We align creative execution directly with hard business growth metrics to build meaningful, measurable long-term equity.",
    whyUsStats: [
      { value: "40%+", label: "Average Increase in Brand Recall Metrics" },
      { value: "15+", label: "Global Enterprise Transformations Executed" }
    ],
    faq: [
      { question: "What is included in a typical brand consulting engagement?", answer: "Engagement scopes cover stakeholder discovery loops, comprehensive market competitor matrices, customer persona mapping, messaging tone trees, and corporate brand architecture handoffs." },
      { question: "How long does a deep brand consulting project take?", answer: "Strategic alignment cycles typically run between 4 to 8 weeks depending on company size, historical visual iterations, and structural market complexities." }
    ]
  },
  "logo-design": {
    title: "Logo Design",
    category: "Branding",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Craft modern, memorable visual identity systems and brand marks that embody your company's core principles.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Premium Logo Designs to Set a Modern Standard for Your Visual Mark",
    overviewParagraphs: [
      "A great brand mark provides instantaneous clarity. Our vector-perfect logo designs balance color psychology, typography, and clear grid layouts to look impressive anywhere from an app icon to a stadium billboard.",
      "We design responsive systems where combinations, wordmarks, and sub-icons adjust seamlessly across dark mode screens, premium print collateral, and monochrome environments."
    ],
    ctaText: "Design your mark",
    ctaLink: "/contactus",
    processTitle: "Our Precision Logo Design Lifecycle",
    processSteps: [
      {
        title: "Moodboarding & Conceptualization",
        description: "We synthesize raw stylistic briefs into diverse moodboards, testing geometric shapes, balance systems, and historic industry references.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Vector Drafting & Iteration",
        description: "We refine analog sketches into mathematically balanced vector shapes, optimizing grid lines, radii curves, and text relationships.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "System Delivery & Guidelines",
        description: "We export optimized digital packages (.SVG, .EPS, .PNG) alongside detailed manuals outlining precise usage limits, safe zones, and spacing rules.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Choose Our Visual Identity Specialists?",
    whyUsSubtitle: "We avoid short-lived design trends in favor of timeless, scalable assets built for decades of reliable use.",
    whyUsStats: [
      { value: "100%", label: "Vector Scaling Accuracy on Multi-Platforms" },
      { value: "250+", label: "Custom Typographic Marks Handcrafted" }
    ],
    faq: [
      { question: "Do I own complete intellectual rights to the finalized logo formats?", answer: "Yes. Upon completion of payment milestones, 100% of the worldwide copyrights and operational ownership are transferred directly to your organization." },
      { question: "What are responsive logos?", answer: "Responsive logos adapt based on device size. You receive variations suited for desktop menus, small mobile footers, square social profile frames, and minimalist watermarks." }
    ]
  },
  "industrial-product-design": {
    title: "Industrial / Product Design",
    category: "Branding",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Design physical goods and digital products that combine beautiful aesthetics with practical, human-centered utility.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Industrial & Structural Product Design Engineered for Real Human Interaction",
    overviewParagraphs: [
      "Product design turns ambitious concepts into tangible, practical market solutions. We bridge creative styling with industrial engineering constraints, accounting for manufacturing limitations, materials science, and ergonomic safety guidelines.",
      "Whether you are prototyping next-generation smart consumer devices or premium casing boxes, our team transforms conceptual engineering designs into market-ready assets."
    ],
    ctaText: "Engineer your product",
    ctaLink: "/contactus",
    processTitle: "Our Industrial Design Workflow",
    processSteps: [
      {
        title: "Ergonomic Sketching",
        description: "We draw initial physical forms, verifying usability grips, structural weights, and physical touchpoints against human factors data.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "CAD Modeling & Stress Tests",
        description: "We build precise parametric surfaces using professional tools to simulate mechanical component clearances, wall thicknesses, and drop impacts.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "DFM Optimization",
        description: "We refine assemblies for Design for Manufacturing (DFM), verifying draft angles, parting lines, and assembly steps with factory teams.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Choose Our Engineering Design Division?",
    whyUsSubtitle: "We ensure beautiful conceptual mockups migrate flawlessly to real, efficient production lines.",
    whyUsStats: [
      { value: "98.4%", label: "Prototype-to-Factory Match Rate Accuracy" },
      { value: "50+", label: "Physical Assemblies Successfully Launched" }
    ],
    faq: [
      { question: "Do you supply production CAD files for factory injection molding tooling?", answer: "Yes, we hand over production-ready SolidWorks, STEP, and IGES formats fully calibrated for manufacturing tooling." },
      { question: "Can you assist with component sourcing and prototyping rounds?", answer: "We coordinate directly with rapid 3D printing vendors and CNC machining centers to quickly manage functional physical prototypes." }
    ]
  },
  "graphic-design": {
    title: "Graphic Design",
    category: "Branding",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Create striking marketing assets, presentation systems, and print collateral that amplify your brand's presence.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Stunning Graphic Materials that Tell a Unified Visual Narrative",
    overviewParagraphs: [
      "In crowded markets, consistent visual presentation matters. We build scalable design systems for all your collateral, including investor decks, advertising materials, digital reports, and event booths.",
      "Our layouts rely on rigorous typography hierarchies, modern grid alignments, and purposeful space usage to drive deep customer action."
    ],
    ctaText: "Start a design project",
    ctaLink: "/contactus",
    processTitle: "Our Production Creative Pipeline",
    processSteps: [
      {
        title: "Asset Specification Guidelines",
        description: "We map out image profiles, font structures, digital grid layouts, and color balances to match your existing core brand systems.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "High-Fidelity Layout Compilation",
        description: "We build detailed graphics variations, typesetting custom paragraphs, and optimizing image clarity for all delivery environments.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Pre-Flight Optimization Reviews",
        description: "We run quality checks across CMYK print separations, bleed margins, and digital pixel weights to ensure flawless rendering.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Hire Our Full-Service Creative Studio?",
    whyUsSubtitle: "We deliver professional design support that maintains your brand values across every marketing channel.",
    whyUsStats: [
      { value: "12k+", label: "High-Resolution Assets Generated Annually" },
      { value: "0", label: "Bleed or Printing Discrepancies Across Operations" }
    ],
    faq: [
      { question: "Do you handle layout designs for print packaging and physical boxes?", answer: "Yes, we design comprehensive vector dielines, including material treatments, ink separations, and shipping regulations." },
      { question: "What applications does your design studio build templates on?", answer: "We supply files in Figma, Adobe Illustrator, Photoshop, or InDesign format based on your internal team's needs." }
    ]
  },
  "2d-3d-visualisation": {
    title: "2D / 3D Visualisation",
    category: "Branding",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Render ultra-realistic and cinematic 3D models for architecture, consumer products, and digital campaigns.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Photorealistic 3D Renders and Immersive Visual Environments",
    overviewParagraphs: [
      "Bring concepts to life long before physical production begins. We design high-fidelity 3D assets, walkthrough animations, and lighting environments that feel incredibly realistic.",
      "Perfect for architectural planning, real estate previews, and creative campaign collateral."
    ],
    ctaText: "Generate 3D renders",
    ctaLink: "/contactus",
    processTitle: "Our 3D Production Pipeline",
    processSteps: [
      {
        title: "Polygonal Mesh Modelling",
        description: "We build clean 3D topology structures, optimizing polycounts and surface edge loops for crisp, fast reflections.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "PBR Material Texturing",
        description: "We apply physically based rendering (PBR) materials, configuring realistic roughness, normals, and subsurface light scattering.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Cinematic Lighting & Compiling",
        description: "We set up complex light profiles, HDRI backdrops, and render camera pathways to export stunning, photorealistic frames.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Use Our 3D Rendering Capabilities?",
    whyUsSubtitle: "We build highly detailed environments with true physical lighting behaviors to simulate accurate reality.",
    whyUsStats: [
      { value: "8K", label: "Max Resolution Rendering Engine Capabilities" },
      { value: "500+", label: "Immersive Architectural/Product Renders Delivered" }
    ],
    faq: [
      { question: "Can you turn basic 2D architectural CAD files into high-fidelity 3D previews?", answer: "Yes. We take typical .DWG or .PDF architectural floorplans and convert them into immersive 3D internal and external walkthrough simulations." },
      { question: "What render engines do your engineers use?", answer: "We render using Blender Cycles, Unreal Engine 5, V-Ray, and KeyShot depending on your timeline and asset complexity." }
    ]
  },

  // TECHNOLOGY CATEGORY
  "ai-machine-learning": {
    title: "AI & Machine Learning",
    category: "Technology",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Build intelligence into your platforms with custom machine learning models, natural language pipelines, and deep LLM systems.",
    navItems: ["Overview", "Technologies", "Process", "FAQ"],
    overviewTitle: "AI & Machine Learning Infrastructures Built for Intelligent Automation",
    overviewParagraphs: [
      "Shift from basic rule engines to automated, predictive decision-making models. We build enterprise AI systems that help optimize workflows, automatically structure chaotic inputs, and predict market demands.",
      "Our ML engineers specialize in tuning proprietary transformers, building semantic vector search systems, and integrating intelligent edge processing models into existing apps securely."
    ],
    ctaText: "Deploy intelligent software",
    ctaLink: "/contactus",
    techStackTitle: "Artificial Intelligence Tech Stack",
    techStackTabs: [
      {
        name: "Modeling & Data",
        cards: [
          { name: "Python", logoType: "python", description: "The foundation for statistical model compilation, tensor mapping, and network design." },
          { name: "MongoDB", logoType: "mongodb", description: "Stores unstructured metadata payloads and training checkpoints safely." }
        ]
      }
    ],
    processTitle: "Our Scientific ML Implementation Process",
    processSteps: [
      {
        title: "Data Cleansing & ETL Pipeline",
        description: "We ingest historical logs, structuring and cleansing messy data fields to create high-quality training sets.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Model Selection & Architecture Strategy",
        description: "We choose optimal model paradigms, testing network types from classical regressions to deep transformer systems.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Deployment & Optimization Loops",
        description: "We deploy model weights behind high-speed, secure APIs, optimizing latency and tracking concept drift.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Choose Our Intelligent Engineering Team?",
    whyUsSubtitle: "We focus on real production metrics, security, and low latency rather than passing artificial trends.",
    whyUsStats: [
      { value: "90%+", label: "Inference Latency Reduction via Quantization" },
      { value: "10M+", label: "Data Records Ingested into Real-Time Production" }
    ],
    faq: [
      { question: "How do you guarantee proprietary business training data remains secure?", answer: "We deploy models within private VPC bubbles on AWS, avoiding external API connections to guarantee 100% data isolation." },
      { question: "What is model drift, and how do your engineers prevent it?", answer: "Model drift happens when real-world user data shifts away from baseline training contexts. We build continuous monitoring systems that flag drop-offs and trigger retraining loops automatically." }
    ]
  },
  "devops-consulting": {
    title: "DevOps Consulting",
    category: "Technology",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Accelerate development cycles with automated CI/CD pipelines, container orchestration, and continuous system monitoring.",
    navItems: ["Overview", "Technologies", "Process", "FAQ"],
    overviewTitle: "High-Availability DevOps Services Designed for Zero-Downtime Infrastructure",
    overviewParagraphs: [
      "Eliminate manual steps and minimize production deployment friction. We transform manual server workflows into automated Infrastructure-as-Code setups, configuring secure CI/CD runners and scaling cluster layers cleanly.",
      "Our DevOps engineers construct networks that absorb intense load spikes, maintain high security standards, and alert teams before system drop-offs affect end users."
    ],
    ctaText: "Automate your infrastructure",
    ctaLink: "/contactus",
    techStackTitle: "Infrastructure & Orchestration Stack",
    techStackTabs: [
      {
        name: "DevOps Core",
        cards: [
          { name: "Docker", logoType: "docker", description: "Standardizes development and production spaces into reliable, isolated application environments." },
          { name: "Kubernetes", logoType: "kubernetes", description: "Automates container deployment, scaling, traffic routing, and health checks across cloud networks." },
          { name: "AWS", logoType: "aws", description: "Provides high-performance computing, VPC setups, IAM policies, and cloud infrastructure." }
        ]
      }
    ],
    processTitle: "Our Automation Delivery Roadmap",
    processSteps: [
      {
        title: "IaC Architecture Definition",
        description: "We rewrite manual cloud architectures into clean, reusable files using modern declarative code principles.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "CI/CD Deployment Pipelines",
        description: "We configure automated build runners that test syntax, check security, and deploy code updates seamlessly on every git commit.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Log Aggregation & SRE Metrics",
        description: "We implement deep telemetry tracking to capture container resource metrics, response times, and system errors in real time.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Partner With Our SRE Specialists?",
    whyUsSubtitle: "We build secure, reproducible architectures that cut deployment friction and lower cloud spend.",
    whyUsStats: [
      { value: "99.99%", label: "Uptime Achieved on High-Traffic Systems" },
      { value: "10x", label: "Faster Deployment Iterations via Automated Runners" }
    ],
    faq: [
      { question: "Can you help migrate our legacy on-premise systems to modern AWS cloud structures?", answer: "Yes. We design end-to-end cloud migrations, mapping databases, creating secure networks, and scheduling cutovers with near-zero service impact." },
      { question: "How do automated infrastructure rollbacks protect live code updates?", answer: "If a fresh code deployment triggers error alerts or drops health checks, our system instantly reverts to the last stable container image automatically." }
    ]
  },
  "data-analytics": {
    title: "Data & Analytics",
    category: "Technology",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Turn raw database logs into clear business insights with custom dashboards, aggregation pipelines, and reporting tools.",
    navItems: ["Overview", "Technologies", "Process", "FAQ"],
    overviewTitle: "Comprehensive Data Analytics Solutions for Clear Business Strategy",
    overviewParagraphs: [
      "Valuable operational insights often sit buried inside unread system logs. We clean, process, and map your business records to build accurate analytical views that track customer lifecycles and identify process delays.",
      "We build resilient data warehouse solutions that process millions of records quickly, giving your leadership team a dependable source of truth for business choices."
    ],
    ctaText: "Analyze your data assets",
    ctaLink: "/contactus",
    techStackTitle: "Data Warehousing Engine Stack",
    techStackTabs: [
      {
        name: "Databases & Warehouses",
        cards: [
          { name: "PostgreSQL", logoType: "postgres", description: "Processes complex relational queries and manages transaction records reliably." },
          { name: "Redis", logoType: "redis", description: "Caches common queries to deliver real-time metrics sub-milliseconds faster." }
        ]
      }
    ],
    processTitle: "Our Business Intelligence Pipeline",
    processSteps: [
      {
        title: "Warehouse Modeling Design",
        description: "We organize distributed system logs into optimized tables designed for fast aggregation and performance under load.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Analytical Transformation Tasks",
        description: "We build background jobs that calculate key performance metrics and sort customer attributes automatically.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Dashboard Visualization Delivery",
        description: "We create intuitive, fast-loading visual chart layouts that make it easy for executives to monitor operational health at a glance.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Trust Our Data Architecture Division?",
    whyUsSubtitle: "We create clean, well-tested data models that maintain query speed even as your databases grow.",
    whyUsStats: [
      { value: "20x", label: "Query Speed Improvement on Large Datasets" },
      { value: "100%", label: "Data Quality Verification Rate" }
    ],
    faq: [
      { question: "Can your data pipelines ingest data from multiple separate SaaS tools?", answer: "Yes. We build unified pipelines that safely aggregate records from CRMs, application databases, payment gateways, and web trackers into one clear dashboard view." },
      { question: "How do you optimize query performance on databases with billions of records?", answer: "We use smart indexing patterns, partition large tables, and build pre-aggregated views to keep dashboard load times minimal." }
    ]
  },
  "web-development": {
    title: "Web Development",
    category: "Technology",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Build robust, scalable, and responsive web platforms using modern standards, clean code architectures, and high-performance frameworks.",
    navItems: ["Overview", "Technologies", "Process", "Why Us", "FAQ"],
    overviewTitle: "Enterprise Web Development Services Built for Scale and High Engagement",
    overviewParagraphs: [
      "Your web platform serves as the foundation of your digital interactions. We engineer custom web systems, single-page apps, and heavy cloud portals optimized to perform under intense user traffic.",
      "Our team focuses on clean, modular component structures, secure data transactions, fast page delivery, and reliable rendering pipelines that ensure your platform stands out from the competition."
    ],
    ctaText: "Launch your web platform",
    ctaLink: "/contactus",
    techStackTitle: "Modern Full-Stack Web Development Architecture",
    techStackTabs: [
      {
        name: "Frontend UI Tier",
        cards: [
          { name: "React", logoType: "react", description: "Builds modular, responsive component systems using fast state management rules." },
          { name: "Next.js", logoType: "nextjs", description: "Enables server-side rendering (SSR), static site generation (SSG), and optimized routing out of the box." },
          { name: "Vue.js", logoType: "vue", description: "Creates lightweight, reactive user interfaces with high rendering efficiency." }
        ]
      },
      {
        name: "Backend Logic Layer",
        cards: [
          { name: "Node.js", logoType: "node", description: "Powers high-concurrency connections and real-time data streaming via an asynchronous event loop." },
          { name: "Go (Golang)", logoType: "go", description: "Compiles into lean, ultra-fast microservices with excellent native concurrency features." }
        ]
      }
    ],
    processTitle: "Our Comprehensive Web Engineering Journey",
    processSteps: [
      {
        title: "Architecture & Schema Setup",
        description: "We map component relations, design API models, and build database structures optimized for long-term scalability.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Frontend & Backend Programming",
        description: "Our developers write clean code matching high security specs, integrating key backend processes with intuitive interface layouts.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Optimization & Deployment Launch",
        description: "We minimize bundle sizes, cache static assets, configure global CDN endpoints, and deploy to live infrastructure.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Build Your Platform With Our Engineers?",
    whyUsSubtitle: "We merge clean visual implementation with secure, high-performance infrastructure to build reliable applications.",
    whyUsStats: [
      { value: "95+", label: "Average Google Lighthouse Performance Score" },
      { value: "300+", label: "Custom Applications Successfully Deployed Globally" }
    ],
    faq: [
      { question: "Do your web applications scale automatically to absorb sudden traffic spikes?", answer: "Yes. We configure our systems using containerized cloud setups that add instances automatically when visitor traffic spikes." },
      { question: "Will our website look clean and function perfectly across old and new mobile devices?", answer: "Yes, we test our code across multiple active browser engines and screen resolutions to guarantee consistent responsive performance." }
    ]
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    category: "Technology",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Build custom iOS and Android applications optimized for native performance and premium user experiences.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "High-Performance Mobile Apps Built for Apple iOS and Android Platforms",
    overviewParagraphs: [
      "Mobile applications demand fast interactions and efficient resource usage. We build beautiful native and cross-platform apps that integrate smoothly with device hardware, handle offline data storage reliably, and send lightning-fast push notifications.",
      "Our engineering team balances performance and clean design, delivering responsive layouts that maintain high frame rates on both flagship and budget devices."
    ],
    ctaText: "Build your mobile app",
    ctaLink: "/contactus",
    processTitle: "Our Mobile Engineering Roadmap",
    processSteps: [
      {
        title: "Device Layout Mapping",
        description: "We wireframe adaptive interface layouts that account for physical screen variations, notches, and native gesture controls.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Hardware Integration Coding",
        description: "We program deep integrations with device biometric security systems, background processing queues, and offline storage models.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "App Store Submission",
        description: "We handle Apple App Store and Google Play reviews, aligning configurations with submission rules to ensure smooth deployment.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Choose Our Mobile Development Team?",
    whyUsSubtitle: "We build clean mobile architectures that deliver fluid performance and efficient battery usage.",
    whyUsStats: [
      { value: "60 FPS", label: "Fluid Rendering Speeds Across User Interfaces" },
      { value: "4.9", label: "Average Store Rating Score Across Client App Portfolios" }
    ],
    faq: [
      { question: "Do you build cross-platform or true native applications?", answer: "We support both approaches. We build with Flutter or React Native for efficient multi-platform code reuse, and use Swift or Kotlin for complex, hardware-heavy native applications." },
      { question: "How does the application manage core features when users lose internet connectivity?", answer: "We integrate smart local databases that save changes locally and sync updates with central servers once the device reconnects." }
    ]
  },
  "e-commerce": {
    title: "E-commerce",
    category: "Technology",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Deploy secure digital storefronts, checkout systems, and logistics integrations designed to maximize conversion rates.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Scalable E-Commerce Architectures Engineered to Drive Conversion Metrics",
    overviewParagraphs: [
      "Online retail demands high availability, fast loading speeds, and frictionless checkouts. We build custom storefront applications that connect smoothly with global payment gateways, manage inventories accurately in real time, and process multi-currency purchases safely.",
      "We replace rigid, slow commercial setups with modular architectures that load catalogs instantly and keep checkouts fast even during intense flash sales."
    ],
    ctaText: "Optimize your storefront",
    ctaLink: "/contactus",
    processTitle: "Our Commerce System Architecture Steps",
    processSteps: [
      {
        title: "Catalog Data Engineering",
        description: "We construct search filters and inventory tables designed to update quickly across thousands of individual item entries.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Checkout Flow Optimization",
        description: "We build secure, minimal-step checkout forms that use tokenized payment pipelines to protect client financial records.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Logistics API Integrations",
        description: "We connect your backend systems with shipping APIs to automate order routing, label printing, and customer tracking updates.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Choose Our E-Commerce Development Division?",
    whyUsSubtitle: "We specialize in building fast, secure digital storefronts that keep abandon rates low.",
    whyUsStats: [
      { value: "35%+", label: "Average Growth inside Shopping Checkout Conversions" },
      { value: "50k+", label: "Transactions Processed Hourly with Zero System Failures" }
    ],
    faq: [
      { question: "Can your architectures connect directly to our existing ERP inventory software?", answer: "Yes, we build secure background data jobs that keep your central stock counts, warehouse logs, and product prices fully synchronized." },
      { question: "How does your checkout platform maintain PCI data compliance standards?", answer: "We use tokenized merchant frameworks like Stripe or PayPal, passing sensitive card inputs directly to the payment processor without ever hitting your database." }
    ]
  },
  "quality-assurance-testing": {
    title: "Quality Assurance & Testing",
    category: "Technology",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Ensure software reliability with robust manual testing, automated test coverage, and security checks.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Rigorous QA Testing to Guarantee Flawless User Experiences",
    overviewParagraphs: [
      "Bugs destroy user trust. We design comprehensive testing protocols covering UI functionality, API reliability, security standards, and cross-device consistency.",
      "Our QA engineers automate critical regression tests, ensuring that new code deployments never break existing features in production."
    ],
    ctaText: "Secure your software",
    ctaLink: "/contactus",
    processTitle: "Our Quality Assurance Process",
    processSteps: [
      {
        title: "Test Case Generation",
        description: "We review application features to write exhaustive edge-case scenarios that push the software to its limits.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Automated Scripting",
        description: "We build repeatable testing scripts using frameworks like Cypress and Selenium that execute automatically during the CI/CD phase.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Load & Security Profiling",
        description: "We run simulated traffic spikes and perform deep vulnerability scans to certify system resilience and data safety.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Trust Our QA Specialists?",
    whyUsSubtitle: "We catch edge cases before they reach your customers, protecting your revenue and reputation.",
    whyUsStats: [
      { value: "99%", label: "Test Coverage Achieved on Core Modules" },
      { value: "0", label: "Critical Production Bugs After QA Clearance" }
    ],
    faq: [
      { question: "Do you perform manual testing on physical devices?", answer: "Yes, we maintain a device lab and test software on actual iOS and Android devices, ensuring native hardware quirks are accounted for." },
      { question: "How does QA fit into rapid agile development?", answer: "We integrate our automated test suites directly into your CI pipeline so code is verified continuously within minutes of every developer commit." }
    ]
  },

  // DIGITAL MARKETING CATEGORY
  "search-engine-optimisation": {
    title: "Search Engine Optimisation",
    category: "Digital Marketing",
    bgImage: "/images/web_development_hero_bg.png",
    description: "SEO services in India that bring steady leads from Google: technical fixes, keyword-led pages, local SEO and content, reported every month.",
    navItems: ["Overview", "What You Get", "Process", "Why Us", "FAQ"],
    overviewTitle: "SEO That Brings Enquiries, Not Just Rankings",
    overviewParagraphs: [
      "Most business owners in India come to us after paying for SEO for months and seeing a report full of keywords nobody searches for. Rankings for your own brand name or for phrases with no buyers do not pay salaries. We start from the other end: which searches does a person type just before they call a business like yours? \"CA firm in Andheri for GST filing\", \"interior designer for 3BHK in Bhopal\", \"company formation in Dubai for Indian founders\". Those are the pages we build and the positions we chase.",
      "SEO has three parts and we handle all of them. The technical part makes sure Google can crawl and understand your site: speed, mobile layout, broken links, duplicate pages, sitemaps, canonical tags and structured data. The content part gives Google a clear page for every service and location you want to rank for, written so a real buyer gets their question answered. The authority part earns mentions and links from websites your customers already trust, without buying spammy link packages.",
      "For businesses with a physical office or service area, local SEO usually brings the fastest results. That means a complete Google Business Profile, consistent name, address and phone number across directories like JustDial, Sulekha and IndiaMART, regular photos and posts, and a simple system to ask happy customers for reviews. For a clinic, a coaching institute or a showroom, the map pack often brings more calls than the website itself.",
      "We also build SEO around how buying works in your sector. A B2B manufacturer needs pages for each product and industry it serves. A real estate developer needs project and locality pages. A UAE business setup firm needs pages that answer cost, timeline and visa questions honestly, because those are the searches that come before a call. Every page links to the next step: a call, a WhatsApp chat or a form.",
      "You get a monthly report in plain language: which pages gained traffic, which searches brought enquiries, what we fixed and what we are doing next. If something is not working after three months, we say so and change the plan."
    ],
    ctaText: "Get a free SEO check of your website",
    ctaLink: "/contactus",
    deliverablesTitle: "What you get with our SEO service",
    deliverables: [
      { title: "Technical SEO audit and fixes", description: "Crawl errors, slow pages, mobile issues, duplicate content, redirects, sitemap and robots.txt checked and fixed, not just listed in a PDF." },
      { title: "Keyword and page plan", description: "A sheet of the searches your buyers use, grouped by intent and mapped to one page each, so your pages stop competing with each other." },
      { title: "On-page optimisation", description: "Titles, meta descriptions, headings, internal links, image alt text and FAQ schema written for each priority page." },
      { title: "Local SEO setup", description: "Google Business Profile optimised for each office, directory listings cleaned up so your details match everywhere, and a review request routine." },
      { title: "Content that ranks", description: "Service pages, location pages and blog articles written around real questions your customers ask, in clear English (or Hindi where it helps)." },
      { title: "Search Console and GA4 tracking", description: "Google Search Console and GA4 set up with enquiry tracking, so we can show which searches and pages actually bring leads." }
    ],
    processTitle: "How our SEO process works",
    processSteps: [
      {
        title: "Audit and baseline",
        description: "In the first two weeks we audit your site, your Google Business Profile and your top competitors, and record where you stand today: traffic, rankings and enquiries. This baseline is how we measure progress later.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Keyword and intent mapping",
        description: "We research what your buyers search in your city or market, separate research searches from ready-to-buy searches, and decide which page should rank for each group.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Technical fixes",
        description: "We fix what stops Google from reading your site properly: speed, mobile layout, broken links, duplicate pages and missing structured data. On sites we built, we make these changes directly in the code.",
        image: "/images/ProactiveImage3.jpeg"
      },
      {
        title: "Content and local SEO",
        description: "We improve existing pages, create the missing service and location pages, set up your Google Business Profile and start a steady flow of useful articles.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Authority and reporting",
        description: "We earn links and mentions through directories, partners, PR and useful content, and send a plain-language report every month with what changed and what comes next.",
        image: "/images/ProactiveImage2.jpeg"
      }
    ],
    whyUsTitle: "Why businesses choose our SEO team",
    whyUsSubtitle: "We write, design and code in-house, so SEO fixes actually get done instead of waiting on a separate developer.",
    whyUsStats: [
      { value: "100+", label: "Businesses served across India, UAE, the US and Europe" },
      { value: "7+ yrs", label: "Of hands-on digital marketing experience" },
      { value: "2 offices", label: "Mumbai (BKC) and Bhopal, serving clients India-wide and in the UAE" }
    ],
    faq: [
      { question: "How long does SEO take to show results?", answer: "Technical fixes and Google Business Profile changes can show results in a few weeks. Steady growth in organic traffic and enquiries usually takes 3 to 6 months, and competitive keywords in big cities can take longer. We share progress every month so you are never guessing." },
      { question: "Do you guarantee first-page rankings?", answer: "No. Nobody controls Google's results, and agencies that guarantee positions usually use shortcuts that get sites penalised later. What we commit to is the work: a clear plan, fixes done on time, honest reporting, and changing course if something is not working." },
      { question: "How much do SEO services cost in India?", answer: "It depends on how many pages, locations and keywords you want to target and how competitive your market is. A local business with one office needs far less work than a company targeting all of India or the UAE. We share a fixed monthly scope and price after a free audit, so you know exactly what you are paying for." },
      { question: "What is local SEO and do I need it?", answer: "Local SEO helps you show up in Google Maps and \"near me\" searches. If customers visit your office, clinic, showroom or institute, or you serve a specific city, local SEO is usually the quickest win. It covers your Google Business Profile, directory listings, reviews and location pages on your website." },
      { question: "Will you write the content or do I have to?", answer: "We write it. We will ask you a few questions at the start, because the best content comes from what you actually know about your customers, and you approve every page before it goes live." },
      { question: "Can you do SEO on a WordPress, Shopify or custom-coded site?", answer: "Yes. We work on WordPress, Shopify, Wix and custom sites built in Next.js or React. If your current site has deep technical problems, we will tell you honestly whether fixing it or rebuilding it makes more sense." },
      { question: "Do you work with businesses outside India?", answer: "Yes. We work with clients in the UAE, the US and Europe, and we often help Indian businesses rank in Dubai or abroad with separate pages for each market." }
    ]
  },
  "social-media-management": {
    title: "Social Media Management",
    category: "Digital Marketing",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Social media management in India for Instagram, LinkedIn, Facebook and YouTube: content plans, reels, design, posting and replies, with monthly reporting.",
    navItems: ["Overview", "What You Get", "Process", "Why Us", "FAQ"],
    overviewTitle: "Social Media That Builds Trust Before the Sales Call",
    overviewParagraphs: [
      "Before anyone sends you an enquiry, they check your Instagram or LinkedIn. If the last post is from four months ago, or the feed is only festival wishes and stock photos, they quietly move on. Social media rarely closes the sale on its own, but it decides whether a buyer trusts you enough to call. That is the job we do: keep your pages active, useful and recognisably yours.",
      "We plan content around what your customers want to know, not what fills a calendar. For a restaurant that means dishes, the people in the kitchen and the reasons to visit this weekend. For a CA firm it means short explainers on GST, ITR deadlines and new rules. For a real estate project it means site progress, locality guides and honest answers about possession and pricing. For a B2B company it means founder posts and proof of work on LinkedIn.",
      "Reels and short videos get the widest reach on Instagram and YouTube Shorts today, so most of our plans are built around them. We script the reels, plan the shoot, and edit them in-house. Where it fits, we work with local creators so your brand is seen by audiences that already trust them. Carousels, static posts and stories fill the gaps and keep your feed complete.",
      "We also handle the part most businesses forget: replying. Comments, DMs and enquiries on Instagram and Facebook get answered on time and routed to your sales team on WhatsApp or by phone. A message that waits two days is a lost lead.",
      "Every month you get a short report: what we posted, what reached the most people, what brought profile visits, follows and enquiries, and what we will change next month. If you also run ads, we use what performs well organically to build better ads."
    ],
    ctaText: "Plan your social media with us",
    ctaLink: "/contactus",
    deliverablesTitle: "What you get with social media management",
    deliverables: [
      { title: "Monthly content calendar", description: "A plan of every post, reel and story for the month, shared in advance for your approval, with festival and industry dates built in." },
      { title: "Reels and short videos", description: "Scripts, shoot planning and in-house editing for Instagram Reels and YouTube Shorts, with captions and trending audio where it fits." },
      { title: "Posts, carousels and stories", description: "On-brand designs and captions written in English, Hindi or Hinglish depending on who your audience is." },
      { title: "LinkedIn for founders and B2B", description: "Founder and company page posts that show expertise and proof of work, which is where most B2B buyers check you out." },
      { title: "Community and DM handling", description: "Comments and messages answered on time, with enquiries passed to your team on WhatsApp or by phone the same day." },
      { title: "Profile setup and monthly report", description: "Bio, highlights, links and contact buttons set up properly, plus a plain-language monthly report on reach, engagement and enquiries." }
    ],
    processTitle: "How we run your social media",
    processSteps: [
      {
        title: "Brand and audience check",
        description: "We review your current pages and competitors, and agree on who we are talking to, what they care about and how your brand should sound.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Content calendar",
        description: "Every month starts with a calendar of posts and reels that mixes education, proof of work, behind-the-scenes and offers, shared with you for approval.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Shoot and design",
        description: "We plan shoots, work with creators where it fits, design posts and edit reels in-house so everything looks like one brand.",
        image: "/images/ProactiveImage3.jpeg"
      },
      {
        title: "Posting and replies",
        description: "We post at the times your audience is active and reply to comments and DMs, passing real enquiries to your team quickly.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Review and improve",
        description: "At the end of each month we look at what worked, drop what did not, and plan the next month around it.",
        image: "/images/ProactiveImage2.jpeg"
      }
    ],
    whyUsTitle: "Why choose our social media team?",
    whyUsSubtitle: "Strategy, design, video editing and ads sit in one team, so your content and your ads tell the same story.",
    whyUsStats: [
      { value: "100+", label: "Businesses served across India, UAE, the US and Europe" },
      { value: "7+ yrs", label: "Of hands-on digital marketing experience" },
      { value: "In-house", label: "Design, reels editing and copywriting under one roof" }
    ],
    faq: [
      { question: "Which social media platforms do you manage?", answer: "Instagram, Facebook, LinkedIn and YouTube. We pick the right mix for your business: Instagram and Facebook for most consumer brands, LinkedIn for B2B and founders, YouTube when longer video makes sense." },
      { question: "How many posts and reels will you make each month?", answer: "It depends on the plan. A typical starting plan for a small business is 12 to 16 pieces a month, mixing reels, carousels and posts, plus stories. We would rather post fewer, better pieces than fill the feed with filler." },
      { question: "Do you shoot videos or do we have to?", answer: "Both work. We can plan and run shoots, work with local creators, or guide your team to shoot simple videos on a phone that we then edit. Many of the best-performing reels are shot by the owner or staff, because people trust real faces." },
      { question: "Can you create content in Hindi or Hinglish?", answer: "Yes. If your customers speak Hindi or Hinglish, your content should too. We write captions and scripts in English, Hindi or Hinglish depending on the audience." },
      { question: "Will social media alone bring me leads?", answer: "Organic social media builds trust and keeps you in front of people, and it does bring enquiries, especially through DMs. For predictable lead volume, most businesses pair it with paid ads on Meta or Google, which we also run." },
      { question: "Do you handle influencer and creator collaborations?", answer: "Yes. We find creators who fit your brand and budget, check that their audience is real and local where needed, agree the brief and rates, and manage the shoot and posting." },
      { question: "How do I know if it is working?", answer: "You get a monthly report showing reach, engagement, profile visits, follower growth and, most importantly, the DMs and enquiries that came in. We set targets together in the first month." }
    ]
  },
  "performance-marketing": {
    title: "Performance Marketing",
    category: "Digital Marketing",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Performance marketing in India: Google Ads and Meta Ads run for leads and sales, with proper tracking, landing pages and weekly reporting.",
    navItems: ["Overview", "What You Get", "Process", "Why Us", "FAQ"],
    overviewTitle: "Ads Measured in Leads and Sales, Not Clicks",
    overviewParagraphs: [
      "Performance marketing means you pay for ads and judge them by what they bring back: enquiries, booked calls, store visits or sales. It sounds obvious, yet most ad accounts we audit are judged on clicks and reach, with no clear link to revenue. Half the leads are fake numbers, nobody tracks which campaign brought the deal that closed, and the budget keeps going to whatever the platform suggests.",
      "We run ads on Google (Search, Performance Max, YouTube and Display) and Meta (Facebook and Instagram), plus LinkedIn for B2B when the deal size justifies it. The platform depends on how your customers buy. Someone searching \"best physiotherapy clinic near me\" is ready now, so Google Search fits. A new cafe or a real estate launch needs people to discover it, so Meta works better. A software company selling to CFOs may need LinkedIn.",
      "In India, the lead form is often where campaigns win or lose. Instant forms on Meta bring cheap leads, but many are low quality unless the form asks the right questions. Click-to-WhatsApp ads often bring better conversations because people already use WhatsApp to talk to businesses. Google leads usually cost more but convert better. We test these options against your actual sales results, not just the cost per lead.",
      "Tracking comes first. Before we spend your budget, we set up GA4, Google Tag Manager, the Meta Pixel and Conversions API, and conversion tracking for calls, forms and WhatsApp clicks. Where possible we connect your CRM or a simple lead sheet, so we can see which campaigns bring leads that turn into customers, and put more money there.",
      "You get a weekly update and a monthly review with numbers you can check yourself: spend, leads, cost per lead, lead quality from your sales team, and what we are changing. Your ad accounts stay in your name, so you always own the data."
    ],
    ctaText: "Get a free ad account audit",
    ctaLink: "/contactus",
    deliverablesTitle: "What you get with performance marketing",
    deliverables: [
      { title: "Ad account audit", description: "A review of your current Google and Meta accounts: wasted spend, wrong targeting, tracking gaps and quick fixes, before we change anything." },
      { title: "Tracking setup", description: "GA4, Google Tag Manager, Meta Pixel and Conversions API, with call, form and WhatsApp click tracking, so results are measured properly." },
      { title: "Campaign build and management", description: "Search, Performance Max, YouTube, Facebook and Instagram campaigns built around your goals, checked and adjusted every week." },
      { title: "Ad creatives and copy", description: "Static ads, carousels and short video ads designed and written in-house, with new versions tested every month." },
      { title: "Landing pages and lead forms", description: "Fast landing pages and lead forms built to qualify leads, so your sales team spends less time on fake or unready enquiries." },
      { title: "Weekly updates and monthly review", description: "Spend, leads, cost per lead and lead quality in plain language, with the next month's plan agreed together." }
    ],
    processTitle: "How we run your ad campaigns",
    processSteps: [
      {
        title: "Audit and goals",
        description: "We review your past campaigns and agree on the numbers that matter: target cost per lead, the lead quality you need and the monthly budget.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Tracking before spend",
        description: "We set up conversion tracking for forms, calls and WhatsApp, and connect your lead sheet or CRM so we can see which leads turn into customers.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Launch and test",
        description: "We launch with a few clearly different audiences, offers and creatives, so we learn quickly what works instead of guessing.",
        image: "/images/ProactiveImage3.jpeg"
      },
      {
        title: "Weekly optimisation",
        description: "Every week we cut what is not working, move budget to what is, refresh creatives that are tiring and check lead quality with your team.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Scale what works",
        description: "Once a campaign brings good leads at a steady cost, we grow the budget step by step and expand to new audiences, cities or platforms.",
        image: "/images/ProactiveImage2.jpeg"
      }
    ],
    whyUsTitle: "Why hire our performance marketers?",
    whyUsSubtitle: "We judge campaigns by the leads your sales team can close, and your ad accounts always stay in your name.",
    whyUsStats: [
      { value: "100+", label: "Businesses served across India, UAE, the US and Europe" },
      { value: "7+ yrs", label: "Of running Google and Meta ads" },
      { value: "India + UAE", label: "Campaigns run for both markets from Mumbai and Bhopal" }
    ],
    faq: [
      { question: "What is performance marketing?", answer: "It is paid advertising judged by measurable results such as leads, calls, bookings or sales, rather than by views or clicks. Every rupee is tracked to see what it brought back, and budget moves to the campaigns that bring the best results." },
      { question: "What budget do I need to start Google or Meta ads?", answer: "It depends on your city, industry and goal. A local business can test with a modest monthly budget, while competitive sectors like real estate, education or finance need more to get enough data. We suggest a test budget after the audit and only recommend scaling once the numbers make sense." },
      { question: "Google Ads or Meta Ads: which is better for my business?", answer: "Google works best when people already search for what you sell, like a clinic, a CA or a service near them. Meta works best when you need people to discover you, like a new cafe, a product launch or a real estate project. Many businesses use both, and we split the budget based on results." },
      { question: "Why are my Meta leads low quality and how do you fix it?", answer: "Easy forms bring many casual or fake leads. We fix this with higher-intent forms that ask a qualifying question, click-to-WhatsApp ads, better targeting and quick follow-up. We judge success by how many leads your team can actually talk to, not the cheapest cost per lead." },
      { question: "How soon will I see results from ads?", answer: "Ads start bringing traffic and leads within days. The first two to four weeks are a learning phase where we test and cut. Most accounts settle into a steady cost per lead within one to two months." },
      { question: "Who owns the ad accounts and data?", answer: "You do. We work inside ad accounts in your business name, or create them in your name. If you ever stop working with us, the accounts, pixels and data stay with you." },
      { question: "Do you run ads for businesses in Dubai and the UAE?", answer: "Yes. We run Google and Meta campaigns for UAE businesses, including business setup, finance and travel companies, and campaigns that target Indian audiences for Dubai services." }
    ]
  },
  "content-marketing": {
    title: "Content Marketing",
    category: "Digital Marketing",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Establish industry authority and nurture leads with high-value educational content and thought leadership.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Strategic Content that Educates and Converts",
    overviewParagraphs: [
      "Content is the fuel for your inbound engine. We produce deep-dive articles, whitepapers, and case studies that solve real problems for your target audience.",
      "By answering complex questions thoroughly, we position your brand as the undisputed authority in your niche, building trust long before a sales call happens."
    ],
    ctaText: "Build your content engine",
    ctaLink: "/contactus",
    processTitle: "Our Content Production Strategy",
    processSteps: [
      {
        title: "Topic Ideation & Research",
        description: "We interview your internal experts and analyze search trends to uncover topics that matter most to your prospects.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Drafting & Editing",
        description: "Our specialized writers craft engaging, well-researched pieces, passing them through rigorous editorial reviews for accuracy and tone.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Distribution Strategy",
        description: "We repurpose long-form content into social snippets, newsletter highlights, and downloadable assets to maximize reach.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Choose Our Content Studio?",
    whyUsSubtitle: "We write content for humans first and search engines second, resulting in genuinely readable and impactful material.",
    whyUsStats: [
      { value: "2M+", label: "Words of High-Converting B2B Content Published" },
      { value: "3x", label: "Increase in Lead Generation via Gated Assets" }
    ],
    faq: [
      { question: "Do your writers have technical industry expertise?", answer: "Yes. We maintain a network of specialized writers capable of covering complex topics in fintech, healthcare, SaaS, and manufacturing." },
      { question: "How do you ensure content aligns with our brand voice?", answer: "We develop a comprehensive brand voice guideline document during onboarding, ensuring all output matches your desired tone exactly." }
    ]
  },
  "marketing-automation": {
    title: "Marketing Automation",
    category: "Digital Marketing",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Scale your outreach and nurture relationships automatically with intelligent email and CRM workflows.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Intelligent Workflows that Nurture Leads 24/7",
    overviewParagraphs: [
      "Stop losing leads to manual follow-ups. We design and implement smart automation pipelines that send the right message to the right person at the exact right time.",
      "From welcome sequences to abandoned cart reminders, we integrate your CRM and email platforms to create seamless, personalized customer journeys at scale."
    ],
    ctaText: "Automate your marketing",
    ctaLink: "/contactus",
    processTitle: "Our Automation Implementation Roadmap",
    processSteps: [
      {
        title: "Journey Mapping",
        description: "We visually map out every touchpoint a customer has with your brand, identifying key trigger events for automation.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Logic & Rule Configuration",
        description: "We set up complex conditional logic in platforms like HubSpot or ActiveCampaign, ensuring emails trigger based on specific user behaviors.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Copywriting & Personalization",
        description: "We write dynamic email copy that uses CRM variables to insert personalized details, increasing open and click rates.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Partner with Our Lifecycle Engineers?",
    whyUsSubtitle: "We build robust automation logic that never breaks and delivers highly relevant messages.",
    whyUsStats: [
      { value: "50%+", label: "Average Increase in Email Open Rates" },
      { value: "24/7", label: "Lead Nurturing Operating Without Human Intervention" }
    ],
    faq: [
      { question: "Which automation platforms do you work with?", answer: "Our team is certified in enterprise tools including HubSpot, Marketo, Salesforce Pardot, and ActiveCampaign." },
      { question: "Can automation workflows handle multiple languages?", answer: "Yes, we configure dynamic content blocks that detect a user's location or preference and serve the email in their native language." }
    ]
  },
  "analytics": {
    title: "Analytics",
    category: "Digital Marketing",
    bgImage: "/images/web_development_hero_bg.png",
    description: "Track marketing attribution and conversion behaviors to optimize future investments with absolute clarity.",
    navItems: ["Overview", "Process", "Why Us", "FAQ"],
    overviewTitle: "Accurate Marketing Attribution and Deep Analytics Integration",
    overviewParagraphs: [
      "You cannot improve what you cannot measure. We configure advanced analytics environments to track exactly how users interact with your digital properties.",
      "We replace confusing spreadsheets with intuitive, real-time dashboards that aggregate data from multiple channels, giving leadership a clear view of marketing ROI."
    ],
    ctaText: "Unlock data insights",
    ctaLink: "/contactus",
    processTitle: "Our Analytics Setup Process",
    processSteps: [
      {
        title: "Tag Management Setup",
        description: "We deploy Google Tag Manager to organize tracking scripts cleanly, ensuring they load quickly without breaking site functionality.",
        image: "/images/ProactiveImage.jpeg"
      },
      {
        title: "Event & Conversion Tracking",
        description: "We configure custom events to track meaningful actions—like video plays, form submissions, and specific button clicks.",
        image: "/images/ProactiveImage2.jpeg"
      },
      {
        title: "Dashboard Construction",
        description: "We build visual reporting dashboards using Looker Studio or Power BI, merging ad spend data with web traffic and CRM sales.",
        image: "/images/ProactiveImage3.jpeg"
      }
    ],
    whyUsTitle: "Why Trust Our Data Analysts?",
    whyUsSubtitle: "We ensure your tracking architecture is fully compliant with privacy laws while delivering precise attribution.",
    whyUsStats: [
      { value: "100%", label: "Accuracy in Cross-Domain Tracking Deployments" },
      { value: "360°", label: "View of the Customer Journey Achieved" }
    ],
    faq: [
      { question: "How do you handle cookie restrictions and iOS privacy updates?", answer: "We implement server-side tracking and Conversion APIs to capture essential data points securely and accurately, even when client-side cookies are blocked." },
      { question: "Can you audit our existing Google Analytics 4 setup?", answer: "Absolutely. We routinely perform GA4 audits to fix duplicate tracking, missing events, and incorrect referral attributions." }
    ]
  }
};
