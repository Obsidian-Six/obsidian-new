"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { ArrowRight, Plus, Minus, CheckCircle2, Loader2, Linkedin } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { handleContactUsFormSubmission } from "@/lib/services/contact.api";
import caseStudiesData from "@/lib/store/case-studies";

// CountUp Component for stats number animation
function CountUp({ to, duration = 2, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.round(value) + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, to, suffix, duration]);

  return <span ref={nodeRef} className="font-poppins font-black">0{suffix}</span>;
}

// Expanded Accordion Content Definitions
const uiuxAccordion = [
  {
    title: "UI/UX Design",
    desc: "We focus on crafting personalised and user-centric designs that align seamlessly with your business’s goals and users’ needs. By integrating visual balance with behavioral science, we create layouts that guide users naturally, reduce friction, and ensure maximum clarity at every touchpoint.",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800"
  },
  {
    title: "Website Design",
    desc: "Our experts design advanced, user-friendly websites that make your business stand out, attract high-intent customers, and drive tangible commercial results. We prioritize clean layout hierarchies, performance optimization, and clear calls-to-action to maximize visitor engagement and brand trust across every page.",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800"
  },
  {
    title: "Mobile Design",
    desc: "We build intuitive, custom user interfaces and human-centric experiences for mobile devices with a key focus on superior accessibility, touch-target ergonomics, and fast performance. By aligning layouts with modern OS standards (iOS & Android), we ensure that your product feels native, responsive, and seamless.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800"
  },
  {
    title: "Ecommerce",
    desc: "Our design team creates stunning, frictionless user experiences for online storefronts that are custom-tailored to convert casual browsers into loyal buyers. We optimize product listing grids, shopping carts, checkout forms, and localized payment flows to reduce cart abandonment and drive sales.",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800"
  },
  {
    title: "Interaction Design",
    desc: "We build dynamic interactive elements to foster meaningful engagement between users and software systems. By prototyping micro-interactions, animated states, and hover effects, we ensure that every action feels satisfying, provides clear feedback, and simplifies the user journey.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
  }
];

const productAccordion = [
  {
    title: "Wearable App Design",
    desc: "Designing compact, glanceable interfaces and context-aware touch controls optimized for smartwatches, fitness trackers, and specialized wearable devices. We prioritize high contrast, quick readability, and battery efficiency to deliver notifications, health telemetry, and status widgets seamlessly.",
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800"
  },
  {
    title: "Applications & Dashboards",
    desc: "Crafting robust data-rich dashboards and complex enterprise SaaS portals that simplify complex analytical datasets. We build customized layouts, filter menus, and export systems to help users find insights instantly, streamline daily workflows, and optimize employee productivity.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
  },
  {
    title: "Human Machine Interface",
    desc: "Our team implements design controls, systems, and hardware-display layouts that make complex machine operations completely effortless. We focus on industrial ergonomics, safety visual standards, and clear feedback loops to ensure seamless, error-free interactions between human operators and industrial hardware.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800"
  }
];

const researchAccordion = [
  {
    title: "User Research",
    desc: "We understand the needs and attitudes of your audience, and incorporate these insights into the design process, to create an experience that resonates with your potential customers. By conducting user interviews, surveys, and persona mapping, we base every layout decision on hard evidence to deliver experiences that resonate with your users.",
    img: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=800"
  },
  {
    title: "Design Audit",
    desc: "Evaluating your existing digital products against usability heuristics and industry compliance standards. We identify conversion bottlenecks, navigation friction points, and visual design inconsistencies, providing a detailed optimization roadmap to upgrade your product.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800"
  },
  {
    title: "Usability Testing",
    desc: "Running structured testing panels with actual users using interactive prototypes to validate workflows before development begins. We measure task completion times, error rates, and user satisfaction to iterate and optimize the system for absolute clarity.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"
  },
  {
    title: "Competitor & Market UX Research",
    desc: "Assessing competitor platforms and current digital standards to uncover strategic opportunities and product differentiators. We map out competitor journeys and feature lists, ensuring your product offers superior UX and stands out in the market.",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800"
  }
];

