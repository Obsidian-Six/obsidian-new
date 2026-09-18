// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { X, CheckCircle2, Loader2, Sparkles } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// import { handleContactUsFormSubmission } from "@/lib/services/contact.api";
// import type Contact from "@/lib/models/contact.types";

// interface ContactPopupProps {
//   isOpen?: boolean;
//   onClose?: () => void;
//   defaultService?: string;
// }

// const services = [
//   "Branding & Identity",
//   "Web Development",
//   "Social Media Marketing",
//   "E-Commerce Solutions",
//   "Digital Marketing",
//   "UI/UX & Graphics",
//   "Performance Marketing",
//   "Custom Web Applications",
//   "Others",
// ];

// const clientLogos = [
//   "AB.png", "swiggy.png", "matoshree.png", "BB.png", "nidan.png", "tb.png",
//   "khoshnaw.png", "kotak.png", "lt.png"
// ];

// const ContactPopup = ({ isOpen: controlledIsOpen, onClose, defaultService }: ContactPopupProps) => {
//   const [internalIsOpen, setInternalIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     service: ""
//   });

//   // Calculate final visibility state
//   const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

//   // 1. SCROLL LOCK: Prevents background scrolling when popup is active
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => { document.body.style.overflow = "unset"; };
//   }, [isOpen]);

//   useEffect(() => {
//     if (defaultService) {
//       setFormData((prev) => ({ ...prev, service: defaultService }));
//     }
//   }, [defaultService]);

//   // 2. AUTO-TIMER: Only runs if no manual control is passed
//  useEffect(() => {
//   if (controlledIsOpen !== undefined) return;

//   const timer = setTimeout(() => {
//     setInternalIsOpen(true);
//   }, 5000);

//   return () => clearTimeout(timer);
// }, [controlledIsOpen]);

//   const handleClose = () => {
//     if (onClose) {
//       onClose();
//     } else {
//       setInternalIsOpen(false);
//     }
//   };

//   const onFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const nameParts = formData.fullName.trim().split(/\s+/);
//     const firstName = nameParts[0] || "";
//     const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

//     const contactData: Contact = {
//       firstName,
//       lastName,
//       email: formData.email,
//       phone: formData.phone,
//       selectedServices: [formData.service],
//       companyName: "Popup Lead",
//       companyWebsite: "",
//     };

//     try {
//       await handleContactUsFormSubmission(contactData);
//       setIsSubmitted(true);
//       setTimeout(() => handleClose(), 3000);
//     } catch (error) {
//       console.error("Submission failed:", error);
//       alert("Something went wrong. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputStyles = "w-full bg-white border border-slate-200 p-2.5 md:p-3.5 text-sm md:text-base font-medium text-slate-900 outline-none focus:border-[#052D69] focus:ring-4 focus:ring-[#052D69]/5 transition-all rounded-none placeholder:text-slate-400 appearance-none shadow-sm";
//   const labelStyles = "text-[10px] md:text-[11px] uppercase font-bold tracking-[0.1em] text-slate-500 ml-1 mb-1.5 block";
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 md:p-4">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={handleClose}
//             className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
//           />

//           <motion.div
//             initial={{ scale: 0.95, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.95, opacity: 0, y: 20 }}
//             className="relative w-full max-w-5xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col md:flex-row max-h-[95vh] md:min-h-[650px]"
//           >
//             {/* LEFT PANEL - LIGHT VERSION */}
//             <div className="hidden md:flex md:w-[40%] bg-slate-50 border-r border-slate-100 p-12 flex-col justify-between relative overflow-hidden">
//               {/* Decorative background circle */}
//               <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#086ddd]/5 rounded-full blur-3xl" />

//               <div className="relative z-10">
//                 <div className="inline-flex items-center gap-2 bg-[#086ddd]/10 text-[#052D69] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-8">
//                   <Sparkles size={12} /> Trusted Partners
//                 </div>
//                 <div className="grid grid-cols-3 gap-6 items-center opacity-70">
//                   {clientLogos.slice(0, 9).map((logo, idx) => (
//                     <div key={idx} className="relative h-14 w-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
//                       <Image
//                         src={`/our-client/${logo}`}
//                         alt="Client Logo"
//                         fill
//                         className="object-contain"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-10 relative z-10">
//                 {[
//                   { label: "Projects Delivered", value: "150+" },
//                   { label: "Years Experience", value: "6+" },
//                   { label: "Client Satisfaction", value: "99%" }
//                 ].map((stat, i) => (
//                   <div key={i} className="group">
//                     <h3 className="text-4xl font-bold text-slate-900 tracking-tight group-hover:text-[#052D69] transition-colors">{stat.value}</h3>
//                     <p className="text-[11px] uppercase font-bold text-slate-400 tracking-[0.15em] mt-1">{stat.label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RIGHT PANEL: The Form */}
//             <div className="w-full md:w-[60%] p-6 md:p-16 flex flex-col justify-center relative bg-white overflow-y-auto">
//               <div
//                 onClick={handleClose}
//                 role="button"
//                 className="absolute top-6 right-6 p-2 hover:bg-slate-100/50 rounded-full transition-all z-50 text-black cursor-pointer"
//               >
//                 <X size={24} />
//               </div>

