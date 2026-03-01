import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-[#0f2942] flex flex-col">

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-24">
          <div className="max-w-2xl w-full">

            {/* Wordmark */}
            <p className="text-white/30 text-[11px] font-bold uppercase tracking-[0.2em] mb-10">
              Studymetaverse
            </p>

            {/* Mission headline */}
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl leading-tight tracking-tight mb-8">
              Studying abroad should be exciting,
              not overwhelming.
            </h1>

            {/* Body copy */}
            <div className="flex flex-col gap-5 text-white/70 text-[16px] leading-relaxed font-medium">
              <p>
                For many Nigerians, the dream of studying in Germany runs straight into a wall of complexity. Visa requirements, language tests, blocked accounts, university portals, application deadlines, admission types, recognition processes. Each step is a separate research project. Most people figure it out alone.
              </p>
              <p>
                Studymetaverse exists to change that. We bring everything into one place: every eligible programme, every requirement, every deadline. You can filter by what actually matters to you, understand what each university truly expects, and know your real chances before you apply.
              </p>
              <p>
                We are starting with Nigeria. One country, done properly. Then we keep going.
              </p>
            </div>

            {/* Divider */}
            <div className="w-12 h-0.5 bg-white/20 my-10"/>

            {/* Values row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Clarity", body: "No jargon. No guesswork. Every piece of information explained plainly." },
                { label: "Honesty", body: "We tell you what your chances actually look like, not what you want to hear." },
                { label: "Access", body: "Free to search. Free to explore. The information belongs to everyone." },
              ].map(v => (
                <div key={v.label}>
                  <p className="text-white font-extrabold text-[13px] uppercase tracking-widest mb-2">{v.label}</p>
                  <p className="text-white/50 text-[13.5px] leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}