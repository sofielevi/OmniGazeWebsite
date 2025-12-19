import Link from "next/link";
import {
  Boxes,
  Server,
  Database,
  Network,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Callout, CommandBlock } from "@/components/docs";

export default function ClustersPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">Clusters</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Discover and visualize Windows Failover Clusters and SQL Server clusters.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Cluster Detection</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze automatically detects clustered infrastructure and shows the relationships
          between cluster nodes, resources, and dependencies.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ClusterTypeCard
            icon={Boxes}
            title="Windows Failover Clusters"
            description="Detect WSFC configurations including nodes, roles, and shared storage."
            features={[
              "Cluster nodes and quorum",
              "Cluster roles and resources",
              "Shared disk resources",
              "Network configuration",
            ]}
          />
          <ClusterTypeCard
            icon={Database}
            title="SQL Server Clusters"
            description="Identify SQL Always On and Failover Cluster Instances."
            features={[
              "Always On Availability Groups",
              "Failover Cluster Instances",
              "Replica sync status",
              "Listener endpoints",
            ]}
          />
        </div>
      </section>

      {/* Detection Algorithm */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">How Detection Works</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze uses multiple signals to identify cluster relationships:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <ol className="space-y-4">
            <DetectionStep
              number={1}
              title="Service Discovery"
              description="Detect Cluster Service (ClusSvc) running on nodes"
            />
            <DetectionStep
              number={2}
              title="WMI Query"
              description="Query MSCluster WMI namespace for cluster configuration"
            />
            <DetectionStep
              number={3}
              title="Resource Enumeration"
              description="List all cluster roles, resources, and dependencies"
            />
            <DetectionStep
              number={4}
              title="Network Analysis"
              description="Map cluster networks and virtual IP addresses"
            />
            <DetectionStep
              number={5}
              title="Correlation"
              description="Link cluster resources to physical servers and applications"
            />
          </ol>
        </div>
        <Callout type="info" title="Permissions Required">
          Cluster detection requires credentials with Cluster Operator or higher permissions.
          Standard WinRM read access is sufficient for most scenarios.
        </Callout>
      </section>

      {/* Cluster View */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Cluster View</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          The cluster detail page shows the complete cluster topology:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          {/* Cluster Header */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[var(--border-subtle)]">
            <div className="w-12 h-12 rounded-xl bg-[var(--amber-400)]/10 flex items-center justify-center">
              <Boxes className="w-6 h-6 text-[var(--amber-400)]" />
            </div>
            <div>
              <h3 className="font-medium text-lg">SQLCLUSTER01</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Windows Server Failover Cluster • 3 nodes • Healthy
              </p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center gap-1.5 text-sm text-green-500">
                <CheckCircle className="w-4 h-4" />
                Online
              </span>
            </div>
          </div>

          {/* Nodes */}
          <h4 className="font-medium mb-3">Cluster Nodes</h4>
          <div className="grid md:grid-cols-3 gap-3 mb-6">
            <NodeCard name="SQLNODE01" status="Owner" ip="10.0.1.11" />
            <NodeCard name="SQLNODE02" status="Online" ip="10.0.1.12" />
            <NodeCard name="SQLNODE03" status="Online" ip="10.0.1.13" />
          </div>

          {/* Resources */}
          <h4 className="font-medium mb-3">Cluster Resources</h4>
          <div className="space-y-2">
            <ResourceRow name="SQL Server (MSSQLSERVER)" type="SQL Server" status="Online" owner="SQLNODE01" />
            <ResourceRow name="Cluster Disk 1" type="Physical Disk" status="Online" owner="SQLNODE01" />
            <ResourceRow name="SQL Network Name" type="Network Name" status="Online" owner="SQLNODE01" />
            <ResourceRow name="SQL IP Address" type="IP Address" status="Online" owner="SQLNODE01" />
          </div>
        </div>
      </section>

      {/* SQL Clusters */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">SQL Server Clusters</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze provides specialized views for SQL Server high availability:
        </p>
        <div className="space-y-4">
          <SQLClusterCard
            title="Always On Availability Groups"
            description="View AG configuration, replicas, and synchronization status."
            details={[
              "Primary and secondary replicas",
              "Sync state (Synchronized, Synchronizing, Not Synchronizing)",
              "Listener endpoint and port",
              "Failover mode (Automatic, Manual)",
            ]}
          />
          <SQLClusterCard
            title="Failover Cluster Instances (FCI)"
            description="Traditional SQL Server failover clustering on shared storage."
            details={[
              "Active and passive nodes",
              "Shared storage configuration",
              "Virtual network name",
              "Failover history",
            ]}
          />
        </div>
      </section>

      {/* CLI Commands */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">CLI Commands</h2>
        <CommandBlock language="powershell" title="Cluster Operations">
          {`# List all discovered clusters
OmniGaze.exe /clusters /list

# Get detailed cluster info
OmniGaze.exe /clusters /name:SQLCLUSTER01 /detail

# Export cluster topology
OmniGaze.exe /clusters /export /format:json /output:clusters.json

# Refresh cluster status
OmniGaze.exe /clusters /refresh /name:SQLCLUSTER01`}
        </CommandBlock>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Explore SQL instances and database details.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/infrastructure/sql"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            SQL Instances
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs/infrastructure/3d-view"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            3D Visualization
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ClusterTypeCard({
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
        <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--amber-400)]" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <ul className="space-y-1.5">
        {features.map((feature, i) => (
          <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetectionStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-[var(--amber-400)]/10 text-[var(--amber-400)] flex items-center justify-center font-mono text-xs flex-shrink-0">
        {number}
      </div>
      <div>
        <span className="font-medium">{title}</span>
        <span className="text-[var(--text-secondary)]"> — {description}</span>
      </div>
    </li>
  );
}

function NodeCard({
  name,
  status,
  ip,
}: {
  name: string;
  status: string;
  ip: string;
}) {
  const isOwner = status === "Owner";
  return (
    <div className={`bg-[var(--bg-elevated)] rounded-lg p-3 ${isOwner ? "ring-1 ring-[var(--amber-400)]" : ""}`}>
      <div className="flex items-center gap-2 mb-1">
        <Server className="w-4 h-4 text-[var(--text-secondary)]" />
        <span className="font-medium text-sm">{name}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className={isOwner ? "text-[var(--amber-400)]" : "text-green-500"}>{status}</span>
        <span className="text-[var(--text-secondary)] font-mono">{ip}</span>
      </div>
    </div>
  );
}

function ResourceRow({
  name,
  type,
  status,
  owner,
}: {
  name: string;
  type: string;
  status: string;
  owner: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-[var(--bg-elevated)] rounded-lg px-4 py-2 text-sm">
      <span className="font-medium flex-1">{name}</span>
      <span className="text-[var(--text-secondary)] w-28">{type}</span>
      <span className="text-green-500 w-16">{status}</span>
      <span className="text-[var(--text-secondary)] font-mono text-xs">{owner}</span>
    </div>
  );
}

function SQLClusterCard({
  title,
  description,
  details,
}: {
  title: string;
  description: string;
  details: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <ul className="grid md:grid-cols-2 gap-2">
        {details.map((detail, i) => (
          <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
            <span className="text-[var(--amber-400)]">•</span>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
