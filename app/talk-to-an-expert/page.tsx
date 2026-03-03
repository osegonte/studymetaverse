import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CONTACT_OPTIONS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Us",
    value: "hello@studymetaverse.com",
    href: "mailto:hello@studymetaverse.com",
    desc: "We reply within 24 hours",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/message/placeholder",
    desc: "Fastest response — usually within a few hours",
  },
];

const FAQS = [
  {
    q: "Who are the experts?",
    a: "Our team has first-hand experience navigating German university admissions as international students. We know the process inside out.",
  },
  {
    q: "What can I ask about?",
    a: "Anything — programme selection, document preparation, language requirements, blocked account setup, visa applications, and life in Germany.",
  },
  {
    q: "Is the consultation free?",
    a: "Initial questions via email or WhatsApp are free. For in-depth, personalised guidance we offer the Match Report.",
  },
  {
    q: "How quickly will I get a response?",
    a: "Email within 24 hours. WhatsApp usually within a few hours during business hours.",
  },
];

export default function TalkToAnExpertPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">

        {/* Hero */}
        <div className="bg-[#0f2942] py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-white/50 text-[12px] font-bold uppercase tracking-widest mb-3">Talk to an Expert</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Get Guidance From Someone Who's Been Through It
            </h1>
            <p className="text-white/60 text-[15px] max-w-xl mx-auto leading-relaxed">
              Have questions about your application, documents, or life in Germany? We're here to help.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-6">

          {/* Contact options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_OPTIONS.map(opt => (
              <a key={opt.label} href={opt.href} target="_blank" rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-[#1a3c5e]/20 transition-all flex flex-col gap-4">
                <div className="w-12 h-12 bg-[#1a3c5e]/8 rounded-2xl flex items-center justify-center text-[#1a3c5e] group-hover:bg-[#1a3c5e] group-hover:text-white transition-all">
                  {opt.icon}
                </div>
                <div>
                  <p className="font-extrabold text-[#1a3c5e] text-[15px]">{opt.label}</p>
                  <p className="text-[#1a3c5e] font-semibold text-[13.5px] mt-0.5">{opt.value}</p>
                  <p className="text-gray-400 text-[12.5px] mt-1">{opt.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-[#1a3c5e] text-[13px] font-semibold mt-auto">
                  Get in touch
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Match report CTA */}
          <div className="bg-[#0f2942] rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1">
              <p className="font-extrabold text-white text-[16px] mb-1">Want a detailed assessment?</p>
              <p className="text-white/60 text-[13.5px] leading-relaxed">
                Get a personalised Match Report — an honest evaluation of your admission chances for any programme.
              </p>
            </div>
            <a href="/match-report"
              className="flex-shrink-0 px-5 py-3 bg-white text-[#0f2942] font-bold text-[13.5px] rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap">
              View Match Report
            </a>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <h2 className="font-extrabold text-[#1a3c5e] text-[17px] mb-6">Common Questions</h2>
            <div className="flex flex-col divide-y divide-gray-50">
              {FAQS.map((faq, i) => (
                <div key={i} className="py-4 first:pt-0 last:pb-0">
                  <p className="font-extrabold text-[#1a3c5e] text-[14px] mb-1.5">{faq.q}</p>
                  <p className="text-gray-500 text-[13.5px] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}