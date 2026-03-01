"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PremiumCTA() {
  const [price, setPrice] = useState("29");

  useEffect(() => {
    supabase
      .from("settings")
      .select("value")
      .eq("key", "match_report_price")
      .single()
      .then(({ data }) => { if (data) setPrice(data.value); });
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0f2942] py-20 px-4">

      {/* Decorative circle */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#1a3c5e] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Left */}
        <div className="flex-1">
          <span className="inline-block bg-white/10 border border-white/20 text-white/70 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            Expert Analysis
          </span>
          <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Get Your Personalized Match<br />Report for just €{price}
          </h2>
          <p className="text-white/60 text-[15px] font-medium mb-8 max-w-md leading-relaxed">
            Stop guessing your chances. Get a data-backed report on your admission probability for any programme in Germany.
          </p>

          <ul className="flex flex-col gap-3 mb-10">
            {[
              "Personalized admission probability percentage",
              "Full eligibility check (ECTS, Degree, Language)",
              "Best-fit programme alternatives",
              "Step-by-step visa & document checklist",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80 text-[14px] font-medium">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <a href="/match-report" className="inline-block px-7 py-3.5 bg-white text-[#0f2942] font-extrabold text-[15px] rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
            Get Your Report Now
          </a>
        </div>

        {/* Right — Mock Report Card */}
        <div className="flex-1 flex justify-center relative py-8">

          {/* Price badge */}
          <div className="absolute -top-2 right-4 md:right-16 w-20 h-20 bg-yellow-400 rounded-full flex flex-col items-center justify-center z-10 shadow-2xl ring-4 ring-yellow-300/50">
            <span className="text-[9px] font-bold text-yellow-900 uppercase tracking-wide">Only</span>
            <span className="text-[18px] font-extrabold text-yellow-900">€{price}</span>
          </div>

          {/* Tilted card */}
          <div
            className="bg-white rounded-2xl shadow-2xl p-6"
            style={{ transform: "rotate(3deg)", minHeight: "280px", minWidth: "420px" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#1a3c5e] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <span className="font-extrabold text-[#1a3c5e] text-[14px]">Match Report #8421</span>
            </div>
            <p className="text-gray-400 text-[11px] mb-5">Issued: July 2025</p>

            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Admission Probability</p>
            <div className="w-full h-2.5 bg-gray-100 rounded-full mb-1">
              <div className="h-2.5 bg-green-500 rounded-full" style={{ width: "85%" }}></div>
            </div>
            <p className="text-green-600 font-extrabold text-[14px] mb-5">85% — High</p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">ECTS Match</p>
                <p className="text-[#1a3c5e] font-extrabold text-[13px]">100% Correct</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Language Proof</p>
                <p className="text-[#1a3c5e] font-extrabold text-[13px]">IELTS 7.5 OK</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] font-extrabold text-gray-700 uppercase tracking-widest mb-1 underline">Expert Insights</p>
              <p className="text-gray-500 text-[12px] leading-relaxed italic">
                "Your undergraduate focus on Statistics perfectly aligns with the Master's prerequisites. Recommendation: Strong."
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}