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
    title: "DevOps Consulting",
    desc: "Streamline software development processes and enhance the overall reliability of software delivery."
  },
  {
    title: "Data & Analytics",
    desc: "Empowering businesses with data-driven insights through our comprehensive analytics services."
  },
  {
    title: "AI & Machine Learning",
    desc: "Driving innovation with AI and machine learning for actionable insights and transformative outcomes."
  },
  {
    title: "Web Development",
    desc: "Creating solid digital presence and building highly interactive, scalable web applications."
  },
  {
    title: "Mobile App Development",
    desc: "Crafting high-performance native and cross-platform mobile apps for iOS and Android."
  },
  {
    title: "E-commerce",
    desc: "Bridge the gap between your storefront and high-intent digital buyers."
  },
  {
    title: "QA & Testing",
    desc: "Guaranteeing software reliability and peak performance through comprehensive quality assurance."
  },
  {
    title: "Cloud Services",
    desc: "Designing, deploying, and managing scalable cloud architectures on secure platforms."
  },
  {
    title: "Cyber Security",
    desc: "Protecting digital infrastructure, data, and communications from advanced threat landscapes."
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
const techStackItems: Record<string, string[]> = {
  Backend: ["PHP", "Laravel", "CodeIgniter", "CakePHP", "Lumen", "Phalcon", "Moodle", "Yii"],
  Frontend: ["HTML", "CSS", "SASS", "Bootstrap", "Javascript", "VueJS", "Nuxt.js", "React", "Tailwind", "Next.Js"],
  Mobile: ["Android", "iOS", "Flutter", "React Native"],
  Cloud: ["AWS", "GCP", "Azure"],
  "Data Storage": ["MySQL", "MongoDB", "PostgreSQL"],
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

// SVG Logo Component for all 54 technologies
function TechLogo({ name }: { name: string }) {
  const norm = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  
  // Custom styled SVG renders to ensure zero asset overhead and beautiful loading times
  switch (norm) {
    case "react":
    case "reactnative":
      return (
        <svg viewBox="-11.5 -10.23 23 20.46" className="w-12 h-12 text-[#61dafb] fill-none stroke-current" strokeWidth="1">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
          <g stroke="#61dafb">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 180 180" className="w-12 h-12 fill-black">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path d="M149.5 157.5L69.1 54H54v72h13.5v-49.9L136.1 164.2c4.6-5.3 8.8-11.1 12.4-17.3c.4-.6.7-1.2 1-1.9zM112.5 126H126V54h-13.5z" fill="white" />
        </svg>
      );
    case "vuejs":
      return (
        <svg viewBox="0 0 256 221" className="w-12 h-12">
          <path d="M204.8 0H256L128 220.8L0 0h97.9L128 51.8L158.1 0h46.7z" fill="#41B883" />
          <path d="M204.8 0H256L128 220.8L0 0h97.9L128 51.8L158.1 0h46.7z" fill="#35495E" style={{ clipPath: "polygon(38% 0%, 62% 0%, 128% 114px, 128% 114px)" }} />
        </svg>
      );
    case "nuxtjs":
      return (
        <svg viewBox="0 0 240 180" className="w-12 h-12 fill-[#00C58E]">
          <path d="M120 180l45-77.8H75L120 180z" />
          <path d="M172.5 90L120 0l-52.5 90h105z" fill="#002E3B" opacity="0.9" />
          <circle cx="120" cy="95" r="15" fill="#FFF" />
        </svg>
      );
    case "html":
      return (
        <svg viewBox="0 0 512 512" className="w-12 h-12 fill-[#E34F26]">
          <path d="M108.4 0h295.2l-26.6 447L256 512l-121-65z" />
          <path d="M256 467.4V44.4h119.4l-21.4 360z" fill="#F06529" />
          <path d="M256 160h-58.4v48H256v48h-58.4v48H256v48l-68.8-19.2l-4.4-49.8h-48l8.8 98.4l112.4 31.2z" fill="#EAEAEA" />
          <path d="M256 160v48h58.4l-5.6 59.8L256 283.8v-48h58.4V160z" fill="#FFF" />
        </svg>
      );
    case "css":
      return (
        <svg viewBox="0 0 512 512" className="w-12 h-12 fill-[#1572B6]">
          <path d="M108.4 0h295.2l-26.6 447L256 512l-121-65z" />
          <path d="M256 467.4V44.4h119.4l-21.4 360z" fill="#33A9DC" />
          <path d="M256 160h-58.4v48H256v48h-58.4v48H256v48l-68.8-19.2l-4.4-49.8h-48l8.8 98.4l112.4 31.2z" fill="#EAEAEA" />
          <path d="M256 160v48h58.4l-5.6 59.8L256 283.8v-48h58.4V160z" fill="#FFF" />
        </svg>
      );
    case "sass":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <circle cx="128" cy="128" r="128" fill="#CF649A" />
          <path d="M128 50c-25 0-45 20-45 45s15 35 30 45c-20 0-35 15-35 35s15 35 35 35 45-20 45-45-15-35-30-45c20 0 35-15 35-35S153 50 128 50z" fill="#FFF" opacity="0.9" />
        </svg>
      );
    case "bootstrap":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#7952B3" />
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="130" fontWeight="bold" fontFamily="sans-serif">B</text>
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#F7DF1E]">
          <rect width="256" height="256" />
          <path d="M178 179c0 14-8 23-22 23-11 0-18-6-21-14l16-9c3 5 6 7 10 7 5 0 7-3 7-7v-66h18v66zM224 179c0 14-8 23-22 23-11 0-18-6-21-14l16-9c3 5 6 7 10 7 5 0 7-3 7-7v-66h18v66z" fill="#000" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-none stroke-[#06B6D4]" strokeWidth="12">
          <path d="M128 64c-35 0-56 21-63 63c21-21 42-28 63-21c14 5 24 15 35 26c18 18 39 39 77 39c35 0 56-21 63-63c-21 21-42 28-63 21c-14-5-24-15-35-26c-18-18-39-39-77-39z" />
          <path d="M64 128c-35 0-56 21-63 63c21-21 42-28 63-21c14 5 24 15 35 26c18 18 39 39 77 39c35 0 56-21 63-63c-21 21-42 28-63 21c-14-5-24-15-35-26c-18-18-39-39-77-39z" />
        </svg>
      );
    case "php":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <ellipse cx="128" cy="128" rx="120" ry="70" fill="#777BB4" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="64" fontWeight="black" style={{ fontStyle: "italic" }} fontFamily="sans-serif">PHP</text>
        </svg>
      );
    case "laravel":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#FF2D20]">
          <path d="M220 70V50c0-10-8-18-18-18H54C44 32 36 40 36 50v156c0 10 8 18 18 18h148c10 0 18-8 18-18v-20" />
          <path d="M96 96h64M96 128h64M96 160h40" stroke="white" strokeWidth="12" strokeLinecap="round" />
        </svg>
      );
    case "codeigniter":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#EE4326" />
          <path d="M128 40c0 0-40 50-40 88s20 52 40 88c20-36 40-50 40-88s-40-88-40-88z" fill="#FFF" />
        </svg>
      );
    case "cakephp":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#D33C43" />
          <circle cx="128" cy="110" r="50" fill="#FFF" />
          <rect x="78" y="140" width="100" height="40" fill="#FFF" rx="10" />
        </svg>
      );
    case "android":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#3DDC84]">
          <rect width="256" height="256" rx="50" fill="#3DDC84" />
          <path d="M80 120a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm96 0a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" fill="white" />
          <path d="M128 70c-25 0-45 20-45 45h90c0-25-20-45-45-45z" fill="white" />
        </svg>
      );
    case "ios":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-black">
          <rect width="256" height="256" rx="50" fill="#222" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="90" fontWeight="bold" fontFamily="sans-serif">iOS</text>
        </svg>
      );
    case "flutter":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#02569B]">
          <path d="M190 128l-62-62H66l62 62l-62 62h62l62-62z" />
          <path d="M128 66l62-62H128L66 66l62 62z" fill="#0175C2" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#FF9900]">
          <rect width="256" height="256" rx="50" fill="#232F3E" />
          <path d="M80 160h16v-64H80zm32 0h16v-64h-16zm32 0h16v-64h-16z" fill="#FF9900" />
          <path d="M70 175c20 12 50 17 80 17c40 0 66-10 66-10" stroke="#FF9900" strokeWidth="8" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "gcp":
    case "gcpdevops":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#4285F4" />
          <path d="M128 60l60 35v70l-60 35l-60-35v-70l60-35z" fill="#FFF" opacity="0.9" />
          <circle cx="128" cy="130" r="30" fill="#EA4335" />
        </svg>
      );
    case "azure":
    case "azuredevops":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#0078D4]">
          <path d="M128 40l80 128H48l80-128z" />
          <path d="M128 40l40 64H88l40-64z" fill="#50E4FF" />
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#00758F" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="70" fontWeight="bold" fontFamily="sans-serif">SQL</text>
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#47A248]">
          <rect width="256" height="256" rx="50" fill="#13AA52" />
          <path d="M128 50c-20 40-20 120 0 156c20-36 20-116 0-156z" fill="#FFF" />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#336791" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="90" fontWeight="black" fontFamily="sans-serif">Pg</text>
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 110 110" className="w-12 h-12">
          <path d="M55 0C24.6 0 0 24.6 0 55s24.6 55 55 55 55-24.6 55-55S85.4 0 55 0zm-1.8 17.5c2.3 0 4.1 1.8 4.1 4.1s-1.8 4.1-4.1 4.1-4.1-1.8-4.1-4.1 1.8-4.1 4.1-4.1zm12.3 75.3H44.5c-7.9 0-14.3-6.4-14.3-14.3V67.8h10.7v7.2c0 2 1.6 3.6 3.6 3.6h22.8c2 0 3.6-1.6 3.6-3.6v-7.2h10.7v10.7c0 7.9-6.4 14.3-14.3 14.3z" fill="#3776AB" />
        </svg>
      );
    case "pytorch":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#EE4C2C" />
          <circle cx="128" cy="128" r="50" fill="#FFF" />
        </svg>
      );
    case "tensorflow":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#FF6F00" />
          <path d="M128 50l50 30v60l-50 30l-50-30v-60l50-30z" fill="#FFF" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#2496ED]">
          <path d="M40 100h24v24H40zm30 0h24v24H70zm30 0h24v24h-24zm30 0h24v24h-24zm-60-30h24v24H70zm30 0h24v24h-24zm30 0h24v24h-24zm0-30h24v24h-24z" />
          <path d="M20 140c20 30 60 40 110 40c70 0 100-30 100-30" stroke="#2496ED" strokeWidth="8" fill="none" />
        </svg>
      );
    case "kubernetes":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#326CE5]">
          <polygon points="128,24 220,76 220,180 128,232 36,180 36,76" />
          <circle cx="128" cy="128" r="40" fill="white" />
        </svg>
      );
    case "openshift":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#E32822" />
          <circle cx="128" cy="128" r="60" fill="none" stroke="white" strokeWidth="12" />
        </svg>
      );
    case "ansible":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#000" />
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="130" fontWeight="bold" fontFamily="sans-serif">A</text>
        </svg>
      );
    case "chef":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#F05A28" />
          <circle cx="128" cy="128" r="50" fill="white" />
        </svg>
      );
    case "gitlabcicd":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#FC6D26]">
          <polygon points="128,32 170,120 86,120" />
          <polygon points="128,32 86,120 40,120" fill="#E24329" />
          <polygon points="128,32 170,120 216,120" fill="#E24329" />
        </svg>
      );
    case "jenkins":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#D33833" />
          <circle cx="128" cy="110" r="40" fill="white" />
          <rect x="108" y="150" width="40" height="50" fill="white" />
        </svg>
      );
    case "argocd":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#EF6C00" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="70" fontWeight="bold" fontFamily="sans-serif">Argo</text>
        </svg>
      );
    case "elkstack":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#005571" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="80" fontWeight="bold" fontFamily="sans-serif">ELK</text>
        </svg>
      );
    case "grafana":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#F47A20" />
          <path d="M60 180c40-40 80-20 120-60" stroke="white" strokeWidth="12" fill="none" />
        </svg>
      );
    case "terraform":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#623CE4]">
          <rect width="256" height="256" rx="50" fill="#5C4EE5" />
          <path d="M70 70h40v40H70zm50 0h40v40h-40zm0 50h40v40h-40zm50 0h40v40h-40z" fill="white" />
        </svg>
      );
    case "prometheus":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#E6522C]">
          <circle cx="128" cy="128" r="100" fill="none" stroke="#E6522C" strokeWidth="12" />
          <circle cx="128" cy="128" r="40" fill="#E6522C" />
        </svg>
      );
    case "postman":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#FF6C37" />
          <circle cx="128" cy="110" r="45" fill="white" />
          <path d="M128 150v50" stroke="white" strokeWidth="12" />
        </svg>
      );
    case "selenium":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#43B02A" />
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="130" fontWeight="bold" fontFamily="sans-serif">Se</text>
        </svg>
      );
    case "salesforce":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#00A1E0]">
          <path d="M128 60c-25 0-45 15-45 35c0 5 1 10 3 14c-12 5-20 16-20 30c0 18 16 32 35 32h70c18 0 32-14 32-32c0-15-11-27-25-31c2-4 3-8 3-13c0-20-20-35-45-35z" fill="#00A1E0" />
        </svg>
      );
    case "shopify":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#95BF47" />
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="130" fontWeight="bold" fontFamily="sans-serif">S</text>
        </svg>
      );
    case "wordpress":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12 fill-[#21759B]">
          <circle cx="128" cy="128" r="100" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="110" fontWeight="bold" fontFamily="sans-serif">W</text>
        </svg>
      );
    case "woocommerce":
      return (
        <svg viewBox="0 0 256 256" className="w-12 h-12">
          <rect width="256" height="256" rx="50" fill="#96588A" />
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="120" fontWeight="bold" fontFamily="sans-serif">W</text>
        </svg>
      );
    default:
      return (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 font-bold font-poppins text-xs select-none shadow-sm">
          {name.substring(0, 3).toUpperCase()}
        </div>
      );
  }
}

