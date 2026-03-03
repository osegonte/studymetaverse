"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€", USD: "$", GBP: "£", NGN: "₦",
};

const FEATURES = [
  "Admission probability score",
  "Eligibility check",
  "Best-fit programmes",
  "Visa & document checklist",
  "Expert insights",
  "Application timeline",
];

const STEPS = [
  {
    n: "1",
    title: "Complete Profile",
    desc: "Fill in your academic background, test scores, and career aspirations in our quick assessment.",
  },
  {
    n: "2",
    title: "AI Matching",
    desc: "Our proprietary algorithms analyse thousands of programmes to find your highest probability matches.",
  },
  {
    n: "3",
    title: "Get Your Report",
    desc: "Receive your detailed PDF report with actionable steps, deadlines, and expert recommendations.",
  },
];

export default function MatchReportPage() {
  const [price, setPrice] = useState("29");
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    supabase
      .from("settings")
      .select("key, value")
      .in("key", ["match_report_price", "match_report_currency"])
      .then(({ data }) => {
        if (data) {
          data.forEach(row => {
            if (row.key === "match_report_price") setPrice(row.value);
            if (row.key === "match_report_currency") setCurrency(row.value);
          });
        }
      });
  }, []);

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f4f6f8] pt-16">

        {/* Hero */}
        <div className="bg-[#0f2942] py-20 text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Get Your Personalized<br />Match Report
          </h1>
          <p className="text-white/60 text-[15px] max-w-md mx-auto leading-relaxed mb-8">
            Data-driven insights to find the perfect university and program for your international education journey.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button className="px-7 py-3 bg-white text-[#0f2942] font-bold text-[14px] rounded-lg hover:bg-white/90 transition-colors">
              Start Assessment
            </button>
            <button className="px-7 py-3 border-2 border-white text-white font-bold text-[14px] rounded-lg hover:bg-white/10 transition-colors">
              View Sample Report
            </button>
          </div>
        </div>

        {/* Pricing card */}
        <div className="max-w-2xl mx-auto px-4 py-14">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">

            {/* Badge */}
            <div className="flex justify-center mb-5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200 px-4 py-1.5 rounded-full">
                Comprehensive Analysis
              </span>
            </div>

            {/* Title + price */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-[#0f2942] mb-3">Full Match Report</h2>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-extrabold text-[#0f2942]">{symbol}{price}</span>
                <span className="text-gray-400 text-[14px]">one-time payment</span>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-100 mb-7" />

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {FEATURES.map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-[14px] font-medium">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <button className="w-full py-4 bg-[#0f2942] text-white font-extrabold text-[15px] rounded-xl hover:bg-[#14304d] transition-colors mb-4">
              Unlock Your Report Now
            </button>

            {/* Coming soon strip */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#0f2942] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <p className="font-bold text-[#0f2942] text-[13px]">Coming Soon</p>
                  <p className="text-gray-400 text-[12px]">Looking for more personalized guidance from humans?</p>
                </div>
              </div>
              <a href="/talk-to-an-expert"
                className="flex-shrink-0 px-4 py-2 bg-[#0f2942] text-white font-bold text-[12.5px] rounded-lg hover:bg-[#14304d] transition-colors whitespace-nowrap">
                Talk to an Expert
              </a>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-4xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942] mb-3">How It Works</h2>
          <div className="w-10 h-1 bg-[#0f2942] rounded-full mx-auto mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {STEPS.map(step => (
              <div key={step.n} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#0f2942]/20 bg-white flex items-center justify-center mb-5 shadow-sm">
                  <span className="text-2xl font-extrabold text-[#0f2942]">{step.n}</span>
                </div>
                <h3 className="font-extrabold text-[#0f2942] text-[16px] mb-2">{step.title}</h3>
                <p className="text-gray-500 text-[13.5px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}