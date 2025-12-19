"use client";

import { Shield, Server, CloudOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataSovereigntyProps {
  className?: string;
}

export function DataSovereignty({ className }: DataSovereigntyProps) {
  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      <div className="relative p-6 md:p-8 bg-gradient-to-r from-[var(--bg-elevated)]/80 to-[var(--bg-card)]/60 border border-[var(--border-warm)]/40 rounded-2xl backdrop-blur-sm">
        {/* Subtle glow accent */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--amber-500)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
            {/* Icon & Headline */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--amber-500)]/20 to-[var(--amber-600)]/10 border border-[var(--amber-500)]/30 flex items-center justify-center">
                <Shield className="w-7 h-7 text-[var(--amber-400)]" />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
                  Your Data Stays Put.
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Discovery data never leaves your environment
                </p>
              </div>
            </div>

            {/* Visual Diagram */}
            <div className="flex items-center justify-center lg:justify-start gap-3 py-2 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-deep)]/60 rounded-lg border border-[var(--border-subtle)]">
                <Server className="w-4 h-4 text-[var(--amber-400)]" />
                <span className="text-sm font-medium">Your Data</span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-px bg-gradient-to-r from-[var(--amber-500)] to-[var(--amber-400)]" />
                <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-[var(--amber-400)] -ml-1" />
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--amber-500)]/10 rounded-lg border border-[var(--amber-500)]/30">
                <Lock className="w-4 h-4 text-[var(--amber-400)]" />
                <span className="text-sm font-medium text-[var(--amber-300)]">Stays Here</span>
              </div>

              <div className="hidden md:flex items-center gap-2 ml-4 px-3 py-2 bg-[var(--bg-deep)]/40 rounded-lg border border-[var(--border-subtle)]/50 opacity-50">
                <CloudOff className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="text-xs text-[var(--text-muted)] line-through">Uploads</span>
              </div>
            </div>
          </div>

          {/* Trust Badges - Always on own row */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
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
