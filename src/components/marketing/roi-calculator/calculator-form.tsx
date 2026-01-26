"use client";

import { useState, useCallback } from "react";
import { Input, Checkbox } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Server, Users, DollarSign, Building2, Settings2 } from "lucide-react";
import type { CalculatorInputs } from "@/lib/roi/types";
import { defaultInputs } from "@/lib/roi/assumptions";
import { cn } from "@/lib/utils";

interface CalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs) => void;
  isCalculating?: boolean;
}

export function CalculatorForm({ onCalculate, isCalculating }: CalculatorFormProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    annualRevenue: defaultInputs.annualRevenue,
    employees: defaultInputs.employees,
    itStaff: defaultInputs.itStaff,
    servers: defaultInputs.servers,
    manualDocHoursPerWeek: defaultInputs.manualDocHoursPerWeek,
    incidentsPerMonth: defaultInputs.incidentsPerMonth,
    avgHoursPerIncident: defaultInputs.avgHoursPerIncident,
    itHourlyRate: defaultInputs.itHourlyRate,
    hasExistingCMDB: false,
    hasEATool: false,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateInput = useCallback(
    <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(inputs);
  };

  const formatCurrencyInput = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(0)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const parseCurrencyInput = (value: string): number => {
    const cleaned = value.replace(/[$,]/g, "").trim();
    if (cleaned.endsWith("M") || cleaned.endsWith("m")) {
      return parseFloat(cleaned) * 1000000;
    }
    if (cleaned.endsWith("K") || cleaned.endsWith("k")) {
      return parseFloat(cleaned) * 1000;
    }
    return parseFloat(cleaned) || 0;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Core business inputs */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-[var(--amber-400)] mb-4">
          <Building2 className="w-5 h-5" />
          <h3 className="font-display text-lg">Your Organization</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            Annual Revenue
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={formatCurrencyInput(inputs.annualRevenue)}
              onChange={(e) => updateInput("annualRevenue", parseCurrencyInput(e.target.value))}
              className={cn(
                "w-full pl-9 pr-4 py-3 rounded-lg",
                "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
                "text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
                "focus:outline-none focus:border-[var(--amber-400)] focus:ring-1 focus:ring-[var(--amber-400)]/50",
                "transition-colors duration-200"
              )}
              placeholder="$100M"
            />
          </div>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Used to calculate IT budget benchmarks
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Total Employees
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="number"
                value={inputs.employees}
                onChange={(e) => updateInput("employees", parseInt(e.target.value) || 0)}
                className={cn(
                  "w-full pl-9 pr-4 py-3 rounded-lg",
                  "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
                  "text-[var(--text-primary)]",
                  "focus:outline-none focus:border-[var(--amber-400)] focus:ring-1 focus:ring-[var(--amber-400)]/50",
                  "transition-colors duration-200"
                )}
                min={1}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              IT Staff
            </label>
            <input
              type="number"
              value={inputs.itStaff}
              onChange={(e) => updateInput("itStaff", parseInt(e.target.value) || 0)}
              className={cn(
                "w-full px-4 py-3 rounded-lg",
                "bg-[var(--bg-elevated)] border border-[var(--border-subtle)]",
                "text-[var(--text-primary)]",
                "focus:outline-none focus:border-[var(--amber-400)] focus:ring-1 focus:ring-[var(--amber-400)]/50",
                "transition-colors duration-200"
              )}
              min={1}
            />
          </div>
        </div>
      </div>

      {/* Server count slider */}
      <div className="pt-4 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 text-[var(--amber-400)] mb-4">
          <Server className="w-5 h-5" />
          <h3 className="font-display text-lg">Infrastructure</h3>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-[var(--text-primary)]">
              Number of Servers / VMs
            </label>
            <span className="font-mono text-lg text-[var(--amber-400)]">
              {inputs.servers.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={10000}
            step={50}
            value={inputs.servers}
            onChange={(e) => updateInput("servers", parseInt(e.target.value))}
            className="w-full h-2 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--amber-400)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
            <span>50</span>
            <span>10,000+</span>
          </div>
        </div>
      </div>

      {/* Advanced options toggle */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Settings2 className="w-4 h-4" />
          {showAdvanced ? "Hide" : "Show"} Advanced Options
        </button>
      </div>

      {/* Advanced options */}
      {showAdvanced && (
        <div className="space-y-5 pt-4 border-t border-[var(--border-subtle)] animate-fade-up">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Manual Doc Hours/Week"
              type="number"
              value={inputs.manualDocHoursPerWeek}
              onChange={(e) => updateInput("manualDocHoursPerWeek", parseInt(e.target.value) || 0)}
              hint="Excel, Visio, CMDB updates"
              min={0}
            />
            <Input
              label="IT Hourly Rate (USD)"
              type="number"
              value={inputs.itHourlyRate}
              onChange={(e) => updateInput("itHourlyRate", parseInt(e.target.value) || 0)}
              hint="Including overhead"
              min={1}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Incidents/Month"
              type="number"
              value={inputs.incidentsPerMonth}
              onChange={(e) => updateInput("incidentsPerMonth", parseInt(e.target.value) || 0)}
              min={0}
            />
            <Input
              label="Avg Hours/Incident"
              type="number"
              value={inputs.avgHoursPerIncident}
              onChange={(e) => updateInput("avgHoursPerIncident", parseInt(e.target.value) || 0)}
              min={0}
            />
          </div>

          <div className="space-y-3">
            <Checkbox
              label="We have an existing CMDB"
              checked={inputs.hasExistingCMDB}
              onChange={(e) => updateInput("hasExistingCMDB", e.target.checked)}
            />
            <Checkbox
              label="We have an EA tool (LeanIX, Ardoq, etc.)"
              checked={inputs.hasEATool}
              onChange={(e) => updateInput("hasEATool", e.target.checked)}
            />
          </div>
        </div>
      )}

      {/* Submit button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isCalculating}
        >
          {isCalculating ? "Calculating..." : "Calculate My ROI"}
        </Button>
      </div>
    </form>
  );
}
