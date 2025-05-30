"use server";

import { type DateFormData } from "./form-schema";

export async function handleDates(formData: DateFormData) {
  console.log("Received form data:", formData);

  return { success: true, data: formData };
}
