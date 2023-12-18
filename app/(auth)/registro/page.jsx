"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

// Form Inputs
import InputField from "@/app/_components/formInputs/InputField";

export default function Registro() {
  const router = useRouter();
  // 1. Default values
  const defaultValues = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPass: "",
  };

  // 2. Validation schema
  const validationSchema = yup.object({
    nombre: yup
      .string()
      .min(2, "Su nombre debe contener almenos 2 caracteres.")
      .required("Campo obligatorio."),
    apellido: yup
      .string()
      .min(2, "Su apellido debe contener almenos 2 caracteres.")
      .required("Campo obligatorio."),
    email: yup
      .string()
      .matches(
        /^.+?(?:granada.com.gt|chocolatesgranada.com|gmail.com)$/,
        "Por favor usa tu correo de @granada.com.gt o @chocolatesgranada.com"
      )
      .required("Campo obligatorio."),
    password: yup
      .string()
      .min(6, "Contraseña no puede ser menor a 6 caracteres.")
      .required("Campo obligatorio."),
    confirmPass: yup
      .string()
      .required("Por favor confirma tu contraseña.")
      .oneOf([yup.ref("password"), null], "Las contraseñas no concuerdan."),
  });

  // 3. useForm Hook
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  // 4. onSubmit function
  const onSubmit = async (data) => {
    const supabase = createClientComponentClient();

    // Revisar si el usuario ya está registrado??
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          displayName: `${data.nombre} ${data.apellido}`,
        },
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      console.log(error);
      toast.error("No fue posible registrar al usuario...");
    }
    if (!error) {
      router.push("/gracias");
    }
  };

  return (
    <>
      <form
        className="form-signin w-100 m-auto my-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="h3 mb-3 fw-normal text-center">Regístrate</h1>
        {/* Nombre */}
        <div className="form-floating mb-2">
          <InputField
            control={control}
            name="nombre"
            type="text"
            placeholder=""
          />
          <label>Nombre</label>
        </div>
        {/* Apellido */}
        <div className="form-floating mb-2">
          <InputField
            control={control}
            name="apellido"
            type="text"
            placeholder=""
          />
          <label>Apellido</label>
        </div>
        {/* Email */}
        <div className="form-floating mb-2">
          <InputField
            control={control}
            name="email"
            type="email"
            placeholder=""
            message="Tu correo @granada.com.gt o @chocolatesgranada.com"
          />
          <label>Correo electrónico</label>
        </div>
        {/* Pass */}
        <div className="form-floating mb-2">
          <InputField
            control={control}
            name="password"
            type="password"
            placeholder=""
          />
          <label>Contraseña</label>
        </div>
        {/* Confrim Pass */}
        <div className="form-floating mb-2">
          <InputField
            control={control}
            name="confirmPass"
            type="password"
            placeholder=""
          />
          <label>Confirma tu contraseña</label>
        </div>
        {/* Submit */}
        <button className="btn btn-primary w-100 py-2" type="submit">
          Crear cuenta
        </button>
      </form>
      {/* Link para registro */}
      <p className="text-center">
        ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí.</Link>
      </p>
    </>
  );
}
