import * as z from "zod";

export const recuperarSchema = z.object({
  email: z.email({ error: "Por favor ingresa un email válido" }).optional(),
});
