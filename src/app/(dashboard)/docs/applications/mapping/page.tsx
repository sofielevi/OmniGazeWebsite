import {
  AppWindow,
  Link2,
  FileText,
  Tag,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Settings,
  Database,
  Cloud,
} from "lucide-react";
import Link from "next/link";
import { Callout, TierBadge } from "@/components/docs";

export default function AppMappingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-display text-3xl font-medium">
            Application Mapping
          </h1>
          <TierBadge tier="starter" />
        </div>
        <p className="text-lg text-[var(--text-secondary)]">
          Create Application FactSheets and link discovered processes to build your application portfolio.
        </p>
      </div>

      {/* Key Concept */}
      <Callout type="info" title="What are FactSheets?">
        FactSheets are structured documentation for your applications, capturing business context,
        ownership, support information, and technical relationships. They bridge infrastructure
        discovery with enterprise architecture.
      </Callout>

      {/* FactSheet Overview */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          ApplicationFactSheet Structure
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Each Application FactSheet contains both technical and business information:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldGroup
            title="Core Properties"
            fields={[
              { name: "DisplayName", description: "User-friendly application name" },
              { name: "RichDescription", description: "Detailed purpose and context" },
              { name: "Category", description: "Web, Desktop, Service, etc." },
              { name: "LifeCycle", description: "Active, Deprecated, Retired" },
            ]}
          />
          <FieldGroup
            title="Business Context"
            fields={[
              { name: "IsBusinessApplication", description: "Flag for business-critical apps" },
              { name: "Responsible", description: "Application owner" },
              { name: "Cost", description: "Operational expenditure" },
              { name: "CurrentMaturity", description: "Technical maturity level" },
            ]}
          />
          <FieldGroup
            title="Technical Links"
            fields={[
              { name: "LinkedProcessNames", description: "Associated process names" },
              { name: "ApplicationExecutableLinks", description: "Mapped executables" },
              { name: "DatabaseLinks", description: "Database dependencies" },
              { name: "CloudResourceLinks", description: "Cloud resource associations" },
            ]}
          />
          <FieldGroup
            title="Support Information"
            fields={[
              { name: "SupportProvider", description: "Vendor or internal team" },
              { name: "SupportModel", description: "Support tier/SLA" },
              { name: "SupportHours", description: "Coverage hours" },
              { name: "DisasterSLA", description: "Recovery objectives" },
            ]}
          />
        </div>
      </section>

      {/* Mapping Process */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Mapping Processes to Applications
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Link discovered processes to Application FactSheets in three ways:
        </p>
        <div className="space-y-4">
          <MappingMethod
            icon={Link2}
            title="Manual Linking"
            description="Select a process from the inventory and link it to an existing or new FactSheet."
            steps={[
              "Navigate to Process View",
              "Select process to link",
              "Click 'Link to FactSheet'",
              "Choose existing or create new",
            ]}
          />
          <MappingMethod
            icon={Tag}
            title="Executable Mapping"
            description="Define patterns that automatically map executables to applications."
            steps={[
              "Open Application FactSheet",
              "Add executable patterns",
              "e.g., 'chrome.exe' → 'Google Chrome'",
              "Future scans auto-link",
            ]}
          />
          <MappingMethod
            icon={Settings}
            title="Bulk Import"
            description="Import application-to-process mappings from CSV or existing CMDB."
            steps={[
              "Prepare CSV with mappings",
              "Upload via Configuration",
              "Review and confirm",
              "Apply mappings",
            ]}
          />
        </div>
      </section>

      {/* IsBusinessApplication Flag */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Business Application Flag
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[var(--amber-400)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-[var(--amber-400)]" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">IsBusinessApplication</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                This flag distinguishes business-critical applications from supporting software.
                When enabled, the application:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Appears in Business Application reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Can be linked to Business Capabilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Included in portfolio dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Available for EA integrations (LeanIX, etc.)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Relationship Types */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Application Relationships
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Applications can have various relationships with other entities:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Relationship</th>
                <th className="text-left px-4 py-3 font-medium">Target</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <tr>
                <td className="px-4 py-3 font-medium">HostedOn</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Servers</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  Which servers run this application
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">DatabaseLinks</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Databases</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  Database dependencies
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">CloudResourceLinks</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Cloud Resources</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  Azure/AWS resources used
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">ParentFactSheets</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Capabilities</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  Business capabilities supported
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <BestPractice
            title="Consistent Naming"
            description="Use a standard naming convention for applications across your organization."
          />
          <BestPractice
            title="Document Dependencies"
            description="Link database and cloud resources to maintain accurate dependency maps."
          />
          <BestPractice
            title="Assign Ownership"
            description="Every business application should have a designated responsible person."
          />
          <BestPractice
            title="Regular Review"
            description="Periodically review FactSheet accuracy as your environment evolves."
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
            <Briefcase className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                Business Capabilities
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Link apps to capabilities
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
          <Link
            href="/docs/advanced/architecture"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <FileText className="w-5 h-5 text-[var(--amber-400)]" />
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
        </div>
      </section>
    </div>
  );
}

function FieldGroup({
  title,
  fields,
}: {
  title: string;
  fields: { name: string; description: string }[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {fields.map((field) => (
          <div key={field.name} className="flex justify-between text-sm">
            <code className="text-[var(--amber-400)]">{field.name}</code>
            <span className="text-[var(--text-muted)]">{field.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MappingMethod({
  icon: Icon,
  title,
  description,
  steps,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  steps: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[var(--amber-400)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[var(--amber-400)]" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {steps.map((step, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-[var(--bg-elevated)] rounded flex items-center gap-1"
              >
                <span className="text-[var(--amber-400)]">{i + 1}.</span> {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BestPractice({
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
