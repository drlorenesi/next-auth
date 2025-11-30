import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";
// import { auth } from "./lib/auth";

// Define public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/registro",
  "/recuperar-contrasena",
  "/verificar",
];

// Helper function to check if a route is public
function isPublicRoute(pathname: string): boolean {
  if (publicRoutes.includes(pathname)) {
    console.log("Route *is* public:", pathname);
    return true;
  } else {
    console.log("Route *is not* public:", pathname);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Allow public routes without authentication
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  console.log("Proxy middleware invoked for path:", pathname);

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
