import Link from "next/link";
import { ShieldAlert, ArrowLeft, Info } from "lucide-react";
import { Callout, StepList } from "@/components/docs";

export default function SmartScreenPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-medium mb-3">
          Windows SmartScreen Workaround
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          How to proceed when Windows Defender SmartScreen blocks the OmniGaze
          installer.
        </p>
      </div>

      {/* Explanation */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          Why does this happen?
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-[var(--amber-400)]" />
            </div>
            <div className="space-y-3">
              <p className="text-[var(--text-secondary)]">
                The OmniGaze installer is not yet code-signed with an Extended
                Validation (EV) certificate. As a result, Windows Defender
                SmartScreen may display a warning when you first run the
                installer.
              </p>
              <p className="text-[var(--text-secondary)]">
                This is standard Windows behavior for new software that has not
                yet built up a reputation with Microsoft&apos;s SmartScreen
                service. It does <strong>not</strong> indicate any security risk
                with the OmniGaze installer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section>
        <h2 className="font-display text-xl font-medium mb-4">
          How to proceed
        </h2>
        <StepList
          steps={[
            {
              title: 'Click "More info"',
              description:
                'When you see the "Windows protected your PC" dialog, click the "More info" link. It appears as blue text below the warning message.',
            },
            {
              title: "Review the publisher information",
              description:
                'After clicking "More info", the dialog will expand to show the app name and publisher details. You will also see a "Run anyway" button appear at the bottom of the dialog.',
            },
            {
              title: 'Click "Run anyway"',
              description:
                'Click the "Run anyway" button to proceed with the OmniGaze installation. The installer will launch normally.',
            },
          ]}
        />
      </section>

      {/* Additional Info */}
      <section>
        <Callout type="info" title="EV Certificate Planned">
          We are in the process of obtaining an Extended Validation code-signing
          certificate. Once applied, Windows SmartScreen will no longer display
          this warning for OmniGaze installers.
        </Callout>
      </section>

      {/* Enterprise Note */}
      <section>
        <Callout type="tip" title="Enterprise Deployments">
          If your organization uses Group Policy or Intune to manage
          SmartScreen settings, your IT administrator can whitelist the
          OmniGaze installer. Contact{" "}
          <a
            href="mailto:support@omnigaze.com"
            className="text-[var(--amber-400)] hover:underline"
          >
            support@omnigaze.com
          </a>{" "}
          for the installer hash values and signing details.
        </Callout>
      </section>

      {/* Back Link */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <Link
          href="/docs/getting-started/installation"
          className="inline-flex items-center gap-2 text-[var(--amber-400)] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Installation Guide
        </Link>
      </section>
    </div>
  );
}
