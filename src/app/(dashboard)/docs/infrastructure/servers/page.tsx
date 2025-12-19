import Link from "next/link";
import {
  Server,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Package,
  Activity,
  ArrowRight,
  Monitor,
} from "lucide-react";
import { Callout, CommandBlock } from "@/components/docs";

export default function ServersPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">Server Details</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          View comprehensive information about discovered servers.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Server Overview</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Each discovered server includes a detailed profile with hardware, software,
          and network information. Click any server in the inventory to view its details.
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[var(--border-subtle)]">
            <div className="w-12 h-12 rounded-xl bg-[var(--amber-400)]/10 flex items-center justify-center">
              <Server className="w-6 h-6 text-[var(--amber-400)]" />
            </div>
            <div>
              <h3 className="font-medium text-lg">SERVER01.contoso.com</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Windows Server 2022 Datacenter • Last scanned 2 hours ago
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <QuickStat label="CPU Cores" value="16" />
            <QuickStat label="RAM" value="64 GB" />
            <QuickStat label="Disk" value="2.4 TB" />
            <QuickStat label="Services" value="47" />
          </div>
        </div>
      </section>

      {/* Hardware Info */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Hardware Information</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze collects detailed hardware specifications:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <HardwareCard
            icon={Cpu}
            title="Processor"
            items={[
              "Model and manufacturer",
              "Core count and speed",
              "Architecture (x64, ARM)",
              "Virtualization support",
            ]}
          />
          <HardwareCard
            icon={MemoryStick}
            title="Memory"
            items={[
              "Total installed RAM",
              "Available memory",
              "Memory slots and modules",
              "Memory type (DDR4, DDR5)",
            ]}
          />
          <HardwareCard
            icon={HardDrive}
            title="Storage"
            items={[
              "Physical and logical disks",
              "Capacity and free space",
              "Drive type (SSD, HDD)",
              "RAID configuration",
            ]}
          />
          <HardwareCard
            icon={Network}
            title="Network"
            items={[
              "Network adapters",
              "IP addresses (IPv4/IPv6)",
              "MAC addresses",
              "Connection speed",
            ]}
          />
        </div>
      </section>

      {/* Installed Software */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Installed Software</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Complete inventory of installed applications and components:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Application</th>
                <th className="text-left px-4 py-3 font-medium">Version</th>
                <th className="text-left px-4 py-3 font-medium">Publisher</th>
                <th className="text-left px-4 py-3 font-medium">Install Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <SoftwareRow name="Microsoft SQL Server 2019" version="15.0.4316.3" publisher="Microsoft" date="2024-01-15" />
              <SoftwareRow name="IIS 10.0" version="10.0.20348.1" publisher="Microsoft" date="2023-08-20" />
              <SoftwareRow name=".NET Framework 4.8" version="4.8.09032" publisher="Microsoft" date="2023-12-10" />
              <SoftwareRow name="Visual C++ Redistributable" version="14.38.33130" publisher="Microsoft" date="2024-02-01" />
            </tbody>
          </table>
        </div>
        <Callout type="info" title="Software Detection">
          Software is detected from the Windows Registry, MSI database, and program files.
          Some portable applications may not appear in the list.
        </Callout>
      </section>

      {/* Running Services */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Running Services</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          View Windows services and their current status:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Service</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Start Type</th>
                <th className="text-left px-4 py-3 font-medium">Account</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <ServiceRow name="SQL Server (MSSQLSERVER)" status="Running" startType="Automatic" account="NT Service\MSSQLSERVER" />
              <ServiceRow name="World Wide Web Publishing" status="Running" startType="Automatic" account="LocalSystem" />
              <ServiceRow name="Windows Remote Management" status="Running" startType="Automatic" account="Network Service" />
              <ServiceRow name="Print Spooler" status="Stopped" startType="Disabled" account="LocalSystem" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Network Connections */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Network Connections</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Active network connections help identify application dependencies:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <div className="space-y-3">
            <ConnectionRow
              local="10.0.1.10:1433"
              remote="10.0.2.20:52341"
              process="sqlservr.exe"
              state="Established"
            />
            <ConnectionRow
              local="10.0.1.10:443"
              remote="10.0.3.15:49832"
              process="w3wp.exe"
              state="Established"
            />
            <ConnectionRow
              local="10.0.1.10:5985"
              remote="10.0.0.5:51234"
              process="svchost.exe"
              state="Established"
            />
          </div>
        </div>
        <Callout type="tip" title="Dependency Discovery">
          Network connections are used to automatically map dependencies between servers.
          View these in the{" "}
          <Link href="/dashboard/docs/infrastructure/3d-view" className="text-[var(--amber-400)] hover:underline">
            3D Visualization
          </Link>.
        </Callout>
      </section>

      {/* Export Options */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Export Server Data</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Export server details for reporting or integration:
        </p>
        <CommandBlock language="powershell" title="CLI Export">
          {`# Export single server to JSON
OmniGaze.exe /export /server:SERVER01 /format:json /output:server01.json

# Export all servers to CSV
OmniGaze.exe /export /all /format:csv /output:inventory.csv

# Export to Excel with multiple sheets
OmniGaze.exe /export /all /format:xlsx /output:inventory.xlsx`}
        </CommandBlock>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Explore specialized views for clusters and SQL instances.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/docs/infrastructure/clusters"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Clusters
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard/docs/infrastructure/sql"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            SQL Instances
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xl font-mono font-medium text-[var(--amber-400)]">{value}</div>
      <div className="text-xs text-[var(--text-secondary)]">{label}</div>
    </div>
  );
}

function HardwareCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[var(--amber-400)]" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
            <span className="text-[var(--amber-400)] mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SoftwareRow({
  name,
  version,
  publisher,
  date,
}: {
  name: string;
  version: string;
  publisher: string;
  date: string;
}) {
  return (
    <tr>
      <td className="px-4 py-2 font-medium">{name}</td>
      <td className="px-4 py-2 font-mono text-sm text-[var(--text-secondary)]">{version}</td>
      <td className="px-4 py-2 text-[var(--text-secondary)]">{publisher}</td>
      <td className="px-4 py-2 text-[var(--text-secondary)]">{date}</td>
    </tr>
  );
}

function ServiceRow({
  name,
  status,
  startType,
  account,
}: {
  name: string;
  status: string;
  startType: string;
  account: string;
}) {
  const statusColor = status === "Running" ? "text-green-500" : "text-[var(--text-secondary)]";
  return (
    <tr>
      <td className="px-4 py-2 font-medium">{name}</td>
      <td className={`px-4 py-2 ${statusColor}`}>{status}</td>
      <td className="px-4 py-2 text-[var(--text-secondary)]">{startType}</td>
      <td className="px-4 py-2 text-sm text-[var(--text-secondary)] font-mono">{account}</td>
    </tr>
  );
}

function ConnectionRow({
  local,
  remote,
  process,
  state,
}: {
  local: string;
  remote: string;
  process: string;
  state: string;
}) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <code className="bg-[var(--bg-elevated)] px-2 py-1 rounded text-[var(--amber-400)]">{local}</code>
      <span className="text-[var(--text-secondary)]">→</span>
      <code className="bg-[var(--bg-elevated)] px-2 py-1 rounded">{remote}</code>
      <span className="text-[var(--text-secondary)] flex-1">{process}</span>
      <span className="text-green-500 text-xs">{state}</span>
    </div>
  );
}
