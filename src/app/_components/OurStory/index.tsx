"use client";
import React from "react";
import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
// Import Lato for strict font application
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const storyCards = [
  {
    id: "purpose",
    title: "Our Purpose",
    description: "Crafting experiences that change the way your customers feel about your business.",
    imgUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    link: "/purpose",
  },
  {
    id: "team",
    title: "Our Team",
    description: "Holistic leadership, holistic growth! A team of visionaries connected by shared commitments for a unified vision.",
    imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    link: "/team",
  },
  {
    id: "awards",
    title: "Awards & Recognitions",
    description: "Our ambition is fueled by your compliments, inspiring us to push the limits and deliver something extraordinary.",
    imgUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    link: "/awards",
  },
  {
    id: "brands",
    title: "Our Brands",
    description: "We are one, but we are many! Transform your digital footprint with scalable and result-driven all-in-one solutions.",
    imgUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
    link: "/brands",
  }
];

export default function OurStory() {
  return (
    <section className={`${lato.className} w-full  py-24 px-6`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-[64px] font-black text-slate-950 mb-8 tracking-tight">
            Our Story
          </h2>
          <p className="text-base md:text-xl text-slate-800 max-w-4xl mx-auto leading-relaxed font-normal">
            Started from a small town in MP — <span className="font-bold">Obsidian Six</span> helps brands in 
            <span className="italic text-slate-600"> USA, UAE, Germany, Russia, Australia,</span> and 50+ countries 
            to grow faster in the market and grab brand new opportunities. <br className="hidden md:block"/>
            Our story is worth a good read!
          </p>
        </motion.div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {storyCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <div className="w-full h-28 md:h-32 overflow-hidden mb-6 rounded-sm bg-slate-50">
                <img 
                  src={card.imgUrl} 
                  alt={card.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {card.title}
              </h3>
              
              <p className="text-slate-700 leading-relaxed font-normal text-[16px] mb-4 flex-grow">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}