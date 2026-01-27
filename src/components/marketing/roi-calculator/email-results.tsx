"use client";

import { useState } from "react";
import { Mail, Users, Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/api-client";
import { Currency, formatFullCurrency } from "./currency-selector";

interface EmailResultsProps {
  results: {
    annualCost: number;
    potentialSavings: number;
    paybackMonths: number;
    roiPercent: number;
  };
  inputs: Record<string, unknown>;
  currency: Currency;
  className?: string;
}

export function EmailResults({ results, inputs, currency, className }: EmailResultsProps) {
  const [emails, setEmails] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [myEmail, setMyEmail] = useState("");

  const addEmailField = () => {
    if (emails.length < 5) {
      setEmails([...emails, ""]);
    }
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const removeEmail = (index: number) => {
    if (emails.length > 1) {
      const newEmails = emails.filter((_, i) => i !== index);
      setEmails(newEmails);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validEmails = emails.filter((email) => email.trim() !== "");

    await submitLead({
      email: myEmail,
      source: "roi-calculator",
      data: {
        action: "share",
        sharedWith: validEmails,
        results,
        inputs,
        currency,
      },
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className={cn("bg-green-500/20 rounded-xl p-6 border border-green-500/30", className)}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
          <span className="font-medium text-green-400">Report Sent!</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          We&apos;ve sent the ROI analysis to {emails.filter((e) => e.trim()).length + 1} recipient(s).
          The report includes a detailed breakdown and recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-warm)]", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/20 flex items-center justify-center">
          <Mail size={18} className="text-[var(--amber-400)]" />
        </div>
        <div>
          <h4 className="font-display text-lg">Share This Report</h4>
          <p className="text-xs text-[var(--text-muted)]">Email results to stakeholders and decision makers</p>
        </div>
      </div>

      {/* Preview Box */}
      <div className="bg-[var(--bg-elevated)] rounded-lg p-4 mb-4 text-sm">
        <div className="font-medium mb-2">Report includes:</div>
        <ul className="space-y-1 text-[var(--text-secondary)]">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            Annual Hidden Costs: {formatFullCurrency(results.annualCost, currency)}
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Potential Savings: {formatFullCurrency(results.potentialSavings, currency)}/year
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[var(--amber-400)] rounded-full" />
            ROI: {results.roiPercent.toFixed(0)}% | Payback: {results.paybackMonths.toFixed(1)} months
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            Industry benchmarks & methodology
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Your email */}
        <div>
          <label className="text-sm text-[var(--text-secondary)] mb-1 block">Your email</label>
          <Input
            type="email"
            value={myEmail}
            onChange={(e) => setMyEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />
        </div>

        {/* Additional recipients */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
              <Users size={14} />
              Send to stakeholders (optional)
            </label>
            {emails.length < 5 && (
              <button
                type="button"
                onClick={addEmailField}
                className="text-xs text-[var(--amber-400)] hover:underline"
              >
                + Add another
              </button>
            )}
          </div>
          <div className="space-y-2">
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                  placeholder={`stakeholder${index + 1}@company.com`}
                  className="flex-1"
                />
                {emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEmail(index)}
                    className="px-2 text-[var(--text-muted)] hover:text-red-400"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Email Report
            </>
          )}
        </Button>
      </form>

      <p className="text-xs text-[var(--text-muted)] mt-3 text-center">
        Recipients will receive a professional PDF report with your ROI analysis.
      </p>
    </div>
  );
}
