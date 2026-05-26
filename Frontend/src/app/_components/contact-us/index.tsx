"use client";
import { PiPhoneCall } from "react-icons/pi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactForm from "./contact-form";
import ClientTicker from "./ClientTicker";

const ContactUs = () => {
  return (
    // Changed pt-0 to pt-10 to give space on mobile, added overflow-visible
    <section id="contactUs" className="relative pt-0 pb-0 md:pb-20 bg-white overflow-visible">

      {/* --- TIGHTENED CLIENT TICKER --- */}
      <div className="mb-8 md:mb-12 border-y border-gray-50 py-2 bg-gray-50/20">
        <div className="max-w-6xl mx-auto px-6">
          
          <ClientTicker />
        </div>
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 text-left">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[#024787] font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block font-medium"
        >
          [ Contact Us ]
        </motion.span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl leading-none font-light text-slate-950 tracking-tighter">
          Let&apos;s Construct <br className="hidden md:block" />
          <span className="text-[#024787] italic font-serif">Future.</span>
        </h2>
        <p className="text-gray-400 mt-6 max-w-md uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-bold">
          Ready to scale? Drop us a line.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

        {/* Contact Details Side */}
        {/* Removed 'fixed' related logic for mobile - now it flows naturally */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <div className="lg:sticky lg:top-32 space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">

              {/* Call */}
              <address className="not-italic group flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-transparent hover:border-gray-100 transition-all shadow-sm lg:shadow-none">
                <div className="bg-white p-3 rounded-xl shadow-sm  group-hover:text-[#024787] transition-colors">
                  <PiPhoneCall className="text-xl" />
                </div>
                <div>
                  <h3 className="text-[8px] uppercase font-bold tracking-widest text-gray-400">Call Us</h3>
                  <Link href="tel:+918085652729" className="text-sm hover:text-orange-400 font-bold tracking-tight text-slate-900">
                    +91 80856 52729
                  </Link>
                </div>
              </address>

              {/* Email */}
              <address className="not-italic group flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-transparent hover:border-gray-100 transition-all shadow-sm lg:shadow-none">
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:text-[#024787] transition-colors">
                  <MdOutlineMailOutline className="text-xl" />
                </div>
                <div>
                  <h3 className="text-[8px] uppercase font-bold tracking-widest text-gray-400">Mail Us</h3>
                  <Link href="mailto:info@obsidiansix.com" className="text-sm hover:text-orange-400 font-bold tracking-tight text-slate-900 break-all">
                    info@obsidiansix.com
                  </Link>
                </div>
              </address>

              {/* Instagram */}
              <address className="not-italic group flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-transparent hover:border-gray-100 transition-all shadow-sm lg:shadow-none">
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:text-[#024787] transition-colors">
                  <RiInstagramLine className="text-xl" />
                </div>
                <div>
                  <h3 className="text-[8px] uppercase font-bold tracking-widest text-gray-400">Socials</h3>
                  <Link href="https://www.instagram.com/obsidiansixofficial?igsh=MTZobmdwczNvMHkxeg%3D%3D&utm_source=qr" className="text-sm hover:text-orange-400 font-bold tracking-tight text-slate-900">
                    @obsidiansix
                  </Link>
                </div>
              </address>

              {/* Location */}
              <address className="not-italic group flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-transparent hover:border-gray-100 transition-all shadow-sm lg:shadow-none">
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:text-[#024787] transition-colors">
                  <GrLocation className="text-xl" />
                </div>
                <div>
                  <h3 className="text-[8px] uppercase font-bold tracking-widest text-gray-400">HQ</h3>
                  <p className="text-sm font-bold tracking-tight leading-tight text-slate-900">
                    Mumbai, India
                  </p>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Form Container */}
        {/* order-1 on mobile so the form comes first, which is better UX */}
        <div className="lg:col-span-8 order-1 lg:order-2 bg-white border border-gray-100 p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2rem]">
          <ContactForm />
        </div>

      </div>
    </section>
  );
};

export default ContactUs;