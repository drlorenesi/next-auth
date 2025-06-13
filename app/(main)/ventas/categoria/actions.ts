"use server";

import { type FormData } from "./form-schema";

export async function handleDates(formData: FormData) {
  try {
    // For testing: Simulate random failures (50% of the time)
    if (Math.random() > 0.5) {
      throw new Error("Random failure occurred");
    }

    // Add input validation
    if (!formData || typeof formData !== "object") {
      throw new Error("Invalid form data");
    }

    console.log("Received form data:", formData);
    return { success: true, data: formData };
  } catch (error) {
    console.error("Error in handleDates:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
