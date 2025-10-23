"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlignJustify, ChevronDown, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Logo } from "@/components/logo";
import type { NavigationLinks } from "@/lib/navigation-permissions";

export function MobileNavigation({ navLinks }: NavigationLinks) {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 sm:hidden bg-transparent"
        >
          <AlignJustify />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        aria-label="Navigation menu"
        aria-describedby="navigation-description"
        className="bg-sidebar"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center"
            >
              <Logo className="h-6 w-6" />
            </Link>
            <span>Menu</span>
          </SheetTitle>
          <SheetDescription>
            Quick links to navigate through our site.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-2 overflow-y-auto max-h-[calc(100vh-8rem)] mt-2">
          {navLinks.map((link, index) =>
            link.submenu ? (
              <Collapsible
                key={index}
                open={openSubmenu[link.label] ?? false}
                onOpenChange={(isOpen) =>
                  setOpenSubmenu((prev) => ({
                    ...prev,
                    [link.label]: isOpen,
                  }))
                }
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`h-9 w-full justify-between px-3 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      link.submenu.some((submenu) => pathname === submenu.href)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : ""
                    }`}
                  >
                    <span className="text-left">{link.label}</span>
                    {openSubmenu[link.label] ?? false ? (
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 ml-3 border-l border-sidebar-border pl-3 pr-6 space-y-1">
                  {link.submenu.map((submenu) => (
                    <Button
                      key={submenu.href}
                      variant="ghost"
                      className={`h-7 w-full justify-start px-2 text-sm font-normal hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                        pathname === submenu.href
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                      asChild
                    >
                      <Link
                        href={submenu.href}
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        {submenu.label}
                      </Link>
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Button
                key={link.href}
                variant="ghost"
                className={`h-9 w-full justify-start px-3 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                  pathname === link.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : ""
                }`}
                asChild
              >
                <Link href={link.href ?? "#"} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </Button>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
