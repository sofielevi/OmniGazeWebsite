import {
  GitBranch,
  ArrowRight,
  Layers,
  Building2,
  Users,
  Target,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Callout, TierBadge } from "@/components/docs";

export default function ValueStreamsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-display text-3xl font-medium">
            Value Streams
          </h1>
          <TierBadge tier="business" />
        </div>
        <p className="text-lg text-[var(--text-secondary)]">
          Model end-to-end business flows that deliver value to customers, from initial request to final delivery.
        </p>
      </div>

      {/* Key Concept */}
      <Callout type="info" title="What are Value Streams?">
        Value streams represent the sequence of activities that create and deliver value to customers.
        Unlike capabilities (which describe <em>what</em> you do), value streams describe <em>how</em> work flows
        through your organization from trigger to outcome.
      </Callout>

      {/* Value Stream Pyramid Position */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Position in the Pyramid
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="space-y-3">
            <PyramidRow layer="Strategy" count="1-4" active={false} />
            <PyramidRow layer="Value Streams" count="10-20" active={true} />
            <PyramidRow layer="Business Capabilities" count="100-200" active={false} />
            <PyramidRow layer="Applications" count="1,000-2,000" active={false} />
            <PyramidRow layer="Infrastructure" count="10,000+" active={false} />
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-4">
            Value streams sit between Strategy and Capabilities, connecting strategic goals to operational execution.
          </p>
        </div>
      </section>

      {/* Value Stream Example */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Example: Order-to-Cash
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2">
            <StreamStage name="Order Received" icon={Users} />
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
            <StreamStage name="Order Validated" icon={Target} />
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
            <StreamStage name="Fulfillment" icon={Building2} />
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
            <StreamStage name="Shipping" icon={TrendingUp} />
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
            <StreamStage name="Payment" icon={Clock} />
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
            <p className="text-sm text-[var(--text-secondary)]">
              Each stage maps to one or more business capabilities and is supported by specific applications.
            </p>
          </div>
        </div>
      </section>

      {/* Value Stream Properties */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Value Stream Properties
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <PropertyCard
            title="Stages"
            description="Sequential steps from trigger event to value delivery."
          />
          <PropertyCard
            title="Capabilities"
            description="Business capabilities required at each stage."
          />
          <PropertyCard
            title="Metrics"
            description="Lead time, cycle time, and throughput measurements."
          />
          <PropertyCard
            title="Stakeholders"
            description="Customers, internal teams, and partners involved."
          />
        </div>
      </section>

      {/* Common Value Streams */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Common Value Streams
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Value Stream</th>
                <th className="text-left px-4 py-3 font-medium">Trigger</th>
                <th className="text-left px-4 py-3 font-medium">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <ValueStreamRow
                name="Order-to-Cash"
                trigger="Customer order"
                outcome="Payment received"
              />
              <ValueStreamRow
                name="Hire-to-Retire"
                trigger="Job requisition"
                outcome="Employee offboarded"
              />
              <ValueStreamRow
                name="Procure-to-Pay"
                trigger="Purchase request"
                outcome="Supplier paid"
              />
              <ValueStreamRow
                name="Issue-to-Resolution"
                trigger="Support ticket"
                outcome="Issue resolved"
              />
              <ValueStreamRow
                name="Concept-to-Launch"
                trigger="Product idea"
                outcome="Product in market"
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Benefits of Value Stream Mapping
        </h2>
        <div className="space-y-3">
          <BenefitItem
            title="End-to-End Visibility"
            description="See the complete flow from customer request to value delivery."
          />
          <BenefitItem
            title="Bottleneck Identification"
            description="Find stages causing delays or quality issues."
          />
          <BenefitItem
            title="Investment Prioritization"
            description="Focus technology investments on high-value streams."
          />
          <BenefitItem
            title="Cross-Functional Alignment"
            description="Align teams around customer outcomes rather than silos."
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Next Steps</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/capabilities/overview"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <Layers className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                Business Capabilities
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Map capabilities to stages
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
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
                Connect all EA layers
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function PyramidRow({
  layer,
  count,
  active,
}: {
  layer: string;
  count: string;
  active: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 p-2 rounded ${active ? "bg-[var(--amber-400)]/10 border border-[var(--amber-400)]/30" : ""}`}>
      <div className={`w-3 h-3 rounded ${active ? "bg-[var(--amber-400)]" : "bg-purple-500"}`} />
      <span className={`flex-1 ${active ? "font-medium text-[var(--amber-400)]" : ""}`}>{layer}</span>
      <span className="text-sm text-[var(--text-muted)]">{count}</span>
    </div>
  );
}

function StreamStage({
  name,
  icon: Icon,
}: {
  name: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[80px]">
      <div className="w-10 h-10 bg-[var(--amber-400)]/20 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-[var(--amber-400)]" />
      </div>
      <span className="text-xs text-center text-[var(--text-secondary)]">{name}</span>
    </div>
  );
}

function PropertyCard({
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

function ValueStreamRow({
  name,
  trigger,
  outcome,
}: {
  name: string;
  trigger: string;
  outcome: string;
}) {
  return (
    <tr>
      <td className="px-4 py-3 font-medium">{name}</td>
      <td className="px-4 py-3 text-[var(--text-secondary)]">{trigger}</td>
      <td className="px-4 py-3 text-[var(--text-secondary)]">{outcome}</td>
    </tr>
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
      <GitBranch className="w-5 h-5 text-[var(--amber-400)] flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-[var(--text-secondary)]">{description}</div>
      </div>
    </div>
  );
}
