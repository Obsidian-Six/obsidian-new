import Link from "next/link";
import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        rel="stylesheet"
      />
      <div className="max-w-7xl mx-auto py-32">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo/logo2.png"
                className="h-8 mr-3 sm:h-10 scale-100"
                alt="Logo"
              />
            </Link>
            <p className="text-sm inter max-w-xs textmain opacity-90 my-5">
              Your growth partner in the digital age — we design brands, build
              websites, and market businesses for success. With creativity and
              strategy, we make your vision a reality.
            </p>
          </div>
          <div className="text-center md:text-right">
            <ul className="space-y-2">
              <li>
                <a
                  className="text-lg text-[#19183A] hover:text-gray-600"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="text-lg text-[#19183A] hover:text-gray-600"
                  href="#"
                >
                  Works
                </a>
              </li>
              <li>
                <a
                  className="text-lg text-[#19183A] hover:text-gray-600"
                  href="#"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="text-lg text-[#19183A] hover:text-gray-600"
                  href="#"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  className="text-lg text-[#19183A] hover:text-gray-600"
                  href="#"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  className="text-lg text-[#19183A] hover:text-gray-600"
                  href="#"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-base text-center text-[#19183A] mb-4 md:mb-0 times max-w-xs">
              96/2 Ravidas Nagar near Bhawani Parisar Indrapuri, Bhopal Madhya
              Pradesh India Pincode 462023.
            </p>
            <p className="text-base text-center text-[#19183A] mb-4 md:mb-0 times">+919961662729</p>
            <p className="text-base text-center text-[#19183A] mb-4 md:mb-0 times">
              info@obsidiansix.io
            </p>
          <div className="flex justify-center md:justify-end space-x-4 mt-4">
            <a className="text-[#19183A] hover:text-gray-600" href="#">
              <FaFacebookSquare className="text-3xl" />
            </a>
            <a className="text-[#19183A] hover:text-gray-600" href="#">
              <FaTwitterSquare className="text-3xl" />
            </a>
            <a className="text-[#19183A] hover:text-gray-600" href="#">
              <FaInstagramSquare className="text-3xl" />
            </a>
          </div>
          </div>
          <div className="text-center mt-14">
            <p className="text-xs text-[#19183A]/50">
              © Copyright 2025, All Rights Reserved by Obsidian
            </p>
            <p className="text-xs text-[#19183A]/50">Terms &amp; Conditions</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
