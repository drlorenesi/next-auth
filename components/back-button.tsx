"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="lg"
      className="gap-2 font-medium bg-transparent"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      Volver
    </Button>
  );
}
