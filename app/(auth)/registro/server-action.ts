"use server";

import { actionClient } from "@/lib/safe-action";
import { formSchema } from "./schema";
import { auth } from "@/lib/auth";

export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    // Register the user
    await auth.api.signUpEmail({
      body: {
        name: parsedInput.firstName + " " + parsedInput.lastName,
        firstName: parsedInput.firstName,
        lastName: parsedInput.lastName,
        email: parsedInput.email,
        password: parsedInput.password,
      },
    });

    return {
      success: true,
      message: "Form submitted successfully",
    };
  });
