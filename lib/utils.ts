import { config } from "@/components/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cNEXT_PUBLIC_APItalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GroupBy<T, K extends keyof T> = Record<string, T[]>;

export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): GroupBy<T, K> {
  return array.reduce((acc, item) => {
    const keyValue = String(item[key]);
    if (!acc[keyValue]) {
      acc[keyValue] = [];
    }
    acc[keyValue].push(item);
    return acc;
  }, {} as GroupBy<T, K>);
}

export function absoluteUrl(path: string) {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:3000${path}`
    : `https://${config.appUrl}${path}`;
}


// app/lib/utils.ts (Alternative if amount is already in major currency units like dollars)

// Formats a number (representing major currency units like dollars) into a currency string
// e.g., 2002 -> "$2,002.00"
export function formatCurrency(amount: number): string {
  // Amount is already in major units (e.g., dollars)
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD', // Change 'USD' to your application's default currency or make it dynamic
    minimumFractionDigits: 2,
  });
}

// Formats a date string (ISO format) to a local date string representation
// e.g., "2025-11-01T07:54:27.537Z" -> "Nov 1, 2025"
export function formatDateToLocal(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}