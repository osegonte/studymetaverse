"use client";
import { useState } from "react";
import { FormField, inputClass, selectClass, textareaClass, NewsPost } from "../_shared/types";

const emptyPost: NewsPost = {
  title: "", slug: "", body: "", excerpt: "",
  category: "", cover_image_url: "", is_published: false, published_at: "",
};

const mockPosts: NewsPost[] = [
  { id: "1", title: "New Engineering Programmes for 2025", slug: "new-engineering-programmes-2025", body: "...", excerpt: "Several top German universities have opened applications for new engineering master's programmes.", category: "Programmes", cover_image_url: "", is_published: true, published_at: "2025-01-15" },
  { id: "2", title: "Germany Visa Changes for International Students", slug: "germany-visa-changes-2025", body: "...", excerpt: "Important updates to the student visa application process for non-EU applicants.", category: "Visa", cover_image_url: "", is_published: false, published_at: "" },
] as (NewsPost & { id: string })[];

const CATEGORIES = ["Admissions", "Programmes", "Scholarships", "Visa", "Career", "Life in Germany", "News"];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NewsPage() {
  const [posts, setPosts] = useState(mockPosts as (NewsPost & { id: string })[]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<(NewsPost & { id: string }) | null>(null);
  const [form, setForm] = useState<NewsPost>(emptyPost);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openNew = () => { setForm(emptyPost); setEditing(null); setShowForm(true); };
  const openEdit = (p: NewsPost & { id: string }) => { setForm({ ...p }); setEditing(p); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = () => {
    if (!form.title) return;
    const final = { ...form, slug: form.slug || slugify(form.title) };
    if (editing) {
      setPosts(prev => prev.map(p => p.id === editing.id ? { ...p, ...final } : p));
    } else {
      setPosts(prev => [...prev, { ...final, id: Date.now().toString() }]);
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  const set = (field: keyof NewsPost) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const setCheck = (field: keyof NewsPost) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.checked }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm(prev => ({ ...prev, title, slug: slugify(title) }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">News Posts</h1>
          <p className="text-gray-400 text-sm mt-0.5">{posts.length} posts in database</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#1a3c5e] text-white font-semibold text-[13.5px] rounded-xl hover:bg-[#14304d] transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm font-medium">No news posts yet.</p>
            <button onClick={openNew} className="mt-3 text-[#1a3c5e] text-sm font-semibold hover:underline">Write your first post</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Title", "Category", "Slug", "Status", "Date", ""].map(h => (
                    <th key={h} className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-[#1a3c5e] text-[13.5px] max-w-[220px]">
                      <p className="truncate">{p.title}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      {p.category && (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1a3c5e]/8 text-[#1a3c5e]">{p.category}</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-[12px] font-mono">{p.slug}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${p.is_published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                        {p.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-[13px]">{p.published_at || "—"}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-[#1a3c5e] hover:bg-gray-100 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteConfirm(p.id!)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-extrabold text-[#1a3c5e] text-lg mb-2">Delete Post?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-semibold text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-extrabold text-[#1a3c5e] text-lg">{editing ? "Edit Post" : "New Post"}</h2>
              <button onClick={closeForm} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              <FormField label="Title" required>
                <input className={inputClass} value={form.title} onChange={handleTitleChange} placeholder="e.g. New Engineering Programmes for 2025" />
              </FormField>

              <FormField label="Slug" hint="Auto-generated from title — edit if needed">
                <input className={inputClass} value={form.slug} onChange={set("slug")} placeholder="new-engineering-programmes-2025" />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Category">
                  <select className={selectClass} value={form.category} onChange={set("category")}>
                    <option value="">Select category...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Cover Image URL">
                  <input className={inputClass} value={form.cover_image_url} onChange={set("cover_image_url")} placeholder="https://..." />
                </FormField>
              </div>

              <FormField label="Excerpt" hint="Short summary shown on news cards (max 160 chars)">
                <textarea className={textareaClass} rows={2} value={form.excerpt} onChange={set("excerpt")} placeholder="Brief description for the news card..." maxLength={160} />
              </FormField>

              <FormField label="Body Content" required>
                <textarea className={textareaClass} rows={10} value={form.body} onChange={set("body")} placeholder="Full article content..." />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Publish Date">
                  <input className={inputClass} type="date" value={form.published_at} onChange={set("published_at")} />
                </FormField>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.is_published} onChange={setCheck("is_published")}
                      className="w-4 h-4 accent-[#1a3c5e]" />
                    <div>
                      <p className="font-semibold text-gray-700 text-[13.5px]">Publish immediately</p>
                      <p className="text-gray-400 text-[12px]">Make visible on the site</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
              <button onClick={closeForm} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold text-[13.5px] hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-[#1a3c5e] text-white font-bold text-[13.5px] rounded-xl hover:bg-[#14304d]">
                {editing ? "Save Changes" : "Publish Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}