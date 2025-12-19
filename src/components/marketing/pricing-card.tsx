"use client";

import { ButtonLink } from "@/components/ui/button";
import { PyramidMini } from "@/components/marketing/value-pyramid";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

interface PricingCardProps {
  tier: {
    id: string;
    name: string;
    displayName: string;
    description: string;
    monthlyPrice: number | null;
    annualPrice: number | null;
    serverLimit: number;
    userLimit: number;
    features: string[];
    disabledFeatures?: string[];
    featured?: boolean;
    cta: string;
    ctaVariant: "primary" | "secondary";
  };
  billingCycle: "monthly" | "annual";
}

export function PricingCard({ tier, billingCycle }: PricingCardProps) {
  const price = billingCycle === "annual" && tier.annualPrice !== null
    ? Math.round(tier.annualPrice / 12)
    : tier.monthlyPrice;

  const annualTotal = tier.annualPrice;
  const isUnlimited = tier.serverLimit === -1;

  return (
    <div
      data-testid="pricing-card"
      data-tier={tier.id}
      className={cn(
        "relative bg-[var(--bg-card)] border rounded-2xl p-7 transition-all duration-500",
        tier.featured
          ? "border-[var(--amber-500)] bg-gradient-to-b from-[var(--bg-elevated)] to-[var(--bg-card)] shadow-[0_0_60px_var(--amber-glow)]"
          : "border-[var(--border-subtle)] hover:border-[var(--border-warm)] hover:translate-y-[-4px] hover:shadow-xl"
      )}
    >
      {/* Featured badge */}
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--amber-400)] to-[var(--amber-500)] text-[var(--bg-deep)] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
          Most Popular
        </div>
      )}

      {/* Tier label */}
      <div className="text-xs uppercase tracking-wider text-[var(--amber-400)] mb-2">
        {tier.description}
      </div>

      {/* Name */}
      <h3 className="font-display text-2xl mb-4">{tier.displayName}</h3>

      {/* Price */}
      <div className="mb-2">
        {price === null ? (
          <span className="font-display text-4xl font-semibold">Custom</span>
        ) : price === 0 ? (
          <span className="font-display text-4xl font-semibold text-[var(--success)]">$0</span>
        ) : (
          <>
            <span className="font-display text-4xl font-semibold">${price}</span>
            <span className="text-[var(--text-muted)] text-sm">/month</span>
          </>
        )}
      </div>

      {/* Annual info */}
      <div className="text-xs text-[var(--text-muted)] mb-6 h-4">
        {price === 0 ? (
          "No credit card needed"
        ) : price === null ? (
          "Tailored to your needs"
        ) : billingCycle === "annual" && annualTotal ? (
          `$${annualTotal.toLocaleString()} billed annually`
        ) : (
          ""
        )}
      </div>

      {/* Limits */}
      <div className="flex gap-4 py-4 border-y border-[var(--border-subtle)] mb-6">
        <div className="flex-1">
          <div className="text-lg font-semibold">
            {isUnlimited ? "∞" : tier.serverLimit.toLocaleString()}
          </div>
          <div className="text-xs uppercase text-[var(--text-muted)]">Servers</div>
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold">
            {tier.userLimit === -1 ? "∞" : tier.userLimit}
          </div>
          <div className="text-xs uppercase text-[var(--text-muted)]">Users</div>
        </div>
      </div>

      {/* Pyramid indicator */}
      <div className="mb-6 flex justify-center">
        <PyramidMini highlightTier={tier.name} />
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-6 min-h-[200px]">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <Check size={16} className="text-[var(--success)] flex-shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
        {tier.disabledFeatures?.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-muted)] line-through opacity-50">
            <Minus size={16} className="flex-shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <ButtonLink
        href={tier.id === "enterprise" ? "/contact" : "/register"}
        variant={tier.ctaVariant}
        className="w-full justify-center"
      >
        {tier.cta}
      </ButtonLink>
    </div>
  );
}
