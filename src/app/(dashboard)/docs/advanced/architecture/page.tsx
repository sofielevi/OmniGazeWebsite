import {
  GitBranch,
  Box,
  Server,
  AppWindow,
  Layers,
  Building2,
  ArrowRight,
  Network,
  Database,
} from "lucide-react";
import Link from "next/link";
import { Callout, TierBadge } from "@/components/docs";

export default function ArchitectureMappingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-display text-3xl font-medium">
            Architecture Mapping
          </h1>
          <TierBadge tier="professional" />
        </div>
        <p className="text-lg text-[var(--text-secondary)]">
          Build a complete Enterprise Architecture model by connecting infrastructure, applications, and business capabilities.
        </p>
      </div>

      {/* Key Concept */}
      <Callout type="info" title="The OmniGaze Pyramid">
        OmniGaze bridges the gap between IT operations and enterprise architecture by connecting
        <strong> infrastructure</strong> (10,000+ assets) through <strong>applications</strong> (1,000-2,000)
        to <strong>business capabilities</strong> (100-200) and ultimately to <strong>strategy</strong> (1-4 initiatives).
      </Callout>

      {/* FactSheet Types */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          FactSheet Types Overview
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze uses FactSheets as the core entity for architecture documentation:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <FactSheetType
            icon={Server}
            title="WindowsNode"
            description="Observability data for Windows servers including processes, volumes, and configurations."
            color="blue"
            fields={["WMIConnected", "Volumes", "Processes", "EventLogs"]}
          />
          <FactSheetType
            icon={AppWindow}
            title="ApplicationFactSheet"
            description="Business applications with technical details, support info, and process links."
            color="green"
            fields={["LinkedProcessNames", "IsBusinessApplication", "DatabaseLinks"]}
          />
          <FactSheetType
            icon={Layers}
            title="BusinessCapabilityFactSheet"
            description="Business capabilities with KPIs, risk assessments, and cost aggregation."
            color="purple"
            fields={["KPIs", "RiskAssessments", "ValueChains", "CapabilityType"]}
          />
          <FactSheetType
            icon={Building2}
            title="Base FactSheet"
            description="Common properties shared by all FactSheet types."
            color="amber"
            fields={["DisplayName", "Responsible", "LifeCycle", "Cost"]}
          />
        </div>
      </section>

      {/* Relationship Types */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Relationship Types
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Two distinct relationship types connect entities in OmniGaze:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <RelationshipCard
            title="HierarchyChildren"
            type="One-to-Many"
            description="Defines the visual tree structure for hierarchical views like the Capability Map."
            usage="Used for parent-child trees where each child has exactly one parent."
            example="Business Capability → Sub-Capability → Sub-Sub-Capability"
          />
          <RelationshipCard
            title="ChildFactSheets"
            type="Many-to-Many"
            description="General dependency relationships between any FactSheet types."
            usage="Used for modeling dependencies, data flows, and support relationships."
            example="Application → IT Component → Database"
          />
        </div>
        <Callout type="tip" title="When to Use Which">
          Use <code>HierarchyChildren</code> for building visual trees. Use <code>ChildFactSheets</code>
          for impact analysis and dependency mapping.
        </Callout>
      </section>

      {/* Architecture Diagram */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Architecture Layers
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="space-y-3">
            <LayerRow
              layer="Strategy"
              count="1-4"
              ratio=""
              color="purple"
              description="Strategic initiatives and goals"
            />
            <LayerRow
              layer="Value Streams"
              count="10-20"
              ratio="5:1"
              color="purple-light"
              description="End-to-end business flows"
            />
            <LayerRow
              layer="Business Capabilities"
              count="100-200"
              ratio="20:1"
              color="violet"
              description="What the business does"
            />
            <LayerRow
              layer="Applications"
              count="1,000-2,000"
              ratio="5:1"
              color="blue"
              description="Software supporting capabilities"
            />
            <LayerRow
              layer="Infrastructure"
              count="10,000+"
              ratio="10:1"
              color="dark-blue"
              description="Servers, networks, databases"
            />
          </div>
        </div>
      </section>

      {/* Common Properties */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Common FactSheet Properties
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          All FactSheet types inherit these base properties:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Property</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <PropertyRow name="DisplayName" type="string" description="User-friendly name" />
              <PropertyRow name="Id" type="Guid" description="Unique identifier" />
              <PropertyRow name="Responsible" type="string" description="Owner/accountable person" />
              <PropertyRow name="ResponsibleMail" type="string" description="Owner email" />
              <PropertyRow name="RichDescription" type="string" description="Detailed description" />
              <PropertyRow name="LifeCycle" type="enum" description="Active, Deprecated, Retired" />
              <PropertyRow name="Cost" type="decimal" description="Operational cost" />
              <PropertyRow name="CurrentMaturity" type="int" description="Current maturity level" />
              <PropertyRow name="TargetMaturity" type="int" description="Target maturity level" />
              <PropertyRow name="CreatedBy / ModifiedBy" type="string" description="Audit fields" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Integration Points */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          EA Tool Integrations
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze integrates with enterprise architecture platforms:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <IntegrationCard
            title="LeanIX"
            description="Bi-directional sync of FactSheets, IT Components, and Application portfolios."
            features={["FactSheet creation", "Vendor mapping", "Executable linking"]}
          />
          <IntegrationCard
            title="ServiceNow"
            description="CMDB synchronization and incident management integration."
            features={["CI creation", "Incident linking", "Change management"]}
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Next Steps</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/api/rest"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <Network className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                REST API
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Access architecture data via API
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
          <Link
            href="/docs/api/odata"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <Database className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                OData Endpoints
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Query with OData syntax
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FactSheetType({
  icon: Icon,
  title,
  description,
  color,
  fields,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  fields: string[];
}) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    purple: "bg-purple-500/20 text-purple-400",
    amber: "bg-[var(--amber-400)]/20 text-[var(--amber-400)]",
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {fields.map((field) => (
          <code key={field} className="text-xs px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded">
            {field}
          </code>
        ))}
      </div>
    </div>
  );
}

function RelationshipCard({
  title,
  type,
  description,
  usage,
  example,
}: {
  title: string;
  type: string;
  description: string;
  usage: string;
  example: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{title}</h3>
        <span className="text-xs px-2 py-1 bg-[var(--bg-elevated)] rounded">{type}</span>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-2">{description}</p>
      <p className="text-sm text-[var(--text-muted)] mb-2">{usage}</p>
      <div className="flex items-center gap-2 text-xs">
        <GitBranch className="w-3 h-3 text-[var(--amber-400)]" />
        <span className="text-[var(--text-muted)]">{example}</span>
      </div>
    </div>
  );
}

function LayerRow({
  layer,
  count,
  ratio,
  color,
  description,
}: {
  layer: string;
  count: string;
  ratio: string;
  color: string;
  description: string;
}) {
  const colorClasses: Record<string, string> = {
    "purple": "bg-purple-600",
    "purple-light": "bg-purple-500",
    "violet": "bg-violet-500",
    "blue": "bg-blue-500",
    "dark-blue": "bg-blue-700",
  };

  return (
    <div className="flex items-center gap-4">
      <div className={`w-3 h-3 rounded ${colorClasses[color]}`} />
      <div className="flex-1 grid grid-cols-4 gap-4 items-center">
        <span className="font-medium">{layer}</span>
        <span className="text-sm text-[var(--text-secondary)]">{count}</span>
        <span className="text-sm text-[var(--text-muted)]">{ratio}</span>
        <span className="text-sm text-[var(--text-muted)]">{description}</span>
      </div>
    </div>
  );
}

function PropertyRow({
  name,
  type,
  description,
}: {
  name: string;
  type: string;
  description: string;
}) {
  return (
    <tr>
      <td className="px-4 py-3">
        <code className="text-[var(--amber-400)]">{name}</code>
      </td>
      <td className="px-4 py-3 text-[var(--text-muted)]">{type}</td>
      <td className="px-4 py-3 text-[var(--text-secondary)]">{description}</td>
    </tr>
  );
}

function IntegrationCard({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {features.map((feature) => (
          <span key={feature} className="text-xs px-2 py-1 bg-[var(--bg-elevated)] rounded">
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}
