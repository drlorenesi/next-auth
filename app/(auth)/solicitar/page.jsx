"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Form Inputs
import InputField from "@/app/_components/formInputs/InputField";

export default function Solicitar() {
  // 1. Default values
  const defaultValues = {
    email: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^.+?(?:granada.com.gt|chocolatesgranada.com|gmail.com)$/,
        "Por favor usa tu correo de @granada.com.gt o @chocolatesgranada.com"
      )
      .required("Campo obligatorio."),
  });

  // 2. useForm Hook
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // 3. onSubmit function
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <form
        className="form-signin w-100 m-auto my-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="h3 mb-3 fw-normal text-center">
          ¿Olvidaste tu contraseña?
        </h1>
        <p className="text-center text-muted">
          Por favor ingresa el correo electrónico que usaste para crear tu
          cuenta.
        </p>
        {/* Email */}
        <div className="form-floating mb-2">
          <InputField
            control={control}
            name="email"
            type="email"
            placeholder=""
          />
          <label>Correo electrónico</label>
        </div>
        {/* Iniciar sesión */}
        <button className="btn btn-primary w-100 py-2" type="submit">
          Iniciar sesión
        </button>
      </form>
      {/* Link para inicio de sesión*/}
      <p className="text-center">
        ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí.</Link>
      </p>
    </>
  );
}
