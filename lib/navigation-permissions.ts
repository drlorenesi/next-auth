import type { Role } from "@/types/globals";

// Define the structure for navigation items with embedded permissions
export interface SubmenuItem {
  href: string;
  label: string;
  roles: Role[]; // Which roles can access this item
}

export interface NavigationLink {
  href?: string;
  label: string;
  roles: Role[]; // Which roles can access this item
  submenu?: SubmenuItem[];
}

export interface NavigationLinks {
  navLinks: NavigationLink[];
}

// Define all navigation links with embedded permissions
export const navLinks: NavigationLink[] = [
  {
    label: "Ventas",
    roles: ["admin", "ventas"],
    submenu: [
      { href: "/ventas/canal", label: "Por Canal", roles: ["admin", "ventas"] },
      {
        href: "/ventas/producto",
        label: "Por Producto",
        roles: ["admin", "ventas"],
      },
      {
        href: "/ventas/categoria",
        label: "Por Categoría",
        roles: ["admin", "ventas"],
      },
      {
        href: "/ventas/unidades",
        label: "Por Unidades",
        roles: ["admin", "ventas"],
      },
    ],
  },
  {
    label: "Plantillas",
    roles: ["admin", "compras", "ventas", "user"],
    submenu: [
      {
        href: "/plantillas/blocks",
        label: "Blocks",
        roles: ["admin", "compras", "ventas", "user"],
      },
      {
        href: "/plantillas/components",
        label: "Components",
        roles: ["admin", "compras", "ventas", "user"],
      },
      {
        href: "/plantillas/docs",
        label: "Documentation",
        roles: ["admin", "compras", "ventas", "user"],
      },
      {
        href: "/plantillas/general",
        label: "General",
        roles: ["admin", "compras", "ventas", "user"],
      },
    ],
  },
  {
    label: "Formularios",
    roles: ["admin", "compras"],
    submenu: [
      {
        href: "/formularios/ingreso",
        label: "Ingreso",
        roles: ["admin", "compras"],
      },
      {
        href: "/formularios/data-fetching",
        label: "Data Fetching",
        roles: ["admin", "compras"],
      },
    ],
  },
  {
    label: "Admin",
    roles: ["admin"],
    submenu: [{ href: "/admin/usuarios", label: "Usuarios", roles: ["admin"] }],
  },
];

// Generate route permissions map from navigation structure
// Example:
// { /admin, ['admin'],
// /admin/usuarios, ['admin'],
// /formularios, ['admin', 'compras'], ...}
export const routePermissions: Record<string, Role[]> = {};

// Add permissions from navigation structure
navLinks.forEach((link) => {
  // Add parent route if it exists
  if (link.href) {
    routePermissions[link.href] = link.roles;
  }

  // Add section route (e.g., /ventas for the Ventas section)
  if (link.submenu && link.submenu.length > 0) {
    const sectionPath = link.submenu[0].href.split("/").slice(0, 2).join("/");
    routePermissions[sectionPath] = link.roles;

    // Add all submenu routes
    link.submenu.forEach((item) => {
      routePermissions[item.href] = item.roles;
    });
  }
});

// Utility function to filter navigation links based on user role
export function getFilteredNavigation(role?: Role | null): NavigationLink[] {
  if (!role) return [];

  return (
    navLinks
      .filter((link) => link.roles.includes(role))
      .map((link) => {
        // If the link has a submenu, filter the submenu items too
        if (link.submenu) {
          return {
            ...link,
            submenu: link.submenu.filter((item) => item.roles.includes(role)),
          };
        }
        return link;
      })
      // Remove any nav items that had submenu but all submenu items were filtered out
      .filter((link) => !link.submenu || link.submenu.length > 0)
  );
}

// Helper function to check if a user has permission for a specific route
// export function hasRoutePermission(route: string, role?: Role | null): boolean {
//   if (!role) return false;

//   // Explicitly allow certain routes
//   const alwaysAllowedRoutes = ["/"];
//   if (alwaysAllowedRoutes.includes(route)) {
//     return true;
//   }

//   // Find matching route in permissions map (exact match or nested route)
//   const matchingRoute = Object.keys(routePermissions).find(
//     (r) => route === r || (route.startsWith(r + "/") && r !== "/")
//   );

//   if (!matchingRoute) return true; // If route isn't in the permissions map, allow access

//   const requiredRoles = routePermissions[matchingRoute];
//   return requiredRoles.length === 0 || requiredRoles.includes(role);
// }

export function hasRoutePermission(route: string, role?: Role | null): boolean {
  console.log("- Checking route permission...");
  console.log("- Route:", route);
  console.log("- Role:", role);
  // Explicitly allow certain routes
  const alwaysAllowedRoutes = ["/"];
  if (alwaysAllowedRoutes.includes(route)) return true;

  // Find matching route in permissions map (exact match or nested route)
  const matchingRoute = Object.keys(routePermissions).find(
    (r) => route === r || (route.startsWith(r + "/") && r !== "/")
  );
  console.log("- Matching route:", matchingRoute);

  return true; // Default to true for all routes
}
