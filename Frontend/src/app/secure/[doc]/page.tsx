import { notFound } from "next/navigation";
import HiddenDocumentClient from "../HiddenDocumentClient";

type PdfFilename = "Task1.pdf" | "GOOGLE_ADS_X_OBS.pdf" | "Task-3.pdf" | "GOOGLE_ADS_FINAL.pdf";

const slugMap: Record<string, PdfFilename> = {
  "task1.pdf": "Task1.pdf",
  "task1": "Task1.pdf",
  "Task1.pdf": "Task1.pdf",
  "Task1": "Task1.pdf",
  "google_ads_x_obs.pdf": "GOOGLE_ADS_X_OBS.pdf",
  "google_ads_x_obs": "GOOGLE_ADS_X_OBS.pdf",
  "GOOGLE_ADS_X_OBS.pdf": "GOOGLE_ADS_X_OBS.pdf",
  "GOOGLE_ADS_X_OBS": "GOOGLE_ADS_X_OBS.pdf",
  "google-ads": "GOOGLE_ADS_X_OBS.pdf",
  "google-ads.pdf": "GOOGLE_ADS_X_OBS.pdf",
  "task-3": "Task-3.pdf",
  "task-3.pdf": "Task-3.pdf",
  "Task-3": "Task-3.pdf",
  "Task-3.pdf": "Task-3.pdf",
  "task3": "Task-3.pdf",
  "task3.pdf": "Task-3.pdf",
  "Task3": "Task-3.pdf",
  "Task3.pdf": "Task-3.pdf",
  "google-ads-final": "GOOGLE_ADS_FINAL.pdf",
  "google-ads-final.pdf": "GOOGLE_ADS_FINAL.pdf",
  "google_ads_final": "GOOGLE_ADS_FINAL.pdf",
  "google_ads_final.pdf": "GOOGLE_ADS_FINAL.pdf",
  "GOOGLE_ADS_FINAL.pdf": "GOOGLE_ADS_FINAL.pdf",
  "GOOGLE_ADS_FINAL": "GOOGLE_ADS_FINAL.pdf",
};

export function generateStaticParams() {
  return Object.keys(slugMap).map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const noIndex = { index: false, follow: false, googleBot: { index: false, follow: false } };
  const pdfFile = slugMap[doc as keyof typeof slugMap] || slugMap[decodeURIComponent(doc) as keyof typeof slugMap];

  if (pdfFile === "Task1.pdf") {
    return {
      title: "Task1.pdf | Obsidian Six",
      description: "View the secure Task1.pdf document from Obsidian Six.",
      robots: noIndex,
    };
  }
  if (pdfFile === "GOOGLE_ADS_X_OBS.pdf") {
    return {
      title: "GOOGLE_ADS_X_OBS.pdf | Obsidian Six",
      description: "View the secure GOOGLE_ADS_X_OBS.pdf document from Obsidian Six.",
      robots: noIndex,
    };
  }
  if (pdfFile === "Task-3.pdf") {
    return {
      title: "Task-3.pdf | Obsidian Six",
      description: "View the secure Task-3.pdf document from Obsidian Six.",
      robots: noIndex,
    };
  }
  if (pdfFile === "GOOGLE_ADS_FINAL.pdf") {
    return {
      title: "GOOGLE_ADS_FINAL.pdf | Obsidian Six",
      description: "View the secure GOOGLE_ADS_FINAL.pdf document from Obsidian Six.",
      robots: noIndex,
    };
  }

  return { title: "Secure Document Vault | Obsidian Six", robots: noIndex };
}

export default async function DocPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const decodedDoc = decodeURIComponent(doc);
  const pdfFile = slugMap[doc as keyof typeof slugMap] || slugMap[decodedDoc as keyof typeof slugMap];

  if (!pdfFile) {
    notFound();
  }

  return (
    <main className="bg-[#030712] min-h-screen text-slate-100 selection:bg-indigo-500/30">
      <HiddenDocumentClient pdfFilename={pdfFile} />
    </main>
  );
}
