"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { NavigationLinks } from "@/lib/navigation-permissions";

export function DesktopNavigation({ navLinks }: NavigationLinks) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 text-sm font-medium">
      {navLinks.map((link, index) =>
        link.submenu ? (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Link
                href={link.href ?? "#"}
                className="h-6 flex items-center transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {link.submenu.map((submenu) => (
                <DropdownMenuItem key={submenu.href} asChild>
                  <Link
                    href={submenu.href}
                    className={`transition-colors hover:text-foreground/80 ${
                      pathname === submenu.href
                        ? "text-foreground font-semibold"
                        : "text-foreground/60"
                    }`}
                  >
                    {submenu.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={link.label}
            href={link.href ?? "#"}
            className={`transition-colors hover:text-foreground/80 ${
              pathname === link.href
                ? "text-foreground font-semibold"
                : "text-foreground/60"
            }`}
          >
            {link.label}
          </Link>
        )
      )}
    </nav>
  );
}
