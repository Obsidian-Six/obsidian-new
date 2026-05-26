"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function CaseStudyManager({ token, onEdit, onCreate }: { token: string | null, onEdit: (c: any) => void, onCreate: () => void }) {
    const [studies, setStudies] = useState([]);

    useEffect(() => { fetchStudies(); }, []);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

    const fetchStudies = async () => {
        const res = await fetch(`${apiBase}/api/case-studies`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        setStudies(data.data || []);
    };

    const deleteStudy = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        await fetch(`${apiBase}/api/case-studies/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        fetchStudies();
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Manage Case Studies</h2>
                <button onClick={() => onCreate()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                    <FaPlus /> Add New
                </button>
            </div>
            {studies.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">
                    No case studies found. Click 'Add New' to create one.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {studies.map((s: any) => (
                        <div key={s._id} className="flex flex-col border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white group">
                            <div className="h-40 bg-gray-100 relative overflow-hidden">
                                {s.image || s.heroImage ? (
                                    <img 
                                        src={s.image || s.heroImage} 
                                        alt={s.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        onError={(e) => { 
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null; 
                                            target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%239ca3af">No Image</text></svg>';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <button onClick={() => onEdit(s)} className="p-2 bg-white text-blue-600 shadow-sm hover:bg-blue-50 rounded-lg transition"><FaEdit /></button>
                                    <button onClick={() => deleteStudy(s._id)} className="p-2 bg-white text-red-600 shadow-sm hover:bg-red-50 rounded-lg transition"><FaTrash /></button>
                                </div>
                                {s.category && (
                                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-[10px] font-bold rounded-md backdrop-blur-sm">
                                        {s.category}
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm line-clamp-1" title={s.name}>{s.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1">/{s.slug}</p>
                                </div>
                                {s.pageType && (
                                    <div className="mt-3 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                        {s.pageType === 'template' ? 'Standard Layout' : 'Custom Layout'}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}