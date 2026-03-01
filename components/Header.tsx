"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Programmes", href: "/programmes" },
  { label: "Match Report", href: "/match-report" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <a href="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.15"/>
              <path d="M16 6L6 12l10 6 10-6-10-6z" fill="white"/>
              <path d="M6 18l10 6 10-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
            </svg>
            <span className={`font-semibold text-[15px] tracking-tight transition-colors ${scrolled ? "text-[#1a3c5e]" : "text-white"}`}>
              Studymetaverse
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-[13.5px] font-medium rounded-md transition-all ${scrolled ? "text-gray-600 hover:text-[#1a3c5e]" : "text-white hover:text-white/70"}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a href="/signin" className={`px-4 py-2 text-[13.5px] font-medium transition-colors ${scrolled ? "text-gray-600 hover:text-[#1a3c5e]" : "text-white hover:text-white/70"}`}>
              Sign In
            </a>
            <a href="/get-started" className="px-4 py-[7px] text-[13.5px] font-semibold text-[#1a3c5e] bg-white rounded-lg hover:bg-white/90 transition-colors shadow-sm">
              Get Started
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 rounded-md transition-colors ${scrolled ? "text-gray-600" : "text-white"}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-2">
            <a href="/signin" className="px-3 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-md">Sign In</a>
            <a href="/get-started" className="px-4 py-2.5 text-[14px] font-semibold text-white bg-[#1a3c5e] rounded-lg text-center">Get Started</a>
          </div>
        </div>
      )}
    </header>
  );
}