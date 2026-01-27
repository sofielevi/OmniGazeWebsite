"use client";

import { useEffect, useState, useRef } from "react";
import { Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Currency, formatFullCurrency } from "./currency-selector";

interface LiveCostCounterProps {
  annualCost: number;
  currency: Currency;
  isActive: boolean;
  className?: string;
}

export function LiveCostCounter({ annualCost, currency, isActive, className }: LiveCostCounterProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [displayCost, setDisplayCost] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cost per second = annual cost / (365 * 24 * 60 * 60)
  const costPerSecond = annualCost / (365 * 24 * 60 * 60);

  useEffect(() => {
    if (isActive && annualCost > 0) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, annualCost]);

  useEffect(() => {
    setDisplayCost(costPerSecond * elapsedSeconds);
  }, [elapsedSeconds, costPerSecond]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isActive) return null;

  return (
    <div className={cn(
      "bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-4 border border-red-500/30",
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-red-400">
          <Clock size={14} className="animate-pulse" />
          <span>Live Cost Counter</span>
        </div>
        <div className="font-mono text-sm text-[var(--text-muted)]">
          {formatTime(elapsedSeconds)}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <div className="text-xs text-[var(--text-muted)] mb-1">Costs accumulating...</div>
          <div className="font-display text-2xl text-red-400 tabular-nums">
            {formatFullCurrency(displayCost, currency)}
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <TrendingUp className="w-8 h-8 text-red-400/50 animate-pulse" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="bg-[var(--bg-deep)]/50 rounded-lg p-2">
          <div className="text-xs text-[var(--text-muted)]">Per Second</div>
          <div className="font-mono text-sm text-red-300">
            {formatFullCurrency(costPerSecond, currency)}
          </div>
        </div>
        <div className="bg-[var(--bg-deep)]/50 rounded-lg p-2">
          <div className="text-xs text-[var(--text-muted)]">Per Hour</div>
          <div className="font-mono text-sm text-red-300">
            {formatFullCurrency(costPerSecond * 3600, currency)}
          </div>
        </div>
        <div className="bg-[var(--bg-deep)]/50 rounded-lg p-2">
          <div className="text-xs text-[var(--text-muted)]">Per Day</div>
          <div className="font-mono text-sm text-red-300">
            {formatFullCurrency(costPerSecond * 86400, currency)}
          </div>
        </div>
      </div>
    </div>
  );
}
