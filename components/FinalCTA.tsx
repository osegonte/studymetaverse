import AnimatedSection from "./AnimatedSection";

export default function FinalCTA() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6">
      <AnimatedSection>
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a3c5e] rounded-3xl px-6 sm:px-10 py-14 sm:py-16 text-center shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready to find your future?
            </h2>
            <p className="text-white/60 font-medium text-[14px] sm:text-[15px] mb-10 max-w-md mx-auto leading-relaxed">
              Join thousands of students using Studymetaverse to navigate their education journey in Germany.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/programmes" className="px-7 py-3.5 bg-white text-[#1a3c5e] font-extrabold text-[14px] sm:text-[15px] rounded-xl hover:bg-gray-100 transition-colors shadow-md w-full sm:w-auto text-center">
                Start your search today
              </a>
              <a href="/universities" className="px-7 py-3.5 border-2 border-white/40 text-white font-extrabold text-[14px] sm:text-[15px] rounded-xl hover:bg-white/10 transition-colors w-full sm:w-auto text-center">
                Browse Universities
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}