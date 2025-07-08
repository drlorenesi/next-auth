"use server";

import { type FormData } from "./form-schema";
import salesData from "./ventas.json";

export async function fetchSalesData(formData: FormData) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For testing: Simulate random failures (50% of the time)
    // if (Math.random() > 0.5) {
    //   throw new Error("Error de conexión con el servidor");
    // }

    // Add input validation
    if (!formData || typeof formData !== "object") {
      throw new Error("Invalid form data");
    }

    // Return the sales data
    console.log("Received form data:", formData);
    return { success: true, data: salesData };
  } catch (error) {
    // Return error information
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
