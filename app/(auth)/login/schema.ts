import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Por favor ingresa un email válido" }).optional(),
  password: z
    .string()
    .min(1, {
      message: "Debes ingresar tu contraseña.",
    })
    .trim(),
});
