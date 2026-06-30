"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus, CheckCircle2, Loader2, Linkedin } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { handleContactUsFormSubmission } from "@/lib/services/contact.api";
import caseStudiesData from "@/lib/store/case-studies";

// 9 Core Services definitions (No learn more links)
const technologyServices = [
  {
    title: "Agile DevOps Systems",
    desc: "We automate software compilation pipelines and design cloud runtime configurations to maximize overall system reliability and deployment frequency."
  },
  {
    title: "Business Data Intelligence",
    desc: "Empowering management groups with drag-and-drop dashboard portals and secure big-data processing pipelines."
  },
  {
    title: "AI Integration & ML Models",
    desc: "Building specialized neural network components, custom classifiers, and predictive scripts that automate manual cognitive work."
  },
  {
    title: "Premium Web Architectures",
    desc: "Developing fast, SEO-optimized web systems and headless CMS setups using React, Next.js, and secure databases."
  },
  {
    title: "Native Mobile Engineering",
    desc: "Crafting fluid, high-performance applications for iOS and Android using Swift, Kotlin, and cross-platform tools."
  },
  {
    title: "Headless E-commerce Solutions",
    desc: "Connecting digital storefront databases to customized cart pipelines and payment APIs for frictionless retail checkouts."
  },
  {
    title: "Rigorous QA & Test Automation",
    desc: "Executing automated unit, visual regression, and end-to-end user path tests to maintain software stability."
  },
  {
    title: "Scalable Cloud Architecture",
    desc: "Architecting serverless functions, database replication setups, and load balancers on AWS, GCP, and Azure."
  },
  {
    title: "Vulnerability & Cyber Security",
    desc: "Configuring API gateways, scanning Docker images, and managing security groups to defend assets against intrusions."
  }
];

// Tech stack categories vertical sidebar items
const sidebarCategories = [
  "Backend",
  "Frontend",
  "Mobile",
  "Cloud",
  "Data Storage",
  "Machine Learning",
  "DevOps",
  "Test Automation Tools",
  "Platforms"
];

// Complete 54 items mapped to categories
// Complete 54 items mapped to categories
const techStackItems: Record<string, string[]> = {
  Backend: ["PHP", "Laravel", "CodeIgniter", "CakePHP", "Lumen", "Phalcon", "Moodle", "Yii"],
  Frontend: ["HTML", "CSS", "SASS", "Bootstrap", "Javascript", "VueJS", "Nuxt.js", "React", "Tailwind", "Next.Js"],
  Mobile: ["Android", "iOS", "Flutter", "React Native"],
  Cloud: ["AWS", "GCP", "Azure"],
  "Data Storage": ["SQL", "MySQL", "MongoDB", "PostgreSQL"],
  "Machine Learning": ["Python", "Javascript", "PyTorch", "TensorFlow"],
  DevOps: [
    "Docker", "Kubernetes", "OpenShift", "Ansible", "Chef", 
    "Gitlab CI/CD", "Jenkins", "Azure DevOps", "GCP DevOps", "Argo CD", 
    "ELK Stack", "Grafana", "Nagios", "New Relic", "Zabbix", 
    "Terraform", "AWS DevOps", "Prometheus"
  ],
  "Test Automation Tools": ["Postman", "Selenium", "Katalon"],
  Platforms: ["Salesforce", "Shopify", "Adobe Commerce", "WordPress", "Strapi", "BigCommerce", "SAP", "WooCommerce"]
};