// Custom icons for core operations sections
const CodeIcon = () => (
  <svg className="w-16 h-16 text-[#004cf6]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const AutomationIcon = () => (
  <svg className="w-16 h-16 text-[#004cf6]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const DecisionIcon = () => (
  <svg className="w-16 h-16 text-[#004cf6]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

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

  // Intro Transition Animation states
  const [introState, setIntroState] = useState<"build" | "tech" | "done">("build");

  useEffect(() => {
    setIsMounted(true);
    
    // Animation timers
    const buildTimer = setTimeout(() => {
      setIntroState("tech");
    }, 1800);

    const techTimer = setTimeout(() => {
      setIntroState("done");
    }, 3600);

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

    return () => {
      clearTimeout(buildTimer);
      clearTimeout(techTimer);
    };
  }, []);

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
      question: "How do you choose the right tech stack for my project?",
      answer: "We analyze your business objectives, expected user load, security compliance, scalability requirements, and team skills. Rather than force-fitting a single technology, we recommend a tailored stack (e.g. Next.js for high-speed frontend, Go/Node for backends, AWS/Docker for hosting)."
    },
    {
      question: "What DevOps practices do you implement to ensure rapid deployment?",
      answer: "We utilize infrastructure as code (Terraform), automated CI/CD pipelines (GitLab CI, Jenkins), and container orchestration (Docker & Kubernetes). This enables zero-downtime rolling updates, automated rollback scripts, and continuous health monitoring."
    },
    {
      question: "How do you guarantee the security and quality of the codebase?",
      answer: "We enforce strict pull request validation, automated linting, container vulnerability scanning, and integration tests (using Jest/Cypress/Playwright). In addition, our team conducts weekly peer code reviews to ensure clean modular architecture."
    },
    {
      question: "Can you help migrate our legacy systems to modern cloud solutions?",
      answer: "Yes. We specialize in zero-downtime system migration. We break down monolithic legacy architectures into secure microservices, containerize applications, set up cloud databases, and handle dns cutovers smoothly without disrupting active business operations."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-inter selection:bg-[#004cf6]/20">
      
      {/* 1. INTRO / ANIMATION BANNER (Image 1 Mockup) */}
      <AnimatePresence mode="wait">
        {introState !== "done" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-[#030712] z-50 flex items-center justify-center overflow-hidden"
          >
            {/* Center Swirling glassmorphic orb */}
            <div className="absolute flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] animate-[spin_20s_linear_infinite]">
                <defs>
                  <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                    <stop offset="45%" stopColor="#004cf6" stopOpacity="0.4" />
                    <stop offset="75%" stopColor="#7c3aed" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#030712" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="swirlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#fd7b28" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="85" fill="url(#orbGrad)" />
                <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="url(#swirlGrad)" strokeWidth="1.5" transform="rotate(30, 100, 100)" opacity="0.8" />
                <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="url(#swirlGrad)" strokeWidth="1.5" transform="rotate(115, 100, 100)" opacity="0.6" />
                <ellipse cx="100" cy="100" rx="85" ry="35" fill="none" stroke="url(#swirlGrad)" strokeWidth="1" transform="rotate(145, 100, 100)" opacity="0.5" />
              </svg>
            </div>

            {/* Fading text container */}
            <div className="relative z-10 text-center">
              <AnimatePresence mode="wait">
                {introState === "build" ? (
                  <motion.h1
                    key="build"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl md:text-9xl font-extralight tracking-[0.1em] uppercase text-white font-poppins"
                  >
                    Build With
                  </motion.h1>
                ) : (
                  <motion.h1
                    key="technology"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    className="text-6xl md:text-9xl font-extralight tracking-wider text-slate-100 font-poppins"
                  >
                    Technology
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO / CAPABILITIES SCROLL BANNER (Image 2, 3, 4) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
            <span className="text-[#004cf6] text-xs font-bold uppercase tracking-[0.3em] font-poppins block">
              [ Technology Stack ]
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight font-poppins">
              Underpin Business-Critical Operations with the Promise of Technology
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Decision Making */}
            <div className="border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 p-8 rounded-2xl bg-white flex flex-col justify-between min-h-[340px] group">
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 group-hover:bg-blue-50/50 rounded-xl w-fit transition-colors">
                  <DecisionIcon />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-poppins">
                  Decision Making
                </h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed font-inter">
                  Data-driven insights form the foundation of business strategy. With technological excellence, we gather, analyse and interpret huge amounts of data to offer actionable intelligence for business performance enhancement.
                </p>
              </div>
            </div>

            {/* Card 2: Automation */}
            <div className="border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 p-8 rounded-2xl bg-white flex flex-col justify-between min-h-[340px] group">
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 group-hover:bg-blue-50/50 rounded-xl w-fit transition-colors">
                  <AutomationIcon />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-poppins">
                  Automation
                </h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed font-inter">
                  Automation involves using technology to execute tasks without human intervention, helping in error minimisation and improved efficiency. We use technology to automate processes to let businesses easily resolve strategic tasks.
                </p>
              </div>
            </div>

            {/* Card 3: Top Technologies */}
            <div className="border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 p-8 rounded-2xl bg-white flex flex-col justify-between min-h-[340px] group">
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 group-hover:bg-blue-50/50 rounded-xl w-fit transition-colors">
                  <CodeIcon />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-poppins">
                  Top Technologies
                </h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed font-inter">
                  Staying updated with technological trends enhances the business success. Through new-age technologies, we help you revolutionise operations, decision making, customer experiences, and develop novel revenue streams.
                </p>
              </div>
            </div>

            {/* Card 4: Code Quality */}
            <div className="border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 p-8 rounded-2xl bg-white flex flex-col justify-between min-h-[340px] group">
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 group-hover:bg-blue-50/50 rounded-xl w-fit transition-colors">
                  <CodeIcon />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-poppins">
                  Code Quality
                </h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed font-inter">
                  High code quality is an integral part of software development to ensure high efficiency, performance and security. Our experts invest in best development practices to elevate software performance and improve user experience.
                </p>
              </div>
            </div>

            {/* Card 5: Cost Efficiency */}
            <div className="border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 p-8 rounded-2xl bg-white flex flex-col justify-between min-h-[340px] group">
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 group-hover:bg-blue-50/50 rounded-xl w-fit transition-colors">
                  <DecisionIcon />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-poppins">
                  Cost Efficiency
                </h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed font-inter">
                  High code quality is an integral part of software development to ensure high efficiency, performance and security. Our experts invest in best development practices to elevate software performance and improve user experience.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CORE SERVICES GRID (Image 1 Mockup - No learn more link) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-poppins">
              Our Core Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <h3 className="text-xl font-bold text-slate-900 font-poppins">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-inter font-medium">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE TECHNOLOGY STACK EXPLORER (Image 5 Mockup) */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-poppins">
              Explore Our Technologies
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Sidebar Categories Selector */}
            <div className="lg:col-span-3 flex flex-col gap-2 bg-slate-50 p-4 border border-slate-100 rounded-2xl w-full">
              {sidebarCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    suppressHydrationWarning={true}
                    onClick={() => setActiveCategory(cat)}
                    className="w-full text-left px-5 py-4 rounded-xl text-sm font-bold font-poppins tracking-wide transition-all"
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

            {/* Right Tech Cards Grid */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                  {techStackItems[activeCategory]?.map((tech) => (
                    <div
                      key={tech}
                      className="bg-white border border-slate-100 hover:border-blue-100 hover:shadow-md p-6 rounded-xl flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 min-h-[160px]"
                    >
                      <TechLogo name={tech} />
                      <span className="text-sm font-bold text-slate-800 font-poppins tracking-tight">
                        {tech}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CASE STUDIES SECTION (Dynamic) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-poppins">
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
                      
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 font-poppins leading-snug">
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
          <h2 className="text-4xl font-bold tracking-tight text-slate-955 mb-12 font-poppins">
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
                    <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-[#004cf6]' : 'text-slate-900 group-hover:text-[#004cf6]'}`}>
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
                        <p className="text-slate-600 text-sm font-medium font-inter mt-4 leading-relaxed max-w-3xl font-inter">
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
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-955 leading-tight font-poppins">
                Scale Your Code and Systems with Our DevOps &amp; Tech Services
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed font-inter">
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
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight font-poppins">
                      Aadarsh K
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5 font-inter">
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
                    <h2 className="text-3xl font-bold mb-2 font-poppins">Message Sent!</h2>
                    <p className="text-slate-500 text-base mb-6 font-inter">
                      Our system engineering team will review your details and reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#004cf6] font-bold uppercase tracking-widest text-xs hover:underline font-poppins"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2 font-poppins" htmlFor="first-name">
                          First Name*
                        </label>
                        <input
                          suppressHydrationWarning={true}
                          required
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white"
                          id="first-name"
                          placeholder="Enter first name"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2 font-poppins" htmlFor="last-name">
                          Last Name
                        </label>
                        <input
                          suppressHydrationWarning={true}
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white"
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
                        <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2 font-poppins" htmlFor="email">
                          Email*
                        </label>
                        <input
                          suppressHydrationWarning={true}
                          required
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white"
                          id="email"
                          placeholder="Enter email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[13px] md:text-sm font-semibold text-slate-900 block mb-2 font-poppins" htmlFor="phone-number">
                          Phone Number*
                        </label>
                        {isMounted ? (
                          <PhoneInput
                            country={"in"}
                            value={phone}
                            onChange={(value: string) => setPhone(value)}
                            enableSearch={true}
                            searchPlaceholder="Search country..."
                            inputClass="!w-full !border !border-[#C3C3C3] !pl-[52px] !pr-4 !py-3 !text-sm md:!text-base !outline-none !rounded-none focus:!border-[#004cf6] !font-inter !h-14 bg-white"
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
                        <label className="text-[13px] md:text-sm font-semibold text-slate-900 font-poppins" htmlFor="tell-us-more">
                          Tell Us More
                        </label>
                        <span className="text-xs text-slate-400 font-medium font-inter">
                          {message.length}/1000
                        </span>
                      </div>
                      <textarea
                        suppressHydrationWarning={true}
                        required
                        maxLength={1000}
                        className="w-full border border-[#C3C3C3] p-4 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-44 resize-none bg-white"
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
