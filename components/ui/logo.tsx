"use client";

import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.ComponentProps<"img">) => {
  return (
    <img
      src="/images/khurshid fans logo.png"
      alt="logo"
      className={cn("h-12", className)}
      {...props}
    />
  );
};
