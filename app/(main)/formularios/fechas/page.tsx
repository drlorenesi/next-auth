"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define the form schema
const FormSchema = z
  .object({
    fechaIni: z.date({
      required_error: "Por favor selecciona una fecha.",
      invalid_type_error: "Por favor proporciona una fecha válida.",
    }),
    fechaFin: z.date({
      required_error: "Por favor selecciona una fecha.",
      invalid_type_error: "Por favor proporciona una fecha válida.",
    }),
  })
  .refine((data) => data.fechaIni <= data.fechaFin, {
    message: "La fecha de inicio no puede ser posterior a la fecha final.",
    path: ["fechaIni"],
  });

export default function CalendarForm() {
  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fechaIni: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
      fechaFin: new Date(), // Current day,
    },
    mode: "onSubmit", // Changed to onSubmit to validate when form is submitted
    // reValidateMode: "onChange", // Re-validate on change after submission
  });

  const { isSubmitting, isValid, isSubmitted } = form.formState;

  // Button should be disabled if:
  // 1. Form is currently submitting
  // 2. Form has been submitted at least once AND has errors
  const isButtonDisabled = isSubmitting || (isSubmitted && !isValid);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Log the transformed data that would be sent to the server
    const ini = format(data.fechaIni, "yyyy-MM-dd");
    const fin = format(data.fechaFin, "yyyy-MM-dd");
    console.log("Dates to submit:", { ini, fin });
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Fechas</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Por favor, ingresa la fecha de inicio y la fecha de fin de tu proyecto
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Fecha Inicio */}
          <FormField
            control={form.control}
            name="fechaIni"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Fecha de Inicio <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Esta es la fecha de inicio.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Fecha Fin */}
          <FormField
            control={form.control}
            name="fechaFin"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Fecha Final <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Esta es la fecha final.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isButtonDisabled}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
