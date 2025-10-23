import type { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Reportes",
  description: "Sistema de reportes gerenciales",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Header session={session} />
      <main className="flex flex-col flex-grow mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
