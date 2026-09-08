'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Plus, Minus, Linkedin } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { handleContactUsFormSubmission } from '@/lib/services/contact.api';
import caseStudiesData from '@/lib/store/case-studies';

// Helper Icons
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

export default function BrandingLandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Hero Animation step timer
  const [heroStep, setHeroStep] = useState(1);

  // Accordion Process State
  const [activeProcessStep, setActiveProcessStep] = useState(0);



  // Contact Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Case Studies list
  const [dynamicCaseStudies, setDynamicCaseStudies] = useState<any[]>([]);
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

  // Curved Timeline scroll tracking
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineSectionRef,
    offset: ["start end", "end start"]
  });
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  useEffect(() => {
    setIsMounted(true);

    // Hero Text animation timeline
    const step2Timer = setTimeout(() => {
      setHeroStep(2);
    }, 1200);

    const step3Timer = setTimeout(() => {
      setHeroStep(3);
    }, 2400);

    // Fetch dynamic case studies
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
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
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
      selectedServices: ["Branding UAE Page inquiry", "Project Details: " + message],
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

  // Hero Collage image items
  const collageImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1586075010923-2dd45e9b2d4f?w=600&auto=format&fit=crop&q=80", style: "top-[15%] left-[5%] w-[180px] h-[180px]", delay: 0.1 },
    { id: 2, src: "https://images.unsplash.com/photo-1541462608141-2ff030a64e43?w=600&auto=format&fit=crop&q=80", style: "top-[8%] left-[30%] w-[240px] h-[160px]", delay: 0.3 },
    { id: 3, src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80", style: "top-[12%] right-[28%] w-[200px] h-[200px]", delay: 0.5 },
    { id: 4, src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80", style: "top-[18%] right-[6%] w-[220px] h-[220px]", delay: 0.2 },
    { id: 5, src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=80", style: "bottom-[15%] left-[8%] w-[220px] h-[220px]", delay: 0.6 },
    { id: 6, src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=80", style: "bottom-[8%] left-[35%] w-[200px] h-[200px]", delay: 0.4 },
    { id: 7, src: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80", style: "bottom-[14%] right-[32%] w-[230px] h-[170px]", delay: 0.8 },
    { id: 8, src: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80", style: "bottom-[10%] right-[8%] w-[200px] h-[200px]", delay: 0.7 }
  ];

  // Grid Services (Image 2)
  const brandingOffers = [
    { title: "Bespoke Brand Consulting", desc: "We guide leadership teams to clarify target positioning and establish consistent growth principles.", grad: "from-blue-100 to-indigo-50" },
    { title: "Corporate Brand Identity", desc: "Define your visual differentiator! We map out colors, tone of voice, and guidelines that attract customers.", grad: "from-purple-100 to-indigo-50" },
    { title: "Strategic Logo Systems", desc: "Design a timeless, iconic logo mark that represents your core value and stands out in saturating markets.", grad: "from-indigo-100 to-sky-50" },
    { title: "Integrated Brand Collateral", desc: "Maintain absolute visual consistency across digital assets, print stationery, and package templates.", grad: "from-sky-100 to-teal-50" },
    { title: "Creative Graphic Design", desc: "Translate complex brand values and telemetry data into compelling, high-quality visual content blocks.", grad: "from-pink-100 to-purple-50" },
    { title: "Advanced 2D & 3D Visualization", desc: "Craft photorealistic CGI product renders and environmental space walk-throughs before manufacturing.", grad: "from-orange-100 to-amber-50" }
  ];

  // Process Steps Accordion (Image 3)
  const processSteps = [
    { title: "Demographic Auditing & Research", desc: "We run deep competitive audits, user interview scripts, and mapping to understand client personas, ensuring your brand stands out." },
    { title: "Visual Position Strategy", desc: "We outline brand parameters, design frameworks, typography guidelines, and style rules to build a scalable marketing core." },
    { title: "Voice Tone & Phrasing Guides", desc: "We compose copywriting guidelines, visual slogans, and messaging matrices that engage users consistently across touchpoints." },
    { title: "Visual System Prototyping", desc: "We design high-definition logo vectors, corporate color palettes, custom iconography, and stationery mockups." },
    { title: "Unified Brand Deployment", desc: "We deliver digital collateral, visual brochures, custom boxes, and marketing campaign materials for a successful public debut." }
  ];

  // Process step-linked images
  const processImages = [
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80", // Research
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80", // Strategy
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80", // Messaging
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80", // Design
    "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80"  // Launch
  ];

  // Curved Timeline Services (Point 2 and 3 design)
  const timelineItems = [
    {
      id: "brand-consulting",
      title: "Bespoke Brand Consulting",
      desc: "Detailed positioning strategies, market analysis, competitor audits, and custom messaging trees that establish category leadership.",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80",
      isLeftImage: true
    },
    {
      id: "logo-design",
      title: "Strategic Logo Systems",
      desc: "Engineering premium vector brand marks and responsive logotype layouts that guarantee clarity on any print or screen size.",
      img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80",
      isLeftImage: false
    },
    {
      id: "graphic-design",
      title: "Creative Graphic Design",
      desc: "High-impact visual assets, editorial print layouts, marketing brochures, and visual social assets built to convert.",
      img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format&fit=crop&q=60",
      isLeftImage: true
    },
    {
      id: "visualisation",
      title: "Advanced 3D Visualization",
      desc: "Photorealistic CGI mockups, custom product renderings, and virtual interior setups that validate designs early.",
      img: "https://plus.unsplash.com/premium_photo-1721165576883-58703467b0cc?w=500&auto=format&fit=crop&q=60",
      isLeftImage: false
    },
    {
      id: "brand-identity",
      title: "Corporate Brand Identity",
      desc: "Comprehensive style guidelines specifying custom typography hierarchies, color swatches, and interface assets.",
      img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
      isLeftImage: true
    },
    {
      id: "industrial-design",
      title: "Industrial Product Design",
      desc: "Conceptual hardware mockups, visual packaging structures, device interfaces, and user ergonomics mapping.",
      img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
      isLeftImage: false
    }
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-purple-500/20">
      
      {/* 1. COLLAGE HERO SECTION (Image 1 style with fixed letter 'G' clipping) */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 py-32 select-none">
        
        {/* Background Collage of Branding mockups */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          {collageImages.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: img.delay, ease: "easeOut" }}
              className={`absolute hidden md:block overflow-hidden rounded shadow-2xl border border-white/5 ${img.style}`}
            >
              <Image
                src={img.src}
                alt="Branding Collage Piece"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
          ))}
        </div>

        {/* Floating gradient accent */}
        <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12)_0%,transparent_60%)] pointer-events-none z-0" />

        {/* Centered animated hero text */}
        <div className="max-w-4xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
          
          <div className="relative flex flex-col font-poppins font-light tracking-wide leading-none mb-6">
            {/* Height parameters adjusted upward to fit descender for letter 'g' */}
            <div className="overflow-hidden h-[95px] sm:h-[130px] md:h-[175px] lg:h-[200px] flex items-center justify-center">
              <AnimatePresence>
                {heroStep >= 1 && (
                  <motion.h1
                    initial={{ y: "80%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-7xl sm:text-[100px] md:text-[130px] lg:text-[160px] text-white font-extralight pb-3"
                  >
                    Branding
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={heroStep >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 1.0 }}
            className="text-slate-400 text-lg sm:text-2xl font-inter font-light max-w-2xl leading-relaxed text-balance"
          >
            We engineer visual systems that define market leadership
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroStep >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="mt-12"
          >
            <button
              onClick={() => document.getElementById('offer-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 bg-white/5 backdrop-blur-sm transition-all cursor-pointer rounded-none"
            >
              Explore Services
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. BRANDING SERVICES WE OFFER (Image 2 style) */}
      <section id="offer-section" className="bg-slate-50 text-slate-900 py-28 px-6 border-b border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 font-poppins mb-6">
              Branding Services We Offer
            </h2>
            <div className="w-16 h-[2px] bg-blue-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandingOffers.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
              >
                {/* Visual Glass Header banner with index bubble */}
                <div className={`h-24 bg-gradient-to-r ${item.grad} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_60%)]" />
                  <div className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-slate-100 flex items-center justify-center font-bold text-xs text-[#052D69] font-poppins">
                    0{idx + 1}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 font-poppins text-left">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-inter font-normal text-left">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-6 flex justify-start">
                    <button
                      onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center gap-1.5 text-blue-600 group-hover:text-blue-800 text-xs font-semibold uppercase tracking-wider transition-colors font-poppins cursor-pointer"
                    >
                      Learn more &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROCESS ACCORDION SECTION WITH DYNAMIC STEP IMAGES (Image 3 style) */}
      <section className="py-28 bg-white border-b border-slate-100 text-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-left">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-950 font-poppins mb-6">
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side: Dynamic process images (cross-fading on click) */}
            <div className="lg:col-span-5 relative w-full aspect-square overflow-hidden bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
              {processImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeProcessStep === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={img}
                    alt="Process Step Illustration"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-transparent pointer-events-none z-20" />
            </div>

            {/* Right side: Accordion list */}
            <div className="lg:col-span-7 flex flex-col border-t border-slate-200 w-full font-poppins">
              {processSteps.map((step, idx) => {
                const isOpen = activeProcessStep === idx;
                return (
                  <div key={idx} className="border-b border-slate-200 py-6">
                    <button
                      suppressHydrationWarning
                      onClick={() => setActiveProcessStep(idx)}
                      className="flex justify-between items-center text-left w-full group cursor-pointer"
                    >
                      <span className={`text-base md:text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-[#052D69]' : 'text-slate-900 group-hover:text-[#052D69]'}`}>
                        {step.title}
                      </span>
                      {isOpen ? (
                        <Minus size={18} className="text-[#052D69] shrink-0" />
                      ) : (
                        <Plus size={18} className="text-slate-400 group-hover:text-[#052D69] shrink-0" />
                      )}
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
                          <p className="text-slate-600 text-sm font-normal font-inter mt-4 leading-relaxed max-w-2xl text-left">
                            {step.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. INNOVATIVE VERTICAL CURVED TIMELINE CAPABILITIES (Points 2 and 3 style) */}
      <section ref={timelineSectionRef} className="py-32 bg-white relative overflow-hidden text-slate-900 border-b border-slate-100">
        
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-950 font-poppins mb-6">
            Our Branding Capabilities
          </h2>
          <div className="w-16 h-[2px] bg-blue-600 mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto relative px-4 md:px-8">
          
          {/* Central Vertical Curved SVG path */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-24 pointer-events-none hidden lg:block z-0">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000" fill="none">
              {/* Background grey wave */}
              <path
                d="M50,0 C15,120 85,250 50,380 C15,500 85,620 50,750 C15,870 85,1000 50,1000"
                stroke="#E2E8F0"
                strokeWidth="2.5"
              />
              {/* Animated blue wave matching user scroll */}
              <motion.path
                d="M50,0 C15,120 85,250 50,380 C15,500 85,620 50,750 C15,870 85,1000 50,1000"
                stroke="#052D69"
                strokeWidth="3"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
            {timelineItems.map((item, index) => {
              return (
                <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative min-h-[300px]">
                  
                  {/* Wavy dot indicator node (centered absolute on desktop, hidden on mobile) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-600 border-[5px] border-white shadow hidden lg:flex items-center justify-center z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping absolute opacity-70" />
                  </div>

                  {/* Left Column content */}
                  <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full">
                    {item.isLeftImage ? (
                      /* Image block */
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm"
                      >
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 450px"
                          className="object-cover"
                        />
                      </motion.div>
                    ) : (
                      /* Content block */
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4 max-w-md"
                      >
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-poppins">
                          Capability 0{index + 1}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 font-poppins">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-inter font-normal">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Empty gap spacer (Column 6 and 7) for timeline */}
                  <div className="hidden lg:block lg:col-span-2 h-full" />

                  {/* Right Column content */}
                  <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full">
                    {!item.isLeftImage ? (
                      /* Image block */
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm"
                      >
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 450px"
                          className="object-cover"
                        />
                      </motion.div>
                    ) : (
                      /* Content block */
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4 max-w-md lg:pl-4"
                      >
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-poppins">
                          Capability 0{index + 1}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 font-poppins">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-inter font-normal">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. DESIGN PRINCIPLES SECTION (Interactive & Beautifully Animated) */}
      <section className="py-28 bg-slate-950 text-white relative overflow-hidden">
        
        {/* Glow lights */}
        <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight font-poppins mb-6">
              Our Core Design Principles
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-inter font-normal max-w-2xl mx-auto leading-relaxed">
              Design is the silent ambassador of your brand. We execute with rigorous visual frameworks that elevate aesthetics into high-value equity.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: Aesthetic-Usability Effect */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-slate-900/60 border border-white/5 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between min-h-[360px] group transition-all duration-300 hover:border-blue-500/30"
            >
              <div className="space-y-6">
                {/* Micro-animation container */}
                <div className="w-16 h-16 rounded-xl bg-blue-950/40 border border-blue-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="grid grid-cols-3 gap-1 w-8 h-8 relative">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-blue-500 rounded-sm"
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: (i % 3 + Math.floor(i / 3)) * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-semibold font-poppins text-white text-left">
                  Aesthetic-Usability Effect
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-inter font-normal text-left">
                  Users perceive aesthetically pleasing designs as far more intuitive. We design visual harmony that creates positive emotional triggers, making complex systems feel simple.
                </p>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-500 font-poppins text-left pt-6">
                Visual Harmony
              </div>
            </motion.div>

            {/* Card 2: Law of Prägnanz */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-slate-900/60 border border-white/5 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between min-h-[360px] group transition-all duration-300 hover:border-purple-500/30"
            >
              <div className="space-y-6">
                {/* Micro-animation container */}
                <div className="w-16 h-16 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    {/* Intersecting shapes that merge */}
                    <motion.div
                      className="absolute w-5 h-5 rounded-full border border-purple-500"
                      animate={{ x: [-6, 0, -6], y: [-3, 0, -3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute w-5 h-5 rounded-full border border-purple-500"
                      animate={{ x: [6, 0, 6], y: [3, 0, 3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute w-2 h-2 rounded-full bg-purple-400"
                      animate={{ scale: [0.5, 1.2, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold font-poppins text-white text-left">
                  Law of Prägnanz
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-inter font-normal text-left">
                  The human brain automatically simplifies complex visual stimuli. We structure layouts into clean geometric primitives and symmetric groups to eliminate cognitive strain.
                </p>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-500 font-poppins text-left pt-6">
                Cognitive Comfort
              </div>
            </motion.div>

            {/* Card 3: Fitts's Law */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-slate-900/60 border border-white/5 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between min-h-[360px] group transition-all duration-300 hover:border-emerald-500/30"
            >
              <div className="space-y-6">
                {/* Micro-animation container */}
                <div className="w-16 h-16 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    {/* Simulated target cursor line */}
                    <motion.div
                      className="absolute w-2 h-2 bg-emerald-500 rounded-full"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 40 40">
                      <motion.circle
                        cx="20"
                        cy="20"
                        r="12"
                        stroke="rgba(16, 185, 129, 0.3)"
                        strokeWidth="1.5"
                        fill="none"
                        animate={{ r: [6, 16, 6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.line
                        x1="5"
                        y1="35"
                        x2="18"
                        y2="22"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                        animate={{
                          x2: [5, 18, 5],
                          y2: [35, 22, 35]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold font-poppins text-white text-left">
                  Fitts's Law
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-inter font-normal text-left">
                  Target acquisition speed is defined by the size of the target and its proximity. We engineer responsive tap areas and optimized layout flows for frictionless interactions.
                </p>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 font-poppins text-left pt-6">
                Interaction Speed
              </div>
            </motion.div>

            {/* Card 4: Serial Position Effect */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-slate-900/60 border border-white/5 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between min-h-[360px] group transition-all duration-300 hover:border-orange-500/30"
            >
              <div className="space-y-6">
                {/* Micro-animation container */}
                <div className="w-16 h-16 rounded-xl bg-orange-950/40 border border-orange-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="flex gap-2 items-center">
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/30" />
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold font-poppins text-white text-left">
                  Serial Position Effect
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-inter font-normal text-left">
                  Users remember the first and last items in a visual series with the highest clarity. We strategic-map client key messages at sequence peaks to maximize retention.
                </p>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-orange-500 font-poppins text-left pt-6">
                Recall Anchoring
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 6. DYNAMIC CASE STUDIES SLIDER SECTION */}
      <section className="py-24 bg-slate-50 border-b border-slate-100 overflow-hidden text-slate-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 font-poppins">
                Our Branding &amp; Creative Case Studies
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                suppressHydrationWarning
                onClick={() => scrollSlider("left")}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#052D69] hover:text-[#052D69] transition-colors shadow-sm cursor-pointer"
                aria-label="Previous case study"
              >
                <ArrowLeftIcon />
              </button>
              <button
                suppressHydrationWarning
                onClick={() => scrollSlider("right")}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#052D69] hover:text-[#052D69] transition-colors shadow-sm cursor-pointer"
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
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
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
                        className="inline-flex items-center gap-2 px-6 py-3 border border-slate-900 text-slate-900 hover:border-[#052D69] hover:text-[#052D69] hover:bg-blue-50/5 transition-all text-xs font-bold uppercase tracking-wider font-poppins rounded-none"
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

      {/* 7. CONTACT FORM SECTION */}
      <section id="contact-form-section" className="py-24 bg-white border-t border-slate-100 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-955 leading-tight font-poppins">
                Design Your Category Leadership Blueprint
              </h2>
              <p className="text-slate-500 font-normal text-sm md:text-base leading-relaxed font-inter">
                Every line, shade, font scale, and voice layout shapes how your business feels. Let Obsidian Six construct a cohesive corporate visual identity that dominates market attention.
              </p>

              {/* Founder/Rep Card */}
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
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#052D69] mt-2 transition-colors"
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
                    <CheckCircle2 className="w-16 h-16 text-[#052D69] mx-auto mb-6" />
                    <h2 className="text-3xl font-light mb-2 font-poppins">Message Sent!</h2>
                    <p className="text-slate-500 text-base mb-6 font-inter font-normal">
                      Our brand strategy team will review your project details and reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#052D69] font-semibold uppercase tracking-widest text-xs hover:underline font-poppins cursor-pointer"
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
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#052D69] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white font-normal text-slate-900"
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
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#052D69] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white font-normal text-slate-900"
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
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#052D69] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white font-normal text-slate-900"
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
                            inputClass="!w-full !border !border-[#C3C3C3] !pl-[52px] !pr-4 !py-3 !text-sm md:!text-base !outline-none !rounded-none focus:!border-[#052D69] !font-inter !h-14 bg-white font-normal text-slate-900"
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
                        className="w-full border border-[#C3C3C3] p-4 text-sm md:text-base outline-none focus:border-[#052D69] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-44 resize-none bg-white font-normal text-slate-900"
                        id="tell-us-more"
                        placeholder="Briefly describe your brand objectives"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    {/* Send Enquiry Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 bg-black text-white hover:bg-[#052D69] transition-colors flex items-center gap-3 font-semibold text-xs uppercase tracking-widest rounded-none disabled:opacity-50 font-poppins cursor-pointer"
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
