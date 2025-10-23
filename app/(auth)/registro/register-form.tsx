"use client";

// Libraries
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
// App Code
import { formSchema } from "./schema";
import { serverAction } from "./server-action";
import { useAction } from "next-safe-action/hooks";
import { RegisterSuccess } from "./register-success";
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

export function RegistroForm() {
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const formAction = useAction(serverAction, {
    onError: () => {
      toast.error(
        "Ocurrió un error al crear la cuenta. Por favor, inténtalo de nuevo."
      );
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    formAction.execute(data);
  });

  const { isExecuting, hasSucceeded } = formAction;

  if (hasSucceeded) {
    return <RegisterSuccess />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regístrate</CardTitle>
        <CardDescription>
          Ingresa tus datos para crear una cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={onSubmit}>
          <FieldGroup className="gap-2">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-form-firstName">
                      Nombre
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-form-firstName"
                      type="name"
                      autoComplete="on"
                      aria-invalid={fieldState.invalid}
                      placeholder="Tu nombre"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-form-lastName">
                      Apellido
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-form-lastName"
                      type="name"
                      autoComplete="on"
                      aria-invalid={fieldState.invalid}
                      placeholder="Tu apellido"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="register-form-email"
                    type="email"
                    autoComplete="on"
                    aria-invalid={fieldState.invalid}
                    placeholder="tu_correo@granada.com.gt"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    No compartiremos tu correo con nadie más.
                  </FieldDescription>
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-password">
                    Contraseña
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-form-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    Debe tener al menos 6 caracteres.
                  </FieldDescription>
                </Field>
              )}
            />
            <Controller
              name="confirm"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-confirm">
                    Confirma tu Contraseña
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-form-confirm"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    Por favor confirma tu contraseña.
                  </FieldDescription>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="register-form" disabled={isExecuting}>
            {isExecuting && <Spinner className="mr-2" />}
            Crear cuenta
          </Button>
          <FieldDescription className="text-center">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Inicia sesión aquí
            </Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
