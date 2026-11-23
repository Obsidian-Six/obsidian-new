import { pageMeta } from "@/lib/seo";
import PrivacyPolicy from "../_components/PrivacyPolicy/PrivacyPolicy";

export const metadata = pageMeta({
  path: "/terms",
  title: "Privacy Policy",
  description: "Read the Obsidian Six privacy policy and how we collect, use and protect your personal data.",
});

export default function PrivacyPage() {
  return (
    <main className="pt-20"> {/* Padding added to ensure it doesn't hide under your Navbar */}
      <h1 className="sr-only">Obsidian Six Privacy Policy</h1>
      <PrivacyPolicy />
    </main>
  );
}