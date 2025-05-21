"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, X } from "lucide-react";
import { FormSchema } from "./form-schema";
import { processFormData } from "./server-actions";

const paises = [
  { value: "argentina", label: "Argentina" },
  { value: "chile", label: "Chile" },
  { value: "colombia", label: "Colombia" },
  { value: "mexico", label: "México" },
  { value: "peru", label: "Perú" },
  { value: "espana", label: "España" },
  { value: "otro", label: "Otro" },
];

const intereses = [
  { id: "deportes", label: "Deportes" },
  { id: "musica", label: "Música" },
  { id: "lectura", label: "Lectura" },
  { id: "viajes", label: "Viajes" },
  { id: "tecnologia", label: "Tecnología" },
  { id: "cocina", label: "Cocina" },
];

export default function UserForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nombre: "",
      pais: "",
      intereses: [],
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await processFormData(data);
      if (response.success) {
        console.log("Server response:", response.message);
      } else {
        console.error("Server validation error:", response.error);
      }
    } catch (error) {
      console.error("Error submitting data to the server:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="nombre">
                Nombre <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    id="nombre"
                    className="w-full"
                    placeholder="Ingresa tu nombre"
                    {...field}
                  />
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => field.onChange("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      aria-label="Borrar texto"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </FormControl>
              <FormDescription>Este es tu nombre público.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            País <span className="text-red-500">*</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Selecciona tu país de residencia.
          </p>

          <Select
            onValueChange={(value) => form.setValue("pais", value)}
            value={form.watch("pais")}
          >
            <SelectTrigger id="pais" name="pais" className="w-full">
              <SelectValue placeholder="Selecciona un país" />
            </SelectTrigger>
            <SelectContent>
              {paises.map((pais) => (
                <SelectItem key={pais.value} value={pais.value}>
                  {pais.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {form.formState.errors.pais && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.pais.message as string}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Intereses <span className="text-red-500">*</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Selecciona tus intereses o hobbies.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {intereses.map((interes) => (
              <FormField
                key={interes.id}
                control={form.control}
                name="intereses"
                render={({ field }) => {
                  const checkboxId = `checkbox-${interes.id}`;
                  return (
                    <div
                      key={interes.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <Checkbox
                        id={checkboxId}
                        name="intereses"
                        checked={field.value?.includes(interes.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, interes.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== interes.id
                                )
                              );
                        }}
                      />
                      <label
                        htmlFor={checkboxId}
                        className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {interes.label}
                      </label>
                    </div>
                  );
                }}
              />
            ))}
          </div>
          {form.formState.errors.intereses && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.intereses.message as string}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          <span className="text-red-500">*</span> Campos obligatorios
        </p>
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
  );
}
