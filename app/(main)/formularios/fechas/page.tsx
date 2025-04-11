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
import { useState } from "react";

// Define the schema with proper handling for both Date objects and strings
const FormSchema = z.object({
  fechaIni: z.date({
    required_error: "Por favor selecciona una fecha de inicio.",
    invalid_type_error: "Por favor proporciona una fecha válida.",
  }),
});

export default function CalendarForm() {
  // Add state to control the popover
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fechaIni: undefined,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Log the transformed data that would be sent to the server
      const ini = format(data.fechaIni, "yyyy-MM-dd");
      console.log("Data to submit:", ini);
      // validatedData.fechaIni will be a string in the format "yyyy-MM-dd"
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Log the validation errors
        console.error("Validation errors:", error.errors);
      } else {
        // Handle other errors
        console.error("Unexpected error:", error);
      }
    }
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
          <FormField
            control={form.control}
            name="fechaIni"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Fecha de Inicio <span className="text-red-500">*</span>
                </FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        onClick={() => setIsCalendarOpen(true)}
                      >
                        {field.value ? (
                          field.value instanceof Date ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            ""
                          )
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
                      selected={field.value as Date | undefined}
                      onSelect={(date) => {
                        field.onChange(date);
                        // Close the calendar after selection
                        setIsCalendarOpen(false);
                      }}
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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
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
