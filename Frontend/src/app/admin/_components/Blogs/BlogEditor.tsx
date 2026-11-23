"use client";

import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaExternalLinkAlt, FaPlus, FaTimesCircle, FaTrash } from "react-icons/fa";
import RichTextEditor from "./RichTextEditor";
import { type BlogDraft, effectiveDescription, effectiveTitle, runSeoChecks, toSlug } from "./seoChecks";

const EMPTY: BlogDraft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  coverImageAlt: "",
  author: "Obsidian Six",
  category: "",
  tags: "",
  status: "draft",
  publishedAt: "",
  seo: { metaTitle: "", metaDescription: "", focusKeyword: "", canonicalUrl: "", ogImage: "", noindex: false },
  faq: [],
};

const SITE = "https://obsidiansix.com";

function toLocalInput(date?: string) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const input =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#052D69] focus:outline-none focus:ring-4 focus:ring-[#052D69]/10";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

function Counter({ value, min, max }: { value: number; min: number; max: number }) {
  const ok = value >= min && value <= max;
  return <span className={`text-xs font-semibold ${ok ? "text-green-600" : value > max ? "text-red-600" : "text-amber-600"}`}>{value}/{max}</span>;
}

interface Props {
  token: string | null;
  apiBase: string;
  postId: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function BlogEditor({ token, apiBase, postId, onClose, onSaved }: Props) {
  const [draft, setDraft] = useState<BlogDraft>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(Boolean(postId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [savedSlug, setSavedSlug] = useState("");
  const [id, setId] = useState<string | null>(postId);

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);
  const media = (p: string) => (!p ? "" : /^https?:\/\//.test(p) ? p : `${apiBase}${p}`);

  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/blogs/admin/${postId}`, { headers: authHeaders });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Could not load the post");
        const p = data.data;
        setDraft({
          _id: p._id,
          title: p.title || "",
          slug: p.slug || "",
          excerpt: p.excerpt || "",
          content: p.content || "",
          coverImage: p.coverImage || "",
          coverImageAlt: p.coverImageAlt || "",
          author: p.author || "Obsidian Six",
          category: p.category || "",
          tags: (p.tags || []).join(", "),
          status: p.status || "draft",
          publishedAt: toLocalInput(p.publishedAt),
          seo: { ...EMPTY.seo, ...(p.seo || {}) },
          faq: p.faq || [],
        });
        setSavedSlug(p.status !== "draft" ? p.slug : "");
        setSlugTouched(true);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [postId, apiBase, authHeaders]);

  const set = <K extends keyof BlogDraft>(key: K, value: BlogDraft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const setSeo = <K extends keyof BlogDraft["seo"]>(key: K, value: BlogDraft["seo"][K]) =>
    setDraft((d) => ({ ...d, seo: { ...d.seo, [key]: value } }));

  const { checks, score, words } = useMemo(() => runSeoChecks(draft), [draft]);

  const upload = async (file: File): Promise<string | null> => {
    setError("");
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch(`${apiBase}/api/blogs/upload`, { method: "POST", headers: authHeaders, body: fd });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Upload failed");
      return media(data.path);
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  };

  const save = async (status?: BlogDraft["status"]) => {
    setError("");
    setNotice("");
    if (!draft.title.trim()) return setError("Add a title first.");
    const nextStatus = status || draft.status;
    if (nextStatus === "scheduled" && !draft.publishedAt) return setError("Pick a date and time for the scheduled post.");

    setSaving(true);
    try {
      const body = {
        ...draft,
        status: nextStatus,
        slug: draft.slug || toSlug(draft.title),
        tags: draft.tags,
        publishedAt: draft.publishedAt ? new Date(draft.publishedAt).toISOString() : nextStatus === "draft" ? null : undefined,
        faq: draft.faq.filter((f) => f.question.trim() && f.answer.trim()),
      };
      delete (body as any)._id;
      const res = await fetch(`${apiBase}/api/blogs${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Save failed");
      const p = data.data;
      setId(p._id);
      setDraft((d) => ({ ...d, _id: p._id, slug: p.slug, status: p.status, excerpt: p.excerpt, publishedAt: toLocalInput(p.publishedAt) }));
      setSavedSlug(p.status !== "draft" ? p.slug : "");
      setNotice(
        p.status === "published"
          ? "Published. It will appear on the website within a minute."
          : p.status === "scheduled"
            ? "Scheduled. It goes live at the chosen time."
            : "Draft saved."
      );
      onSaved();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-gray-500">Loading post…</div>;

  const title = effectiveTitle(draft);
  const description = effectiveDescription(draft);
  const scoreColor = score >= 80 ? "text-green-600" : score >= 50 ? "text-amber-600" : "text-red-600";

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={onClose} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100">
          <FaArrowLeft /> All posts
        </button>
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${draft.status === "published" ? "bg-green-100 text-green-700" : draft.status === "scheduled" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
          {draft.status}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {savedSlug && (
            <a href={`/blogs/${savedSlug}/`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#052D69] hover:bg-blue-50">
              View live <FaExternalLinkAlt className="text-xs" />
            </a>
          )}
          <button type="button" disabled={saving} onClick={() => save("draft")} className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50">
            Save draft
          </button>
          {draft.status === "scheduled" ? (
            <button type="button" disabled={saving} onClick={() => save("scheduled")} className="rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50">
              Save schedule
            </button>
          ) : (
            <button type="button" disabled={saving} onClick={() => save("published")} className="rounded-xl bg-[#052D69] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50">
              {draft.status === "published" ? "Update" : "Publish"}
            </button>
          )}
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {notice && <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{notice}</div>}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* LEFT: writing */}
        <div className="space-y-5 xl:col-span-8">
          <div>
            <label className={label} htmlFor="b-title">Title (the page H1)</label>
            <input
              id="b-title"
              className={`${input} text-2xl font-bold`}
              value={draft.title}
              placeholder="e.g. How much does SEO cost in India in 2027?"
              onChange={(e) => {
                const v = e.target.value;
                setDraft((d) => ({ ...d, title: v, slug: slugTouched ? d.slug : toSlug(v) }));
              }}
            />
          </div>

          <div>
            <label className={label} htmlFor="b-slug">URL slug</label>
            <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white focus-within:border-[#052D69]">
              <span className="whitespace-nowrap bg-gray-50 px-3 py-2.5 text-sm text-gray-500">obsidiansix.com/blogs/</span>
              <input
                id="b-slug"
                className="w-full px-3 py-2.5 text-sm focus:outline-none"
                value={draft.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"));
                }}
                onBlur={() => set("slug", toSlug(draft.slug))}
              />
            </div>
            {savedSlug && draft.slug !== savedSlug && (
              <p className="mt-1.5 text-xs text-amber-700">Changing the slug of a live post is safe: the old URL will redirect to the new one.</p>
            )}
          </div>

          <RichTextEditor value={draft.content} onChange={(html) => set("content", html)} onUploadImage={upload} />
          <p className="text-xs text-gray-500">{words} words · about {Math.max(1, Math.round(words / 220))} min read</p>

          <div>
            <label className={label} htmlFor="b-excerpt">Excerpt (shown on the blog list)</label>
            <textarea id="b-excerpt" rows={3} className={input} value={draft.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="One or two sentences. Leave empty to use the first paragraph." />
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">FAQ</h3>
                <p className="text-xs text-gray-500">Shown at the end of the post and sent to Google as FAQ data.</p>
              </div>
              <button type="button" onClick={() => set("faq", [...draft.faq, { question: "", answer: "" }])} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#052D69] hover:bg-blue-50">
                <FaPlus /> Add question
              </button>
            </div>
            <div className="space-y-3">
              {draft.faq.map((f, i) => (
                <div key={i} className="grid gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="flex gap-2">
                    <input className={input} placeholder="Question" value={f.question} onChange={(e) => set("faq", draft.faq.map((x, j) => (j === i ? { ...x, question: e.target.value } : x)))} />
                    <button type="button" aria-label="Remove question" onClick={() => set("faq", draft.faq.filter((_, j) => j !== i))} className="rounded-lg px-3 text-red-600 hover:bg-red-50">
                      <FaTrash />
                    </button>
                  </div>
                  <textarea rows={2} className={input} placeholder="Answer" value={f.answer} onChange={(e) => set("faq", draft.faq.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)))} />
                </div>
              ))}
              {draft.faq.length === 0 && <p className="text-sm text-gray-400">No questions yet.</p>}
            </div>
          </div>
        </div>

        {/* RIGHT: settings + SEO */}
        <div className="space-y-5 xl:col-span-4">
          {/* SEO score */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="font-bold text-gray-900">SEO check</h3>
              <span className={`text-3xl font-black ${scoreColor}`}>{score}</span>
            </div>
            <ul className="space-y-2">
              {checks.map((c) => (
                <li key={c.label} className="flex gap-2 text-sm">
                  {c.ok ? <FaCheckCircle className="mt-0.5 shrink-0 text-green-600" /> : <FaTimesCircle className="mt-0.5 shrink-0 text-red-400" />}
                  <span>
                    <span className={c.ok ? "text-gray-700" : "font-medium text-gray-900"}>{c.label}</span>
                    {!c.ok && <span className="block text-xs text-gray-500">{c.tip}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Google preview */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 font-bold text-gray-900">Google preview</h3>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="truncate text-xs text-gray-600">obsidiansix.com › blogs › {draft.slug || "your-slug"}</p>
              <p className="mt-1 line-clamp-1 text-lg text-[#1a0dab]">{title || "Your title"}</p>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600">{description || "Your meta description"}</p>
            </div>
          </div>

          {/* SEO fields */}
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="font-bold text-gray-900">SEO settings</h3>
            <div>
              <label className={label} htmlFor="s-kw">Focus keyword</label>
              <input id="s-kw" className={input} value={draft.seo.focusKeyword} onChange={(e) => setSeo("focusKeyword", e.target.value)} placeholder="e.g. seo cost in india" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className={label} htmlFor="s-title">SEO title</label>
                <Counter value={title.length} min={30} max={60} />
              </div>
              <input id="s-title" className={input} value={draft.seo.metaTitle} onChange={(e) => setSeo("metaTitle", e.target.value)} placeholder={draft.title ? `${draft.title} | Obsidian Six` : "Leave empty to use the title"} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className={label} htmlFor="s-desc">Meta description</label>
                <Counter value={description.length} min={120} max={160} />
              </div>
              <textarea id="s-desc" rows={3} className={input} value={draft.seo.metaDescription} onChange={(e) => setSeo("metaDescription", e.target.value)} placeholder="Why should someone click this result?" />
            </div>
            <div>
              <label className={label} htmlFor="s-canon">Canonical URL (optional)</label>
              <input id="s-canon" className={input} value={draft.seo.canonicalUrl} onChange={(e) => setSeo("canonicalUrl", e.target.value)} placeholder={`${SITE}/blogs/${draft.slug || "slug"}/`} />
              <p className="mt-1 text-xs text-gray-500">Only fill this if the same article is published on another site first.</p>
            </div>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1" checked={draft.seo.noindex} onChange={(e) => setSeo("noindex", e.target.checked)} />
              <span>
                <span className="font-medium text-gray-900">Hide from Google (noindex)</span>
                <span className="block text-xs text-gray-500">The post stays on the site but is not shown in search results.</span>
              </span>
            </label>
          </div>

          {/* Cover image */}
          <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="font-bold text-gray-900">Cover image</h3>
            {draft.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media(draft.coverImage)} alt={draft.coverImageAlt} className="aspect-video w-full rounded-xl object-cover" />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400">No image</div>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif"
              className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:font-semibold"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                const url = await upload(f);
                if (url) set("coverImage", url);
              }}
            />
            <div>
              <label className={label} htmlFor="c-url">Or paste an image URL</label>
              <input id="c-url" className={input} value={draft.coverImage} onChange={(e) => set("coverImage", e.target.value.trim())} placeholder="https://…" />
            </div>
            <div>
              <label className={label} htmlFor="c-alt">Alt text</label>
              <input id="c-alt" className={input} value={draft.coverImageAlt} onChange={(e) => set("coverImageAlt", e.target.value)} placeholder="Describe what the image shows" />
            </div>
            <div>
              <label className={label} htmlFor="c-og">Social share image (optional)</label>
              <input id="c-og" className={input} value={draft.seo.ogImage} onChange={(e) => setSeo("ogImage", e.target.value)} placeholder="Leave empty to use the cover image" />
            </div>
          </div>

          {/* Publishing */}
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="font-bold text-gray-900">Publishing</h3>
            <div>
              <label className={label} htmlFor="p-status">Status</label>
              <select id="p-status" className={input} value={draft.status} onChange={(e) => set("status", e.target.value as BlogDraft["status"])}>
                <option value="draft">Draft (not on the website)</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div>
              <label className={label} htmlFor="p-date">{draft.status === "scheduled" ? "Go live on" : "Publish date"}</label>
              <input id="p-date" type="datetime-local" className={input} value={draft.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
            </div>
            <div>
              <label className={label} htmlFor="p-cat">Category</label>
              <input id="p-cat" className={input} value={draft.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. SEO, Performance Marketing, Web Development" />
            </div>
            <div>
              <label className={label} htmlFor="p-tags">Tags (comma separated)</label>
              <input id="p-tags" className={input} value={draft.tags} onChange={(e) => set("tags", e.target.value)} placeholder="seo, google ads, bhopal" />
            </div>
            <div>
              <label className={label} htmlFor="p-author">Author</label>
              <input id="p-author" className={input} value={draft.author} onChange={(e) => set("author", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
