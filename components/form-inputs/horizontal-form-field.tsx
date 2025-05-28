"use client";

import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface HorizontalFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  required?: boolean;
  labelWidth?: string;
  inputWidth?: string;
  spacing?: string; // Controla el espaciado vertical entre campos (ej: "mt-3", "mt-4", "" para sin espaciado)
}

export function HorizontalFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  required = false,
  labelWidth = "w-[150px]",
  inputWidth = "w-[150px]",
  spacing = "mt-3", // Espaciado por defecto entre campos
}: HorizontalFormFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState }) => (
        <div className={`col-span-2 ${spacing}`}>
          <div className="flex flex-row items-start">
            <div className={`${labelWidth} flex-shrink-0`}>
              <FormLabel htmlFor={name} className="text-left">
                {label} {required && <span className="text-red-500">*</span>}
              </FormLabel>
            </div>
            <div className="flex flex-col">
              <FormControl>
                <Input
                  id={name}
                  type="date"
                  className={inputWidth}
                  {...field}
                />
              </FormControl>
              {formState.errors[name] && <FormMessage className="mt-1" />}
            </div>
          </div>
        </div>
      )}
    />
  );
}
