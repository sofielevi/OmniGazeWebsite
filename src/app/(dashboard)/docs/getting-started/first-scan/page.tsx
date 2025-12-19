import Link from "next/link";
import {
  Play,
  Server,
  Network,
  CheckCircle,
  ArrowRight,
  Settings,
  Search,
  BarChart3
} from "lucide-react";
import { Callout, CommandBlock, StepList } from "@/components/docs";

export default function FirstScanPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">Your First Scan</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Discover your infrastructure by running your first OmniGaze scan.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">What You&apos;ll Discover</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze scans your Windows infrastructure to automatically discover and inventory:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <DiscoveryCard
            icon={Server}
            title="Servers"
            items={["Operating system details", "Hardware specifications", "Installed roles & features"]}
          />
          <DiscoveryCard
            icon={Network}
            title="Applications"
            items={["Installed software", "Running services", "Network connections"]}
          />
          <DiscoveryCard
            icon={BarChart3}
            title="Dependencies"
            items={["Service dependencies", "Application mapping", "Communication flows"]}
          />
        </div>
      </section>

      {/* Prerequisites */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Prerequisites</h2>
        <Callout type="warning" title="Before You Scan">
          Make sure you have the required access to your target servers. OmniGaze needs
          appropriate credentials to scan remote machines.
        </Callout>
        <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <h4 className="font-medium mb-3">Scan Requirements</h4>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>WinRM enabled on target servers (ports 5985/5986)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Credentials with read access to target machines</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Network connectivity from OmniGaze to targets</span>
            </li>
          </ul>
        </div>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          Need help setting up WinRM? See our{" "}
          <Link
            href="/docs/infrastructure/winrm-setup"
            className="text-[var(--amber-400)] hover:underline"
          >
            WinRM Setup Guide
          </Link>.
        </p>
      </section>

      {/* Scan Steps */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Running Your First Scan</h2>
        <StepList
          steps={[
            {
              title: "Open the Scan Wizard",
              description:
                "From the main dashboard, click 'New Scan' or use the keyboard shortcut Ctrl+N.",
            },
            {
              title: "Add Scan Targets",
              description:
                "Enter server names, IP addresses, or IP ranges. You can also import from a CSV file or Active Directory.",
            },
            {
              title: "Configure Credentials",
              description:
                "Add credentials that have read access to your target servers. OmniGaze stores credentials securely using Windows DPAPI.",
            },
            {
              title: "Select Scan Scope",
              description:
                "Choose what to discover: basic inventory, installed software, running services, network connections, and more.",
            },
            {
              title: "Start the Scan",
              description:
                "Click 'Start Scan' to begin. OmniGaze will show real-time progress as it discovers your infrastructure.",
            },
          ]}
        />
      </section>

      {/* Quick Start Examples */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Quick Start: Scan Local Machine</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          To test OmniGaze without configuring remote access, you can scan your local machine:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <StepList
            steps={[
              {
                title: "Click 'New Scan'",
                description: "Open the scan wizard from the dashboard.",
              },
              {
                title: "Enter 'localhost'",
                description: "Add localhost or 127.0.0.1 as your scan target.",
              },
              {
                title: "Use Current User",
                description: "Select 'Use current Windows credentials' - no additional setup needed.",
              },
              {
                title: "Start Scan",
                description: "Click Start and watch as OmniGaze discovers your machine.",
              },
            ]}
          />
        </div>
      </section>

      {/* Understanding Results */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Understanding Your Results</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          After the scan completes, OmniGaze presents your discovered infrastructure in multiple views:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ResultViewCard
            title="3D Visualization"
            description="Interactive 3D view showing servers, applications, and their relationships."
          />
          <ResultViewCard
            title="Inventory List"
            description="Detailed list view with filtering, sorting, and export options."
          />
          <ResultViewCard
            title="Dependency Map"
            description="Visual graph showing how applications and services connect."
          />
          <ResultViewCard
            title="Comparison View"
            description="Compare scans over time to track changes in your infrastructure."
          />
        </div>
      </section>

      {/* Command Line Scan */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Command Line Scanning</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          For automation and scheduled scans, use the OmniGaze CLI:
        </p>
        <CommandBlock language="powershell" title="CLI Scan Example">
          {`# Scan a single server
OmniGaze.exe /scan /target:server01.contoso.com

# Scan multiple servers from file
OmniGaze.exe /scan /targets:servers.txt

# Scan with specific credentials
OmniGaze.exe /scan /target:server01 /user:DOMAIN\\admin`}
        </CommandBlock>
        <Callout type="tip" title="Scheduled Scans">
          Set up recurring scans using Windows Task Scheduler or your preferred
          automation tool. See our{" "}
          <Link
            href="/docs/advanced/automation"
            className="text-[var(--amber-400)] hover:underline"
          >
            Automation Guide
          </Link>{" "}
          for details.
        </Callout>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Now that you&apos;ve completed your first scan, explore infrastructure setup options.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/infrastructure/winrm-setup"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            WinRM Setup Guide
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs/infrastructure/credentials"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Credential Management
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function DiscoveryCard({
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

function ResultViewCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}
