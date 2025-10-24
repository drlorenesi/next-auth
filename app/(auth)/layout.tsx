import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Inicio de sesión",
  description: "Ingresa tus datos para iniciar sesión",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-1 w-full items-center justify-center p-6 md:p-10">
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
