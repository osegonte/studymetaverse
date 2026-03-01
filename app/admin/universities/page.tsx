"use client";
import { useState } from "react";
import { FormField, inputClass, selectClass, textareaClass, University } from "../_shared/types";

const emptyUniversity: University = {
  name: "", city: "", type: "public", website_url: "", description: "",
  address: "", student_count: "", ranking: "", logo_url: "", image_url: "",
};

// Mock data — replace with Supabase fetch
const mockUniversities: University[] = [
  { id: "1", name: "Technical University of Munich", city: "Munich", type: "public", website_url: "https://tum.de", description: "One of Europe's top technical universities.", address: "Arcisstraße 21, 80333 Munich", student_count: "48000", ranking: "#37 QS 2024", logo_url: "", image_url: "" },
  { id: "2", name: "Humboldt University Berlin", city: "Berlin", type: "public", website_url: "https://hu-berlin.de", description: "Historic research university in Berlin.", address: "Unter den Linden 6, 10099 Berlin", student_count: "33000", ranking: "#121 QS 2024", logo_url: "", image_url: "" },
];

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>(mockUniversities);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<University | null>(null);
  const [form, setForm] = useState<University>(emptyUniversity);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = universities.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.city.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => { setForm(emptyUniversity); setEditing(null); setShowForm(true); };
  const openEdit = (u: University) => { setForm({ ...u }); setEditing(u); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = () => {
    if (!form.name || !form.city) return;
    if (editing) {
      setUniversities(prev => prev.map(u => u.id === editing.id ? { ...form } : u));
    } else {
      setUniversities(prev => [...prev, { ...form, id: Date.now().toString() }]);
    }
    // TODO: await supabase.from('universities').upsert(form)
    closeForm();
  };

  const handleDelete = (id: string) => {
    setUniversities(prev => prev.filter(u => u.id !== id));
    setDeleteConfirm(null);
    // TODO: await supabase.from('universities').delete().eq('id', id)
  };

  const set = (field: keyof University) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">Universities</h1>
          <p className="text-gray-400 text-sm mt-0.5">{universities.length} institutions in database</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#1a3c5e] text-white font-semibold text-[13.5px] rounded-xl hover:bg-[#14304d] transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add University
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-[13.5px] outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            </svg>
            <p className="text-gray-400 text-sm font-medium">No universities yet.</p>
            <button onClick={openNew} className="mt-3 text-[#1a3c5e] text-sm font-semibold hover:underline">Add your first university</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
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
                      <p className="font-semibold text-[#1a3c5e] text-[13.5px]">{u.name}</p>
                      <p className="text-gray-400 text-[12px] truncate max-w-[200px]">{u.website_url}</p>
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
                        <button onClick={() => setDeleteConfirm(u.id!)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-extrabold text-[#1a3c5e] text-lg mb-2">Delete University?</h3>
            <p className="text-gray-400 text-sm mb-6">This will also delete all associated programmes. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-extrabold text-[#1a3c5e] text-lg">{editing ? "Edit University" : "Add University"}</h2>
              <button onClick={closeForm} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
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
                <FormField label="World Ranking" hint="e.g. #37 QS 2024">
                  <input className={inputClass} value={form.ranking} onChange={set("ranking")} placeholder="#37 QS 2024" />
                </FormField>
              </div>

              <FormField label="Description">
                <textarea className={textareaClass} rows={3} value={form.description} onChange={set("description")} placeholder="Brief description of the university..." />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Logo URL" hint="Upload to Supabase Storage first">
                  <input className={inputClass} value={form.logo_url} onChange={set("logo_url")} placeholder="https://..." />
                </FormField>
                <FormField label="Cover Image URL" hint="Hero image for detail page">
                  <input className={inputClass} value={form.image_url} onChange={set("image_url")} placeholder="https://..." />
                </FormField>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
              <button onClick={closeForm} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold text-[13.5px] hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-[#1a3c5e] text-white font-bold text-[13.5px] rounded-xl hover:bg-[#14304d] transition-colors">
                {editing ? "Save Changes" : "Add University"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}