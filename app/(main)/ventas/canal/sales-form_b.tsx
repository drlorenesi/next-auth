"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { DateFormSchema } from "./form-schema";
import { handleDates } from "./server-actions";
// import { toast } from "sonner";
import { getPrimerDiaMes, getFechaHoy } from "@/lib/date-utils";
import { HorizontalFormField } from "@/components/form-inputs/horizontal-form-field";

export default function DateForm() {
  const form = useForm<z.infer<typeof DateFormSchema>>({
    resolver: zodResolver(DateFormSchema),
    defaultValues: {
      fechaInicio: getPrimerDiaMes(),
      fechaFin: getFechaHoy(),
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof DateFormSchema>) {
    const response = await handleDates(data);
    console.log("Response from server action:", response);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <HorizontalFormField
          control={form.control}
          name="fechaInicio"
          label="Fecha Inicio"
          required
          spacing="" // Sin espaciado para el primer campo
        />
        <HorizontalFormField
          control={form.control}
          name="fechaFin"
          label="Fecha Fin"
          required
          spacing="mt-3" // Espaciado normal para separar del campo anterior
        />
        <Button type="submit" className="mt-4" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Fechas"
          )}
        </Button>
      </form>
    </Form>
  );
}
