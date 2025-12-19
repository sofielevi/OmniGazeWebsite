import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  XCircle,
  Server,
  Cloud,
  Key,
  Lock,
  Gauge,
  ChevronRight,
} from "lucide-react";
import { Callout, CommandBlock } from "@/components/docs";

export default function CredentialJourneyPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">
          Route to Least Privilege
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          The progressive journey from high-privilege scanning to minimal-privilege
          observability, enabling comprehensive infrastructure visibility while minimizing
          security exposure.
        </p>
      </div>

      {/* Privilege Spectrum Visual */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">The Privilege Spectrum</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px] gap-2">
            <SpectrumStep
              label="WMI + Local Admin"
              sublabel="Legacy approach"
              color="bg-red-500"
              active={false}
            />
            <ArrowStep label="Reduce" />
            <SpectrumStep
              label="WMI Limited"
              sublabel="Namespace permissions"
              color="bg-yellow-500"
              active={false}
            />
            <ArrowStep label="Migrate" />
            <SpectrumStep
              label="WinRM Read-Only"
              sublabel="Recommended"
              color="bg-green-500"
              active={true}
            />
            <ArrowStep label="Enhance" />
            <SpectrumStep
              label="Log Analytics"
              sublabel="Zero-touch cloud"
              color="bg-blue-500"
              active={false}
            />
          </div>
        </div>
      </section>

      {/* Method 1: WMI + Local Admin */}
      <section id="wmi-admin">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h2 className="font-display text-xl font-medium">1. WMI with Local Admin Access</h2>
            <span className="text-sm text-red-400">LEGACY - Not recommended for new deployments</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Architecture Diagram */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
            <h3 className="font-medium mb-4 text-sm text-[var(--text-muted)]">Legacy Architecture</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                OmniGaze Scanner
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-[var(--border-subtle)]" />
                  <span className="text-xs text-[var(--text-muted)] my-1">Domain/Local Admin</span>
                  <div className="w-px h-4 bg-[var(--border-subtle)]" />
                </div>
              </div>
              <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg">
                <div className="text-center mb-2 text-[var(--text-muted)]">Target System</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-[var(--bg-deep)] rounded text-center">
                    DCOM/RPC<br />Port 135 + Dynamic
                  </div>
                  <div className="p-2 bg-[var(--bg-deep)] rounded text-center">
                    ADMIN$ Share<br />Port 445
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Move Away */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
            <h3 className="font-medium mb-4">Why Move Away?</h3>
            <div className="space-y-3">
              <RiskRow
                risk="Credential exposure"
                impact="Admin credentials stored/transmitted"
              />
              <RiskRow
                risk="Lateral movement"
                impact="Compromised creds = full network access"
              />
              <RiskRow
                risk="Firewall complexity"
                impact="Multiple dynamic ports required"
              />
              <RiskRow
                risk="Audit concerns"
                impact="Admin access triggers security alerts"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Method 2: WMI Limited */}
      <section id="wmi-limited">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <Key className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h2 className="font-display text-xl font-medium">2. WMI without Local Admin</h2>
            <span className="text-sm text-yellow-400">TRANSITIONAL - Stepping stone to WinRM</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
            <h3 className="font-medium mb-4 text-sm text-[var(--text-muted)]">Reduced Privilege Architecture</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
                OmniGaze Scanner
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-[var(--border-subtle)]" />
                  <span className="text-xs text-[var(--text-muted)] my-1">Service Account (No Admin)</span>
                  <div className="w-px h-4 bg-[var(--border-subtle)]" />
                </div>
              </div>
              <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg">
                <div className="text-center mb-2 text-[var(--text-muted)]">Accessible Namespaces</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-[var(--bg-deep)] rounded text-center">root/CimV2</div>
                  <div className="p-2 bg-[var(--bg-deep)] rounded text-center">root/StandardCimV2</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
            <h3 className="font-medium mb-4">Limitations</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Still requires DCOM/RPC firewall rules
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Complex WMI namespace permission setup
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                No Event Log Readers capability
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Protocol overhead higher than WinRM
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Method 3: WinRM Read-Only (Recommended) */}
      <section id="winrm" className="relative">
        <div className="absolute -inset-4 bg-[var(--amber-400)]/5 rounded-2xl -z-10" />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h2 className="font-display text-xl font-medium">3. WinRM with Read-Only Access</h2>
            <span className="text-sm text-green-400">RECOMMENDED - Best balance of capability and security</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[var(--bg-card)] border border-[var(--amber-400)]/30 rounded-xl p-5">
            <h3 className="font-medium mb-4 text-sm text-[var(--text-muted)]">Recommended Architecture</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                OmniGaze Scanner
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-[var(--border-subtle)]" />
                  <span className="text-xs text-[var(--text-muted)] my-1">Service Account + Read-Only Groups</span>
                  <div className="w-px h-4 bg-[var(--border-subtle)]" />
                </div>
              </div>
              <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg">
                <div className="text-center mb-2 text-[var(--text-muted)]">WinRM Service (TCP 5985)</div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="p-1.5 bg-[var(--bg-deep)] rounded text-center">Get-CimInstance</div>
                  <div className="p-1.5 bg-[var(--bg-deep)] rounded text-center">Get-Process</div>
                  <div className="p-1.5 bg-[var(--bg-deep)] rounded text-center">Get-Service</div>
                  <div className="p-1.5 bg-[var(--bg-deep)] rounded text-center">Get-NetAdapter</div>
                  <div className="p-1.5 bg-[var(--bg-deep)] rounded text-center">Get-Volume</div>
                  <div className="p-1.5 bg-[var(--bg-deep)] rounded text-center">Get-EventLog</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--amber-400)]/30 rounded-xl p-5">
            <h3 className="font-medium mb-4">What You Get Without Admin</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <CapabilityChip label="Hardware" description="CPU, Memory, BIOS" />
              <CapabilityChip label="Operating System" description="Version, Patches" />
              <CapabilityChip label="Network" description="Adapters, IPs, Connections" />
              <CapabilityChip label="Processes" description="All running processes" />
              <CapabilityChip label="Services" description="Status, Startup type" />
              <CapabilityChip label="Software" description="Installed programs" />
              <CapabilityChip label="Storage" description="Volumes, Capacity" />
              <CapabilityChip label="Certificates" description="Expiry dates" />
              <CapabilityChip label="Event Logs" description="System, App, Security" />
              <CapabilityChip label="Cluster Info" description="Nodes, Resources" />
              <CapabilityChip label="IIS Sites" description="App Pools, Bindings" />
              <CapabilityChip label="Features" description="Windows roles" />
            </div>
          </div>
        </div>

        <Callout type="info" title="Firewall: Single Port">
          WinRM only requires <strong>TCP 5985</strong> (HTTP) or <strong>TCP 5986</strong> (HTTPS).
          Compare to WMI: Port 135 + dynamic range 49152-65535.
        </Callout>

        <div className="mt-4">
          <Link
            href="/dashboard/docs/security/winrm-setup"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--amber-400)] text-[var(--bg-deep)] font-medium text-sm hover:bg-[var(--amber-500)] transition-colors"
          >
            View WinRM Setup Guide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Method 4: Log Analytics */}
      <section id="log-analytics">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="font-display text-xl font-medium">4. Log Analytics / Azure Graph API</h2>
            <span className="text-sm text-blue-400">CLOUD-NATIVE - Zero-touch passive scanning</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
            <h3 className="font-medium mb-4 text-sm text-[var(--text-muted)]">Cloud-Native Architecture</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-[var(--bg-elevated)] rounded text-center text-xs">Server 1</div>
                <div className="p-2 bg-[var(--bg-elevated)] rounded text-center text-xs">Server 2</div>
                <div className="p-2 bg-[var(--bg-elevated)] rounded text-center text-xs">Server N</div>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-[var(--text-muted)]">Agent Upload (Outbound HTTPS)</div>
                  <div className="w-px h-3 bg-[var(--border-subtle)]" />
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
                Log Analytics Workspace
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-px h-3 bg-[var(--border-subtle)]" />
                  <div className="text-xs text-[var(--text-muted)]">OAuth 2.0 Read-Only</div>
                  <div className="w-px h-3 bg-[var(--border-subtle)]" />
                </div>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                OmniGaze
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
            <h3 className="font-medium mb-4">Zero Credentials on Target Systems</h3>
            <div className="space-y-3 text-sm">
              <CompareRow traditional="Deploy credentials to targets" cloudNative="No credentials needed" />
              <CompareRow traditional="Open firewall ports inbound" cloudNative="Agents use outbound HTTPS only" />
              <CompareRow traditional="Maintain service accounts" cloudNative="Azure AD app registration" />
              <CompareRow traditional="Credential rotation burden" cloudNative="Token-based authentication" />
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
              <h4 className="font-medium text-sm mb-2">Best For:</h4>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• Global enterprises with Azure/M365</li>
                <li>• Environments where agents are already deployed</li>
                <li>• Historical data analysis (up to 70,000 days retention)</li>
                <li>• Hybrid cloud infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Scorecard */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Method Scorecard</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <ScoreCard
            method="WMI + Admin"
            color="text-red-400"
            bgColor="bg-red-500/10"
            scores={{ security: 2, setup: 5, capability: 10, overall: 4 }}
          />
          <ScoreCard
            method="WMI Limited"
            color="text-yellow-400"
            bgColor="bg-yellow-500/10"
            scores={{ security: 5, setup: 3, capability: 6, overall: 5 }}
          />
          <ScoreCard
            method="WinRM Read-Only"
            color="text-green-400"
            bgColor="bg-green-500/10"
            scores={{ security: 8, setup: 9, capability: 10, overall: 9.5 }}
            highlighted
          />
          <ScoreCard
            method="Log Analytics"
            color="text-blue-400"
            bgColor="bg-blue-500/10"
            scores={{ security: 10, setup: 6, capability: 8, overall: 8 }}
          />
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">What Actually Requires Admin?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Reality: WinRM non-admin provides <strong>100% of capabilities</strong> with proper permissions.
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Feature</th>
                <th className="text-center px-4 py-3 font-medium">WMI Admin</th>
                <th className="text-center px-4 py-3 font-medium text-[var(--amber-400)]">WinRM Non-Admin</th>
                <th className="text-left px-4 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <FeatureRow feature="Core System Info" wmi={true} winrm={true} notes="Always available" />
              <FeatureRow feature="Network Configuration" wmi={true} winrm={true} notes="Always available" />
              <FeatureRow feature="Running Processes" wmi={true} winrm={true} notes="Always available" />
              <FeatureRow feature="Installed Software" wmi={true} winrm={true} notes="Always available" />
              <FeatureRow feature="Storage/Volumes" wmi={true} winrm={true} notes="Always available" />
              <FeatureRow feature="Process Owners" wmi={true} winrm={true} notes="Via Get-Process" />
              <FeatureRow feature="Event Logs" wmi={true} winrm={true} notes="Event Log Readers group" />
              <FeatureRow feature="Cluster Info" wmi={true} winrm={true} notes="Cluster Read-Only access" />
              <FeatureRow feature="IIS Configuration" wmi={true} winrm={true} notes="Config file read permission" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h2 className="font-display text-xl font-medium mb-4">Summary</h2>
        <div className="bg-[var(--bg-elevated)] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-deep)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Method</th>
                <th className="text-left px-4 py-3 font-medium">When to Use</th>
                <th className="text-center px-4 py-3 font-medium">Setup Time</th>
                <th className="text-left px-4 py-3 font-medium">Limitations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <tr>
                <td className="px-4 py-3 text-red-400">WMI + Admin</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Never (legacy only)</td>
                <td className="px-4 py-3 text-center">-</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Security risk</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-yellow-400">WMI Limited</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Transitional step</td>
                <td className="px-4 py-3 text-center">Hours</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">No Event Logs/Cluster/IIS</td>
              </tr>
              <tr className="bg-[var(--amber-400)]/5">
                <td className="px-4 py-3 text-green-400 font-medium">WinRM Read-Only</td>
                <td className="px-4 py-3 font-medium">Default choice</td>
                <td className="px-4 py-3 text-center font-medium">Minutes</td>
                <td className="px-4 py-3 font-medium">None</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-blue-400">Log Analytics</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Cloud enhancement</td>
                <td className="px-4 py-3 text-center">Hours</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Requires Azure</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gradient-to-br from-[var(--amber-400)]/10 to-transparent border border-[var(--amber-400)]/20 rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Ready to Get Started?</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/docs/security/winrm-setup"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--amber-400)] text-[var(--bg-deep)] font-medium text-sm hover:bg-[var(--amber-500)] transition-colors"
          >
            Setup WinRM Read-Only
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard/docs/security/troubleshooting"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Troubleshooting Guide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SpectrumStep({
  label,
  sublabel,
  color,
  active,
}: {
  label: string;
  sublabel: string;
  color: string;
  active: boolean;
}) {
  return (
    <div
      className={`text-center p-3 rounded-lg border-2 ${
        active
          ? "border-[var(--amber-400)] bg-[var(--amber-400)]/10"
          : "border-transparent bg-[var(--bg-elevated)]"
      }`}
    >
      <div className={`w-3 h-3 ${color} rounded-full mx-auto mb-2`} />
      <div className="text-sm font-medium whitespace-nowrap">{label}</div>
      <div className="text-xs text-[var(--text-muted)]">{sublabel}</div>
    </div>
  );
}

