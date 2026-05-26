"use client";

import type Contact from "@/lib/models/contact.types";
import { handleContactUsFormSubmission } from "@/lib/services/contact.api";
import { useState, useEffect } from "react";
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

const ContactForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold inter block mb-1" htmlFor="first-name">
            First Name
          </label>
          <input
            suppressHydrationWarning
            className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full focus:border-[#024787] transition-colors"
            id="first-name"
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold inter block mb-1" htmlFor="last-name">
            Last Name
          </label>
          <input
            suppressHydrationWarning
            className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full focus:border-[#024787] transition-colors"
            id="last-name"
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold inter block mb-1" htmlFor="email">
          Email
        </label>
        <input
          suppressHydrationWarning
          className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full focus:border-[#024787] transition-colors"
          id="email"
          placeholder="abc@company.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <label className="text-xs font-semibold inter block mb-1" htmlFor="phone-number">
          Phone Number
        </label>
        {isMounted ? (
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(value: string) => setPhone(value)}
            enableSearch={true}
            searchPlaceholder="Search country..."
            inputClass="!border !border-[#C3C3C3] p-2.5 !text-xs !outline-none !w-full !rounded-none focus:!border-[#024787]"
            containerClass="!w-full"
            buttonClass="!rounded-none !border-[#C3C3C3]"
            dropdownClass="!rounded-none"
            searchClass="!text-xs !p-2"
          />
        ) : (
          <div className="w-full h-[38px] border border-[#C3C3C3] bg-white animate-pulse" />
        )}
      </div>

      <div>
        <label className="text-xs font-semibold inter block mb-3">
          What do you need help with?
        </label>
        <div className="flex flex-wrap gap-3 mt-2">
          {services.map((service, index) => {
            const isSelected = selectedServices.indexOf(service) !== -1;
            return (
              <label
                key={index}
                className={`flex items-center px-4 py-2 text-xs cursor-pointer transition-all duration-300 border ${
                  isSelected 
                    ? "bg-[#024787] border-[#024787] text-white shadow-md" 
                    : "bg-white border-[#C3C3C3] text-gray-600 hover:border-[#024787]"
                }`}
              >
                <input
                  suppressHydrationWarning
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {
                    if (!isSelected) {
                      setSelectedServices([...selectedServices, service]);
                    } else {
                      setSelectedServices(selectedServices.filter((s) => s !== service));
                    }
                  }}
                  className="hidden"
                />
                <span>{service}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        <div>
          <label className="text-xs font-semibold inter block mb-1" htmlFor="company-name">
            Company Name
          </label>
          <input
            suppressHydrationWarning
            className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full focus:border-[#024787] transition-colors"
            id="company-name"
            placeholder="abc pvt ltd"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold inter block mb-1" htmlFor="company-website">
            Company Website
          </label>
          <input
            suppressHydrationWarning
            className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full focus:border-[#024787] transition-colors"
            id="company-website"
            placeholder="www.abc.com"
            type="text"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
        </div>
      </div>

      {isSubmitted && (
        <p className="text-green-600 text-xs mt-2 font-medium animate-pulse">
          Thank you for your enquiry. We will get back to you soon.
        </p>
      )}

      <div className="flex justify-end">
        <button
          suppressHydrationWarning
          disabled={isSubmitting}
          className={`group inline-flex items-center justify-center gap-3 px-8 md:px-10 py-3 md:py-4 bg-slate-900 text-white rounded-full text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-[#024787]/10 ${
            isSubmitting ? "opacity-50 cursor-progress" : "opacity-100 cursor-pointer hover:bg-[#024787]"
          }`}
          type="submit"
        >
          {isSubmitting ? "Sending..." : (
            <>
              Send Enquiry <GoArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;