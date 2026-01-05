"use client";

import { useState } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section, SectionHeader } from "@/components/marketing/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/api-client";
import { Calculator, TrendingDown, Clock, Users, Share2, Mail, ChevronRight } from "lucide-react";

interface CalculationResult {
  annualCostOfDarkness: number;
  manualDocHours: number;
  incidentCost: number;
  hiddenInfraRisk: number;
  potentialSavings: number;
  paybackMonths: number;
}

export default function ROICalculatorPage() {
  const [servers, setServers] = useState<string>("100");
  const [applications, setApplications] = useState<string>("50");
  const [incidentsPerMonth, setIncidentsPerMonth] = useState<string>("5");
  const [avgIncidentHours, setAvgIncidentHours] = useState<string>("4");
  const [manualDocHoursPerWeek, setManualDocHoursPerWeek] = useState<string>("10");
  const [hourlyRate, setHourlyRate] = useState<string>("75");

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculate = () => {
    const s = parseInt(servers) || 0;
    const a = parseInt(applications) || 0;
    const incidents = parseInt(incidentsPerMonth) || 0;
    const incidentHrs = parseFloat(avgIncidentHours) || 0;
    const docHrs = parseFloat(manualDocHoursPerWeek) || 0;
    const rate = parseFloat(hourlyRate) || 0;

    // Calculations
    const manualDocCostPerYear = docHrs * 52 * rate;
    const incidentCostPerYear = incidents * 12 * incidentHrs * rate;
    const hiddenInfraRiskCost = s * 50; // Estimate: $50 risk per unmanaged server
    const shadowITRisk = a * 0.15 * 1000; // 15% unknown apps, $1K risk each

    const totalCostOfDarkness = manualDocCostPerYear + incidentCostPerYear + hiddenInfraRiskCost + shadowITRisk;

    // OmniGaze typically saves 60-80% of these costs
    const savingsRate = 0.7;
    const potentialSavings = totalCostOfDarkness * savingsRate;

    // Assume Professional tier at ~$349/mo
    const omnigazeCost = 349 * 12;
    const netSavings = potentialSavings - omnigazeCost;
    const paybackMonths = netSavings > 0 ? Math.ceil(omnigazeCost / (netSavings / 12)) : 0;

    setResult({
      annualCostOfDarkness: Math.round(totalCostOfDarkness),
      manualDocHours: Math.round(docHrs * 52),
      incidentCost: Math.round(incidentCostPerYear),
      hiddenInfraRisk: Math.round(hiddenInfraRiskCost + shadowITRisk),
      potentialSavings: Math.round(potentialSavings),
      paybackMonths: paybackMonths,
    });

    setShowEmailCapture(true);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit lead to API
    await submitLead({
      email,
      source: 'roi-calculator',
      data: {
        servers: parseInt(servers),
        applications: parseInt(applications),
        incidentsPerMonth: parseInt(incidentsPerMonth),
        avgIncidentHours: parseFloat(avgIncidentHours),
        manualDocHoursPerWeek: parseFloat(manualDocHoursPerWeek),
        hourlyRate: parseFloat(hourlyRate),
        result,
      },
    });

    setIsSubmitting(false);
    setEmailSubmitted(true);
  };

  const shareOnLinkedIn = () => {
    const text = `I just calculated our IT darkness costs: $${formatNumber(result?.annualCostOfDarkness || 0)}/year!

Calculate yours: https://omnigaze.com/tools/roi-calculator

#ITinfrastructure #EnterpriseArchitecture`;

    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://omnigaze.com/tools/roi-calculator')}`,
      '_blank'
    );
  };

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

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <div className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/20 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[var(--amber-400)]" />
                </div>
                <h3 className="font-display text-xl">Your Infrastructure</h3>
              </div>

              <div className="space-y-6">
                <Input
                  label="Number of servers / VMs"
                  type="number"
                  value={servers}
                  onChange={(e) => setServers(e.target.value)}
                  placeholder="100"
                  hint="Include on-prem and cloud"
                />

                <Input
                  label="Number of applications"
                  type="number"
                  value={applications}
                  onChange={(e) => setApplications(e.target.value)}
                  placeholder="50"
                  hint="Business-critical systems"
                />

                <Input
                  label="IT incidents per month"
                  type="number"
                  value={incidentsPerMonth}
                  onChange={(e) => setIncidentsPerMonth(e.target.value)}
                  placeholder="5"
                  hint="Downtime, errors, unplanned changes"
                />

                <Input
                  label="Avg. hours per incident"
                  type="number"
                  value={avgIncidentHours}
                  onChange={(e) => setAvgIncidentHours(e.target.value)}
                  placeholder="4"
                />

                <Input
                  label="Hours on manual documentation/week"
                  type="number"
                  value={manualDocHoursPerWeek}
                  onChange={(e) => setManualDocHoursPerWeek(e.target.value)}
                  placeholder="10"
                  hint="Excel, Visio, CMDB maintenance"
                />

                <Input
                  label="IT hourly rate (USD)"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="75"
                  hint="Including overhead"
                />

                <Button onClick={calculate} variant="primary" className="w-full">
                  Calculate My Costs
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            {/* Results */}
            <div>
              {!result ? (
                <div className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)] h-full flex items-center justify-center">
                  <div className="text-center text-[var(--text-muted)]">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Fill out the form to see your results</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Main Result */}
                  <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl p-8 border border-red-500/30">
                    <div className="text-sm text-red-400 mb-2 flex items-center gap-2">
                      <TrendingDown size={16} />
                      Annual Cost of IT Darkness
                    </div>
                    <div className="font-display text-5xl text-red-400 mb-2">
                      ${formatNumber(result.annualCostOfDarkness)}
                    </div>
                    <div className="text-[var(--text-secondary)]">
                      That&apos;s ${formatNumber(Math.round(result.annualCostOfDarkness / 12))}/month
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] space-y-4">
                    <h4 className="font-medium mb-4">Cost Breakdown</h4>

                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[var(--text-muted)]" />
                        <span className="text-[var(--text-secondary)]">Manual documentation</span>
                      </div>
                      <span>{formatNumber(result.manualDocHours)} hours/year</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2">
                        <TrendingDown size={16} className="text-[var(--text-muted)]" />
                        <span className="text-[var(--text-secondary)]">Incident costs</span>
                      </div>
                      <span>${formatNumber(result.incidentCost)}</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-[var(--text-muted)]" />
                        <span className="text-[var(--text-secondary)]">Hidden infra risk</span>
                      </div>
                      <span>${formatNumber(result.hiddenInfraRisk)}</span>
                    </div>
                  </div>

                  {/* Savings */}
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
                    <div className="text-sm text-green-400 mb-2">
                      Potential Savings with OmniGaze
                    </div>
                    <div className="font-display text-3xl text-green-400 mb-1">
                      ${formatNumber(result.potentialSavings)}/year
                    </div>
                    {result.paybackMonths > 0 && (
                      <div className="text-[var(--text-secondary)] text-sm">
                        Payback in {result.paybackMonths} months
                      </div>
                    )}
                  </div>

                  {/* Email Capture */}
                  {showEmailCapture && !emailSubmitted && (
                    <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--amber-400)]/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Mail size={16} className="text-[var(--amber-400)]" />
                        <span className="font-medium">Get the Full Report</span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] mb-4">
                        We&apos;ll send you a detailed analysis with recommendations to reduce your IT darkness.
                      </p>
                      <form onSubmit={handleEmailSubmit} className="flex gap-3">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="flex-1"
                          required
                        />
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                          {isSubmitting ? '...' : 'Send'}
                        </Button>
                      </form>
                    </div>
                  )}

                  {emailSubmitted && (
                    <div className="bg-green-500/20 rounded-2xl p-6 border border-green-500/30 text-center">
                      <div className="text-green-400 mb-2">Thanks!</div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        We&apos;ll be in touch at {email}
                      </p>
                    </div>
                  )}

                  {/* Share & CTA */}
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={shareOnLinkedIn} variant="secondary" className="flex-1">
                      <Share2 size={16} />
                      Share on LinkedIn
                    </Button>
                    <ButtonLink href="/register" variant="primary" className="flex-1">
                      Try OmniGaze Free
                    </ButtonLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* Social Proof */}
        <Section className="bg-[var(--bg-card)]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl mb-4">
              Companies That Calculated Their IT Darkness
            </h2>
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div>
                <div className="font-display text-3xl text-[var(--amber-400)]">73%</div>
                <div className="text-sm text-[var(--text-secondary)]">underestimated their costs</div>
              </div>
              <div>
                <div className="font-display text-3xl text-[var(--amber-400)]">4.2x</div>
                <div className="text-sm text-[var(--text-secondary)]">average ROI with OmniGaze</div>
              </div>
              <div>
                <div className="font-display text-3xl text-[var(--amber-400)]">3 mo</div>
                <div className="text-sm text-[var(--text-secondary)]">typical payback time</div>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl mb-4">
              Ready to Eliminate Your IT Darkness?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Start with the free Community tier - no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonLink href="/register" variant="primary" size="lg">
                Start Free
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary" size="lg">
                View All Plans
              </ButtonLink>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
