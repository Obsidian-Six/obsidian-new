"use client";

import type Contact from "@/lib/models/contact.types";
import { handleContactUsFormSubmission } from "@/lib/services/contact.api";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const services: string[] = [
  "Website Development",
  "Complete Digital Marketing",
  "Social Media Marketing",
  "Content Marketing",
  "SEO",
  "PPC Ads",
  "Email Marketing",
  "Design Services",
  "Others",
];

const BlogsSidebarForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);

    const contact: Contact = {
      firstName,
      lastName,
      email,
      phone,
      selectedServices,
      companyName,
      companyWebsite,
    };

    handleContactUsFormSubmission(contact).finally(() => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSelectedServices([]);
      setCompanyName("");
      setCompanyWebsite("");
      setIsSubmitting(false);
      setIsSubmitted(true);
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
      {/* Compact Name Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1" htmlFor="first-name">
            First Name
          </label>
          <input
            className="border border-slate-200 p-2.5 text-xs outline-none w-full focus:border-[#5A00EC] transition-all bg-white"
            id="first-name"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1" htmlFor="last-name">
            Last Name
          </label>
          <input
            className="border border-slate-200 p-2.5 text-xs outline-none w-full focus:border-[#5A00EC] transition-all bg-white"
            id="last-name"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="border border-slate-200 p-2.5 text-xs outline-none w-full focus:border-[#5A00EC] transition-all"
            id="email"
            type="email"
            placeholder="abc@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Phone
          </label>
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(value:string) => setPhone(value)}
            inputClass="!border !border-slate-200 !p-2.5 !h-auto !text-xs !w-full !rounded-none"
            containerClass="!w-full"
            buttonClass="!border-slate-200 !bg-white"
          />
        </div>
      </div>

      {/* Compact Services */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
          Service Needed
        </label>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => {
            const isSelected = selectedServices.indexOf(service) !== -1;
            return (
              <label
                key={index}
                className={`px-3 py-1.5 text-[9px] font-bold uppercase cursor-pointer border transition-all ${isSelected
                    ? "bg-[#5A00EC] border-[#5A00EC] text-white"
                    : "bg-white border-slate-200 text-slate-500 hover:border-[#5A00EC]"
                  }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => {
                    if (!isSelected) setSelectedServices([...selectedServices, service]);
                    else setSelectedServices(selectedServices.filter((s) => s !== service));
                  }}
                />
                {service}
              </label>
            );
          })}
        </div>
      </div>

      {/* Company Info */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Company
          </label>
          <input
            className="border border-slate-200 p-2.5 text-xs outline-none w-full focus:border-[#5A00EC]"
            placeholder="Company Name"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
      </div>

      {/* THE SUBMIT BUTTON - Forced visibility with higher z-index */}
      <div className="pt-4 relative z-50">
        <button
          disabled={isSubmitting}
          className="w-full font-black text-[11px] uppercase tracking-[0.2em] py-4 text-white bg-[#5A00EC] hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-lg active:scale-[0.98]"
          type="submit"
        >
          {isSubmitting ? "Sending..." : (
            <>
              Get Started <GoArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </>
          )}
        </button>
      </div>

      {isSubmitted && (
        <p className="text-green-600 text-[10px] font-bold text-center mt-2 animate-bounce">
          ENQUIRY SENT SUCCESSFULLY!
        </p>
      )}
    </form>
  );
};

export default BlogsSidebarForm;