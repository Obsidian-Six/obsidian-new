import AboutUs from "../_components/aboutus/AboutUs";

export const metadata = {
  title: "About Us | Obsidian Six",
  description: "Learn more about the minds behind building digital experiences that lead to real growth.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutUs />
      {/* You can add other components here, like a Footer or CTA section */}
    </main>
  );
}