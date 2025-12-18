import { ButtonLink } from "@/components/ui/button";
import { Download, ArrowRight, BookOpen, Zap, Shield, Network } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Getting Started",
  description: "Everything you need to know to get up and running with OmniGaze.",
};

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] text-xs font-medium mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Documentation
        </div>
        <h1 className="font-display text-4xl font-medium mb-4">Getting Started</h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Welcome to OmniGaze. This guide will help you install, configure, and start
          discovering your infrastructure in under 10 minutes.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8">
        <h2 className="font-display text-2xl mb-6">Quick Start</h2>

        <ol className="space-y-6">
          <QuickStartStep
            number={1}
            title="Download OmniGaze"
            description="Get the latest version from our downloads page. OmniGaze runs on Windows 10/11 and Windows Server 2016+."
          >
            <ButtonLink href="/download" variant="secondary" size="sm">
              <Download className="w-4 h-4" />
              Go to Downloads
            </ButtonLink>
          </QuickStartStep>

          <QuickStartStep
            number={2}
            title="Create an Account"
            description="Register with your email address. All tiers (including free Community) require email verification to receive your license key."
          >
            <ButtonLink href="/register" variant="secondary" size="sm">
              Create Account
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </QuickStartStep>

          <QuickStartStep
            number={3}
            title="Enter Your License Key"
            description="After verification, you'll receive a license key. Launch OmniGaze and enter the key in Settings > License to activate."
          />

          <QuickStartStep
            number={4}
            title="Configure Scan Credentials"
            description="Add credentials for the servers you want to scan. OmniGaze uses WMI for Windows and SSH for Linux targets."
          >
            <Link
              href="/docs/credentials"
              className="text-sm text-[var(--amber-400)] hover:underline"
            >
              Learn about credentials →
            </Link>
          </QuickStartStep>

          <QuickStartStep
            number={5}
            title="Start Discovering"
            description="Enter IP ranges, CIDR blocks, or hostnames and click Scan. Results appear in real-time as servers are discovered."
          >
            <Link
              href="/docs/scanning"
              className="text-sm text-[var(--amber-400)] hover:underline"
            >
              Scanning guide →
            </Link>
          </QuickStartStep>
        </ol>
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="font-display text-2xl mb-6">Core Features</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard
            icon={Zap}
            title="Auto-Discovery"
            description="Automatically find all servers, services, and applications across your network."
            href="/docs/scanning"
          />
          <FeatureCard
            icon={Network}
            title="Visualization"
            description="See your infrastructure in 2D diagrams or immersive 3D views."
            href="/docs/visualization"
          />
          <FeatureCard
            icon={Shield}
            title="Security Insights"
            description="Identify vulnerabilities, track certificates, and audit configurations."
            href="/docs/architecture"
          />
        </div>
      </div>

      {/* Resources */}
      <div>
        <h2 className="font-display text-2xl mb-6">Popular Resources</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ResourceLink
            href="/docs/credentials"
            title="Credential Setup Guide"
            description="How to configure Windows and Linux credentials securely."
          />
          <ResourceLink
            href="/docs/api"
            title="API Reference"
            description="OData API documentation for custom integrations."
          />
          <ResourceLink
            href="/docs/faq"
            title="Frequently Asked Questions"
            description="Common questions and troubleshooting tips."
          />
          <ResourceLink
            href="/docs/changelog"
            title="Release Notes"
            description="What's new in the latest version of OmniGaze."
          />
        </div>
      </div>

      {/* Support */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg mb-2">Need Help?</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Can&apos;t find what you&apos;re looking for? Our support team is here to help.
        </p>
        <ButtonLink href="mailto:support@omnigaze.com" variant="secondary" size="sm">
          Contact Support
        </ButtonLink>
      </div>
    </div>
  );
}

function QuickStartStep({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center font-mono text-sm font-medium">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="font-display text-lg mb-1">{title}</h3>
        <p className="text-[var(--text-secondary)] mb-3">{description}</p>
        {children}
      </div>
    </li>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--border-warm)] transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-[var(--amber-400)]" />
      </div>
      <h3 className="font-display text-lg mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </Link>
  );
}

function ResourceLink({
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
      className="flex items-start gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--border-warm)] transition-colors group"
    >
      <div className="flex-1">
        <h4 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--amber-400)] transition-colors">
          {title}
        </h4>
        <p className="text-sm text-[var(--text-secondary)]">{description}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--amber-400)] transition-colors flex-shrink-0 mt-1" />
    </Link>
  );
}
