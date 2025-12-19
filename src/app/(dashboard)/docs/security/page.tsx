import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Key,
  Server,
  Cloud,
  Lock,
} from "lucide-react";
import { Callout } from "@/components/docs";

export default function SecurityOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">
          Security & Credentials
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Configure secure, least-privilege access for OmniGaze infrastructure scanning.
        </p>
      </div>

      {/* Key Insight */}
      <Callout type="tip" title="Key Insight">
        With proper permissions, WinRM provides access to Event Logs, Cluster Info, and
        IIS Configuration <strong>without local admin</strong>. WinRM delivers 100% of
        required data with the right setup.
      </Callout>

      {/* Quick Decision */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Which Method Should I Use?
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="space-y-4">
            <RecommendationRow
              condition="New deployment or production environment"
              recommendation="WinRM Read-Only"
              href="/docs/security/winrm-setup"
              recommended
            />
            <RecommendationRow
              condition="Already have Azure/M365 with Log Analytics"
              recommendation="Log Analytics"
              href="/docs/security/credential-journey"
            />
            <RecommendationRow
              condition="Quick POC or lab environment"
              recommendation="WMI + Admin (temporary)"
              href="/docs/security/credential-journey"
              warning
            />
            <RecommendationRow
              condition="Transitioning from legacy setup"
              recommendation="WMI Limited → WinRM"
              href="/docs/security/credential-journey"
            />
          </div>
        </div>
      </section>

      {/* Four Methods Overview */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Scanning Methods Overview
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze supports four credential methods, each with different security profiles:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <MethodCard
            icon={AlertTriangle}
            title="WMI + Local Admin"
            status="Legacy"
            statusColor="text-red-400"
            score="4/10"
            description="Full access but high security risk. Not recommended for new deployments."
            features={["Full capability", "High risk", "Avoid in production"]}
          />
          <MethodCard
            icon={Key}
            title="WMI Limited"
            status="Transitional"
            statusColor="text-yellow-400"
            score="5/10"
            description="Reduced privileges via WMI namespace permissions. Stepping stone to WinRM."
            features={["Medium security", "Complex setup", "Limited features"]}
          />
          <MethodCard
            icon={Shield}
            title="WinRM Read-Only"
            status="Recommended"
            statusColor="text-green-400"
            score="9.5/10"
            description="Best balance of capability and security. Single-command setup."
            features={["Full capability", "Low risk", "Easy setup"]}
            highlighted
          />
          <MethodCard
            icon={Cloud}
            title="Log Analytics"
            status="Cloud-Native"
            statusColor="text-blue-400"
            score="8/10"
            description="Zero-touch passive scanning via Azure. No credentials on target systems."
            features={["Zero credentials", "Historical data", "Requires Azure"]}
          />
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Quick Comparison</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Factor</th>
                <th className="text-center px-4 py-3 font-medium">WMI Admin</th>
                <th className="text-center px-4 py-3 font-medium">WMI Limited</th>
                <th className="text-center px-4 py-3 font-medium text-[var(--amber-400)]">WinRM</th>
                <th className="text-center px-4 py-3 font-medium">Log Analytics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <ComparisonRow
                label="Admin Required"
                values={["Yes", "No", "No", "No"]}
                highlights={[false, true, true, true]}
              />
              <ComparisonRow
                label="Attack Surface"
                values={["High", "Medium", "Low", "Minimal"]}
                highlights={[false, false, true, true]}
              />
              <ComparisonRow
                label="Setup Complexity"
                values={["Medium", "High", "Low", "Medium"]}
                highlights={[false, false, true, false]}
              />
              <ComparisonRow
                label="Firewall Ports"
                values={["Many", "Many", "One", "None"]}
                highlights={[false, false, true, true]}
              />
              <ComparisonRow
                label="Event Logs"
                values={["Full", "No", "Full", "Yes"]}
                highlights={[true, false, true, true]}
              />
              <ComparisonRow
                label="Cluster Info"
                values={["Full", "No", "Full", "Partial"]}
                highlights={[true, false, true, false]}
              />
              <ComparisonRow
                label="IIS Config"
                values={["Full", "No", "Full", "No"]}
                highlights={[true, false, true, false]}
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Line */}
      <section className="bg-gradient-to-br from-[var(--amber-400)]/10 to-transparent border border-[var(--amber-400)]/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[var(--amber-400)]/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-[var(--amber-400)]" />
          </div>
          <div>
            <h3 className="font-display text-lg font-medium mb-2">Bottom Line</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              <strong>WinRM with read-only access</strong> provides 100% of scanning
              capability (including Event Logs, Cluster Info, and IIS) with minimal
              security exposure and a single-command setup.
            </p>
            <Link
              href="/docs/security/winrm-setup"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--amber-400)] text-[var(--bg-deep)] font-medium text-sm hover:bg-[var(--amber-500)] transition-colors"
            >
              Get Started with WinRM
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Documentation</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <NextStepCard
            href="/docs/security/credential-journey"
            title="Route to Least Privilege"
            description="Understand the full security journey and comparison"
          />
          <NextStepCard
            href="/docs/security/winrm-setup"
            title="WinRM Setup Guide"
            description="Step-by-step configuration with our automated script"
          />
          <NextStepCard
            href="/docs/security/troubleshooting"
            title="Troubleshooting"
            description="Common issues and diagnostic commands"
          />
        </div>
      </section>
    </div>
  );
}

