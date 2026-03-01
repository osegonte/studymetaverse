import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect old /admin/login to the unified /signin page
  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get("smv_admin_session");

    if (!session?.value) {
      const loginUrl = new URL("/signin", req.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin/login"],
};