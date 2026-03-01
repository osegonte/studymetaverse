import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MatchReportPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-[#1a3c5e]/8 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight mb-3">Match Report</h1>
          <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
            We evaluate your academic profile and tell you your admission chances for any German university programme. This service is coming soon.
          </p>
          <p className="text-gray-400 text-[13px] mb-6">In the meantime, reach us directly to get started.</p>
          <a
            href="mailto:studymetaverses@gmail.com?subject=Match Report Request"
            className="block w-full py-3 bg-[#1a3c5e] text-white font-bold text-[14px] rounded-xl hover:bg-[#14304d] transition-colors"
          >
            Request a Match Report
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}