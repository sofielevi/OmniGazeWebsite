import Link from "next/link";
import { Download, Monitor, Server, HardDrive, ArrowRight } from "lucide-react";
import { Callout, CommandBlock, StepList } from "@/components/docs";

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">Installation</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Download and install OmniGaze on your Windows machine.
        </p>
      </div>

      {/* System Requirements */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">System Requirements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <RequirementCard
            icon={Monitor}
            title="Operating System"
            items={[
              "Windows 10 (64-bit)",
              "Windows 11",
              "Windows Server 2016+",
              "Windows Server 2019/2022",
            ]}
          />
          <RequirementCard
            icon={HardDrive}
            title="Hardware"
            items={[
              "4 GB RAM minimum (8 GB recommended)",
              "500 MB disk space",
              "1280x720 display or higher",
            ]}
          />
          <RequirementCard
            icon={Server}
            title="Network"
            items={[
              "Network access to target servers",
              "WinRM ports: 5985/5986",
              "WMI/DCOM if using WMI scanning",
            ]}
          />
        </div>
      </section>

      {/* Download */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Download</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-display font-medium mb-1">OmniGaze Installer</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Latest stable release for Windows
              </p>
            </div>
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--amber-400)] text-[var(--bg-deep)] font-medium hover:bg-[var(--amber-500)] transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </Link>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Installation Steps</h2>
        <StepList
          steps={[
            {
              title: "Run the Installer",
              description:
                "Double-click the downloaded OmniGaze-Setup.exe file. If prompted by Windows Defender SmartScreen, click 'More info' then 'Run anyway'.",
            },
            {
              title: "Accept the License Agreement",
              description:
                "Read the End User License Agreement and click 'I Agree' to continue.",
            },
            {
              title: "Choose Installation Location",
              description:
                "Select where to install OmniGaze. The default location (C:\\Program Files\\OmniGaze) is recommended.",
            },
            {
              title: "Complete Installation",
              description:
                "Click 'Install' and wait for the process to complete. Click 'Finish' to launch OmniGaze.",
            },
          ]}
        />
      </section>

      {/* Silent Install */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Silent Installation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          For enterprise deployments, you can install OmniGaze silently using command-line parameters:
        </p>
        <CommandBlock language="powershell" title="Silent Install">
          {`OmniGaze-Setup.exe /S /D=C:\\Program Files\\OmniGaze`}
        </CommandBlock>
        <Callout type="tip" title="MSI Deployment">
          Contact support@omnigaze.com for MSI packages suitable for SCCM, Intune, or Group Policy deployment.
        </Callout>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          After installation, you&apos;ll need to activate your license.
        </p>
        <Link
          href="/dashboard/docs/getting-started/activation"
          className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
        >
          Continue to Activation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
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
