"use client";

import { useState } from "react";
import { BookOpen, ExternalLink, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Benchmark {
  metric: string;
  value: string;
  source: string;
  sourceUrl?: string;
  description: string;
}

const benchmarks: Benchmark[] = [
  {
    metric: "Manual Discovery Time",
    value: "30+ min/server",
    source: "Gartner ITAM Research",
    description: "Average time to manually document a single server or VM",
  },
  {
    metric: "MTTR Improvement",
    value: "25-40%",
    source: "Forrester TEI Studies",
    description: "Mean Time to Resolution reduction with dependency visibility",
  },
  {
    metric: "Cloud Waste",
    value: "30%",
    source: "McKinsey Digital",
    sourceUrl: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights",
    description: "Average cloud spend that is wasted or over-provisioned",
  },
  {
    metric: "Redundant Applications",
    value: "15-20%",
    source: "Gartner Application Rationalization",
    description: "Percentage of duplicate/redundant applications in average portfolio",
  },
  {
    metric: "IT Spend as % of Revenue",
    value: "3-5%",
    source: "Deloitte CIO Survey 2024",
    sourceUrl: "https://www.deloitte.com/global/en/services/consulting/research/cio-survey.html",
    description: "Average IT spending across industries",
  },
  {
    metric: "Audit Preparation Time",
    value: "40-60% reduction",
    source: "Forrester Consulting",
    description: "Time savings with automated IT documentation for compliance",
  },
];

interface IndustryBenchmarksProps {
  className?: string;
}

export function IndustryBenchmarks({ className }: IndustryBenchmarksProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)]", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--bg-elevated)] transition-colors rounded-xl"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-[var(--amber-400)]" />
          <span className="text-sm font-medium">Industry Benchmarks & Sources</span>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "text-[var(--text-muted)] transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div className="px-4 pb-4 space-y-3">
          <p className="text-xs text-[var(--text-muted)] mb-3">
            Our calculations are based on industry research and benchmarks from leading analysts.
          </p>

          {benchmarks.map((benchmark, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-4 py-2 border-b border-[var(--border-subtle)] last:border-0"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--text-primary)]">{benchmark.metric}</span>
                  <span className="font-mono text-sm text-[var(--amber-400)]">{benchmark.value}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{benchmark.description}</p>
              </div>
              <div className="shrink-0 text-right">
                {benchmark.sourceUrl ? (
                  <a
                    href={benchmark.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--amber-400)] flex items-center gap-1"
                  >
                    {benchmark.source}
                    <ExternalLink size={10} />
                  </a>
                ) : (
                  <span className="text-xs text-[var(--text-muted)]">{benchmark.source}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
