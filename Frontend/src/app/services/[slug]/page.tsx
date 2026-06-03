"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { servicesStore } from "@/lib/store/template-services";

import HeroSection from "../_components/HeroSection";
import StickyNav from "../_components/StickyNav";
import OverviewSection from "../_components/OverviewSection";
import TechStackSection from "../_components/TechStackSection";
import ProcessSection from "../_components/ProcessSection";
import ServicesWeOffer from "../_components/ServicesWeOffer";
import FaqSection from "../_components/FAQSection";
import WhyUsSection from "../_components/WhyUsSection";
import CaseStudiesSection from "../_components/CaseStudiesSection";

interface PageProps {
  params: { slug: string };
}

export default function DynamicServicePage({ params }: PageProps) {
  const { slug } = params;
  const service = servicesStore[slug];

  if (!service) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState("Overview");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle stickiness cleanly past the hero image fold
      setIsSticky(window.scrollY > 380);
    };
    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      // Generates an interactive activation field box across the upper content arena
      rootMargin: "-120px 0px -50% 0px", 
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchedItem = service.navItems.find(
            (item) => item.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id
          );
          if (matchedItem) {
            setActiveTab(matchedItem);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const targets = ["overview", "case-studies", "services", "technologies", "process", "why-wac", "why-us", "faq"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    targets.forEach((target) => observer.observe(target));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [service.navItems]);

  return (
    <div className="bg-white min-h-screen text-slate-900 font-inter selection:bg-purple-500/30">
      
      <HeroSection
        title={service.title}
        category={service.category}
        bgImage={service.bgImage}
      />

      <StickyNav
        title={service.title}
        navItems={service.navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSticky={isSticky}
      />

      {/* Structured Content Stream */}
      <main className="max-w-7xl mx-auto w-full px-6 md:px-12 xl:px-20 py-12 flex flex-col gap-24">
        
        <section id="overview" className="scroll-mt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <OverviewSection
              overviewTitle={service.overviewTitle}
              overviewParagraphs={service.overviewParagraphs}
              ctaText={service.ctaText}
              ctaLink={service.ctaLink}
              hasTechStack={!!service.techStackTitle}
              onTechKeywordClick={() => {
                const el = document.getElementById("technologies");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </motion.div>
        </section>

        {/* Case Studies — always shown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <CaseStudiesSection />
        </motion.div>

        {service.navItems.includes("Services") && (
          <div className="scroll-mt-36">
            <ServicesWeOffer items={service.servicesOffered || []} />
          </div>
        )}

        {service.techStackTitle && service.techStackTabs && (
          <section id="technologies" className="scroll-mt-36">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <TechStackSection
                techStackTitle={service.techStackTitle}
                techStackTabs={service.techStackTabs}
              />
            </motion.div>
          </section>
        )}

        {service.processTitle && service.processSteps && (
          <section id="process" className="scroll-mt-36">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <ProcessSection
                processTitle={service.processTitle}
                processSteps={service.processSteps}
              />
            </motion.div>
          </section>
        )}

        {service.whyUsTitle && service.whyUsStats && (
          <section 
            id={service.navItems.includes("Why WAC") ? "why-wac" : "why-us"} 
            className="scroll-mt-36"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <WhyUsSection
                whyUsTitle={service.whyUsTitle}
                whyUsSubtitle={service.whyUsSubtitle || ""}
                whyUsStats={service.whyUsStats || []}
                whyUsCtaText={service.whyUsCtaText}
                whyUsCtaLink={service.whyUsCtaLink}
              />
            </motion.div>
          </section>
        )}

        {service.navItems.includes("FAQ") && (
          <section id="faq" className="scroll-mt-36">
            <FaqSection faqData={service.faq || []} />
          </section>
        )}

      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}