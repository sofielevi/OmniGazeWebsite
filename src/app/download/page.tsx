import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section, SectionHeader } from "@/components/marketing/section";
import { ButtonLink } from "@/components/ui/button";
import { DownloadButton } from "@/components/marketing/download-button";
import { siteConfig } from "@/config/site";
import {
  Download,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  Check,
  FileText,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Download OmniGaze",
  description: "Download OmniGaze for Windows. Auto-discover your infrastructure and visualize your IT landscape.",
};

// Use centralized download config
const { version, releaseDate, fileSize } = siteConfig.download;

export default function DownloadPage() {
  return (
    <>
      <Header />

      <main className="pt-32">
        {/* Hero Download Section */}
        <Section>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] text-sm font-medium mb-6">
              <Download className="w-4 h-4" />
              Version {version}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              Download <span className="text-[var(--amber-400)]">OmniGaze</span>
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
              Get started in minutes. Auto-discover your infrastructure, visualize dependencies,
              and bridge the gap from servers to strategy.
            </p>

            {/* Download Card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-10 max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-500)] flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-[var(--bg-deep)]" />
                </div>
              </div>

              <h2 className="font-display text-2xl mb-2">OmniGaze for Windows</h2>
              <p className="text-[var(--text-muted)] text-sm mb-6">
                Windows 10/11, Windows Server 2016+
              </p>

              <DownloadButton className="w-full mb-4" />

              <p className="text-xs text-[var(--text-muted)]">
                v{version} &bull; {releaseDate} &bull; {fileSize}
              </p>
            </div>
          </div>
        </Section>

        {/* System Requirements */}
        <Section className="bg-[var(--bg-card)]">
          <SectionHeader
            label="Requirements"
            title="System Requirements"
            description="Make sure your system meets these minimum requirements."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <RequirementCard
              icon={Monitor}
              title="Operating System"
              items={[
                "Windows 10 (64-bit)",
                "Windows 11",
                "Windows Server 2016+",
              ]}
            />
            <RequirementCard
              icon={Cpu}
              title="Processor"
              items={[
                "2 GHz dual-core or better",
                "x64 architecture required",
              ]}
            />
            <RequirementCard
              icon={HardDrive}
              title="Storage & Memory"
              items={[
                "4 GB RAM minimum",
                "8 GB RAM recommended",
                "500 MB disk space",
              ]}
            />
            <RequirementCard
              icon={Wifi}
              title="Network"
              items={[
                "Network access to targets",
                "WMI ports (Windows)",
                "SSH port 22 (Linux)",
              ]}
            />
          </div>
        </Section>

        {/* Credentials & Permissions */}
        <Section>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              label="Permissions"
              title="Credential Requirements"
              description="OmniGaze needs appropriate credentials to scan your infrastructure."
            />

            <div className="grid md:grid-cols-2 gap-6">
              <CredentialCard
                title="Windows Targets"
                icon={Shield}
                description="For scanning Windows servers and workstations"
                items={[
                  "Domain admin or local admin account",
                  "WMI access enabled",
                  "Remote Registry service running",
                  "File and Printer Sharing enabled",
                ]}
              />
              <CredentialCard
                title="Linux Targets"
                icon={Shield}
                description="For scanning Linux servers and containers"
                items={[
                  "SSH access with sudo privileges",
                  "Key-based or password authentication",
                  "Port 22 accessible from scanner",
                ]}
              />
            </div>
          </div>
        </Section>

        {/* Installation Steps */}
        <Section className="bg-[var(--bg-card)]">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              label="Installation"
              title="Quick Setup Guide"
              description="Get up and running in under 5 minutes."
            />

            <div className="space-y-6">
              <InstallStep
                number={1}
                title="Download and Install"
                description="Run the installer and follow the setup wizard. Administrator rights required."
              />
              <InstallStep
                number={2}
                title="Register Your Account"
                description="Create a free account or enter your existing license key to activate."
              />
              <InstallStep
                number={3}
                title="Configure Credentials"
                description="Add credentials for the servers you want to scan (Windows admin or SSH keys)."
              />
              <InstallStep
                number={4}
                title="Start Scanning"
                description="Enter IP ranges or hostnames and click Scan. Results appear in real-time."
              />
            </div>

            <div className="mt-10 text-center">
              <ButtonLink href="/docs" variant="secondary">
                Read Full Documentation
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>
          </div>
        </Section>

        {/* What's Included */}
        <Section>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              label="Features"
              title="What&apos;s Included"
              description="Everything you need to discover and visualize your infrastructure."
            />

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Auto-discovery for Windows and Linux",
                "Network topology mapping",
                "2D and 3D visualization",
                "Process and service detection",
                "Application dependency mapping",
                "Real-time scan progress",
                "CSV and Excel export",
                "Local SQLite database",
                "Offline-capable (after activation)",
                "Regular automatic updates",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg"
                >
                  <Check className="w-5 h-5 text-[var(--success)] flex-shrink-0" />
                  <span className="text-[var(--text-secondary)]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Release Notes Link */}
        <Section className="bg-[var(--bg-card)]">
          <div className="max-w-2xl mx-auto text-center">
            <FileText className="w-12 h-12 text-[var(--amber-400)] mx-auto mb-4" />
            <h2 className="font-display text-2xl mb-3">Release Notes</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              See what&apos;s new in version {version} and view the full changelog.
            </p>
            <ButtonLink href="/docs" variant="secondary">
              View Release Notes
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Ready to see your infrastructure clearly?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Start with the free Community tier. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DownloadButton>
                <Download className="w-5 h-5" />
                Download Now
              </DownloadButton>
              <ButtonLink href="/register" variant="secondary" size="lg">
                Create Free Account
              </ButtonLink>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function RequirementCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6">
      <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-[var(--amber-400)]" />
      </div>
      <h3 className="font-display text-lg mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-[var(--text-secondary)]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CredentialCard({
  icon: Icon,
  title,
  description,
  items,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--amber-400)]" />
        </div>
        <div>
          <h3 className="font-display text-lg">{title}</h3>
          <p className="text-sm text-[var(--text-muted)]">{description}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <Check className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InstallStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center font-mono text-lg font-medium">
        {number}
      </div>
      <div className="pt-1">
        <h3 className="font-display text-lg mb-1">{title}</h3>
        <p className="text-[var(--text-secondary)]">{description}</p>
      </div>
    </div>
  );
}
