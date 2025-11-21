"use client";

import type ContactUs from "@/lib/models/contact-us.interface";
import { handleContactUsFormSubmission } from "@/lib/services/contact-us.service";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import PhoneInput from "react-phone-input-2";

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle form submission logic here
    const contactUs: ContactUs = {
      firstName,
      lastName,
      email,
      phone,
      selectedServices,
      companyName,
      companyWebsite,
    };
    console.log("Submitting form with data:", contactUs);
    handleContactUsFormSubmission(contactUs).finally(() => {
      // Reset form fields after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSelectedServices([]);
      setCompanyName("");
      setCompanyWebsite("");
      setIsSubmitting(false);
      console.log("Form submitted successfully");
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold inter" htmlFor="first-name">
            First Name
          </label>
          <input
            className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full"
            id="first-name"
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold inter" htmlFor="last-name">
            Last Name
          </label>
          <input
            className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full"
            id="last-name"
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold inter" htmlFor="email">
          Email
        </label>
        <input
          className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full"
          id="email"
          placeholder="abc@company.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="w-full">
        <label
          className="text-xs font-semibold inter w-full"
          htmlFor="phone-number"
        >
          Phone Number
        </label>
        <PhoneInput
          country={"in"}
          value={phone}
          onChange={(value: string) => setPhone(value)}
          inputClass="!border !border-[#C3C3C3] p-2.5 !text-xs !outline-none !w-full !rounded-none"
          containerClass="!w-full"
          buttonClass="!rounded-none"
          dropdownClass="!rounded-none"
          required
        />
      </div>

      {/* Selectable Options */}
      <div>
        <label className="text-xs font-semibold inter mb-3">
          What do you need help with?
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {services.map((service, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 border border-gray-300 px-4 py-2 text-sm cursor-pointer peer-checked:border-[#5A00EC] peer-checked:text-[#5A00EC]"
            >
              <input
                type="checkbox"
                checked={selectedServices.indexOf(service) !== -1}
                onChange={() => {
                  if (selectedServices.indexOf(service) === -1) {
                    setSelectedServices([...selectedServices, service]);
                  } else {
                    setSelectedServices(
                      selectedServices.filter((s) => s !== service)
                    );
                  }
                }}
                className="hidden peer"
              />
              <span className="peer-checked:text-[#5A00EC]">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Company Info */}
      <div>
        <label className="text-xs font-semibold inter" htmlFor="company-name">
          Company Name
        </label>
        <input
          className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full"
          id="company-name"
          placeholder="abc pvt ltd"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div>
        <label
          className="text-xs font-semibold inter"
          htmlFor="company-website"
        >
          Company Website
        </label>
        <input
          className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full"
          id="company-website"
          placeholder="www.abc.com"
          type="text"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          disabled={isSubmitting}
          className="font-medium text-sm ml-auto px-5 py-2 text-white flex items-center justify-between gap-2 bg-[#5A00EC] my-6 w-fit cursor-pointer"
          type="submit"
        >
          Send Enquiry <GoArrowUpRight className="text-2xl" />
        </button>
      </div>
    </form>
  );
};
export default ContactForm;
