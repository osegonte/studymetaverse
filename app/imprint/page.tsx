import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ImprintPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="bg-[#0f2942] py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-white/50 text-[12px] font-bold uppercase tracking-widest mb-2">Legal</p>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Imprint</h1>
            <p className="text-white/50 text-[13px] mt-2">Impressum — as required by § 5 TMG (German Telemedia Act)</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-10 prose prose-gray max-w-none">

            <h2>Responsible for this Website</h2>
            <p>
              <strong>Ekene Chukwuemeka-Eri</strong><br />
              Viktoriastr. 64<br />
              69126 Heidelberg<br />
              Baden-Württemberg, Germany
            </p>

            <h2>Contact</h2>
            <p>
              Email: <a href="mailto:---">---</a><br />
              Phone: ---
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              The European Commission provides a platform for online dispute resolution (ODR):
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"> https://ec.europa.eu/consumers/odr</a>.
              We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board
              and do not voluntarily participate in such proceedings.
            </p>

            <h2>Liability for Content</h2>
            <p>
              As a service provider, we are responsible for our own content on this website in accordance with
              general law (§ 7 TMG). We are not obligated to monitor transmitted or stored third-party information.
              Obligations to remove or block the use of information in accordance with general law remain unaffected.
              Any liability in this regard is only possible from the time of knowledge of a specific legal violation.
            </p>

            <h2>Liability for Links</h2>
            <p>
              Our website contains links to external websites over which we have no control. Therefore, we cannot
              assume any liability for these external contents. The respective provider or operator is always
              responsible for the contents of the linked pages.
            </p>

            <h2>Copyright</h2>
            <p>
              The content and works created by the site operators on these pages are subject to German copyright
              law. Duplication, processing, distribution, or any form of commercialisation of such material beyond
              the scope of the copyright law shall require the prior written consent of its respective author or creator.
            </p>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
