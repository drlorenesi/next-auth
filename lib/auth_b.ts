import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { pool } from "./database";

export const auth = betterAuth({
  database: pool,
  user: {
    additionalFields: {
      firstName: { type: "string", length: 255, nullable: false },
      lastName: { type: "string", length: 255, nullable: false },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  autoSignIn: false,
  plugins: [admin(), nextCookies()], // make sure this is the last plugin in the array
});

export type Session = typeof auth.$Infer.Session;
