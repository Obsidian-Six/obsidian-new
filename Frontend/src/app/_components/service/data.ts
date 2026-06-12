export type Service = {
  name: string;
  image: string;
  description: string;
};

const services: Service[] = [

  {
    name: "Social Media Marketing",
    image: "/social-media.jpg",
    description: "We turn attention into loyalty-crafting scroll-stopping content and smart campaigns that grow your brand where it matters most."
  },
  {
    name: "Branding & Identity",
    image: "/images/branding.jpg",
    description:
      "We help brands to build best logo’s, designs,shaping visuals, voice, and identity that leave a lasting impression.",
  },
  {
    name: "Digital Marketing",
    image:
      "/social-media2.jpeg",
    description:
      "We blend SEO, ads,SMO,Content marketing and content analytics to boost visibility, attract the right audience, and turn traffic into conversions",
  },
  {
    name: "IT",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SVR8ZW58MHx8MHx8fDA%3D",
    description:
      "We integrate AI experience,  data analytics,web,mobile development and deliver seamlessEcommerce solutions.",
  },
];

export default services;
