import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

// Routes that require authentication
const protectedRoutes = ["/dashboard"];

// Routes that should only be accessible when NOT authenticated
const authRoutes = ["/signin", "/signup", "/verify-success"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated using Better Auth
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: request.headers,
    });
  } catch (error) {
    // Session check failed, user is not authenticated
    session = null;
  }

  const isAuthenticated = !!session;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to signin from protected routes
  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next (Next.js internal routes)
     * - api/auth (authentication API routes)
     * - manifest.json (PWA manifest)
     * - robots.txt (robots file)
     * - Static files with extensions (html, css, js, images, fonts, etc.)
     */
    "/((?!_next|api/auth|manifest\\.json|robots\\.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
