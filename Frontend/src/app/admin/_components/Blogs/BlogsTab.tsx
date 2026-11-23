"use client";

import { useCallback, useEffect, useState } from "react";
import { FaCloudDownloadAlt, FaEdit, FaExternalLinkAlt, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

interface ListPost {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "scheduled";
  publishedAt?: string;
  updatedAt: string;
  wordCount?: number;
  category?: string;
  source?: string;
  seo?: { focusKeyword?: string; noindex?: boolean };
}

interface Props {
  token: string | null;
  apiBase: string;
  onOpenCreate: () => void;
  onOpenEdit: (id: string) => void;
}

const fmt = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function BlogsTab({ token, apiBase, onOpenCreate, onOpenEdit }: Props) {
  const [posts, setPosts] = useState<ListPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [importing, setImporting] = useState(false);
  // Inline "click again to confirm" instead of window.confirm, which some
  // browsers and embedded panes block silently.
  const [confirmImport, setConfirmImport] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const headers = { Authorization: `Bearer ${token}` };

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`${apiBase}/api/blogs/admin/all?${params}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Could not load posts");
      setPosts(data.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [apiBase, token, status, q]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  const remove = async (p: ListPost) => {
    if (confirmDeleteId !== p._id) {
      setConfirmDeleteId(p._id);
      setTimeout(() => setConfirmDeleteId((id) => (id === p._id ? null : id)), 5000);
      return;
    }
    setConfirmDeleteId(null);
    const res = await fetch(`${apiBase}/api/blogs/${p._id}`, { method: "DELETE", headers });
    const data = await res.json();
    if (!res.ok || !data.success) return setError(data.message || "Delete failed");
    setNotice("Post deleted.");
    load();
  };

  const importWordPress = async () => {
    if (!confirmImport) {
      setConfirmImport(true);
      setTimeout(() => setConfirmImport(false), 6000);
      return;
    }
    setConfirmImport(false);
    setImporting(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch(`${apiBase}/api/blogs/import/wordpress`, { method: "POST", headers });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Import failed");
      setNotice(`Imported ${data.created} new post(s), skipped ${data.skipped} already in the CMS${data.failed?.length ? `, ${data.failed.length} failed` : ""}.`);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setImporting(false);
    }
  };

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    drafts: posts.filter((p) => p.status === "draft").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Blog posts</h1>
          <p className="mt-1 text-sm text-gray-500">Write, edit and publish articles on obsidiansix.com/blogs.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={importWordPress} disabled={importing} className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50">
            <FaCloudDownloadAlt />{" "}
            {importing ? "Importing… (about 30 seconds)" : confirmImport ? "Click again to import" : "Import from WordPress"}
          </button>
          <button type="button" onClick={onOpenCreate} className="flex items-center gap-2 rounded-xl bg-[#052D69] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
            <FaPlus /> New post
          </button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {notice && <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{notice}</div>}

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title or slug" className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#052D69] focus:outline-none" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm">
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="scheduled">Scheduled</option>
        </select>
        {!status && !q && (
          <span className="text-sm text-gray-500">
            {counts.published} published · {counts.drafts} drafts
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Status</th>
              <th className="hidden px-5 py-3 md:table-cell">Date</th>
              <th className="hidden px-5 py-3 lg:table-cell">Words</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-gray-400">Loading…</td>
              </tr>
            )}
            {!loading && posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-gray-500">
                  No posts yet. Click <b>New post</b>, or <b>Import from WordPress</b> to bring in the old articles.
                </td>
              </tr>
            )}
            {!loading &&
              posts.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <button type="button" onClick={() => onOpenEdit(p._id)} className="text-left font-semibold text-gray-900 hover:text-[#052D69]">
                      {p.title}
                    </button>
                    <div className="mt-0.5 text-xs text-gray-500">
                      /blogs/{p.slug}
                      {p.category ? ` · ${p.category}` : ""}
                      {p.source === "api" ? " · via API" : p.source === "wordpress" ? " · imported" : ""}
                      {p.seo?.noindex ? " · hidden from Google" : ""}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${p.status === "published" ? "bg-green-100 text-green-700" : p.status === "scheduled" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 text-gray-600 md:table-cell">{fmt(p.publishedAt || p.updatedAt)}</td>
                  <td className="hidden px-5 py-4 text-gray-600 lg:table-cell">{p.wordCount ?? 0}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      {p.status !== "draft" && (
                        <a href={`/blogs/${p.slug}/`} target="_blank" rel="noreferrer" title="View on website" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#052D69]">
                          <FaExternalLinkAlt />
                        </a>
                      )}
                      <button type="button" title="Edit" onClick={() => onOpenEdit(p._id)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#052D69]">
                        <FaEdit />
                      </button>
                      <button type="button" title="Delete" onClick={() => remove(p)} className={`rounded-lg p-2 text-sm font-semibold ${confirmDeleteId === p._id ? "bg-red-600 text-white" : "text-gray-500 hover:bg-red-50 hover:text-red-600"}`}>
                        {confirmDeleteId === p._id ? "Delete?" : <FaTrash />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
