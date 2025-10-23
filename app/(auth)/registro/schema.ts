import * as z from "zod";

export const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Tu nombre debe contener al menos 2 caracteres." })
      .max(32, { message: "Tu nombre no puede ser mayor a 32 caracteres." })
      .trim(),
    lastName: z
      .string()
      .min(2, { message: "Tu apellido debe contener al menos 2 caracteres." })
      .max(32, { message: "Tu apellido no puede ser mayor a 32 caracteres." })
      .trim(),
    email: z.email({ error: "Por favor ingresa un email válido." }),
    password: z
      .string()
      .min(6, { message: "Tu contraseña debe contener al menos 6 caracteres." })
      .max(12, {
        message: "Tu contraseña no puede ser mayor a 12 caracteres.",
      })
      .trim(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Las contraseñas no concuerdan",
    path: ["confirm"],
  });
