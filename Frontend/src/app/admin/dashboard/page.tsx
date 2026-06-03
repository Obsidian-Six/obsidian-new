"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import Sidebar from "../_components/Sidebar";
import CaseStudiesTab from "../_components/CaseStudies/CaseStudiesTab";
import CaseStudyForm from "../_components/CaseStudies/CaseStudyForm";

// Strictly matching the TabKey definitions used by your Sidebar component
type TabKey = "overview" | "case-studies" | "create-case-study";

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("case-studies");
  const [loading, setLoading] = useState(true);

  // View states
  const [editingCase, setEditingCase] = useState<any>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Core trigger to force component data re-fetching across child screens
  const [refreshNonce, setRefreshNonce] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/admin/login");
      return;
    }
    setToken(storedToken);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
          <span className="font-semibold text-gray-500">Loading Obsidian System...</span>
        </div>
      </div>
    );
  }

  // Render content conditionally with refresh indicators fully tied to key layouts
  const renderContent = () => {
    if (activeTab === "create-case-study") {
      return (
        <CaseStudyForm
          token={token}
          apiBase={apiBase}
          editingCase={editingCase}
          onClose={() => setActiveTab("case-studies")}
          onRefresh={() => {
            setRefreshNonce((prev) => prev + 1);
            setActiveTab("case-studies");
          }}
        />
      );
    }

    if (activeTab === "case-studies") {
      return (
        <CaseStudiesTab
          key={refreshNonce} // Key-prop mutation forces React to cleanly redraw and re-fetch the list
          token={token}
          onOpenCreate={() => {
            setEditingCase(null);
            setActiveTab("create-case-study");
          }}
          onOpenEdit={(caseData) => {
            setEditingCase(caseData);
            setActiveTab("create-case-study");
          }}
        />
      );
    }

    return null;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Sidebar
        activeTab={activeTab === "create-case-study" ? "case-studies" : activeTab}
        setActiveTab={(tab) => {
          setEditingCase(null);
          setActiveTab(tab);
        }}
        onOpenCreate={() => {
          setEditingCase(null);
          setActiveTab("create-case-study");
        }}
      />
      <main className="flex-1 p-8 md:p-12 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto animate-in fade-in duration-300">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}