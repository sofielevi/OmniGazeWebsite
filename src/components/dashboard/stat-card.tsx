"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm text-[var(--text-muted)]">{title}</span>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[var(--amber-400)]" />
          </div>
        )}
      </div>
      <div className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-1">
        {value}
      </div>
      {subtitle && (
        <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
      )}
      {trend && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-medium",
            trend.value >= 0 ? "text-[var(--success)]" : "text-red-400"
          )}
        >
          <span>{trend.value >= 0 ? "+" : ""}{trend.value}%</span>
          <span className="text-[var(--text-muted)]">{trend.label}</span>
        </div>
      )}
    </div>
  );
}

interface UsageMeterProps {
  label: string;
  current: number;
  limit: number;
  unit?: string;
  className?: string;
}

export function UsageMeter({
  label,
  current,
  limit,
  unit = "",
  className,
}: UsageMeterProps) {
  const percentage = limit > 0 ? Math.min((current / limit) * 100, 100) : 0;
  const isUnlimited = limit === -1 || limit === Infinity;
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
        <span className="text-sm font-medium text-[var(--text-primary)]">
          {current.toLocaleString()}
          {isUnlimited ? (
            <span className="text-[var(--text-muted)]"> / ∞</span>
          ) : (
            <span className="text-[var(--text-muted)]">
              {" "}/ {limit.toLocaleString()} {unit}
            </span>
          )}
        </span>
      </div>
      <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isAtLimit
              ? "bg-red-500"
              : isNearLimit
              ? "bg-yellow-500"
              : "bg-[var(--amber-400)]"
          )}
          style={{ width: isUnlimited ? "10%" : `${percentage}%` }}
        />
      </div>
      {isNearLimit && !isUnlimited && (
        <p className="text-xs text-yellow-500">
          {isAtLimit
            ? "You've reached your limit. Upgrade to add more."
            : "You're approaching your limit. Consider upgrading."}
        </p>
      )}
    </div>
  );
}

interface TierBadgeProps {
  tier: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const tierColors: Record<string, string> = {
  Community: "var(--pyramid-infrastructure)",
  Starter: "var(--pyramid-applications)",
  Professional: "var(--pyramid-capabilities)",
  Business: "var(--pyramid-value-streams)",
  Enterprise: "var(--pyramid-strategy)",
};

export function TierBadge({ tier, size = "md", className }: TierBadgeProps) {
  const color = tierColors[tier] || tierColors.Community;
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        sizes[size],
        className
      )}
      style={{
        backgroundColor: `${color}20`,
        borderColor: `${color}30`,
        color: color,
        border: "1px solid",
      }}
    >
      {tier}
    </span>
  );
}