function ArrowStep({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
      <span className="text-xs text-[var(--text-muted)]">{label}</span>
    </div>
  );
}

function RiskRow({ risk, impact }: { risk: string; impact: string }) {
  return (
    <div className="flex items-start gap-3 p-2 rounded bg-red-500/5">
      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
      <div className="text-sm">
        <span className="font-medium">{risk}:</span>{" "}
        <span className="text-[var(--text-secondary)]">{impact}</span>
      </div>
    </div>
  );
}

function CapabilityChip({ label, description }: { label: string; description: string }) {
  return (
    <div className="p-2 bg-[var(--bg-elevated)] rounded">
      <div className="font-medium text-[var(--text-primary)]">{label}</div>
      <div className="text-[var(--text-muted)]">{description}</div>
    </div>
  );
}

function CompareRow({ traditional, cloudNative }: { traditional: string; cloudNative: string }) {
  return (
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="p-2 bg-red-500/5 rounded text-[var(--text-secondary)]">
        <XCircle className="w-3 h-3 text-red-400 inline mr-1" />
        {traditional}
      </div>
      <div className="p-2 bg-green-500/5 rounded text-[var(--text-secondary)]">
        <CheckCircle className="w-3 h-3 text-green-400 inline mr-1" />
        {cloudNative}
      </div>
    </div>
  );
}

