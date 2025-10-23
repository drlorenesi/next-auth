"use client";

// Libraries
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
// App Code
import { recuperarSchema } from "./schema";
import { serverAction } from "./server-action";
import { useAction } from "next-safe-action/hooks";
import { RecuperarSuccess } from "./recuperar-success";
// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export function RecuperarContrasenaForm() {
  const { control, handleSubmit, reset } = useForm<
    z.infer<typeof recuperarSchema>
  >({
    resolver: zodResolver(recuperarSchema),
    defaultValues: {
      email: "",
    },
  });

  const formAction = useAction(serverAction, {
    onSuccess: () => {
      // TODO: show success message
      reset();
    },
    onError: () => {
      toast.error(
        "El correo o la contraseña son incorrectos. Por favor, inténtalo de nuevo."
      );
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    formAction.execute(data);
  });

  const { isExecuting, hasSucceeded } = formAction;

  if (hasSucceeded) {
    return <RecuperarSuccess />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recuperar contraseña</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="recuperar-form" onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="recuperar-form-email">
                    Correo electrónico
                  </FieldLabel>
                  <Input
                    {...field}
                    id="recuperar-form-email"
                    type="email"
                    autoComplete="on"
                    aria-invalid={fieldState.invalid}
                    placeholder="correo@ejemplo.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    Ingresa el correo asociado a tu cuenta
                  </FieldDescription>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="recuperar-form" disabled={isExecuting}>
            {isExecuting && <Spinner className="mr-2" />}
            Enviar enlace de recuperación
          </Button>
          <FieldDescription className="text-center">
            ¿Recordaste tu contraseña?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Volver a iniciar sesión
            </Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
