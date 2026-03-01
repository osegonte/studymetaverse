"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const QUICK_TAGS = ["English taught", "Tuition-free", "Bachelor", "Master", "Berlin", "Munich"];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [tagline, setTagline] = useState("Compare tuition, language requirements, deadlines, and admission chances across 1,000+ programmes.");
  const [countLabel, setCountLabel] = useState("3,200+ Programmes Available");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from("settings")
        .select("key, value")
        .in("key", ["site_tagline", "programmes_count_label"]);

      if (data) {
        for (const row of data) {
          if (row.key === "site_tagline" && row.value) setTagline(row.value);
          if (row.key === "programmes_count_label" && row.value) setCountLabel(row.value);
        }
      }
    }
    fetchSettings();
  }, []);

  function handleSearch() {
    const q = query.trim();
    if (q) {
      router.push(`/programmes?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/programmes");
    }
  }

  function handleTagClick(tag: string) {
    router.push(`/programmes?q=${encodeURIComponent(tag)}`);
  }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6"
      style={{ background: "linear-gradient(135deg, #0f2942 0%, #1a3c5e 50%, #1e4d7b 100%)" }}
    >
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/80 text-sm font-medium">{countLabel}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5 tracking-tight"
        >
          Find the Best Study<br />
          <span className="text-blue-300">Programme in Germany</span><br />
          for You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-white/70 text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex items-center bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-xl mx-auto mb-5"
        >
          <svg className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="Search by subject, university, or city..."
            className="flex-1 px-4 py-4 text-gray-800 text-[15px] outline-none placeholder-gray-400 bg-transparent min-w-0"
          />
          {query && (
            <button onClick={() => setQuery("")} className="pr-2 text-gray-300 hover:text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={handleSearch}
            className="m-1.5 px-5 py-3 bg-[#1a3c5e] text-white font-semibold text-sm rounded-lg hover:bg-[#14304d] transition-colors flex-shrink-0"
          >
            Search
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 text-sm rounded-full transition-colors"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-white text-xs">Scroll</span>
        <svg className="w-4 h-4 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  );
}