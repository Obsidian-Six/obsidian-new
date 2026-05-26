"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type {
  TemplateCaseStudy,
  CaseStudyChallengePoint,
} from "@/lib/models/case-study.types";

export default function ChallengeSection({
  data,
}: {
  data: TemplateCaseStudy; // This is the full case study object from your JSON
}) {
  // Safety check to prevent the destructure error
  if (!data || !data.challenge) return null;

  const { challenge, ChallengeVideo } = data;

  return (
    <section className="relative bg-white overflow-hidden py-32 md:py-48">
      {/* Subtle Architectural Grid Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/[0.03] hidden lg:block" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Header Section */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <span className="text-black font-bold tracking-[0.6em] uppercase text-[10px] block mb-8">
              02 — The Objectives
            </span>
            <h2 className="text-6xl md:text-[7rem] font-light text-black tracking-tighter leading-none uppercase mb-12">
              The <span className=" font-serif text-black/30">Challenge</span>
            </h2>

            <p className="text-3xl md:text-5xl font-light text-black leading-[1.15] tracking-tight max-w-5xl">
              {challenge.data}
            </p>
          </motion.div>
        </div>

        {/* Images Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 items-center"
        >
          <div className="flex justify-center">
            {challenge.image1 && (
              <Image
                src={challenge.image1}
                alt="Industry Problems"
                width={1200}
                height={800}
                unoptimized
                className="w-full h-auto object-contain"
              />
            )}
          </div>
          <div className="flex justify-center">
            {challenge.image2 && (
              <Image
                src={challenge.image2}
                alt="Project Visual"
                width={1200}
                height={800}
                unoptimized
                className="w-full h-auto object-contain shadow-2xl"
              />
            )}
          </div>
        </motion.div>

        {/* Full Screen Video Section */}
        {ChallengeVideo && ChallengeVideo.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mb-24 overflow-hidden rounded-sm"
          >
            <video
              src={ChallengeVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto max-h-[80vh] object-cover shadow-2xl"
            />
          </motion.div>
        )}

        {/* Challenge Points */}
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-10 lg:col-start-2 space-y-4">
            {challenge.point.map((point: CaseStudyChallengePoint, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between p-10 bg-[#fafafa] hover:bg-black transition-all duration-500 border border-black/5 rounded-sm overflow-hidden">
                  <div className="flex items-center gap-12 lg:col-span-5">
                    <span className="text-black/20 font-serif italic text-2xl group-hover:text-white/20 transition-colors">
                      0{index + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-light text-black group-hover:text-white transition-colors tracking-tight">
                      {point.name}
                    </h3>
                  </div>

                  <div className="mt-4 md:mt-0 md:max-w-md lg:max-w-xl">
                    <p className="text-lg text-black/50 group-hover:text-white/60 font-light transition-colors leading-relaxed">
                      {point.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}