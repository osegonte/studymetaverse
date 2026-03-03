"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
  category: string | null;
}

const FALLBACK = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=450&fit=crop";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    supabase
      .from("news_posts")
      .select("id, title, slug, excerpt, cover_image, published_at, created_at, category")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data as Post[]);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean) as string[]))];

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">

        {/* Hero */}
        <div className="bg-[#0f2942] py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <p className="text-white/50 text-[12px] font-bold uppercase tracking-widest mb-2">Blog</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Insights for Nigerian Students
            </h1>
            <p className="text-white/60 text-[15px] mt-3 max-w-xl">
              Guides, tips, and stories to help you navigate university applications in Germany.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

          {/* Category tabs */}
          {categories.length > 1 && (
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap border transition-all ${
                    activeCategory === cat
                      ? "bg-[#1a3c5e] border-[#1a3c5e] text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:border-[#1a3c5e] hover:text-[#1a3c5e]"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-44 bg-gray-100" />
                  <div className="p-5 flex flex-col gap-3">
                    <div className="h-3 bg-gray-100 rounded w-1/4" />
                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-[15px]">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <a href={`/blog/${featured.slug}`}
                  className="group block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-2/5 h-52 sm:h-auto overflow-hidden flex-shrink-0">
                      <img src={featured.cover_image ?? FALLBACK} alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col justify-center">
                      {featured.category && (
                        <span className="text-[11px] font-bold text-[#1a3c5e] uppercase tracking-widest mb-2">{featured.category}</span>
                      )}
                      <h2 className="text-xl font-extrabold text-[#1a3c5e] tracking-tight leading-snug mb-3 group-hover:text-[#1e4d7b]">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="text-gray-500 text-[14px] leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                      )}
                      <p className="text-gray-400 text-[12.5px]">{formatDate(featured.published_at ?? featured.created_at)}</p>
                    </div>
                  </div>
                </a>
              )}

              {/* Remaining grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map(post => (
                    <a key={post.id} href={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                      <div className="h-44 overflow-hidden flex-shrink-0">
                        <img src={post.cover_image ?? FALLBACK} alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        {post.category && (
                          <span className="text-[11px] font-bold text-[#1a3c5e] uppercase tracking-widest mb-2">{post.category}</span>
                        )}
                        <h3 className="font-extrabold text-[#1a3c5e] text-[15px] leading-snug mb-2 group-hover:text-[#1e4d7b] line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                        )}
                        <p className="mt-auto text-gray-400 text-[12px]">{formatDate(post.published_at ?? post.created_at)}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}