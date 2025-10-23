import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackButton } from "@/components/back-button";

export default async function NotFound() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Header session={session} />
      <main className="flex flex-col flex-grow mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -z-10 -right-20 -top-20 h-[200px] w-[200px] rounded-full bg-secondary/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto space-y-8">
              {/* Error code with visual effect */}
              <div className="relative">
                <div className="text-[120px] font-extrabold text-primary/10 select-none">
                  404
                </div>
              </div>
              {/* Content */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Página no encontrada
                </h1>
                <p className="text-muted-foreground">
                  No pudimos encontrar la página que estás buscando. Es posible
                  que haya sido movida, eliminada o nunca haya existido.
                </p>
              </div>
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <BackButton />
                <Button asChild size="lg" className="gap-2 font-medium">
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Ir al Inicio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