function MethodCard({
  icon: Icon,
  title,
  status,
  statusColor,
  score,
  description,
  features,
  highlighted = false,
}: {
  icon: React.ElementType;
  title: string;
  status: string;
  statusColor: string;
  score: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        highlighted
          ? "bg-[var(--amber-400)]/5 border-[var(--amber-400)]/30"
          : "bg-[var(--bg-card)] border-[var(--border-subtle)]"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              highlighted ? "bg-[var(--amber-400)]/20" : "bg-[var(--bg-elevated)]"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${highlighted ? "text-[var(--amber-400)]" : "text-[var(--text-secondary)]"}`}
            />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <span className={`text-xs ${statusColor}`}>{status}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-mono font-medium">{score}</div>
          <div className="text-xs text-[var(--text-muted)]">Overall</div>
        </div>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {features.map((feature, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

function RecommendationRow({
  condition,
  recommendation,
  href,
  recommended = false,
  warning = false,
}: {
  condition: string;
  recommendation: string;
  href: string;
  recommended?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-[var(--border-subtle)] last:border-0">
      <span className="text-sm text-[var(--text-secondary)]">{condition}</span>
      <Link
        href={href}
        className={`inline-flex items-center gap-2 text-sm font-medium ${
          recommended
            ? "text-[var(--amber-400)]"
            : warning
            ? "text-yellow-400"
            : "text-[var(--text-primary)]"
        } hover:underline`}
      >
        {recommended && <CheckCircle className="w-4 h-4" />}
        {warning && <AlertTriangle className="w-4 h-4" />}
        {recommendation}
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

function ComparisonRow({
  label,
  values,
  highlights,
}: {
  label: string;
  values: string[];
  highlights: boolean[];
}) {
  return (
    <tr>
      <td className="px-4 py-2 text-[var(--text-secondary)]">{label}</td>
      {values.map((value, i) => (
        <td
          key={i}
          className={`px-4 py-2 text-center ${
            highlights[i] ? "text-green-400 font-medium" : ""
          } ${i === 2 ? "bg-[var(--amber-400)]/5" : ""}`}
        >
          {value}
        </td>
      ))}
    </tr>
  );
}

function NextStepCard({
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
      className="block p-4 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-elevated)]/80 transition-colors group"
    >
      <h4 className="font-medium mb-1 group-hover:text-[var(--amber-400)] transition-colors">
        {title}
      </h4>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </Link>
  );
}
