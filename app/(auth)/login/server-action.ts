"use server";

import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "./schema";
import { auth } from "@/lib/auth";

export const serverAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }) => {
    // Sign in the user
    await auth.api.signInEmail({
      body: {
        email: parsedInput.email || "",
        password: parsedInput.password,
      },
    });

    return {
      success: true,
      message: "Form submitted successfully",
    };
  });
