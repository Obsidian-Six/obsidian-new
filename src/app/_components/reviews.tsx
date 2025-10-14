"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MotionDiv } from "@/lib/motion";

type Review = {
  name: string;
  title: string;
  feedback: string;
  company: string;
  image: string;
  video: string;
};

const reviews: Review[] = [
  {
    name: "Bharat Bajaj",
    title: "Founder, AB Capital Services",
    feedback:
      "Hii Obsidian Team let me take this opportunity to Thank you from the bottom of my Heart. The Campaigns you started running for us gave us recognition and much-needed clients in the form of Leads and my business took off. I got many potential clients and the chain continues even today. All of us have to take different pathways to move ahead in life and let me reaffirm you that the foundation you gave AB Capital social media from the beginning will remain warm in our hearts.",
    company: "AB CAPITAL",
    image:
      "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fbharat-bajaj.jpg&w=1920&q=75",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    name: "Dr. Pushpendra Tiwari",
    title: "Founder of Rehab Masters",
    feedback:
      "Built a Great Website for me Great efforts from team , listened to all My queries and cleared them all , Thank you Obsidian",
    company: "Rehab Master",
    image:
      "https://rehabmasters.in/wp-content/uploads/2024/07/Dr-pushpendra-tiwari-300x300.jpg",
    video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  },
  {
    name: "Dr. Komal Taneja",
    title: "shim.co.in",
    feedback:
      "You people are doing amazing job..I would like to thank you for handling all the social media platforms of SHIM College with so much of efficiency and hard-work. Your team is highly dedicated towards their clients. You understand the needs so well and do the work accordingly.",
    company: "SHIM",
    image: "https://www.shim.co.in/wp-content/uploads/2023/05/komaltaneja.png",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    name: "Dr. Komal Taneja",
    title: "shim.co.in",
    feedback:
      "You people are doing amazing job..I would like to thank you for handling all the social media platforms of SHIM College with so much of efficiency and hard-work. Your team is highly dedicated towards their clients. You understand the needs so well and do the work accordingly",
    company: "shim.co.in",
    image:
      "https://www.igrowmybiz.com/_next/image?url=%2Fassets%2Fimages%2Fkomal.jpeg&w=1920&q=75",
    video: "",
  },
  {
    name: "Vivek Kumar",
    title: "Director, Pachmarhi Ayurveda",
    feedback:
      "It’s been over three years working closely with Aadarsh and his team at Obsidian Six, and I must say the experience has been consistently exceptional. From launching impactful campaigns to building our entire digital presence, their support has played a vital role in our brand's growth.  Whether it’s UGC-driven campaigns, strategic content planning, or maintaining our website and social media presence — they have handled every aspect with precision and creativity. What I particularly value is their understanding of our brand’s voice and philosophy, and how they reflect that in everything they execute. The strategies are always tailored, innovative, and aligned with our day-to-day operations, which makes the collaboration feel effortless. I truly appreciate their commitment, professionalism, and ability to adapt quickly in the ever-changing digital landscape. ",
    company: "Pachmarhi Ayurveda",
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQGfW3OqLs_aIw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1673967148085?e=1756944000&v=beta&t=2oJ1WbPpvuSei8NPkeKFhVq8_n2wbwvh7iCaq4O_jQg",
    video: "",
  },
  {
    name: "Swati Malviya",
    title: "Owner, Vishnu Dental Clinic",
    feedback:
      "Working with Adarsh and his team has been a turning point for our clinic’s digital presence. From day one, they understood exactly what our brand needed — clean, well-aligned content, thoughtful design, and strong marketing strategies that brought us real visibility. They’ve helped us grow on social media, manage our overall digital presence, and made sure every piece of content truly reflects who we are. Their effort and dedication show in the results, and I’m genuinely grateful for their support. ",
    company: "Vishnu Dental Clinic",
    image:
      "https://content.jdmagicbox.com/comp/bhopal/m4/0755px755.x755.231207170037.n6m4/catalogue/vishnu-dental-clinic-j-k-road-bhopal-doctors-for-dental-mobility-j4m1latdlp-250.jpg",
    video: "",
  },
  {
    name: "Ravi Tiwari",
    title: "CEO, Claims Nidan",
    feedback:
      " Collaborating with Obsidian Six team has been an insightful experience. As someone running a business in the insurance claims space a niche and often overlooked industry, It's not easy to find the right kind of audience or impact through digital marketing. But the campaign they launched for us delivered both. We saw high-quality leads, real engagement, and a noticeable difference in visibility. They even executed an ad shoot for our brand, which brought a whole new level of credibility and attention. The automation and strategy behind it were sharp and result-driven. Grateful for the clarity, effort, and returns this team has brought us. ",
    company: "Claims Nidan",
    image: "https://www.claimsnidan.com/frontend/img/ravi-tiwari.jpg",
    video: "",
  },
  {
    name: "Angelina",
    title: "E-commerce Business Owner, France",
    feedback:
      "After struggling with four failed websites, I honestly didn’t expect much. But the site Adarsh and his team built finally worked — not just in design, but in performance. It had all the features I needed, and it actually supported my ads and conversions. I’m truly impressed with their work and how smoothly everything came together. Big thanks to the team! ",
    company: "E-commerce Business",
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS9XpzdISQQkTlSlrzFF9R5s-eBM6eJPIuhE7aAwqgs2NioUEFH",
    video: "",
  },
  {
    name: "Khushnow",
    title: "Owner, Fruit & Vegetable Trading Business, Dubai",
    feedback:
      " I needed a website urgently for my trading business to showcase our products to customers and vendors — and the team delivered it in just two days. Honestly, I wasn’t expecting such speed with such quality. The site had everything we needed: clear structure, good design, and business-ready features. I’m really thankful for their efforts and how professionally they handled the whole process. Great experience working with them.",
    company: "Fruit & Vegetable Trading Business",
    image: "https://www.khonshnaw.com/logo.jpg",
    video: "",
  },
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  // If no reviews, render nothing
  if (reviews.length === 0) {
    return null;
  }

  const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  const nextIndex = (currentIndex + 1) % reviews.length;
  const currentReview = reviews[currentIndex]!;
  const prevReview = reviews[prevIndex]!;
  const nextReview = reviews[nextIndex]!;

  return (
    <div id="aboutUs" className="bg-[#5A00EC]/10">
      <div className="max-w-6xl mx-auto pb-32 px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-6xl py-14 textmain max-w-5xl mx-auto text-center font-light leading-snug max-md:text-4xl max-md:leading-normal"
        >
          Hear from Those We’ve Helped
          <span className="highlight block">grow</span>
        </MotionDiv>

        <div className="grid grid-cols-12 items-end gap-4 max-md:grid-cols-1 relative">
          <div
            className="col-span-2 relative max-md:hidden cursor-pointer"
            onClick={prevSlide}
          >
            <Image
              src={prevReview.image}
              alt="Previous"
              width={320}
              height={112}
              className="w-full h-28 object-cover"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent top-0 left-0" />
            <div className="absolute bottom-0 text-white p-2.5">
              <p className="text-xs poppins">{prevReview.title}</p>
              <p className="text-sm inter">{prevReview.company}</p>
            </div>
          </div>

          <div className="col-span-8 h-[30rem] grid grid-cols-2 max-md:grid-cols-1">
            <div className="bg-[#19183A] flex items-center justify-center max-md:h-48 max-md:mt-3">
              <Image
                src={currentReview.image}
                alt={currentReview.name}
                width={640}
                height={384}
                className="w-full md:h-96 h-48 object-contain"
              />
            </div>

            <div className="bg-white p-8 relative">
              <p className="textmain text-2xl my-2.5 max-md:text-xl">
                {currentReview.name}
              </p>
              <p className="textmain text-sm inter my-2.5 max-md:text-xs">
                {currentReview.title}
              </p>
              <div className="textmain opacity-80 mt-[30%] max-md:mt-6">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M9.50536 1.93115C5.6069 2.20509 0.00308 2.82751 0 10.4624V20.0686H8.69924V9.79071H5.81068C5.62769 7.04634 7.88755 6.3377 10.345 5.79373L9.50536 1.93115ZM21.1603 1.93115C17.2618 2.20509 11.658 2.82752 11.655 10.4624V20.0686H20.3542V9.79071H17.4657C17.2826 7.04634 19.5425 6.3377 22 5.79373L21.1603 1.93115Z"
                    fill="#BCBCD4"
                  />
                </svg>
                <p className="px-5 text-sm inter max-md:px-3 max-md:text-xs md:h-56 h-28 overflow-y-scroll">
                  {currentReview.feedback}
                </p>
              </div>

              <div className="absolute md:top-1/3 top-[115%] -right-10  max-md:left-1/2 max-md:-translate-x-1/4 transform -translate-y-1/2 flex space-x-2">
                <button
                  className="p-2.5 bg-[#5A00EC] cursor-pointer border border-[#5A00EC] hover:bg-white hover:text-[#5A00EC]"
                  onClick={prevSlide}
                >
                  <BsArrowLeft className="text-2xl text-white" />
                </button>
                <button
                  className="p-2.5 bg-[#5A00EC] cursor-pointer border border-[#5A00EC] hover:bg-white hover:text-[#5A00EC]"
                  onClick={nextSlide}
                >
                  <BsArrowRight className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </div>

          <div
            className="col-span-2 relative max-md:hidden cursor-pointer"
            onClick={nextSlide}
          >
            <Image
              src={nextReview.image}
              alt="Next"
              width={320}
              height={112}
              className="w-full h-28 object-cover"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent top-0 left-0" />
            <div className="absolute bottom-0 text-white p-2.5">
              <p className="text-xs poppins">{nextReview.title}</p>
              <p className="text-sm inter">{nextReview.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