//               <AnimatePresence mode="wait">
//                 {!isSubmitted ? (
//                   <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                     <div className="mb-8 md:mb-10">
//                       <h3 className="text-2xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
//                         Let’s Build <br />
//                         <span className="text-[#052D69]">Something Great.</span>
//                       </h3>
//                       <p className="text-slate-500 font-medium mt-3 text-sm md:text-lg">
//                         Tell us about your project and get a custom strategy.
//                       </p>
//                     </div>

//                     <form className="space-y-4 md:space-y-6" onSubmit={onFormSubmit}>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                           <label className={labelStyles}>Full Name</label>
//                           <input className={inputStyles} placeholder="John Doe" required onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
//                         </div>
//                         <div>
//                           <label className={labelStyles}>Work Email</label>
//                           <input className={inputStyles} type="email" placeholder="hello@company.com" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//                         </div>
//                       </div>

//                       <div className="relative">
//                         <label className={labelStyles}>Service Required</label>
//                         <div className="relative">
//                           <select
//                             className={`${inputStyles} cursor-pointer pr-10`}
//                             required
//                             value={formData.service}
//                             onChange={(e) => setFormData({ ...formData, service: e.target.value })}
//                           >
//                             <option value="" disabled>Select a service...</option>
//                             {services.map(s => <option key={s} value={s}>{s}</option>)}
//                           </select>
//                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
//                             <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                           </div>
//                         </div>
//                       </div>

//                       <div>
//                         <label className={labelStyles}>Phone Number</label>
//                         <PhoneInput
//                           country={"in"}
//                           enableSearch={true}
//                           containerClass="!w-full"
//                           inputClass="!w-full !h-[50px] md:!h-[56px] !bg-white !border-slate-200 !rounded-none !text-slate-900 !font-medium !pl-14 !text-sm md:!text-base !shadow-sm focus:!border-[#052D69] focus:!ring-4 focus:!ring-[#052D69]/5"
//                           buttonClass="!border-slate-200 !rounded-none !bg-slate-50 !w-12"
//                           dropdownClass="!rounded-none !shadow-2xl !border-slate-100"
//                           onChange={(phone: string) => setFormData({ ...formData, phone })}
//                         />
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full bg-[#052D69] text-white font-bold text-sm md:text-lg py-4 md:py-5 rounded-none shadow-[0_12px_24px_-8px_rgba(96,0,255,0.4)] hover:shadow-[0_12px_32px_-8px_rgba(96,0,255,0.6)] transition-all flex items-center justify-center gap-3 transform active:scale-[0.98] hover:-translate-y-1 os-btn-slide"
//                       >
//                         {isSubmitting ? <><Loader2 className="animate-spin size-5" /> Processing...</> : "Claim Your Free Strategy →"}
//                       </button>
//                     </form>
//                   </motion.div>
//                 ) : (
//                   <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
//                     <div className="w-20 h-20 md:w-28 md:h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                       <CheckCircle2 size={48} className="md:size-16" />
//                     </div>
//                     <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Sent Successfully!</h3>
//                     <p className="text-slate-500 font-medium mt-4 text-base md:text-xl px-4">Our strategy team will reach out to you within 24 hours.</p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ContactPopup;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { handleContactUsFormSubmission } from "@/lib/services/contact.api";
import type Contact from "@/lib/models/contact.types";

interface ContactPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultService?: string;
}

const services = [
  "Branding & Identity",
  "Web Development",
  "Social Media Marketing",
  "E-Commerce Solutions",
  "Digital Marketing",
  "UI/UX & Graphics",
  "Performance Marketing",
  "Custom Web Applications",
  "Others",
];

const clientLogos = [
  "AB.png",
  "swiggy.png",
  "matoshree.png",
  "tb.png",
  "BB.png",
  "nidan.png",
  "kotak.png",
  "khoshnaw.png",
  "lt.png",
];

