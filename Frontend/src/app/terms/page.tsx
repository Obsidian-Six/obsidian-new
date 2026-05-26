import PrivacyPolicy from "../_components/PrivacyPolicy/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy | Obsidian Six",
  description: "Read the Obsidian Six privacy policy and data protection terms.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-20"> {/* Padding added to ensure it doesn't hide under your Navbar */}
      <PrivacyPolicy />
    </main>
  );
}