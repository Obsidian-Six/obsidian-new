"use client";

import React, { useState } from "react";
import { FaSpinner, FaPlus, FaTrash } from "react-icons/fa";

interface CaseStudyFormProps {
  token: string | null;
  apiBase: string;
  onClose: () => void;
  onRefresh: () => void;
  editingCase?: any;
}

export default function CaseStudyForm({ token, apiBase, onClose, onRefresh, editingCase }: CaseStudyFormProps) {
  const [formTab, setFormTab] = useState<"basic" | "overview" | "challenge" | "results" | "twoImage">("basic");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setFormSubmitting(true);
    setFormError("");

    try {
      const isEdit = !!editingCase?._id;
      
      // Convert comma-separated tags string back to an array of strings
      const formattedTags = typeof formData.tags === "string"
        ? formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : formData.tags;

      const payload = {
        ...formData,
        tags: formattedTags
      };

      const res = await fetch(isEdit ? `${apiBase}/api/case-studies/${editingCase._id}` : `${apiBase}/api/case-studies`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onRefresh();
        onClose();
      } else {
        const errPayload = await res.json().catch(() => ({}));
        const detailedError = errPayload.error ? `: ${errPayload.error}` : (errPayload.message ? `: ${errPayload.message}` : "");
        setFormError(`Failed to commit case study: ${detailedError || "Unknown server validation issue"}`);
      }
    } catch (err: any) {
      setFormError(`Database mutations engine pipeline closed down. Error: ${err.message || err}`);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Fully comprehensive initial state mapping every parameter present in your JSON schema
  const [formData, setFormData] = useState<any>({
    name: editingCase?.name || "",
    slug: editingCase?.slug || "",
    category: editingCase?.category || "",
    image: editingCase?.image || "",
    details: editingCase?.details || "",
    pageType: editingCase?.pageType || "template",
    tags: editingCase?.tags ? editingCase.tags.join(", ") : "",

    // Core Media Streams
    heroImage: editingCase?.heroImage || "",
    heroVideo: editingCase?.heroVideo || "",
    overviewVideo: editingCase?.overviewVideo || "",
    ChallengeVideo: editingCase?.ChallengeVideo || "",
    ApproachVideo: editingCase?.ApproachVideo || "",
    ResultVideo: editingCase?.ResultVideo || "",

    // Tab Segment Objects
    overview: editingCase?.overview || "",
    caseSection: {
      data: editingCase?.caseSection?.data || "",
      highlight: editingCase?.caseSection?.highlight || ""
    },
    gallery: editingCase?.gallery || [],

    challenge: {
      data: editingCase?.challenge?.data || "",
      image1: editingCase?.challenge?.image1 || "",
      image2: editingCase?.challenge?.image2 || "",
      point: editingCase?.challenge?.point || []
    },

    twoImage: {
      leftPanel: {
        bgImage: editingCase?.twoImage?.leftPanel?.bgImage || "",
        topLabel: editingCase?.twoImage?.leftPanel?.topLabel || "",
        bottomLabel: editingCase?.twoImage?.leftPanel?.bottomLabel || ""
      },
      rightPanel: {
        bgImage: editingCase?.twoImage?.rightPanel?.bgImage || ""
      }
    },

    approaches: editingCase?.approaches || [],
    results: editingCase?.results || [],
    impacts: editingCase?.impacts || [],
    detail: editingCase?.detail || ""
  });

  // Reusable multi-layer image asset file uploader
  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>, uploadKeyPath: string[]) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const targetUniqueField = uploadKeyPath.join("-");
    setUploadingField(targetUniqueField);
    setFormError("");
    setFormSuccess("");

    try {
      const uploadData = new FormData();
      uploadData.append("image", file);

      const res = await fetch(`${apiBase}/api/case-studies/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || data.error || `Upload failed with status code ${res.status}`);
      }

      if (data.success || data.path) {
        setFormSuccess("Asset uploaded successfully.");
        setFormData((prev: any) => {
          // Use a typed any object for flexible nested updates
          const updated: any = { ...prev };
          // Walk through the uploadKeyPath to set the final value
          let target = updated;
          for (let i = 0; i < uploadKeyPath.length - 1; i++) {
            const key = uploadKeyPath[i] as any;
            if (!target[key]) target[key] = {};
            target = target[key];
          }
          const finalKey = uploadKeyPath[uploadKeyPath.length - 1] as any;
          target[finalKey] = data.path;
          return updated;
        });
      }
    } catch (err: any) {
      setFormError(`Asset upload failed: ${err.message || err}`);
      setFormSuccess("");
    } finally {
      setUploadingField(null);
    }
  };

  // Dedicated nested layout array tracker uploader engine
  const handleArrayElementUpload = async (e: React.ChangeEvent<HTMLInputElement>, arrayKey: string, index: number, fieldKey: string) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploadingField(`${arrayKey}-${index}-${fieldKey}`);
    setFormError("");
    setFormSuccess("");
    try {
      const uploadData = new FormData();
      uploadData.append("image", file);

      const res = await fetch(`${apiBase}/api/case-studies/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || data.error || `Upload failed with status code ${res.status}`);
      }

      if (data.success || data.path) {
        setFormSuccess("Asset uploaded successfully.");
        setFormData((prev: any) => {
          const updatedArray = [...prev[arrayKey]];
          updatedArray[index] = { ...updatedArray[index], [fieldKey]: data.path };
          return { ...prev, [arrayKey]: updatedArray };
        });
      }
    } catch (err: any) {
      setFormError(`Asset upload failed: ${err.message || err}`);
      setFormSuccess("");
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm text-gray-800">
      <div className="p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{editingCase ? `Modify Workspace: ${editingCase.name}` : "Provision Case Parameters Workspace"}</h2>
          <p className="text-xs text-gray-500">Populate structural modules aligned explicitly to server models.</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-xl text-xs font-semibold hover:bg-gray-50 transition">Dismiss</button>
          <button type="button" onClick={handleFormSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-2">
            {formSubmitting ? <FaSpinner className="animate-spin" /> : "Commit System Document"}
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 px-6 pt-2 bg-white gap-4 overflow-x-auto whitespace-nowrap">
        {[
          { id: "basic", label: "1. Identity & Base Media" },
          { id: "overview", label: "2. Strategic Summary & Gallery" },
          { id: "challenge", label: "3. Adversity & Point Logs" },
          { id: "results", label: "4. Executions, Metrics & Impacts" },
          { id: "twoImage", label: "5. Dual Banner Section Layout" }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFormTab(tab.id as any)}
            className={`pb-3 text-xs font-bold transition-all border-b-2 ${formTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {formError && <div className="p-4 mx-6 mt-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">{formError}</div>}
      {formSuccess && <div className="p-4 mx-6 mt-4 bg-green-50 border border-green-200 text-green-600 rounded-xl text-xs font-medium">{formSuccess}</div>}

      <div className="p-6">
        {formTab === "basic" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">Operational Case Identifier</label>
                  <span className="text-[10px] text-gray-400 font-medium">{(formData.name || "").length}/80</span>
                </div>
                <input type="text" maxLength={80} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl text-gray-900 outline-none focus:border-blue-500 focus:bg-white" placeholder="e.g. Sweet Protection" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">Index Core Category Vertical</label>
                  <span className="text-[10px] text-gray-400 font-medium">{(formData.category || "").length}/80</span>
                </div>
                <input type="text" maxLength={80} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl text-gray-900 outline-none focus:border-blue-500 focus:bg-white" placeholder="e.g. E-commerce & Sports Technology" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">Custom Link Route Handle Slug</label>
                  <span className="text-[10px] text-gray-400 font-medium">{(formData.slug || "").length}/80</span>
                </div>
                <input type="text" maxLength={80} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl text-gray-900 outline-none focus:border-blue-500 focus:bg-white" placeholder="sweet-protection-custom-tech-ecommerce" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Layout Presentation Canvas Engine</label>
                <select className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl text-gray-900 outline-none focus:border-blue-500 focus:bg-white" value={formData.pageType} onChange={(e) => setFormData({ ...formData, pageType: e.target.value })}>
                  <option value="template">Standard Structured Layout Track Template</option>
                  <option value="custom">Bespoke Custom Compiled Canvas Engine Layout</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">Metadata Tracking Taxonomy Tags (Comma Delimited)</label>
                  <span className="text-[10px] text-gray-400 font-medium">{(formData.tags || "").length}/100</span>
                </div>
                <input type="text" maxLength={100} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl text-gray-900 outline-none focus:border-blue-500 focus:bg-white" placeholder="ReactJS, AWS Cloud, Custom CMS" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-bold text-gray-500 uppercase">Brief Details Index Card Subtext Log Summary</label>
                <span className="text-[10px] text-gray-400 font-medium">{(formData.details || "").length}/150</span>
              </div>
              <textarea maxLength={150} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl text-gray-900 h-20 outline-none focus:border-blue-500 focus:bg-white resize-none" placeholder="Transformed Sweet Protection's digital presence by building a custom ReactJS-driven ecosystem..." value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-200 p-4 rounded-xl bg-gray-50">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Base Platform Card Graphic Thumbnail URL</label>
                <div className="flex items-center gap-2 mb-1">
                  <input type="file" accept="image/*" className="text-xs block" onChange={(e) => handleDirectUpload(e, ["image"])} />
                  {uploadingField === 'image' && <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1"><FaSpinner className="animate-spin"/> Uploading...</span>}
                </div>
                <input type="text" className="w-full border p-1.5 text-xs rounded bg-white" placeholder="Direct Path URL string representation" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                {formData.image && (
                  <div className="mt-2 w-full h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
                    <img src={formData.image.startsWith('http') ? formData.image : `${apiBase}${formData.image}`} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Top Hero Background Layout Cover Image URL</label>
                <div className="flex items-center gap-2 mb-1">
                  <input type="file" accept="image/*" className="text-xs block" onChange={(e) => handleDirectUpload(e, ["heroImage"])} />
                  {uploadingField === 'heroImage' && <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1"><FaSpinner className="animate-spin"/> Uploading...</span>}
                </div>
                <input type="text" className="w-full border p-1.5 text-xs rounded bg-white" placeholder="Hero Image URL string location pointer" value={formData.heroImage} onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })} />
                {formData.heroImage && (
                  <div className="mt-2 w-full h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
                    <img src={formData.heroImage.startsWith('http') ? formData.heroImage : `${apiBase}${formData.heroImage}`} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Top Hero Canvas Primary Background Video Stream URL</label>
                <div className="flex items-center gap-2 mb-1">
                  <input type="file" accept="video/*" className="text-xs block" onChange={(e) => handleDirectUpload(e, ['heroVideo'])} />
                  {uploadingField === 'heroVideo' && <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1"><FaSpinner className="animate-spin"/> Uploading...</span>}
                </div>
                <input type="text" className="w-full border border-gray-300 bg-white p-2.5 text-xs rounded-xl" placeholder="e.g. /SweetProtection/topVideo.mp4" value={formData.heroVideo} onChange={(e) => setFormData({ ...formData, heroVideo: e.target.value })} />
                {formData.heroVideo && (
                  <div className="mt-2 w-full h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
                    <video src={formData.heroVideo.startsWith('http') ? formData.heroVideo : `${apiBase}${formData.heroVideo}`} className="w-full h-full object-cover" controls muted />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEWPORTS CORE 2: STRATEGIC SUMMARY NARRATIVES & GALLERIES TRACK */}
        {formTab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">Executive Overview Section Header Subtext Lead</label>
                  <span className="text-[10px] text-gray-400 font-medium">{(formData.caseSection.data || "").length}/120</span>
                </div>
                <input type="text" maxLength={120} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl" placeholder="e.g. Building a Tech-Driven E-commerce Experience for" value={formData.caseSection.data} onChange={(e) => setFormData({ ...formData, caseSection: { ...formData.caseSection, data: e.target.value } })} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">Executive Overview Matrix Accent Color Highlight Title</label>
                  <span className="text-[10px] text-gray-400 font-medium">{(formData.caseSection.highlight || "").length}/80</span>
                </div>
                <input type="text" maxLength={80} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl" placeholder="e.g. High-Performance Gear" value={formData.caseSection.highlight} onChange={(e) => setFormData({ ...formData, caseSection: { ...formData.caseSection, highlight: e.target.value } })} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">Executive Primary Core Overview Long-form Text Narrative</label>
                  <span className="text-[10px] text-gray-400 font-medium">{(formData.overview || "").length}/350</span>
                </div>
                <textarea maxLength={350} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl h-24 resize-none" placeholder="Sweet Protection is a globally recognized brand specializing in high-performance helmets..." value={formData.overview} onChange={(e) => setFormData({ ...formData, overview: e.target.value })} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Overview Segment Auxiliary Demonstration Video Stream URL</label>
                <div className="flex items-center gap-2 mb-1">
                  <input type="file" accept="video/*" className="text-xs block" onChange={(e) => handleDirectUpload(e, ['overviewVideo'])} />
                  {uploadingField === 'overviewVideo' && <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1"><FaSpinner className="animate-spin"/> Uploading...</span>}
                </div>
                <input type="text" className="w-full border border-gray-300 bg-gray-50 p-2.5 text-xs rounded-xl" placeholder="e.g. /SweetProtection/ProductQualityVideo.mp4" value={formData.overviewVideo} onChange={(e) => setFormData({ ...formData, overviewVideo: e.target.value })} />
              </div>
            </div>

            {/* Dynamic Custom Subdocument Group Tracking Controller Array Track: Presentation Gallery Showcase */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-inner">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Dynamic Project Visual Showcase Gallery Grid Engine</h4>
                  <p className="text-[11px] text-gray-500">Maps visual screenshot modules on scroll-responsive media showcases.</p>
                </div>
                <button type="button" onClick={() => setFormData({ ...formData, gallery: [...formData.gallery, { img: "", text: "" }] })} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg flex items-center gap-1 transition"><FaPlus /> Append Gallery Layer Block</button>
              </div>

              <div className="space-y-2">
                {formData.gallery.map((el: any, i: number) => (
                  <div key={i} className="flex flex-col md:flex-row gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <div className="w-full md:w-1/3">
                      <label className="cursor-pointer bg-white border border-gray-300 px-3 py-1 text-center block rounded-md text-[11px] font-bold">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleArrayElementUpload(e, "gallery", i, "img")} />
                        {uploadingField === `gallery-${i}-img` ? "Uploading Asset..." : "Choose Image File"}
                      </label>
                      <input type="text" className="w-full mt-1 bg-white border text-[11px] rounded p-1" placeholder="Image Storage Asset URL String pointer" value={el.img} onChange={(e) => { const cp = [...formData.gallery]; cp[i].img = e.target.value; setFormData({ ...formData, gallery: cp }); }} />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-400 font-medium">Caption Limit: {(el.text || "").length}/120</span>
                      </div>
                      <input type="text" maxLength={120} className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs" placeholder="Visual confirmation descriptive caption text context annotation..." value={el.text} onChange={(e) => { const cp = [...formData.gallery]; cp[i].text = e.target.value; setFormData({ ...formData, gallery: cp }); }} />
                    </div>
                    <button type="button" onClick={() => setFormData({ ...formData, gallery: formData.gallery.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaTrash /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEWPORTS CORE 3: SYSTEM ADVERSITY CONFLICT LOGS */}
        {formTab === "challenge" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase">System Obstacles / Core Adversity Overview Context Block</label>
                  <span className="text-[10px] text-gray-400 font-medium">{(formData.challenge.data || "").length}/120</span>
                </div>
                <textarea maxLength={120} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl h-20 resize-none" placeholder="Managing a complex product ecosystem while maintaining speed and premium brand identity..." value={formData.challenge.data} onChange={(e) => setFormData({ ...formData, challenge: { ...formData.challenge, data: e.target.value } })} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">System Conflict Verification Tracking Video URL Link</label>
                <div className="flex items-center gap-2 mb-1">
                  <input type="file" accept="video/*" className="text-xs block" onChange={(e) => handleDirectUpload(e, ['ChallengeVideo'])} />
                  {uploadingField === 'ChallengeVideo' && <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1"><FaSpinner className="animate-spin"/> Uploading...</span>}
                </div>
                <input type="text" className="w-full border border-gray-300 bg-gray-50 p-2.5 text-xs rounded-xl" placeholder="e.g. /SweetProtection/productsSectionVideo.mp4" value={formData.ChallengeVideo} onChange={(e) => setFormData({ ...formData, ChallengeVideo: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border p-4 rounded-xl">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Adversity Track Layout Image Slot 1 URL Path</label>
                <input type="file" accept="image/*" className="text-xs mb-1 block" onChange={(e) => handleDirectUpload(e, ["challenge", "image1"])} />
                <input type="text" className="w-full border p-1.5 text-xs rounded bg-white" placeholder="Fallback text URL string representation pointer" value={formData.challenge.image1} onChange={(e) => setFormData({ ...formData, challenge: { ...formData.challenge, image1: e.target.value } })} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Adversity Track Layout Image Slot 2 URL Path</label>
                <input type="file" accept="image/*" className="text-xs mb-1 block" onChange={(e) => handleDirectUpload(e, ["challenge", "image2"])} />
                <input type="text" className="w-full border p-1.5 text-xs rounded bg-white" placeholder="Fallback text URL string representation pointer" value={formData.challenge.image2} onChange={(e) => setFormData({ ...formData, challenge: { ...formData.challenge, image2: e.target.value } })} />
              </div>
            </div>

            {/* Dynamic Custom Subdocument Point Matrix Breakdowns Array Track: Adversity Obstacles Point Tracks */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-inner">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Granular System Conflict Target Identification Metrics Point Blocks</h4>
                  <p className="text-[11px] text-gray-500">Maps bulleted problem vectors across layout frames.</p>
                </div>
                <button type="button" onClick={() => setFormData({ ...formData, challenge: { ...formData.challenge, point: [...formData.challenge.point, { name: "", detail: "" }] } })} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 font-bold text-xs rounded-lg flex items-center gap-1 transition"><FaPlus /> Add Conflict Point</button>
              </div>

              <div className="space-y-2">
                {formData.challenge.point.map((pt: any, i: number) => (
                  <div key={i} className="flex flex-col md:flex-row gap-3 items-start bg-gray-50 p-2 rounded-xl border border-gray-200 w-full">
                    <div className="w-full md:w-1/4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-400 font-medium">Name: {(pt.name || "").length}/80</span>
                      </div>
                      <input type="text" maxLength={80} className="w-full bg-white border p-2 text-xs font-bold rounded-lg" placeholder="e.g. Catalog Complexity" value={pt.name} onChange={(e) => {
                        const updated = [...formData.challenge.point]; updated[i].name = e.target.value; setFormData({ ...formData, challenge: { ...formData.challenge, point: updated } });
                      }} />
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-400 font-medium">Detail: {(pt.detail || "").length}/150</span>
                      </div>
                      <textarea maxLength={150} className="w-full bg-white border p-2 text-xs rounded-lg h-11 resize-none" placeholder="Managing multiple categories (helmets, cycling, apparel) with numerous variants..." value={pt.detail} onChange={(e) => {
                        const updated = [...formData.challenge.point]; updated[i].detail = e.target.value; setFormData({ ...formData, challenge: { ...formData.challenge, point: updated } });
                      }} />
                    </div>
                    <button type="button" onClick={() => {
                      const updated = formData.challenge.point.filter((_: any, idx: number) => idx !== i); setFormData({ ...formData, challenge: { ...formData.challenge, point: updated } });
                    }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg self-center"><FaTrash /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEWPORTS CORE 4: DEPLOYMENTS, STRATEGIC METRICS & LIFECYCLE IMPACTS */}
        {formTab === "results" && (
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Tactical Approach Deployment Execution Sequence Video URL Track</label>
                <div className="flex items-center gap-2 mb-1">
                  <input type="file" accept="video/*" className="text-xs block" onChange={(e) => handleDirectUpload(e, ['ApproachVideo'])} />
                  {uploadingField === 'ApproachVideo' && <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1"><FaSpinner className="animate-spin"/> Uploading...</span>}
                </div>
                <input type="text" className="w-full border border-gray-300 bg-gray-50 p-2.5 text-xs rounded-xl" placeholder="e.g. /SweetProtection/EndOfCaseVideo.mp4" value={formData.ApproachVideo} onChange={(e) => setFormData({ ...formData, ApproachVideo: e.target.value })} />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Analytical Performance Solution Result Verification Video URL Track</label>
                <div className="flex items-center gap-2 mb-1">
                  <input type="file" accept="video/*" className="text-xs block" onChange={(e) => handleDirectUpload(e, ['ResultVideo'])} />
                  {uploadingField === 'ResultVideo' && <span className="text-[10px] text-blue-500 font-bold flex items-center gap-1"><FaSpinner className="animate-spin"/> Uploading...</span>}
                </div>
                {formData.ResultVideo && (
                  <video src={formData.ResultVideo} controls className="mt-2 w-full max-h-64">
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>

            {/* Subdocument Matrix Controller Panel Group 1: Strategic System Integration Approaches */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Executed Architecture Integration Tactical Approaches Array Logs</span>
                <button type="button" onClick={() => setFormData({ ...formData, approaches: [...formData.approaches, { name: "", detail: "" }] })} className="px-2.5 py-1 text-xs font-bold bg-white border rounded shadow-sm hover:bg-gray-100 flex items-center gap-1"><FaPlus /> Add Approach Link</button>
              </div>
              <div className="space-y-2">
                {formData.approaches.map((ap: any, i: number) => (
                  <div key={i} className="flex gap-2 items-center bg-white p-2 rounded-lg border w-full">
                    <div className="w-1/4">
                      <span className="text-[9px] text-gray-400 block mb-0.5">Name: {(ap.name || "").length}/80</span>
                      <input type="text" maxLength={80} placeholder="Strategy Label Name" className="w-full bg-gray-50 p-1.5 text-xs rounded font-bold" value={ap.name} onChange={(e) => { const cp = [...formData.approaches]; cp[i].name = e.target.value; setFormData({ ...formData, approaches: cp }); }} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] text-gray-400 block mb-0.5">Detail: {(ap.detail || "").length}/150</span>
                      <input type="text" maxLength={150} placeholder="Deep strategic roadmap structural resolution breakdown details context..." className="w-full bg-gray-50 p-1.5 text-xs rounded" value={ap.detail} onChange={(e) => { const cp = [...formData.approaches]; cp[i].detail = e.target.value; setFormData({ ...formData, approaches: cp }); }} />
                    </div>
                    <button type="button" onClick={() => setFormData({ ...formData, approaches: formData.approaches.filter((_: any, idx: number) => idx !== i) })} className="text-red-500 p-1.5 hover:bg-red-50 rounded self-end mb-0.5"><FaTrash /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Subdocument Complex Box Array Track Group 2: Quantified Performance Outcome Results Dashboard Cards */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quantified Analytical Solution System Result Metrics Display Blocks</span>
                <button type="button" onClick={() => setFormData({ ...formData, results: [...formData.results, { img: "", title: "", highlight: "", data: "" }] })} className="px-2.5 py-1 text-xs font-bold bg-white border rounded shadow-sm hover:bg-gray-100 flex items-center gap-1"><FaPlus /> Add Performance Metric Block</button>
              </div>
              <div className="space-y-3">
                {formData.results.map((re: any, i: number) => (
                  <div key={i} className="bg-white border rounded-xl p-3 grid grid-cols-1 md:grid-cols-4 gap-2 items-start relative">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400">Card Graphic Icon</label>
                      <input type="file" accept="image/*" className="text-[10px] w-full" onChange={(e) => handleArrayElementUpload(e, "results", i, "img")} />
                      <input type="text" className="w-full mt-1 bg-gray-50 p-1 text-[11px] rounded border" placeholder="URL Path Link" value={re.img} onChange={(e) => { const cp = [...formData.results]; cp[i].img = e.target.value; setFormData({ ...formData, results: cp }); }} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-0.5">
                        <label className="block text-[10px] font-bold text-gray-400">Title Header Frame</label>
                        <span className="text-[9px] text-gray-400 font-medium">{(re.title || "").length}/80</span>
                      </div>
                      <input type="text" maxLength={80} className="w-full bg-gray-50 p-1.5 text-xs rounded border" placeholder="e.g. Improved " value={re.title} onChange={(e) => { const cp = [...formData.results]; cp[i].title = e.target.value; setFormData({ ...formData, results: cp }); }} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-0.5">
                        <label className="block text-[10px] font-bold text-gray-400">Highlight Metric Label</label>
                        <span className="text-[9px] text-gray-400 font-medium">{(re.highlight || "").length}/80</span>
                      </div>
                      <input type="text" maxLength={80} className="w-full bg-gray-50 p-1.5 text-xs rounded border text-blue-600 font-bold" placeholder="e.g. Conversion Rates" value={re.highlight} onChange={(e) => { const cp = [...formData.results]; cp[i].highlight = e.target.value; setFormData({ ...formData, results: cp }); }} />
                    </div>
                    <div className="flex gap-1 items-center w-full">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-0.5">
                          <label className="block text-[10px] font-bold text-gray-400">Supporting Context</label>
                          <span className="text-[9px] text-gray-400 font-medium">{(re.data || "").length}/120</span>
                        </div>
                        <input type="text" maxLength={120} className="w-full bg-gray-50 p-1.5 text-xs rounded border" placeholder="Streamlined checkout process led to an increase..." value={re.data} onChange={(e) => { const cp = [...formData.results]; cp[i].data = e.target.value; setFormData({ ...formData, results: cp }); }} />
                      </div>
                      <button type="button" onClick={() => setFormData({ ...formData, results: formData.results.filter((_: any, idx: number) => idx !== i) })} className="text-red-500 p-1.5 hover:bg-red-50 rounded mt-4"><FaTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subdocument Matrix Controller Panel Group 3: Macro Downstream Organizational Lifecycle Business Impacts */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Post-Deployment Macro Financial/Business Structural Impacts List Logs</span>
                <button type="button" onClick={() => setFormData({ ...formData, impacts: [...formData.impacts, { name: "", detail: "" }] })} className="px-2.5 py-1 text-xs font-bold bg-white border rounded shadow-sm hover:bg-gray-100 flex items-center gap-1"><FaPlus /> Add Impact Vector Element</button>
              </div>
              <div className="space-y-2">
                {formData.impacts.map((im: any, i: number) => (
                  <div key={i} className="flex gap-2 items-center bg-white p-2 rounded-lg border w-full">
                    <div className="w-1/4">
                      <span className="text-[9px] text-gray-400 block mb-0.5">Name: {(im.name || "").length}/80</span>
                      <input type="text" maxLength={80} placeholder="Impact Vector Variable Label" className="w-full bg-gray-50 p-1.5 text-xs rounded font-bold" value={im.name} onChange={(e) => { const cp = [...formData.impacts]; cp[i].name = e.target.value; setFormData({ ...formData, impacts: cp }); }} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] text-gray-400 block mb-0.5">Detail: {(im.detail || "").length}/150</span>
                      <input type="text" maxLength={150} placeholder="Quantifiable lifecycle business or fiscal organizational lifecycle outcome shifts..." className="w-full bg-gray-50 p-1.5 text-xs rounded" value={im.detail} onChange={(e) => { const cp = [...formData.impacts]; cp[i].detail = e.target.value; setFormData({ ...formData, impacts: cp }); }} />
                    </div>
                    <button type="button" onClick={() => setFormData({ ...formData, impacts: formData.impacts.filter((_: any, idx: number) => idx !== i) })} className="text-red-500 p-1.5 hover:bg-red-50 rounded self-end mb-0.5"><FaTrash /></button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-bold text-gray-500 uppercase">Final Concluding Technical Architecture Project Summary Notes Block</label>
                <span className="text-[10px] text-gray-400 font-medium">{(formData.detail || "").length}/300</span>
              </div>
              <textarea maxLength={300} className="w-full border border-gray-300 bg-gray-50 p-2.5 text-sm rounded-xl h-20 outline-none focus:border-blue-500 focus:bg-white resize-none" placeholder="By integrating a dynamic ReactJS frontend with a custom backend and specialized CMS..." value={formData.detail} onChange={(e) => setFormData({ ...formData, detail: e.target.value })} />
            </div>
          </div>
        )}

        {/* VIEWPORTS CORE 5: DUAL PANEL HIGHLIGHT SECTION SCHEMAS */}
        {formTab === "twoImage" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left Column Config Panel Sub-Object Frame */}
              <div className="border border-gray-200 p-4 bg-gray-50 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">A. Twin Showcase Layout Section Left Column Config</h3>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1">Left Background Panel Image Graphic URL Path</label>
                  <input type="file" accept="image/*" className="text-xs mb-1 block" onChange={(e) => handleDirectUpload(e, ["twoImage", "leftPanel", "bgImage"])} />
                  <input type="text" className="w-full border p-2 text-xs rounded bg-white" placeholder="URL storage location tracking string" value={formData.twoImage.leftPanel.bgImage} onChange={(e) => setFormData({ ...formData, twoImage: { ...formData.twoImage, leftPanel: { ...formData.twoImage.leftPanel, bgImage: e.target.value } } })} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold text-gray-500">Upper Typography Tag</label>
                      <span className="text-[9px] text-gray-400 font-medium">{(formData.twoImage.leftPanel.topLabel || "").length}/30</span>
                    </div>
                    <input type="text" maxLength={30} className="w-full border p-2 text-xs rounded bg-white" placeholder="e.g. Commerce" value={formData.twoImage.leftPanel.topLabel} onChange={(e) => setFormData({ ...formData, twoImage: { ...formData.twoImage, leftPanel: { ...formData.twoImage.leftPanel, topLabel: e.target.value } } })} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold text-gray-500">Lower Typography Tag</label>
                      <span className="text-[9px] text-gray-400 font-medium">{(formData.twoImage.leftPanel.bottomLabel || "").length}/30</span>
                    </div>
                    <input type="text" maxLength={30} className="w-full border p-2 text-xs rounded bg-white" placeholder="e.g. Performance Hub" value={formData.twoImage.leftPanel.bottomLabel} onChange={(e) => setFormData({ ...formData, twoImage: { ...formData.twoImage, leftPanel: { ...formData.twoImage.leftPanel, bottomLabel: e.target.value } } })} />
                  </div>
                </div>
              </div>

              {/* Right Column Config Panel Sub-Object Frame */}
              <div className="border border-gray-200 p-4 bg-gray-50 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">B. Twin Showcase Layout Section Right Column Config</h3>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1">Right Background Panel Image Graphic URL Path</label>
                  <input type="file" accept="image/*" className="text-xs mb-1 block" onChange={(e) => handleDirectUpload(e, ["twoImage", "rightPanel", "bgImage"])} />
                  <input type="text" className="w-full border p-2 text-xs rounded bg-white" placeholder="URL storage location tracking string" value={formData.twoImage.rightPanel.bgImage} onChange={(e) => setFormData({ ...formData, twoImage: { ...formData.twoImage, rightPanel: { ...formData.twoImage.rightPanel, bgImage: e.target.value } } })} />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}