const ContactPopup = ({
  isOpen: controlledIsOpen,
  onClose,
  defaultService,
}: ContactPopupProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
  });

  /*
   * -------------------------------------------------------
   * Final popup visibility
   * -------------------------------------------------------
   */
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  /*
   * -------------------------------------------------------
   * Prevent background scrolling
   * -------------------------------------------------------
   */
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /*
   * -------------------------------------------------------
   * Default service
   * -------------------------------------------------------
   */
  useEffect(() => {
    if (!defaultService) return;

    setFormData((prev) => ({
      ...prev,
      service: defaultService,
    }));
  }, [defaultService]);

  /*
   * -------------------------------------------------------
   * Auto open
   * -------------------------------------------------------
   */
  useEffect(() => {
    if (controlledIsOpen !== undefined) return;

    const timer = window.setTimeout(() => {
      setInternalIsOpen(true);
    }, 15000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [controlledIsOpen]);

  /*
   * -------------------------------------------------------
   * Close
   * -------------------------------------------------------
   */
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  /*
   * -------------------------------------------------------
   * Input change helper
   * -------------------------------------------------------
   */
  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
   * -------------------------------------------------------
   * Submit
   * -------------------------------------------------------
   */
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const nameParts = formData.fullName.trim().split(/\s+/);

    const firstName = nameParts[0] || "";

    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const contactData: Contact = {
      firstName,
      lastName,
      email: formData.email,
      phone: formData.phone,
      selectedServices: [formData.service],
      companyName: "Popup Lead",
      companyWebsite: "",
    };

    try {
      await handleContactUsFormSubmission(contactData);

      setIsSubmitted(true);

      window.setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error("Submission failed:", error);

      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * -------------------------------------------------------
   * Shared styles
   * -------------------------------------------------------
   */
  const inputStyles =
    "w-full appearance-none rounded-none border border-slate-200 bg-white p-2.5 text-sm font-medium text-slate-900 outline-none shadow-sm transition-all placeholder:text-slate-400 focus:border-[#052D69] focus:ring-4 focus:ring-[#052D69]/5 md:p-3.5 md:text-base";

  const labelStyles =
    "mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 md:text-[11px]";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100000 flex items-center justify-center overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-6">
          {/* =================================================
              BACKDROP
          ================================================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* =================================================
              MAIN MODAL
          ================================================= */}
          <motion.div
            initial={{
              scale: 0.96,
              opacity: 0,
              y: 20,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.96,
              opacity: 0,
              y: 20,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              flex
              w-full
              max-w-5xl
              flex-col
              overflow-hidden
    
              bg-white
              shadow-[0_32px_80px_-20px_rgba(0,0,0,0.25)]
       
              md:flex-row
              "
          >
            {/* md:max-h-[92vh]
                md:min-h-[620px] */}
            {/* lg:min-h-[650px]
            lg:max-w-[1100px]
            xl:max-w-[1180px] */}
            {/* =================================================
                LEFT PANEL
            ================================================= */}
            <div
              className="
                relative
                hidden
                overflow-hidden
                border-r
                border-slate-100
                bg-slate-50
                md:flex
                md:w-[38%]
                md:flex-col
                md:justify-between
                lg:w-[40%]
                md:p-8
                lg:p-10
                xl:p-12
              "
            >
              {/* Decorative circle */}
              <div
                className="
                  absolute
                  -left-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-[#086ddd]/5
                  blur-3xl
                "
              />

              {/* Client logos */}
              <div className="relative z-10">
                <div
                  className="
                    mb-7
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#086ddd]/10
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#052D69]
                    lg:mb-2
                  "
                >
                  <Sparkles size={12} />
                  Trusted Partners
                </div>

                <div
                  className="
                    grid
                    grid-cols-3
                    items-center
                    gap-x-4
                    gap-y-5
                    opacity-70
                    lg:gap-x-6
                    lg:gap-y-6
                  "
                >
                  {clientLogos.slice(0, 9).map((logo, idx) => (
                    <div
                      key={`${logo}-${idx}`}
                      className="
                          relative
                          flex
                          h-10
                          w-full
                          items-center
                          justify-center
                          grayscale
                          transition-all
                          duration-500
                          hover:grayscale-0
                          lg:h-12
                          xl:h-14
                        "
                    >
                      <Image
                        src={`/our-client/${logo}`}
                        alt="Client Logo"
                        fill
                        sizes="120px"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div
                className="
                  relative
                  z-10
                  space-y-6
                  lg:space-y-8
                  xl:space-y-10
                  flex
                "
              >
                {[
                  {
                    label: "Projects Delivered",
                    value: "150+",
                  },
                  {
                    label: "Years Experience",
                    value: "6+",
                  },
                  {
                    label: "Client Satisfaction",
                    value: "99%",
                  },
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <h3
                      className="
                        text-3xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        transition-colors
                        group-hover:text-[#052D69]
                        lg:text-4xl
                      "
                    >
                      {stat.value}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-slate-400
                        lg:text-[11px]
                      "
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                RIGHT FORM PANEL
            ================================================= */}
            <div
              className="
                relative
                flex
                w-full
                flex-col
                justify-center
                overflow-y-auto
                bg-white
                p-6
                sm:p-8
                md:w-[62%]
                md:p-9
                lg:w-[60%]
                lg:p-12
                xl:p-14
              "
            >
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close contact form"
                className="
                  absolute
                  right-4
                  top-4
                  z-50
                  flex
                  h-10
                  w-10
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  text-black
                  transition-all
                  duration-300
                  hover:bg-slate-100
                  hover:rotate-90
                  md:right-6
                  md:top-6
                "
              >
                <X size={22} />
              </button>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="w-full"
                  >
                    {/* Heading */}
                    <div
                      className="
                        mb-10
                        pr-8
                        md:mb-8
                        lg:mb-9
                      "
                    >
                      <h3
                        className="
                          text-2xl
                          font-bold
                          leading-[1.05]
                          tracking-tight
                          text-slate-900
                          sm:text-3xl
                          md:text-4xl
                          lg:text-[3rem]
                          xl:text-[3.25rem]
                        "
                      >
                        Let’s Build
                        <br />
                        <span className="text-[#052D69]">Something Great.</span>
                      </h3>

                      <p
                        className="
                          mt-3
                          max-w-xl
                          text-sm
                          font-medium
                          leading-relaxed
                          text-slate-500
                          md:text-base
                          lg:text-lg
                        "
                      >
                        Tell us about your project and get a custom strategy.
                      </p>
                    </div>

                    {/* Form */}
                    <form
                      className="
                        space-y-4
                        md:space-y-2
                        lg:space-y-2
                      "
                      onSubmit={onFormSubmit}
                    >
                      {/* Name + Email */}
                      <div
                        className="grid
                          grid-cols-1
                          gap-4
                          sm:grid-cols-2
                          lg:gap-5
                        "
                      >
                        <div>
                          <label className={labelStyles}>Full Name</label>

                          <input
                            className={inputStyles}
                            placeholder="John Doe"
                            required
                            value={formData.fullName}
                            onChange={(e) =>
                              updateFormData("fullName", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className={labelStyles}>Work Email</label>

                          <input
                            className={inputStyles}
                            type="email"
                            placeholder="hello@company.com"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      {/* Service */}
                      <div>
                        <label className={labelStyles}>Service Required</label>

                        <div className="relative">
                          <select
                            className={`${inputStyles} cursor-pointer pr-10 text-sm`}
                            required
                            value={formData.service}
                            onChange={(e) =>
                              updateFormData("service", e.target.value)
                            }
                          >
                            <option value="" disabled>
                              Select a service...
                            </option>

                            {services.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-y-0
                              right-0
                              flex
                              items-center
                              px-4
                              text-slate-400
                            "
                          >
                            <svg
                              className="h-4 w-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className={labelStyles}>Phone Number</label>

                        <PhoneInput
                          country="in"
                          enableSearch
                          containerClass="!w-full"
                          inputClass="
                            !w-full
                            !h-[50px]
                            md:!h-[56px]
                            !bg-white
                            !border-slate-200
                            !rounded-none
                            !text-slate-900
                            !font-medium
                            !pl-14
                            !text-sm
                            md:!text-base
                            !shadow-sm
                            focus:!border-[#052D69]
                            focus:!ring-4
                            focus:!ring-[#052D69]/5
                          "
                          buttonClass="
                            !border-slate-200
                            !rounded-none
                            !bg-slate-50
                            !w-12
                          "
                          dropdownClass="
                            !rounded-none
                            !shadow-2xl
                            !border-slate-100
                          "
                          value={formData.phone}
                          onChange={(phone: string) =>
                            updateFormData("phone", phone)
                          }
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="os-btn-slide flex w-full items-center justify-center gap-3 rounded-none bg-[#052D69] md:bg-black py-4 text-sm font-bold text-white  transition-all duration-300  ] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 md:py-4.5 md:text-base lg:py-5 lg:text-lg tracking-wider cursor-pointer 
                        "
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="size-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Claim Your Free Strategy →"
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  /* =================================================
                      SUCCESS STATE
                  ================================================= */
                  <motion.div
                    key="success"
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="
                      py-10
                      text-center
                      md:py-14
                    "
                  >
                    <div
                      className="
                        mx-auto
                        mb-6
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-green-50
                        text-green-500
                        md:h-28
                        md:w-28
                      "
                    >
                      <CheckCircle2 size={48} className="md:size-16" />
                    </div>

                    <h3
                      className="
                        text-3xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        md:text-5xl
                      "
                    >
                      Sent Successfully!
                    </h3>

                    <p
                      className="
                        mt-4
                        px-4
                        text-base
                        font-medium
                        text-slate-500
                        md:text-xl
                      "
                    >
                      Our strategy team will reach out to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;
