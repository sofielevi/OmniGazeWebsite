import Link from "next/link";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Download,
  Server,
  Users,
  Settings,
  Terminal,
  FileCode,
  AlertTriangle,
  Info,
  ChevronDown,
} from "lucide-react";
import { Callout, CommandBlock, DownloadCard, StepList } from "@/components/docs";

export default function WinRMSetupPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">WinRM Setup Guide</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Configure Windows Remote Management for secure, non-admin infrastructure scanning
          in minutes.
        </p>
      </div>

      {/* Quick Start */}
      <section className="bg-gradient-to-br from-[var(--amber-400)]/10 to-transparent border border-[var(--amber-400)]/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[var(--amber-400)]/20 flex items-center justify-center flex-shrink-0">
            <Terminal className="w-6 h-6 text-[var(--amber-400)]" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-medium mb-2">One-Command Setup</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              OmniGaze provides an automated setup script that configures everything:
            </p>
            <CommandBlock language="powershell" title="Run on each target system">
              {`.\Setup-WinRMNonAdmin.ps1 -ServiceAccount "DOMAIN\\svc-omnigaze"`}
            </CommandBlock>
            <p className="text-sm text-[var(--text-secondary)] mt-3">
              That&apos;s it. The script automatically configures all required permissions.
            </p>
          </div>
        </div>
      </section>

      {/* Download */}
      <DownloadCard
        name="Setup-WinRMNonAdmin.zip"
        description="PowerShell script to configure WinRM with non-admin access. Run as administrator on target systems."
        href="/downloads/Setup-WinRMNonAdmin.zip"
        type="archive"
        version="1.1"
        size="12 KB"
      />

      {/* What the Script Does */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">What the Script Configures</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ConfigItem
            icon={Users}
            title="Group Memberships"
            items={[
              "Remote Management Users",
              "Performance Monitor Users",
              "Event Log Readers",
              "Remote Desktop Users",
            ]}
          />
          <ConfigItem
            icon={Shield}
            title="WinRM Service"
            items={[
              "Service permissions (SDDL)",
              "PowerShell session configuration",
              "Read + Execute access",
            ]}
          />
          <ConfigItem
            icon={Server}
            title="WMI Namespace"
            items={[
              "Enable Account permission",
              "Remote Enable permission",
              "root/CimV2 access",
            ]}
          />
          <ConfigItem
            icon={Settings}
            title="Firewall & Network"
            items={[
              "TCP 5985 (WinRM HTTP)",
              "Local account token filter (if needed)",
            ]}
          />
        </div>
      </section>

      {/* Prerequisites */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Prerequisites</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-elevated)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Requirement</th>
                <th className="text-left px-4 py-3 font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <tr>
                <td className="px-4 py-3 font-medium">Target Systems</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Windows Server 2012 R2 or later, Windows 10/11
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">PowerShell</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Version 4.0 or higher
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Network</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  TCP port 5985 (HTTP) or 5986 (HTTPS) accessible
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Authentication</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Active Directory domain (recommended) or local accounts
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Initial Setup</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  Local Administrator access (one-time for configuration)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Manual Setup Steps */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Manual Setup (Alternative)</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          If you prefer to configure manually or need to troubleshoot, follow these steps:
        </p>

        {/* Step 1 */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[var(--amber-400)] text-[var(--bg-deep)] text-sm flex items-center justify-center font-medium">1</span>
            Create a Service Account
          </h3>
          <CommandBlock language="powershell" title="On Domain Controller">
            {`# Create dedicated service account for WinRM monitoring
New-ADUser -Name "svc-omnigaze" \`
    -UserPrincipalName "svc-omnigaze@yourdomain.com" \`
    -AccountPassword (ConvertTo-SecureString "SecurePassword!" -AsPlainText -Force) \`
    -Enabled $true \`
    -PasswordNeverExpires $true \`
    -CannotChangePassword $true`}
          </CommandBlock>
        </div>

        {/* Step 2 */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[var(--amber-400)] text-[var(--bg-deep)] text-sm flex items-center justify-center font-medium">2</span>
            Add Account to Required Groups
          </h3>
          <CommandBlock language="powershell" title="On each target system">
            {`# Run with admin privileges
Add-LocalGroupMember -Group "Remote Management Users" -Member "DOMAIN\\svc-omnigaze"
Add-LocalGroupMember -Group "Performance Monitor Users" -Member "DOMAIN\\svc-omnigaze"
Add-LocalGroupMember -Group "Event Log Readers" -Member "DOMAIN\\svc-omnigaze"
Add-LocalGroupMember -Group "Remote Desktop Users" -Member "DOMAIN\\svc-omnigaze"`}
          </CommandBlock>
        </div>

        {/* Step 3 */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[var(--amber-400)] text-[var(--bg-deep)] text-sm flex items-center justify-center font-medium">3</span>
            Enable WinRM Service
          </h3>
          <CommandBlock language="powershell" title="On each target system">
            {`# Enable WinRM service
Enable-PSRemoting -Force

# Configure WinRM settings (auto-configures firewall and listeners)
winrm quickconfig -quiet

# Set WinRM service to automatic start
Set-Service -Name WinRM -StartupType Automatic

# Increase memory limits (recommended)
Set-Item WSMan:\\localhost\\Shell\\MaxMemoryPerShellMB 2048`}
          </CommandBlock>
        </div>

        {/* Step 4 */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[var(--amber-400)] text-[var(--bg-deep)] text-sm flex items-center justify-center font-medium">4</span>
            Configure WinRM Permissions
          </h3>
          <CommandBlock language="powershell" title="Opens GUI to configure permissions">
            {`# Open WinRM permission configuration GUI
winrm configSDDL default

# In the dialog:
# 1. Click "Add"
# 2. Enter the service account name
# 3. Grant: Read (Get, Enumerate, Subscribe) + Execute (Invoke)
# 4. Click OK`}
          </CommandBlock>
        </div>

        {/* Step 5 */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[var(--amber-400)] text-[var(--bg-deep)] text-sm flex items-center justify-center font-medium">5</span>
            Configure WMI Namespace Permissions
          </h3>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
            <ol className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>1. Run <code className="px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded">wmimgmt.msc</code></li>
              <li>2. Right-click &quot;WMI Control&quot; → Properties</li>
              <li>3. Select &quot;Security&quot; tab</li>
              <li>4. Navigate to <code className="px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded">Root\CIMV2</code></li>
              <li>5. Click &quot;Security&quot; button</li>
              <li>6. Add your service account (DOMAIN\svc-omnigaze)</li>
              <li>7. Grant: <strong>Enable Account</strong>, <strong>Remote Enable</strong>, <strong>Read Security</strong>, <strong>Execute Methods</strong></li>
              <li>8. Click &quot;Advanced&quot; and ensure &quot;This namespace and subnamespaces&quot; is selected</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Cluster Access */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Cluster Access (Optional)</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          For Failover Cluster information, run on each cluster node:
        </p>
        <CommandBlock language="powershell" title="Grant read-only cluster access">
          {`Grant-ClusterAccess -User "DOMAIN\\svc-omnigaze" -ReadOnly`}
        </CommandBlock>
      </section>

      {/* IIS Configuration */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">IIS Configuration Access (Optional)</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          To read IIS configuration without admin, grant NTFS read permission on the config folder:
        </p>
        <CommandBlock language="powershell" title="On IIS servers">
          {`# One-time setup on IIS servers
$configPath = "$env:windir\\system32\\inetsrv\\config"
$acl = Get-Acl $configPath
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
    "DOMAIN\\svc-omnigaze", "Read", "ContainerInherit,ObjectInherit", "None", "Allow"
)
$acl.AddAccessRule($rule)
Set-Acl $configPath $acl`}
        </CommandBlock>
        <Callout type="info" title="What This Enables">
          This allows reading <code>applicationHost.config</code> which contains all IIS sites,
          app pools, and bindings. OmniGaze parses this XML file directly without requiring
          IIS PowerShell cmdlets.
        </Callout>
      </section>

      {/* Verification */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Verification</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Test your configuration with these commands:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm mb-2">Test WinRM Connectivity</h3>
            <CommandBlock language="powershell">
              {`Test-WSMan -ComputerName "targetserver.domain.com"`}
            </CommandBlock>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-2">Test with Credentials</h3>
            <CommandBlock language="powershell">
              {`$cred = Get-Credential DOMAIN\\svc-omnigaze
Test-WSMan -ComputerName "targetserver" -Credential $cred`}
            </CommandBlock>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-2">Test Remote Session</h3>
            <CommandBlock language="powershell">
              {`$cred = Get-Credential DOMAIN\\svc-omnigaze
Enter-PSSession -ComputerName "targetserver" -Credential $cred

# If successful, test a WMI query
Get-CimInstance -ClassName Win32_OperatingSystem`}
            </CommandBlock>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-2">Test Specific Data Access</h3>
            <CommandBlock language="powershell">
              {`$cred = Get-Credential DOMAIN\\svc-omnigaze
$session = New-CimSession -ComputerName "targetserver" -Credential $cred

# Test various queries
Get-CimInstance -CimSession $session -ClassName Win32_Process | Select -First 5
Get-CimInstance -CimSession $session -ClassName Win32_Processor
Get-CimInstance -CimSession $session -ClassName Win32_OperatingSystem

# Clean up
Remove-CimSession -CimSession $session`}
            </CommandBlock>
          </div>
        </div>

        <Callout type="tip" title="Expected Output">
          If configured correctly, all commands should return data without &quot;Access Denied&quot;
          errors. The service account can query system information without having local admin rights.
        </Callout>
      </section>

      {/* Group Policy Deployment */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Group Policy Deployment (Enterprise)</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          For deploying to many systems via GPO:
        </p>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <div className="space-y-4 text-sm">
            <GPOStep
              title="Create GPO"
              path="Group Policy Management Console"
              details="Create new GPO: 'WinRM Non-Admin Configuration'"
            />
            <GPOStep
              title="Configure WinRM Service"
              path="Computer Config → Admin Templates → Windows Components → WinRM → WinRM Service"
              details="Allow remote server management through WinRM: Enabled"
            />
            <GPOStep
              title="Configure Windows Remote Shell"
              path="Computer Config → Admin Templates → Windows Components → Windows Remote Shell"
              details="Allow Remote Shell Access: Enabled"
            />
            <GPOStep
              title="Configure Group Membership"
              path="Computer Config → Windows Settings → Security Settings → Restricted Groups"
              details="Add 'Remote Management Users' group with svc-omnigaze as member"
            />
            <GPOStep
              title="Configure WinRM Startup"
              path="Computer Config → Windows Settings → Security Settings → System Services"
              details="Windows Remote Management (WS-Management): Automatic"
            />
            <GPOStep
              title="Configure Firewall"
              path="Computer Config → Windows Settings → Security Settings → Windows Firewall → Inbound Rules"
              details="Select 'Windows Remote Management' predefined rules"
            />
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-4">Next Steps</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/security/troubleshooting"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Troubleshooting Guide
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs/infrastructure/scanning"
            className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
          >
            Start Network Scanning
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ConfigItem({
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
          <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GPOStep({
  title,
  path,
  details,
}: {
  title: string;
  path: string;
  details: string;
}) {
  return (
    <div className="border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0">
      <h4 className="font-medium mb-1">{title}</h4>
      <div className="text-xs text-[var(--text-muted)] font-mono mb-1">{path}</div>
      <div className="text-[var(--text-secondary)]">{details}</div>
    </div>
  );
}
