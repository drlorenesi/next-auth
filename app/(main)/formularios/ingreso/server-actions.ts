import { FormSchema, FormData } from "./form-schema";

export async function processFormData(data: FormData) {
  try {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validate the data using the shared schema
    const validatedData = FormSchema.parse(data);

    // Simulate server-side processing (e.g., saving to a database)
    console.log("Validated data on the server:", validatedData);

    // Return a success response
    return { success: true, message: "Data processed successfully." };
  } catch (error) {
    // Handle validation errors
    console.error("Validation error on the server:", error);
    return { success: false, message: "Validation failed.", error };
  }
}
