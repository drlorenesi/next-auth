import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { Role } from "@/types/globals";
import { hasRoutePermission } from "@/lib/navigation-permissions";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sign-out(.*)",
  "/unauthorized(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Allow public routes without authentication
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  // For authenticated users, check role-based permissions
  const path = request.nextUrl.pathname;
  const userRole = (await auth()).sessionClaims?.metadata?.role as
    | Role
    | undefined;
  console.log("Path:", path);
  console.log("User role:", userRole);

  // Check if user has permission for this route
  if (!hasRoutePermission(path, userRole)) {
    // Redirect to unauthorized page
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|manifest\\.json|robots\\.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
