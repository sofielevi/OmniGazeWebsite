import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section, SectionHeader } from "@/components/marketing/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata = {
  title: "Documentation",
  description: "OmniGaze documentation and getting started guide.",
};

export default function DocsPage() {
  return (
    <>
      <Header />

      <main className="pt-32">
        <Section>
          <SectionHeader
            label="Documentation"
            title="Getting Started"
            description="Everything you need to know to get up and running with OmniGaze."
          />

          <div className="max-w-3xl mx-auto">
            {/* Quick Start */}
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] p-8 mb-8">
              <h2 className="font-display text-2xl mb-4">Quick Start Guide</h2>

              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center font-mono text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Download OmniGaze</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">
                      Get the latest version from our downloads page. OmniGaze runs on Windows 10/11 and Windows Server.
                    </p>
                    <ButtonLink href="/download" variant="secondary" size="sm">
                      Go to Downloads
                    </ButtonLink>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center font-mono text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Register & Verify</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Create an account with your email. All tiers (including free Community) require email verification.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center font-mono text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Enter Your License Key</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      After verification, you&apos;ll receive a license key. Enter it in the application settings.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center font-mono text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Configure Scan Credentials</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Add credentials for the servers you want to scan. OmniGaze uses WMI for Windows and SSH for Linux.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center font-mono text-sm">
                    5
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Start Discovering</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Run your first network scan to discover servers. Results appear in real-time.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Resources */}
            <div className="grid md:grid-cols-2 gap-4">
              <a href="#" className="block p-6 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-warm)] transition-all">
                <h3 className="font-display text-lg mb-2">API Reference</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  OData API documentation for integrations.
                </p>
              </a>

              <a href="#" className="block p-6 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-warm)] transition-all">
                <h3 className="font-display text-lg mb-2">Credential Setup</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  How to configure scan credentials securely.
                </p>
              </a>

              <a href="#" className="block p-6 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-warm)] transition-all">
                <h3 className="font-display text-lg mb-2">Feature Guides</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Deep dives into each feature and capability.
                </p>
              </a>

              <a href="#" className="block p-6 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-warm)] transition-all">
                <h3 className="font-display text-lg mb-2">Troubleshooting</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Common issues and how to resolve them.
                </p>
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
