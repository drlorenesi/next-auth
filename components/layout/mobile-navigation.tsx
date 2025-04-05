"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
import type { NavigationLinks } from "@/lib/navigation-permissions";

export function MobileNavigation({ navLinks }: NavigationLinks) {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 sm:hidden">
          <AlignJustify />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        aria-label="Navigation menu"
        aria-describedby="navigation-description"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Quick links to navigate through our site.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col space-y-1 mt-4">
          {navLinks.map((link, index) =>
            link.submenu ? (
              <Collapsible
                key={index}
                open={openSubmenu[link.label]}
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
                    className="transition-colors hover:text-foreground/80 w-full justify-between text-foreground/60"
                    onClick={() =>
                      setOpenSubmenu((prev) => ({
                        ...prev,
                        [link.label]: !prev[link.label],
                      }))
                    }
                  >
                    {link.label}
                    {openSubmenu[link.label] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-2">
                  {link.submenu.map((submenu) => (
                    <Button
                      key={submenu.href}
                      variant="ghost"
                      className={`transition-colors hover:text-foreground/80 w-full justify-between ${
                        pathname === submenu.href
                          ? "bg-accent text-foreground font-semibold"
                          : "text-foreground/60"
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
                className={`transition-colors hover:text-foreground/80 w-full justify-between ${
                  pathname === link.href
                    ? "bg-accent text-foreground font-semibold"
                    : "text-foreground/60"
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
