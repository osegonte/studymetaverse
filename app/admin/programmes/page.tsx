"use client";
import { useState } from "react";
import {
  FormField, inputClass, selectClass, textareaClass,
  Programme, SUBJECT_AREAS, PREP_GROUPS
} from "../_shared/types";

const emptyProgramme: Programme = {
  university_id: "", title: "", degree_type: "masters", subject_area_id: "",
  study_mode: "fully_onsite", language_of_instruction: "english_only",
  std_period_semesters: "", start_semester: "winter", program_details: "",
  nc_status: "non_restricted", ects_required: "0",
  motiv_required: "no", test_required: "no", interview: "no", modul_required: "no",
  moiletter_accepted: false, tuition_fee: false, tuition_fee_amount: "",
  preparation_subject_group: "", deadline_winter: "", deadline_summer: "",
  is_featured: false, is_published: true,
};

// Mock universities for select dropdown
const mockUniversities = [
  { id: "1", name: "Technical University of Munich" },
  { id: "2", name: "Humboldt University Berlin" },
];

// Mock programmes
const mockProgrammes = [
  { id: "1", title: "Data Science & AI", university_id: "1", degree_type: "masters", language_of_instruction: "english_only", tuition_fee: false, is_published: true, is_featured: true },
  { id: "2", title: "Business Administration", university_id: "2", degree_type: "bachelors", language_of_instruction: "german_english", tuition_fee: true, is_published: true, is_featured: false },
];

const degreeLabels: Record<string, string> = {
  preparatory_course: "Preparatory Course",
  bachelors: "Bachelor's",
  masters: "Master's",
};