// Devicon CDN mapping to render original and authentic logos dynamically
const deviconMap: Record<string, string> = {
  php: "php/php-original.svg",
  laravel: "laravel/laravel-original.svg",
  codeigniter: "codeigniter/codeigniter-plain.svg",
  cakephp: "cakephp/cakephp-original.svg",
  phalcon: "phalcon/phalcon-original.svg",
  yii: "yii/yii-original.svg",
  html: "html5/html5-original.svg",
  css: "css3/css3-original.svg",
  sass: "sass/sass-original.svg",
  bootstrap: "bootstrap/bootstrap-original.svg",
  javascript: "javascript/javascript-original.svg",
  vuejs: "vuejs/vuejs-original.svg",
  "nuxt.js": "nuxtjs/nuxtjs-original.svg",
  react: "react/react-original.svg",
  tailwind: "tailwindcss/tailwindcss-original.svg",
  "next.js": "nextjs/nextjs-original.svg",
  android: "android/android-original.svg",
  ios: "apple/apple-original.svg",
  flutter: "flutter/flutter-original.svg",
  "react native": "react/react-original.svg",
  aws: "amazonwebservices/amazonwebservices-original.svg",
  gcp: "googlecloud/googlecloud-original.svg",
  azure: "azure/azure-original.svg",
  mysql: "mysql/mysql-original.svg",
  mongodb: "mongodb/mongodb-original.svg",
  postgresql: "postgresql/postgresql-original.svg",
  python: "python/python-original.svg",
  pytorch: "pytorch/pytorch-original.svg",
  tensorflow: "tensorflow/tensorflow-original.svg",
  docker: "docker/docker-original.svg",
  kubernetes: "kubernetes/kubernetes-original.svg",
  openshift: "openshift/openshift-original.svg",
  ansible: "ansible/ansible-original.svg",
  chef: "chef/chef-original.svg",
  "gitlab ci/cd": "gitlab/gitlab-original.svg",
  jenkins: "jenkins/jenkins-original.svg",
  "azure devops": "azure/azure-original.svg",
  "gcp devops": "googlecloud/googlecloud-original.svg",
  "argo cd": "argocd/argocd-original.svg",
  "elk stack": "elasticsearch/elasticsearch-original.svg",
  grafana: "grafana/grafana-original.svg",
  terraform: "terraform/terraform-original.svg",
  prometheus: "prometheus/prometheus-original.svg",
  postman: "postman/postman-original.svg",
  selenium: "selenium/selenium-original.svg",
  shopify: "shopify/shopify-original.svg",
  wordpress: "wordpress/wordpress-plain.svg",
  woocommerce: "woocommerce/woocommerce-original.svg",
  salesforce: "salesforce/salesforce-original.svg",
  strapi: "strapi/strapi-original.svg",
  "adobe commerce": "magento/magento-original.svg"
};

