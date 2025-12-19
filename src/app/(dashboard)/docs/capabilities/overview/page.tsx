import {
  Layers,
  Building2,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Target,
  ArrowRight,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Callout, TierBadge } from "@/components/docs";

export default function BusinessCapabilitiesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-display text-3xl font-medium">
            Business Capabilities
          </h1>
          <TierBadge tier="professional" />
        </div>
        <p className="text-lg text-[var(--text-secondary)]">
          Define and map your organization&apos;s business capabilities to understand how IT supports business outcomes.
        </p>
      </div>

      {/* Key Concept */}
      <Callout type="info" title="What are Business Capabilities?">
        Business capabilities describe <strong>what</strong> your organization does, not <strong>how</strong> it does it.
        They represent stable functions like &quot;Invoice Processing&quot; or &quot;Customer Onboarding&quot; that remain
        constant even as the underlying technology changes.
      </Callout>

      {/* Capability Hierarchy */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Capability Hierarchy
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Capabilities are organized in a hierarchical structure, typically 2-4 levels deep:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="space-y-2">
            {/* Level 0 */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded" />
              <span className="font-medium">Customer Management</span>
              <span className="text-xs text-[var(--text-muted)]">Level 0</span>
            </div>
            {/* Level 1 */}
            <div className="ml-6 space-y-2">
              <HierarchyItem level={1} name="Customer Acquisition" />
              <div className="ml-6 space-y-2">
                <HierarchyItem level={2} name="Lead Generation" />
                <HierarchyItem level={2} name="Sales Pipeline" />
              </div>
              <HierarchyItem level={1} name="Customer Service" />
              <div className="ml-6 space-y-2">
                <HierarchyItem level={2} name="Support Ticketing" />
                <HierarchyItem level={2} name="Customer Feedback" />
              </div>
              <HierarchyItem level={1} name="Customer Retention" />
            </div>
          </div>
        </div>
        <p className="text-sm text-[var(--text-muted)] mt-3">
          Use <code>HierarchyChildren</code> for the visual tree structure, <code>ChildFactSheets</code> for dependencies.
        </p>
      </section>

      {/* FactSheet Structure */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          BusinessCapabilityFactSheet Fields
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldCard
            icon={Building2}
            title="Core Properties"
            fields={[
              "DisplayName - Capability name",
              "RichDescription - Purpose and scope",
              "CapabilityType - Business, Technical, Strategic",
              "LifeCycle - Current status",
            ]}
          />
          <FieldCard
            icon={Target}
            title="Performance"
            fields={[
              "KPIs - Key performance indicators",
              "CurrentMaturity - Current state",
              "TargetMaturity - Desired state",
              "Cost - Aggregated OpEx",
            ]}
          />
          <FieldCard
            icon={AlertTriangle}
            title="Risk & Compliance"
            fields={[
              "RiskAssessments - Risk evaluations",
              "ComplianceControls - Regulatory requirements",
              "Criticality - Business importance",
            ]}
          />
          <FieldCard
            icon={Layers}
            title="Relationships"
            fields={[
              "ValueChains - Linked value chains",
              "HierarchyChildren - Sub-capabilities",
              "ChildFactSheets - Dependencies",
            ]}
          />
        </div>
      </section>

      {/* Linking Applications */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Linking Applications to Capabilities
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Connect your application portfolio to business capabilities to understand technology support:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Layers className="w-8 h-8 text-purple-400" />
              </div>
              <div className="font-medium">Capability</div>
              <div className="text-sm text-[var(--text-muted)]">Invoice Processing</div>
            </div>
            <ChevronRight className="w-6 h-6 text-[var(--text-muted)]" />
            <div className="text-center">
              <div className="text-sm text-[var(--text-muted)] mb-2">Supported by</div>
              <div className="flex gap-2">
                <AppBadge name="SAP" />
                <AppBadge name="DocuSign" />
                <AppBadge name="Oracle DB" />
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[var(--text-muted)]" />
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-8 h-8 text-blue-400" />
              </div>
              <div className="font-medium">Total Cost</div>
              <div className="text-sm text-[var(--text-muted)]">€45,000/year</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost & Filtering */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Cost Visualization
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          The cost shown for each capability is the aggregated operational expenditure of all supporting applications:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Cost Range</th>
                <th className="text-left px-4 py-3 font-medium">Amount</th>
                <th className="text-left px-4 py-3 font-medium">Indicator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <tr>
                <td className="px-4 py-3">None</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">€0</td>
                <td className="px-4 py-3">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Low</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">€1 - €9,999</td>
                <td className="px-4 py-3 text-green-400">$</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Medium</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">€10,000 - €49,999</td>
                <td className="px-4 py-3 text-yellow-400">$$</td>
              </tr>
              <tr>
                <td className="px-4 py-3">High</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">€50,000+</td>
                <td className="px-4 py-3 text-red-400">$$$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Filtering */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Hierarchy View Filters
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          The Business Capability Hierarchy view supports filtering by:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <FilterCard
            title="Cost Range"
            description="Show capabilities by aggregated cost (Low, Medium, High)"
          />
          <FilterCard
            title="Risk Level"
            description="Filter by risk assessment severity"
          />
          <FilterCard
            title="KPI Status"
            description="Show capabilities meeting/missing KPI targets"
          />
          <FilterCard
            title="Capability Type"
            description="Business, Technical, Strategic, Compliance"
          />
        </div>
        <Callout type="tip" title="Filter Behavior">
          When filtering, matching capabilities show along with their full hierarchical context -
          both parent capabilities (up to root) and all child capabilities are displayed.
        </Callout>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Benefits of Capability Mapping
        </h2>
        <div className="space-y-3">
          <BenefitItem
            title="Investment Visibility"
            description="See exactly how much IT spend supports each business function."
          />
          <BenefitItem
            title="Gap Analysis"
            description="Identify capabilities lacking adequate technology support."
          />
          <BenefitItem
            title="Rationalization"
            description="Find overlapping applications supporting the same capability."
          />
          <BenefitItem
            title="Impact Analysis"
            description="Understand business impact of application changes or outages."
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Next Steps</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/advanced/architecture"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <Building2 className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                Architecture Mapping
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Build your EA model
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
          <Link
            href="/docs/api/odata"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <TrendingUp className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                OData API
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Query capabilities programmatically
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function HierarchyItem({ level, name }: { level: number; name: string }) {
  const colors = ["bg-purple-400", "bg-purple-300", "bg-purple-200"];
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 ${colors[level] || colors[2]} rounded`} />
      <span className="text-sm text-[var(--text-secondary)]">{name}</span>
    </div>
  );
}

function FieldCard({
  icon: Icon,
  title,
  fields,
}: {
  icon: React.ElementType;
  title: string;
  fields: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[var(--amber-400)]/20 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--amber-400)]" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <ul className="space-y-1 text-sm">
        {fields.map((field) => (
          <li key={field} className="text-[var(--text-secondary)]">
            • {field}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppBadge({ name }: { name: string }) {
  return (
    <span className="px-2 py-1 bg-[var(--bg-elevated)] rounded text-sm">
      {name}
    </span>
  );
}

function FilterCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg">
      <div className="font-medium mb-1">{title}</div>
      <div className="text-sm text-[var(--text-secondary)]">{description}</div>
    </div>
  );
}

function BenefitItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg">
      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-[var(--text-secondary)]">{description}</div>
      </div>
    </div>
  );
}
