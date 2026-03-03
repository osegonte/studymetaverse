import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="bg-[#0f2942] py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-white/50 text-[12px] font-bold uppercase tracking-widest mb-2">Legal</p>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Cookie Policy</h1>
            <p className="text-white/50 text-[13px] mt-2">Last updated: March 2026</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-10 prose prose-gray max-w-none">

            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They are widely used
              to make websites work efficiently and to provide information to site operators.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>
              Studymetaverse uses only <strong>essential cookies</strong>. We do not use advertising, tracking,
              or analytics cookies.
            </p>

            <h2>3. Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-2.5 font-bold text-gray-700">Cookie</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-700">Purpose</th>
                    <th className="text-left px-4 py-2.5 font-bold text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-mono text-[12px] text-[#1a3c5e]">sb-auth-token</td>
                    <td className="px-4 py-3 text-gray-600">Keeps you logged in to your account (Supabase authentication)</td>
                    <td className="px-4 py-3 text-gray-500">Session / 1 week</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-[12px] text-[#1a3c5e]">sb-refresh-token</td>
                    <td className="px-4 py-3 text-gray-600">Refreshes your login session automatically</td>
                    <td className="px-4 py-3 text-gray-500">1 week</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. Essential Cookies Cannot Be Disabled</h2>
            <p>
              Because we only use essential cookies necessary for the Platform to function, these cannot
              be disabled without breaking core features like staying logged in. You can clear all cookies
              at any time through your browser settings, but this will log you out of your account.
            </p>

            <h2>5. Third-Party Cookies</h2>
            <p>
              When you make a payment via Stripe, Stripe may set its own cookies to process the transaction
              securely. These are governed by <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe's Privacy Policy</a>.
            </p>

            <h2>6. Managing Cookies</h2>
            <p>You can manage or delete cookies through your browser settings:</p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>

            <h2>7. Contact</h2>
            <p>
              For any questions about our use of cookies:<br />
              Email: <a href="mailto:---">---</a>
            </p>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
