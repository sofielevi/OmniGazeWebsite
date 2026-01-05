"use client";

import { useState } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section, SectionHeader } from "@/components/marketing/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/api-client";
import {
  FileSpreadsheet,
  Download,
  Mail,
  CheckCircle,
  Server,
  AppWindow,
  GitBranch,
  Building2,
  ChevronRight
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  fileName: string;
  downloadCount: string;
}

const templates: Template[] = [
  {
    id: "application-portfolio",
    name: "Application Portfolio Tracker",
    description: "Complete overview of all your applications with business criticality, ownership, and lifecycle status.",
    icon: <AppWindow className="w-6 h-6" />,
    features: [
      "Application overview with categories",
      "Business criticality scoring",
      "Lifecycle management (Plan/Build/Run/Retire)",
      "Ownership and contacts",
      "Technology stack tracking",
    ],
    fileName: "application-portfolio-tracker.csv",
    downloadCount: "2,340+",
  },
  {
    id: "infrastructure-inventory",
    name: "Infrastructure Inventory",
    description: "Server and asset inventory template for tracking all hardware, VMs, and cloud resources.",
    icon: <Server className="w-6 h-6" />,
    features: [
      "Server/VM inventory with specs",
      "Location and datacenter mapping",
      "OS and patch level tracking",
      "Network information",
      "Cost allocation",
    ],
    fileName: "infrastructure-inventory.csv",
    downloadCount: "1,890+",
  },
  {
    id: "dependency-matrix",
    name: "Dependency Mapping Matrix",
    description: "Visualize dependencies between systems, applications, and infrastructure components.",
    icon: <GitBranch className="w-6 h-6" />,
    features: [
      "System-to-system dependencies",
      "Data flow mapping",
      "Integration points",
      "Criticality assessment",
      "Impact analysis template",
    ],
    fileName: "dependency-mapping-matrix.csv",
    downloadCount: "1,560+",
  },
  {
    id: "business-capability-map",
    name: "Business Capability Map",
    description: "Link IT systems to business capabilities. Understand which business value each application supports.",
    icon: <Building2 className="w-6 h-6" />,
    features: [
      "Hierarchical capability structure",
      "Application-to-capability mapping",
      "Capability maturity scoring",
      "Gap analysis",
      "Investment prioritization",
    ],
    fileName: "business-capability-map.csv",
    downloadCount: "980+",
  },
];

