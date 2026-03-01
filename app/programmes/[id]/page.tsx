"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MOCK = {
  id: "1",
  title: "M.Sc. Data Science and Artificial Intelligence",
  degree_type: "Master's Degree",
  subject_area: "Computer Science",
  university: "Technical University of Munich",
  university_short: "TUM",
  city: "Munich",
  address: "Arcisstraße 21, 80333 Munich, Germany",
  student_count: "48,000+",
  ranking: "#37 QS 2024",
  website_url: "https://tum.de",
  language: "English",
  tuition_fee: false,
  tuition_amount: null,
  duration_semesters: 4,
  start_semester: "Winter Semester",
  nc_status: "non_restricted",
  ects_required: 180,
  motiv_required: "yes",
  test_required: "no",
  interview: "no",
  modul_required: "yes",
  moiletter_accepted: false,
  deadline_winter: "July 15",
  deadline_summer: "January 15",
  program_details: `The Master of Science in Data Science and Artificial Intelligence at the Technical University of Munich offers a rigorous, interdisciplinary education at the intersection of computer science, mathematics, and statistics.\n\nStudents develop the theoretical foundations and practical skills required to design, implement, and analyze sophisticated AI systems and data-driven solutions. You will work with cutting-edge technologies and learn how to process massive datasets, build predictive models, and address the ethical implications of AI in society.`,
  image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop",
  match_report_price: 29,
};

type Tab = "about" | "admission" | "university";

const reqLabel: Record<string, { label: string; color: string }> = {
  yes:    { label: "Required",     color: "text-red-500 bg-red-50" },
  no:     { label: "Not Required", color: "text-green-600 bg-green-50" },
  varied: { label: "Varies",       color: "text-amber-600 bg-amber-50" },
};

const IcoPin = () => (
  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);
const IcoPeople = () => (
  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);
const IcoStar = () => (
  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
  </svg>
);

