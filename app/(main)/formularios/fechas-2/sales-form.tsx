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
// Extras
import { Input } from "@/components/ui/input";
import "./date-input.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormItem,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
    <Card>
      <CardHeader>
        <CardTitle>Consultar Ventas</CardTitle>
        <CardDescription>
          Selecciona el rango de fechas para consultar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fechaInicio"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <div className="flex flex-row items-center justify-between gap-4">
                    <FormLabel htmlFor="fecha-inicio" className="w-32">
                      Fecha Inicio:
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="fecha-inicio"
                          type="date"
                          className="w-48 date-input"
                          {...field}
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                  </div>
                  {fieldState.error && (
                    <FormMessage className="ml-32">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechaFin"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <div className="flex flex-row items-center justify-between gap-4">
                    <FormLabel htmlFor="fecha-fin" className="w-32">
                      Fecha Fin:
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="fecha-fin"
                          type="date"
                          className="w-48 date-input"
                          {...field}
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                  </div>
                  {fieldState.error && (
                    <FormMessage className="ml-32">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Consultando...
                </>
              ) : (
                "Consultar Ventas"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
