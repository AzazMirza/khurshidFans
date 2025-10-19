"use client";

import { LoaderPinwheel } from "lucide-react";

type SpinnerProps = {
  size?: number; // control size of spinner
  className?: string; // allow custom styling
  
};

export default function Spinner({ size = 32, className = "" }: SpinnerProps) {
  return (
    <LoaderPinwheel
      className={`animate-spin text-primary ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
