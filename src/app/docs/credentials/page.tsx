import { ButtonLink } from "@/components/ui/button";
import { Shield, Key, Server, AlertTriangle, Check, Lock } from "lucide-react";

export const metadata = {
  title: "Credentials",
  description: "How to configure scan credentials for Windows and Linux targets.",
};

export default function CredentialsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-medium mb-4">Credential Setup</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          OmniGaze needs appropriate credentials to scan your servers. This guide covers
          setting up credentials for both Windows and Linux environments.
        </p>
      </div>

      {/* Security Note */}
      <section>
        <div className="bg-[var(--amber-400)]/10 border border-[var(--amber-400)]/30 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[var(--amber-400)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-[var(--amber-400)] mb-1">Credential Security</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                All credentials are encrypted at rest using AES-256 and stored locally in your
                OmniGaze database. Credentials are never transmitted to our servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Windows Credentials */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Server className="w-6 h-6 text-[var(--amber-400)]" />
          Windows Credentials
        </h2>

        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Requirements</h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                Domain Administrator or Local Administrator account
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                WMI (Windows Management Instrumentation) enabled
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                Remote Registry service running
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                File and Printer Sharing enabled
              </li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Adding Windows Credentials</h3>
            <ol className="space-y-3 text-[var(--text-secondary)]">
              <li>
                <strong>1.</strong> In OmniGaze, go to <strong>Settings → Credentials</strong>
              </li>
              <li>
                <strong>2.</strong> Click <strong>Add Credential</strong>
              </li>
              <li>
                <strong>3.</strong> Select <strong>Windows</strong> as the type
              </li>
              <li>
                <strong>4.</strong> Enter:
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• <strong>Username:</strong> DOMAIN\username or username@domain.com</li>
                  <li>• <strong>Password:</strong> Account password</li>
                  <li>• <strong>Description:</strong> Friendly name (optional)</li>
                </ul>
              </li>
              <li>
                <strong>5.</strong> Click <strong>Test</strong> to verify, then <strong>Save</strong>
              </li>
            </ol>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Firewall Ports Required</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[var(--text-muted)]">WMI:</span>
                <span className="ml-2 font-mono">TCP 135, 445</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Dynamic RPC:</span>
                <span className="ml-2 font-mono">TCP 49152-65535</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">SMB:</span>
                <span className="ml-2 font-mono">TCP 445</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Remote Registry:</span>
                <span className="ml-2 font-mono">TCP 445</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Linux Credentials */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Key className="w-6 h-6 text-[var(--amber-400)]" />
          Linux Credentials (SSH)
        </h2>

        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Requirements</h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                SSH access enabled (port 22)
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                User account with sudo privileges
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                Password authentication OR SSH key authentication
              </li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Adding SSH Password Credentials</h3>
            <ol className="space-y-3 text-[var(--text-secondary)]">
              <li>
                <strong>1.</strong> In OmniGaze, go to <strong>Settings → Credentials</strong>
              </li>
              <li>
                <strong>2.</strong> Click <strong>Add Credential</strong>
              </li>
              <li>
                <strong>3.</strong> Select <strong>SSH (Password)</strong> as the type
              </li>
              <li>
                <strong>4.</strong> Enter username, password, and optional sudo password
              </li>
              <li>
                <strong>5.</strong> Click <strong>Test</strong> to verify, then <strong>Save</strong>
              </li>
            </ol>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Adding SSH Key Credentials</h3>
            <ol className="space-y-3 text-[var(--text-secondary)]">
              <li>
                <strong>1.</strong> Select <strong>SSH (Key)</strong> as the type
              </li>
              <li>
                <strong>2.</strong> Enter username
              </li>
              <li>
                <strong>3.</strong> Click <strong>Browse</strong> to select your private key file
              </li>
              <li>
                <strong>4.</strong> Enter key passphrase if applicable
              </li>
              <li>
                <strong>5.</strong> Test and save
              </li>
            </ol>
            <p className="text-sm text-[var(--text-muted)] mt-3">
              Supported key formats: OpenSSH, PuTTY (.ppk), RSA, ED25519
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[var(--amber-400)]" />
          Best Practices
        </h2>

        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Use Dedicated Service Accounts</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Create dedicated accounts for OmniGaze scanning rather than using personal
              admin accounts. This makes auditing easier and allows for granular permission control.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Least Privilege Principle</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              While admin access provides the most complete scan results, you can use
              limited accounts for basic discovery. Some features may be unavailable.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">SSH Keys Over Passwords</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              For Linux environments, SSH keys are more secure than password authentication.
              Consider using ED25519 keys for better security and performance.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Rotate Credentials Regularly</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Update scan credentials periodically according to your organization&apos;s
              security policies. OmniGaze will notify you when credentials fail.
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="font-display text-2xl mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-500 mb-1">Access Denied Errors</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Verify the account has administrator privileges and that WMI/SSH services
                  are accessible. Check firewall rules between the OmniGaze machine and targets.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">WMI Not Responding</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              On the target Windows server, run: <code className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded">winmgmt /resyncperf</code>
              followed by restarting the WMI service.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">SSH Connection Timeout</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Verify SSH service is running and port 22 is open. Check for fail2ban or
              similar tools that might be blocking connections.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          With credentials configured, you&apos;re ready to start scanning your network.
        </p>
        <ButtonLink href="/docs/scanning" variant="secondary">
          Scanning Guide →
        </ButtonLink>
      </section>
    </div>
  );
}
