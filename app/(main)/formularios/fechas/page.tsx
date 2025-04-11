// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { format } from "date-fns";
// import { es } from "date-fns/locale";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CalendarIcon, Loader2, X } from "lucide-react";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// // Define the form schema using zod
// const formSchema = z.object({
//   startDate: z
//     .date({
//       required_error: "Por favor selecciona una fecha de inicio.",
//     })
//     .transform((date) => format(date, "yyyy-MM-dd")),
//   interests: z.array(z.string()).min(1, {
//     message: "Por favor selecciona al menos un interés.",
//   }),
// });

// // Create a date for the first day of the current month
// const firstDayOfMonth = new Date();
// firstDayOfMonth.setDate(1);

// // Infer the type from the schema
// // type FormValues = z.infer<typeof formSchema>

// // Create a separate schema for the form state (with Date object)
// const formStateSchema = z.object({
//   startDate: z.date(),
// });

// type FormState = z.infer<typeof formStateSchema>;

// export default function TextInputForm() {
//   // Initialize the form with react-hook-form
//   const form = useForm<FormState>({
//     resolver: zodResolver(formStateSchema),
//     defaultValues: {
//       startDate: firstDayOfMonth,
//     },
//   });
//   const { isSubmitting } = form.formState;

//   const [calendarOpen, setCalendarOpen] = useState(false);

//   // Define the submit handler
//   async function onSubmit(data: FormState) {
//     try {
//       // Transform the data using our schema
//       const validatedData = formSchema.parse(data);

//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Log the transformed data that would be sent to the server
//       console.log("Data to submit:", validatedData);
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         // Log the validation errors
//         console.error("Validation errors:", error.errors);
//       } else {
//         // Handle other errors
//         console.error("Unexpected error:", error);
//       }
//     }
//   }

//   return (
//     <div className="max-w-md w-full mx-auto p-6 space-y-6">
//       <div className="space-y-2 text-center">
//         <h1 className="text-2xl font-bold">Información Personal</h1>
//         <p className="text-gray-500 dark:text-gray-400">
//           Por favor, ingresa tu información abajo
//         </p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="startDate"
//             render={({ field }) => (
//               <FormItem className="flex flex-col">
//                 <FormLabel>
//                   Fecha de Inicio <span className="text-red-500">*</span>
//                 </FormLabel>
//                 <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant={"outline"}
//                         className={cn(
//                           "w-full pl-3 text-left font-normal",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         {field.value ? (
//                           format(field.value, "dd/MM/yyyy")
//                         ) : (
//                           <span>Selecciona una fecha</span>
//                         )}
//                         <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                       mode="single"
//                       selected={field.value}
//                       onSelect={(date) => {
//                         field.onChange(date);
//                         setCalendarOpen(false);
//                       }}
//                       disabled={(date) => date < new Date("1900-01-01")}
//                       initialFocus
//                       locale={es}
//                     />
//                   </PopoverContent>
//                 </Popover>
//                 <FormDescription>
//                   Fecha de inicio del proyecto o actividad.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
//             <span className="text-red-500">*</span> Campos obligatorios
//           </p>
//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Enviando...
//               </>
//             ) : (
//               "Enviar"
//             )}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }

export default function Fechas() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight border-b pb-2 first:mt-0">
        Fechas
      </h2>
      {/* <h2 className="text-3xl font-semibold tracking-tight scroll-m-20 mb-6 border-b pb-2 first:mt-0">
          Next.js Forms
        </h2> */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis soluta
          voluptate magnam tempore dolorum explicabo esse aut. Nostrum culpa
          reiciendis ipsum repudiandae asperiores beatae obcaecati! Illo
          inventore delectus hic consectetur?
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
          tenetur est eligendi, et ab voluptate unde dolorum perspiciatis.
          Doloribus dolor autem similique delectus alias! Accusantium, sit! Unde
          id laboriosam iure!
        </p>
      </div>
    </div>
  );
}
