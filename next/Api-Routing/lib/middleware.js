import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only intercept paths starting with /api
  if (pathname.startsWith("/api")) {
    const token = req.headers.get("authorization");

    // Console logging (replaces loggerMiddleware)
    console.log(`[${req.method}] ${pathname}`);

    // Authentication Guard
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized!" },
        { status: 401 }
      );
    }
  }

  // Allow authorized requests to pass through
  return NextResponse.next();
}

// Optimization: Run middleware ONLY on API routes
export const config = {
  matcher: "/api/:path*",
};
