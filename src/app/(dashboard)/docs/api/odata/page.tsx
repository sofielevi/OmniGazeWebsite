import {
  Database,
  Filter,
  Settings,
  ArrowRight,
  CheckCircle,
  Lock,
  RefreshCw,
  Server,
} from "lucide-react";
import Link from "next/link";
import { Callout, CommandBlock, TierBadge } from "@/components/docs";

export default function ODataEndpointsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-display text-3xl font-medium">
            OData Endpoints
          </h1>
          <TierBadge tier="professional" />
        </div>
        <p className="text-lg text-[var(--text-secondary)]">
          Query OmniGaze data using standard OData syntax for powerful, flexible data access.
        </p>
      </div>

      {/* Key Concept */}
      <Callout type="info" title="What is OData?">
        OData (Open Data Protocol) is a standardized protocol for building and consuming RESTful APIs.
        It provides a uniform way to query and manipulate data using URL conventions like <code>$filter</code>,
        <code>$select</code>, and <code>$expand</code>.
      </Callout>

      {/* Base URL */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          OData Base URL
        </h2>
        <CommandBlock language="plaintext">
          https://your-omnigaze-instance.com/odata/
        </CommandBlock>
      </section>

      {/* Available Operations */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Supported Operations
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Operation</th>
                <th className="text-left px-4 py-3 font-medium">URL Pattern</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <tr>
                <td className="px-4 py-3">Metadata</td>
                <td className="px-4 py-3">
                  <code className="text-[var(--amber-400)]">/odata/$metadata</code>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  View the OData service metadata
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">List</td>
                <td className="px-4 py-3">
                  <code className="text-[var(--amber-400)]">/odata/EntityName</code>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Retrieve all entities of a type
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Get by Key</td>
                <td className="px-4 py-3">
                  <code className="text-[var(--amber-400)]">/odata/EntityName(key)</code>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Retrieve a specific entity by key
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Filter</td>
                <td className="px-4 py-3">
                  <code className="text-[var(--amber-400)]">/odata/EntityName?$filter=...</code>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Filter entities by criteria
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Select</td>
                <td className="px-4 py-3">
                  <code className="text-[var(--amber-400)]">/odata/EntityName?$select=...</code>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Select specific properties
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Default Entities */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Default Exposed Entities
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          By default, the following entities are enabled for OData access:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <EntityCard
            name="Assets"
            description="Discovered IT assets including servers, workstations, and network devices."
            properties={["Hostname", "IpAddress", "OperatingSystem", "LastSeen"]}
          />
          <EntityCard
            name="Volumes"
            description="Storage volumes with capacity and usage information."
            properties={["DriveLetter", "Capacity", "FreeSpace", "FileSystem"]}
          />
          <EntityCard
            name="ActiveDirectoryUsers"
            description="Active Directory user accounts from AD sync."
            properties={["Username", "DisplayName", "Email", "LastLogon"]}
          />
          <EntityCard
            name="CisSQLResults"
            description="CIS benchmark compliance results for SQL Server."
            properties={["BenchmarkId", "Status", "Severity", "Remediation"]}
          />
          <EntityCard
            name="FactSheets/Application"
            description="Application FactSheets with business context."
            properties={["DisplayName", "Category", "Responsible", "LifeCycle"]}
          />
        </div>
      </section>

      {/* Query Examples */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Query Examples
        </h2>

        <div className="space-y-4">
          <QueryExample
            title="Filter by Property"
            description="Get all Windows Server assets"
            query="/odata/Assets?$filter=contains(OperatingSystem,'Windows Server')"
          />
          <QueryExample
            title="Select Specific Fields"
            description="Get only hostname and IP for all assets"
            query="/odata/Assets?$select=Hostname,IpAddress"
          />
          <QueryExample
            title="Combined Query"
            description="Get Windows assets with low disk space"
            query="/odata/Assets?$filter=contains(OperatingSystem,'Windows')&$expand=Volumes($filter=FreeSpace lt 10737418240)"
          />
          <QueryExample
            title="Order Results"
            description="Get assets ordered by last seen date"
            query="/odata/Assets?$orderby=LastSeen desc"
          />
          <QueryExample
            title="Pagination"
            description="Get first 50 assets, skip 100"
            query="/odata/Assets?$top=50&$skip=100"
          />
        </div>
      </section>

      {/* Configuration */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          OData Configuration
        </h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Administrators can configure which entities and properties are exposed:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="space-y-4">
            <ConfigStep
              step={1}
              title="Access Configuration"
              description="Navigate to Configuration → OData API Exposure (requires OG.Admin role)"
            />
            <ConfigStep
              step={2}
              title="Enable/Disable Entities"
              description="Toggle entities on/off to control which data is exposed"
            />
            <ConfigStep
              step={3}
              title="Configure Properties"
              description="Select which properties are visible for each entity"
            />
            <ConfigStep
              step={4}
              title="Apply Changes"
              description="Click 'Apply & Restart' to activate the new configuration"
            />
          </div>
        </div>
        <Callout type="warning" title="Security Note">
          Be careful when exposing sensitive properties. Review what data will be accessible
          through the OData endpoint before enabling entities.
        </Callout>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Troubleshooting
        </h2>
        <div className="space-y-3">
          <TroubleshootItem
            issue="Entity not found"
            solution="Verify the entity is enabled in OData Configuration"
          />
          <TroubleshootItem
            issue="Property not in response"
            solution="Check property is selected in entity configuration"
          />
          <TroubleshootItem
            issue="Changes not applied"
            solution="Click 'Apply & Restart' after saving configuration"
          />
          <TroubleshootItem
            issue="401 Unauthorized"
            solution="Verify JWT token is valid and included in Authorization header"
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/api/rest"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <Server className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                REST API
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Additional REST endpoints
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </Link>
          <a
            href="https://www.odata.org/documentation/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-[var(--bg-elevated)] rounded-lg hover:bg-[var(--bg-deep)] transition-colors group"
          >
            <Database className="w-5 h-5 text-[var(--amber-400)]" />
            <div className="flex-1">
              <div className="font-medium group-hover:text-[var(--amber-400)]">
                OData Documentation
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                Official OData protocol docs
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--amber-400)]" />
          </a>
        </div>
      </section>
    </div>
  );
}

function EntityCard({
  name,
  description,
  properties,
}: {
  name: string;
  description: string;
  properties: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Database className="w-4 h-4 text-[var(--amber-400)]" />
        <code className="font-medium text-[var(--amber-400)]">{name}</code>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {properties.map((prop) => (
          <code key={prop} className="text-xs px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded">
            {prop}
          </code>
        ))}
      </div>
    </div>
  );
}

function QueryExample({
  title,
  description,
  query,
}: {
  title: string;
  description: string;
  query: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <pre className="bg-[var(--bg-elevated)] rounded-lg p-3 text-xs overflow-x-auto">
        <code className="text-[var(--amber-400)]">{query}</code>
      </pre>
    </div>
  );
}

function ConfigStep({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 bg-[var(--amber-400)]/20 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-[var(--amber-400)] font-medium">{step}</span>
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-[var(--text-secondary)]">{description}</div>
      </div>
    </div>
  );
}

function TroubleshootItem({
  issue,
  solution,
}: {
  issue: string;
  solution: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg">
      <Filter className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-medium">{issue}</div>
        <div className="text-sm text-[var(--text-secondary)]">{solution}</div>
      </div>
    </div>
  );
}