const faqs = [
  {
    question: "What is experience design, and how does it help my business?",
    answer: "Experience design (XD) is the practice of designing products, processes, and services with a focus on user needs and friction-free interaction. When your system is easy and satisfying to navigate, conversion rates grow, customer support inquiries fall, and brand trust escalates."
  },
  {
    question: "How do you ensure your designs meet my customer’s needs?",
    answer: "We deploy user research loops, customer journey mappings, and qualitative audits at the start. These data points shape low-fidelity wireframes which we continuously test and validate against real user profiles."
  },
  {
    question: "Do you offer user research and testing as part of your experience design services?",
    answer: "Yes, research and usability testing are standard pillars. We combine diagnostic heuristics, A/B prototypes, and observational testing to verify that final designs drive actual commercial results."
  },
  {
    question: "How can experience design help differentiate my business from competitors?",
    answer: "XD creates a competitive moat. If two platforms offer similar services, users consistently choose the one that provides a faster, clearer, and more delightful user interface."
  }
];

// Helper Icons for case studies and engagement model
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

const ClockIcon = () => (
  <svg className="w-8 h-8 text-[#FD7B28]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-8 h-8 text-[#FD7B28]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TagIcon = () => (
  <svg className="w-8 h-8 text-[#FD7B28]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const renderLogo = (cs: any) => {
  if (cs.id === "sweet_protection_ecommerce") {
    return (
      <div className="flex items-center gap-1 font-bold text-lg select-none w-fit font-poppins text-slate-900 tracking-tight h-10">
        <span className="font-extrabold tracking-wider">SWEET</span>
        <span className="font-light text-slate-500">PROTECTION</span>
      </div>
    );
  }
  if (cs.id === "dubai_travel_agency_transformation") {
    return (
      <div className="flex items-center gap-1 font-bold text-lg select-none w-fit font-poppins text-slate-900 tracking-tight h-10">
        <span className="text-[#FD7B28] font-extrabold">DUBAI</span>
        <span className="font-medium text-slate-800">ELITE</span>
      </div>
    );
  }
  if (cs.id === "heavy_machinery_manufacturer") {
    return (
      <div className="flex items-center gap-1 font-bold text-lg select-none w-fit font-poppins text-slate-900 tracking-tight h-10">
        <span className="bg-slate-900 text-white px-2 py-0.5 font-black tracking-tighter">HEAVY</span>
        <span className="font-bold text-slate-900">MACHINERY</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-1 font-bold text-lg select-none w-fit font-poppins text-slate-900 tracking-tight h-10">
      <span className="text-[#FD7B28] font-extrabold">{cs.name.split(" ")[0]}</span>
      {cs.name.split(" ").slice(1).join(" ") && (
        <span className="font-medium text-slate-800">{cs.name.split(" ").slice(1).join(" ")}</span>
      )}
    </div>
  );
};

export default function ExperienceDesignPage() {
  const [activeUiux, setActiveUiux] = useState(0);
  const [activeProduct, setActiveProduct] = useState(2); // Human Machine Interface open by default
  const [activeResearch, setActiveResearch] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll Slider References
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef<boolean>(false);

  const scrollSlider = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = 600; // width of one card
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

      // Combine with local static store
      const combined = [...apiStudies];
      const apiSlugs = new Set(apiStudies.map(cs => cs.slug));
      
      for (const cs of caseStudiesData) {
        if (!apiSlugs.has(cs.slug)) {
          combined.push(cs);
        }
      }

      // Filter out invalid/draft case studies (like pachmarhi or missing images)
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
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      selectedServices: ["Bespoke Experience Design Page inquiry", "Project Details: " + message],
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

  return (
    <div className="bg-white min-h-screen text-slate-900 font-inter selection:bg-orange-500/20">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#0a0710] text-white py-32 md:py-48 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,123,40,0.12)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <span className="text-[#FD7B28] text-xs font-bold uppercase tracking-[0.3em] block mb-6 font-poppins">
              [ Capabilities ]
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[100px] font-extralight tracking-tight leading-none text-white font-poppins mb-6">
              Experience <br />
              <span className="font-normal text-slate-100">Design</span>
            </h1>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-80 h-80 md:w-96 md:h-96"
            >
              <Image
                src="/images/butterfly.png"
                alt="3D Iridescent Butterfly Render"
                fill
                priority
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: 700, suffix: "+", label: "Projects launched successfully across the globe" },
            { value: 10, suffix: "M", label: "Daily customer engagement throughout our projects" },
            { value: 100, suffix: "+", label: "Digital transformation stories that made a difference" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-8 border border-slate-100 hover:border-orange-100 bg-white hover:bg-orange-50/10 transition-all duration-300 rounded-2xl group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-5xl md:text-6xl font-black text-slate-900 group-hover:text-[#FD7B28] transition-colors duration-300 font-poppins tracking-tight">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-slate-500 text-sm font-semibold max-w-xs leading-relaxed font-inter group-hover:text-slate-700 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 flex justify-center">
          <Link
            href="#contact-form-section"
            className="px-8 py-3.5 bg-[#FD7B28] hover:bg-[#ff914d] text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-orange-500/10 flex items-center gap-2 font-poppins"
          >
            Let&apos;s Talk <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 3. WHAT WE OFFER */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mb-6 font-poppins">
            What We Offer
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-[1.8] font-medium font-inter max-w-3xl mx-auto">
            We place user experience at the heart of each design to augment your brand’s interactions. 
            With exceptional attention to detail, an in-depth understanding of user behaviour, 
            and advanced strategies, we build human-centred experiences across every digital platform.
          </p>
        </div>
      </section>

      {/* 4. DYNAMIC INTERACTIVE ACCORDIONS */}
      
      {/* SECTION A: UI/UX Design (Right Image) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 bg-white border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mb-4 font-poppins">
              UI/UX Design
            </h2>
            <p className="text-slate-500 text-sm font-medium mb-12 max-w-md font-inter">
              We focus on crafting personalised and user-centric designs that align seamlessly with your business’s goals and users’ needs.
            </p>
            <div className="flex flex-col border-t border-slate-100 w-full font-poppins">
              {uiuxAccordion.map((item, index) => {
                const isOpen = activeUiux === index;
                return (
                  <div key={item.title} className="border-b border-slate-100 py-5">
                    <button
                      suppressHydrationWarning={true}
                      onClick={() => setActiveUiux(index)}
                      className="flex justify-between items-center text-left w-full group"
                    >
                      <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#FD7B28]' : 'text-slate-400 group-hover:text-slate-700'}`}>
                        {item.title}
                      </span>
                      {isOpen ? <Minus size={18} className="text-[#FD7B28]" /> : <Plus size={18} className="text-slate-400 group-hover:text-[#FD7B28]" />}
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
                          <p className="text-slate-600 text-sm font-medium font-inter mt-3 leading-relaxed max-w-lg">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-6 sticky top-32 h-fit">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeUiux}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={uiuxAccordion[activeUiux]?.img || ""}
                    alt={uiuxAccordion[activeUiux]?.title || ""}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Product Design (Left Image - Alternating) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 bg-white border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 lg:order-2 flex flex-col items-start">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mb-4 font-poppins">
              Product Design
            </h2>
            <p className="text-slate-500 text-sm font-medium mb-12 max-w-md font-inter">
              Obsidian Six helps businesses design engaging digital products, guiding them from inception to execution and ensuring these are highly functional and appealing.
            </p>
            <div className="flex flex-col border-t border-slate-100 w-full font-poppins">
              {productAccordion.map((item, index) => {
                const isOpen = activeProduct === index;
                return (
                  <div key={item.title} className="border-b border-slate-100 py-5">
                    <button
                      suppressHydrationWarning={true}
                      onClick={() => setActiveProduct(index)}
                      className="flex justify-between items-center text-left w-full group"
                    >
                      <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#FD7B28]' : 'text-slate-400 group-hover:text-slate-700'}`}>
                        {item.title}
                      </span>
                      {isOpen ? <Minus size={18} className="text-[#FD7B28]" /> : <Plus size={18} className="text-slate-400 group-hover:text-[#FD7B28]" />}
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
                          <p className="text-slate-600 text-sm font-medium font-inter mt-3 leading-relaxed max-w-lg">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1 sticky top-32 h-fit">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={productAccordion[activeProduct]?.img || ""}
                    alt={productAccordion[activeProduct]?.title || ""}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: UX Research (Right Image) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 bg-white border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 mb-4 font-poppins">
              UX Research
            </h2>
            <p className="text-slate-500 text-sm font-medium mb-12 max-w-md font-inter">
              Our UX research lets you have an in-depth understanding of your users and build exceptional experiences that boost customer engagement.
            </p>
            <div className="flex flex-col border-t border-slate-100 w-full font-poppins">
              {researchAccordion.map((item, index) => {
                const isOpen = activeResearch === index;
                return (
                  <div key={item.title} className="border-b border-slate-100 py-5">
                    <button
                      suppressHydrationWarning={true}
                      onClick={() => setActiveResearch(index)}
                      className="flex justify-between items-center text-left w-full group"
                    >
                      <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#FD7B28]' : 'text-slate-400 group-hover:text-slate-700'}`}>
                        {item.title}
                      </span>
                      {isOpen ? <Minus size={18} className="text-[#FD7B28]" /> : <Plus size={18} className="text-slate-400 group-hover:text-[#FD7B28]" />}
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
                          <p className="text-slate-600 text-sm font-medium font-inter mt-3 leading-relaxed max-w-lg">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-6 sticky top-32 h-fit">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 rounded-2xl border border-slate-100 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeResearch}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={researchAccordion[activeResearch]?.img || ""}
                    alt={researchAccordion[activeResearch]?.title || ""}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CASE STUDIES SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-955 font-poppins">
                Our Experience Design Case Studies
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                suppressHydrationWarning={true}
                onClick={() => scrollSlider("left")}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#FD7B28] hover:text-[#FD7B28] transition-colors shadow-sm"
                aria-label="Previous case study"
              >
                <ArrowLeftIcon />
              </button>
              <button
                suppressHydrationWarning={true}
                onClick={() => scrollSlider("right")}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:border-[#FD7B28] hover:text-[#FD7B28] transition-colors shadow-sm"
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
                  className="w-[320px] md:w-[600px] lg:w-[650px] shrink-0 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[340px] hover:border-orange-100 transition-colors"
                >
                  {/* Left column (Text content) */}
                  <div className="flex-[1.2] p-6 md:p-8 flex flex-col justify-between bg-white">
                    <div className="space-y-4">
                      {/* Brand Logo */}
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
                        className="inline-flex items-center gap-2 px-6 py-3 border border-slate-900 text-slate-900 hover:border-[#FD7B28] hover:text-[#FD7B28] hover:bg-orange-50/5 transition-all text-xs font-bold uppercase tracking-wider font-poppins rounded-none"
                      >
                        Read Case Study <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Right column (Image content) */}
                  <div className="flex-1 relative min-h-[220px] md:min-h-auto bg-slate-50 border-l border-slate-50">
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

      {/* 6. ENGAGEMENT MODEL SECTION */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-955 font-poppins mb-16 max-w-4xl">
            Engagement Model for Experience Design Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="border border-slate-100 hover:border-orange-100 hover:shadow-md transition-all duration-300 p-8 rounded-2xl bg-white flex flex-col justify-between min-h-[480px] group">
              <div className="space-y-6">
                <div className="p-3 bg-slate-50 group-hover:bg-orange-50/50 rounded-xl w-fit transition-colors">
                  <ClockIcon />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 font-poppins">
                  Time &amp; Material Model
                </h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed font-inter">
                  Ideal for projects that need continuous evolution. Submit an initial scope and let&apos;s build a phased plan.
                </p>
              </div>
              <ul className="space-y-4 pt-8 border-t border-slate-50">
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Change the scope as required</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Pay based on the work done</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Work delivered on a sprint basis</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Great cost control</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="border border-slate-100 hover:border-orange-100 hover:shadow-md transition-all duration-300 p-8 rounded-2xl bg-white flex flex-col justify-between min-h-[480px] group">
              <div className="space-y-6">
                <div className="p-3 bg-slate-50 group-hover:bg-orange-50/50 rounded-xl w-fit transition-colors">
                  <UsersIcon />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 font-poppins">
                  Dedicated Team
                </h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed font-inter">
                  Extend your team with remote resources. Get the right matching resource profile based on your needs.
                </p>
              </div>
              <ul className="space-y-4 pt-8 border-t border-slate-50">
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Hour-based payment</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Quick resource replacement</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Daily Commitment</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Guaranteed work hours</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="border border-slate-100 hover:border-orange-100 hover:shadow-md transition-all duration-300 p-8 rounded-2xl bg-white flex flex-col justify-between min-h-[480px] group">
              <div className="space-y-6">
                <div className="p-3 bg-slate-50 group-hover:bg-orange-50/50 rounded-xl w-fit transition-colors">
                  <TagIcon />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 font-poppins">
                  Fixed Price Model
                </h3>
                <p className="text-slate-500 text-sm font-semibold leading-relaxed font-inter">
                  Choose this model if your project has a fixed scope. Submit the project&apos;s initial scope to build a phase plan.
                </p>
              </div>
              <ul className="space-y-4 pt-8 border-t border-slate-50">
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Fixed scope of work</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Work delivered on a milestone basis</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Fixed timeline</span>
                </li>
                <li className="flex items-start gap-3 text-sm font-semibold text-slate-600 font-inter">
                  <CheckIcon />
                  <span>Pay per target</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tight text-slate-950 mb-12 font-poppins">
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
                    <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-[#FD7B28]' : 'text-slate-900 group-hover:text-[#FD7B28]'}`}>
                      {faq.question}
                    </span>
                    {isOpen ? <Minus size={18} className="text-[#FD7B28]" /> : <Plus size={18} className="text-slate-400 group-hover:text-[#FD7B28]" />}
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
              className="px-6 py-2.5 border border-[#FD7B28] text-[#FD7B28] hover:bg-orange-50/40 text-xs font-bold uppercase tracking-wider transition-colors font-poppins"
            >
              Show more
            </button>
          </div>
        </div>
      </section>

      {/* 8. BESPOKE CONTACT FORM SECTION */}
      <section id="contact-form-section" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 leading-tight font-poppins">
                Create Seamless User Journeys with Our Bespoke Experience Design Services
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed font-inter">
                Every user interaction is a doorway to impressing your customers and helping your business thrive. 
                With Obsidian Six at your service, we design, create, and deliver unparalleled experiences that improve your brand value.
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
                      Founder & Growth Strategist
                    </p>
                    <a
                      href="https://www.linkedin.com/in/aadarsh-k-3b44a1170/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#FD7B28] mt-2 transition-colors"
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
                    <CheckCircle2 className="w-16 h-16 text-[#FD7B28] mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-2 font-poppins">Message Sent!</h2>
                    <p className="text-slate-500 text-base mb-6 font-inter">
                      Our strategy team will review your details and reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#FD7B28] font-bold uppercase tracking-widest text-xs hover:underline font-poppins"
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
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#FD7B28] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white"
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
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#FD7B28] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white"
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
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#FD7B28] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white"
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
                            inputClass="!w-full !border !border-[#C3C3C3] !pl-[52px] !pr-4 !py-3 !text-sm md:!text-base !outline-none !rounded-none focus:!border-[#FD7B28] !font-inter !h-14 bg-white"
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
                        className="w-full border border-[#C3C3C3] p-4 text-sm md:text-base outline-none focus:border-[#FD7B28] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-44 resize-none bg-white"
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
                        className="px-10 py-4 bg-black text-white hover:bg-[#FD7B28] transition-colors flex items-center gap-3 font-semibold text-xs uppercase tracking-widest rounded-none disabled:opacity-50 font-poppins"
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
