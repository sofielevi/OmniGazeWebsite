import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Rocket,
  Server,
  Shield,
  AppWindow,
  Layers,
  FileCode,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation - Getting Started with OmniGaze",
  description:
    "OmniGaze documentation: installation guides, network scanning setup, credential configuration, API reference, and best practices for infrastructure discovery.",
  keywords: [
    "OmniGaze documentation",
    "infrastructure discovery guide",
    "network scanning tutorial",
    "WinRM setup",
    "OData API documentation",
    "CMDB setup guide",
  ],
  openGraph: {
    title: "OmniGaze Documentation",
    description:
      "Everything you need to discover, map, and understand your IT infrastructure with OmniGaze.",
    url: "https://omnigaze.com/docs",
  },
  alternates: {
    canonical: "https://omnigaze.com/docs",
  },
};

export default function DocsOverviewPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] text-xs font-medium mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Documentation
        </div>
        <h1 className="font-display text-3xl font-medium mb-3">
          Welcome to OmniGaze Docs
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Everything you need to discover, map, and understand your IT infrastructure.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h2 className="font-display text-xl mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-[var(--amber-400)]" />
          Quick Start
        </h2>
        <div className="grid gap-3">
          <QuickLink
            href="/docs/getting-started/installation"
            title="1. Install OmniGaze"
            description="Download and install on Windows"
          />
          <QuickLink
            href="/docs/getting-started/activation"
            title="2. Activate License"
            description="Enter your license key"
          />
          <QuickLink
            href="/docs/security/winrm-setup"
            title="3. Configure Credentials"
            description="Set up secure scanning access"
          />
          <QuickLink
            href="/docs/getting-started/first-scan"
            title="4. Run Your First Scan"
            description="Discover your infrastructure"
          />
        </div>
      </div>

      {/* Documentation Sections */}
      <div>
        <h2 className="font-display text-xl mb-4">Browse Documentation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <SectionCard
            href="/docs/infrastructure/discovery"
            icon={Server}
            title="Infrastructure"
            description="Asset discovery, network scanning, and 3D visualization."
          />
          <SectionCard
            href="/docs/security"
            icon={Shield}
            title="Security & Credentials"
            description="Configure scanning credentials securely."
            highlight
          />
          <SectionCard
            href="/docs/applications/discovery"
            icon={AppWindow}
            title="Applications"
            description="Discover and map applications to infrastructure."
            badge="Starter+"
          />
          <SectionCard
            href="/docs/capabilities/overview"
            icon={Layers}
            title="Business Capabilities"
            description="Link applications to business capabilities."
            badge="Pro+"
          />
          <SectionCard
            href="/docs/api/rest"
            icon={FileCode}
            title="API Reference"
            description="REST API and OData endpoints documentation."
            badge="Pro+"
          />
        </div>
      </div>

      {/* Need Help */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg mb-2">Need Help?</h3>
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          Can&apos;t find what you&apos;re looking for? Contact our support team.
        </p>
        <a
          href="mailto:support@omnigaze.com"
          className="inline-flex items-center gap-2 text-sm text-[var(--amber-400)] hover:underline"
        >
          support@omnigaze.com
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-deep)] transition-colors group"
    >
      <div>
        <div className="font-medium text-[var(--text-primary)]">{title}</div>
        <div className="text-sm text-[var(--text-secondary)]">{description}</div>
      </div>
      <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)] transition-colors" />
    </Link>
  );
}

function SectionCard({
  href,
  icon: Icon,
  title,
  description,
  badge,
  highlight,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block p-5 rounded-xl border transition-colors ${
        highlight
          ? "bg-[var(--amber-400)]/5 border-[var(--amber-400)]/20 hover:border-[var(--amber-400)]/40"
          : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-warm)]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[var(--amber-400)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-medium">{title}</h3>
            {badge && (
              <span className="text-xs bg-[var(--bg-elevated)] text-[var(--text-muted)] px-2 py-0.5 rounded">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--text-secondary)]">{description}</p>
        </div>
      </div>
    </Link>
  );
}
