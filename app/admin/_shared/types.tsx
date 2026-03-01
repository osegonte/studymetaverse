import React from "react";

// ── Shared class strings ─────────────────────────────────────
export const inputClass =
  "w-full px-3 py-2 border border-gray-200 rounded-lg text-[13.5px] outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white";

export const selectClass =
  "w-full px-3 py-2 border border-gray-200 rounded-lg text-[13.5px] outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white";

export const textareaClass =
  "w-full px-3 py-2 border border-gray-200 rounded-lg text-[13.5px] outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white resize-none";

// ── FormField wrapper ────────────────────────────────────────
export function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-gray-500">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// ── Preparatory course subject groups ────────────────────────
export const PREP_GROUPS = [
  { value: "engineering",           label: "Engineering & Technology" },
  { value: "natural_sciences",      label: "Natural Sciences" },
  { value: "economics",             label: "Economics & Social Sciences" },
  { value: "humanities",            label: "Humanities & Language" },
  { value: "medicine",              label: "Medicine & Health Sciences" },
  { value: "arts",                  label: "Arts & Design" },
];