import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Hardcoded admin emails — change here or move to env var later
const ADMIN_EMAILS = ["studymetaverses@gmail.com", "segohopo@gmail.com"];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user || !data.session) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isAdmin = ADMIN_EMAILS.includes(data.user.email ?? "");

    const response = NextResponse.json({
      ok: true,
      isAdmin,
      // Tell client where to go
      redirect: isAdmin ? "/admin" : "/programmes",
    });

    if (isAdmin) {
      // Set httpOnly admin session cookie — middleware reads this
      response.cookies.set("smv_admin_session", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hour, matches Supabase default
      });
    }

    return response;
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}