"use client";

import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataSovereigntyProps {
  className?: string;
}

export function DataSovereignty({ className }: DataSovereigntyProps) {
  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      <div className="relative p-6 md:p-8 bg-gradient-to-r from-[var(--bg-elevated)]/80 to-[var(--bg-card)]/60 border border-[var(--border-warm)]/40 rounded-2xl backdrop-blur-sm overflow-hidden">
        {/* Subtle glow accent */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--amber-500)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--amber-500)]/20 to-[var(--amber-600)]/10 border border-[var(--amber-500)]/30 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-[var(--amber-400)]" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-display text-lg md:text-xl font-semibold text-[var(--text-primary)]">
              100% On-Premise. Zero Cloud Upload.
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              All discovery data stays on your infrastructure—nothing is sent to external servers.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 md:flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-deep)]/60 rounded-full text-xs font-medium border border-[var(--border-subtle)] whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Self-Hosted
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-deep)]/60 rounded-full text-xs font-medium border border-[var(--border-subtle)] whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Air-Gap Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
