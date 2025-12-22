import { Metadata } from "next";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { Section, SectionHeader } from "@/components/marketing/section";
import { ValuePyramid } from "@/components/marketing/value-pyramid";
import { BridgeVisual } from "@/components/marketing/bridge-visual";
import { DataSovereignty } from "@/components/marketing/data-sovereignty";
import { GravityWell } from "@/components/marketing/gravity-well";
import { ButtonLink } from "@/components/ui/button";
import {
  ChevronRight,
  Search,
  Globe,
  GitBranch,
  ShieldCheck,
  Zap,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "OmniGaze - From Servers to Strategy | Infrastructure Discovery & EA",
  description:
    "Auto-discover your IT infrastructure, map application dependencies, and bridge operations to enterprise architecture. The only platform spanning from 10,000+ assets to strategic initiatives. Free tier available.",
  keywords: [
    "infrastructure discovery",
    "CMDB",
    "enterprise architecture",
    "IT asset management",
    "network discovery",
    "server inventory",
    "application mapping",
    "business capabilities",
    "value stream mapping",
    "3D visualization",
    "agentless discovery",
  ],
  openGraph: {
    title: "OmniGaze - From Servers to Strategy",
    description:
      "The only platform that connects infrastructure discovery to strategic business value. Auto-discover servers, map dependencies, and align IT with business goals.",
    url: "https://omnigaze.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmniGaze - Applied Observability Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniGaze - From Servers to Strategy",
    description:
      "Auto-discover infrastructure, map dependencies, bridge IT to business strategy. Free tier with 50 servers.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://omnigaze.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Value Pyramid Section - Core Differentiator */}
        <Section id="pyramid" className="bg-gradient-to-b from-transparent via-[var(--bg-card)] to-transparent">
          <SectionHeader
            label="The OmniGaze Advantage"
            title="From Servers to Strategy"
            description="The only platform that spans the full value chain—from infrastructure discovery to strategic planning."
          />

          <ValuePyramid className="mb-16" />

          <div className="text-center">
            <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
              Most tools focus on just one layer. OmniGaze connects them all,
              giving you complete visibility from 10,000+ infrastructure assets
              to your 1-4 strategic initiatives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonLink href="/features" variant="secondary">
                See All Features
              </ButtonLink>
              <ButtonLink href="/pricing" variant="primary">
                View Pricing
                <ChevronRight size={16} />
              </ButtonLink>
            </div>
          </div>
        </Section>

        {/* Bridge Section */}
        <Section id="bridge">
          <SectionHeader
            label="Why OmniGaze"
            title="One Platform, Complete Visibility"
            description="Stop juggling separate tools for discovery and architecture. OmniGaze bridges operational IT and strategic planning."
          />

          <BridgeVisual />

          {/* Data Sovereignty */}
          <DataSovereignty className="mt-16" />

          {/* EA Evolution - Gravity Well */}
          <GravityWell className="mt-20" />
        </Section>

        {/* Features Preview */}
        <Section className="bg-[var(--bg-card)]">
          <SectionHeader
            label="Capabilities"
            title="Everything You Need"
            description="From auto-discovery to executive dashboards, all in one unified platform."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          <div className="text-center mt-12">
            <ButtonLink href="/features" variant="secondary">
              Explore All Features
              <ChevronRight size={16} />
            </ButtonLink>
          </div>
        </Section>

        {/* CTA Section */}
        <Section>
          <div className="relative bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] border border-[var(--border-warm)] rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,var(--amber-glow),transparent)] pointer-events-none" />

            <h2 className="font-display text-3xl md:text-5xl mb-4 relative z-10">
              Ready to See Everything?
            </h2>
            <p className="font-display font-light text-lg text-[var(--text-secondary)] mb-8 relative z-10">
              Discover a better way to understand your infrastructure, from servers to strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <ButtonLink href="/register" variant="primary" size="lg">
                Start Free Today
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Schedule a Demo
              </ButtonLink>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

// Feature data
const features = [
  {
    title: "Auto-Discovery",
    description: "Automatically scan your network and discover servers, services, and connections without agents.",
    icon: Search,
    tier: "Community",
  },
  {
    title: "3D Visualization",
    description: "Explore your infrastructure in an immersive 3D environment. See connections like never before.",
    icon: Globe,
    tier: "Starter",
  },
  {
    title: "Process Mapping",
    description: "Discover running processes and map application dependencies automatically.",
    icon: GitBranch,
    tier: "Starter",
  },
  {
    title: "Vulnerability Scanning",
    description: "Identify CVEs and security risks across your infrastructure with continuous monitoring.",
    icon: ShieldCheck,
    tier: "Professional",
  },
  {
    title: "OData API",
    description: "Full API access for integration with your existing tools and workflows.",
    icon: Zap,
    tier: "Professional",
  },
  {
    title: "Enterprise Architecture",
    description: "FactSheets, business capabilities, and strategic planning integration.",
    icon: Building2,
    tier: "Enterprise",
  },
];

function FeatureCard({ title, description, icon: Icon, tier }: {
  title: string;
  description: string;
  icon: React.ElementType;
  tier: string;
}) {
  return (
    <div className="p-6 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-warm)] transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl">
      <div className="w-12 h-12 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[var(--amber-400)]" />
      </div>
      <h3 className="font-display text-lg mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{description}</p>
      <span className="inline-block px-2 py-1 bg-[var(--bg-card)] rounded text-xs text-[var(--amber-400)]">
        {tier}+
      </span>
    </div>
  );
}
