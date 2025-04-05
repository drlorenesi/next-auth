// Customize session token in Clerk
// Claims
// {
// 	"metadata": "{{user.public_metadata}}"
// }
export {};

export type Role = "admin" | "compras" | "ventas" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      userRole?: Role;
    };
  }
}
