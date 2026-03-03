"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

interface RequirementSection {
  title: string;
  content: string;
}

interface ProgrammeDetail {
  id: string;
  title: string;
  degree_type: string;
  language_of_instruction: string;
  study_mode: string;
  start_semester: string;
  std_period_semesters: number | null;
  program_details: string | null;
  nc_status: string;
  ects_required: number;
  motiv_required: string;
  test_required: string;
  interview: string;
  modul_required: string;
  moiletter_accepted: boolean;
  tuition_fee: boolean;
  tuition_fee_amount: number | null;
  deadline_winter: string | null;
  deadline_summer: string | null;
  requirements: RequirementSection[] | null;
  subject_area: string | null;
  universities: {
    id: string;
    name: string;
    city: string;
    address: string | null;
    student_count: number | null;
    ranking: string | null;
    website_url: string | null;
    image_url: string | null;
    logo_url: string | null; // ← added
  } | null;
}

type Tab = "about" | "admission" | "requirements";

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€", USD: "$", GBP: "£", NGN: "₦",
};

const reqLabel: Record<string, { label: string; color: string }> = {
  yes:    { label: "Required",     color: "text-red-500 bg-red-50" },
  no:     { label: "Not Required", color: "text-green-600 bg-green-50" },
  varied: { label: "Varies",       color: "text-amber-600 bg-amber-50" },
};

const degreeLabel: Record<string, string> = {
  preparatory_course: "Preparatory Course",
  bachelors: "Bachelor's Degree",
  masters: "Master's Degree",
};

const langLabel: Record<string, string> = {
  german_only: "German",
  english_only: "English",
  german_english: "German & English",
};

