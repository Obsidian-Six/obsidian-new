import type Review from "../models/review.types";

const reviews: Review[] = [
  {
    name: "Bharat Bajaj",
    title: "Founder, AB Capital Services",
    feedback:
      "Hii Obsidian Team let me take this opportunity to Thank you from the bottom of my Heart. The Campaigns you started running for us gave us recognition and much-needed clients in the form of Leads and my business took off. I got many potential clients and the chain continues even today. All of us have to take different pathways to move ahead in life and let me reaffirm you that the foundation you gave AB Capital social media from the beginning will remain warm in our hearts.",
    company: "AB CAPITAL",
    image:
      "/bharat_bajaj.jpeg",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    name: "Dr. Pushpendra Tiwari",
    title: "Founder of Rehab Masters",
    feedback:
      "Built a Great Website for me Great efforts from team , listened to all My queries and cleared them all , Thank you Obsidian",
    company: "Rehab Master",
    image:
      "data:image/png;base64,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",
    // image:
    //   "https://rehabmasters.in/wp-content/uploads/2024/07/Dr-pushpendra-tiwari-300x300.jpg",
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
    name: "Vivek Kumar",
    title: "Director, Pachmarhi Ayurveda",
    feedback:
      "It’s been over three years working closely with Aadarsh and his team at Obsidian Six, and I must say the experience has been consistently exceptional. From launching impactful campaigns to building our entire digital presence, their support has played a vital role in our brand's growth.  Whether it’s UGC-driven campaigns, strategic content planning, or maintaining our website and social media presence — they have handled every aspect with precision and creativity. What I particularly value is their understanding of our brand’s voice and philosophy, and how they reflect that in everything they execute. The strategies are always tailored, innovative, and aligned with our day-to-day operations, which makes the collaboration feel effortless. I truly appreciate their commitment, professionalism, and ability to adapt quickly in the ever-changing digital landscape. ",
    company: "Pachmarhi Ayurveda",
    image: "/images/reviews/vivek_kumar.jpg",
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
    name: "Abdullah",
    title: "Owner, Fruit & Vegetable Trading Business, Dubai",
    feedback:
      " I needed a website urgently for my trading business to showcase our products to customers and vendors — and the team delivered it in just two days. Honestly, I wasn’t expecting such speed with such quality. The site had everything we needed: clear structure, good design, and business-ready features. I’m really thankful for their efforts and how professionally they handled the whole process. Great experience working with them.",
    company: "Fruit & Vegetable Trading Business",
    image: "https://cdn.prod.website-files.com/6967336a1d507878e3487f26/6967336a1d507878e3488710_67777f44f9389a18ea00f91a_jacopo-maia-gOUx23DNks-unsplash.jpeg",
    video: "",
  },
];

export default reviews;
