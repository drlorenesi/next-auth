"use server";

import { type FormData } from "./form-schema";

export async function handleDates(formData: FormData) {
  console.log("Received form data:", formData);

  return { success: true, data: formData };
}
