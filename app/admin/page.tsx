export default function AdminDashboard() {
  const stats = [
    { label: "Universities", value: "0", icon: (
      <svg className="w-6 h-6 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    )},
    { label: "Programmes", value: "0", icon: (
      <svg className="w-6 h-6 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { label: "News Posts", value: "0", icon: (
      <svg className="w-6 h-6 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    )},
    { label: "Match Reports", value: "0", icon: (
      <svg className="w-6 h-6 text-[#1a3c5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
  ];

  const quickLinks = [
    { label: "Add a University", href: "/admin/universities?action=new", desc: "Create a new university record" },
    { label: "Add a Programme", href: "/admin/programmes?action=new", desc: "Add a study programme" },
    { label: "Write a News Post", href: "/admin/news?action=new", desc: "Publish something to the news section" },
    { label: "Edit Settings", href: "/admin/settings", desc: "Change prices, site copy, and config" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1a3c5e] tracking-tight">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back. Here is an overview of your data.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="mb-3">{stat.icon}</div>
            <p className="text-3xl font-extrabold text-[#1a3c5e]">{stat.value}</p>
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
            <a
              key={link.href}
              href={link.href}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
            >
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

      {/* Setup notice */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-blue-700 font-semibold text-[13.5px]">Supabase not connected yet</p>
          <p className="text-blue-500 text-[12.5px] mt-0.5">Add your <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code className="bg-blue-100 px-1 rounded">.env.local</code> to activate live data.</p>
        </div>
      </div>
    </div>
  );
}