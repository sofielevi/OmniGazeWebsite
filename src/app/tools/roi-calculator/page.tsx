"use client";

import { useState } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section, SectionHeader } from "@/components/marketing/section";
import { ButtonLink } from "@/components/ui/button";
import {
  CalculatorForm,
  ResultsPanel,
  CurrencySelector,
  LiveCostCounter,
  MultiYearProjections,
  IndustryBenchmarks,
  EmailResults,
} from "@/components/marketing/roi-calculator";
import type { Currency } from "@/components/marketing/roi-calculator";
import type { ROIResult, CalculatorInputs } from "@/lib/roi/types";
import { calculateROI, formatCurrency } from "@/lib/roi/calculations";
import { TrendingUp, BarChart3, DollarSign, AlertTriangle, Clock, PiggyBank, Sparkles } from "lucide-react";

export default function ROICalculatorPage() {
  const [result, setResult] = useState<ROIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [showLiveCounter, setShowLiveCounter] = useState(false);
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);

  const handleCalculate = async (calcInputs: CalculatorInputs) => {
    setIsCalculating(true);
    setInputs(calcInputs);

    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const calculatedResult = calculateROI(calcInputs);
    setResult(calculatedResult);
    setIsCalculating(false);
    setShowLiveCounter(true);
  };

  // Calculate annual hidden cost for live counter (total cost before OmniGaze)
  const annualHiddenCost = result?.totalAnnualSavings ?? 0;

  return (
    <>
      <Header />

      <main className="pt-32">
        <Section>
          <SectionHeader
            label="Free Tool"
            title="What Does Your IT Darkness Cost?"
            description="Calculate the hidden cost of poor IT visibility. Most organizations underestimate this by 3-5x."
          />

          {/* Currency Selector */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <DollarSign size={16} />
                <span>Select your currency:</span>
              </div>
              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column: Calculator Form */}
            <div className="space-y-6">
              <div className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)]">
                <CalculatorForm
                  onCalculate={handleCalculate}
                  isCalculating={isCalculating}
                />
              </div>

              {/* Industry Benchmarks (always visible) */}
              <IndustryBenchmarks />
            </div>

            {/* Right Column: Results */}
            <div className="space-y-6">
              {!result ? (
                /* Enhanced Empty State */
                <div className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)]">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--amber-400)]/10 rounded-full text-[var(--amber-400)] text-sm mb-4">
                      <Sparkles size={14} />
                      <span>Powered by Industry Research</span>
                    </div>
                    <h3 className="font-display text-2xl mb-2">See What Fits Your Reality</h3>
                    <p className="text-[var(--text-muted)]">
                      Your personalized cost analysis awaits
                    </p>
                  </div>

                  {/* Preview Cards */}
                  <div className="space-y-4">
                    {/* Cost Preview Card */}
                    <div className="bg-[var(--bg-elevated)] rounded-xl p-5 border border-[var(--border-subtle)] opacity-60">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-red-400" />
                        </div>
                        <span className="text-sm text-[var(--text-muted)]">Annual Hidden Costs</span>
                      </div>
                      {/* Placeholder bar chart */}
                      <div className="flex items-end gap-2 h-16 mb-3">
                        <div className="flex-1 bg-red-500/30 rounded-t" style={{ height: "60%" }} />
                        <div className="flex-1 bg-red-500/30 rounded-t" style={{ height: "80%" }} />
                        <div className="flex-1 bg-red-500/30 rounded-t" style={{ height: "45%" }} />
                        <div className="flex-1 bg-red-500/30 rounded-t" style={{ height: "100%" }} />
                        <div className="flex-1 bg-red-500/30 rounded-t" style={{ height: "70%" }} />
                      </div>
                      <div className="font-display text-2xl text-[var(--text-muted)]">$???</div>
                    </div>

                    {/* Risk Indicators */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[var(--bg-elevated)] rounded-xl p-4 border border-[var(--border-subtle)] opacity-60">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-orange-400" />
                          <span className="text-xs text-[var(--text-muted)]">Risk Score</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="h-2 flex-1 bg-orange-500/40 rounded" />
                          <div className="h-2 flex-1 bg-orange-500/30 rounded" />
                          <div className="h-2 flex-1 bg-[var(--bg-card)] rounded" />
                        </div>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-xl p-4 border border-[var(--border-subtle)] opacity-60">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-[var(--text-muted)]">Wasted Hours</span>
                        </div>
                        <div className="font-display text-lg text-[var(--text-muted)]">??? hrs/yr</div>
                      </div>
                    </div>

                    {/* Savings Preview */}
                    <div className="bg-[var(--bg-elevated)] rounded-xl p-5 border border-green-500/20 opacity-60">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <PiggyBank className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-sm text-[var(--text-muted)]">Potential Savings</span>
                      </div>
                      <div className="font-display text-2xl text-green-400/50">$??? / year</div>
                    </div>
                  </div>

                  {/* CTA hint */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-[var(--amber-400)]">
                      <BarChart3 className="w-4 h-4" />
                      <span>Enter your numbers to reveal your costs</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Results Display */
                <>
                  {/* Live Cost Counter */}
                  <LiveCostCounter
                    annualCost={annualHiddenCost}
                    currency={currency}
                    isActive={showLiveCounter}
                  />

                  {/* Main Results Panel */}
                  <ResultsPanel result={result} />

                  {/* Multi-Year Projections */}
                  <MultiYearProjections
                    annualSavings={result.totalUnlockedSavings}
                    annualCost={result.tierAnnualCost}
                    currency={currency}
                  />

                  {/* Email Results to Stakeholders */}
                  {inputs && (
                    <EmailResults
                      results={{
                        annualCost: result.totalAnnualSavings,
                        potentialSavings: result.totalUnlockedSavings,
                        paybackMonths: result.paybackMonths,
                        roiPercent: result.roiPercent,
                      }}
                      inputs={inputs as unknown as Record<string, unknown>}
                      currency={currency}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </Section>

        {/* Social Proof */}
        <Section className="bg-[var(--bg-card)]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-2xl mb-4">
              Companies That Calculated Their IT Darkness
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Based on aggregated data from organizations using our ROI calculator
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl">
                <div className="font-display text-3xl text-[var(--amber-400)]">73%</div>
                <div className="text-sm text-[var(--text-secondary)]">underestimated their costs</div>
              </div>
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl">
                <div className="font-display text-3xl text-[var(--amber-400)]">4.2x</div>
                <div className="text-sm text-[var(--text-secondary)]">average ROI with OmniGaze</div>
              </div>
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl">
                <div className="font-display text-3xl text-[var(--amber-400)]">3 mo</div>
                <div className="text-sm text-[var(--text-secondary)]">typical payback time</div>
              </div>
              <div className="p-4 bg-[var(--bg-elevated)] rounded-xl">
                <div className="font-display text-3xl text-green-400]">$847K</div>
                <div className="text-sm text-[var(--text-secondary)]">avg. annual savings</div>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-6">
              Sources: Gartner IT Budget Benchmark, Forrester TEI Studies, McKinsey Digital Operations
            </p>
          </div>
        </Section>

        {/* How We Calculate */}
        <Section>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl text-center mb-8">
              How We Calculate Your Savings
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <span className="font-display text-lg text-blue-400">1</span>
                </div>
                <h3 className="font-display text-lg mb-2">Discovery Time Savings</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Manual documentation takes 30+ min/server (Gartner ITAM Research). OmniGaze eliminates this entirely.
                </p>
              </div>
              <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                  <span className="font-display text-lg text-green-400">2</span>
                </div>
                <h3 className="font-display text-lg mb-2">Incident Resolution</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Dependency visibility reduces MTTR by 25% (Industry Benchmark), directly lowering incident costs.
                </p>
              </div>
              <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <span className="font-display text-lg text-purple-400">3</span>
                </div>
                <h3 className="font-display text-lg mb-2">Application Rationalization</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  15% of applications are redundant (Gartner). Visibility enables consolidation and license savings.
                </p>
              </div>
              <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/20 flex items-center justify-center mb-4">
                  <span className="font-display text-lg text-[var(--amber-400)]">4</span>
                </div>
                <h3 className="font-display text-lg mb-2">Compliance & Audit</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Automated documentation reduces compliance effort by 40-60% (Forrester Consulting).
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section className="bg-[var(--bg-card)]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl mb-4">
              Ready to Eliminate Your IT Darkness?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Start with the free Community tier - no credit card required. 50 servers free forever.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonLink href="/register" variant="primary" size="lg">
                Start Free
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary" size="lg">
                View All Plans
              </ButtonLink>
              <ButtonLink
                href="https://www.cal.eu/sofielevi/30min?user=sofielevi"
                variant="ghost"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Demo
              </ButtonLink>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
