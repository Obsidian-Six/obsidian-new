"use client";
import { motion } from "framer-motion";


const storyCards = [
  {
    id: "purpose",
    title: "Our Purpose",
    description: "Crafting experiences that change the way your customers feel about your business.",
    imgUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "team",
    title: "Our Team",
    description: "Holistic leadership, holistic growth! A team of visionaries connected by shared commitments for a unified vision.",
    imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "awards",
    title: "Awards & Recognitions",
    description: "Our ambition is fueled by your compliments, inspiring us to push the limits and deliver something extraordinary.",
    imgUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "brands",
    title: "Our Brands",
    description: "We are one, but we are many! Transform your digital footprint with scalable and result-driven all-in-one solutions.",
    imgUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
  }
];

export default function OurStory() {
  return (
    <section className="w-full py-24 md:py-32 px-6 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-24"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#024787] font-medium block mb-6">
            02 // Background
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-slate-950 mb-8 tracking-tight leading-tight">
            Our Story
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl leading-relaxed font-normal">
            Started from a small town in MP — <span className="font-bold text-slate-900">Obsidian Six</span> helps brands in 
            <span className="italic font-serif text-slate-500"> USA, UAE, Germany, Russia, Australia,</span> and 50+ countries 
            to grow faster in the market.
          </p>
        </motion.div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {storyCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <div className="w-full aspect-[16/8] overflow-hidden mb-8 rounded-2xl bg-slate-200 shadow-sm">
                <img 
                  src={card.imgUrl} 
                  alt={card.title} 
                  className="w-full h-full object-cover duration-1000 hover:grayscale-0"
                />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-bold text-[#024787] font-mono">0{index + 1}</span>
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-[0.1em] group-hover:text-[#024787] transition-colors">
                  {card.title}
                </h3>
              </div>
              
              <p className="text-slate-600 leading-relaxed font-normal text-sm md:text-base max-w-sm">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}