import { cn } from "@/lib/utils";
import { Tier, getTierDisplayName } from "@/lib/docs-access";

interface TierBadgeProps {
  tier: Tier;
  size?: "sm" | "md";
  className?: string;
}

const tierColors: Record<Tier, { bg: string; text: string }> = {
  community: {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
  },
  starter: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },
  professional: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
  },
  business: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
  enterprise: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
};

export function TierBadge({ tier, size = "sm", className }: TierBadgeProps) {
  const colors = tierColors[tier];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        colors.bg,
        colors.text,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
    >
      {getTierDisplayName(tier)}
    </span>
  );
}
