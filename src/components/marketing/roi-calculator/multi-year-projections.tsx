"use client";

import { useState } from "react";
import { TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Currency, formatWithCurrency } from "./currency-selector";

interface MultiYearProjectionsProps {
  annualSavings: number;
  annualCost: number;
  currency: Currency;
  className?: string;
}

type TimeFrame = 1 | 3 | 5;

export function MultiYearProjections({
  annualSavings,
  annualCost,
  currency,
  className,
}: MultiYearProjectionsProps) {
  const [selectedYear, setSelectedYear] = useState<TimeFrame>(3);

  const projections: Record<TimeFrame, { savings: number; cost: number; net: number; roi: number }> = {
    1: {
      savings: annualSavings,
      cost: annualCost,
      net: annualSavings - annualCost,
      roi: annualCost > 0 ? ((annualSavings - annualCost) / annualCost) * 100 : 0,
    },
    3: {
      savings: annualSavings * 3,
      cost: annualCost * 3,
      net: (annualSavings - annualCost) * 3,
      roi: annualCost > 0 ? ((annualSavings - annualCost) / annualCost) * 100 : 0,
    },
    5: {
      savings: annualSavings * 5,
      cost: annualCost * 5,
      net: (annualSavings - annualCost) * 5,
      roi: annualCost > 0 ? ((annualSavings - annualCost) / annualCost) * 100 : 0,
    },
  };

  const years: TimeFrame[] = [1, 3, 5];

  return (
    <div className={cn("bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)]", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-[var(--amber-400)]" />
          <h4 className="font-display text-lg">Multi-Year Projections</h4>
        </div>
        <div className="flex gap-1 bg-[var(--bg-elevated)] rounded-lg p-1">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-mono transition-all",
                selectedYear === year
                  ? "bg-[var(--amber-400)] text-[var(--bg-deep)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              {year}Y
            </button>
          ))}
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="relative mb-6">
        <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${(selectedYear / 5) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-[var(--text-muted)]">
          <span>Year 1</span>
          <span>Year 3</span>
          <span>Year 5</span>
        </div>
      </div>

      {/* Projections Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[var(--bg-elevated)] rounded-xl p-4">
          <div className="text-xs text-[var(--text-muted)] mb-1">Total Savings</div>
          <div className="font-display text-2xl text-green-400">
            {formatWithCurrency(projections[selectedYear].savings, currency)}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">
            over {selectedYear} year{selectedYear > 1 ? "s" : ""}
          </div>
        </div>

        <div className="bg-[var(--bg-elevated)] rounded-xl p-4">
          <div className="text-xs text-[var(--text-muted)] mb-1">OmniGaze Cost</div>
          <div className="font-display text-2xl text-[var(--text-primary)]">
            {formatWithCurrency(projections[selectedYear].cost, currency)}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1">
            total investment
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30 col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-green-400 mb-1 flex items-center gap-1">
                <TrendingUp size={12} />
                Net Value
              </div>
              <div className="font-display text-3xl text-green-400">
                {formatWithCurrency(projections[selectedYear].net, currency)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[var(--text-muted)] mb-1">Annual ROI</div>
              <div className="font-display text-2xl text-[var(--amber-400)]">
                {projections[selectedYear].roi.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison note */}
      <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
        Based on current inputs. Actual savings may vary based on organization-specific factors.
      </p>
    </div>
  );
}
