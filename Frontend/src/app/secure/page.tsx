import { redirect } from "next/navigation";

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
  // Redirect to the first document by default
  redirect("/hidden-document/Task1.pdf");
}
