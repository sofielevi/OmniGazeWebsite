"use client";

import { cn } from "@/lib/utils";

interface BridgeVisualProps {
  className?: string;
}

const infrastructureTools = ["Faddom", "Device42", "Lansweeper", "SolarWinds"];
const eaTools = ["LeanIX", "Ardoq", "Bizzdesign", "Mega"];

export function BridgeVisual({ className }: BridgeVisualProps) {
  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        {/* Infrastructure Discovery Side */}
        <div className="p-8 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-subtle)]">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4">
            Infrastructure Discovery
          </h3>
          <div className="flex flex-wrap gap-2">
            {infrastructureTools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 bg-[var(--bg-card)] rounded-md text-xs text-[var(--text-secondary)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* OmniGaze Bridge */}
        <div className="flex flex-col items-center gap-4 order-first md:order-none">
          <div className="relative">
            {/* Connector lines */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <div className="absolute right-full mr-4 top-1/2 w-16 h-0.5 bg-gradient-to-l from-[var(--amber-400)] to-transparent" />
              <div className="absolute left-full ml-4 top-1/2 w-16 h-0.5 bg-gradient-to-r from-[var(--amber-400)] to-transparent" />
            </div>

            {/* Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-600)] rounded-2xl flex items-center justify-center font-display text-3xl font-semibold text-[var(--bg-deep)] glow-amber-lg">
              OG
            </div>
          </div>
          <span className="text-xs uppercase tracking-widest text-[var(--amber-400)]">
            The Bridge
          </span>
        </div>

        {/* Enterprise Architecture Side */}
        <div className="p-8 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-subtle)]">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4">
            Enterprise Architecture
          </h3>
          <div className="flex flex-wrap gap-2">
            {eaTools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 bg-[var(--bg-card)] rounded-md text-xs text-[var(--text-secondary)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