export default function TemplatesPage() {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownload = (templateId: string) => {
    if (!emailSubmitted) {
      setSelectedTemplate(templateId);
      document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Trigger download
      const template = templates.find(t => t.id === templateId);
      if (template) {
        window.open(`/downloads/${template.fileName}`, '_blank');
      }
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit lead to API
    await submitLead({
      email,
      source: 'templates',
      data: {
        selectedTemplate: selectedTemplate,
        requestedTemplates: selectedTemplate === 'all' ? templates.map(t => t.id) : [selectedTemplate],
      },
    });

    setIsSubmitting(false);
    setEmailSubmitted(true);

    // Trigger download of selected template
    if (selectedTemplate && selectedTemplate !== 'all') {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        setTimeout(() => {
          window.open(`/downloads/${template.fileName}`, '_blank');
        }, 500);
      }
    } else if (selectedTemplate === 'all') {
      // Download all templates
      templates.forEach((template, index) => {
        setTimeout(() => {
          window.open(`/downloads/${template.fileName}`, '_blank');
        }, index * 500);
      });
    }
  };

  const handleDownloadAll = () => {
    if (!emailSubmitted) {
      setSelectedTemplate('all');
      document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Download all templates
      templates.forEach((template, index) => {
        setTimeout(() => {
          window.open(`/downloads/${template.fileName}`, '_blank');
        }, index * 500);
      });
    }
  };

  return (
    <>
      <Header />

      <main className="pt-32">
        <Section>
          <SectionHeader
            label="Free Resources"
            title="EA Starter Kit Templates"
            description="Free templates to kickstart your Enterprise Architecture practice. Used by 5,000+ IT professionals."
          />

          {/* Download All CTA */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-[var(--amber-400)]/20 to-[var(--amber-500)]/10 rounded-2xl p-8 border border-[var(--amber-400)]/30 text-center">
              <FileSpreadsheet className="w-12 h-12 text-[var(--amber-400)] mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">
                Download All 4 Templates
              </h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Get the complete EA Starter Kit with all templates in one download.
              </p>
              <Button onClick={handleDownloadAll} variant="primary" size="lg">
                <Download size={18} />
                Download Template Pack
              </Button>
            </div>
          </div>

          {/* Individual Templates */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] hover:border-[var(--amber-400)]/50 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--amber-400)]/20 flex items-center justify-center text-[var(--amber-400)]">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg mb-1">{template.name}</h3>
                    <div className="text-xs text-[var(--text-muted)]">
                      {template.downloadCount} downloads
                    </div>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] text-sm mb-4">
                  {template.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle size={14} className="text-[var(--success)] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleDownload(template.id)}
                  variant="secondary"
                  className="w-full"
                >
                  <Download size={16} />
                  Download {template.name.split(' ')[0]}
                </Button>
              </div>
            ))}
          </div>
        </Section>

        {/* Email Capture */}
        {!emailSubmitted && (
          <Section id="email-capture" className="bg-[var(--bg-card)]">
            <div className="max-w-xl mx-auto text-center">
              <Mail className="w-12 h-12 text-[var(--amber-400)] mx-auto mb-4" />
              <h2 className="font-display text-2xl mb-2">
                {selectedTemplate === 'all'
                  ? 'Download All Templates'
                  : 'Download Your Template'}
              </h2>
              <p className="text-[var(--text-secondary)] mb-6">
                Enter your email for free access. We&apos;ll also send tips on how to use them effectively.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1"
                  required
                />
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  <Download size={16} />
                  {isSubmitting ? '...' : 'Download'}
                </Button>
              </form>
              <p className="text-xs text-[var(--text-muted)] mt-4">
                We&apos;ll send templates + a short email series with tips. Unsubscribe anytime.
              </p>
            </div>
          </Section>
        )}

        {/* Success State */}
        {emailSubmitted && (
          <Section className="bg-[var(--bg-card)]">
            <div className="max-w-xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="font-display text-2xl mb-2">
                Thanks! Download Your Templates
              </h2>
              <p className="text-[var(--text-secondary)] mb-6">
                Click the buttons below to download. Files open in Excel or Google Sheets.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    onClick={() => handleDownload(template.id)}
                    variant="secondary"
                    size="sm"
                  >
                    <Download size={14} />
                    {template.name.split(' ')[0]}
                  </Button>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Upsell */}
        <Section>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-2xl mb-4">
                  Tired of Maintaining Spreadsheets?
                </h2>
                <p className="text-[var(--text-secondary)] mb-6">
                  OmniGaze automates all the manual work. Auto-discovery keeps your data up to date, so you never have to fill out an Excel sheet manually again.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <CheckCircle size={18} className="text-[var(--success)]" />
                    Automatically updated infrastructure inventory
                  </li>
                  <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <CheckCircle size={18} className="text-[var(--success)]" />
                    Real-time dependency mapping
                  </li>
                  <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <CheckCircle size={18} className="text-[var(--success)]" />
                    Export to Excel when you need it
                  </li>
                </ul>
                <ButtonLink href="/register" variant="primary">
                  Try OmniGaze Free
                  <ChevronRight size={16} />
                </ButtonLink>
              </div>
              <div className="bg-[var(--bg-elevated)] rounded-2xl p-6 border border-[var(--border-subtle)]">
                <div className="text-sm text-[var(--text-muted)] mb-4">
                  Typical Time Spent
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Manual documentation</span>
                      <span className="text-sm text-red-400">40+ hours/month</span>
                    </div>
                    <div className="h-2 bg-red-500/30 rounded-full" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">With OmniGaze</span>
                      <span className="text-sm text-green-400">2 hours/month</span>
                    </div>
                    <div className="h-2 bg-green-500/30 rounded-full">
                      <div className="h-full w-[5%] bg-green-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
