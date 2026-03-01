import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Database types (mirrors s.sql schema) ────────────────────

export type InstitutionType = "private" | "public";
export type DegreeType = "preparatory_course" | "bachelors" | "masters";
export type StudyMode = "fully_onsite" | "fully_online" | "hybrid";
export type LanguageOfInstruction = "german_only" | "english_only" | "german_english";
export type StartSemester = "summer" | "winter" | "summer_winter";
export type NcStatus = "restricted" | "non_restricted";
export type RequirementStatus = "yes" | "no" | "varied";

// Fixed: matches PREP_GROUPS values in app/admin/_shared/types.tsx
export type PreparationSubjectGroup =
  | "engineering"
  | "natural_sciences"
  | "economics"
  | "humanities"
  | "medicine"
  | "arts";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface University {
  id: string;
  name: string;
  city: string;
  type: InstitutionType;
  website_url: string | null;
  description: string | null;
  address: string | null;
  student_count: number | null;
  ranking: string | null;
  logo_url: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface RequirementSection {
  title: string;
  content: string;
}

export interface Programme {
  id: string;
  university_id: string;
  title: string;
  degree_type: DegreeType;
  subject_area_id: number | null;
  study_mode: StudyMode;
  language_of_instruction: LanguageOfInstruction;
  std_period_semesters: number | null;
  start_semester: StartSemester;
  program_details: string | null;
  nc_status: NcStatus;
  ects_required: number;
  motiv_required: RequirementStatus;
  test_required: RequirementStatus;
  interview: RequirementStatus;
  modul_required: RequirementStatus;
  moiletter_accepted: boolean;
  tuition_fee: boolean;
  tuition_fee_amount: number | null;
  preparation_subject_group: PreparationSubjectGroup | null;
  deadline_winter: string | null;
  deadline_summer: string | null;
  requirements: RequirementSection[] | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubjectArea {
  id: number;
  name: string;
}

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  id: number;
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}

export interface MatchReport {
  id: string;
  user_id: string | null;
  program_id: string | null;
  email: string;
  payment_status: PaymentStatus;
  stripe_payment_id: string | null;
  stripe_session_id: string | null;
  amount_paid: number | null;
  report_content: string | null;
  report_sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  email: string;
  is_premium: boolean;
  subscription_id: string | null;
  subscription_end_date: string | null;
  created_at: string;
  updated_at: string;
}