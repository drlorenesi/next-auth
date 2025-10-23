import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RegisterSuccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          ¡Gracias por Registrarte 👍!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          Se ha enviado un correo con instrucciones para verificar tu cuenta. En
          cuanto la hayas verificado podrás iniciar sesión.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/login">Ir a Iniciar Sesión</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
