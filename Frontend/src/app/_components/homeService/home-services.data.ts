export type TabType = "services" | "industries";
export type ServiceTag = {
    label: string;
    href: string;
};
export type ServiceItem = {
    id: number;
    number: number;
    title: string;
    name?: string;
    tags: ServiceTag[];
    description: string;
    image: string;
    video: string;
    href?: string;
};

export const SERVICES: ServiceItem[] = [
    // {
    //     id: 1,
    //     number: 1,
    //     tags: [
    //         {
    //             label: "Brand Consulting",
    //             href: "/services/brand-consulting",
    //         },
    //         {
    //             label: "Logo Design",
    //             href: "/services/logo-design",
    //         },
    //         {
    //             label: "Graphic Design",
    //             href: "/services/graphic-design",
    //         },
    //         {
    //             label: "2D / 3D Visualisation",
    //             href: "/services/2d-3d-visualisation",
    //         },
    //         {
    //             label: "Brand Identity",
    //             href: "/services/brand-identity",
    //         },
    //         {
    //             label: "Industrial Product Design",
    //             href: "/services/industrial-product-design",
    //         },
    //     ],
    //     title: "Social Media Marketing",
    //     image: "/social-media.jpg",
    //     video:"",
    //     description: "We turn attention into loyalty-crafting scroll-stopping content and smart campaigns that grow your brand where it matters most.",
    //     href: "/services/product-uiux-design",
    // },

    {
        id: 1,
        number: 1,
        tags: [
            {
                label: "Brand Consulting",
                href: "/services/brand-consulting",
            },
            {
                label: "Logo Design",
                href: "/services/logo-design",
            },
            {
                label: "Graphic Design",
                href: "/services/graphic-design",
            },
            {
                label: "2D / 3D Visualisation",
                href: "/services/2d-3d-visualisation",
            },
            // {
            //     label: "Brand Identity",
            //     href: "/services/brand-identity",
            // },
            // {
            //     label: "Industrial Product Design",
            //     href: "/services/industrial-product-design",
            // },
        ],
        title: "Branding & Identity",
        image: "/images/branding.jpg",
        video:"/videos/Services/BrandingVedio.mp4",
        description:
        "We help brands to build best logo’s, designs,shaping visuals, voice, and identity that leave a lasting impression.",
        href: "/branding-agency-uae/",
    },

    {
        id: 2,
        number: 2,
        tags: [
            {
                label: "Social Media Management",
                href: "/services/social-media-management",
            },
            {
                label: "Analytics",
                href: "/services/analytics",
            },
            {
                label: "Content Marketing",
                href: "/services/content-marketing",
            },
            {
                label: "Marketing Automation",
                href: "/services/marketing-automation",
            },
            {
                label: "Performance Marketing",
                href: "/services/performance-marketing",
            },
            {
                label: "Search Engine Optimisation",
                href: "/services/search-engine-optimisation",
            },
        ],
        title: "Digital Marketing",
        image:
        "/social-media2.jpeg",
        video:"/videos/Services/DigitalMarketingVedio.mp4",
        description:
        "We blend SEO, ads,SMO,Content marketing and content analytics to boost visibility, attract the right audience, and turn traffic into conversions",
        href: "/digital-marketing-agency-uae/",
    },

    {
        id: 3,
        number: 3,
        tags: [
            {
                label: "DevOps Consulting",
                href: "/services/devops-consulting",
            },
            {
                label: "Data & Analytics",
                href: "/services/data-analytics",
            },
            {
                label: "AI & Machine Learning",
                href: "/services/ai-machine-learning",
            },
            {
                label: "E-commerce",
                href: "/services/e-commerce",
            },
            {
                label: "Web Development",
                href: "/services/web-development",
            },
            {
                label: "Mobile App Development",
                href: "/services/mobile-app-development",
            },
        ],
        title: "Technology",
        image:
        "/images/it-section.png",
        video:"/videos/Services/TechnologyVedio.mp4",
        description:
            "We integrate AI experience,  data analytics,web,mobile development and deliver seamlessEcommerce solutions.",
            href: "/services/technology/",
    },
];

export const INDUSTRIES: ServiceItem[] = [
    
{
        id: 1,
        number: 1,
        tags: [
            {
                label: "Meta ads",
                href: "",
            },
            {
                label: "Website",
                href: "",
            },
            {
                label: "Smm",
                href: "",
            },
        ],
        title: "Finance & Financial Services",
        image: "https://api.obsidiansix.com/uploads/1789500268858-625143282.png",
        video:"",
        description:
        "A performance-driven digital marketing strategy designed to improve AB Capital Dubai's online visibility, audience targeting and lead generation.",
        href: "/case-studies/ab-capital-dubai-digital-lead-/",
    },

    {
        id: 2,
        number: 2,
        tags: [
            {
                label: "Email Marketing",
                href: "",
            },
            {
                label: "Performance Marketing",
                href: "",
            },
        ],
        title: "D2C Fashion & Apparel E-Commerce and D2C",
        image:
        "https://api.obsidiansix.com/uploads/1789890321407-932476337.jpg",
        video:"",
        description:
        "Scaled a D2C fashion brand from $14.5K to $45.4K in monthly revenue through conversion optimization...",
        href: "/case-studies/d2c-fashion-brand-ecommerce/",
    },
    {
        id: 3,
        number: 3,
        tags: [
            {
                label: "Instagram",
                href: "",
            },
            {
                label: "Meta Ads",
                href: "",
            },
            {
                label: "Google Ads",
                href: "",
            },
        ],
        title: "Luxury Real Estate, Innovation",
        image:
        "https://api.obsidiansix.com/uploads/1789889880860-41137042.jpg",
        video:"",
        description:
        "Built a premium digital marketing ecosystem generating qualified UHNI leads for Dubai luxury properties through Instagram, Google Ads, Meta Ads ",
        href: "/case-studies/dubai-luxury-real-estate/",
    },
    {
        id: 4,
        number: 4,
        tags: [
            {
                label: "LinkedIn Marketing",
                href: "",
            },
            {
                label: "B2B",
                href: "",
            },
            {
                label: "Organic",
                href: "",
            },
        ],
        title: "FMCG B2B Linkedin Marketing",
        image:
        "https://api.obsidiansix.com/uploads/1789890791451-932299505.jpg",
        video:"",
        description:
        "Transformed a 40-year-old European FMCG brand from digital invisibility to a high-converting B2B pipeline....",
        href: "/case-studies/linkedin-as-a-sales-channel/",
    },
];

export const TAB_CONFIG = {
    services: {
        label: "Services",
        count: SERVICES.length,
        items: SERVICES,
    },

    industries: {
        label: "Industries",
        count: INDUSTRIES.length,
        items: INDUSTRIES,
    },
} satisfies Record<
    TabType,
    {
        label: string;
        count: number;
        items: ServiceItem[];
    }
>;