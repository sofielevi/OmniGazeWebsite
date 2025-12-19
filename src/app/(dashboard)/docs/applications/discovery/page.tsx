import {
  AppWindow,
  Server,
  Cpu,
  Activity,
  Filter,
  Search,
  Layers,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Callout, TierBadge } from "@/components/docs";

export default function AppDiscoveryPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-display text-3xl font-medium">
            Application Discovery
          </h1>
          <TierBadge tier="starter" />
        </div>
        <p className="text-lg text-[var(--text-secondary)]">
          Automatically detect and inventory applications running across your infrastructure.
        </p>
      </div>

      {/* Key Concept */}
      <Callout type="tip" title="How It Works">
        OmniGaze discovers applications by analyzing running processes across all scanned servers,
        then enriches this data with vendor information, categorization, and dependency mapping.
      </Callout>

      {/* Discovery Sources */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Discovery Sources
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Applications are detected from multiple data sources for comprehensive coverage:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <SourceCard
            icon={Cpu}
            title="Windows Processes"
            description="WMI/WinRM queries capture all running processes including CPU, memory, and command line."
            features={["Process name & path", "Resource usage", "Parent relationships"]}
          />
          <SourceCard
            icon={Server}
            title="Linux Processes"
            description="SSH-based discovery using top/ps commands for complete Linux visibility."
            features={["User context", "CPU & memory %", "Process trees"]}
          />
          <SourceCard
            icon={Activity}
            title="Network Connections"
            description="Track application communications and dependencies through network flow analysis."
            features={["Inbound/outbound", "Port mappings", "Dependency chains"]}
          />
          <SourceCard
            icon={AppWindow}
            title="Installed Programs"
            description="Registry and package manager data for software inventory."
            features={["Version tracking", "Install dates", "Vendor info"]}
          />
        </div>
      </section>

      {/* Process Categories */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Process Categories
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Discovered processes are automatically categorized for easier management:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
                <th className="text-left px-4 py-3 font-medium">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <tr>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                    Applications
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  User-installed business software
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  Chrome, SAP, Office
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">
                    Middleware
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Service buses, message queues, app servers
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  RabbitMQ, IIS, Tomcat
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded text-xs">
                    Operating System
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Core OS processes and services
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  svchost, systemd, kernel
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                    Uncategorized
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Pending classification by admin
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  Custom scripts, new apps
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Application Inventory */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Application Inventory View
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          The Application Inventory provides a central view of all discovered applications:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <InventoryFeature
              icon={Search}
              title="Search & Filter"
              description="Find applications by name, vendor, category, or hosting server."
            />
            <InventoryFeature
              icon={Layers}
              title="Group by Server"
              description="See which applications run on each server."
            />
            <InventoryFeature
              icon={Activity}
              title="Resource Usage"
              description="Track CPU, memory, and I/O for each application."
            />
          </div>
        </div>
      </section>

      {/* Filtering Applications */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Filtering Applications
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Use filters to focus on specific applications:
        </p>
        <div className="space-y-3">
          <FilterOption
            filter="Category"
            description="Show only Applications, Middleware, or OS processes"
          />
          <FilterOption
            filter="Server"
            description="Filter by specific servers or server groups"
          />
          <FilterOption
            filter="Vendor"
            description="Group by software vendor (Microsoft, Oracle, etc.)"
          />
          <FilterOption
            filter="Business Apps"
            description="Show only apps marked as IsBusinessApplication"
          />
          <FilterOption
            filter="High Resource"
            description="Find applications consuming significant CPU or memory"
          />
        </div>
      </section>

      {/* Data Enrichment */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Data Enrichment
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze enriches discovered processes with additional context:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-4">
          <EnrichmentItem
            title="Process Library"
            description="Automatic lookup of vendor, description, and category from OmniGaze's process database."
          />
          <EnrichmentItem
            title="Dependency Mapping"
            description="Track network connections between applications to understand dependencies."
          />
          <EnrichmentItem
            title="Resource Aggregation"
            description="Calculate total resource usage across all instances of an application."
          />
          <EnrichmentItem
            title="ML Classification"
            description="Machine learning-based categorization for unknown processes."
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Next Steps</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/applications/mapping"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <AppWindow className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                Application Mapping
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Link processes to FactSheets
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
          <Link
            href="/docs/infrastructure/scanning"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <Server className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                Network Scanning
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Discover more servers
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SourceCard({
  icon: Icon,
  title,
  description,
  features,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[var(--amber-400)]/20 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--amber-400)]" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {features.map((feature) => (
          <span
            key={feature}
            className="text-xs px-2 py-1 bg-[var(--bg-elevated)] rounded"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

function InventoryFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-[var(--amber-400)]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
        <Icon className="w-6 h-6 text-[var(--amber-400)]" />
      </div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

function FilterOption({
  filter,
  description,
}: {
  filter: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg">
      <Filter className="w-4 h-4 text-[var(--amber-400)]" />
      <div>
        <span className="font-medium">{filter}:</span>{" "}
        <span className="text-[var(--text-secondary)]">{description}</span>
      </div>
    </div>
  );
}

function EnrichmentItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-[var(--text-secondary)]">{description}</div>
      </div>
    </div>
  );
}
