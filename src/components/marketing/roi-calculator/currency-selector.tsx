"use client";

import { cn } from "@/lib/utils";

export type Currency = "USD" | "EUR" | "GBP" | "DKK" | "SEK" | "NOK" | "CHF";

export const currencyConfig: Record<Currency, { symbol: string; name: string; rate: number }> = {
  USD: { symbol: "$", name: "US Dollar", rate: 1 },
  EUR: { symbol: "€", name: "Euro", rate: 0.92 },
  GBP: { symbol: "£", name: "British Pound", rate: 0.79 },
  DKK: { symbol: "kr", name: "Danish Krone", rate: 6.88 },
  SEK: { symbol: "kr", name: "Swedish Krona", rate: 10.42 },
  NOK: { symbol: "kr", name: "Norwegian Krone", rate: 10.65 },
  CHF: { symbol: "Fr", name: "Swiss Franc", rate: 0.88 },
};

interface CurrencySelectorProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  className?: string;
}

export function CurrencySelector({ value, onChange, className }: CurrencySelectorProps) {
  const currencies = Object.keys(currencyConfig) as Currency[];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {currencies.map((currency) => (
        <button
          key={currency}
          onClick={() => onChange(currency)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200",
            value === currency
              ? "bg-[var(--amber-400)] text-[var(--bg-deep)]"
              : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)]"
          )}
        >
          {currencyConfig[currency].symbol} {currency}
        </button>
      ))}
    </div>
  );
}

export function formatWithCurrency(amount: number, currency: Currency): string {
  const { symbol, rate } = currencyConfig[currency];
  const converted = amount * rate;

  if (converted >= 1000000) {
    return `${symbol}${(converted / 1000000).toFixed(1)}M`;
  }
  if (converted >= 1000) {
    return `${symbol}${(converted / 1000).toFixed(0)}K`;
  }
  return `${symbol}${Math.round(converted).toLocaleString()}`;
}

export function formatFullCurrency(amount: number, currency: Currency): string {
  const { symbol, rate } = currencyConfig[currency];
  const converted = amount * rate;
  return `${symbol}${Math.round(converted).toLocaleString()}`;
}
