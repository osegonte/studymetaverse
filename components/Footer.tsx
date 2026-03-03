"use client";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

const SECTIONS = [
  {
    label: "Platform",
    links: [
      { label: "Programmes",   href: "/programmes" },
      { label: "Universities", href: "/universities" },
      { label: "Blog",         href: "/blog" },
      { label: "Match Report", href: "/match-report" },
    ],
  },
  {
    label: "Support",
    links: [
      { label: "Talk to an Expert", href: "/talk-to-an-expert" },
      { label: "Contact",           href: "mailto:studymetaverses@gmail.com" },
      { label: "About Us",          href: "/about" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy Policy",  href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Policy",   href: "/cookie-policy" },
      { label: "Imprint",         href: "/imprint" },
    ],
  },
];

function AccordionSection({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-extrabold text-[#1a3c5e] text-[11px] uppercase tracking-widest">
          {label}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="flex flex-col gap-3 pb-5">
          {links.map(link => (
            <li key={link.label}>
              <a href={link.href}
                className="text-gray-400 text-[13.5px] font-medium hover:text-[#1a3c5e] transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Main footer body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-14">

            {/* Left — Brand + newsletter hint + socials */}
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#1a3c5e"/>
                    <path d="M16 6L6 12l10 6 10-6-10-6z" fill="white"/>
                    <path d="M6 18l10 6 10-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
                  </svg>
                  <span className="font-extrabold text-[#1a3c5e] text-[15px]">Studymetaverse</span>
                </div>
                <p className="text-gray-400 text-[13px] font-medium leading-relaxed max-w-[260px]">
                  The comprehensive platform for international students to find, compare, and apply for study programmes in Germany.
                </p>
              </div>

              {/* Email CTA */}
              <div>
                <p className="font-extrabold text-[#1a3c5e] text-[11px] uppercase tracking-widest mb-3">Get in Touch</p>
                <a href="mailto:studymetaverses@gmail.com"
                  className="inline-flex items-center gap-2 text-gray-500 text-[13.5px] font-medium hover:text-[#1a3c5e] transition-colors">
                  studymetaverses@gmail.com
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                {/* Gmail */}
                <a href="mailto:studymetaverses@gmail.com" aria-label="Email us"
                  className="text-gray-400 hover:text-[#1a3c5e] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.64l8.073-6.148C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@studymetaverse.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                  className="text-gray-400 hover:text-[#1a3c5e] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/share/16DCXTeQpH/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="text-gray-400 hover:text-[#1a3c5e] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.273h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right — Accordion nav sections */}
            <div>
              {SECTIONS.map(section => (
                <AccordionSection key={section.label} label={section.label} links={section.links} />
              ))}
              <div className="border-t border-gray-100" />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-100 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-400 text-[12px] font-medium text-center sm:text-left">
              &copy; {new Date().getFullYear()} Studymetaverse. All rights reserved.
              Data sourced from public university records.
            </p>
            <a
              href="https://osegonte.webdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 text-[11px] font-semibold tracking-widest uppercase hover:text-[#1a3c5e] transition-colors"
            >
              Built by osegonte.webdev
            </a>
          </div>

        </div>
      </AnimatedSection>
    </footer>
  );
}