const languageLabels: Record<string, string> = {
  german_only: "German Only",
  english_only: "English Only",
  german_english: "German & English",
};

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState(mockProgrammes);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<typeof mockProgrammes[0] | null>(null);
  const [form, setForm] = useState<Programme>(emptyProgramme);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = programmes.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => { setForm(emptyProgramme); setEditing(null); setShowForm(true); };
  const openEdit = (p: typeof mockProgrammes[0]) => {
    setForm({ ...emptyProgramme, ...p });
    setEditing(p);
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = () => {
    if (!form.title || !form.university_id) return;
    if (editing) {
      setProgrammes(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p));
    } else {
      setProgrammes(prev => [...prev, { ...form, id: Date.now().toString() } as typeof mockProgrammes[0]]);
    }
    // TODO: await supabase.from('programs').upsert(form)
    closeForm();
  };

  const handleDelete = (id: string) => {
    setProgrammes(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  const set = (field: keyof Programme) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const setCheck = (field: keyof Programme) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.checked }));

  const isPrep = form.degree_type === "preparatory_course";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">Programmes</h1>
          <p className="text-gray-400 text-sm mt-0.5">{programmes.length} programmes in database</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#1a3c5e] text-white font-semibold text-[13.5px] rounded-xl hover:bg-[#14304d] transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Programme
        </button>
      </div>

      <div className="relative mb-4">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-[13.5px] outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-400 text-sm font-medium">No programmes yet.</p>
            <button onClick={openNew} className="mt-3 text-[#1a3c5e] text-sm font-semibold hover:underline">Add your first programme</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Title", "Degree", "Language", "Tuition", "Featured", "Status", ""].map(h => (
                    <th key={h} className="px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-[#1a3c5e] text-[13.5px]">{p.title}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1a3c5e]/10 text-[#1a3c5e]">
                        {degreeLabels[p.degree_type]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-[13px]">{languageLabels[p.language_of_instruction]}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${p.tuition_fee ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"}`}>
                        {p.tuition_fee ? "Paid" : "Free"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {p.is_featured ? (
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      ) : (
                        <span className="text-gray-300 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${p.is_published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                        {p.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-[#1a3c5e] hover:bg-gray-100 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-extrabold text-[#1a3c5e] text-lg mb-2">Delete Programme?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-extrabold text-[#1a3c5e] text-lg">{editing ? "Edit Programme" : "Add Programme"}</h2>
              <button onClick={closeForm} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-5">

              {/* Section: Basic Info */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Basic Information</h3>
                <div className="flex flex-col gap-4">
                  <FormField label="Programme Title" required>
                    <input className={inputClass} value={form.title} onChange={set("title")} placeholder="e.g. M.Sc. Data Science and AI" />
                  </FormField>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="University" required>
                      <select className={selectClass} value={form.university_id} onChange={set("university_id")}>
                        <option value="">Select university...</option>
                        {mockUniversities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Degree Type" required>
                      <select className={selectClass} value={form.degree_type} onChange={set("degree_type")}>
                        <option value="preparatory_course">Preparatory Course</option>
                        <option value="bachelors">Bachelor's Degree</option>
                        <option value="masters">Master's Degree</option>
                      </select>
                    </FormField>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Subject Area">
                      <select className={selectClass} value={form.subject_area_id} onChange={set("subject_area_id")}>
                        <option value="">Select subject area...</option>
                        {SUBJECT_AREAS.map((s, i) => <option key={i} value={String(i + 1)}>{s}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Duration (Semesters)">
                      <input className={inputClass} type="number" value={form.std_period_semesters} onChange={set("std_period_semesters")} placeholder="e.g. 4" />
                    </FormField>
                  </div>
                  <FormField label="Programme Description">
                    <textarea className={textareaClass} rows={4} value={form.program_details} onChange={set("program_details")} placeholder="Describe the programme content, objectives, and outcomes..." />
                  </FormField>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Section: Study Details */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Study Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Language of Instruction" required>
                    <select className={selectClass} value={form.language_of_instruction} onChange={set("language_of_instruction")}>
                      <option value="german_only">German Only</option>
                      <option value="english_only">English Only</option>
                      <option value="german_english">German & English</option>
                    </select>
                  </FormField>
                  <FormField label="Mode of Study" required>
                    <select className={selectClass} value={form.study_mode} onChange={set("study_mode")}>
                      <option value="fully_onsite">Fully On-site</option>
                      <option value="fully_online">Fully Online</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </FormField>
                  <FormField label="Start Semester" required>
                    <select className={selectClass} value={form.start_semester} onChange={set("start_semester")}>
                      <option value="summer">Summer</option>
                      <option value="winter">Winter</option>
                      <option value="summer_winter">Summer & Winter</option>
                    </select>
                  </FormField>
                </div>

                {isPrep && (
                  <div className="mt-4">
                    <FormField label="Preparation Subject Group">
                      <select className={selectClass} value={form.preparation_subject_group} onChange={set("preparation_subject_group")}>
                        <option value="">Select group...</option>
                        {PREP_GROUPS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                      </select>
                    </FormField>
                  </div>
                )}
              </div>

              <hr className="border-gray-100" />

              {/* Section: Admission */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Admission Requirements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Admission Type" required>
                    <select className={selectClass} value={form.nc_status} onChange={set("nc_status")}>
                      <option value="non_restricted">Non-restricted (ohne NC)</option>
                      <option value="restricted">Restricted (NC)</option>
                    </select>
                  </FormField>
                  <FormField label="ECTS Required">
                    <select className={selectClass} value={form.ects_required} onChange={set("ects_required")}>
                      <option value="0">0 ECTS</option>
                      <option value="180">180 ECTS</option>
                      <option value="210">210 ECTS</option>
                    </select>
                  </FormField>
                  <FormField label="MOI Letter">
                    <select className={selectClass} value={form.moiletter_accepted ? "yes" : "no"}
                      onChange={e => setForm(prev => ({ ...prev, moiletter_accepted: e.target.value === "yes" }))}>
                      <option value="no">Not Accepted</option>
                      <option value="yes">Accepted</option>
                    </select>
                  </FormField>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <FormField label="Motivation Letter">
                    <select className={selectClass} value={form.motiv_required} onChange={set("motiv_required")}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="varied">Varied</option>
                    </select>
                  </FormField>
                  <FormField label="Test Required">
                    <select className={selectClass} value={form.test_required} onChange={set("test_required")}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="varied">Varied</option>
                    </select>
                  </FormField>
                  <FormField label="Interview Required">
                    <select className={selectClass} value={form.interview} onChange={set("interview")}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="varied">Varied</option>
                    </select>
                  </FormField>
                  <FormField label="Module Handbook">
                    <select className={selectClass} value={form.modul_required} onChange={set("modul_required")}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </FormField>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Section: Tuition & Deadlines */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Tuition & Deadlines</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Tuition Fee">
                    <select className={selectClass} value={form.tuition_fee ? "yes" : "no"}
                      onChange={e => setForm(prev => ({ ...prev, tuition_fee: e.target.value === "yes" }))}>
                      <option value="no">No (Tuition-free)</option>
                      <option value="yes">Yes (Paid)</option>
                    </select>
                  </FormField>
                  {form.tuition_fee && (
                    <FormField label="Tuition Amount (EUR/semester)">
                      <input className={inputClass} type="number" value={form.tuition_fee_amount} onChange={set("tuition_fee_amount")} placeholder="e.g. 1500" />
                    </FormField>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <FormField label="Winter Intake Deadline">
                    <input className={inputClass} type="date" value={form.deadline_winter} onChange={set("deadline_winter")} />
                  </FormField>
                  <FormField label="Summer Intake Deadline">
                    <input className={inputClass} type="date" value={form.deadline_summer} onChange={set("deadline_summer")} />
                  </FormField>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Section: Publishing */}
              <div>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Publishing</h3>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={form.is_published} onChange={setCheck("is_published")}
                      className="w-4 h-4 rounded border-gray-300 text-[#1a3c5e] accent-[#1a3c5e]" />
                    <div>
                      <p className="font-semibold text-gray-700 text-[13.5px]">Published</p>
                      <p className="text-gray-400 text-[12px]">Visible to users on the programmes page</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={form.is_featured} onChange={setCheck("is_featured")}
                      className="w-4 h-4 rounded border-gray-300 text-[#1a3c5e] accent-[#1a3c5e]" />
                    <div>
                      <p className="font-semibold text-gray-700 text-[13.5px]">Featured on Homepage</p>
                      <p className="text-gray-400 text-[12px]">Shows in the Featured Programmes section on the landing page</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
              <button onClick={closeForm} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold text-[13.5px] hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-[#1a3c5e] text-white font-bold text-[13.5px] rounded-xl hover:bg-[#14304d] transition-colors">
                {editing ? "Save Changes" : "Add Programme"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}