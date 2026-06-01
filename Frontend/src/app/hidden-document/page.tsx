import HiddenDocumentClient from "./HiddenDocumentClient";

export const metadata = {
  title: "Secure Document Vault | Obsidian Six",
  description: "View gated blueprints and exclusive documents from Obsidian Six.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function HiddenDocumentPage() {
  return (
    <main className="bg-[#030712] min-h-screen text-slate-100 selection:bg-indigo-500/30">
      <HiddenDocumentClient />
    </main>
  );
}
