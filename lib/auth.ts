import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
// import { pool } from "./database";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  user: {
    additionalFields: {
      firstName: { type: "string", length: 255, nullable: false },
      lastName: { type: "string", length: 255, nullable: false },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    expiresIn: 3600 * 24, // 1 day
    sendVerificationEmail: async ({ user, url }) => {
      // This will be called by Better Auth when a user signs up
      // We'll import and use our email sending function here
      const { sendVerificationEmail } = await import("@/lib/email");
      await sendVerificationEmail(user.email, user.name, url + `verificar`);
    },
  },
  plugins: [admin(), nextCookies()], // make sure this is the last plugin in the array
});

export type Session = typeof auth.$Infer.Session;