function ScoreCard({
  method,
  color,
  bgColor,
  scores,
  highlighted = false,
}: {
  method: string;
  color: string;
  bgColor: string;
  scores: { security: number; setup: number; capability: number; overall: number };
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlighted ? "border-[var(--amber-400)]/50 ring-2 ring-[var(--amber-400)]/20" : "border-[var(--border-subtle)]"
      } ${bgColor}`}
    >
      <h3 className={`font-medium text-sm mb-3 ${color}`}>{method}</h3>
      <div className="space-y-2">
        <ScoreBar label="Security" value={scores.security} />
        <ScoreBar label="Setup" value={scores.setup} />
        <ScoreBar label="Capability" value={scores.capability} />
      </div>
      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
        <div className="flex justify-between items-center">
          <span className="text-xs text-[var(--text-muted)]">Overall</span>
          <span className={`font-mono font-bold ${color}`}>{scores.overall}/10</span>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[var(--text-muted)]">{label}</span>
        <span>{value}/10</span>
      </div>
      <div className="h-1.5 bg-[var(--bg-deep)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--amber-400)] rounded-full"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}

function FeatureRow({
  feature,
  wmi,
  winrm,
  notes,
}: {
  feature: string;
  wmi: boolean;
  winrm: boolean;
  notes: string;
}) {
  return (
    <tr>
      <td className="px-4 py-2">{feature}</td>
      <td className="px-4 py-2 text-center">
        {wmi ? (
          <CheckCircle className="w-4 h-4 text-green-400 inline" />
        ) : (
          <XCircle className="w-4 h-4 text-red-400 inline" />
        )}
      </td>
      <td className="px-4 py-2 text-center bg-[var(--amber-400)]/5">
        {winrm ? (
          <CheckCircle className="w-4 h-4 text-green-400 inline" />
        ) : (
          <XCircle className="w-4 h-4 text-red-400 inline" />
        )}
      </td>
      <td className="px-4 py-2 text-[var(--text-secondary)]">{notes}</td>
    </tr>
  );
}
