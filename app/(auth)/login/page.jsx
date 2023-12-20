// "use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

// Form Inputs
import InputField from "@/app/_components/formInputs/InputField";

export default function Login() {
  let test = "tell";

  const router = useRouter();
  // 1. Default values
  const defaultValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^.+?(?:granada.com.gt|chocolatesgranada.com|gmail.com)$/,
        "Por favor usa tu correo de @granada.com.gt o @chocolatesgranada.com"
      )
      .required("Campo obligatorio."),
    password: yup.string().required("Campo obligatorio."),
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
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Sesión iniciada!");
      router.push("/");
    }
  };

  return (
    <>
      <form
        className="form-signin w-100 m-auto my-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="h3 mb-3 fw-normal text-center">Iniciar Sesión</h1>
        {/* Email */}
        <div className="form-floating mb-2">
          <InputField
            control={control}
            name="email"
            type="email"
            placeholder=""
            id="floatingEmail"
            autoComplete="email"
          />
          <label htmlFor="floatingEmail">Correo electrónico</label>
        </div>
        {/* Contraseña */}
        <div className="form-floating">
          <InputField
            control={control}
            name="password"
            type="password"
            placeholder=""
            id="floatingPass"
          />
          <label htmlFor="floatingPass">Contraseña</label>
        </div>
        {/* Recordarme */}
        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Recordarme
          </label>
        </div>
        {/* Iniciar sesión */}
        <button className="btn btn-primary w-100 py-2" type="submit">
          Iniciar sesión
        </button>
      </form>
      {/* Link para registro */}
      <p className="text-center">
        ¿No tienes cuenta? <Link href="/registro">Registrate aquí.</Link>
      </p>
      {/* Link para solicitar reinicio de contraseña */}
      <br />
      <p className="text-center">
        <Link href="/solicitar">¿Olvidaste tu contraseña?</Link>
      </p>
    </>
  );
}
