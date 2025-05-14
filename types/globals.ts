// Sessions > Customize session token
// Claims
// {
// 	"metadata": "{{user.public_metadata}}"
// }

// Users > Metadata
// role: "admin"

export {};

export type Role = "admin" | "compras" | "ventas" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Role;
    };
  }
}
