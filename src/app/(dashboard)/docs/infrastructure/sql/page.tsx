import Link from "next/link";
import {
  Database,
  Server,
  HardDrive,
  Network,
  Users,
  ArrowRight,
  Activity,
  Shield,
} from "lucide-react";
import { Callout, CommandBlock } from "@/components/docs";

export default function SQLPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">SQL Instances</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Discover and inventory SQL Server instances across your infrastructure.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">SQL Server Discovery</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze automatically discovers SQL Server instances and collects detailed
          information about databases, connections, and configurations.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard
            icon={Database}
            title="Instance Detection"
            description="Find all SQL instances including default and named instances."
          />
          <FeatureCard
            icon={HardDrive}
            title="Database Inventory"
            description="List all databases with sizes, recovery models, and status."
          />
          <FeatureCard
            icon={Network}
            title="Connection Mapping"
            description="Track which applications connect to which databases."
          />
        </div>
      </section>

      {/* Detection Methods */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Detection Methods</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          SQL instances are discovered through multiple methods:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 space-y-4">
          <DetectionMethod
            title="SQL Browser Service"
            port="UDP 1434"
            description="Query the SQL Browser to enumerate all instances on a server."
          />
          <DetectionMethod
            title="Registry Scan"
            port="WinRM/WMI"
            description="Read installed instances from the Windows Registry."
          />
          <DetectionMethod
            title="Service Discovery"
            port="WinRM/WMI"
            description="Identify SQL services (MSSQLSERVER, MSSQL$InstanceName)."
          />
          <DetectionMethod
            title="Port Scan"
            port="TCP 1433+"
            description="Detect SQL Server by probing common ports."
          />
        </div>
        <Callout type="tip" title="Network Ports">
          For named instances, SQL Server uses dynamic ports. Enable SQL Browser or configure
          static ports for consistent discovery.
        </Callout>
      </section>

      {/* Instance Details */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Instance Details</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Each discovered SQL instance includes comprehensive details:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          {/* Instance Header */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[var(--border-subtle)]">
            <div className="w-12 h-12 rounded-xl bg-[var(--amber-400)]/10 flex items-center justify-center">
              <Database className="w-6 h-6 text-[var(--amber-400)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg">SERVER01\SQLPROD</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                SQL Server 2019 Enterprise • Version 15.0.4316.3
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-500">Online</div>
              <div className="text-xs text-[var(--text-secondary)]">Port 1433</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <QuickStat label="Databases" value="24" />
            <QuickStat label="Total Size" value="1.8 TB" />
            <QuickStat label="Connections" value="142" />
            <QuickStat label="Uptime" value="45 days" />
          </div>

          {/* Database List */}
          <h4 className="font-medium mb-3">Databases</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[var(--bg-elevated)]">
                <tr>
                  <th className="text-left px-3 py-2 font-medium">Database</th>
                  <th className="text-left px-3 py-2 font-medium">Size</th>
                  <th className="text-left px-3 py-2 font-medium">Recovery</th>
                  <th className="text-left px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                <DatabaseRow name="ProductionDB" size="450 GB" recovery="Full" status="Online" />
                <DatabaseRow name="CustomerData" size="280 GB" recovery="Full" status="Online" />
                <DatabaseRow name="Analytics" size="890 GB" recovery="Simple" status="Online" />
                <DatabaseRow name="Staging" size="120 GB" recovery="Simple" status="Online" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Connection Tracking */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Connection Tracking</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          See which applications and servers connect to your SQL instances:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <div className="space-y-3">
            <ConnectionRow
              client="WEBSERVER01"
              app="w3wp.exe (IIS)"
              database="ProductionDB"
              connections={24}
            />
            <ConnectionRow
              client="APPSERVER01"
              app="OrderService.exe"
              database="CustomerData"
              connections={8}
            />
            <ConnectionRow
              client="REPORTSERVER"
              app="ReportServer"
              database="Analytics"
              connections={3}
            />
            <ConnectionRow
              client="DEVBOX01"
              app="SSMS"
              database="Multiple"
              connections={2}
            />
          </div>
        </div>
        <Callout type="info" title="Application Mapping">
          Connection data is used to build the application dependency map. View relationships
          in the{" "}
          <Link href="/docs/infrastructure/3d-view" className="text-[var(--amber-400)] hover:underline">
            3D Visualization
          </Link>.
        </Callout>
      </section>

      {/* SQL Cluster Support */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Cluster Support</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze fully supports SQL Server high availability configurations:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ClusterCard
            title="Always On AG"
            items={[
              "Availability Group topology",
              "Primary/secondary replicas",
              "Synchronization status",
              "Listener configuration",
            ]}
          />
          <ClusterCard
            title="Failover Cluster Instance"
            items={[
              "Active/passive nodes",
              "Shared storage",
              "Virtual network name",
              "Failover history",
            ]}
          />
        </div>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          See the{" "}
          <Link href="/docs/infrastructure/clusters" className="text-[var(--amber-400)] hover:underline">
            Clusters documentation
          </Link>{" "}
          for detailed cluster information.
        </p>
      </section>

      {/* CLI Commands */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">CLI Commands</h2>
        <CommandBlock language="powershell" title="SQL Operations">
          {`# List all SQL instances
OmniGaze.exe /sql /list

# Get instance details
OmniGaze.exe /sql /instance:"SERVER01\\SQLPROD" /detail

# Export database inventory
OmniGaze.exe /sql /export /format:csv /output:databases.csv

# Show connections to a database
OmniGaze.exe /sql /instance:"SERVER01\\SQLPROD" /database:ProductionDB /connections`}
        </CommandBlock>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Visualize your SQL infrastructure and dependencies.
        </p>
        <Link
          href="/docs/infrastructure/3d-view"
          className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
        >
          3D Visualization
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-[var(--amber-400)]" />
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

function DetectionMethod({
  title,
  port,
  description,
}: {
  title: string;
  port: string;
  description: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
      <div className="sm:w-40 flex-shrink-0">
        <span className="font-medium text-[var(--text-primary)]">{title}</span>
        <span className="text-xs text-[var(--text-secondary)] ml-2">({port})</span>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-mono font-medium text-[var(--amber-400)]">{value}</div>
      <div className="text-xs text-[var(--text-secondary)]">{label}</div>
    </div>
  );
}

function DatabaseRow({
  name,
  size,
  recovery,
  status,
}: {
  name: string;
  size: string;
  recovery: string;
  status: string;
}) {
  return (
    <tr>
      <td className="px-3 py-2 font-medium">{name}</td>
      <td className="px-3 py-2 font-mono text-[var(--text-secondary)]">{size}</td>
      <td className="px-3 py-2 text-[var(--text-secondary)]">{recovery}</td>
      <td className="px-3 py-2 text-green-500">{status}</td>
    </tr>
  );
}

function ConnectionRow({
  client,
  app,
  database,
  connections,
}: {
  client: string;
  app: string;
  database: string;
  connections: number;
}) {
  return (
    <div className="flex items-center gap-4 bg-[var(--bg-elevated)] rounded-lg px-4 py-3 text-sm">
      <div className="flex items-center gap-2 flex-1">
        <Server className="w-4 h-4 text-[var(--text-secondary)]" />
        <span className="font-medium">{client}</span>
      </div>
      <span className="text-[var(--text-secondary)] flex-1">{app}</span>
      <span className="text-[var(--amber-400)] w-28">{database}</span>
      <span className="text-[var(--text-secondary)] w-16 text-right">{connections} conn</span>
    </div>
  );
}

function ClusterCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <h4 className="font-medium mb-3">{title}</h4>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
            <span className="text-[var(--amber-400)]">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