// SVG Logo Component for all 54 technologies
function TechLogo({ name }: { name: string }) {
  const [hasError, setHasError] = useState(false);
  const norm = name.toLowerCase().trim();

  // Custom Simple Icons slugs for brands that are missing or better represented there
  const simpleIconsMap: Record<string, string> = {
    lumen: "lumen",
    moodle: "moodle",
    nagios: "nagios",
    "new relic": "newrelic",
    zabbix: "zabbix",
    chef: "chef",
    "azure devops": "azuredevops",
    "gcp devops": "googlecloud",
    "aws devops": "amazonwebservices",
    "argo": "argocd",
    "argo cd": "argocd",
    "elk": "elasticstack",
    "elk stack": "elasticstack",
    katalon: "katalonstudio",
    sap: "sap",
    bigcommerce: "bigcommerce",
    ios: "apple", // Apple logo is premium representation for iOS
    aws: "amazonwebservices"
  };

  // Special custom premium vector for SQL
  if (norm === "sql") {
    return (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="sqlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052CC" />
            <stop offset="100%" stopColor="#0088FF" />
          </linearGradient>
        </defs>
        <path d="M32 4C14.33 4 0 9.37 0 16v32c0 6.63 14.33 12 32 12s32-5.37 32-12V16C64 9.37 49.67 4 32 4zm0 6c13.25 0 24 3.58 24 8s-10.75 8-24 8-24-3.58-24-8 10.75-8 24-8zm24 14v8c0 4.42-10.75 8-24 8s-24-3.58-24-8v-8c3.27 2.94 12.3 5 24 5s20.73-2.06 24-5zm0 16v8c0 4.42-10.75 8-24 8S8 52.42 8 48v-8c3.27 2.94 12.3 5 24 5s20.73-2.06 24-5z" fill="url(#sqlGrad)" />
      </svg>
    );
  }

  // Determine logo URL source (Simple Icons has priority for specific brands)
  let logoUrl = "";
  if (simpleIconsMap[norm]) {
    logoUrl = `https://cdn.simpleicons.org/${simpleIconsMap[norm]}`;
  } else if (deviconMap[norm]) {
    logoUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconMap[norm]}`;
  }

  if (logoUrl && !hasError) {
    return (
      <div className="relative w-12 h-12 flex items-center justify-center select-none pointer-events-none">
        <img
          src={logoUrl}
          alt={name}
          className="w-12 h-12 object-contain"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Graceful visual fallback badge
  return (
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold font-poppins text-xs select-none shadow-sm">
      {name.substring(0, 3).toUpperCase()}
    </div>
  );
}

// 5 Custom high-fidelity SVGs for the Operations Section (Image 1 Shield style layout)
function SecurityShieldSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 md:w-52 md:h-52 shrink-0">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="100%" stopColor="#ADCCFF" />
        </linearGradient>
      </defs>
      {/* Outer orbits */}
      <ellipse cx="100" cy="100" rx="80" ry="35" fill="none" stroke="#4285F4" strokeWidth="1" transform="rotate(-30, 100, 100)" />
      <ellipse cx="100" cy="100" rx="80" ry="35" fill="none" stroke="#4285F4" strokeWidth="1" transform="rotate(45, 100, 100)" />
      <circle cx="50" cy="70" r="4" fill="#004cf6" />
      <circle cx="150" cy="130" r="4" fill="#004cf6" />
      {/* Main Shield */}
      <path d="M100 30c30 0 60 10 60 10v60c0 40-30 70-60 80c-30-10-60-40-60-80V40s30-10 60-10z" fill="url(#shieldGrad)" />
      <path d="M100 30v150c26-10 50-38 50-70V40s-20-8-50-10z" fill="#FFF" opacity="0.25" />
    </svg>
  );
}

function AutomationSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 md:w-52 md:h-52 shrink-0">
      <defs>
        <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C58E" />
          <stop offset="100%" stopColor="#80E8C4" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="100" rx="85" ry="40" fill="none" stroke="#00C58E" strokeWidth="1.5" transform="rotate(30, 100, 100)" />
      <circle cx="128" cy="78" r="4" fill="#00C58E" />
      <path d="M100 50c-27.6 0-50 22.4-50 50s22.4 50 50 50s50-22.4 50-50s-22.4-50-50-50zm0 15c19.3 0 35 15.7 35 35s-15.7 35-35 35s-35-15.7-35-35s15.7-35 35-35z" fill="url(#autoGrad)" />
      <rect x="94" y="38" width="12" height="18" fill="url(#autoGrad)" rx="2" />
      <rect x="94" y="144" width="12" height="18" fill="url(#autoGrad)" rx="2" />
      <rect x="38" y="94" width="18" height="12" fill="url(#autoGrad)" rx="2" transform="rotate(45, 47, 100)" />
      <rect x="144" y="94" width="18" height="12" fill="url(#autoGrad)" rx="2" transform="rotate(45, 153, 100)" />
    </svg>
  );
}

function DecisionSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 md:w-52 md:h-52 shrink-0">
      <defs>
        <linearGradient id="decisionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>
      <path d="M100 40l-50 60h100z" fill="none" stroke="#7C3AED" strokeWidth="1.5" />
      <line x1="100" y1="40" x2="100" y2="150" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="100" cy="40" r="18" fill="url(#decisionGrad)" />
      <circle cx="50" cy="100" r="18" fill="url(#decisionGrad)" />
      <circle cx="150" cy="100" r="18" fill="url(#decisionGrad)" />
      <circle cx="100" cy="160" r="18" fill="url(#decisionGrad)" />
      <circle cx="100" cy="40" r="8" fill="white" />
      <circle cx="50" cy="100" r="8" fill="white" />
      <circle cx="150" cy="100" r="8" fill="white" />
      <circle cx="100" cy="160" r="8" fill="white" />
    </svg>
  );
}

function CodeQualitySVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 md:w-52 md:h-52 shrink-0">
      <defs>
        <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD7B28" />
          <stop offset="100%" stopColor="#FFC094" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="100" rx="85" ry="40" fill="none" stroke="#FD7B28" strokeWidth="1.5" transform="rotate(-15, 100, 100)" />
      <path d="M60 70l-30 30l30 30M140 70l30 30l-30 30" fill="none" stroke="url(#codeGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="115" y1="50" x2="85" y2="150" stroke="url(#codeGrad)" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}

function CostSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 md:w-52 md:h-52 shrink-0">
      <defs>
        <linearGradient id="costGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E91E63" />
          <stop offset="100%" stopColor="#F48FB1" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#E91E63" strokeWidth="1.5" />
      <path d="M50 140l30-40l30 20l50-60" fill="none" stroke="url(#costGrad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="160" cy="60" r="12" fill="url(#costGrad)" />
      <circle cx="50" cy="140" r="6" fill="#E91E63" />
    </svg>
  );
}

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-500 shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const renderLogo = (cs: any) => {
  return (
    <div className="flex items-center gap-1 font-bold text-lg select-none w-fit font-poppins text-slate-900 tracking-tight h-10">
      <span className="text-[#FD7B28] font-extrabold">{cs.name.split(" ")[0]}</span>
      {cs.name.split(" ").slice(1).join(" ") && (
        <span className="font-medium text-slate-800">{cs.name.split(" ").slice(1).join(" ")}</span>
      )}
    </div>
  );
};

export default function TechnologyPage() {
  const [activeCategory, setActiveCategory] = useState("Backend");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Scroller variables
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef<boolean>(false);

  const scrollSlider = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = 600;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Intro Transition Animation states (Embedded in Hero Section)
  const [introState, setIntroState] = useState<"build" | "tech">("build");

  // Scroll block ref to prevent observer changes during click scrolling
  const isScrollingRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Animation timers playing inside the Hero
    const timer = setTimeout(() => {
      setIntroState("tech");
    }, 2000);

    // Fetch case studies
    const fetchStudies = async () => {
      let apiStudies: any[] = [];
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiBase}/api/case-studies`);
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.data)) {
          apiStudies = data.data.map((cs: any) => {
            if (cs.image && !cs.image.startsWith("http") && !cs.image.startsWith("/Travel") && !cs.image.startsWith("/SweetProtection") && !cs.image.startsWith("/heavyMachinery")) {
              const prefix = cs.image.startsWith("/") ? "" : "/";
              return { ...cs, image: `${apiBase}${prefix}${cs.image}` };
            }
            return cs;
          });
        }
      } catch (err) {
        console.error("Failed to fetch dynamic case studies:", err);
      }

      const combined = [...apiStudies];
      const apiSlugs = new Set(apiStudies.map(cs => cs.slug));
      
      for (const cs of caseStudiesData) {
        if (!apiSlugs.has(cs.slug)) {
          combined.push(cs);
        }
      }

      const filtered = combined.filter(cs => {
        if (!cs.image) return false;
        const img = cs.image.toLowerCase();
        const name = cs.name.toLowerCase();
        const slug = cs.slug.toLowerCase();
        
        if (name.includes("pachmarhi") || slug.includes("pachmarhi")) return false;
        if (img.includes("placeholder") || img.includes("default")) return false;
        
        const hasValidExtension = img.endsWith(".jpg") || img.endsWith(".jpeg") || img.endsWith(".png") || img.endsWith(".webp") || img.startsWith("http");
        if (!hasValidExtension) return false;
        
        return true;
      });

      setCaseStudies(filtered);
    };

    fetchStudies();

    // Scroll Linked observer setup
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;
      
      const intersectingEntries = entries.filter((e) => e.isIntersecting);
      if (intersectingEntries.length === 0) return;
      
      // Proximity-based calculation (find entry closest to 25% of viewport height)
      const targetY = typeof window !== "undefined" ? window.innerHeight * 0.25 : 200;
      let bestEntry = intersectingEntries[0]!;
      let minDistance = Math.abs(bestEntry.boundingClientRect.top - targetY);
      
      intersectingEntries.forEach((entry) => {
        const distance = Math.abs(entry.boundingClientRect.top - targetY);
        if (distance < minDistance) {
          minDistance = distance;
          bestEntry = entry;
        }
      });
      
      const id = bestEntry.target.id;
      const matchingCategory = sidebarCategories.find(
        (cat) => cat.toLowerCase().replace(/[^a-z0-9]+/g, "") === id.toLowerCase().replace(/[^a-z0-9]+/g, "")
      );
      if (matchingCategory) {
        setActiveCategory(matchingCategory);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sidebarCategories.forEach((cat) => {
      const el = document.getElementById(cat.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
      if (el) observer.observe(el);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (cat: string) => {
    isScrollingRef.current = true;
    setActiveCategory(cat);
    const el = document.getElementById(cat.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    
    // Safety fallback
    const safetyTimeout = setTimeout(() => {
      isScrollingRef.current = false;
      window.removeEventListener("scroll", handleScroll);
    }, 1500);

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        clearTimeout(safetyTimeout);
        isScrollingRef.current = false;
        window.removeEventListener("scroll", handleScroll);
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      selectedServices: ["Bespoke Technology Page inquiry", "Project Details: " + message],
      companyName: "",
      companyWebsite: ""
    };

    try {
      await handleContactUsFormSubmission(contactData);
      setIsSubmitted(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom FAQs
  const faqs = [
    {
      question: "How does your team determine the optimal technology stack for a new platform?",
      answer: "We run a systematic assessment of your expected traffic, security compliance requirements, and future database scale. We then recommend a balanced stack—such as Next.js/React for visual layers, Node/Golang for backend services, and AWS/Docker for hosting—avoiding unnecessary complexity."
    },
    {
      question: "What DevOps practices do you apply to streamline deployment pipelines?",
      answer: "We enforce Infrastructure as Code (using Terraform) alongside automated CI/CD pipelines. This ensures every pull request is linted, built, and tested automatically, supporting zero-downtime rolling updates and instant rollback safety nets."
    },
    {
      question: "How do you maintain software security and testing coverage?",
      answer: "We embed automated vulnerability scanners and visual regression test suites into the code repository. Every feature requires peer review from our senior system architects before it can be merged into production branches."
    },
    {
      question: "Do you support modernizing older legacy applications?",
      answer: "Yes, we design phased migration roadmaps that convert legacy codebases into secure, API-driven systems. We migrate databases without downtime and re-host services in containers to ensure high stability."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-inter selection:bg-[#004cf6]/20">
      
      {/* 1. HERO SECTION WITH EMBEDDED INTRO ANIMATION */}
      <section className="bg-[#030712] text-white py-32 md:py-48 px-6 overflow-hidden relative flex items-center min-h-[75vh]">
        {/* Floating gradient orb in the background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] animate-[spin_25s_linear_infinite]">
            <defs>
              <radialGradient id="heroOrbGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.75" />
                <stop offset="45%" stopColor="#004cf6" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#7c3aed" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="heroSwirlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#fd7b28" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="85" fill="url(#heroOrbGrad)" />
            <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="url(#heroSwirlGrad)" strokeWidth="1.5" transform="rotate(30, 100, 100)" opacity="0.8" />
            <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="url(#heroSwirlGrad)" strokeWidth="1.5" transform="rotate(115, 100, 100)" opacity="0.6" />
            <ellipse cx="100" cy="100" rx="85" ry="35" fill="none" stroke="url(#heroSwirlGrad)" strokeWidth="1" transform="rotate(145, 100, 100)" opacity="0.5" />
          </svg>
        </div>

        {/* Text transition container */}
        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          <AnimatePresence mode="wait">
            {introState === "build" ? (
              <motion.h1
                key="build"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -35 }}
                transition={{ duration: 0.7 }}
                className="text-6xl md:text-[100px] lg:text-[120px] font-extralight tracking-[0.12em] uppercase text-white font-poppins"
              >
                Scale With
              </motion.h1>
            ) : (
              <motion.h1
                key="technology"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-[100px] lg:text-[120px] font-extralight tracking-wider text-slate-100 font-poppins"
              >
                Engineering
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
            <span className="text-[#004cf6] text-xs font-semibold uppercase tracking-[0.3em] font-poppins block">
              [ Enterprise Architecture ]
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 leading-tight font-poppins">
              Solidifying System Foundation and Software Delivery Pipelines
            </h2>
          </div>

          <div className="flex flex-col gap-12 max-w-5xl mx-auto">
            {/* Box 1: Decision Making */}
            <div className="rounded-3xl border border-slate-100 p-8 md:p-12 bg-white hover:border-blue-100 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <DecisionSVG />
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 font-poppins">
                  System Decision Engines
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-inter font-normal">
                  Custom telemetry setups convert logs into business insight. We build real-time monitoring structures that process application metrics, enabling quick debugging and informed engineering decisions.
                </p>
              </div>
            </div>

            {/* Box 2: Automation */}
            <div className="rounded-3xl border border-slate-100 p-8 md:p-12 bg-white hover:border-blue-100 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <AutomationSVG />
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 font-poppins">
                  Process Orchestration
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-inter font-normal">
                  By automating infrastructure setup and testing steps, we eliminate manual mistakes and accelerate code shipping. We script complex build workflows so your engineers can focus on product features.
                </p>
              </div>
            </div>

            {/* Box 3: Top Technologies */}
            <div className="rounded-3xl border border-slate-100 p-8 md:p-12 bg-white hover:border-blue-100 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <SecurityShieldSVG />
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 font-poppins">
                  New-Age Tech Integration
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-inter font-normal">
                  Utilizing modern frameworks and secure libraries prevents technical debt. We help you choose scalable systems, container architectures, and resilient backends that support millions of API queries.
                </p>
              </div>
            </div>

            {/* Box 4: Code Quality */}
            <div className="rounded-3xl border border-slate-100 p-8 md:p-12 bg-white hover:border-blue-100 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <CodeQualitySVG />
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 font-poppins">
                  Rigorous Code Quality
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-inter font-normal">
                  Clean, modular code design keeps maintenance costs low and supports rapid updates. Our engineering leads enforce linting standards, visual checks, and strict testing practices to keep systems secure.
                </p>
              </div>
            </div>

            {/* Box 5: Cost Efficiency */}
            <div className="rounded-3xl border border-slate-100 p-8 md:p-12 bg-white hover:border-blue-100 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <CostSVG />
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 font-poppins">
                  Cloud Cost Optimization
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-inter font-normal">
                  Running cloud setups without optimization wastes valuable resources. We audit database usage, scale servers automatically based on load, and select serverless options to decrease monthly hosting bills.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CORE SERVICES GRID (No learn more link, responsive) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-950 font-poppins">
              Our Core Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologyServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
              >
                {/* Visual Glass Header banner */}
                <div className="h-28 bg-gradient-to-r from-blue-100 via-indigo-50 to-orange-50 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,76,246,0.05)_0%,rgba(0,0,0,0)_60%)]" />
                  <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm border border-slate-100 flex items-center justify-center font-bold text-xs text-[#004cf6] font-poppins">
                    0{idx + 1}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 font-poppins">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-inter font-normal">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SCROLL-LINKED STACK SELECTOR (Image 2 layout: stacked categories, sticky selector) */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 font-poppins">
              Explore Our Technologies
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
            
            {/* Sticky Left Sidebar Navigation */}
            <div className="lg:col-span-3 lg:sticky lg:top-32 flex flex-col gap-2 bg-slate-50 p-4 border border-slate-100 rounded-2xl w-full">
              {sidebarCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    suppressHydrationWarning={true}
                    onClick={() => scrollToSection(cat)}
                    className="w-full text-left px-5 py-4 rounded-xl text-sm font-semibold font-poppins tracking-wide transition-all"
                    style={{
                      backgroundColor: isActive ? "#004cf6" : "transparent",
                      color: isActive ? "#ffffff" : "#64748b",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Stacked Technology Grid Categories */}
            <div className="lg:col-span-9 space-y-16">
              {sidebarCategories.map((cat) => {
                const sectionId = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <div
                    key={cat}
                    id={sectionId}
                    className="scroll-mt-36 border-b border-slate-100 last:border-0 pb-16 last:pb-0"
                  >
                    <h3 className="text-3xl font-semibold text-slate-950 font-poppins mb-8">
                      {cat}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {techStackItems[cat]?.map((tech) => (
                        <div
                          key={tech}
                          className="bg-white border border-slate-100 hover:border-blue-100 hover:shadow-md p-6 rounded-xl flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 min-h-[160px]"
                        >
                          <TechLogo name={tech} />
                          <span className="text-sm font-semibold text-slate-700 font-poppins tracking-tight">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 5. CASE STUDIES SECTION (Dynamic) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 font-poppins">
                Our Technology Case Studies
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                suppressHydrationWarning={true}
                onClick={() => scrollSlider("left")}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#004cf6] hover:text-[#004cf6] transition-colors shadow-sm"
                aria-label="Previous case study"
              >
                <ArrowLeftIcon />
              </button>
              <button
                suppressHydrationWarning={true}
                onClick={() => scrollSlider("right")}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#004cf6] hover:text-[#004cf6] transition-colors shadow-sm"
                aria-label="Next case study"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>

        </div>

        {caseStudies.length > 0 && (
          <div className="relative w-full py-4">
            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scrollbar-none snap-none px-6 md:px-12 pb-6"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={() => { isPaused.current = true; }}
              onMouseLeave={() => { isPaused.current = false; }}
              onTouchStart={() => { isPaused.current = true; }}
              onTouchEnd={() => { isPaused.current = false; }}
            >
              {[...caseStudies, ...caseStudies].map((cs, idx) => (
                <div 
                  key={idx} 
                  className="w-[320px] md:w-[600px] lg:w-[650px] shrink-0 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[340px] hover:border-blue-100 transition-colors"
                >
                  {/* Left column (Text content) */}
                  <div className="flex-[1.2] p-6 md:p-8 flex flex-col justify-between bg-white">
                    <div className="space-y-4">
                      {renderLogo(cs)}
                      
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900 font-poppins leading-snug">
                        {cs.details}
                      </h3>
                      
                      <ul className="space-y-2">
                        {cs.tags.slice(0, 3).map((tag: string, tagIdx: number) => (
                          <li key={tagIdx} className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-slate-600 font-inter">
                            <CheckIcon />
                            <span>{tag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-6">
                      <Link
                        href={`/case-studies/${cs.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-slate-900 text-slate-900 hover:border-[#004cf6] hover:text-[#004cf6] hover:bg-blue-50/5 transition-all text-xs font-bold uppercase tracking-wider font-poppins rounded-none"
                      >
                        Read Case Study <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Right column (Image content) */}
                  <div className="flex-1 relative min-h-[220px] md:min-h-auto bg-slate-50 border-l border-slate-5">
                    <Image
                      src={cs.image}
                      alt={cs.name}
                      fill
                      className="object-contain p-4"
                      unoptimized={cs.image.startsWith("/")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 6. FAQ SECTION (Technology tailored) */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-light tracking-tight text-slate-955 mb-12 font-poppins">
            FAQ
          </h2>
          <div className="flex flex-col border-t border-slate-200 w-full mb-10 font-poppins">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-slate-200 py-6">
                  <button
                    suppressHydrationWarning={true}
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex justify-between items-center text-left w-full group"
                  >
                    <span className={`text-base md:text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-[#004cf6]' : 'text-slate-900 group-hover:text-[#004cf6]'}`}>
                      {faq.question}
                    </span>
                    {isOpen ? <Minus size={18} className="text-[#004cf6]" /> : <Plus size={18} className="text-slate-400 group-hover:text-[#004cf6]" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-slate-600 text-sm font-normal font-inter mt-4 leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <button
              suppressHydrationWarning={true}
              onClick={() => alert("Check back later for more FAQs!")}
              className="px-6 py-2.5 border border-[#004cf6] text-[#004cf6] hover:bg-blue-50/40 text-xs font-bold uppercase tracking-wider transition-colors font-poppins"
            >
              Show more
            </button>
          </div>
        </div>
      </section>

      {/* 7. BESPOKE CONTACT FORM SECTION (DevOps & Technology tailored) */}
      <section id="contact-form-section" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 leading-tight font-poppins">
                Scale Your Code and Systems with Our DevOps &amp; Tech Services
              </h2>
              <p className="text-slate-500 font-normal text-sm md:text-base leading-relaxed font-inter">
                Every line of code and cloud component should run seamlessly. Let Obsidian Six construct modular, high-performing systems that secure your infrastructure.
              </p>

              {/* Representative Card */}
              <div className="pt-6">
                <div className="inline-flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl w-full max-w-sm">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-200">
                    <Image
                      src="/founder.jpeg"
                      alt="Aadarsh K"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 tracking-tight font-poppins">
                      Aadarsh K
                    </h4>
                    <p className="text-xs font-normal text-slate-400 mt-0.5 font-inter">
                      Founder &amp; Growth Strategist
                    </p>
                    <a
                      href="https://www.linkedin.com/in/aadarsh-k-3b44a1170/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#004cf6] mt-2 transition-colors"
                    >
                      <Linkedin size={14} />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-100 p-6 md:p-10 shadow-sm rounded-none">
                {isSubmitted ? (
                  <div className="py-16 text-center animate-in fade-in zoom-in duration-500">
                    <CheckCircle2 className="w-16 h-16 text-[#004cf6] mx-auto mb-6" />
                    <h2 className="text-3xl font-light mb-2 font-poppins">Message Sent!</h2>
                    <p className="text-slate-500 text-base mb-6 font-inter font-normal">
                      Our system engineering team will review your details and reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#004cf6] font-semibold uppercase tracking-widest text-xs hover:underline font-poppins"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <label className="text-[13px] md:text-sm font-medium text-slate-900 block mb-2 font-poppins" htmlFor="first-name">
                          First Name*
                        </label>
                        <input
                          suppressHydrationWarning={true}
                          required
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white font-normal"
                          id="first-name"
                          placeholder="Enter first name"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[13px] md:text-sm font-medium text-slate-900 block mb-2 font-poppins" htmlFor="last-name">
                          Last Name
                        </label>
                        <input
                          suppressHydrationWarning={true}
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white font-normal"
                          id="last-name"
                          placeholder="Enter last name"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Email & Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <label className="text-[13px] md:text-sm font-medium text-slate-900 block mb-2 font-poppins" htmlFor="email">
                          Email*
                        </label>
                        <input
                          suppressHydrationWarning={true}
                          required
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white font-normal"
                          id="email"
                          placeholder="Enter email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[13px] md:text-sm font-medium text-slate-900 block mb-2 font-poppins" htmlFor="phone-number">
                          Phone Number*
                        </label>
                        {isMounted ? (
                          <PhoneInput
                            country={"in"}
                            value={phone}
                            onChange={(value: string) => setPhone(value)}
                            enableSearch={true}
                            searchPlaceholder="Search country..."
                            inputClass="!w-full !border !border-[#C3C3C3] !pl-[52px] !pr-4 !py-3 !text-sm md:!text-base !outline-none !rounded-none focus:!border-[#004cf6] !font-inter !h-14 bg-white font-normal"
                            containerClass="!w-full !rounded-none"
                            buttonClass="!rounded-none !border-y-0 !border-l-0 !border-r !border-[#C3C3C3] !bg-white"
                            dropdownClass="!rounded-none"
                            searchClass="!text-xs !p-2"
                          />
                        ) : (
                          <div className="w-full h-14 border border-[#C3C3C3] bg-white animate-pulse rounded-none" />
                        )}
                      </div>
                    </div>

                    {/* Tell Us More */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[13px] md:text-sm font-medium text-slate-900 block mb-2 font-poppins" htmlFor="tell-us-more">
                          Tell Us More
                        </label>
                        <span className="text-xs text-slate-400 font-normal font-inter">
                          {message.length}/1000
                        </span>
                      </div>
                      <textarea
                        suppressHydrationWarning={true}
                        required
                        maxLength={1000}
                        className="w-full border border-[#C3C3C3] p-4 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-44 resize-none bg-white font-normal"
                        id="tell-us-more"
                        placeholder="Brief about your project"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    {/* Send Enquiry Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        suppressHydrationWarning={true}
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 bg-black text-white hover:bg-[#004cf6] transition-colors flex items-center gap-3 font-semibold text-xs uppercase tracking-widest rounded-none disabled:opacity-50 font-poppins"
                      >
                        {isSubmitting ? (
                          <>
                            Processing... <Loader2 className="animate-spin h-3.5 w-3.5" />
                          </>
                        ) : (
                          <>
                            Send Enquiry <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
