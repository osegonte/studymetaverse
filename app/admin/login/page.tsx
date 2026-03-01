"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
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
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed. Please try again.");
        return;
      }

      // Redirect to the page the user was trying to reach, or /admin
      const next = searchParams.get("next") ?? "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f2942] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path d="M16 6L6 12l10 6 10-6-10-6z" fill="white" />
              <path d="M6 18l10 6 10-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
            </svg>
          </div>
          <div>
            <p className="font-extrabold text-white text-[15px]">Studymetaverse</p>
            <p className="text-white/40 text-[12px]">Admin Panel</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-extrabold text-[#1a3c5e] mb-1">Sign in</h1>
          <p className="text-gray-400 text-sm mb-6">Access the admin dashboard</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-[14px] text-gray-800 outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all"
                placeholder="admin@studymetaverse.de"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </div>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}