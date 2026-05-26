"use client";

import { FaFolderOpen, FaPlus } from "react-icons/fa";


// Expanded TabKey to allow both list and form views smoothly without compiler errors
type TabKey = "overview" | "case-studies" | "create-case-study";

interface SidebarProps {
    activeTab: TabKey;
    setActiveTab: (tab: TabKey) => void;
    onOpenCreate: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onOpenCreate }: SidebarProps) {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-8 text-gray-900 tracking-tight px-2">
                Admin Panel
            </h2>

            <nav className="flex flex-col flex-1 space-y-2">
                {/* Case Studies Link (Keeps highlight active on form view too) */}
                <button
                    type="button"
                    onClick={() => setActiveTab("case-studies")}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "case-studies" || activeTab === "create-case-study"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    <FaFolderOpen className="text-lg" />
                    <span>Case Studies</span>
                </button>

                {/* Action Button */}
                <button
                    type="button"
                    onClick={onOpenCreate}
                    className="w-full mt-6 flex items-center gap-2 justify-center bg-[#024787] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-all text-sm border-0 cursor-pointer"
                >
                    <FaPlus /> Create Case Study
                </button>
            </nav>
        </aside>
    );
}