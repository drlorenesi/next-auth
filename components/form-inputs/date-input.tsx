"use client";

import { Input } from "../ui/input";

type DateInputProps = React.ComponentProps<typeof Input>;

export function DateInput({ className, ...props }: DateInputProps) {
  return (
    <div className="relative">
      <Input type="date" className={`w-full ${className || ""}`} {...props} />
    </div>
  );
}
