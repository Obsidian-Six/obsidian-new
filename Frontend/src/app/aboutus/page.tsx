import { pageMeta } from "@/lib/seo";
import AboutUs from "../_components/aboutus/AboutUs";

export const metadata = pageMeta({
  path: "/aboutus",
  title: "About Us – Digital Agency in Mumbai & Bhopal",
  description:
    "Meet Obsidian Six, a digital marketing and web development agency with offices in Mumbai and Bhopal, founded by Aadarsh Kumar. Our story, team and approach.",
});

export default function AboutPage() {
  return (
    <main>
      <AboutUs />
      {/* You can add other components here, like a Footer or CTA section */}
    </main>
  );
}