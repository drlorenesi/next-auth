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
    <Card className="w-[358px] lg:mx-auto">
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
                <FormItem className="space-y-2 w-full">
                  <div className="flex flex-row items-start gap-4 w-full">
                    <FormLabel htmlFor="fecha-inicio" className="w-32 pt-2">
                      Fecha Inicio:
                    </FormLabel>
                    <div className="flex flex-col flex-1 max-w-[192px]">
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="fecha-inicio"
                            type="date"
                            className="w-full date-input"
                            {...field}
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-right pr-2">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechaFin"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2 w-full">
                  <div className="flex flex-row items-start gap-4 w-full">
                    <FormLabel htmlFor="fecha-fin" className="w-32 pt-2">
                      Fecha Fin:
                    </FormLabel>
                    <div className="flex flex-col flex-1 max-w-[192px]">
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="fecha-fin"
                            type="date"
                            className="w-full date-input"
                            {...field}
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-right pr-2">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </div>
                  </div>
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
