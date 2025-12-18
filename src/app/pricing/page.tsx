"use client";

import { useState } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section, SectionHeader } from "@/components/marketing/section";
import { PricingCard } from "@/components/marketing/pricing-card";
import { pricingTiers } from "@/config/site";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <>
      <Header />

      <main className="pt-32">
        {/* Pricing Section */}
        <Section>
          <SectionHeader
            label="Pricing"
            title="Plans That Grow With You"
            description="Start free, scale when you need to. No credit card required."
          />

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-[var(--bg-card)] p-1 rounded-lg">
              <button
                className={cn(
                  "px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300",
                  billingCycle === "monthly"
                    ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={cn(
                  "px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2",
                  billingCycle === "annual"
                    ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
                onClick={() => setBillingCycle("annual")}
              >
                Annual
                <span className="px-2 py-0.5 bg-[var(--success-muted)] text-[var(--success)] text-xs rounded">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {pricingTiers.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                billingCycle={billingCycle}
              />
            ))}
          </div>
        </Section>

        {/* Feature Matrix */}
        <Section className="bg-[var(--bg-card)]">
          <div className="bg-[var(--bg-elevated)] rounded-3xl p-8 md:p-12">
            <h3 className="font-display text-2xl mb-8">Compare All Features</h3>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th className="text-left py-4 text-sm font-medium text-[var(--text-muted)]"></th>
                    {pricingTiers.map((tier) => (
                      <th
                        key={tier.id}
                        className={cn(
                          "text-center py-4 text-xs uppercase tracking-wider",
                          tier.featured ? "text-[var(--amber-400)]" : "text-[var(--text-muted)]"
                        )}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureMatrix.map((category) => (
                    <>
                      <tr key={category.category}>
                        <td
                          colSpan={6}
                          className="pt-6 pb-2 text-xs uppercase tracking-wider text-[var(--amber-400)]"
                        >
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature) => (
                        <tr key={feature.name} className="border-b border-[var(--border-subtle)]">
                          <td className="py-3 text-sm">{feature.name}</td>
                          {feature.tiers.map((available, i) => (
                            <td key={i} className="text-center py-3">
                              {available ? (
                                <span className="text-[var(--success)]">✓</span>
                              ) : (
                                <span className="text-[var(--text-muted)] opacity-30">—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionHeader
            label="FAQ"
            title="Common Questions"
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-subtle)]">
                <h4 className="font-display text-lg mb-2">{faq.question}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

// Feature comparison matrix
const featureMatrix = [
  {
    category: "Discovery",
    features: [
      { name: "Network scanning", tiers: [true, true, true, true, true] },
      { name: "Windows/Linux assets", tiers: [true, true, true, true, true] },
      { name: "Process discovery", tiers: [false, true, true, true, true] },
      { name: "Azure cloud resources", tiers: [false, false, false, true, true] },
    ],
  },
  {
    category: "Visualization",
    features: [
      { name: "Server diagram (2D)", tiers: [true, true, true, true, true] },
      { name: "3D visualization", tiers: [false, true, true, true, true] },
      { name: "Process diagram", tiers: [false, true, true, true, true] },
      { name: "Logical architecture", tiers: [false, false, false, false, true] },
    ],
  },
  {
    category: "Security & Compliance",
    features: [
      { name: "Vulnerability detection", tiers: [false, false, true, true, true] },
      { name: "SSL certificate tracking", tiers: [false, false, true, true, true] },
      { name: "CIS benchmarks", tiers: [false, false, false, true, true] },
    ],
  },
  {
    category: "Enterprise Architecture",
    features: [
      { name: "FactSheets", tiers: [false, false, false, false, true] },
      { name: "Business capabilities", tiers: [false, false, false, false, true] },
      { name: "LeanIX integration", tiers: [false, false, false, false, true] },
      { name: "ServiceNow sync", tiers: [false, false, false, false, true] },
    ],
  },
  {
    category: "Integration & API",
    features: [
      { name: "CSV export", tiers: [false, true, true, true, true] },
      { name: "OData API", tiers: [false, false, true, true, true] },
      { name: "SSO (Azure AD)", tiers: [false, false, false, true, true] },
    ],
  },
];

// FAQs
const faqs = [
  {
    question: "What counts as a \"server\"?",
    answer: "Any discovered device with an IP address that runs services - Windows servers, Linux servers, VMs, containers with IPs. Network devices (switches, routers) and endpoints (workstations) are counted separately.",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer: "Yes, changes take effect on your next billing cycle. When upgrading, you get immediate access with prorated billing. Note that downgrading is not available for self-service - please contact support.",
  },
  {
    question: "What happens if I exceed my server limit?",
    answer: "You'll receive a notification and have 14 days to upgrade or remove servers. Discovery continues but new servers won't be added until you're within limits.",
  },
  {
    question: "Is there a free trial of paid tiers?",
    answer: "Yes, all paid tiers include a 14-day free trial. No credit card required to start.",
  },
  {
    question: "Do you offer discounts for nonprofits or education?",
    answer: "Yes, contact us for 50% off any tier for qualified nonprofit and educational organizations.",
  },
];
