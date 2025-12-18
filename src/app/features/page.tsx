import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section, SectionHeader } from "@/components/marketing/section";
import { ValuePyramid } from "@/components/marketing/value-pyramid";
import { ButtonLink } from "@/components/ui/button";
import { pyramidLayers } from "@/config/site";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Features",
  description: "Explore OmniGaze features: from auto-discovery and 3D visualization to enterprise architecture integration.",
};

export default function FeaturesPage() {
  return (
    <>
      <Header />

      <main className="pt-32">
        {/* Hero */}
        <Section>
          <SectionHeader
            label="Features"
            title="From Infrastructure to Strategy"
            description="Everything you need to understand, visualize, and optimize your IT landscape—in one unified platform."
          />

          <div className="flex justify-center">
            <ValuePyramid />
          </div>
        </Section>

        {/* Feature Sections by Pyramid Layer */}
        {pyramidLayers.slice().reverse().map((layer, index) => (
          <Section
            key={layer.id}
            id={layer.id}
            className={index % 2 === 0 ? "" : "bg-[var(--bg-card)]"}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                  style={{
                    backgroundColor: `${layer.color}20`,
                    color: layer.color,
                  }}
                >
                  {layer.tier} Tier
                </div>

                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  {layer.name}
                </h2>

                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  {getLayerDescription(layer.id)}
                </p>

                <div className="text-sm text-[var(--text-muted)] mb-8">
                  {layer.count}
                </div>

                <ul className="space-y-3 mb-8">
                  {getLayerDetailedFeatures(layer.id).map((feature) => (
                    <li key={feature.title} className="flex gap-3">
                      <span className="text-[var(--success)] mt-1">✓</span>
                      <div>
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {feature.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <ButtonLink href="/pricing" variant="primary">
                  View {layer.tier} Tier
                  <ChevronRight size={16} />
                </ButtonLink>
              </div>

              {/* Visual */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div
                  className="aspect-video rounded-2xl border border-[var(--border-subtle)] relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${layer.color}15 0%, var(--bg-elevated) 100%)`,
                  }}
                >
                  {/* AI-generated layer image */}
                  <Image
                    src={getLayerImage(layer.id)}
                    alt={`${layer.name} visualization`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent opacity-60"
                  />

                  {/* Label overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                      style={{
                        backgroundColor: `${layer.color}40`,
                        color: layer.color,
                      }}
                    >
                      {layer.name}
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div
                    className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: layer.color }}
                  />
                </div>
              </div>
            </div>
          </Section>
        ))}

        {/* CTA */}
        <Section>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Ready to Explore?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Start with the free Community tier and unlock more layers as you grow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonLink href="/register" variant="primary" size="lg">
                Start Free
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary" size="lg">
                Compare Plans
              </ButtonLink>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function getLayerDescription(id: string): string {
  const descriptions: Record<string, string> = {
    infrastructure: "Automatically discover and inventory every server, VM, and network device in your environment. Build your CMDB without agents or manual data entry.",
    applications: "Map running processes and application dependencies to understand how your systems connect. Visualize your application portfolio in 2D and 3D.",
    capabilities: "Define business capabilities and map them to your technology landscape. Understand which applications support which business functions.",
    "value-streams": "Connect your technology investments to business value streams. See how changes in infrastructure impact business outcomes.",
    strategy: "Align IT initiatives with strategic objectives. Get AI-powered insights and executive dashboards for informed decision-making.",
  };
  return descriptions[id] || "";
}

function getLayerDetailedFeatures(id: string): Array<{ title: string; description: string }> {
  const features: Record<string, Array<{ title: string; description: string }>> = {
    infrastructure: [
      { title: "Network Scanning", description: "Agentless discovery using Nmap and WMI" },
      { title: "Asset Inventory", description: "Detailed hardware and OS information" },
      { title: "Server Diagrams", description: "2D visualization of your infrastructure" },
      { title: "Tag Management", description: "Organize assets with custom tags and groups" },
      { title: "Manual Entry", description: "Add assets that can't be auto-discovered" },
    ],
    applications: [
      { title: "Process Discovery", description: "Find all running services and applications" },
      { title: "3D Visualization", description: "Immersive view of your architecture" },
      { title: "Connection Mapping", description: "See how applications communicate" },
      { title: "Scheduled Scans", description: "Keep your data fresh automatically" },
      { title: "CSV Export", description: "Export data for analysis or reporting" },
    ],
    capabilities: [
      { title: "OData API", description: "Full programmatic access to all data" },
      { title: "Vulnerability Detection", description: "CVE scanning and security insights" },
      { title: "SSL Tracking", description: "Monitor certificate expiration dates" },
      { title: "Software Inventory", description: "Installed software across all servers" },
      { title: "AD/LDAP Sync", description: "Integrate with your identity provider" },
    ],
    "value-streams": [
      { title: "Azure Discovery", description: "Map cloud resources automatically" },
      { title: "CIS Compliance", description: "Benchmark against security standards" },
      { title: "SQL Analysis", description: "Database performance and health" },
      { title: "SSO Integration", description: "Azure AD single sign-on" },
      { title: "Priority Support", description: "Faster response times" },
    ],
    strategy: [
      { title: "FactSheets", description: "Enterprise architecture documentation" },
      { title: "Business Capabilities", description: "Map IT to business functions" },
      { title: "LeanIX Sync", description: "Bidirectional EA integration" },
      { title: "ServiceNow CMDB", description: "Sync with your ITSM platform" },
      { title: "AI Insights", description: "LLM-powered recommendations" },
    ],
  };
  return features[id] || [];
}

function getLayerImage(id: string): string {
  const images: Record<string, string> = {
    infrastructure: "/images/layer-infrastructure.png",
    applications: "/images/layer-applications.png",
    capabilities: "/images/layer-capabilities.png",
    "value-streams": "/images/layer-value-streams.png",
    strategy: "/images/layer-strategy.png",
  };
  return images[id] || "/images/layer-infrastructure.png";
}
