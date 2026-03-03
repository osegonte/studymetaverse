"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
  category: string | null;
}

const FALLBACK = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=500&fit=crop";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("news_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setPost(data as Post);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#1a3c5e] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-[#1a3c5e] mb-2">Post not found</h2>
            <a href="/blog" className="text-[#1a3c5e] font-semibold hover:underline">← Back to Blog</a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const paragraphs = post.body.split("\n\n").filter(p => p.trim());

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">

        {/* Cover image */}
        <div className="h-64 sm:h-80 overflow-hidden">
          <img
            src={post.cover_image_url ?? FALLBACK}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

          {/* Back link */}
          <a href="/blog" className="inline-flex items-center gap-1.5 text-[#1a3c5e] text-[13.5px] font-semibold hover:underline mb-6 block">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </a>

          {/* Article */}
          <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-10">

            {/* Meta */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              {post.category && (
                <span className="text-[11px] font-bold text-[#1a3c5e] uppercase tracking-widest bg-[#1a3c5e]/8 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
              )}
              <span className="text-gray-400 text-[13px]">
                {formatDate(post.published_at ?? post.created_at)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a3c5e] tracking-tight leading-snug mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-[15px] text-gray-500 leading-relaxed border-l-4 border-[#1a3c5e]/20 pl-4 mb-8 italic">
                {post.excerpt}
              </p>
            )}

            <hr className="border-gray-100 mb-8" />

            {/* Body */}
            <div className="flex flex-col gap-5">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-gray-600 text-[15px] leading-[1.8]">
                  {para}
                </p>
              ))}
            </div>
          </article>

          {/* Back to blog CTA */}
          <div className="mt-8 text-center">
            <a href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1a3c5e] text-[#1a3c5e] font-bold text-[13.5px] rounded-xl hover:bg-[#1a3c5e] hover:text-white transition-all">
              ← More Articles
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}