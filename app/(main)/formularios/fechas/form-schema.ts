import { z } from "zod";

// Fecha mínima permitida: 2016-01-01
export const FECHA_MINIMA = "2016-01-01";

export const DateFormSchema = z
  .object({
    fechaInicio: z
      .string()
      .min(1, {
        message: "La fecha de inicio es obligatoria.",
      })
      .refine((fecha) => new Date(fecha) >= new Date(FECHA_MINIMA), {
        message: `La fecha de inicio no puede ser anterior al 1 de enero de 2016.`,
      }),
    fechaFin: z
      .string()
      .min(1, {
        message: "La fecha de finalización es obligatoria.",
      })
      .refine((fecha) => new Date(fecha) >= new Date(FECHA_MINIMA), {
        message: `La fecha de finalización no puede ser anterior al 1 de enero de 2016.`,
      }),
  })
  .refine(
    (data) => {
      const inicio = new Date(data.fechaInicio);
      const fin = new Date(data.fechaFin);
      return inicio <= fin;
    },
    {
      message: "Fecha Inicio no puede ser mayor a Fecha Fin.",
      path: ["fechaInicio"],
    }
  );

export type DateFormData = z.infer<typeof DateFormSchema>;
