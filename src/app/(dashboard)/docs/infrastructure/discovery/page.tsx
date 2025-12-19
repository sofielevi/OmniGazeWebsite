import Link from "next/link";
import {
  Radar,
  Network,
  Server,
  Clock,
  Settings,
  ArrowRight,
  Wifi,
  Terminal,
} from "lucide-react";
import { Callout, CommandBlock, StepList } from "@/components/docs";

export default function DiscoveryPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">Asset Discovery</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Automatically discover and inventory your Windows infrastructure.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">How Discovery Works</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze uses multiple discovery methods to scan your network and build a complete
          inventory of servers, applications, and their relationships.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <MethodCard
            icon={Radar}
            title="Network Scan"
            description="Probe IP ranges to find active hosts and open ports."
          />
          <MethodCard
            icon={Terminal}
            title="Remote Query"
            description="Connect via WinRM or WMI to gather detailed system info."
          />
          <MethodCard
            icon={Network}
            title="Dependency Mapping"
            description="Analyze connections to build application dependency maps."
          />
        </div>
      </section>

      {/* Scan Targets */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Defining Scan Targets</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze supports multiple ways to specify what to scan:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 space-y-4">
          <TargetType
            title="Single Host"
            example="server01.contoso.com"
            description="Scan a specific server by hostname or IP address."
          />
          <TargetType
            title="IP Range"
            example="192.168.1.1-192.168.1.254"
            description="Scan a range of IP addresses."
          />
          <TargetType
            title="CIDR Notation"
            example="10.0.0.0/24"
            description="Scan an entire subnet using CIDR notation."
          />
          <TargetType
            title="CSV Import"
            example="servers.csv"
            description="Import a list of servers from a CSV file."
          />
          <TargetType
            title="Active Directory"
            example="OU=Servers,DC=contoso,DC=com"
            description="Query AD to discover all computers in an OU."
          />
        </div>
      </section>

      {/* Discovery Methods */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Discovery Methods</h2>
        <div className="space-y-4">
          <DiscoveryMethodCard
            title="WinRM (Recommended)"
            ports="5985 (HTTP), 5986 (HTTPS)"
            description="Windows Remote Management is the preferred method for Windows servers. It's fast, secure, and provides the most detailed information."
            pros={["Fast and efficient", "Secure (supports HTTPS)", "Full system details", "Low overhead"]}
          />
          <DiscoveryMethodCard
            title="WMI / DCOM"
            ports="135, 445, dynamic RPC"
            description="Windows Management Instrumentation works on older systems where WinRM isn't available."
            pros={["Works on legacy systems", "No agent required", "Broad compatibility"]}
          />
          <DiscoveryMethodCard
            title="SSH"
            ports="22"
            description="For Linux/Unix systems in mixed environments (requires Starter tier or higher)."
            pros={["Cross-platform", "Secure", "Standard protocol"]}
          />
        </div>
        <Callout type="tip" title="Best Practice">
          Use WinRM whenever possible. It&apos;s more efficient than WMI and provides better
          performance for large-scale scans. See the{" "}
          <Link href="/docs/security/winrm-setup" className="text-[var(--amber-400)] hover:underline">
            WinRM Setup Guide
          </Link>.
        </Callout>
      </section>

      {/* Scheduling */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Scheduling Scans</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Keep your inventory up-to-date with scheduled discovery scans:
        </p>
        <StepList
          steps={[
            {
              title: "Open Scan Settings",
              description: "Go to Settings → Scan Schedule in OmniGaze.",
            },
            {
              title: "Create Schedule",
              description: "Click 'Add Schedule' and select your scan profile.",
            },
            {
              title: "Set Frequency",
              description: "Choose daily, weekly, or custom intervals. Off-hours scans are recommended.",
            },
            {
              title: "Configure Notifications",
              description: "Optionally receive email alerts when scans complete or find new assets.",
            },
          ]}
        />
        <CommandBlock language="powershell" title="CLI Scheduled Scan">
          {`# Create a scheduled task for daily scans at 2 AM
OmniGaze.exe /scan /profile:FullDiscovery /schedule:"0 2 * * *"`}
        </CommandBlock>
      </section>

      {/* Discovery Pipeline */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Discovery Pipeline</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          When you run a discovery scan, OmniGaze executes the following pipeline:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <ol className="space-y-3">
            <PipelineStep number={1} title="Host Detection" description="Ping sweep and port scan to find live hosts" />
            <PipelineStep number={2} title="OS Fingerprinting" description="Identify operating system and version" />
            <PipelineStep number={3} title="Authentication" description="Connect using provided credentials" />
            <PipelineStep number={4} title="Data Collection" description="Gather hardware, software, and service info" />
            <PipelineStep number={5} title="Network Analysis" description="Map network connections and dependencies" />
            <PipelineStep number={6} title="Correlation" description="Link related assets and build relationships" />
          </ol>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Learn more about scanning options and viewing discovered assets.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/infrastructure/scanning"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Network Scanning
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs/infrastructure/servers"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Server Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function MethodCard({
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

function TargetType({
  title,
  example,
  description,
}: {
  title: string;
  example: string;
  description: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
      <div className="sm:w-32 flex-shrink-0">
        <span className="font-medium text-[var(--text-primary)]">{title}</span>
      </div>
      <div className="flex-1">
        <code className="text-sm text-[var(--amber-400)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded">
          {example}
        </code>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{description}</p>
      </div>
    </div>
  );
}

function DiscoveryMethodCard({
  title,
  ports,
  description,
  pros,
}: {
  title: string;
  ports: string;
  description: string;
  pros: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium">{title}</h3>
        <span className="text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] px-2 py-1 rounded">
          Ports: {ports}
        </span>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{description}</p>
      <ul className="flex flex-wrap gap-2">
        {pros.map((pro, i) => (
          <li key={i} className="text-xs bg-[var(--amber-400)]/10 text-[var(--amber-400)] px-2 py-1 rounded">
            {pro}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PipelineStep({
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
