import { ButtonLink } from "@/components/ui/button";
import { Key, Check, Copy, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Activation",
  description: "How to activate OmniGaze with your license key.",
};

export default function ActivationPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-medium mb-4">Activation Guide</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Activate OmniGaze with your license key to unlock all features for your tier.
        </p>
      </div>

      {/* Get License Key */}
      <section>
        <h2 className="font-display text-2xl mb-4">Getting Your License Key</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-4">
          <p className="text-[var(--text-secondary)]">
            If you don&apos;t have a license key yet, you&apos;ll need to register first:
          </p>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">1</span>
              <span className="text-[var(--text-secondary)]">
                Go to the <Link href="/register" className="text-[var(--amber-400)] hover:underline">registration page</Link>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">2</span>
              <span className="text-[var(--text-secondary)]">Enter your email address</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">3</span>
              <span className="text-[var(--text-secondary)]">Check your email for a verification code</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">4</span>
              <span className="text-[var(--text-secondary)]">Enter the code to receive your license key</span>
            </li>
          </ol>
          <ButtonLink href="/register" variant="secondary" size="sm">
            Register Now
            <ArrowRight className="w-4 h-4" />
          </ButtonLink>
        </div>
      </section>

      {/* Already Have Key */}
      <section>
        <h2 className="font-display text-2xl mb-4">Already Have a License Key?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          You can find your license key in your account dashboard or the confirmation email
          you received after registration.
        </p>
        <ButtonLink href="/dashboard/licenses" variant="secondary" size="sm">
          <Key className="w-4 h-4" />
          View My License Key
        </ButtonLink>
      </section>

      {/* Activation Steps */}
      <section>
        <h2 className="font-display text-2xl mb-4">Activating OmniGaze</h2>
        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">1. Launch OmniGaze</h3>
            <p className="text-[var(--text-secondary)]">
              Open OmniGaze from your desktop shortcut or Start menu.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">2. Open Settings</h3>
            <p className="text-[var(--text-secondary)]">
              Click the gear icon in the top-right corner, or go to <strong>File → Settings</strong>.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">3. Go to License Tab</h3>
            <p className="text-[var(--text-secondary)]">
              In the Settings window, select the <strong>License</strong> tab from the sidebar.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">4. Enter Your License Key</h3>
            <p className="text-[var(--text-secondary)] mb-3">
              Paste your license key into the field and click <strong>Activate</strong>.
            </p>
            <div className="flex items-center gap-2 p-3 bg-[var(--bg-elevated)] rounded-lg font-mono text-sm">
              <code className="text-[var(--amber-400)]">XXXX-XXXX-XXXX-XXXX</code>
              <button className="ml-auto p-1 hover:bg-[var(--bg-card)] rounded">
                <Copy className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">5. Verification</h3>
            <p className="text-[var(--text-secondary)]">
              OmniGaze will verify your license online. Once activated, you&apos;ll see your
              current tier and available features.
            </p>
          </div>
        </div>
      </section>

      {/* License Types */}
      <section>
        <h2 className="font-display text-2xl mb-4">License Types</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[var(--pyramid-infrastructure)]" />
              <h3 className="font-medium">Community (Free)</h3>
            </div>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success)]" />
                Up to 50 servers
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success)]" />
                Single user
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success)]" />
                Basic discovery
              </li>
            </ul>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[var(--amber-400)]" />
              <h3 className="font-medium">Paid Tiers</h3>
            </div>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success)]" />
                Higher server limits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success)]" />
                Multiple users
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success)]" />
                Advanced features
              </li>
            </ul>
            <Link
              href="/pricing"
              className="inline-block mt-3 text-sm text-[var(--amber-400)] hover:underline"
            >
              Compare all tiers →
            </Link>
          </div>
        </div>
      </section>

      {/* Offline Activation */}
      <section>
        <h2 className="font-display text-2xl mb-4">Offline Activation</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <p className="text-[var(--text-secondary)] mb-4">
            OmniGaze requires an internet connection for initial activation. After activation,
            it can run offline for up to 30 days before requiring a license check.
          </p>
          <p className="text-[var(--text-secondary)]">
            For air-gapped environments, contact our{" "}
            <Link href="mailto:support@omnigaze.com" className="text-[var(--amber-400)] hover:underline">
              support team
            </Link>{" "}
            for offline activation options.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Now that OmniGaze is activated, set up your scan credentials.
        </p>
        <ButtonLink href="/docs/credentials" variant="secondary">
          Credential Setup →
        </ButtonLink>
      </section>
    </div>
  );
}
