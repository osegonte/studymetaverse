"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Stats {
  universities: number;
  programmes: number;
  news: number;
  match_reports: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ universities: 0, programmes: 0, news: 0, match_reports: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [uniRes, progRes, newsRes, reportRes] = await Promise.all([
        supabase.from("universities").select("*", { count: "exact", head: true }),
        supabase.from("programs").select("*", { count: "exact", head: true }),
        supabase.from("news_posts").select("*", { count: "exact", head: true }),
        supabase.from("match_reports").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        universities:  uniRes.count  ?? 0,
        programmes:    progRes.count  ?? 0,
        news:          newsRes.count  ?? 0,
        match_reports: reportRes.count ?? 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Universities", value: stats.universities,
      icon: <svg className="w-6 h-6 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
    },
    {
      label: "Programmes", value: stats.programmes,
      icon: <svg className="w-6 h-6 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    },
    {
      label: "News Posts", value: stats.news,
      icon: <svg className="w-6 h-6 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
    },
    {
      label: "Match Reports", value: stats.match_reports,
      icon: <svg className="w-6 h-6 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    },
  ];

  const quickLinks = [
    { label: "Add a University",   href: "/admin/universities", desc: "Create a new university record" },
    { label: "Add a Programme",    href: "/admin/programmes",   desc: "Add a study programme" },
    { label: "Write a News Post",  href: "/admin/news",         desc: "Publish something to the news section" },
    { label: "Edit Settings",      href: "/admin/settings",     desc: "Change prices, site copy, and config" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back. Here is an overview of your data.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="mb-3">{stat.icon}</div>
            <p className="text-3xl font-extrabold text-[#1a3c5e]">
              {loading ? <span className="inline-block w-8 h-7 bg-gray-100 rounded animate-pulse" /> : stat.value}
            </p>
            <p className="text-gray-400 text-[13px] font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-extrabold text-[#1a3c5e] text-[15px]">Quick Actions</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group">
              <div>
                <p className="font-semibold text-[#1a3c5e] text-[14px] group-hover:text-[#1e4d7b]">{link.label}</p>
                <p className="text-gray-400 text-[12.5px] mt-0.5">{link.desc}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-[#1a3c5e] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}