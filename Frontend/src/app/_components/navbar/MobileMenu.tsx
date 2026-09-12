"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceItem {
  name: string;
  slug: string;
}

interface Category {
  title: string;
  items: ServiceItem[];
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const mainNavItems = [
    { name: "Works", link: "/case-studies" },
    { name: "About Us", link: "/aboutus" },
    { name: "Blogs", link: "/blogs" },
    { name: "AI Audit", link: "/uae-ai-marketing-audit.html" },
  ];

  const categories: Category[] = [
    {
      title: "Branding",
      items: [
        {
          name: "Brand Consulting",
          slug: "brand-consulting",
        },
        {
          name: "Logo Design",
          slug: "logo-design",
        },
        {
          name: "Industrial / Product Design",
          slug: "industrial-product-design",
        },
        {
          name: "Graphic Design",
          slug: "graphic-design",
        },
        {
          name: "2D / 3D Visualisation",
          slug: "2d-3d-visualisation",
        },
      ],
    },
    {
      title: "Technology",
      items: [
        {
          name: "AI & Machine Learning",
          slug: "ai-machine-learning",
        },
        {
          name: "DevOps Consulting",
          slug: "devops-consulting",
        },
        {
          name: "Data & Analytics",
          slug: "data-analytics",
        },
        {
          name: "Web Development",
          slug: "web-development",
        },
        {
          name: "Mobile App Development",
          slug: "mobile-app-development",
        },
        {
          name: "E-commerce",
          slug: "e-commerce",
        },
        {
          name: "Quality Assurance & Testing",
          slug: "quality-assurance-testing",
        },
      ],
    },
    {
      title: "Digital Marketing",
      items: [
        {
          name: "Search Engine Optimisation",
          slug: "search-engine-optimisation",
        },
        {
          name: "Social Media Management",
          slug: "social-media-management",
        },
        {
          name: "Performance Marketing",
          slug: "performance-marketing",
        },
        {
          name: "Content Marketing",
          slug: "content-marketing",
        },
        {
          name: "Marketing Automation",
          slug: "marketing-automation",
        },
        {
          name: "Analytics",
          slug: "analytics",
        },
      ],
    },
  ];

  const toggleCategory = (index: number) => {
    setOpenCategory((prev) => (prev === index ? null : index));
  };

  const handleClose = () => {
    setIsServicesOpen(false);
    setOpenCategory(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[115] flex h-[100dvh] w-full flex-col overflow-hidden bg-white lg:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100 shrink-0">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center h-full"
            >
              <Image
                src="/images/logo/logo2.png"
                width={120}
                height={36}
                className="h-9 w-auto"
                alt="Logo"
                priority
              />
            </Link>
            {/* The close button is rendered as an overlay by nav-menu-toggler.tsx */}
            <div className="w-8 h-8" />
          </div>

          {/* Navigation */}
          <div
            data-mobile-menu-scroll
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 md:py-6"
          >
            <nav className="flex w-full flex-col">
              {/* SERVICES */}
              <div className="w-full border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsServicesOpen((prev) => !prev);
                    setOpenCategory(null);
                  }}
                  className="flex w-full items-center justify-between py-4 text-xl font-poppins font-medium tracking-tight text-[#19183A] transition-colors hover:text-[#052D69] focus:outline-none md:py-5"
                >
                  <span>Services</span>

                  {isServicesOpen ? (
                    <IoChevronUp className="text-lg text-slate-400" />
                  ) : (
                    <IoChevronDown className="text-lg text-slate-400" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isServicesOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      {/* Explore Services */}
                      <Link
                        href="/services"
                        onClick={handleClose}
                        className="block border-b border-slate-100 px-4 py-3 text-base font-poppins font-medium text-[#052D69]"
                      >
                        Explore Services
                      </Link>

                      {/* CATEGORIES */}
                      <div className="mb-3 mt-2 rounded-lg bg-slate-50/70 px-4">
                        {categories.map((category, index) => {
                          const isCategoryOpen = openCategory === index;

                          return (
                            <div
                              key={category.title}
                              className="border-b border-slate-200/70 last:border-b-0"
                            >
                              {/* Category */}
                              <button
                                type="button"
                                onClick={() => toggleCategory(index)}
                                className="flex w-full items-center justify-between py-4 text-left font-poppins text-base font-medium text-[#19183A] transition-colors hover:text-[#052D69] focus:outline-none"
                              >
                                <span>{category.title}</span>

                                {isCategoryOpen ? (
                                  <IoChevronUp className="text-base text-slate-400" />
                                ) : (
                                  <IoChevronDown className="text-base text-slate-400" />
                                )}
                              </button>

                              {/* SERVICES INSIDE CATEGORY */}
                              <AnimatePresence initial={false}>
                                {isCategoryOpen && (
                                  <motion.div
                                    initial={{
                                      height: 0,
                                      opacity: 0,
                                    }}
                                    animate={{
                                      height: "auto",
                                      opacity: 1,
                                    }}
                                    exit={{
                                      height: 0,
                                      opacity: 0,
                                    }}
                                    transition={{
                                      duration: 0.2,
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pb-2">
                                      {category.items.map((item) => (
                                        <Link
                                          key={item.slug}
                                          href={`/services/${item.slug}`}
                                          onClick={handleClose}
                                          className="block border-b border-slate-100/80 py-3 pl-3 text-sm font-poppins font-normal text-slate-600 transition-colors last:border-b-0 hover:text-[#052D69]"
                                        >
                                          {item.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* OTHER NAV ITEMS */}
              {mainNavItems.map((item) => (
                <div
                  key={item.name}
                  className="w-full border-b border-slate-100"
                >
                  <Link
                    href={item.link}
                    onClick={handleClose}
                    className="block py-4 text-xl font-poppins font-medium tracking-tight text-[#19183A] transition-colors hover:text-[#052D69] md:py-4"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="pb-6 pt-8">
              <Link
                href="/contactus"
                onClick={handleClose}
                className="block w-full rounded-none bg-[#052D69] py-4 text-center font-poppins font-semibold tracking-wide text-white transition-colors hover:bg-blue-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
