// Define user roles
export type Role = "admin" | "compras" | "ventas" | "user" | null;

// Define the structure for navigation items with embedded permissions
interface SubmenuItem {
  href: string;
  label: string;
  roles: Role[]; // Which roles can access this item
}

interface NavigationLink {
  href?: string;
  label: string;
  roles: Role[]; // Which roles can access this item
  submenu?: SubmenuItem[];
}

// Define all navigation links with embedded permissions
const navLinks: NavigationLink[] = [
  {
    label: "Ventas",
    roles: ["admin", "ventas"],
    submenu: [
      { href: "/ventas/canal", label: "Por Canal", roles: ["admin", "ventas"] },
      {
        href: "/ventas/categoria",
        label: "Por Categoría",
        roles: ["admin", "ventas"],
      },
      {
        href: "/ventas/producto",
        label: "Por Producto",
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
        href: "/formularios/fechas",
        label: "Fechas",
        roles: ["admin", "compras"],
      },
      {
        href: "/formularios/fechas-2",
        label: "Fechas 2",
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
  {
    label: "/DEV",
    roles: ["admin"],
    submenu: [
      {
        href: "/dev/terminal-export",
        label: "Terminal Export",
        roles: ["admin"],
      },
    ],
  },
];

// Generate route permissions map from navigation structure
// Example:
// { /admin, ['admin'],
// /admin/usuarios, ['admin'],
// /formularios, ['admin', 'compras'], ...}
const routePermissions: Record<string, Role[]> = {};

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

// Authorization function to check if a user has access to a route
// based on their role
export async function isAuthorized(request: Request, role: Role) {
  const { pathname } = new URL(request.url);

  const matchingRoute = Object.keys(routePermissions).find(
    (r) => pathname === r || (pathname.startsWith(r + "/") && r !== "/")
  );

  // If route isn't in the permissions map, allow access
  if (!matchingRoute) return true;

  // If route is in the permissions map, check if the user has the required role
  const requiredRoles = routePermissions[matchingRoute];
  const hasPermission =
    requiredRoles.length === 0 || requiredRoles.includes(role);

  return hasPermission;
}
