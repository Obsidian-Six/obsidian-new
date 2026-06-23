"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus, CheckCircle2, Loader2, Linkedin } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { handleContactUsFormSubmission } from "@/lib/services/contact.api";

// Accordion Content Definitions
const uiuxAccordion = [
  {
    title: "UI/UX Design",
    desc: "We focus on crafting personalised and user-centric designs that align seamlessly with your business’s goals and users’ needs.",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800"
  },
  {
    title: "Website Design",
    desc: "Our experts design advanced user-friendly websites that make your business stand out, attract customers and drive results.",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800"
  },
  {
    title: "Mobile Design",
    desc: "We let you design user interfaces and experiences for mobile devices with a key focus on superior accessibility and efficiency.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800"
  },
  {
    title: "Ecommerce",
    desc: "Our team creates stunning user experiences for your storefronts with superior UI/UX design tailored to meet your customers’ diverse requirements.",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800"
  },
  {
    title: "Interaction Design",
    desc: "We build interactive elements to foster meaningful engagement between users and systems, enhance usability, and deliver intuitive experiences.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
  }
];

const productAccordion = [
  {
    title: "Wearable App Design",
    desc: "Designing custom visual systems and touch controls for smartwatches and other wearable devices to deliver notifications and fitness metrics seamlessly.",
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800"
  },
  {
    title: "Applications & Dashboards",
    desc: "Creating complex enterprise software dashboards and analytical CRM tools that simplify large datasets and elevate day-to-day employee performance.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
  },
  {
    title: "Human Machine Interface",
    desc: "Our team implements design controls, systems, and displays that make complex machine operations effortless, ensuring seamless interactions between humans and machines.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800"
  }
];

const researchAccordion = [
  {
    title: "User Research",
    desc: "We understand the needs and attitudes of your audience, and incorporate these insights into the design process, to create an experience that resonates with your potential customers.",
    img: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=800"
  },
  {
    title: "Design Audit",
    desc: "Auditing current digital products against heuristics to find visual inconsistencies, accessibility roadblocks, and performance leaks.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800"
  },
  {
    title: "Usability Testing",
    desc: "Conducting user testing panels with functional prototypes to benchmark completion rates and iterate based on direct feedback.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"
  },
  {
    title: "Competitor & Market UX Research",
    desc: "Examining competitor interfaces and global usability trends to build a strategic feature set that elevates your product's positioning.",
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

export default function ExperienceDesignPage() {
  const [activeUiux, setActiveUiux] = useState(0);
  const [activeProduct, setActiveProduct] = useState(2); // Human Machine Interface open by default
  const [activeResearch, setActiveResearch] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <Image
                src="/images/butterfly.png"
                alt="3D Iridescent Butterfly Render"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left items-end">
          <div className="space-y-3">
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-poppins">700+</h3>
            <p className="text-slate-500 text-sm font-semibold max-w-xs leading-relaxed font-inter">
              Projects launched successfully across the globe
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-poppins">10M</h3>
            <p className="text-slate-500 text-sm font-semibold max-w-xs leading-relaxed font-inter">
              Daily customer engagement throughout our projects
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-poppins">100+</h3>
            <p className="text-slate-500 text-sm font-semibold max-w-xs leading-relaxed font-inter">
              Digital transformation stories that made a difference
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 flex justify-center">
          <Link
            href="#contact-form-section"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md shadow-blue-500/10 flex items-center gap-2 font-poppins"
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
                      onClick={() => setActiveUiux(index)}
                      className="flex justify-between items-center text-left w-full group"
                    >
                      <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-black' : 'text-slate-400 group-hover:text-slate-700'}`}>
                        {item.title}
                      </span>
                      {isOpen ? <Minus size={18} className="text-slate-600" /> : <Plus size={18} className="text-slate-400" />}
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
                      onClick={() => setActiveProduct(index)}
                      className="flex justify-between items-center text-left w-full group"
                    >
                      <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-black' : 'text-slate-400 group-hover:text-slate-700'}`}>
                        {item.title}
                      </span>
                      {isOpen ? <Minus size={18} className="text-slate-600" /> : <Plus size={18} className="text-slate-400" />}
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
                      onClick={() => setActiveResearch(index)}
                      className="flex justify-between items-center text-left w-full group"
                    >
                      <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-black' : 'text-slate-400 group-hover:text-slate-700'}`}>
                        {item.title}
                      </span>
                      {isOpen ? <Minus size={18} className="text-slate-600" /> : <Plus size={18} className="text-slate-400" />}
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

      {/* 5. FAQ SECTION */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tight text-slate-950 mb-12 font-poppins">
            FAQ
          </h2>
          <div className="flex flex-col border-t border-slate-200 w-full mb-10">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-slate-200 py-6">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex justify-between items-center text-left w-full group"
                  >
                    <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-blue-600 font-semibold' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>
                    {isOpen ? <Minus size={18} className="text-blue-600" /> : <Plus size={18} className="text-slate-400 group-hover:text-slate-900" />}
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
                        <p className="text-slate-600 text-sm font-medium font-inter mt-4 leading-relaxed max-w-3xl">
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
              onClick={() => alert("Check back later for more FAQs!")}
              className="px-6 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold uppercase tracking-wider transition-colors font-poppins"
            >
              Show more
            </button>
          </div>
        </div>
      </section>

      {/* 6. BESPOKE CONTACT FORM SECTION */}
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
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                      alt="Anoop K Joseph"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight font-poppins">
                      Anoop K Joseph
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5 font-inter">
                      Global Sales Head
                    </p>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-600 mt-2 transition-colors"
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
                    <CheckCircle2 className="w-16 h-16 text-[#024787] mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-2 font-poppins">Message Sent!</h2>
                    <p className="text-slate-500 text-base mb-6 font-inter">
                      Our strategy team will review your details and reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#024787] font-bold uppercase tracking-widest text-xs hover:underline font-poppins"
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
                          required
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white"
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
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white"
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
                          required
                          className="w-full border border-[#C3C3C3] px-4 py-3 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-14 bg-white"
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
                            inputClass="!w-full !border !border-[#C3C3C3] !pl-[52px] !pr-4 !py-3 !text-sm md:!text-base !outline-none !rounded-none focus:!border-[#024787] !font-inter !h-14 bg-white"
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
                        required
                        maxLength={1000}
                        className="w-full border border-[#C3C3C3] p-4 text-sm md:text-base outline-none focus:border-[#024787] transition-all rounded-none placeholder:text-[#A3A3A3] font-inter h-44 resize-none bg-white"
                        id="tell-us-more"
                        placeholder="Brief about your project"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    {/* Send Enquiry Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 bg-black text-white hover:bg-slate-900 transition-colors flex items-center gap-3 font-semibold text-xs uppercase tracking-widest rounded-none disabled:opacity-50 font-poppins"
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
