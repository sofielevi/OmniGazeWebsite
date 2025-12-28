import {
  Layers,
  ArrowRight,
  GitBranch,
  Target,
  Link2,
  Building2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Callout, TierBadge } from "@/components/docs";

export default function CapabilityMappingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-display text-3xl font-medium">
            Capability Mapping
          </h1>
          <TierBadge tier="professional" />
        </div>
        <p className="text-lg text-[var(--text-secondary)]">
          Connect applications to business capabilities and visualize how technology supports your organization.
        </p>
      </div>

      {/* Overview */}
      <Callout type="info" title="Why Map Capabilities?">
        Capability mapping connects your technical portfolio to business outcomes.
        It answers: &quot;Which applications support each business function?&quot; and
        &quot;What is the technology cost of each capability?&quot;
      </Callout>

      {/* Mapping Process */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Mapping Process
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <StepCard
            number={1}
            icon={Layers}
            title="Define Capabilities"
            description="Create your business capability hierarchy in the Capabilities view."
          />
          <StepCard
            number={2}
            icon={Link2}
            title="Link Applications"
            description="Associate applications with the capabilities they support."
          />
          <StepCard
            number={3}
            icon={Target}
            title="Analyze Coverage"
            description="Identify gaps, overlaps, and investment opportunities."
          />
        </div>
      </section>

      {/* Linking Methods */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          How to Link Applications
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          There are two ways to create capability-application relationships:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <MethodCard
            title="From Capability View"
            description="Open a capability FactSheet and add supporting applications in the relationships section."
            steps={[
              "Navigate to Capabilities",
              "Select a capability",
              "Click 'Add Application'",
              "Search and select applications",
            ]}
          />
          <MethodCard
            title="From Application View"
            description="Open an application FactSheet and specify which capabilities it supports."
            steps={[
              "Navigate to Applications",
              "Select an application",
              "Click 'Add Capability'",
              "Search and select capabilities",
            ]}
          />
        </div>
      </section>

      {/* Visualization */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Capability Map Visualization
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="text-center text-[var(--text-muted)] py-8">
            <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>The Capability Map provides a heatmap visualization showing:</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Application count per capability (color intensity)</li>
              <li>Total cost per capability (hover details)</li>
              <li>Capability health indicators</li>
              <li>Drill-down to sub-capabilities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Analysis Features */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Analysis Features
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <AnalysisCard
            icon={AlertCircle}
            title="Gap Analysis"
            description="Find capabilities with no supporting applications - potential risk areas."
          />
          <AnalysisCard
            icon={Layers}
            title="Overlap Detection"
            description="Identify capabilities with multiple redundant applications."
          />
          <AnalysisCard
            icon={Target}
            title="Cost Attribution"
            description="See aggregated technology cost rolled up to each capability."
          />
          <AnalysisCard
            icon={Building2}
            title="Impact Analysis"
            description="Understand business impact when applications change or fail."
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
                Define your capability hierarchy
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
          <Link
            href="/docs/advanced/value-streams"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <GitBranch className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                Value Streams
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Map end-to-end business flows
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-[var(--amber-400)] text-[var(--bg-deep)] flex items-center justify-center font-medium text-sm">
          {number}
        </div>
        <Icon className="w-5 h-5 text-[var(--amber-400)]" />
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

function MethodCard({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <ol className="space-y-1 text-sm text-[var(--text-muted)]">
        {steps.map((step, i) => (
          <li key={i}>{i + 1}. {step}</li>
        ))}
      </ol>
    </div>
  );
}

function AnalysisCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg">
      <div className="w-8 h-8 bg-[var(--amber-400)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[var(--amber-400)]" />
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-[var(--text-secondary)]">{description}</div>
      </div>
    </div>
  );
}
