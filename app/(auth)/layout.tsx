import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio de sesión",
  description: "Usa tu cuenta para iniciar sesión",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen">{children}</div>
  );
}
