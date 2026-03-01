"use client";
import { motion } from "framer-motion";

export default function Hero() {
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
          <span className="text-white/80 text-sm font-medium">3,200+ Programmes Available</span>
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
          Compare tuition, language requirements, deadlines, and admission chances across 1,000+ programmes.
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
            type="text"
            placeholder="Search by subject, university, or city..."
            className="flex-1 px-4 py-4 text-gray-800 text-[15px] outline-none placeholder-gray-400 bg-transparent min-w-0"
          />
          <button className="m-1.5 px-5 py-3 bg-[#1a3c5e] text-white font-semibold text-sm rounded-lg hover:bg-[#14304d] transition-colors flex-shrink-0">
            Search
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {["English taught", "Tuition-free", "Bachelor", "Master", "Berlin", "Munich"].map((tag) => (
            <button key={tag} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 text-sm rounded-full transition-colors">
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