import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-ivory/80 p-6 shadow-sm backdrop-blur-sm sm:p-8",
        className,
      )}
      {...props}
    />
  );
}
