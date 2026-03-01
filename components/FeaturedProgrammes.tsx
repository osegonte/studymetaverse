import AnimatedSection from "./AnimatedSection";

const programmes = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=220&fit=crop",
    degree: "MASTER",
    deadline: "Deadline: 31 July",
    title: "Data Science & AI",
    university: "TU Munich · Munich",
    tuition: "€0 / Sem",
    language: "English",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=220&fit=crop",
    degree: "BACHELOR",
    deadline: "Deadline: 31 May",
    title: "Business Administration",
    university: "Humboldt University · Berlin",
    tuition: "€1,200 / Sem",
    language: "English/German",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=220&fit=crop",
    degree: "MASTER",
    deadline: "Deadline: 15 June",
    title: "Global Health",
    university: "Heidelberg University · Heidelberg",
    tuition: "€1,500 / Sem",
    language: "English",
  },
];

export default function FeaturedProgrammes() {
  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a3c5e] tracking-tight">Featured Programmes</h2>
              <p className="text-gray-500 font-medium mt-1 text-sm sm:text-base">Top-rated English-taught courses in Germany.</p>
            </div>
            <a href="/programmes" className="text-[#1a3c5e] font-semibold text-sm hover:underline whitespace-nowrap ml-4">
              View all 3,200+ &rarr;
            </a>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {programmes.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 0.1}>
              <a
                href={`/programmes/${p.id}`}
                className="block rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer h-full"
              >
                <div className="h-44 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <div className="flex items-center justify-between px-5 pt-4 pb-1">
                  <span className="bg-[#1a3c5e] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">{p.degree}</span>
                  <span className="text-gray-400 text-[12px] font-medium">{p.deadline}</span>
                </div>
                <div className="px-5 pb-5 pt-2">
                  <h3 className="font-extrabold text-[#1a3c5e] text-[17px] tracking-tight mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm font-medium mb-4">{p.university}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                    <span>{p.tuition}</span>
                    <span>&middot;</span>
                    <span>{p.language}</span>
                  </div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}