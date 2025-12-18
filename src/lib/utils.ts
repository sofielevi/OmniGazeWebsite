import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price for display
 */
export function formatPrice(price: number | null | undefined, currency = "USD"): string {
  if (price === null || price === undefined) {
    return "Custom";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate annual savings percentage
 */
export function calculateSavingsPercent(monthly: number, annual: number): number {
  const yearlyIfMonthly = monthly * 12;
  const savings = yearlyIfMonthly - annual;
  return Math.round((savings / yearlyIfMonthly) * 100);
}

/**
 * Format large numbers with abbreviations
 */
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 1000).toFixed(0)}K+`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
