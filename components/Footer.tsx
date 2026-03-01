import AnimatedSection from "./AnimatedSection";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-14 pb-8 px-4 sm:px-6">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#1a3c5e"/>
                  <path d="M16 6L6 12l10 6 10-6-10-6z" fill="white"/>
                  <path d="M6 18l10 6 10-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
                </svg>
                <span className="font-extrabold text-[#1a3c5e] text-[15px]">Studymetaverse</span>
              </div>
              <p className="text-gray-400 text-[13px] font-medium leading-relaxed max-w-[200px]">
                The comprehensive platform for international students to find, compare, and apply for study programmes in Germany.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-extrabold text-[#1a3c5e] text-[12px] uppercase tracking-widest mb-4">Platform</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: "Programmes", href: "/programmes" },
                  { label: "Universities", href: "/universities" },
                  { label: "Cities", href: "/cities" },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-gray-400 text-[13.5px] font-medium hover:text-[#1a3c5e] transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-extrabold text-[#1a3c5e] text-[12px] uppercase tracking-widest mb-4">Company</h4>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href="/about" className="text-gray-400 text-[13.5px] font-medium hover:text-[#1a3c5e] transition-colors">About Us</a>
                </li>
                <li>
                  <a href="mailto:studymetaverses@gmail.com" className="text-gray-400 text-[13.5px] font-medium hover:text-[#1a3c5e] transition-colors">Contact</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-extrabold text-[#1a3c5e] text-[12px] uppercase tracking-widest mb-4">Legal</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Cookie Policy", href: "/cookies" },
                  { label: "Imprint", href: "/imprint" },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-gray-400 text-[13.5px] font-medium hover:text-[#1a3c5e] transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-[12px] font-medium text-center sm:text-left">
              &copy; {new Date().getFullYear()} Studymetaverse. All rights reserved. Data sourced from public university records.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">

              {/* Gmail */}
              <a href="mailto:studymetaverses@gmail.com" aria-label="Email us" className="text-gray-400 hover:text-[#1a3c5e] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.64l8.073-6.148C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@studymetaverse.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-400 hover:text-[#1a3c5e] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/share/16DCXTeQpH/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-[#1a3c5e] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.273h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>

            </div>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}