import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RecuperarSuccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">¡Listo ✅!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          Hemos enviado un correo con instrucciones para recuperar tu
          contraseña.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/login">Regresar a inicio de sesión</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
