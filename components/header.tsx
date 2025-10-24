"use client";

import Link from "next/link";
import type { Session } from "@/lib/auth";
import type { Role } from "@/lib/navigation-permissions";
import { useMemo } from "react";
import { Logo } from "@/components/logo";
import { MobileNavigation } from "./mobile-navigation";
import { DesktopNavigation } from "./desktop-navigation";
import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "./user-button";
import { getFilteredNavigation } from "@/lib/navigation-permissions";

export function Header({ session }: { session: Session | null }) {
  // Get user role from DB or authentication metadata
  // const userRole: Role | undefined = "admin"; // Example role, replace with actual logic
  const userRole = session?.user?.role as Role | null;
  // Memoize the filtered navigation to prevent unnecessary re-renders
  const filteredNavLinks = useMemo(
    () => getFilteredNavigation(userRole),
    [userRole]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto w-full px-4 flex h-14 items-center">
        <MobileNavigation navLinks={filteredNavLinks} />
        <div className="mr-4 flex items-center flex-1 sm:flex-initial">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 hidden sm:block" />
            <span className="font-bold hidden md:inline-block">Company</span>
          </Link>
        </div>
        <div className="flex-1 hidden sm:flex">
          <DesktopNavigation navLinks={filteredNavLinks} />
        </div>
        <div className="flex items-center justify-end">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
