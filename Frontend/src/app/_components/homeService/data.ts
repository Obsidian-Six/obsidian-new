export type Service = {
    id:number;
  name: string;
  image: string;
  description: string;
};

const services: Service[] = [

  {
    id:1,
    name: "Social Media Marketing",
    image: "/social-media.jpg",
    description: "We turn attention into loyalty-crafting scroll-stopping content and smart campaigns that grow your brand where it matters most."
  },
  {
    id:2,
    name: "Branding & Identity",
    image: "/images/branding.jpg",
    description:
      "We help brands to build best logo’s, designs,shaping visuals, voice, and identity that leave a lasting impression.",
  },
  {
    id:3,
    name: "Digital Marketing",
    image:
      "/social-media2.jpeg",
    description:
      "We blend SEO, ads,SMO,Content marketing and content analytics to boost visibility, attract the right audience, and turn traffic into conversions",
  },
  {
    id:4,
    name: "IT",
    image:
      "/images/it-section.png",
    description:
      "We integrate AI experience,  data analytics,web,mobile development and deliver seamlessEcommerce solutions.",
  },
];

export default services;
