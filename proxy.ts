import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { isAuthorized } from "@/lib/navigation-permissions";
import type { Role } from "@/lib/navigation-permissions";

// Define public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/registro",
  "/recuperar-contrasena",
  "/api/health",
];

// Helper function to check if a route is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    // Exact match or starts with the route (for nested paths)
    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes without authentication
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // After authentication succeeds, check authorization
  // Note: You'll need to implement a way to get the user role from Better Auth
  // This is a placeholder - adjust based on your Better Auth setup
  const userRole = await getUserRoleFromSession(request);
  const authorized = await isAuthorized(request, userRole);

  if (!authorized) {
    // Redirect to the unauthorized page
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// Helper function to get user role from Better Auth session
// You'll need to implement this based on your Better Auth configuration
async function getUserRoleFromSession(request: NextRequest): Promise<Role> {
  // TODO: Implement this based on your Better Auth setup
  // This might involve:
  // 1. Decoding the session cookie
  // 2. Making a request to your Better Auth API
  // 3. Extracting the role from the session data

  // Placeholder implementation - replace with actual logic
  return "admin" as Role;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|manifest\\.json|robots\\.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    // "/(api|trpc)(.*)",
  ],
};
