"use server";

import { actionClient } from "@/lib/safe-action";
import { recuperarSchema } from "./schema";

export const serverAction = actionClient
  .inputSchema(recuperarSchema)
  .action(async ({ parsedInput }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Send password recovery email logic here
    console.log(parsedInput);
    return {
      success: true,
      message: "Form submitted successfully",
    };
  });
