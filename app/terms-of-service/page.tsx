import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="bg-[#0f2942] py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-white/50 text-[12px] font-bold uppercase tracking-widest mb-2">Legal</p>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Terms of Service</h1>
            <p className="text-white/50 text-[13px] mt-2">Last updated: March 2026</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-10 prose prose-gray max-w-none">

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Studymetaverse ("the Platform"), you agree to be bound by these Terms of Service.
              If you do not agree, please do not use the Platform.
            </p>

            <h2>2. Who Operates the Platform</h2>
            <p>
              Studymetaverse is operated by Ekene Chukwuemeka-Eri, Viktoriastr. 64, 69126 Heidelberg,
              Germany. Contact: <a href="mailto:---">---</a>
            </p>

            <h2>3. What Studymetaverse Provides</h2>
            <p>
              The Platform provides an information service to help students discover, filter, and compare
              university programmes in Germany. We also offer a paid Match Report service — a personalised
              assessment of your admission chances for a selected programme.
            </p>
            <p>
              <strong>Important:</strong> Studymetaverse is an information platform only. We are not a university,
              admissions office, or legal advisor. We do not guarantee admission to any programme. All final
              admission decisions rest solely with the universities.
            </p>

            <h2>4. User Accounts</h2>
            <ul>
              <li>You must provide accurate information when creating an account.</li>
              <li>You are responsible for keeping your login credentials secure.</li>
              <li>You must be at least 16 years old to create an account.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
            </ul>

            <h2>5. Match Report Service</h2>
            <ul>
              <li>The Match Report is a one-time paid service providing a personalised academic profile assessment.</li>
              <li>Payment is processed securely via Stripe.</li>
              <li>Reports are delivered within 48 hours of confirmed payment.</li>
              <li><strong>Refund policy:</strong> Due to the personalised nature of the report, refunds are not offered once the report has been delivered. If you have not received your report within 48 hours, contact us at <a href="mailto:---">---</a>.</li>
              <li>The Match Report is an advisory service. It does not guarantee any admission outcome.</li>
            </ul>

            <h2>6. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Platform for any unlawful purpose.</li>
              <li>Attempt to gain unauthorised access to any part of the Platform.</li>
              <li>Scrape, copy, or reproduce Platform content without permission.</li>
              <li>Submit false or misleading information.</li>
            </ul>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on the Platform — including text, design, code, and data — is owned by or licensed to
              Ekene Chukwuemeka-Eri. You may not reproduce or distribute any part of the Platform without
              prior written permission.
            </p>

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              The Platform is provided "as is" without warranties of any kind. We do not warrant that the
              Platform will be error-free, uninterrupted, or that programme information is always current.
              Always verify details directly with the relevant university before applying.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Studymetaverse shall not be liable for any indirect,
              incidental, or consequential damages arising from your use of the Platform or reliance on
              information provided.
            </p>

            <h2>10. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Platform after changes
              constitutes acceptance of the updated Terms. We will notify registered users of significant changes.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Federal Republic of Germany. Any disputes shall
              be subject to the jurisdiction of the courts of Heidelberg, Germany.
            </p>

            <h2>12. Contact</h2>
            <p>
              For any questions about these Terms:<br />
              Email: <a href="mailto:---">---</a><br />
              Address: Viktoriastr. 64, 69126 Heidelberg, Germany
            </p>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
