import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function VerifySuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const token = params.token as string | undefined;

  let isValid = false;
  let errorMessage = "";

  // If there's a token in the URL, validate it
  if (token) {
    try {
      // Get the session to check if verification was successful
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      // Check if user exists and email is verified
      if (session?.user?.emailVerified) {
        isValid = true;
      } else {
        errorMessage =
          "No se pudo verificar tu correo electrónico. El enlace puede haber expirado o ser inválido.";
      }
    } catch (error) {
      console.error("[v0] Error validating token:", error);
      errorMessage =
        "Ocurrió un error al validar tu correo electrónico. Por favor, intenta de nuevo.";
    }
  } else {
    // If no token, just assume they came from a successful verification
    // (Better Auth already handled the redirect after verification)
    isValid = true;
  }

  if (!isValid && token) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle>Verificación fallida</CardTitle>
          <CardDescription>
            No se pudo verificar tu correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/10">
            <AlertDescription className="text-red-800 dark:text-red-200">
              {errorMessage}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full bg-transparent" asChild variant="outline">
            <Link href="/signup">Volver a registrarse</Link>
          </Button>
          <Button className="w-full" asChild variant="ghost">
            <Link href="/signin">Ir a Iniciar sesión</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle>¡Correo verificado!</CardTitle>
        <CardDescription>
          Tu correo electrónico ha sido verificado exitosamente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/10">
          <AlertDescription className="text-green-800 dark:text-green-200">
            Tu cuenta está ahora activa. Puedes iniciar sesión y comenzar a usar
            la aplicación.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/login">Continuar a Iniciar sesión</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
