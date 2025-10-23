import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio de sesión",
  description: "Ingresa tus datos para iniciar sesión",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-1 w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
