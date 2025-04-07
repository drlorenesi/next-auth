import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/navigation-permissions";
import { Role } from "./types/globals";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sign-out(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Allow public routes without authentication
  if (!isPublicRoute(request)) {
    await auth.protect();

    // After authentication succeeds, check authorization
    const userRole =
      ((await auth()).sessionClaims?.metadata?.role as Role) || "user";
    const authorized = await isAuthorized(request, userRole);

    if (!authorized) {
      // Get the base URL to construct the redirect URL
      const url = new URL(request.url);
      const baseUrl = `${url.protocol}//${url.host}`;

      // Redirect to the unauthorized page
      return NextResponse.redirect(new URL("/unauthorized", baseUrl));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|manifest\\.json|robots\\.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    // "/(api|trpc)(.*)",
  ],
};
