export type Service = {
  name: string;
  image: string;
  description: string;
};

const services: Service[] = [
  {
    name: "Web Development",
    image:
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "From custom websites to scalable web applications, we develop high-performance, responsive, and user-friendly digital solutions tailored to your needs.",
  },
  {
    name: "Social Media Marketing",
    image: "https://images.unsplash.com/photo-1661160094555-a798a7df499f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "We amplify your digital presence through data-driven social strategies. From high-engagement content creation to targeted ad campaigns, we turn followers into loyal brand advocates across all major platforms."
  },
  {
    name: "Branding & Identity",
    image: "/images/branding.jpg",
    description:
      "We craft unique brand identities, including logo design, color schemes, typography, and messaging, to create a lasting impact for your business.",
  },
  {
    name: "E-Commerce Solutions",
    image:
      "https://images.pexels.com/photos/8939307/pexels-photo-8939307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "We build and optimize e-commerce platforms, integrating secure payment gateways, seamless user experiences, and conversion-focused designs.",
  },
  {
    name: "Digital Marketing",
    image:
      "https://images.pexels.com/photos/38547/office-freelancer-computer-business-38547.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Our expert digital marketing strategies, including SEO, paid advertising, and content marketing, help boost visibility, drive traffic, and increase conversions.",
  },
  {
    name: "UI/UX & Graphics",
    image:
      "https://images.pexels.com/photos/2584076/pexels-photo-2584076.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "We create intuitive, user-centered designs with engaging animations, interactive elements, and conversion-optimized interfaces.",
  },
  {
    name: "Performance Marketing",
    image: "https://bestdigitalmarketingcourseinyamunanagar.com/wp-content/uploads/2025/10/Performance-Marketing-Banner.jpg",
    description:
      "Where creativity meets calculations. Our performance marketing suite focuses on high-intent audience targeting and rigorous A/B testing, ensuring every dollar spent is an investment toward hitting your specific KPIs and maximizing ROI.",
  },
  {
    name: "Custom Web Applications",
    image:
      "https://images.pexels.com/photos/7634159/pexels-photo-7634159.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "We build scalable SaaS platforms, real-time web applications, and automation tools to streamline business operations and enhance user experiences.",
  },
];

export default services;
