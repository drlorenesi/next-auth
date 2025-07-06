"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DateInput } from "@/components/form-inputs/date-input";
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
import { FormSchema } from "./form-schema";
import { fetchSalesData } from "./actions";
import { toast } from "sonner";
import { getPrimerDiaMes, getFechaHoy } from "@/lib/date-utils";

export type SalesData = {
  Canal: string;
  "Ventas sIVA": number;
  "NC Descuento sIVA": number;
  "NC Devolucion sIVA": number;
}[];

export default function VentasProducto() {
  const [data, setData] = useState<SalesData | undefined>(undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fechaInicio: getPrimerDiaMes(),
      fechaFin: getFechaHoy(),
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetchSalesData(data);
    if (response.success) {
      // console.log("Sales data fetched successfully:", response.data);
      setData(response.data);
    } else {
      toast.error(response.error);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight border-b pb-2 first:mt-0">
        Ventas por Producto
      </h2>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Consulta información de ventas por rango de fechas
        </p>
      </div>
      {/* Form and Chart - Side by side on large screens, stacked on small screens */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <Card className="w-[358px] lg:mx-auto">
            <CardHeader>
              <CardTitle>Consultar Ventas</CardTitle>
              <CardDescription>
                Selecciona el rango de fechas para consultar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="fechaInicio"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-2 w-full">
                        <div className="flex flex-row items-start gap-4 w-full">
                          <FormLabel
                            htmlFor="fecha-inicio"
                            className="w-32 pt-2"
                          >
                            Fecha Inicio:
                          </FormLabel>
                          <div className="flex flex-col flex-1 max-w-[192px]">
                            <FormControl>
                              <div className="relative">
                                <DateInput
                                  id="fecha-inicio"
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
                                <DateInput
                                  id="fecha-fin"
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
        </div>

        <div className="w-full lg:flex-1 min-w-0">
          {data ? <p>Chart will be rendered here</p> : null}
        </div>
      </div>
      {data ? <p>Detail will be rendered here</p> : null}
    </div>
  );
}
