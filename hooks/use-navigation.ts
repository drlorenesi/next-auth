"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useMemo } from "react";
import type { Role } from "@/types/globals";
import { getFilteredNavigation } from "@/lib/navigation-permissions";

export function useNavigation() {
  const { isLoaded } = useAuth();
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userRole as Role | undefined;

  // Memoize the filtered navigation to prevent unnecessary re-renders
  const filteredNavLinks = useMemo(
    () => (isLoaded ? getFilteredNavigation(userRole) : []),
    [userRole, isLoaded]
  );

  return {
    navLinks: filteredNavLinks,
    userRole,
    isLoaded,
  };
}
