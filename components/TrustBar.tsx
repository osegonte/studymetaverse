import AnimatedSection from "./AnimatedSection";

export default function TrustBar() {
  const items = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Official Data",
      subtitle: "Sourced from public university records",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
        </svg>
      ),
      title: "3,200+ Programmes",
      subtitle: "Indexed and updated daily",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: "Global Reach",
      subtitle: "Used by international students",
    },
  ];

  return (
    <section className="bg-white border-b border-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {items.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-2">
                {item.icon}
                <p className="font-bold text-[#1a3c5e] text-[17px] tracking-tight">{item.title}</p>
                <p className="text-gray-600 text-[13.5px] font-medium">{item.subtitle}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}