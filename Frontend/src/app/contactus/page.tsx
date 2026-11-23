import { pageMeta } from "@/lib/seo";
import ContactUsRouter from "../_components/ContactUsRouter/ContactUsRouter";
export const metadata = pageMeta({
  path: "/contactus",
  title: "Contact Us – Mumbai & Bhopal Offices",
  description:
    "Talk to Obsidian Six about SEO, ads, branding or a new website. Call +91 80856 52729, email info@obsidiansix.com or visit our Mumbai or Bhopal office.",
});

export default function Services() {
  return (
    <main>
      <ContactUsRouter/>
    </main>
  );
}