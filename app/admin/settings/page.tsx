"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { inputClass } from "../_shared/types";

interface SettingRow {
  id: number;
  key: string;
  value: string;
  description: string | null;
}

const META: Record<string, { label: string; type: "text" | "number" | "select"; options?: string[] }> = {
  match_report_price:     { label: "Match Report Price (EUR)",  type: "number" },
  match_report_currency:  { label: "Currency",                  type: "select", options: ["EUR", "USD", "GBP"] },
  programmes_count_label: { label: "Programmes Count Label",    type: "text" },
  site_tagline:           { label: "Hero Tagline",              type: "text" },
  stripe_mode:            { label: "Stripe Mode",               type: "select", options: ["test", "live"] },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchSettings(); }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase.from("settings").select("*").order("id");
    if (error) setError(error.message);
    else setSettings(data ?? []);
    setLoading(false);
  }

  const updateValue = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
    setSaved(false);
  };

  async function handleSave() {
    setSaving(true);
    setError(null);
    const upserts = settings.map(s => ({ id: s.id, key: s.key, value: s.value }));
    const { error } = await supabase.from("settings").upsert(upserts);
    if (error) setError(error.message);
    else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    setSaving(false);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">Settings</h1>
        <p className="text-gray-400 text-sm mt-0.5">Site-wide configuration. Changes apply everywhere without a code deploy.</p>
      </div>

      {error && <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[13px]">{error}</div>}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-6 h-6 border-2 border-[#1a3c5e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Loading settings...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {settings.map((s) => {
              const meta = META[s.key];
              return (
                <div key={s.key} className="px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="sm:w-64 flex-shrink-0">
                    <p className="font-semibold text-gray-800 text-[13.5px]">{meta?.label ?? s.key}</p>
                    <p className="text-gray-400 text-[12px] mt-0.5 leading-relaxed">{s.description}</p>
                    <p className="text-gray-300 text-[11px] font-mono mt-1">{s.key}</p>
                  </div>
                  <div className="flex-1">
                    {meta?.type === "select" ? (
                      <select value={s.value} onChange={e => updateValue(s.key, e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-[13.5px] text-gray-800 outline-none focus:border-[#1a3c5e] focus:ring-2 focus:ring-[#1a3c5e]/10 transition-all bg-white">
                        {meta.options?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={meta?.type ?? "text"} value={s.value}
                        onChange={e => updateValue(s.key, e.target.value)} className={inputClass} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          {saved && (
            <p className="text-green-600 text-sm font-semibold flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Settings saved successfully
            </p>
          )}
        </div>
        <button onClick={handleSave} disabled={saving || loading}
          className="px-6 py-2.5 bg-[#1a3c5e] text-white font-bold text-[13.5px] rounded-xl hover:bg-[#14304d] transition-colors shadow-sm disabled:opacity-60">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Env vars reference */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-extrabold text-[#1a3c5e] text-[15px]">Environment Variables</h2>
          <p className="text-gray-400 text-[12.5px] mt-0.5">Add these to your <code className="bg-gray-100 px-1 rounded">.env.local</code> file.</p>
        </div>
        <div className="px-6 py-4 flex flex-col gap-3">
          {[
            { key: "NEXT_PUBLIC_SUPABASE_URL",             hint: "From Supabase Project Settings > API" },
            { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",        hint: "Public anon key — safe to expose" },
            { key: "SUPABASE_SERVICE_ROLE_KEY",            hint: "Secret — server-side only, never expose to client" },
            { key: "STRIPE_SECRET_KEY",                    hint: "From Stripe Dashboard > Developers > API keys" },
            { key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",   hint: "Public key — safe to expose" },
            { key: "STRIPE_WEBHOOK_SECRET",                hint: "From Stripe Dashboard > Webhooks" },
          ].map(env => (
            <div key={env.key} className="flex items-start gap-3">
              <code className="text-[12px] font-mono text-[#1a3c5e] bg-blue-50 px-2.5 py-1 rounded-lg whitespace-nowrap">{env.key}</code>
              <p className="text-gray-400 text-[12px] mt-1">{env.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}