"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Clock,
  Award,
  Lock,
  ChevronDown,
  ChevronUp,
  Mail,
  Download,
  Share2,
  Linkedin,
  CheckCircle,
} from "lucide-react";
import type { ROIResult, LayerSavings } from "@/lib/roi/types";
import { formatCurrency, formatNumber } from "@/lib/roi/calculations";
import { SavingsPyramid, SavingsPyramidCompact } from "./savings-pyramid";

interface ResultsPanelProps {
  result: ROIResult;
  className?: string;
}

export function ResultsPanel({ result, className }: ResultsPanelProps) {
  const [isEmailUnlocked, setIsEmailUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - in production, this would save to your email list
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsEmailUnlocked(true);
  };

  const handleShare = () => {
    const text = `I just calculated my potential IT savings with OmniGaze: ${formatCurrency(result.totalUnlockedSavings)}/year with ${Math.round(result.roiPercent)}% ROI! Check out your savings:`;
    const url = "https://omnigaze.com/tools/roi-calculator";

    if (navigator.share) {
      navigator.share({ title: "OmniGaze ROI Calculator", text, url });
    } else {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Hero metrics */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6">
        <div className="text-center mb-6">
          <p className="text-sm text-[var(--text-muted)] mb-1">
            Total Annual Savings
          </p>
          <div className="font-display text-4xl md:text-5xl font-semibold text-[var(--omnigaze-gold)] mb-2">
            {formatCurrency(result.totalUnlockedSavings)}
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            with {result.recommendedTier} tier
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-[var(--bg-elevated)] rounded-lg">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-[var(--success)]" />
            <div className="font-mono text-xl text-[var(--text-primary)]">
              {Math.round(result.roiPercent)}%
            </div>
            <div className="text-xs text-[var(--text-muted)]">ROI</div>
          </div>
          <div className="text-center p-3 bg-[var(--bg-elevated)] rounded-lg">
            <Clock className="w-5 h-5 mx-auto mb-1 text-[var(--omnigaze-gold)]" />
            <div className="font-mono text-xl text-[var(--text-primary)]">
              {result.paybackMonths < 1
                ? "<1"
                : result.paybackMonths.toFixed(1)}
            </div>
            <div className="text-xs text-[var(--text-muted)]">Mo. Payback</div>
          </div>
          <div className="text-center p-3 bg-[var(--bg-elevated)] rounded-lg">
            <Award className="w-5 h-5 mx-auto mb-1 text-[var(--pyramid-strategy)]" />
            <div className="font-mono text-xl text-[var(--text-primary)]">
              {formatCurrency(result.netSavings)}
            </div>
            <div className="text-xs text-[var(--text-muted)]">Net Savings</div>
          </div>
        </div>
      </div>

      {/* Pyramid visualization */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6">
        <h3 className="font-display text-lg text-center mb-4">
          Savings by Pyramid Layer
        </h3>

        {/* Desktop pyramid */}
        <div className="hidden md:block">
          <SavingsPyramid
            layers={result.layers}
            recommendedTier={result.recommendedTier}
            onLayerClick={(layer) =>
              setExpandedLayer(expandedLayer === layer.layerId ? null : layer.layerId)
            }
          />
        </div>

        {/* Mobile compact view */}
        <div className="md:hidden">
          <SavingsPyramidCompact layers={result.layers} />
        </div>
      </div>

      {/* Recommended tier CTA */}
      <div className="bg-gradient-to-br from-[var(--omnigaze-gold)]/10 to-[var(--omnigaze-gold-dark)]/5 border border-[var(--omnigaze-gold)]/30 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[var(--omnigaze-gold)]/20 rounded-full">
            <Award className="w-6 h-6 text-[var(--omnigaze-gold)]" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg text-[var(--text-primary)] mb-1">
              Recommended: {result.recommendedTier}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Based on your {formatNumber(result.inputs.servers)} servers, the{" "}
              {result.recommendedTier} tier offers the best value with{" "}
              {formatCurrency(result.totalUnlockedSavings)}/year in savings.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/register" variant="primary" size="md">
                Start Free Trial
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary" size="md">
                Compare All Plans
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Email gate for detailed breakdown */}
      {!isEmailUnlocked ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[var(--bg-elevated)] rounded-full">
              <Lock className="w-5 h-5 text-[var(--omnigaze-gold)]" />
            </div>
            <div>
              <h3 className="font-display text-lg text-[var(--text-primary)]">
                Get Your Full Report
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Detailed breakdown with methodology & sources
              </p>
            </div>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                />
              </div>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "..." : "Send Report"}
              </Button>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              We&apos;ll email you a detailed PDF report with full methodology,
              assumptions, and personalized recommendations.
            </p>
          </form>
        </div>
      ) : (
        /* Detailed breakdown (unlocked) */
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--success)]/20 rounded-full">
              <CheckCircle className="w-5 h-5 text-[var(--success)]" />
            </div>
            <div>
              <h3 className="font-display text-lg text-[var(--text-primary)]">
                Full Report Unlocked
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Check your email for the PDF report
              </p>
            </div>
          </div>

          {/* Detailed breakdown by layer */}
          <div className="space-y-4">
            {result.layers.map((layer) => (
              <LayerBreakdown
                key={layer.layerId}
                layer={layer}
                isExpanded={expandedLayer === layer.layerId}
                onToggle={() =>
                  setExpandedLayer(
                    expandedLayer === layer.layerId ? null : layer.layerId
                  )
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Share buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Linkedin className="w-4 h-4" />
          Share on LinkedIn
        </Button>
      </div>
    </div>
  );
}

// Layer breakdown component
function LayerBreakdown({
  layer,
  isExpanded,
  onToggle,
}: {
  layer: LayerSavings;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden transition-colors",
        layer.isUnlocked
          ? "border-[var(--border-subtle)]"
          : "border-[var(--border-subtle)]/50"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-elevated)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: layer.color }}
          />
          <span
            className={cn(
              "font-medium",
              layer.isUnlocked
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-muted)]"
            )}
          >
            {layer.layerName}
          </span>
          {!layer.isUnlocked && (
            <span className="text-xs px-2 py-0.5 bg-[var(--bg-elevated)] rounded-full text-[var(--text-muted)]">
              {layer.tier}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[var(--omnigaze-gold)]">
            {formatCurrency(layer.totalAnnual)}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-[var(--border-subtle)] animate-fade-up">
          <div className="pt-3" />
          {layer.savings.map((saving, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-[var(--text-primary)]">
                    {saving.type}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {saving.description}
                  </div>
                </div>
                <div className="font-mono text-sm text-[var(--omnigaze-gold)] whitespace-nowrap ml-4">
                  {formatCurrency(saving.amount)}
                </div>
              </div>
              <div className="text-xs text-[var(--text-muted)] font-mono bg-[var(--bg-elevated)] p-2 rounded">
                Formula: {saving.formula}
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                Source: {saving.source}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Empty state before calculation
export function ResultsPlaceholder() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
        <TrendingUp className="w-8 h-8 text-[var(--text-muted)]" />
      </div>
      <h3 className="font-display text-lg text-[var(--text-primary)] mb-2">
        See Your Savings
      </h3>
      <p className="text-sm text-[var(--text-muted)]">
        Fill in your organization details and click &quot;Calculate My ROI&quot;
        to see potential savings across all five pyramid layers.
      </p>
    </div>
  );
}
