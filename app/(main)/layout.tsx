import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
// Types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reportes Granada",
  description: "Sistema de reportes gereciales",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-grow mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
