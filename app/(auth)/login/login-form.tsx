"use client";

// Libraries
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
// App Code
import { loginSchema } from "./schema";
import { serverAction } from "./server-action";
import { useAction } from "next-safe-action/hooks";
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

export function LoginForm() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formAction = useAction(serverAction, {
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso.");
      router.push("/");
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

  const { isExecuting } = formAction;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico a continuación para iniciar sesión en tu
          cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={onSubmit}>
          <FieldGroup className="gap-2">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-form-email"
                    type="email"
                    autoComplete="on"
                    aria-invalid={fieldState.invalid}
                    placeholder="tu_correo@granada.com.gt"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="login-form-password">
                      Contraseña
                    </FieldLabel>
                    <Link
                      href="/recuperar-contrasena"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    {...field}
                    id="login-form-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="login-form" disabled={isExecuting}>
            {isExecuting && <Spinner className="mr-2" />}
            Iniciar sesión
          </Button>
          <FieldDescription className="text-center">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="underline underline-offset-4">
              Regístrate aquí
            </Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
