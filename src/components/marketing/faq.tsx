"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does setup take?",
    answer:
      "Most users are up and running in under 10 minutes. Download the installer, run a network scan, and immediately see your discovered assets. No agents to deploy, no complex configuration required.",
  },
  {
    question: "Is OmniGaze agentless?",
    answer:
      "Yes, completely. OmniGaze uses standard network protocols (WMI, SSH, SNMP) to discover and inventory your infrastructure. Nothing is installed on your servers or endpoints.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your data stays on your infrastructure. OmniGaze runs entirely on-premise - there's no cloud dependency and your sensitive inventory data never leaves your network. Perfect for organizations with strict data sovereignty requirements.",
  },
  {
    question: "What's included in the free Community tier?",
    answer:
      "The Community tier includes network discovery, asset inventory, server diagrams, and tag management for up to 50 servers. It's free forever with no credit card required - no trial period, no feature expiration.",
  },
  {
    question: "How is OmniGaze different from traditional CMDB tools?",
    answer:
      "Traditional CMDBs require manual data entry and quickly become outdated. OmniGaze auto-discovers your infrastructure and keeps it current. Plus, we bridge the gap to business context - connecting servers to applications to business capabilities.",
  },
  {
    question: "Can I upgrade my tier later?",
    answer:
      "Absolutely. You can upgrade at any time directly from the application. Your existing data and configurations are preserved, and you immediately gain access to the new tier's features.",
  },
  {
    question: "What platforms do you support?",
    answer:
      "OmniGaze discovers Windows, Linux, and network devices. The desktop client runs on Windows 10/11 and Windows Server 2016+. We also integrate with Azure cloud environments in our Business tier and above.",
  },
  {
    question: "Do you offer support?",
    answer:
      "Community tier users have access to our documentation and community forums. Paid tiers include email support, with Business and Enterprise customers receiving priority support and dedicated customer success managers.",
  },
  {
    question: "Can OmniGaze integrate with my existing tools?",
    answer:
      "Yes. Professional tier and above includes our OData API for custom integrations. Enterprise tier adds pre-built integrations with LeanIX, ServiceNow, and other enterprise platforms.",
  },
  {
    question: "What happens after my organization grows past the tier limits?",
    answer:
      "You'll receive a notification when approaching your server limit. Simply upgrade to the next tier to continue discovering. There's no service interruption - existing discoveries remain accessible while you decide.",
  },
];

interface FAQProps {
  className?: string;
}

export function FAQ({ className }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("py-16", className)}>
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-12">
          Everything you need to know about getting started
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[var(--border-subtle)] rounded-lg overflow-hidden bg-[var(--bg-card)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <span className="font-display text-[var(--text-primary)] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "text-[var(--text-muted)] shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-5 pb-5 text-[var(--text-secondary)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
