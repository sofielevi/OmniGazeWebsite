"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lock, Unlock } from "lucide-react";
import type { LayerSavings, TierName } from "@/lib/roi/types";
import { formatCurrency } from "@/lib/roi/calculations";

interface SavingsPyramidProps {
  layers: LayerSavings[];
  recommendedTier: TierName;
  className?: string;
  showDetails?: boolean;
  onLayerClick?: (layer: LayerSavings) => void;
}

export function SavingsPyramid({
  layers,
  recommendedTier,
  className,
  showDetails = true,
  onLayerClick,
}: SavingsPyramidProps) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  // Reverse so Strategy is at top, Infrastructure at bottom
  const reversedLayers = [...layers].reverse();

  return (
    <div className={cn("relative w-full max-w-lg mx-auto", className)}>
      {/* Pyramid */}
      <div className="flex flex-col items-center gap-1.5">
        {reversedLayers.map((layer, index) => {
          const isHovered = hoveredLayer === layer.layerId;
          const widthPercent = 35 + index * 15; // Grows from top to bottom

          return (
            <div
              key={layer.layerId}
              className="relative w-full flex justify-center"
              style={{
                animationDelay: `${(reversedLayers.length - 1 - index) * 0.1}s`,
              }}
            >
              {/* Layer */}
              <div
                className={cn(
                  "relative py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer",
                  isHovered && "scale-105 z-10",
                  !layer.isUnlocked && "opacity-60"
                )}
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: layer.color,
                  boxShadow: isHovered
                    ? `0 8px 32px ${layer.color}40, 0 0 0 2px ${layer.color}`
                    : layer.isUnlocked
                    ? `0 2px 8px ${layer.color}30`
                    : "none",
                }}
                onMouseEnter={() => setHoveredLayer(layer.layerId)}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => onLayerClick?.(layer)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {layer.isUnlocked ? (
                      <Unlock className="w-3 h-3 text-white/70" />
                    ) : (
                      <Lock className="w-3 h-3 text-white/50" />
                    )}
                    <span className="font-display font-medium text-white text-sm">
                      {layer.layerName}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "font-mono text-sm font-semibold",
                      layer.isUnlocked ? "text-white" : "text-white/50"
                    )}
                  >
                    {formatCurrency(layer.totalAnnual)}
                  </span>
                </div>

                {/* Tooltip on hover */}
                {isHovered && showDetails && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-lg p-4 min-w-72 z-20 shadow-xl hidden md:block">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-display font-semibold text-[var(--text-primary)]">
                        {layer.layerName}
                      </div>
                      <div
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          layer.isUnlocked
                            ? "bg-[var(--success)]/20 text-[var(--success)]"
                            : "bg-[var(--text-muted)]/20 text-[var(--text-muted)]"
                        )}
                      >
                        {layer.isUnlocked ? "Included" : layer.tier}
                      </div>
                    </div>

                    <div className="font-mono text-2xl text-[var(--amber-400)] mb-3">
                      {formatCurrency(layer.totalAnnual)}
                      <span className="text-sm text-[var(--text-muted)]">/year</span>
                    </div>

                    <div className="space-y-2">
                      {layer.savings.map((saving, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-[var(--text-secondary)]">
                            {saving.type}
                          </span>
                          <span className="font-mono text-[var(--text-primary)]">
                            {formatCurrency(saving.amount)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {!layer.isUnlocked && (
                      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                        Upgrade to {layer.tier} to unlock
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-1.5">
          <Unlock className="w-3 h-3 text-[var(--success)]" />
          <span>Included in {recommendedTier}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3" />
          <span>Available with upgrade</span>
        </div>
      </div>
    </div>
  );
}

// Compact horizontal bar version for mobile
export function SavingsPyramidCompact({
  layers,
  className,
}: {
  layers: LayerSavings[];
  className?: string;
}) {
  const totalSavings = layers.reduce((sum, l) => sum + l.totalAnnual, 0);

  return (
    <div className={cn("space-y-2", className)}>
      {layers.map((layer) => {
        const percentage = totalSavings > 0 ? (layer.totalAnnual / totalSavings) * 100 : 0;

        return (
          <div key={layer.layerId} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span
                className={cn(
                  layer.isUnlocked ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                )}
              >
                {layer.layerName}
              </span>
              <span className="font-mono text-[var(--text-secondary)]">
                {formatCurrency(layer.totalAnnual)}
              </span>
            </div>
            <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: layer.isUnlocked ? layer.color : `${layer.color}40`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
