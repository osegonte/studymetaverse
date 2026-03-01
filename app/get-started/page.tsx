"use client";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function GetStartedForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-6 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1a3c5e"/>
              <path d="M16 6L6 12l10 6 10-6-10-6z" fill="white"/>
              <path d="M6 18l10 6 10-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
            </svg>
            <span className="font-semibold text-[15px] text-[#1a3c5e] tracking-tight">Studymetaverse</span>
          </Link>
        </header>
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-[#1a3c5e] mb-2">Check your email</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              We sent a confirmation link to <strong className="text-[#1a3c5e]">{email}</strong>. Click it to activate your account, then sign in.
            </p>
            <Link
              href="/signin"
              className="inline-block w-full py-3 bg-[#1a3c5e] text-white font-bold text-[14px] rounded-xl hover:bg-[#14304d] transition-colors text-center"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Minimal header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1a3c5e"/>
            <path d="M16 6L6 12l10 6 10-6-10-6z" fill="white"/>
            <path d="M6 18l10 6 10-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
          </svg>
          <span className="font-semibold text-[15px] text-[#1a3c5e] tracking-tight">Studymetaverse</span>
        </Link>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight mb-1">Create your account</h1>
            <p className="text-gray-400 text-sm">Free to search. Free to explore.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[14px] text-gray-800 outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[14px] text-gray-800 outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all"
                  placeholder="Min. 8 characters"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[14px] text-gray-800 outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-red-500 text-[13px] bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1a3c5e] text-white font-bold text-[14px] rounded-xl hover:bg-[#14304d] transition-colors disabled:opacity-60 mt-1"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-[13px]">
                Already have an account?{" "}
                <Link href="/signin" className="text-[#1a3c5e] font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-gray-300 text-[12px] mt-5 leading-relaxed">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="hover:text-gray-400 underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="hover:text-gray-400 underline">Privacy Policy</Link>.
          </p>

        </div>
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense>
      <GetStartedForm />
    </Suspense>
  );
}