export default function ProgrammeDetailPage() {
  const [tab, setTab] = useState<Tab>("about");
  const [saved, setSaved] = useState(false);
  const p = MOCK;

  const tabs: { key: Tab; label: string }[] = [
    { key: "about",      label: "About" },
    { key: "admission",  label: "Admission" },
    { key: "university", label: "University" },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">

        {/* Hero image */}
        <div className="h-48 sm:h-56 overflow-hidden">
          <img src={p.image} alt={p.university} className="w-full h-full object-cover" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">

          {/* ── Title card ──────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="font-extrabold text-gray-400 text-sm">{p.university_short}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{p.degree_type}</span>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#1a3c5e] tracking-tight leading-tight mt-0.5 max-w-xl">{p.title}</h1>
                  <p className="text-gray-500 font-medium text-[14px] mt-1">{p.university}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setSaved(!saved)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-[13px] border-2 transition-all ${saved ? "border-[#1a3c5e] bg-[#1a3c5e] text-white" : "border-[#1a3c5e] text-[#1a3c5e] hover:bg-[#1a3c5e] hover:text-white"}`}>
                  <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                  {saved ? "Saved" : "Save Programme"}
                </button>
                <button className="p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* 4 stat boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { label: "Location", value: p.city, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
                { label: "Tuition / Semester", value: p.tuition_fee ? `€${p.tuition_amount}` : "€0", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
                { label: "Instruction", value: p.language, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg> },
                { label: "Duration", value: `${p.duration_semesters} Semesters`, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg> },
              ].map(s => (
                <div key={s.label} className="border border-gray-100 rounded-xl p-4 flex flex-col gap-2">
                  <div className="text-[#1a3c5e]/40">{s.icon}</div>
                  <p className="font-extrabold text-[#1a3c5e] text-[17px] leading-none">{s.value}</p>
                  <p className="text-gray-400 text-[10.5px] font-bold uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tabs + sidebar ───────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-5">

            {/* Tab content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                  {tabs.map(t => (
                    <button key={t.key} onClick={() => setTab(t.key)}
                      className={`flex-1 py-3.5 text-[13.5px] font-bold transition-colors ${tab === t.key ? "text-[#1a3c5e] border-b-2 border-[#1a3c5e]" : "text-gray-400 hover:text-gray-600"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="p-6">

                  {tab === "about" && (
                    <div>
                      <h2 className="text-lg font-extrabold text-[#1a3c5e] mb-4">About this Programme</h2>
                      {p.program_details.split("\n\n").map((para, i) => (
                        <p key={i} className="text-gray-600 text-[14px] leading-relaxed mb-4 last:mb-0">{para}</p>
                      ))}
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { label: "Start Semester", value: p.start_semester },
                          { label: "Study Mode",     value: "Fully On-site" },
                          { label: "Subject Area",   value: p.subject_area },
                          { label: "Admission",      value: p.nc_status === "non_restricted" ? "Open (ohne NC)" : "Restricted (NC)" },
                          { label: "MOI Letter",     value: p.moiletter_accepted ? "Accepted" : "Not Accepted" },
                        ].map(item => (
                          <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                            <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                            <p className="font-semibold text-[#1a3c5e] text-[13px]">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "admission" && (
                    <div>
                      <h2 className="text-lg font-extrabold text-[#1a3c5e] mb-6">Requirements & Admission</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-2xl p-5">
                          <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Academic Credits</p>
                          <p className="text-3xl font-extrabold text-[#1a3c5e]">{p.ects_required} ECTS</p>
                          <p className="text-gray-400 text-[12px] mt-1">Total credit points required for graduation.</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5">
                          <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Admission Type</p>
                          <p className="text-2xl font-extrabold text-[#1a3c5e]">{p.nc_status === "non_restricted" ? "Open" : "Restricted"}</p>
                          <p className="text-gray-400 text-[12px] mt-1">{p.nc_status === "non_restricted" ? "No numerus clausus restriction." : "Numerus clausus applies — limited spots."}</p>
                        </div>
                      </div>
                      <h3 className="font-extrabold text-[#1a3c5e] text-[14px] mb-3">Application Requirements</h3>
                      <div className="flex flex-col gap-2 mb-6">
                        {[
                          { label: "Motivation Letter", status: p.motiv_required },
                          { label: "Language Test",     status: p.test_required },
                          { label: "Interview",         status: p.interview },
                          { label: "Module Handbook",   status: p.modul_required },
                          { label: "MOI Letter",        status: p.moiletter_accepted ? "yes" : "no" },
                        ].map(r => {
                          const s = reqLabel[r.status];
                          return (
                            <div key={r.label} className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 bg-white">
                              <span className="text-gray-700 font-medium text-[13.5px]">{r.label}</span>
                              <span className={`text-[11.5px] font-bold px-2.5 py-1 rounded-full ${s.color}`}>{s.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-[13px] text-blue-700 font-medium">
                        Always verify requirements directly with the university before applying. Requirements may change between intake cycles.
                      </div>
                    </div>
                  )}

                  {tab === "university" && (
                    <div>
                      <h2 className="text-lg font-extrabold text-[#1a3c5e] mb-5">About {p.university}</h2>
                      <p className="text-gray-600 text-[14px] leading-relaxed mb-5">
                        {p.university} is one of Germany's leading research universities, renowned for its excellence in engineering, natural sciences, and technology. Located in Munich, it offers a vibrant international campus with strong industry partnerships.
                      </p>
                      <a href={p.website_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#1a3c5e] text-[#1a3c5e] font-bold text-[13.5px] rounded-xl hover:bg-[#1a3c5e] hover:text-white transition-all">
                        Visit University Website
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                      </a>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Right sidebar: Match Report + Application Dates only */}
            <div className="lg:w-72 flex-shrink-0 flex flex-col gap-4">

              <div className="bg-[#0f2942] rounded-2xl p-5 text-white">
                <h3 className="font-extrabold text-[15px] mb-1.5">Match Report</h3>
                <p className="text-white/60 text-[12.5px] leading-relaxed mb-4">Check your admission chances with a personalized evaluation based on your academic profile.</p>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-3xl font-extrabold">€{p.match_report_price}</span>
                  <span className="text-white/50 text-[12px]">one-time</span>
                </div>
                <a href="/match-report" className="block w-full text-center py-3 border-2 border-white text-white font-bold text-[13.5px] rounded-xl hover:bg-white hover:text-[#0f2942] transition-all">
                  Get Your Report
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <h3 className="font-extrabold text-[#1a3c5e] text-[14px]">Application Dates</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div><p className="font-bold text-gray-700 text-[13px]">Winter Intake</p><p className="text-gray-400 text-[12px]">Begins Oct 2025</p></div>
                    <div className="text-right"><p className="font-extrabold text-[#1a3c5e] text-[13px]">{p.deadline_winter}</p><p className="text-gray-400 text-[11px] uppercase tracking-wider">Deadline</p></div>
                  </div>
                  <hr className="border-gray-100"/>
                  <div className="flex items-start justify-between">
                    <div><p className="font-bold text-gray-700 text-[13px]">Summer Intake</p><p className="text-gray-400 text-[12px]">Begins Apr 2026</p></div>
                    <div className="text-right"><p className="font-extrabold text-[#1a3c5e] text-[13px]">{p.deadline_summer}</p><p className="text-gray-400 text-[11px] uppercase tracking-wider">Deadline</p></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── University Info — full-width landscape card, map left, info right ── */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            height: 280,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #f3f4f6",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            background: "white",
          }}>
            {/* Map — left ~65%, fills full height, zero gap */}
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(p.address)}&output=embed&z=16&t=k`}
              style={{ flex: "0 0 65%", height: "100%", border: "none", display: "block", margin: 0, padding: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="University location"
            />
            {/* Info — right ~35% */}
            <div style={{
              flex: "0 0 35%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "24px 20px",
              borderLeft: "1px solid #f3f4f6",
            }}>
              <div>
                <p style={{ fontWeight: 800, color: "#1a3c5e", fontSize: 14, marginBottom: 16 }}>University Info</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#6b7280", fontSize: 12.5 }}>
                    <IcoPin /><span>{p.address}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 12.5 }}>
                    <IcoPeople /><span>{p.student_count} Students</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#6b7280", fontSize: 12.5 }}>
                    <IcoStar /><span>World Ranking: {p.ranking}</span>
                  </div>
                </div>
              </div>
              <a href={p.website_url} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "10px 0",
                  border: "1px solid #e5e7eb",
                  color: "#1a3c5e",
                  fontWeight: 700,
                  fontSize: 12.5,
                  borderRadius: 12,
                  textDecoration: "none",
                }}>
                Visit University Website
              </a>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}