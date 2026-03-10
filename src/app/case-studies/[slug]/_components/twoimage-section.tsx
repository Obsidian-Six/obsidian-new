"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Transition } from "framer-motion";


interface ProjectData {
    brandName: string;
    logoText: string;
    accentColor: string;
    leftPanel: {
        bgImage: string;
        topLabel: string;
        bottomLabel: string;
    };
    rightPanel: {
        bgImage: string;
    };
}

const premiumTransition: Transition = {
    ease: [0.19, 1, 0.22, 1],
    duration: 1.8,
};

export default function PremiumImageShowcase({ data }: { data: ProjectData }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Extremely subtle movement for a "Premium" feel
    const yLeft = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
    const yRight = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.section
            ref={containerRef}
            style={{ opacity }}
            className="relative w-full h-screen bg-white flex items-center justify-center p-4 md:p-10"
        >
            <div className="w-full h-full max-w-[1800px] flex flex-col md:flex-row gap-4">

                {/* --- LEFT PANEL: THE VISUAL IMPACT --- */}
                <motion.div
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={premiumTransition}
                    className="relative flex-1 h-full overflow-hidden group"
                >
                    <motion.div style={{ y: yLeft }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                        <Image
                            src={data.leftPanel.bgImage}
                            alt="Project Visual"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            priority
                        />
                    </motion.div>

                    {/* Subtle Overlay for Branding */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-10 flex flex-col justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-[1px] bg-white/50" />
                            <span className="text-[10px] tracking-[0.6em] text-white/70 uppercase font-medium">{data.leftPanel.topLabel}</span>
                        </div>

                        <div className="flex justify-between items-end">
                            <h3 className="text-white font-black text-2xl italic tracking-tighter">
                                {data.brandName}<span style={{ color: data.accentColor }}>.</span>
                            </h3>
                            <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase">{data.leftPanel.bottomLabel}</span>
                        </div>
                    </div>
                </motion.div>

                {/* --- RIGHT PANEL: THE PREMIUM MASK REVEAL --- */}
                <motion.div
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                    transition={{ ...premiumTransition, delay: 0.2 }} // Custom cubic-bezier for snappy yet smooth motion
                    className="relative flex-1 h-full overflow-hidden bg-white/5 border border-white/5"
                >
                    {/* Parallax Container
     yRight moves this div opposite to the scroll direction.
     Sizes are slightly larger than the container for bleed.
  */}
                    <motion.div
                        style={{ y: yRight }}
                        className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%] will-change-transform"
                    >
                        <Image
                            src={data.rightPanel.bgImage}
                            alt="Premium Project Showcase"
                            fill
                            className="object-cover transition-all duration-1000 ease-out hover:scale-110" // Subtle scale on hover
                            sizes="50vw"
                            priority // Ensures image preloads
                        />
                    </motion.div>

                    {/* OPTIONAL: Subtle corner texture to emphasize the premium feel */}
                    <div className="absolute top-10 right-10">
                        <div style={{ color: data.accentColor }} className="text-sm font-mono opacity-30">01 // VISUAL</div>
                    </div>
                </motion.div>

            </div>
        </motion.section>
    );
}