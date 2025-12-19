import Link from "next/link";
import {
  Scan,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Gauge,
} from "lucide-react";
import { Callout, CommandBlock, StepList } from "@/components/docs";

export default function ScanningPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">Network Scanning</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Configure and monitor infrastructure scans for optimal discovery.
        </p>
      </div>

      {/* Scan Configuration */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Scan Configuration</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Customize your scan settings to balance thoroughness with performance:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ConfigCard
            title="Scan Depth"
            options={[
              { name: "Quick", description: "Basic host detection, minimal details" },
              { name: "Standard", description: "OS, hardware, installed software" },
              { name: "Deep", description: "Full inventory including services, connections" },
            ]}
          />
          <ConfigCard
            title="Parallelism"
            options={[
              { name: "Conservative (5)", description: "Low network impact, slower" },
              { name: "Balanced (20)", description: "Good performance, moderate load" },
              { name: "Aggressive (50)", description: "Fast scans, higher network usage" },
            ]}
          />
        </div>
        <Callout type="info" title="Scan Profiles">
          Save your configuration as a profile for reuse. Go to Settings → Scan Profiles
          to create and manage profiles.
        </Callout>
      </section>

      {/* Port Scanning */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Port Scanning</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          OmniGaze scans common ports to identify services and applications:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Port</th>
                <th className="text-left px-4 py-3 font-medium">Service</th>
                <th className="text-left px-4 py-3 font-medium">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <PortRow port="22" service="SSH" purpose="Linux/Unix remote access" />
              <PortRow port="135" service="RPC" purpose="WMI endpoint mapper" />
              <PortRow port="445" service="SMB" purpose="File sharing, WMI" />
              <PortRow port="1433" service="SQL Server" purpose="Database connections" />
              <PortRow port="3389" service="RDP" purpose="Remote Desktop" />
              <PortRow port="5985" service="WinRM HTTP" purpose="Remote management" />
              <PortRow port="5986" service="WinRM HTTPS" purpose="Secure remote management" />
            </tbody>
          </table>
        </div>
        <CommandBlock language="powershell" title="Custom Port Range">
          {`# Scan additional ports
OmniGaze.exe /scan /target:10.0.0.0/24 /ports:80,443,8080,8443`}
        </CommandBlock>
      </section>

      {/* Scan Progress */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Monitoring Scan Progress</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Track your scan in real-time with the progress dashboard:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <StatusMetric icon={Scan} label="Scanning" value="47" />
            <StatusMetric icon={CheckCircle} label="Completed" value="128" color="text-green-500" />
            <StatusMetric icon={XCircle} label="Failed" value="3" color="text-red-500" />
            <StatusMetric icon={Clock} label="Remaining" value="22" />
          </div>
          <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--amber-400)] rounded-full" style={{ width: "64%" }} />
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            Estimated time remaining: 4 minutes
          </p>
        </div>
      </section>

      {/* Error Handling */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Handling Scan Errors</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Common scan issues and how to resolve them:
        </p>
        <div className="space-y-3">
          <ErrorCard
            title="Connection Timeout"
            cause="Host unreachable or firewall blocking"
            solution="Verify network connectivity and firewall rules. Ensure WinRM ports (5985/5986) are open."
          />
          <ErrorCard
            title="Access Denied"
            cause="Invalid or insufficient credentials"
            solution="Check that credentials have local admin rights on the target. Verify the account isn't locked."
          />
          <ErrorCard
            title="WinRM Not Configured"
            cause="WinRM service not running or not configured"
            solution="Run 'winrm quickconfig' on target or use our setup script."
          />
          <ErrorCard
            title="SSL Certificate Error"
            cause="Self-signed or expired certificate"
            solution="Enable 'Allow untrusted certificates' in scan settings, or configure proper SSL."
          />
        </div>
        <Callout type="tip" title="Bulk Retry">
          Right-click failed hosts in the results and select &quot;Retry Failed&quot; to
          re-scan only the problematic targets.
        </Callout>
      </section>

      {/* Performance Tips */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Performance Optimization</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Use WinRM over WMI</span>
                <p className="text-sm text-[var(--text-secondary)]">
                  WinRM is 3-5x faster for data collection than WMI/DCOM.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Scan during off-hours</span>
                <p className="text-sm text-[var(--text-secondary)]">
                  Schedule intensive scans for nights/weekends to minimize impact.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Segment large networks</span>
                <p className="text-sm text-[var(--text-secondary)]">
                  Break /16 networks into smaller /24 chunks for better manageability.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Exclude known non-Windows hosts</span>
                <p className="text-sm text-[var(--text-secondary)]">
                  Add printers, network devices, and Linux hosts to exclusion lists.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          View and analyze your discovered assets.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/docs/infrastructure/servers"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Server Details
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard/docs/infrastructure/3d-view"
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

function ConfigCard({
  title,
  options,
}: {
  title: string;
  options: { name: string; description: string }[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--amber-400)] mt-2 flex-shrink-0" />
            <div>
              <span className="font-medium text-sm">{opt.name}</span>
              <span className="text-sm text-[var(--text-secondary)]"> — {opt.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortRow({
  port,
  service,
  purpose,
}: {
  port: string;
  service: string;
  purpose: string;
}) {
  return (
    <tr>
      <td className="px-4 py-2 font-mono text-[var(--amber-400)]">{port}</td>
      <td className="px-4 py-2">{service}</td>
      <td className="px-4 py-2 text-[var(--text-secondary)]">{purpose}</td>
    </tr>
  );
}

function StatusMetric({
  icon: Icon,
  label,
  value,
  color = "text-[var(--text-primary)]",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="text-center">
      <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
      <div className={`text-2xl font-mono font-medium ${color}`}>{value}</div>
      <div className="text-xs text-[var(--text-secondary)]">{label}</div>
    </div>
  );
}

function ErrorCard({
  title,
  cause,
  solution,
}: {
  title: string;
  cause: string;
  solution: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-medium mb-1">{title}</h4>
          <p className="text-sm text-[var(--text-secondary)] mb-2">
            <span className="text-[var(--text-primary)]">Cause:</span> {cause}
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            <span className="text-[var(--text-primary)]">Solution:</span> {solution}
          </p>
        </div>
      </div>
    </div>
  );
}
