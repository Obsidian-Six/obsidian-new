import Link from "next/link";
import { Lock, FileText, ArrowRight } from "lucide-react";

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

const documents = [
  {
    title: "Task 1 Blueprint",
    description: "Secure layout blueprint and architectural mockups.",
    slug: "Task1.pdf",
    size: "60 KB",
  },
  {
    title: "Task 3 Blueprint",
    description: "Gated blueprint and detailed asset specifications.",
    slug: "Task-3.pdf",
    size: "2.6 MB",
  },
  {
    title: "Google Ads Brochure",
    description: "Marketing and strategy brochure overview.",
    slug: "GOOGLE_ADS_X_OBS.pdf",
    size: "16.9 MB",
  },
  {
    title: "Google Ads Final Blueprint",
    description: "Final marketing and advertising strategy blueprint.",
    slug: "GOOGLE_ADS_FINAL.pdf",
    size: "3.3 MB",
  },
];

export default function HiddenDocumentPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500/30 py-24 px-6 relative overflow-hidden flex flex-col justify-center">
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(8,109,221,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-2">
            <Lock className="size-6 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-indigo-200 to-slate-200 bg-clip-text text-transparent font-sans">
            Secure Document Vault
          </h1>
          <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Access protected files, strategy papers, and gated technical blueprints. Enter code or verify email on file access.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Link
              key={doc.slug}
              href={`/secure/${doc.slug}/`}
              className="group block bg-[#090d16] border border-slate-800/80 hover:border-indigo-500/40 hover:bg-[#0c1220] p-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText className="size-16 text-slate-400" />
              </div>
              <div className="space-y-4 relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="size-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500/20 transition-colors">
                    <FileText className="size-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors tracking-tight">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-500">
                  <span>{doc.size}</span>
                  <span className="flex items-center gap-1 text-indigo-400 group-hover:translate-x-1 transition-transform font-semibold">
                    Open <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
