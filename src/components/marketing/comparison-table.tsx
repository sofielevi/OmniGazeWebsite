"use client";

import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    feature: "Setup time",
    traditional: "Weeks to months",
    omnigaze: "10 minutes",
  },
  {
    feature: "Agent installation",
    traditional: "Required on each server",
    omnigaze: "Zero agents needed",
  },
  {
    feature: "Data freshness",
    traditional: "Manual updates, often stale",
    omnigaze: "Auto-discovered, always current",
  },
  {
    feature: "Dependency mapping",
    traditional: "Manual documentation",
    omnigaze: "Automatic discovery",
  },
  {
    feature: "Business context",
    traditional: "Separate EA tool needed",
    omnigaze: "Built-in capability mapping",
  },
  {
    feature: "Data location",
    traditional: "Often cloud-hosted",
    omnigaze: "100% on-premise",
  },
  {
    feature: "Cost (50 servers)",
    traditional: "$5,000+/year",
    omnigaze: "Free forever",
  },
  {
    feature: "Implementation",
    traditional: "Consultants required",
    omnigaze: "Self-service",
  },
];

interface ComparisonTableProps {
  className?: string;
}

export function ComparisonTable({ className }: ComparisonTableProps) {
  return (
    <div className={cn("py-16", className)}>
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-4">
          OmniGaze vs. Traditional Tools
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-12 max-w-2xl mx-auto">
          See how OmniGaze compares to traditional CMDB and discovery solutions
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono text-sm uppercase tracking-wider">
                  Feature
                </th>
                <th className="text-center p-4 border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono text-sm uppercase tracking-wider">
                  Traditional Tools
                </th>
                <th className="text-center p-4 border-b border-[var(--border-subtle)] text-[var(--omnigaze-gold)] font-mono text-sm uppercase tracking-wider">
                  OmniGaze
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[var(--bg-card)] transition-colors"
                >
                  <td className="p-4 border-b border-[var(--border-subtle)] text-[var(--text-primary)] font-display">
                    {row.feature}
                  </td>
                  <td className="p-4 border-b border-[var(--border-subtle)] text-center text-[var(--text-secondary)]">
                    {row.traditional}
                  </td>
                  <td className="p-4 border-b border-[var(--border-subtle)] text-center">
                    <span className="inline-flex items-center gap-2 text-[var(--omnigaze-gold)] font-medium">
                      {row.omnigaze}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-[var(--text-muted)] text-sm mt-8">
          Based on typical enterprise CMDB/discovery tool implementations
        </p>
      </div>
    </div>
  );
}
