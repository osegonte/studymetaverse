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
                {["Programmes", "Universities", "Cities"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-[13.5px] font-medium hover:text-[#1a3c5e] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-extrabold text-[#1a3c5e] text-[12px] uppercase tracking-widest mb-4">Company</h4>
              <ul className="flex flex-col gap-2.5">
                {["About Us", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-[13.5px] font-medium hover:text-[#1a3c5e] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-extrabold text-[#1a3c5e] text-[12px] uppercase tracking-widest mb-4">Legal</h4>
              <ul className="flex flex-col gap-2.5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Imprint"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-[13.5px] font-medium hover:text-[#1a3c5e] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-400 text-[12px] font-medium text-center sm:text-left">
              &copy; 2025 Studymetaverse. All rights reserved. Data sourced from public university records.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-400 hover:text-[#1a3c5e] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#1a3c5e] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}