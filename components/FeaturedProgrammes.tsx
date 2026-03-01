"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AnimatedSection from "./AnimatedSection";

interface FeaturedProg {
  id: string;
  title: string;
  degree_type: string;
  tuition_fee: boolean;
  tuition_fee_amount: number | null;
  language_of_instruction: string;
  deadline_winter: string | null;
  deadline_summer: string | null;
  start_semester: string;
  universities: { name: string; city: string; image_url: string | null };
}

const degreeLabel: Record<string, string> = {
  preparatory_course: "PREPARATORY",
  bachelors: "BACHELOR",
  masters: "MASTER",
};

const langLabel: Record<string, string> = {
  german_only: "German",
  english_only: "English",
  german_english: "English / German",
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=220&fit=crop",
];

export default function FeaturedProgrammes() {
  const [programmes, setProgrammes] = useState<FeaturedProg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("programs")
      .select("id, title, degree_type, tuition_fee, tuition_fee_amount, language_of_instruction, deadline_winter, deadline_summer, start_semester, universities(name, city, image_url)")
      .eq("is_featured", true)
      .eq("is_published", true)
      .limit(3)
      .then(({ data }) => {
        if (data) setProgrammes(data as unknown as FeaturedProg[]);
        setLoading(false);
      });
  }, []);

  function formatDeadline(p: FeaturedProg) {
    const d = p.start_semester === "summer" ? p.deadline_summer : p.deadline_winter;
    if (!d) return "See website";
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }

  function tuitionLabel(p: FeaturedProg) {
    if (!p.tuition_fee) return "€0 / Sem";
    return p.tuition_fee_amount ? `€${Number(p.tuition_fee_amount).toLocaleString()} / Sem` : "Paid";
  }

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a3c5e] tracking-tight">Featured Programmes</h2>
              <p className="text-gray-500 font-medium mt-1 text-sm sm:text-base">Top-rated courses handpicked for you.</p>
            </div>
            <a href="/programmes" className="text-[#1a3c5e] font-semibold text-sm hover:underline whitespace-nowrap ml-4">
              View all &rarr;
            </a>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
                <div className="h-44 bg-gray-100" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-5 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : programmes.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No featured programmes yet. Mark some as featured in the admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {programmes.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <a
                  href={`/programmes/${p.id}`}
                  className="block rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer h-full"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={p.universities?.image_url ?? FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between px-5 pt-4 pb-1">
                    <span className="bg-[#1a3c5e] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {degreeLabel[p.degree_type] ?? p.degree_type.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-[12px] font-medium">Deadline: {formatDeadline(p)}</span>
                  </div>
                  <div className="px-5 pb-5 pt-2">
                    <h3 className="font-extrabold text-[#1a3c5e] text-[17px] tracking-tight mb-1">{p.title}</h3>
                    <p className="text-gray-500 text-sm font-medium mb-4">
                      {p.universities?.name} · {p.universities?.city}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                      <span>{tuitionLabel(p)}</span>
                      <span>&middot;</span>
                      <span>{langLabel[p.language_of_instruction] ?? p.language_of_instruction}</span>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}