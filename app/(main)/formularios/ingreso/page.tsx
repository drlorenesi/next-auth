"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

// Array of countries
const countries = [
  { value: "argentina", label: "Argentina" },
  { value: "chile", label: "Chile" },
  { value: "colombia", label: "Colombia" },
  { value: "mexico", label: "México" },
  { value: "peru", label: "Perú" },
  { value: "espana", label: "España" },
  { value: "otro", label: "Otro" },
];

// Array of interests
const interests = [
  { id: "deportes", label: "Deportes" },
  { id: "musica", label: "Música" },
  { id: "lectura", label: "Lectura" },
  { id: "viajes", label: "Viajes" },
  { id: "tecnologia", label: "Tecnología" },
  { id: "cocina", label: "Cocina" },
];

// Create a date for the first day of the current month
const firstDayOfMonth = new Date();
firstDayOfMonth.setDate(1);

// Define the form schema
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  country: z.string().min(1, {
    message: "Por favor selecciona un país.",
  }),
  interests: z.array(z.string()).min(1, {
    message: "Por favor selecciona al menos un interés.",
  }),
});

export default function TextInputForm() {
  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      country: "",
      interests: [],
    },
  });

  const { isSubmitting } = form.formState;

  // Define the submit handler
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Log the transformed data that would be sent to the server
    console.log("Data to submit:", data);
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Información Personal</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Por favor, ingresa tu información abajo
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
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

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  País <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Selecciona tu país de residencia.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>
                    Intereses <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormDescription>
                    Selecciona tus intereses o hobbies.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest) => (
                    <FormField
                      key={interest.id}
                      control={form.control}
                      name="interests"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={interest.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(interest.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        interest.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== interest.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {interest.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />

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
    </div>
  );
}
