"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Sign in failed. Please try again.");
        return;
      }

      // If middleware sent them here with a ?next= param, honour it
      // Otherwise use the server-determined redirect (admin vs user)
      const next = searchParams.get("next");
      router.push(next ?? data.redirect ?? "/programmes");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight mb-1">Welcome back</h1>
            <p className="text-gray-400 text-sm">Sign in to your Studymetaverse account</p>
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
                  autoComplete="current-password"
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
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-[13px]">
                Don&apos;t have an account?{" "}
                <Link href="/get-started" className="text-[#1a3c5e] font-semibold hover:underline">
                  Get started
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}