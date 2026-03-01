"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Programme {
  id: string; title: string; university: string; city: string;
  degree_type: "preparatory_course" | "bachelors" | "masters";
  language: "german_only" | "english_only" | "german_english";
  subject_area: string; study_mode: "fully_onsite" | "fully_online" | "hybrid";
  start_semester: "summer" | "winter" | "summer_winter";
  nc_status: "restricted" | "non_restricted"; ects_required: 0 | 180 | 210;
  institution_type: "public" | "private"; tuition_fee: boolean;
  tuition_amount: string; duration_semesters: number; deadline: string;
  image: string; is_featured: boolean;
}

const MOCK: Programme[] = [
  { id:"1", title:"M.Sc. Data Science and Artificial Intelligence", university:"TU Munich", city:"Munich", degree_type:"masters", language:"english_only", subject_area:"Computer Science", study_mode:"fully_onsite", start_semester:"winter", nc_status:"non_restricted", ects_required:180, institution_type:"public", tuition_fee:false, tuition_amount:"", duration_semesters:4, deadline:"15 Jul", image:"https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=340&fit=crop", is_featured:true },
  { id:"2", title:"B.Sc. Business Administration", university:"Humboldt University", city:"Berlin", degree_type:"bachelors", language:"german_english", subject_area:"Business", study_mode:"fully_onsite", start_semester:"winter", nc_status:"restricted", ects_required:0, institution_type:"public", tuition_fee:true, tuition_amount:"1,200", duration_semesters:6, deadline:"31 May", image:"https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&h=340&fit=crop", is_featured:false },
  { id:"3", title:"M.Sc. Global Health", university:"Heidelberg University", city:"Heidelberg", degree_type:"masters", language:"english_only", subject_area:"Health", study_mode:"fully_onsite", start_semester:"summer", nc_status:"non_restricted", ects_required:180, institution_type:"public", tuition_fee:true, tuition_amount:"1,500", duration_semesters:4, deadline:"15 Jan", image:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=340&fit=crop", is_featured:false },
  { id:"4", title:"M.Sc. Mechanical Engineering", university:"RWTH Aachen", city:"Aachen", degree_type:"masters", language:"english_only", subject_area:"Engineering", study_mode:"fully_onsite", start_semester:"winter", nc_status:"non_restricted", ects_required:180, institution_type:"public", tuition_fee:false, tuition_amount:"", duration_semesters:4, deadline:"1 Mar", image:"https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=600&h=340&fit=crop", is_featured:true },
  { id:"5", title:"B.Sc. Computer Science", university:"FU Berlin", city:"Berlin", degree_type:"bachelors", language:"german_only", subject_area:"Computer Science", study_mode:"fully_onsite", start_semester:"winter", nc_status:"non_restricted", ects_required:0, institution_type:"public", tuition_fee:false, tuition_amount:"", duration_semesters:6, deadline:"15 Jul", image:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=340&fit=crop", is_featured:false },
  { id:"6", title:"M.Sc. Environmental Science", university:"University of Hamburg", city:"Hamburg", degree_type:"masters", language:"english_only", subject_area:"Environmental Science", study_mode:"hybrid", start_semester:"summer_winter", nc_status:"non_restricted", ects_required:210, institution_type:"public", tuition_fee:false, tuition_amount:"", duration_semesters:4, deadline:"1 Feb", image:"https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=340&fit=crop", is_featured:false },
  { id:"7", title:"MBA International Business", university:"WHU Otto Beisheim", city:"Düsseldorf", degree_type:"masters", language:"english_only", subject_area:"Business", study_mode:"fully_onsite", start_semester:"winter", nc_status:"non_restricted", ects_required:180, institution_type:"private", tuition_fee:true, tuition_amount:"18,500", duration_semesters:4, deadline:"30 Apr", image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=340&fit=crop", is_featured:false },
  { id:"8", title:"Preparatory Course — Technical (T-Kurs)", university:"Studienkolleg Munich", city:"Munich", degree_type:"preparatory_course", language:"german_only", subject_area:"Engineering", study_mode:"fully_onsite", start_semester:"summer_winter", nc_status:"non_restricted", ects_required:0, institution_type:"public", tuition_fee:false, tuition_amount:"", duration_semesters:2, deadline:"15 Jun", image:"https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=340&fit=crop", is_featured:false },
  { id:"9", title:"M.Sc. Psychology", university:"LMU Munich", city:"Munich", degree_type:"masters", language:"english_only", subject_area:"Psychology", study_mode:"fully_onsite", start_semester:"winter", nc_status:"restricted", ects_required:180, institution_type:"public", tuition_fee:false, tuition_amount:"", duration_semesters:4, deadline:"31 May", image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=340&fit=crop", is_featured:false },
];

const SUBJECT_AREAS = ["Agriculture","Arts","Biochemistry","Biology","Business","Chemistry","Communication","Computer Science","Economics","Education","Engineering","Environmental Science","Food and Beverage","Health","Literature","Medicine","Philosophy","Physics","Psychology","Social Science"];
const degreeLabel: Record<string,string> = { preparatory_course:"Preparatory", bachelors:"Bachelor's", masters:"Master's" };
const langLabel: Record<string,string> = { german_only:"German", english_only:"English", german_english:"DE / EN" };
const modeLabel: Record<string,string> = { fully_onsite:"On-site", fully_online:"Online", hybrid:"Hybrid" };
const degreeBadge: Record<string,string> = { preparatory_course:"bg-amber-100 text-amber-700", bachelors:"bg-blue-100 text-blue-700", masters:"bg-[#1a3c5e]/10 text-[#1a3c5e]" };

type FilterKey = "degree"|"language"|"subject"|"nc"|"semester"|"mode"|"ects"|"institution"|"tuition";
type Filters = Record<FilterKey, string[]>;
const defaultFilters: Filters = { degree:[], language:[], subject:[], nc:[], semester:[], mode:[], ects:[], institution:[], tuition:[] };

// ─── FilterPill — portal dropdown, multi-select ───────────────
function FilterPill({ label, options, values, onChange, searchable }: {
  label: string; options: {value:string;label:string}[];
  values: string[]; onChange:(v:string[])=>void; searchable?:boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [rect, setRect] = useState<DOMRect|null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = values.length > 0;

  const toggle = () => {
    if (open) { setOpen(false); setSearch(""); return; }
    if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      const portal = document.getElementById("fp-portal");
      if (btnRef.current?.contains(e.target as Node)) return;
      if (portal?.contains(e.target as Node)) return;
      setOpen(false); setSearch("");
    };
    const onScroll = () => { setOpen(false); setSearch(""); };
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", onScroll, true);
    return () => { document.removeEventListener("mousedown", close); window.removeEventListener("scroll", onScroll, true); };
  }, [open]);

  const toggleOpt = (v: string) => {
    if (values.includes(v)) onChange(values.filter(x => x !== v));
    else onChange([...values, v]);
  };

  const visible = searchable ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase())) : options;
  const pillLabel = active
    ? values.length === 1 ? (options.find(o => o.value === values[0])?.label ?? label) : `${label} (${values.length})`
    : label;

  const dropdown = open && rect ? createPortal(
    <div id="fp-portal" style={{ position:"fixed", top:rect.bottom+6, left:Math.min(rect.left, window.innerWidth-300), width:288, zIndex:999999 }}
      className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        {searchable && <input autoFocus type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search options..." className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#1a3c5e] bg-gray-50"/>}
      </div>
      <div className="max-h-64 overflow-y-auto py-1">
        {visible.map(o => {
          const checked = values.includes(o.value);
          return (
            <button key={o.value} onClick={() => toggleOpt(o.value)}
              className={`w-full text-left px-4 py-2.5 text-[13.5px] font-medium flex items-center gap-3 transition-colors ${checked ? "bg-[#1a3c5e]/5 text-[#1a3c5e]" : "text-gray-700 hover:bg-gray-50"}`}>
              <span className={`w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${checked ? "bg-[#1a3c5e] border-[#1a3c5e]" : "border-gray-300"}`}>
                {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
              </span>
              {o.label}
            </button>
          );
        })}
      </div>
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        {active ? <button onClick={() => { onChange([]); setOpen(false); }} className="text-[12px] text-red-500 font-semibold hover:underline">Clear</button> : <span/>}
        <button onClick={() => { setOpen(false); setSearch(""); }} className="px-5 py-2 bg-[#1a3c5e] text-white text-[13px] font-bold rounded-xl hover:bg-[#14304d]">
          {active ? `Apply (${values.length})` : "OK"}
        </button>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="flex-shrink-0">
      <button ref={btnRef} onClick={toggle}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all whitespace-nowrap ${active ? "bg-[#1a3c5e] border-[#1a3c5e] text-white" : "bg-white border-gray-300 text-gray-700 hover:border-[#1a3c5e] hover:text-[#1a3c5e]"}`}>
        {pillLabel}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      {dropdown}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────
function ProgrammeCard({ p }: { p: Programme }) {
  return (
    <a href={`/programmes/${p.id}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>
        {p.is_featured && <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">Featured</span>}
        <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-[11px] font-semibold px-2.5 py-1 rounded-full">Deadline: {p.deadline}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2.5">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${degreeBadge[p.degree_type]}`}>{degreeLabel[p.degree_type]}</span>
          <span className="text-[11px] text-gray-400 font-medium">{p.subject_area}</span>
        </div>
        <h3 className="font-extrabold text-[#1a3c5e] text-[15px] tracking-tight leading-snug mb-1 group-hover:text-[#1e4d7b]">{p.title}</h3>
        <p className="text-gray-500 text-[13px] font-medium mb-4">{p.university} · {p.city}</p>
        <div className="mt-auto flex items-center gap-3 pt-3 border-t border-gray-50 text-[12.5px] text-gray-400 font-medium flex-wrap">
          <span>{langLabel[p.language]}</span><span className="text-gray-200">|</span>
          <span>{p.duration_semesters} Semesters</span><span className="text-gray-200">|</span>
          <span className={p.tuition_fee ? "text-orange-500 font-semibold" : "text-green-600 font-semibold"}>
            {p.tuition_fee ? `€${p.tuition_amount}/sem` : "Tuition-free"}
          </span><span className="text-gray-200">|</span>
          <span>{modeLabel[p.study_mode]}</span>
        </div>
      </div>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function ProgrammesPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState("relevance");
  const [expanded, setExpanded] = useState(false);

  const setFilter = (key: FilterKey) => (v: string[]) => setFilters(prev => ({...prev, [key]: v}));

  const secondaryKeys: FilterKey[] = ["mode", "semester", "institution", "tuition", "ects"];
  const secondaryActive = secondaryKeys.reduce((acc, k) => acc + filters[k].length, 0);
  const totalActive = Object.values(filters).reduce((acc, arr) => acc + arr.length, 0);

  // Auto-expand if secondary filters are active
  useEffect(() => { if (secondaryActive > 0) setExpanded(true); }, [secondaryActive]);

  const results = useMemo(() => {
    let d = [...MOCK];
    const has = (arr: string[], val: string) => arr.length === 0 || arr.includes(val);
    if (query.trim()) {
      const q = query.toLowerCase();
      d = d.filter(p => p.title.toLowerCase().includes(q) || p.university.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.subject_area.toLowerCase().includes(q));
    }
    d = d.filter(p =>
      has(filters.degree, p.degree_type) &&
      has(filters.language, p.language) &&
      has(filters.subject, p.subject_area) &&
      has(filters.nc, p.nc_status) &&
      has(filters.semester, p.start_semester) &&
      has(filters.mode, p.study_mode) &&
      has(filters.ects, String(p.ects_required)) &&
      has(filters.institution, p.institution_type) &&
      (filters.tuition.length === 0 ||
        (filters.tuition.includes("free") && !p.tuition_fee) ||
        (filters.tuition.includes("paid") && p.tuition_fee))
    );
    if (sort === "name") d.sort((a,b) => a.title.localeCompare(b.title));
    else if (sort === "university") d.sort((a,b) => a.university.localeCompare(b.university));
    else if (sort === "city") d.sort((a,b) => a.city.localeCompare(b.city));
    else d.sort((a,b) => (b.is_featured?1:0) - (a.is_featured?1:0));
    return d;
  }, [query, filters, sort]);

  const reset = () => { setFilters(defaultFilters); setQuery(""); setExpanded(false); };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">

        {/* Search hero */}
        <div className="bg-[#0f2942]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <h1 className="text-white font-extrabold text-2xl tracking-tight mb-1">International Programmes in Germany</h1>
            <p className="text-white/50 text-[13px] mb-4">{MOCK.length}+ programmes available</p>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center bg-white rounded-xl overflow-hidden">
                <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search by subject, university, or city..."
                  className="flex-1 px-5 py-3.5 text-[14px] outline-none placeholder-gray-400 bg-transparent"/>
                {query && <button onClick={() => setQuery("")} className="pr-4 text-gray-300 hover:text-gray-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>}
              </div>
              <button className="px-5 py-3.5 bg-[#1e4d7b] hover:bg-[#14304d] text-white rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sticky filter bar */}
        <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2">

            {/* Row 1 — always visible */}
            <div className="flex items-center gap-2 flex-wrap">
              <FilterPill label="Programme Type" values={filters.degree} onChange={setFilter("degree")}
                options={[{value:"preparatory_course",label:"Preparatory Course"},{value:"bachelors",label:"Bachelor's Degree"},{value:"masters",label:"Master's Degree"}]}/>
              <FilterPill label="Course Language" values={filters.language} onChange={setFilter("language")}
                options={[{value:"german_only",label:"German Only"},{value:"english_only",label:"English Only"},{value:"german_english",label:"German & English"}]}/>
              <FilterPill label="Subject Area" values={filters.subject} onChange={setFilter("subject")} searchable
                options={SUBJECT_AREAS.map(s => ({value:s,label:s}))}/>
              <FilterPill label="Admission" values={filters.nc} onChange={setFilter("nc")}
                options={[{value:"non_restricted",label:"Non-restricted (ohne NC)"},{value:"restricted",label:"Restricted (NC)"}]}/>

              {/* Spacer pushes remaining items right */}
              <div className="flex-1"/>

              {/* More filters toggle */}
              <button onClick={() => setExpanded(!expanded)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-[13px] font-semibold transition-all whitespace-nowrap ${
                  secondaryActive > 0
                    ? "bg-[#1a3c5e] border-[#1a3c5e] text-white"
                    : expanded
                    ? "bg-gray-100 border-gray-300 text-gray-700"
                    : "bg-white border-gray-300 text-gray-600 hover:border-[#1a3c5e] hover:text-[#1a3c5e]"
                }`}>
                {secondaryActive > 0 ? `More filters (${secondaryActive})` : "More filters"}
                <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>

              {/* Clear all */}
              {totalActive > 0 && (
                <button onClick={reset}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-red-500 text-[13px] font-semibold hover:bg-red-50 whitespace-nowrap transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  Clear ({totalActive})
                </button>
              )}
            </div>

            {/* Row 2 — shown when expanded */}
            {expanded && (
              <div className="flex items-center gap-2 flex-wrap pt-1 pb-0.5 border-t border-gray-100">
                <FilterPill label="Mode of Study" values={filters.mode} onChange={setFilter("mode")}
                  options={[{value:"fully_onsite",label:"Fully On-site"},{value:"fully_online",label:"Fully Online"},{value:"hybrid",label:"Hybrid"}]}/>
                <FilterPill label="Beginning" values={filters.semester} onChange={setFilter("semester")}
                  options={[{value:"summer",label:"Summer Semester"},{value:"winter",label:"Winter Semester"},{value:"summer_winter",label:"Summer & Winter"}]}/>
                <FilterPill label="Institution Type" values={filters.institution} onChange={setFilter("institution")}
                  options={[{value:"public",label:"Public"},{value:"private",label:"Private"}]}/>
                <FilterPill label="Tuition Fees" values={filters.tuition} onChange={setFilter("tuition")}
                  options={[{value:"free",label:"No (Tuition-free)"},{value:"paid",label:"Yes (Paid)"}]}/>
                <FilterPill label="ECTS" values={filters.ects} onChange={setFilter("ects")}
                  options={[{value:"0",label:"0 ECTS"},{value:"180",label:"180 ECTS"},{value:"210",label:"210 ECTS"}]}/>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-5">
            <p className="text-gray-500 text-[13.5px]">
              <span className="font-extrabold text-[#1a3c5e]">{results.length}</span> programme{results.length !== 1 ? "s" : ""} found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[12.5px]">Sort:</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-1.5 border border-gray-200 rounded-lg text-[12.5px] text-gray-700 outline-none focus:border-[#1a3c5e] bg-white">
                <option value="relevance">Featured first</option>
                <option value="name">Name A–Z</option>
                <option value="university">University A–Z</option>
                <option value="city">City A–Z</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
              <svg className="w-12 h-12 text-gray-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/></svg>
              <h3 className="font-extrabold text-[#1a3c5e] text-lg mb-2">No programmes found</h3>
              <p className="text-gray-400 text-sm mb-5">Try adjusting your filters or search terms.</p>
              <button onClick={reset} className="px-5 py-2.5 bg-[#1a3c5e] text-white font-semibold text-sm rounded-xl hover:bg-[#14304d]">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map(p => <ProgrammeCard key={p.id} p={p}/>)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}