"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Moon, Sun } from "lucide-react";
import { MobileNavigation } from "./mobile-navigation";
import { DesktopNavigation } from "./desktop-navigation";
import { UserButton } from "@clerk/nextjs";
import { useNavigation } from "@/hooks/use-navigation";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { navLinks, isLoaded } = useNavigation();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full px-4 flex h-14 items-center">
        <MobileNavigation navLinks={navLinks} />
        <div className="mr-4 flex items-center flex-1 sm:flex-initial">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 hidden sm:block" />
            <span className="font-bold hidden md:inline-block">Company</span>
          </Link>
        </div>
        <div className="flex-1 hidden sm:flex">
          {isLoaded ? (
            <DesktopNavigation navLinks={navLinks} />
          ) : (
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-end">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 mr-2"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <UserButton />
        </div>
      </div>
    </header>
  );
}
