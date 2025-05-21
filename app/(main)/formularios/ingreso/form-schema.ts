import { z } from "zod";

export const FormSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  pais: z.string().min(1, {
    message: "Por favor selecciona un país.",
  }),
  intereses: z.array(z.string()).min(1, {
    message: "Por favor selecciona al menos un interés.",
  }),
});

export type FormData = z.infer<typeof FormSchema>;
