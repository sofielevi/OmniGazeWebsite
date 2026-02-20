"use client";

import { XCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const painPoints = [
  {
    pain: "Spreadsheet-based asset inventories",
    solution: "Auto-discovered, always current inventory",
  },
  {
    pain: "Manual dependency mapping that's outdated instantly",
    solution: "Live dependency visualization",
  },
  {
    pain: "Separate tools that don't talk to each other",
    solution: "Unified platform from infra to strategy",
  },
  {
    pain: "Months of consultant time to implement EA tools",
    solution: "10-minute setup, immediate insights",
  },
  {
    pain: "Monitoring tools with no business context",
    solution: "Connect infrastructure to business value",
  },
];

interface PainPointsProps {
  className?: string;
}

export function PainPoints({ className }: PainPointsProps) {
  return (
    <div className={cn("py-16", className)}>
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-4">
          Say <span className="text-[var(--omnigaze-gold)]">Goodbye</span> to...
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-12 max-w-2xl mx-auto">
          Stop struggling with disconnected tools and manual processes
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pain Column */}
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4 flex items-center gap-2">
              <XCircle size={16} className="text-red-400" />
              The Old Way
            </div>
            {painPoints.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg opacity-70"
              >
                <XCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <span className="text-[var(--text-secondary)] line-through decoration-red-400/50">
                  {item.pain}
                </span>
              </div>
            ))}
          </div>

          {/* Solution Column */}
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              The OmniGaze Way
            </div>
            {painPoints.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-[var(--bg-elevated)] border border-[var(--border-warm)] rounded-lg"
              >
                <CheckCircle size={20} className="text-green-400 shrink-0 mt-0.5" />
                <span className="text-[var(--text-primary)]">{item.solution}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
