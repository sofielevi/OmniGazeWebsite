import { ButtonLink } from "@/components/ui/button";
import { Scan, Target, Zap, Clock, AlertTriangle, Check, Settings } from "lucide-react";

export const metadata = {
  title: "Scanning",
  description: "How to discover servers and applications with OmniGaze network scanning.",
};

export default function ScanningPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-medium mb-4">Scanning Guide</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Learn how to discover servers, applications, and dependencies across your network
          using OmniGaze&apos;s powerful scanning engine.
        </p>
      </div>

      {/* Quick Scan */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-[var(--amber-400)]" />
          Quick Scan
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <p className="text-[var(--text-secondary)] mb-4">
            The fastest way to get started is with a Quick Scan:
          </p>
          <ol className="space-y-3 text-[var(--text-secondary)]">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">1</span>
              <span>Click <strong>Scan</strong> in the main toolbar</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">2</span>
              <span>Enter an IP address, hostname, or CIDR range (e.g., <code className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded text-sm">192.168.1.0/24</code>)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">3</span>
              <span>Select credentials (or let OmniGaze try all available)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">4</span>
              <span>Click <strong>Start Scan</strong></span>
            </li>
          </ol>
        </div>
      </section>

      {/* Scan Targets */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-[var(--amber-400)]" />
          Scan Targets
        </h2>

        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Supported Input Formats</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-[var(--text-muted)] mb-2">Single Targets</h4>
                <ul className="space-y-1 font-mono text-sm text-[var(--text-secondary)]">
                  <li>192.168.1.100</li>
                  <li>server01.domain.local</li>
                  <li>web-server-01</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm text-[var(--text-muted)] mb-2">Ranges & CIDR</h4>
                <ul className="space-y-1 font-mono text-sm text-[var(--text-secondary)]">
                  <li>192.168.1.0/24</li>
                  <li>10.0.0.1-10.0.0.254</li>
                  <li>192.168.1.1,192.168.1.2</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-3">Import from File</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              You can also import targets from a text file with one target per line:
            </p>
            <pre className="bg-[var(--bg-elevated)] p-4 rounded-lg text-sm overflow-x-auto">
{`# servers.txt
192.168.1.10
192.168.1.11
web-server.domain.local
db-server.domain.local`}
            </pre>
          </div>
        </div>
      </section>

      {/* Scan Types */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Scan className="w-6 h-6 text-[var(--amber-400)]" />
          Scan Types
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Discovery Scan</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Basic scan to find live hosts and identify operating systems. Fast but limited detail.
            </p>
            <ul className="space-y-1 text-sm text-[var(--text-muted)]">
              <li>• Ping sweep</li>
              <li>• OS fingerprinting</li>
              <li>• Basic port detection</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Full Scan</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Complete inventory including software, services, and configurations.
            </p>
            <ul className="space-y-1 text-sm text-[var(--text-muted)]">
              <li>• Installed software</li>
              <li>• Running services</li>
              <li>• Network connections</li>
              <li>• Hardware details</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Process Scan</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Deep analysis of running processes and application dependencies.
            </p>
            <ul className="space-y-1 text-sm text-[var(--text-muted)]">
              <li>• Process listing</li>
              <li>• Network connections per process</li>
              <li>• Application mapping</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Scheduled Scan</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3">
              Automated recurring scans to keep your inventory current.
            </p>
            <ul className="space-y-1 text-sm text-[var(--text-muted)]">
              <li>• Daily, weekly, monthly</li>
              <li>• Change detection</li>
              <li>• Email notifications</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What Gets Discovered */}
      <section>
        <h2 className="font-display text-2xl mb-4">What Gets Discovered</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-3 text-[var(--amber-400)]">Hardware</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  CPU, memory, disks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  Network adapters
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  Virtual vs physical
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-[var(--amber-400)]">Software</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  Installed applications
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  Running services
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  Web servers, databases
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-[var(--amber-400)]">Connections</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  Active network connections
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  Listening ports
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                  Inter-server dependencies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scan Settings */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6 text-[var(--amber-400)]" />
          Scan Settings
        </h2>
        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Concurrent Scans</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Control how many servers are scanned simultaneously. Higher values are faster
              but use more network bandwidth. Default: 10 concurrent scans.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Timeout Settings</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Adjust connection and command timeouts for slow networks or busy servers.
              Default: 30 seconds connection, 60 seconds command timeout.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Exclusions</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Define IP ranges or hostnames to always skip during network-wide scans.
              Useful for excluding sensitive systems or known problem hosts.
            </p>
          </div>
        </div>
      </section>

      {/* Performance Tips */}
      <section>
        <h2 className="font-display text-2xl mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-[var(--amber-400)]" />
          Performance Tips
        </h2>
        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                <span>Start with smaller ranges to test connectivity before large scans</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                <span>Run full scans during off-peak hours to minimize network impact</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                <span>Use Discovery scan first, then Full scan on known servers</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                <span>Schedule recurring scans rather than manual daily scans</span>
              </li>
            </ul>
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
                <h3 className="font-medium text-yellow-500 mb-1">Scan Shows 0 Results</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Check that credentials are correct, firewall ports are open, and the target
                  is reachable (try pinging it first).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Partial Data Collected</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Some data requires elevated privileges. Ensure your scan account has
              administrator access for complete results.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Once you&apos;ve discovered your infrastructure, visualize it in 2D or 3D.
        </p>
        <ButtonLink href="/docs/visualization" variant="secondary">
          Visualization Guide →
        </ButtonLink>
      </section>
    </div>
  );
}
