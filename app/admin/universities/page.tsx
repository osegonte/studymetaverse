"use client";
import { useState, useEffect } from "react";
import { supabase, University, InstitutionType } from "@/lib/supabase";
import { FormField, inputClass, selectClass, textareaClass } from "../_shared/types";

interface FormState {
  name: string;
  city: string;
  type: InstitutionType;
  website_url: string;
  description: string;
  address: string;
  student_count: string;
  ranking: string;
  logo_url: string;
  image_url: string;
}

const emptyUniversity: FormState = {
  name: "", city: "", type: "public", website_url: "", description: "",
  address: "", student_count: "", ranking: "", logo_url: "", image_url: "",
};

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<University | null>(null);
  const [form, setForm] = useState<FormState>(emptyUniversity);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Import state
  const [showImport, setShowImport] = useState(false);
  const [importUrl, setImportUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => { fetchUniversities(); }, []);

  async function fetchUniversities() {
    setLoading(true);
    const { data, error } = await supabase.from("universities").select("*").order("name");
    if (error) setError(error.message);
    else setUniversities(data ?? []);
    setLoading(false);
  }

  const filtered = universities.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.city.toLowerCase().includes(search.toLowerCase())
  );

  async function handleImport() {
    if (!importUrl.trim()) return;
    setImporting(true);
    setImportError(null);
    try {
      const res = await fetch("/api/admin/import-university", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: importUrl.trim() }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setImportError(json.error ?? "Failed to extract university data.");
        return;
      }
      const d = json.data;
      setForm({
        name: d.name ?? "",
        city: d.city ?? "",
        type: d.type ?? "public",
        website_url: d.website_url ?? importUrl.split("/").slice(0, 3).join("/"),
        description: d.description ?? "",
        address: d.address ?? "",
        student_count: d.student_count ? String(d.student_count) : "",
        ranking: d.ranking ?? "",
        logo_url: d.logo_url ?? "",
        image_url: "",
      });
      setEditing(null);
      setShowImport(false);
      setImportUrl("");
      setShowForm(true);
    } catch {
      setImportError("Something went wrong. Please try again.");
    } finally {
      setImporting(false);
    }
  }

  const openNew = () => { setForm(emptyUniversity); setEditing(null); setShowForm(true); };
  const openEdit = (u: University) => {
    setForm({
      name: u.name, city: u.city, type: u.type,
      website_url: u.website_url ?? "", description: u.description ?? "",
      address: u.address ?? "", student_count: String(u.student_count ?? ""),
      ranking: u.ranking ?? "", logo_url: u.logo_url ?? "", image_url: u.image_url ?? "",
    });
    setEditing(u);
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditing(null); setError(null); };

  async function handleSave() {
    if (!form.name || !form.city) return;
    setSaving(true);
    setError(null);
    const payload = {
      name: form.name, city: form.city, type: form.type,
      website_url: form.website_url || null,
      description: form.description || null,
      address: form.address || null,
      student_count: form.student_count ? parseInt(form.student_count) : null,
      ranking: form.ranking || null,
      logo_url: form.logo_url || null,
      image_url: form.image_url || null,
    };
    if (editing) {
      const { error } = await supabase.from("universities").update(payload).eq("id", editing.id);
      if (error) { setError(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("universities").insert(payload);
      if (error) { setError(error.message); setSaving(false); return; }
    }
    await fetchUniversities();
    setSaving(false);
    closeForm();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("universities").delete().eq("id", id);
    if (error) setError(error.message);
    else setUniversities(prev => prev.filter(u => u.id !== id));
    setDeleteConfirm(null);
  }

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">Universities</h1>
          <p className="text-gray-400 text-sm mt-0.5">{universities.length} institutions in database</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowImport(true); setImportError(null); setImportUrl(""); }}
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#1a3c5e] text-[#1a3c5e] font-semibold text-[13.5px] rounded-xl hover:bg-[#1a3c5e] hover:text-white transition-all w-fit">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Import from URL
          </button>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#1a3c5e] text-white font-semibold text-[13.5px] rounded-xl hover:bg-[#14304d] transition-colors shadow-sm w-fit">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add University
          </button>
        </div>
      </div>

      {error && !showForm && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[13px]">{error}</div>
      )}

      <div className="relative mb-4">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input type="text" placeholder="Search by name or city..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-[13.5px] outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <div className="w-6 h-6 border-2 border-[#1a3c5e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading universities...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm font-medium">{search ? "No results found." : "No universities yet."}</p>
            {!search && (
              <div className="flex items-center justify-center gap-3 mt-3">
                <button onClick={() => { setShowImport(true); setImportError(null); setImportUrl(""); }}
                  className="text-[#1a3c5e] text-sm font-semibold hover:underline">Import from URL</button>
                <span className="text-gray-300">or</span>
                <button onClick={openNew} className="text-[#1a3c5e] text-sm font-semibold hover:underline">Add manually</button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Name", "City", "Type", "Ranking", "Students", ""].map(h => (
                    <th key={h} className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {u.logo_url ? (
                          <img src={u.logo_url} alt={u.name} className="w-7 h-7 object-contain flex-shrink-0" />
                        ) : (
                          <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-bold text-gray-400">{u.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[#1a3c5e] text-[13.5px]">{u.name}</p>
                          <p className="text-gray-400 text-[11px] truncate max-w-[180px]">{u.website_url}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 text-[13.5px]">{u.city}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${u.type === "public" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>
                        {u.type.charAt(0).toUpperCase() + u.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-[13px]">{u.ranking || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-[13px]">{u.student_count ? Number(u.student_count).toLocaleString() : "—"}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(u)} className="p-1.5 text-gray-400 hover:text-[#1a3c5e] hover:bg-gray-100 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteConfirm(u.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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

      {/* Import modal */}
      {showImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-[#1a3c5e] text-lg">Import University from URL</h3>
                <p className="text-gray-400 text-[12.5px] mt-0.5">Paste the university homepage or about page.</p>
              </div>
              <button onClick={() => setShowImport(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-4 text-[12.5px] text-blue-700 font-medium">
              AI reads the page and pre-fills the form — you review and save. Then import programmes separately.
            </div>

            <input
              type="url"
              value={importUrl}
              onChange={e => setImportUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleImport()}
              placeholder="https://www.th-koeln.de"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[13.5px] outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all mb-3"
            />

            {importError && (
              <p className="text-red-500 text-[13px] bg-red-50 rounded-lg px-3 py-2 mb-3">{importError}</p>
            )}

            <div className="flex gap-3">
              <button onClick={() => setShowImport(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold text-sm">
                Cancel
              </button>
              <button onClick={handleImport} disabled={importing || !importUrl.trim()}
                className="flex-1 py-2.5 bg-[#1a3c5e] text-white rounded-xl font-bold text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                {importing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Extracting...
                  </>
                ) : "Extract & Pre-fill"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-extrabold text-[#1a3c5e] text-lg mb-2">Delete University?</h3>
            <p className="text-gray-400 text-sm mb-6">This will also delete all associated programmes. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-4 bg-black/40">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h2 className="font-extrabold text-[#1a3c5e] text-lg">{editing ? "Edit University" : "Add University"}</h2>
                {!editing && <p className="text-gray-400 text-[12px] mt-0.5">Review AI-extracted data and correct anything before saving.</p>}
              </div>
              <button onClick={closeForm} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              {error && <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[13px]">{error}</div>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="University Name" required>
                  <input className={inputClass} value={form.name} onChange={set("name")} placeholder="e.g. Technical University of Munich" />
                </FormField>
                <FormField label="City" required>
                  <input className={inputClass} value={form.city} onChange={set("city")} placeholder="e.g. Munich" />
                </FormField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Institution Type" required>
                  <select className={selectClass} value={form.type} onChange={set("type")}>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </FormField>
                <FormField label="Website URL">
                  <input className={inputClass} value={form.website_url} onChange={set("website_url")} placeholder="https://tum.de" />
                </FormField>
              </div>
              <FormField label="Address">
                <input className={inputClass} value={form.address} onChange={set("address")} placeholder="e.g. Arcisstraße 21, 80333 Munich" />
              </FormField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Number of Students">
                  <input className={inputClass} type="number" value={form.student_count} onChange={set("student_count")} placeholder="e.g. 48000" />
                </FormField>
                <FormField label="World Ranking">
                  <input className={inputClass} value={form.ranking} onChange={set("ranking")} placeholder="#37 QS 2024" />
                </FormField>
              </div>
              <FormField label="Description">
                <textarea className={textareaClass} rows={3} value={form.description} onChange={set("description")} placeholder="Brief description of the university..." />
              </FormField>

              {/* Logo preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Logo URL">
                  <input className={inputClass} value={form.logo_url} onChange={set("logo_url")} placeholder="https://university.de/img/logo.svg" />
                  {form.logo_url && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={form.logo_url} alt="Logo preview" className="h-8 object-contain"
                        onError={e => (e.currentTarget.style.display = "none")} />
                      <span className="text-gray-400 text-[11px]">Preview</span>
                    </div>
                  )}
                </FormField>
                <FormField label="Cover Image URL">
                  <input className={inputClass} value={form.image_url} onChange={set("image_url")} placeholder="https://... (wide campus photo)" />
                </FormField>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
              <button onClick={closeForm} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold text-[13.5px] hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 bg-[#1a3c5e] text-white font-bold text-[13.5px] rounded-xl hover:bg-[#14304d] disabled:opacity-60">
                {saving ? "Saving..." : editing ? "Save Changes" : "Add University"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}