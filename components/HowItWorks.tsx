import AnimatedSection from "./AnimatedSection";

export default function HowItWorks() {
  const steps = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
        </svg>
      ),
      title: "1. Search",
      description: "Find programmes by subject, university, or city using our advanced filters.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 9H4M4 9l3-3M4 9l3 3"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 15h16M20 15l-3-3M20 15l-3 3"/>
        </svg>
      ),
      title: "2. Compare",
      description: "Evaluate tuition fees, language requirements, and application deadlines side-by-side.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
      title: "3. Get Match Report",
      description: "Receive a personalized admission probability report tailored to your profile.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a3c5e] mb-3 tracking-tight">How It Works</h2>
          <p className="text-gray-500 text-base font-medium mb-12 sm:mb-16">Your 3-step path to studying in Germany.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
          {steps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1a3c5e] flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                <h3 className="font-extrabold text-[#1a3c5e] text-xl tracking-tight">{step.title}</h3>
                <p className="text-gray-500 text-[14px] font-medium leading-relaxed max-w-[220px] mx-auto">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}