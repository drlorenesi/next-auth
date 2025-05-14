"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AutoLogout() {
  // Add mounted state to prevent hydration mismatch
  const { signOut } = useClerk();
  const router = useRouter();

  // Set mounted to true after component mounts
  // Sign out after component mounts
  useEffect(() => {
    const logout = async () => {
      try {
        await signOut();
        // Redirect to sign page after logout
        router.push("/sign-in");
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    };

    logout();
  }, [signOut, router]);

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold">Cerrando sesión...</h1>
      <p>Serás redirigido en breve.</p>
    </div>
  );
}
