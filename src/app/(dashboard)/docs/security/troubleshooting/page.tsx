import Link from "next/link";
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  ArrowRight,
  Shield,
  Terminal,
  FileText,
  HelpCircle,
  Clock,
  Lock,
  Wifi,
  Key,
  Server,
} from "lucide-react";
import { Callout, CommandBlock } from "@/components/docs";

export default function TroubleshootingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">Troubleshooting</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Common issues and diagnostic commands for WinRM and credential configuration.
        </p>
      </div>

      {/* Quick Diagnostics */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Quick Diagnostic Commands</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <DiagnosticCard
            title="Test Port Connectivity"
            command="Test-NetConnection -ComputerName TARGET -Port 5985"
            description="Check if WinRM port is reachable"
          />
          <DiagnosticCard
            title="Test WinRM Service"
            command="Test-WSMan -ComputerName TARGET"
            description="Verify WinRM is responding"
          />
          <DiagnosticCard
            title="Test with Credentials"
            command="Test-WSMan -ComputerName TARGET -Credential (Get-Credential)"
            description="Test authentication"
          />
          <DiagnosticCard
            title="Check WinRM Config"
            command="winrm get winrm/config"
            description="View current WinRM settings"
          />
        </div>
      </section>

      {/* Common Issues */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Common Issues</h2>
        <div className="space-y-4">
          {/* Access Denied */}
          <IssueCard
            icon={Lock}
            iconColor="text-red-400"
            title="Access Denied (0x80070005)"
            symptoms={[
              "Access is denied error",
              "Error code 0x80070005",
              "Permission denied when connecting",
            ]}
            causes={[
              "UAC filtering for local accounts",
              "Missing group memberships",
              "Incorrect WMI permissions",
              "Network profile set to Public",
            ]}
            solutions={[
              {
                title: "Verify group membership",
                command: `whoami /groups
# On remote system:
Get-LocalGroupMember -Group "Remote Management Users"`,
              },
              {
                title: "Check UAC filtering (local accounts)",
                command: `Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" -Name LocalAccountTokenFilterPolicy`,
              },
              {
                title: "Verify network profile",
                command: `Get-NetConnectionProfile
# Change from Public to Private/Domain:
Set-NetConnectionProfile -InterfaceAlias "Ethernet" -NetworkCategory Private`,
              },
              {
                title: "Check WinRM service",
                command: `Get-Service WinRM`,
              },
            ]}
          />

          {/* Connection Timeout */}
          <IssueCard
            icon={Clock}
            iconColor="text-yellow-400"
            title="Connection Timeout"
            symptoms={[
              "Connection attempts timeout",
              "No response from target",
              "Request timed out",
            ]}
            causes={[
              "Firewall blocking port 5985/5986",
              "WinRM service not running",
              "Network connectivity issues",
              "WinRM listener not configured",
            ]}
            solutions={[
              {
                title: "Check firewall rules",
                command: `Test-NetConnection -ComputerName TARGET -Port 5985`,
              },
              {
                title: "Verify WinRM listener",
                command: `winrm enumerate winrm/config/listener`,
              },
              {
                title: "Check if WinRM is running",
                command: `Get-Service WinRM
Start-Service WinRM`,
              },
              {
                title: "Enable WinRM firewall rules",
                command: `Enable-NetFirewallRule -DisplayName "Windows Remote Management (HTTP-In)"`,
              },
            ]}
          />

          {/* Authentication Failures */}
          <IssueCard
            icon={Key}
            iconColor="text-orange-400"
            title="Authentication Failures"
            symptoms={[
              "The user name or password is incorrect",
              "Logon failure",
              "Kerberos authentication failed",
            ]}
            causes={[
              "Account is locked or disabled",
              "Kerberos ticket issues",
              "SPN misconfiguration",
              "Wrong credentials",
            ]}
            solutions={[
              {
                title: "Verify account is not locked",
                command: `Get-ADUser svc-omnigaze -Properties LockedOut, Enabled`,
              },
              {
                title: "Check Kerberos tickets",
                command: `klist`,
              },
              {
                title: "Test with NTLM authentication",
                command: `Test-WSMan -ComputerName TARGET -Authentication Negotiate`,
              },
              {
                title: "Purge and refresh tickets",
                command: `klist purge
# Then try connecting again`,
              },
            ]}
          />

          {/* Insufficient Permissions */}
          <IssueCard
            icon={Shield}
            iconColor="text-purple-400"
            title="Insufficient Permissions for Specific Data"
            symptoms={[
              "Some WMI classes return empty data",
              "Partial data returned",
              "Access denied for specific queries",
            ]}
            causes={[
              "Missing Event Log Readers group",
              "Missing WMI namespace permissions",
              "Missing cluster access",
              "Missing IIS config read permission",
            ]}
            solutions={[
              {
                title: "Add to Event Log Readers",
                command: `Add-LocalGroupMember -Group "Event Log Readers" -Member "DOMAIN\\svc-omnigaze"`,
              },
              {
                title: "Grant cluster read access",
                command: `Grant-ClusterAccess -User "DOMAIN\\svc-omnigaze" -ReadOnly`,
              },
              {
                title: "Check WMI permissions",
                command: `# Open WMI permission GUI
wmimgmt.msc
# Navigate to Root\\CimV2 → Security`,
              },
            ]}
          />

          {/* WinRM Not Configured */}
          <IssueCard
            icon={Server}
            iconColor="text-blue-400"
            title="WinRM Not Configured"
            symptoms={[
              "WinRM service not found",
              "Cannot connect to WinRM service",
              "WS-Management service error",
            ]}
            causes={[
              "WinRM service not enabled",
              "WinRM quickconfig not run",
              "Listener not created",
            ]}
            solutions={[
              {
                title: "Enable WinRM",
                command: `Enable-PSRemoting -Force`,
              },
              {
                title: "Run quickconfig",
                command: `winrm quickconfig -quiet`,
              },
              {
                title: "Create HTTP listener manually",
                command: `winrm create winrm/config/Listener?Address=*+Transport=HTTP`,
              },
            ]}
          />
        </div>
      </section>

      {/* Diagnostic Commands Reference */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Complete Diagnostic Script</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Run this comprehensive diagnostic to identify issues:
        </p>
        <CommandBlock language="powershell" title="Full diagnostic script">
          {`# WinRM Diagnostic Script
# Run from management workstation

$target = "TARGET-SERVER"
$cred = Get-Credential

Write-Host "=== Port Connectivity ===" -ForegroundColor Cyan
Test-NetConnection -ComputerName $target -Port 5985

Write-Host "\\n=== WinRM Service Test ===" -ForegroundColor Cyan
Test-WSMan -ComputerName $target

Write-Host "\\n=== Authenticated Test ===" -ForegroundColor Cyan
Test-WSMan -ComputerName $target -Credential $cred

Write-Host "\\n=== Remote WMI Query ===" -ForegroundColor Cyan
$session = New-CimSession -ComputerName $target -Credential $cred
Get-CimInstance -CimSession $session -ClassName Win32_OperatingSystem |
    Select PSComputerName, Caption
Remove-CimSession $session

Write-Host "\\n=== Test Complete ===" -ForegroundColor Green`}
        </CommandBlock>
      </section>

      {/* WinRM Configuration Checks */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Configuration Verification</h2>
        <div className="space-y-4">
          <CommandBlock language="powershell" title="Check WinRM configuration">
            {`# View full WinRM configuration
winrm get winrm/config

# View listener configuration
winrm enumerate winrm/config/listener

# View current session configuration permissions
(Get-PSSessionConfiguration -Name Microsoft.PowerShell).Permission

# View WinRM service settings
winrm get winrm/config/service

# Check MaxMemoryPerShellMB setting
winrm get winrm/config/winrs`}
          </CommandBlock>

          <CommandBlock language="powershell" title="Check group memberships">
            {`# Check all required groups at once
@("Remote Management Users", "Performance Monitor Users", "Event Log Readers", "Remote Desktop Users") |
ForEach-Object {
    Write-Host "$_:" -ForegroundColor Yellow
    Get-LocalGroupMember -Group $_ | Where-Object {$_.Name -like "*svc-omnigaze*"}
}`}
          </CommandBlock>
        </div>
      </section>

      {/* Event Log Locations */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Event Log Locations</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Check these logs for detailed error information:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Log</th>
                <th className="text-left px-4 py-3 font-medium">Path</th>
                <th className="text-left px-4 py-3 font-medium">Contains</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <tr>
                <td className="px-4 py-3 font-medium">WinRM Operational</td>
                <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-xs">
                  Applications and Services Logs → Microsoft → Windows → WinRM → Operational
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Connection attempts, errors</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">PowerShell Operational</td>
                <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-xs">
                  Applications and Services Logs → Microsoft → Windows → PowerShell → Operational
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Remote command execution</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Security Log</td>
                <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-xs">
                  Windows Logs → Security
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">Event ID 4624/4625 for logons</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CommandBlock language="powershell" title="Enable detailed WinRM logging">
          {`# Enable detailed WinRM logging
wevtutil set-log Microsoft-Windows-WinRM/Operational /enabled:true /rt:true /ms:8388608`}
        </CommandBlock>
      </section>

      {/* Error Code Reference */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Error Code Reference</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Error Code</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
                <th className="text-left px-4 py-3 font-medium">Common Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <ErrorCodeRow
                code="0x80070005"
                description="Access Denied"
                fix="Check group memberships and WinRM SDDL permissions"
              />
              <ErrorCodeRow
                code="0x80070035"
                description="Network path not found"
                fix="Verify network connectivity and firewall rules"
              />
              <ErrorCodeRow
                code="0x80070052"
                description="Cannot connect to WinRM"
                fix="Enable WinRM service and run winrm quickconfig"
              />
              <ErrorCodeRow
                code="0x8007052E"
                description="Logon failure"
                fix="Verify credentials and account is not locked"
              />
              <ErrorCodeRow
                code="0x80090311"
                description="No authority could be contacted"
                fix="Check Kerberos/domain connectivity"
              />
              <ErrorCodeRow
                code="0x80090322"
                description="Target principal name incorrect"
                fix="Verify SPN configuration for service account"
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* When to Contact Support */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">When to Contact Support</h2>
        <Callout type="info" title="Gather This Information First">
          Before contacting support, collect the following:
        </Callout>
        <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              Output from <code className="px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded">Test-WSMan</code> command
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              Output from <code className="px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded">winrm get winrm/config</code>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              Target system OS version and build number
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              Network topology (same subnet/VLAN, across firewalls, etc.)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              Relevant entries from WinRM Operational event log
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--amber-400)] mt-0.5 flex-shrink-0" />
              Screenshot of exact error message
            </li>
          </ul>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Related Documentation</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/docs/security/winrm-setup"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            WinRM Setup Guide
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard/docs/security/credential-journey"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Route to Least Privilege
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard/docs/infrastructure/scanning"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Network Scanning
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function DiagnosticCard({
  title,
  command,
  description,
}: {
  title: string;
  command: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h3 className="font-medium text-sm mb-2">{title}</h3>
      <code className="block text-xs font-mono bg-[var(--bg-deep)] p-2 rounded mb-2 text-[var(--amber-400)]">
        {command}
      </code>
      <p className="text-xs text-[var(--text-muted)]">{description}</p>
    </div>
  );
}

function IssueCard({
  icon: Icon,
  iconColor,
  title,
  symptoms,
  causes,
  solutions,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  symptoms: string[];
  causes: string[];
  solutions: { title: string; command: string }[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Symptoms */}
        <div>
          <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Symptoms
          </h4>
          <ul className="space-y-1">
            {symptoms.map((s, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <AlertTriangle className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Causes */}
        <div>
          <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Possible Causes
          </h4>
          <ul className="space-y-1">
            {causes.map((c, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Solutions
          </h4>
          <div className="space-y-3">
            {solutions.map((s, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                  {s.title}
                </div>
                <code className="block text-xs font-mono bg-[var(--bg-deep)] p-2 rounded text-[var(--text-secondary)] whitespace-pre-wrap">
                  {s.command}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorCodeRow({
  code,
  description,
  fix,
}: {
  code: string;
  description: string;
  fix: string;
}) {
  return (
    <tr>
      <td className="px-4 py-2 font-mono text-[var(--amber-400)]">{code}</td>
      <td className="px-4 py-2">{description}</td>
      <td className="px-4 py-2 text-[var(--text-secondary)]">{fix}</td>
    </tr>
  );
}
