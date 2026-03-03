import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="bg-[#0f2942] py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-white/50 text-[12px] font-bold uppercase tracking-widest mb-2">Legal</p>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
            <p className="text-white/50 text-[13px] mt-2">Last updated: March 2026</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-10 prose prose-gray max-w-none">

            <h2>1. Who We Are</h2>
            <p>
              Studymetaverse is a web platform helping international students discover and apply to university programmes in Germany.
              The platform is operated by:
            </p>
            <p>
              <strong>Ekene Chukwuemeka-Eri</strong><br />
              Viktoriastr. 64, 69126 Heidelberg, Baden-Württemberg, Germany<br />
              Email: <a href="mailto:---">---</a><br />
              Phone: ---
            </p>

            <h2>2. What Data We Collect</h2>
            <p>We collect the following personal data when you use our platform:</p>
            <ul>
              <li><strong>Account data:</strong> email address and password when you create an account.</li>
              <li><strong>Usage data:</strong> pages visited, programmes saved, and search queries — collected to improve the platform.</li>
              <li><strong>Payment data:</strong> when purchasing a Match Report, payment is processed by Stripe. We do not store your card details.</li>
              <li><strong>Communications:</strong> any information you share when contacting us via email or WhatsApp.</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <ul>
              <li>To provide and improve the platform and its features.</li>
              <li>To process payments for Match Reports and other paid services.</li>
              <li>To communicate with you about your account or enquiries.</li>
              <li>To send relevant updates if you have opted in.</li>
            </ul>

            <h2>4. Legal Basis (GDPR)</h2>
            <p>We process your data under the following legal bases:</p>
            <ul>
              <li><strong>Contract performance</strong> — to deliver services you have paid for.</li>
              <li><strong>Legitimate interests</strong> — to operate and improve the platform.</li>
              <li><strong>Consent</strong> — for optional communications, which you may withdraw at any time.</li>
            </ul>

            <h2>5. Data Storage</h2>
            <p>
              Your data is stored securely using Supabase, hosted on servers within the European Union.
              We retain your data for as long as your account is active, or as required by law.
            </p>

            <h2>6. Cookies</h2>
            <p>
              We use essential cookies to keep you logged in and maintain your session. We do not use tracking
              or advertising cookies. For full details see our <a href="/cookie-policy">Cookie Policy</a>.
            </p>

            <h2>7. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul>
              <li><strong>Supabase</strong> — database and authentication.</li>
              <li><strong>Stripe</strong> — payment processing.</li>
              <li><strong>Vercel</strong> — website hosting.</li>
              <li><strong>Clearbit</strong> — university logo lookup (no personal data shared).</li>
            </ul>

            <h2>8. Your Rights</h2>
            <p>Under GDPR you have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data ("right to be forgotten").</li>
              <li>Object to or restrict processing of your data.</li>
              <li>Data portability — receive your data in a portable format.</li>
              <li>Lodge a complaint with a supervisory authority.</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:---">---</a>.</p>

            <h2>9. Contact</h2>
            <p>
              For any privacy-related questions or requests:<br />
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
