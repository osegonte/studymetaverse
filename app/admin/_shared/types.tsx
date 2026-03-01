// Shared types matching the Supabase schema

export type InstitutionType = "private" | "public";
export type DegreeType = "preparatory_course" | "bachelors" | "masters";
export type StudyMode = "fully_onsite" | "fully_online" | "hybrid";
export type LanguageOfInstruction = "german_only" | "english_only" | "german_english";
export type StartSemester = "summer" | "winter" | "summer_winter";
export type NcStatus = "restricted" | "non_restricted";
export type RequirementStatus = "yes" | "no" | "varied";
export type PreparationSubjectGroup = "m_kurs" | "t_kurs" | "ti_kurs" | "w_kurs" | "ww_kurs" | "g_kurs" | "s_kurs" | "sw_kurs";

export interface University {
  id?: string;
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

export interface Programme {
  id?: string;
  university_id: string;
  title: string;
  degree_type: DegreeType;
  subject_area_id: string;
  study_mode: StudyMode;
  language_of_instruction: LanguageOfInstruction;
  std_period_semesters: string;
  start_semester: StartSemester;
  program_details: string;
  nc_status: NcStatus;
  ects_required: string;
  motiv_required: RequirementStatus;
  test_required: RequirementStatus;
  interview: RequirementStatus;
  modul_required: RequirementStatus;
  moiletter_accepted: boolean;
  tuition_fee: boolean;
  tuition_fee_amount: string;
  preparation_subject_group: PreparationSubjectGroup | "";
  deadline_winter: string;
  deadline_summer: string;
  is_featured: boolean;
  is_published: boolean;
}

export interface NewsPost {
  id?: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string;
  category: string;
  cover_image_url: string;
  is_published: boolean;
  published_at: string;
}

// Reusable field components
export function FormField({ label, required, children, hint }: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-gray-400 text-[11.5px] mt-1">{hint}</p>}
    </div>
  );
}

export const inputClass = "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13.5px] text-gray-800 outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white";
export const selectClass = "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13.5px] text-gray-800 outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white";
export const textareaClass = "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13.5px] text-gray-800 outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white resize-none";

export const SUBJECT_AREAS = [
  "Agriculture", "Arts", "Biochemistry", "Biology", "Business", "Chemistry",
  "Communication", "Computer Science", "Economics", "Education", "Engineering",
  "Environmental Science", "Food and Beverage", "Health", "Literature",
  "Medicine", "Philosophy", "Physics", "Psychology", "Social Science",
];

export const PREP_GROUPS: { value: PreparationSubjectGroup; label: string }[] = [
  { value: "m_kurs", label: "M-Kurs — Medical" },
  { value: "t_kurs", label: "T-Kurs — Technical" },
  { value: "ti_kurs", label: "TI-Kurs — Technical-Informatics" },
  { value: "w_kurs", label: "W-Kurs — Economics" },
  { value: "ww_kurs", label: "WW-Kurs — Business and Economics" },
  { value: "g_kurs", label: "G-Kurs — Humanities" },
  { value: "s_kurs", label: "S-Kurs — Language" },
  { value: "sw_kurs", label: "SW-Kurs — Social Sciences" },
];