const modeLabel: Record<string, string> = {
  fully_onsite: "Fully On-site",
  fully_online: "Fully Online",
  hybrid: "Hybrid",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop";

// ─── UniversityLogo ──────────────────────────────────────────────────────────
// Priority: logo_url from DB → Clearbit from website domain → initials

function extractDomain(url: string | null): string | null {
  if (!url) return null;
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch { return null; }
}

function UniversityLogo({ logoUrl, websiteUrl, name }: {
  logoUrl: string | null;
  websiteUrl: string | null;
  name: string;
}) {
  const domain = extractDomain(websiteUrl);
  const sources = [logoUrl, domain ? `https://logo.clearbit.com/${domain}` : null].filter(Boolean) as string[];
  const [srcIndex, setSrcIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(sources.length === 0);

  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 3).join("").toUpperCase();

  const handleError = () => {
    if (srcIndex < sources.length - 1) setSrcIndex(i => i + 1);
    else setAllFailed(true);
  };

  if (allFailed || sources.length === 0) {
    return <span className="font-extrabold text-gray-400 text-sm">{initials || "UNI"}</span>;
  }

  return (
    <img
      src={sources[srcIndex]}
      alt={`${name} logo`}
      className="w-full h-full object-contain p-1.5"
      onError={handleError}
    />
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ProgrammeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [p, setP] = useState<ProgrammeDetail | null>(null);
  const [price, setPrice] = useState("29");
  const [currency, setCurrency] = useState("EUR");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("about");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const [progRes, settingsRes] = await Promise.all([
          supabase
            .from("programs")
            .select(`
              id, title, degree_type, language_of_instruction, study_mode,
              start_semester, std_period_semesters, program_details,
              nc_status, ects_required, motiv_required, test_required,
              interview, modul_required, moiletter_accepted,
              tuition_fee, tuition_fee_amount, deadline_winter, deadline_summer,
              requirements, subject_area,
              universities(id, name, city, address, student_count, ranking, website_url, image_url, logo_url)
            `)
            .eq("id", id)
            .single(),
          supabase
            .from("settings")
            .select("key, value")
            .in("key", ["match_report_price", "match_report_currency"]),
        ]);

        if (progRes.error) {
          setFetchError(progRes.error.message);
        } else {
          setP(progRes.data as unknown as ProgrammeDetail);
        }

        if (settingsRes.data) {
          const priceRow = settingsRes.data.find(s => s.key === "match_report_price");
          const currencyRow = settingsRes.data.find(s => s.key === "match_report_currency");
          if (priceRow) setPrice(priceRow.value);
          if (currencyRow) setCurrency(currencyRow.value);
        }
      } catch {
        setFetchError("Something went wrong loading this programme.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "about",        label: "About" },
    { key: "admission",    label: "Admission" },
    { key: "requirements", label: "Requirements" },
  ];

  const currencySymbol = CURRENCY_SYMBOLS[currency] ?? currency;

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#1a3c5e] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading programme...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (fetchError || !p) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-[#1a3c5e] mb-2">Programme not found</h2>
            {fetchError && <p className="text-red-400 text-sm mb-4">{fetchError}</p>}
            <a href="/programmes" className="text-[#1a3c5e] font-semibold hover:underline">← Back to programmes</a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "See website";
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  }

  const uni = p.universities;
  const requirements: RequirementSection[] = Array.isArray(p.requirements) ? p.requirements : [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">

        {/* Hero */}
        <div className="h-48 sm:h-56 overflow-hidden">
          <img
            src={uni?.image_url ?? FALLBACK_IMAGE}
            alt={uni?.name ?? "University"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">

          {/* Title card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-4">
                {/* Logo — no frame, sits flush */}
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <UniversityLogo
                    logoUrl={uni?.logo_url ?? null}
                    websiteUrl={uni?.website_url ?? null}
                    name={uni?.name ?? ""}
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {degreeLabel[p.degree_type] ?? p.degree_type}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#1a3c5e] tracking-tight leading-tight mt-0.5 max-w-xl">
                    {p.title}
                  </h1>
                  <p className="text-gray-500 font-medium text-[14px] mt-1">{uni?.name ?? "—"}</p>
                </div>
              </div>
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-[13px] border-2 transition-all flex-shrink-0 ${saved ? "border-[#1a3c5e] bg-[#1a3c5e] text-white" : "border-[#1a3c5e] text-[#1a3c5e] hover:bg-[#1a3c5e] hover:text-white"}`}
              >
                <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {saved ? "Saved" : "Save Programme"}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                {
                  label: "Location",
                  value: uni?.city ?? "—",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  ),
                },
                {
                  label: "Tuition / Semester",
                  value: p.tuition_fee ? (p.tuition_fee_amount ? `${currencySymbol}${Number(p.tuition_fee_amount).toLocaleString()}` : "Paid") : `${currencySymbol}0`,
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  ),
                },
                {
                  label: "Language",
                  value: langLabel[p.language_of_instruction] ?? p.language_of_instruction,
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                    </svg>
                  ),
                },
                {
                  label: "Duration",
                  value: p.std_period_semesters ? `${p.std_period_semesters} Semesters` : "—",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  ),
                },
              ].map(s => (
                <div key={s.label} className="border border-gray-100 rounded-xl p-4 flex flex-col gap-2">
                  <div className="text-[#1a3c5e]/40">{s.icon}</div>
                  <p className="font-extrabold text-[#1a3c5e] text-[17px] leading-none">{s.value}</p>
                  <p className="text-gray-400 text-[10.5px] font-bold uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-5">
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

                  {/* ABOUT */}
                  {tab === "about" && (
                    <div>
                      <h2 className="text-lg font-extrabold text-[#1a3c5e] mb-4">About this Programme</h2>
                      {p.program_details
                        ? p.program_details.split("\n\n").map((para, i) => (
                            <p key={i} className="text-gray-600 text-[14px] leading-relaxed mb-4 last:mb-0">{para}</p>
                          ))
                        : <p className="text-gray-400 text-[14px]">No programme description available yet.</p>
                      }
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { label: "Start Semester", value: p.start_semester.replace("_", " & ").replace(/\b\w/g, c => c.toUpperCase()) },
                          { label: "Study Mode",     value: modeLabel[p.study_mode] ?? p.study_mode },
                          { label: "Subject Area",   value: p.subject_area ?? "—" },
                          { label: "Admission",      value: p.nc_status === "non_restricted" ? "Open (ohne NC)" : "Restricted (NC)" },
                          { label: "MOI Letter", value: p.moiletter_accepted === "accepted" ? "Accepted" : p.moiletter_accepted === "varied" ? "Varies" : "Not Accepted" },
                        ].map(item => (
                          <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                            <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                            <p className="font-semibold text-[#1a3c5e] text-[13px]">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ADMISSION */}
                  {tab === "admission" && (
                    <div>
                      <h2 className="text-lg font-extrabold text-[#1a3c5e] mb-6">Admission Overview</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-2xl p-5">
                          <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Academic Credits</p>
                          <p className="text-3xl font-extrabold text-[#1a3c5e]">{p.ects_required} ECTS</p>
                          <p className="text-gray-400 text-[12px] mt-1">Total credit points required.</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5">
                          <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-1">Admission Type</p>
                          <p className="text-2xl font-extrabold text-[#1a3c5e]">{p.nc_status === "non_restricted" ? "Open" : "Restricted"}</p>
                          <p className="text-gray-400 text-[12px] mt-1">{p.nc_status === "non_restricted" ? "No numerus clausus restriction." : "Numerus clausus applies."}</p>
                        </div>
                      </div>
                      <h3 className="font-extrabold text-[#1a3c5e] text-[14px] mb-3">Required Documents</h3>
                      <div className="flex flex-col gap-2 mb-6">
                        {[
                          { label: "Motivation Letter", status: p.motiv_required },
                          { label: "Language Test",     status: p.test_required },
                          { label: "Interview",         status: p.interview },
                          { label: "Module Handbook",   status: p.modul_required },
                          { label: "MOI Letter",        status: p.moiletter_accepted },
                        ].map(r => {
                          const s = reqLabel[r.status] ?? { label: r.status, color: "text-gray-600 bg-gray-50" };
                          return (
                            <div key={r.label} className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100">
                              <span className="text-gray-700 font-medium text-[13.5px]">{r.label}</span>
                              <span className={`text-[11.5px] font-bold px-2.5 py-1 rounded-full ${s.color}`}>{s.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-[13px] text-blue-700 font-medium">
                        Always verify requirements directly with the university before applying.
                      </div>
                    </div>
                  )}

                  {/* REQUIREMENTS */}
                  {tab === "requirements" && (
                    <div>
                      <h2 className="text-lg font-extrabold text-[#1a3c5e] mb-6">Programme Requirements</h2>
                      {requirements.length === 0 ? (
                        <div className="text-center py-12">
                          <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                          <p className="text-gray-400 text-[14px]">No requirements added yet.</p>
                          <p className="text-gray-300 text-[12px] mt-1">Add these from the admin panel.</p>
                        </div>
                      ) : (
                        <div className="flex flex-col divide-y divide-gray-100">
                          {requirements.map((section, i) => (
                            <div key={i} className="py-5 first:pt-0">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-1 h-4 bg-[#1a3c5e] rounded-full flex-shrink-0" />
                                <h3 className="font-extrabold text-[#1a3c5e] text-[15px]">{section.title}</h3>
                              </div>
                              <p className="text-gray-600 text-[14px] leading-relaxed whitespace-pre-line pl-3">
                                {section.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-72 flex-shrink-0 flex flex-col gap-4">
              <div className="bg-[#0f2942] rounded-2xl p-5 text-white">
                <h3 className="font-extrabold text-[15px] mb-1.5">Match Report</h3>
                <p className="text-white/60 text-[12.5px] leading-relaxed mb-4">
                  Check your admission chances with a personalized evaluation based on your academic profile.
                </p>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-3xl font-extrabold">{currencySymbol}{price}</span>
                  <span className="text-white/50 text-[12px]">one-time</span>
                </div>
                <a href="/match-report"
                  className="block w-full text-center py-3 border-2 border-white text-white font-bold text-[13.5px] rounded-xl hover:bg-white hover:text-[#0f2942] transition-all">
                  Get Your Report
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <h3 className="font-extrabold text-[#1a3c5e] text-[14px]">Application Dates</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-700 text-[13px]">Winter Intake</p>
                      <p className="text-gray-400 text-[12px]">Begins Oct</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-[#1a3c5e] text-[13px]">{formatDate(p.deadline_winter)}</p>
                      <p className="text-gray-400 text-[11px] uppercase tracking-wider">Deadline</p>
                    </div>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-700 text-[13px]">Summer Intake</p>
                      <p className="text-gray-400 text-[12px]">Begins Apr</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-[#1a3c5e] text-[13px]">{formatDate(p.deadline_summer)}</p>
                      <p className="text-gray-400 text-[11px] uppercase tracking-wider">Deadline</p>
                    </div>
                  </div>
                </div>
              </div>

              {uni && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-extrabold text-[#1a3c5e] text-[14px] mb-3">University</h3>
                  <p className="text-gray-700 font-semibold text-[13px]">{uni.name}</p>
                  <p className="text-gray-400 text-[12px] mb-3">{uni.city}, Germany</p>
                  {uni.website_url && uni.website_url !== "https://example.com" && (
                    <a href={uni.website_url} target="_blank" rel="noopener noreferrer"
                      className="block w-full text-center py-2 border border-[#1a3c5e] text-[#1a3c5e] font-bold text-[12.5px] rounded-xl hover:bg-[#1a3c5e] hover:text-white transition-all">
                      Visit Website
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}