import Link from "next/link";
import { Key, Mail, CheckCircle, ArrowRight, Copy } from "lucide-react";
import { Callout, CommandBlock, StepList } from "@/components/docs";

export default function ActivationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">Activation</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Activate your OmniGaze license to unlock all features for your tier.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">License Activation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          After installing OmniGaze, you need to activate your license. This connects your
          installation to your account and enables all features included in your subscription tier.
        </p>
        <Callout type="info" title="First Time?">
          If you don&apos;t have a license key yet, you can register for a free Community tier
          or purchase a subscription at{" "}
          <Link href="/pricing" className="text-[var(--amber-400)] hover:underline">
            omnigaze.com/pricing
          </Link>.
        </Callout>
      </section>

      {/* Finding Your License Key */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Finding Your License Key</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <LicenseSourceCard
            icon={Mail}
            title="Email"
            description="Check your registration confirmation email for your license key."
          />
          <LicenseSourceCard
            icon={Key}
            title="Account Dashboard"
            description="Log in to your account at omnigaze.com to view and copy your license key."
          />
        </div>
        <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
          <h4 className="font-medium mb-2">License Key Format</h4>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Your license key is a 32-character alphanumeric string:
          </p>
          <code className="block bg-[var(--bg-elevated)] px-4 py-2 rounded-lg font-mono text-sm text-[var(--amber-400)]">
            XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
          </code>
        </div>
      </section>

      {/* Activation Steps */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Activation Steps</h2>
        <StepList
          steps={[
            {
              title: "Launch OmniGaze",
              description:
                "Open OmniGaze from the Start Menu or desktop shortcut. On first launch, the activation dialog will appear automatically.",
            },
            {
              title: "Enter Your License Key",
              description:
                "Paste your license key in the activation field. You can copy it from your email or account dashboard.",
            },
            {
              title: "Click Activate",
              description:
                "OmniGaze will validate your license with our servers. This requires an internet connection.",
            },
            {
              title: "Confirmation",
              description:
                "Once activated, you'll see a confirmation with your tier and available features. Click 'Get Started' to begin.",
            },
          ]}
        />
      </section>

      {/* Command Line Activation */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Command Line Activation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          For automated deployments or headless installations, you can activate via command line:
        </p>
        <CommandBlock language="powershell" title="Silent Activation">
          {`OmniGaze.exe /activate "XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX"`}
        </CommandBlock>
        <Callout type="tip" title="Enterprise Deployment">
          Enterprise customers can use pre-activated installation packages. Contact your
          account manager for volume deployment options.
        </Callout>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <TroubleshootItem
            title="Invalid License Key"
            description="Double-check that you copied the entire key including all dashes. License keys are case-insensitive."
          />
          <TroubleshootItem
            title="Activation Failed - Network Error"
            description="Ensure you have internet access and that your firewall allows outbound HTTPS connections to api.omnigaze.com."
          />
          <TroubleshootItem
            title="License Already in Use"
            description="Each license can be activated on a limited number of machines based on your tier. Deactivate from another machine or contact support for additional seats."
          />
          <TroubleshootItem
            title="Offline Activation"
            description="Enterprise customers can request offline activation. Contact support@omnigaze.com for offline activation codes."
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg font-medium mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Now that OmniGaze is activated, let&apos;s run your first infrastructure scan.
        </p>
        <Link
          href="/dashboard/docs/getting-started/first-scan"
          className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
        >
          Continue to Your First Scan
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

function LicenseSourceCard({
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
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[var(--amber-400)]" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

function TroubleshootItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h4 className="font-medium text-[var(--amber-400)] mb-1">{title}</h4>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}
