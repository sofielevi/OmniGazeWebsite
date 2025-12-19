import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "danger";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig: Record<
  CalloutType,
  { icon: React.ElementType; borderColor: string; bgColor: string; iconColor: string }
> = {
  info: {
    icon: Info,
    borderColor: "border-l-blue-400",
    bgColor: "bg-blue-400/5",
    iconColor: "text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-yellow-400",
    bgColor: "bg-yellow-400/5",
    iconColor: "text-yellow-400",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-l-green-400",
    bgColor: "bg-green-400/5",
    iconColor: "text-green-400",
  },
  danger: {
    icon: AlertCircle,
    borderColor: "border-l-red-400",
    bgColor: "bg-red-400/5",
    iconColor: "text-red-400",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--border-subtle)] border-l-4 p-4 my-4",
        config.borderColor,
        config.bgColor,
        className
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconColor)} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-medium text-[var(--text-primary)] mb-1">
              {title}
            </h4>
          )}
          <div className="text-sm text-[var(--text-secondary)]">{children}</div>
        </div>
      </div>
    </div>
  );
}
