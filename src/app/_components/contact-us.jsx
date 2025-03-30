"use client";

import React, { useState } from "react";
import { PiPhoneCall } from "react-icons/pi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { GoArrowUpRight } from "react-icons/go";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

const ContactUs = () => {
  const [phone, setPhone] = useState("");
  const data = [
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
  return (
    <div id="contactUs" className="mb-20">
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 textmain gap-10">
        {/* Contact Details */}
        <div className="space-y-6 md:sticky md:top-20 self-start max-md:grid max-md:grid-cols-2">
          <div>
            <h2 className="text-xl font-medium poppins">Call Us</h2>
            <div className="flex items-center space-x-2 my-2.5">
              <PiPhoneCall className="text-xl" />
              <span className="text-sm font-semibold inter">+919961662729</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-medium poppins">Mail Us</h2>
            <div className="flex items-center space-x-2 my-2.5">
              <MdOutlineMailOutline />
              <span className="text-sm font-semibold inter">
                info@obsidiansix.io
              </span>
            </div>
          </div>
          <div className="">
            <h2 className="text-xl font-medium poppins">Our Socials</h2>
            <div className="flex items-center space-x-2 my-2.5">
              <RiInstagramLine />
              <span className="text-sm font-semibold inter">
                obsidiansix.io
              </span>
            </div>
          </div>
          <div className="max-md:col-span-2">
            <h2 className="text-xl font-medium poppins">Visit Us</h2>
            <div className="flex space-x-2 my-2.5">
              <GrLocation />
              <span className="text-sm font-semibold inter">
                96/2 Ravidas Nagar near Bhawani Parisar Indrapuri, Bhopal Madhya
                Pradesh India Pincode 462023.
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  className="text-xs font-semibold inter"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full"
                  id="first-name"
                  placeholder="First Name"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="text-xs font-semibold inter"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full"
                  id="last-name"
                  placeholder="Last Name"
                  type="text"
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
                country={"in"} // Default country
                value={phone}
                onChange={(value) => setPhone(value)}
                inputClass="!border !border-[#C3C3C3] p-2.5 !text-xs !outline-none !w-full !rounded-none"
                containerClass="!w-full"
                buttonClass="!rounded-none"
                dropdownClass="!rounded-none"
              />
            </div>

            {/* Selectable Options */}
            <div>
              <label className="text-xs font-semibold inter mb-3">
                What do you need help with?
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 border border-gray-300 px-4 py-2 text-sm cursor-pointer peer-checked:border-[#5A00EC] peer-checked:text-[#5A00EC]"
                  >
                    <input type="checkbox" className="hidden peer" />
                    <span className="peer-checked:text-[#5A00EC]">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Company Info */}
            <div>
              <label
                className="text-xs font-semibold inter"
                htmlFor="company-name"
              >
                Company Name
              </label>
              <input
                className="border border-[#C3C3C3] p-2.5 text-xs outline-none w-full"
                id="company-name"
                placeholder="abc pvt ltd"
                type="text"
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
              />
            </div>

            {/* Submit Button */}
            <div>
              <button className="font-medium text-sm ml-auto px-5 py-2 text-white flex items-center justify-between gap-2 bg-[#5A00EC] my-6 w-fit ">
                Send Enquiry <GoArrowUpRight className="text-2xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
