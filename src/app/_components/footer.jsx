import Link from "next/link";
import React from "react";
import { CiFacebook } from "react-icons/ci";
import { SlSocialTwitter } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { HiArrowSmallRight } from "react-icons/hi2";

const Footer = () => {
  return (
    <>
      <div className="bg-[#5A00EC] text-white p-6 flex flex-col md:flex-row justify-evenly items-center text-center md:text-left">
        <div className="text-6xl font-light leading-snug max-md:text-4xl max-sm:text-3xl">
          Start your journey towards
          <span className={`highlight`}> growth </span>
        </div>
        <button className="md:p-4 p-2 textmain md:px-10 px-4 bg-white flex items-center justify-center mt-4 md:mt-0">
          <HiArrowSmallRight className="md:text-7xl sm:text-3xl text-2xl textmain" />
        </button>
      </div>
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo & Description */}
          <div className="mb-8 md:mb-0">
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start"
            >
              <img
                src="/images/logo/logo2.png"
                className="h-8 sm:h-10 scale-100"
                alt="Logo"
              />
            </Link>
            <p className="text-sm inter max-w-xs textmain opacity-90 my-5">
              Your growth partner in the digital age — we design brands, build
              websites, and market businesses for success. With creativity and
              strategy, we make your vision a reality.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-right">
            <ul className="space-y-2">
              {[
                "Home",
                "Works",
                "Services",
                "Blogs",
                "About us",
                "Contact us",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    className="text-lg text-[#19183A] hover:text-gray-600"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information & Social Icons */}
        <div className="border-t border-gray-300 mt-8 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm text-[#19183A] mb-4 md:mb-0 max-w-xs">
              Bhopal , Indore , Bangalore , Pune
            </p>
            <Link href={"tel:+918085652729"} className="text-sm text-[#19183A] mb-4 md:mb-0">+918085652729</Link>
            <Link href={"mailto:info@obsidiansix.com"} className="text-sm text-[#19183A] mb-4 md:mb-0">
              info@obsidiansix.com
            </Link>
            <div className="flex justify-center md:justify-end space-x-4 mt-4 md:mt-0">
              <a className="text-[#19183A] hover:text-gray-600" href="#">
                <CiFacebook className="text-2xl sm:text-3xl" />
              </a>
              <a className="text-[#19183A] hover:text-gray-600" href="#">
                <SlSocialTwitter className="text-2xl sm:text-3xl" />
              </a>
              <a className="text-[#19183A] hover:text-gray-600" href="#">
                <FaInstagram className="text-2xl sm:text-3xl" />
              </a>
            </div>
          </div>

          {/* Copyright & Terms */}
          <div className="text-center mt-10">
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
