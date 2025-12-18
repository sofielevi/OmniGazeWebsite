import { Layers, Database, GitBranch, Building } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Architecture Mapping",
  description: "Enterprise architecture features in OmniGaze - FactSheets, capabilities, and integrations.",
};

export default function ArchitecturePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-medium mb-4">Architecture Mapping</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Bridge the gap from infrastructure to strategy with OmniGaze&apos;s enterprise
          architecture features.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--pyramid-strategy)]/20 text-[var(--pyramid-strategy)] text-xs font-medium">
          Enterprise Tier Feature
        </div>
      </div>

      {/* The Pyramid */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-[var(--amber-400)]" />
          The OmniGaze Pyramid
        </h2>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <p className="text-[var(--text-secondary)] mb-6">
            OmniGaze uniquely connects all layers of your IT landscape:
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-[var(--pyramid-strategy)]/20 border-l-4 border-[var(--pyramid-strategy)]">
              <h3 className="font-medium text-[var(--pyramid-strategy)]">Strategy</h3>
              <p className="text-sm text-[var(--text-secondary)]">1-4 strategic initiatives driving your organization</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--pyramid-value-streams)]/20 border-l-4 border-[var(--pyramid-value-streams)]">
              <h3 className="font-medium text-[var(--pyramid-value-streams)]">Value Streams</h3>
              <p className="text-sm text-[var(--text-secondary)]">10-20 end-to-end business processes</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--pyramid-capabilities)]/20 border-l-4 border-[var(--pyramid-capabilities)]">
              <h3 className="font-medium text-[var(--pyramid-capabilities)]">Business Capabilities</h3>
              <p className="text-sm text-[var(--text-secondary)]">100-200 what your organization can do</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--pyramid-applications)]/20 border-l-4 border-[var(--pyramid-applications)]">
              <h3 className="font-medium text-[var(--pyramid-applications)]">Applications</h3>
              <p className="text-sm text-[var(--text-secondary)]">1,000-2,000 software applications</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--pyramid-infrastructure)]/20 border-l-4 border-[var(--pyramid-infrastructure)]">
              <h3 className="font-medium text-[var(--pyramid-infrastructure)]">Infrastructure</h3>
              <p className="text-sm text-[var(--text-secondary)]">10,000+ servers, networks, and devices</p>
            </div>
          </div>
        </div>
      </section>

      {/* FactSheets */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Database className="w-6 h-6 text-[var(--amber-400)]" />
          FactSheets
        </h2>

        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <p className="text-[var(--text-secondary)] mb-4">
              FactSheets are structured records that capture metadata about your IT assets
              at every layer of the pyramid. Each discovered server, application, or service
              automatically gets a FactSheet.
            </p>

            <h3 className="font-medium mb-3">FactSheet Types</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
                <h4 className="text-sm font-medium mb-1">IT Component</h4>
                <p className="text-xs text-[var(--text-muted)]">Servers, databases, networks</p>
              </div>
              <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
                <h4 className="text-sm font-medium mb-1">Application</h4>
                <p className="text-xs text-[var(--text-muted)]">Software and services</p>
              </div>
              <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
                <h4 className="text-sm font-medium mb-1">Business Capability</h4>
                <p className="text-xs text-[var(--text-muted)]">What the business can do</p>
              </div>
              <div className="p-3 bg-[var(--bg-elevated)] rounded-lg">
                <h4 className="text-sm font-medium mb-1">User Group</h4>
                <p className="text-xs text-[var(--text-muted)]">Teams and departments</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Relationships</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              FactSheets can be linked together to show dependencies and ownership:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• Application → IT Components (runs on)</li>
              <li>• Business Capability → Applications (supported by)</li>
              <li>• User Group → Applications (uses)</li>
              <li>• IT Component → IT Component (connects to)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Business Capabilities */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Building className="w-6 h-6 text-[var(--amber-400)]" />
          Business Capability Mapping
        </h2>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <p className="text-[var(--text-secondary)] mb-4">
            Define your business capabilities and map them to the applications and
            infrastructure that support them. This enables:
          </p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li>• <strong>Impact analysis:</strong> See which capabilities are affected by infrastructure changes</li>
            <li>• <strong>Rationalization:</strong> Identify redundant applications supporting the same capability</li>
            <li>• <strong>Investment planning:</strong> Prioritize infrastructure upgrades based on business value</li>
            <li>• <strong>Risk assessment:</strong> Understand single points of failure for critical capabilities</li>
          </ul>
        </div>
      </section>

      {/* Integrations */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-[var(--amber-400)]" />
          EA Tool Integrations
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">LeanIX</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Bi-directional sync with LeanIX to enrich your EA repository with
              auto-discovered infrastructure data.
            </p>
            <ul className="space-y-1 text-xs text-[var(--text-muted)]">
              <li>• Push IT Components to LeanIX</li>
              <li>• Pull Business Capabilities from LeanIX</li>
              <li>• Automatic relationship mapping</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">ServiceNow CMDB</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Keep your ServiceNow CMDB accurate with OmniGaze&apos;s discovery data.
            </p>
            <ul className="space-y-1 text-xs text-[var(--text-muted)]">
              <li>• CI reconciliation</li>
              <li>• Relationship discovery</li>
              <li>• Scheduled sync</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Ardoq</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Export OmniGaze data to Ardoq for advanced EA modeling and analysis.
            </p>
            <ul className="space-y-1 text-xs text-[var(--text-muted)]">
              <li>• Component export</li>
              <li>• Reference mapping</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Custom Export</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Use the OData API to build custom integrations with any EA tool.
            </p>
            <Link
              href="/docs/api"
              className="text-sm text-[var(--amber-400)] hover:underline"
            >
              View API documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg mb-2">Getting Started with EA Features</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Architecture mapping features require the Enterprise tier. Contact us to
          discuss your requirements and get started.
        </p>
        <Link
          href="/pricing"
          className="text-sm text-[var(--amber-400)] hover:underline"
        >
          View Enterprise pricing →
        </Link>
      </section>
    </div>
  );
}
