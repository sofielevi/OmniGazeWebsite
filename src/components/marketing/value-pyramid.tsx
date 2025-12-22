"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { pyramidLayers } from "@/config/site";

interface ValuePyramidProps {
  className?: string;
  showLabels?: boolean;
  interactive?: boolean;
}

export function ValuePyramid({ className, showLabels = true, interactive = true }: ValuePyramidProps) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      {/* Axis Labels */}
      {showLabels && (
        <>
          {/* Left axis - Business Value / Complexity */}
          <div className="absolute left-0 top-0 bottom-0 w-24 hidden lg:flex flex-col justify-between items-end pr-4 py-8 text-xs text-[var(--text-muted)]">
            <div className="text-right">
              <div className="font-semibold text-[var(--text-secondary)]">Business Value</div>
              <div>Highest</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-[var(--text-secondary)]">Complexity</div>
              <div>Highest</div>
            </div>
          </div>

          {/* Right axis - Strategic Focus (top) / Technical Focus (bottom) */}
          <div className="absolute right-0 top-0 bottom-0 w-28 hidden lg:flex flex-col justify-between items-start pl-4 py-8 text-xs text-[var(--text-muted)]">
            <div>
              <div className="font-semibold text-[var(--text-secondary)]">Strategic Focus</div>
            </div>
            <div>
              <div className="font-semibold text-[var(--text-secondary)]">Technical Focus</div>
            </div>
          </div>
        </>
      )}

      {/* Pyramid */}
      <div className={cn("flex flex-col items-center gap-1", showLabels && "lg:mx-28")}>
        {pyramidLayers.map((layer, index) => {
          const isHovered = hoveredLayer === layer.id;
          const widthPercent = 30 + (index * 17.5); // Grows from top to bottom

          return (
            <div
              key={layer.id}
              data-testid="pyramid-layer"
              data-layer={layer.id}
              className="relative w-full flex justify-center"
              style={{
                animationDelay: `${(pyramidLayers.length - 1 - index) * 0.1}s`,
              }}
            >
              {/* Layer */}
              <div
                className={cn(
                  "relative py-4 px-6 rounded-sm transition-all duration-300 cursor-pointer",
                  isHovered && "scale-105 z-10",
                  interactive && "hover:scale-105"
                )}
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: layer.color,
                  boxShadow: isHovered
                    ? `0 8px 32px ${layer.color}40, 0 0 0 2px ${layer.color}`
                    : `0 2px 8px ${layer.color}20`,
                }}
                onMouseEnter={() => interactive && setHoveredLayer(layer.id)}
                onMouseLeave={() => interactive && setHoveredLayer(null)}
              >
                <div className="text-center">
                  <div className="font-display font-semibold text-white text-sm md:text-base">
                    {layer.name}
                  </div>
                  <div className="text-white/70 text-xs mt-0.5">
                    {layer.count}
                  </div>
                </div>

                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-lg p-4 min-w-64 z-20 shadow-xl hidden md:block">
                    <div className="font-display font-semibold text-[var(--text-primary)] mb-2">
                      {layer.name}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] mb-3">
                      Unlocked in <span className="text-[var(--amber-400)]">{layer.tier}</span> tier
                    </div>
                    <ul className="space-y-1">
                      {layer.features.map((feature) => (
                        <li key={feature} className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                          <span className="text-[var(--success)]">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Ratio connector */}
              {layer.ratio && (
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xs text-[var(--text-muted)] bg-[var(--bg-deep)] px-2 z-10 cursor-help"
                  title={`Example ratio: Typically ${layer.ratio.split(':')[0]} items at this level support ${layer.ratio.split(':')[1]} item above`}
                >
                  {layer.ratio}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile hint */}
      {interactive && (
        <div className="text-center mt-6 text-xs text-[var(--text-muted)] md:hidden">
          Tap a layer to see features
        </div>
      )}
    </div>
  );
}

// Compact version for pricing/feature pages
export function PyramidMini({ highlightTier }: { highlightTier?: string }) {
  const tierOrder = ["Community", "Starter", "Professional", "Business", "Enterprise"];
  const tierIndex = highlightTier ? tierOrder.indexOf(highlightTier) : -1;

  return (
    <div className="flex flex-col items-center gap-0.5 w-24" data-testid="pyramid-mini">
      {pyramidLayers.map((layer, index) => {
        const isUnlocked = tierIndex >= 0 && tierOrder.indexOf(layer.tier) <= tierIndex;
        const widthPercent = 40 + (index * 15);

        return (
          <div
            key={layer.id}
            className="transition-all duration-200"
            style={{
              width: `${widthPercent}%`,
              height: "8px",
              backgroundColor: isUnlocked ? layer.color : `${layer.color}30`,
              borderRadius: "2px",
            }}
            title={`${layer.name} - ${isUnlocked ? "Included" : "Not included"}`}
          />
        );
      })}
    </div>
  );
}
