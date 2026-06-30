'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Plus, Minus, Linkedin } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { handleContactUsFormSubmission } from '@/lib/services/contact.api';
import caseStudiesData from '@/lib/store/case-studies';

// SVG / Helper Icons
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

// Custom CountUp Component
function Counter({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();

    const animateValue = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const current = start + easeProgress * (end - start);
      
      node.textContent = Math.round(current).toString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    requestAnimationFrame(animateValue);
  }, [value, inView, duration, suffix]);

  return <span ref={nodeRef} className="font-poppins font-bold text-5xl md:text-7xl text-slate-900">0{suffix}</span>;
}

export default function SEOLandingPage() {
  const [step, setStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic Case Studies state
  const [dynamicCaseStudies, setDynamicCaseStudies] = useState<any[]>([]);

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

  // Strategy Funnel In-View
  const funnelRef = useRef<HTMLDivElement>(null);
  const isFunnelInView = useInView(funnelRef, { once: true, margin: "-100px" });

  // Let's Build Future Together Scroll-linked
  const futureSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: futureSectionRef,
    offset: ["start end", "end start"]
  });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.2, 0.7]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.9, 0.3]);

  // Static target case studies for the Featured section
  const targetSlugs = ["pachmarhi-ayurveda", "ab-capital-lead-generation", "ten-on-ten-stays"];
  const featuredProjects = caseStudiesData.filter(cs => targetSlugs.includes(cs.slug));

  // Map display data specifically for Featured horizontal layout
  const featuredDisplayMap: Record<string, { tagline: string; description: string }> = {
    "pachmarhi-ayurveda": {
      tagline: "Revitalising Legacy Health Brands",
      description: "Pachmarhi Ayurveda: A comprehensive digital marketing strategy that took a trusted offline Ayurvedic oil brand digital, expanding nationwide reach and boosting online sales by 80%."
    },
    "ab-capital-lead-generation": {
      tagline: "Transforming B2B Lead Funnels",
      description: "AB Capital: Re-established digital authority and built a high-converting lead generation pipeline targeting international corporate clients, securing over 30,000 qualified leads."
    },
    "ten-on-ten-stays": {
      tagline: "Redefining Hospitality Growth",
      description: "Ten On Ten Stays: Developed a high-converting digital presence and strategic branding to position the agency as a 360° revenue growth partner for premium hotels and resorts."
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Step 1: Center Marketing is shown initially.
    // Step 2: Wait 1.2s, then show Digital above it.
    const timer2 = setTimeout(() => {
      setStep(2);
    }, 1200);

    // Step 3: Wait 2.4s, then transition text left and show spinning/rolling rocket.
    const timer3 = setTimeout(() => {
      setStep(3);
    }, 2400);

    // Fetch dynamic case studies for the slider
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
        if (img.includes("placeholder") || img.includes("default")) return false;
        const hasValidExtension = img.endsWith(".jpg") || img.endsWith(".jpeg") || img.endsWith(".png") || img.endsWith(".webp") || img.startsWith("http");
        return hasValidExtension;
      });

      setDynamicCaseStudies(filtered);
    };

    fetchStudies();

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
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
      selectedServices: ["Digital Marketing UAE Page inquiry", "Project Details: " + message],
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

  const services = [
    {
      title: "Conversion Optimization & PPC",
      desc: "Maximize acquisition and scale your monthly revenue using data-validated paid search models, target social promotions, and regular funnel adjustments."
    },
    {
      title: "Brand Voice & Community Management",
      desc: "Establish brand recognition, nurture organic client interactions, and drive organic signups via tailored social templates and design content."
    },
    {
      title: "Content Systems & Authority Assets",
      desc: "Position your brand as an industry authority and compile permanent traffic assets through expert whitepapers, graphic posts, and newsletters."
    },
    {
      title: "Rank Elevation & Semantic SEO",
      desc: "Command competitive keywords and capture organic buyer intent using structural website audits, topic clusters, and white-hat linking."
    },
    {
      title: "Generative Engine Optimization (GEO)",
      desc: "Format and optimize your site data so AI systems like Perplexity, ChatGPT, and Gemini cite your brand as the primary reference."
    },
    {
      title: "Analytics Pipelines & Attribution",
      desc: "Implement clear multi-touch attribution, GA4 tag configurations, and custom data reporting dashboards for ultimate channel transparency."
    }
  ];

  const faqs = [
    {
      question: "What capabilities does your UAE digital marketing agency provide?",
      answer: "We deliver full-funnel marketing configurations, covering search optimization (SEO), paid search campaigns, lead attribution setups, and GEO preparation tailored to UAE commercial markets."
    },
    {
      question: "When should we anticipate measurable results from search campaigns?",
      answer: "While paid advertising campaigns yield immediate clicks, our sustainable, organic search engine optimization and topic building frameworks require 3 to 6 months of execution to capture lasting authority."
    },
    {
      question: "Do you specialize in Meta and Google Ad optimizations?",
      answer: "Yes. We manage high-performance Google Ads and Meta platforms (Instagram, Facebook), validating every dollar spent with advanced pixel attribution systems."
    },
    {
      question: "How does Obsidian Six differ from other regional agencies?",
      answer: "We avoid reporting vanity impressions. Our team acts as growth engineers, optimizing visual workflows and conversion pipelines to maximize actual business revenue."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden bg-black px-4">
        <div className="max-w-7xl mx-auto w-full relative z-10 min-h-[70vh] flex items-center">
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            
            {/* Animated Text Container */}
            <motion.div
              layout
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col justify-center ${
                step < 3
                  ? "col-span-12 items-center text-center py-20"
                  : "col-span-12 lg:col-span-7 items-center lg:items-start text-center lg:text-left"
              }`}
            >
              <div className="relative flex flex-col font-poppins font-light tracking-wide leading-none mb-6">
                
                {/* Row 1: Digital */}
                <div className="overflow-hidden h-[70px] sm:h-[90px] md:h-[120px] lg:h-[140px] flex items-center justify-center lg:justify-start">
                  <AnimatePresence>
                    {step >= 2 && (
                      <motion.span
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl sm:text-8xl md:text-9xl lg:text-[120px] text-white font-extralight"
                      >
                        Digital
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Row 2: Marketing */}
                <div className="overflow-hidden h-[70px] sm:h-[90px] md:h-[120px] lg:h-[140px] flex items-center justify-center lg:justify-start">
                  <motion.span
                    layout
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl sm:text-8xl md:text-9xl lg:text-[120px] text-white font-extralight"
                  >
                    Marketing
                  </motion.span>
                </div>
              </div>

              {/* Paragraph & button */}
              <AnimatePresence>
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-center lg:items-start"
                  >
                    <p className="text-slate-400 text-lg md:text-xl font-normal font-inter max-w-2xl mb-8 leading-relaxed text-balance text-center lg:text-left">
                      Acquire qualified leads and accelerate revenue. Our growth squad designs performance campaigns for high-scale enterprises in Dubai and across the UAE.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 bg-[#004cf6] hover:bg-blue-700 text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 transition-all cursor-pointer"
                      >
                        Get a custom strategy
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Rocket Container */}
            <div className={`flex justify-center items-center relative transition-all duration-1000 ${
              step < 3
                ? "col-span-0 w-0 h-0 overflow-hidden opacity-0"
                : "col-span-12 lg:col-span-5 min-h-[350px] opacity-100"
            }`}>
              <AnimatePresence>
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, x: 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.7, x: 100 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-[420px] aspect-square"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0]
                      }}
                      transition={{
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src="/images/rocket.png"
                        alt="Spinning and Rolling 3D Iridescent Rocket"
                        fill
                        className="object-contain filter drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-white text-slate-900 py-20 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight font-poppins mb-4">
              Solving the Digital Maze for Success
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-normal font-inter max-w-2xl mx-auto">
              Our metrics speak for our relentless drive toward data-driven growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Counter value={50} suffix="+" />
              <p className="text-slate-500 text-sm md:text-base uppercase tracking-widest font-semibold font-poppins mt-2">Brands Managed</p>
            </div>
            <div className="flex flex-col items-center">
              <Counter value={60} suffix="+" />
              <p className="text-slate-500 text-sm md:text-base uppercase tracking-widest font-semibold font-poppins mt-2">Campaigns Run</p>
            </div>
            <div className="flex flex-col items-center">
              <Counter value={10} suffix="x" />
              <p className="text-slate-500 text-sm md:text-base uppercase tracking-widest font-semibold font-poppins mt-2">Return on Investment</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES GRID (No images, No learn more links, styled like Technology page) */}
      <section className="bg-slate-50 text-slate-900 py-24 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 font-poppins mb-4">
              Our Capabilities
            </h2>
            <p className="text-slate-500 text-lg font-normal font-inter max-w-2xl">
              We leverage cutting-edge analytics, performance tactics, and organic scaling models to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
              >
                {/* Visual Glass Header banner with index bubble */}
                <div className="h-28 bg-gradient-to-r from-blue-100 via-indigo-55 to-orange-50 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,76,246,0.05)_0%,rgba(0,0,0,0)_60%)]" />
                  <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm border border-slate-100 flex items-center justify-center font-bold text-xs text-[#004cf6] font-poppins">
                    0{idx + 1}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 font-poppins">
                      {svc.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-inter font-normal">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PARTNERS SECTION */}
      <section className="bg-white text-slate-900 py-24 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight font-poppins mb-4">
              Certified Partner Networks
            </h2>
            <p className="text-slate-500 text-lg font-normal font-inter max-w-2xl mx-auto">
              We maintain direct partnerships with leading channels to guarantee peak execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Google Partner Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-slate-100 p-8 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex-shrink-0 flex items-center justify-center p-3 bg-slate-50 border border-slate-100 w-16 h-16 relative">
                <Image
                  src="https://cdn.simpleicons.org/google"
                  alt="Google Logo"
                  fill
                  className="object-contain p-2.5"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg text-slate-900 mb-2">Google Partner</h3>
                <p className="font-inter text-slate-500 text-sm leading-relaxed font-normal">
                  As a certified Google Partner, we excel in leveraging Google's platform for search, display, and video targeting.
                </p>
              </div>
            </motion.div>

            {/* Meta Business Partner */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-slate-100 p-8 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex-shrink-0 flex items-center justify-center p-3 bg-slate-50 border border-slate-100 w-16 h-16 relative">
                <Image
                  src="https://cdn.simpleicons.org/meta"
                  alt="Meta Logo"
                  fill
                  className="object-contain p-2.5"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg text-slate-900 mb-2">Meta Business Partner</h3>
                <p className="font-inter text-slate-500 text-sm leading-relaxed font-normal">
                  We have teamed up with Meta to deliver seamless campaigns across Facebook and Instagram, maximizing social ROI.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. STRATEGY FUNNEL SECTION */}
      <section ref={funnelRef} className="bg-slate-950 py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isFunnelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold uppercase tracking-tight font-poppins mb-6 text-white leading-tight"
            >
              A Unified Framework for Customer Acquisition
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isFunnelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-400 text-lg font-inter mb-8 leading-relaxed font-normal"
            >
              We construct custom visual funnels that map active traffic channels to key points of user conversion, moving audiences from awareness to purchasing action.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isFunnelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 border border-slate-700 hover:border-white text-white font-semibold text-xs uppercase tracking-wider px-6 py-4 transition-all cursor-pointer"
            >
              Get a custom strategy
              <ArrowRight size={14} />
            </motion.button>
          </div>

          {/* Right Funnel Graphic with slow appearing animation */}
          <div className="lg:col-span-7 relative flex justify-center items-center py-10 w-full max-w-[580px] mx-auto">
            <div className="w-full flex flex-col gap-2 relative">
              
              {/* Brackets and Connectors left and right */}
              {/* Left bracket for Video, Social */}
              <div className="hidden sm:block absolute left-[-60px] top-[4%] h-[28%] w-[40px] border-y border-l border-slate-700 rounded-l-md">
                <span className="absolute left-[-110px] top-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap text-[10px] uppercase tracking-widest text-slate-500 font-semibold font-poppins">
                  Video, Social
                </span>
              </div>

              {/* Left bracket for PPC, Web Design, Content Marketing */}
              <div className="hidden sm:block absolute left-[-60px] top-[37%] h-[44%] w-[40px] border-y border-l border-slate-700 rounded-l-md">
                <span className="absolute left-[-140px] top-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap text-[10px] uppercase tracking-widest text-slate-500 font-semibold font-poppins">
                  PPC, Web, Content
                </span>
              </div>

              {/* Right bracket for SEO, SEM */}
              <div className="hidden sm:block absolute right-[-60px] top-[4%] h-[77%] w-[40px] border-y border-r border-slate-700 rounded-r-md">
                <span className="absolute right-[-100px] top-1/2 -translate-y-1/2 rotate-[90deg] whitespace-nowrap text-[10px] uppercase tracking-widest text-slate-500 font-semibold font-poppins">
                  SEO, SEM
                </span>
              </div>

              {/* Right bracket for Email Remarketing */}
              <div className="hidden sm:block absolute right-[-60px] top-[54%] h-[42%] w-[40px] border-y border-r border-slate-700 rounded-r-md">
                <span className="absolute right-[-115px] top-1/2 -translate-y-1/2 rotate-[90deg] whitespace-nowrap text-[10px] uppercase tracking-widest text-slate-500 font-semibold font-poppins">
                  Email remarketing
                </span>
              </div>

              {/* Funnel Layers */}
              {[
                { label: "Audience Discovery", bg: "from-blue-500 to-sky-400", width: "w-full" },
                { label: "Intent Engagement", bg: "from-sky-500 to-teal-400", width: "w-[90%]" },
                { label: "Solution Evaluation", bg: "from-teal-500 to-emerald-400", width: "w-[80%]" },
                { label: "High-Intent Action", bg: "from-emerald-500 to-indigo-500", width: "w-[70%]" },
                { label: "Decision Mapping", bg: "from-indigo-500 to-purple-500", width: "w-[60%]" },
                { label: "Customer Loyalty", bg: "from-purple-500 to-fuchsia-500", width: "w-[50%]" },
              ].map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scaleX: 0.8, y: 40 }}
                  animate={isFunnelInView ? { opacity: 1, scaleX: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: index * 0.2
                  }}
                  className={`h-14 sm:h-16 bg-gradient-to-r ${layer.bg} ${layer.width} mx-auto flex items-center justify-center relative clip-funnel shadow-md hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
                  style={{
                    clipPath: "polygon(4% 0%, 96% 0%, 92% 100%, 8% 100%)"
                  }}
                >
                  <span className="font-poppins uppercase tracking-widest text-xs sm:text-sm font-semibold text-white">
                    {layer.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. LET'S BUILD THE FUTURE TOGETHER */}
      <section ref={futureSectionRef} className="relative py-32 px-6 overflow-hidden bg-slate-950 border-y border-slate-900">
        
        {/* Glow backdrop with scroll animation */}
        <motion.div 
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25)_0%,rgba(168,85,247,0.07)_45%,transparent_70%)] pointer-events-none"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="text-4xl md:text-6xl font-light tracking-tight font-poppins mb-6 leading-tight"
          >
            Empower Your Brand's <br /> Digital Visibility
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg font-inter max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
          >
            By designing unified conversion tactics, we increase your digital search visibility and search engine capture. Let's consult and find growth avenues together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.4 }}
          >
            <button
              onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 border border-white bg-white text-black hover:bg-transparent hover:text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 transition-all cursor-pointer"
            >
              Let's talk
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 7. FEATURED PROJECTS SECTION (Stacked horizontal cards exactly like Image 1) */}
      <section className="bg-white text-slate-900 py-24 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-left">
            <h2 className="text-4xl md:text-[54px] font-medium tracking-tight font-poppins text-slate-900 leading-tight">
              Featured Projects
            </h2>
          </div>

          <div className="flex flex-col gap-24">
            {featuredProjects.map((cs) => {
              const display = featuredDisplayMap[cs.slug] || {
                tagline: cs.name,
                description: cs.details
              };
              return (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  {/* Left: Image Box */}
                  <div className="lg:col-span-7 relative aspect-[16/9] w-full overflow-hidden bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                    <Image
                      src={cs.image}
                      alt={cs.name}
                      fill
                      className="object-cover hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                  {/* Right: Content details */}
                  <div className="lg:col-span-5 space-y-6 flex flex-col items-start text-left">
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-900 font-poppins leading-tight">
                      {display.tagline}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base font-normal font-inter leading-relaxed max-w-lg">
                      {display.description}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/case-studies/${cs.slug}`}
                        className="inline-flex items-center gap-2 border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 px-6 py-3 transition-all text-xs font-semibold uppercase tracking-wider font-poppins"
                      >
                        View case study <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. DYNAMIC CASE STUDIES SLIDER SECTION (All other case studies carousel, placed above FAQ) */}
      <section className="py-24 bg-slate-50 border-b border-slate-100 overflow-hidden text-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 font-poppins">
                Our Digital Marketing Case Studies
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                suppressHydrationWarning={true}
                onClick={() => scrollSlider("left")}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#004cf6] hover:text-[#004cf6] transition-colors shadow-sm cursor-pointer"
                aria-label="Previous case study"
              >
                <ArrowLeftIcon />
              </button>
              <button
                suppressHydrationWarning={true}
                onClick={() => scrollSlider("right")}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#004cf6] hover:text-[#004cf6] transition-colors shadow-sm cursor-pointer"
                aria-label="Next case study"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>

        </div>

        {dynamicCaseStudies.length > 0 && (
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
              {[...dynamicCaseStudies, ...dynamicCaseStudies].map((cs, idx) => (
                <div 
                  key={idx} 
                  className="w-[320px] md:w-[600px] lg:w-[650px] shrink-0 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[340px] hover:border-blue-100 transition-colors"
                >
                  {/* Left column (Text content) */}
                  <div className="flex-[1.2] p-6 md:p-8 flex flex-col justify-between bg-white text-left">
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
                  <div className="flex-1 relative min-h-[220px] md:min-h-auto bg-slate-50 border-l border-slate-100">
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

      {/* 9. FAQ SECTION (Styled like Technology page FAQ list) */}
      <section className="py-24 bg-white border-t border-slate-100 text-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-light tracking-tight text-slate-955 mb-12 font-poppins text-left">
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
                    className="flex justify-between items-center text-left w-full group cursor-pointer"
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
              className="px-6 py-2.5 border border-[#004cf6] text-[#004cf6] hover:bg-blue-50/40 text-xs font-bold uppercase tracking-wider transition-colors font-poppins cursor-pointer"
            >
              Show more
            </button>
          </div>
        </div>
      </section>

      {/* 10. BESPOKE CONTACT FORM SECTION (Styled like Technology page form) */}
      <section id="contact-form-section" className="py-24 bg-white border-t border-slate-100 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 leading-tight font-poppins">
                Scale Your Reach and Conversions with Our Digital Marketing Services
              </h2>
              <p className="text-slate-500 font-normal text-sm md:text-base leading-relaxed font-inter">
                Every marketing campaign, search funnel layer, and analytics system should perform seamlessly. Let Obsidian Six construct modular, high-converting pipelines that skyrocket your pipeline.
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
                      Our marketing strategy team will review your details and reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#004cf6] font-semibold uppercase tracking-widest text-xs hover:underline font-poppins cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6 text-left" onSubmit={handleFormSubmit}>
                    
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <label className="text-[13px] md:text-sm font-medium text-slate-900 block mb-2 font-poppins" htmlFor="first-name">
                          First Name*
                        </label>
                        <input
                          required
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white font-normal text-slate-900"
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
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white font-normal text-slate-900"
                          id="last-name"
                          placeholder="Enter last name"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <label className="text-[13px] md:text-sm font-medium text-slate-900 block mb-2 font-poppins" htmlFor="email">
                          Email*
                        </label>
                        <input
                          required
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white font-normal text-slate-900"
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
                            country={"ae"}
                            value={phone}
                            onChange={(value: string) => setPhone(value)}
                            enableSearch={true}
                            searchPlaceholder="Search country..."
                            inputClass="!w-full !border !border-[#C3C3C3] !pl-[52px] !pr-4 !py-3 !text-sm md:!text-base !outline-none !rounded-none focus:!border-[#004cf6] !font-inter !h-14 bg-white font-normal text-slate-900"
                            containerClass="!w-full !rounded-none"
                            buttonClass="!rounded-none !border-y-0 !border-l-0 !border-r !border-[#C3C3C3] !bg-white"
                            dropdownClass="!rounded-none !text-slate-900"
                            searchClass="!text-xs !p-2 !text-slate-900"
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
                        required
                        maxLength={1000}
                        className="w-full border border-[#C3C3C3] p-4 text-sm md:text-base outline-none focus:border-[#004cf6] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-44 resize-none bg-white font-normal text-slate-900"
                        id="tell-us-more"
                        placeholder="Brief about your digital goals"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    {/* Send Enquiry Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 bg-black text-white hover:bg-[#004cf6] transition-colors flex items-center gap-3 font-semibold text-xs uppercase tracking-widest rounded-none disabled:opacity-50 font-poppins cursor-pointer"
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