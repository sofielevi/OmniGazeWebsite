import { ButtonLink } from "@/components/ui/button";
import { Download, Check, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Installation",
  description: "How to install OmniGaze on your Windows machine.",
};

export default function InstallationPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-medium mb-4">Installation Guide</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Installing OmniGaze takes just a few minutes. Follow these steps to get started.
        </p>
      </div>

      {/* System Requirements */}
      <section>
        <h2 className="font-display text-2xl mb-4">System Requirements</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Minimum Requirements</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                  Windows 10 (64-bit) or Windows Server 2016+
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                  2 GHz dual-core processor
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                  4 GB RAM
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                  500 MB available disk space
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--success)] mt-1 flex-shrink-0" />
                  .NET 8.0 Runtime (included in installer)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Recommended</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--amber-400)] mt-1 flex-shrink-0" />
                  Windows 11 or Windows Server 2022
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--amber-400)] mt-1 flex-shrink-0" />
                  Quad-core processor
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--amber-400)] mt-1 flex-shrink-0" />
                  8 GB RAM or more
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--amber-400)] mt-1 flex-shrink-0" />
                  SSD for faster scanning
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--amber-400)] mt-1 flex-shrink-0" />
                  Dedicated GPU for 3D visualization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Download */}
      <section>
        <h2 className="font-display text-2xl mb-4">Step 1: Download</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Download the latest version of OmniGaze from our website.
        </p>
        <ButtonLink href="/download" variant="primary">
          <Download className="w-4 h-4" />
          Download OmniGaze
        </ButtonLink>
      </section>

      {/* Installation Steps */}
      <section>
        <h2 className="font-display text-2xl mb-4">Step 2: Run the Installer</h2>
        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">1. Launch the Installer</h3>
            <p className="text-[var(--text-secondary)]">
              Double-click <code className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded text-sm">OmniGazeSetup.exe</code> to
              start the installation wizard. If prompted by Windows Defender SmartScreen,
              click &ldquo;More info&rdquo; then &ldquo;Run anyway&rdquo;.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">2. Accept the License Agreement</h3>
            <p className="text-[var(--text-secondary)]">
              Read and accept the End User License Agreement (EULA) to continue.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">3. Choose Installation Location</h3>
            <p className="text-[var(--text-secondary)]">
              The default location is <code className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded text-sm">C:\Program Files\OmniGaze</code>.
              You can change this if needed, but we recommend the default.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">4. Complete Installation</h3>
            <p className="text-[var(--text-secondary)]">
              Click &ldquo;Install&rdquo; and wait for the process to complete. The installer will
              create a desktop shortcut and Start menu entry automatically.
            </p>
          </div>
        </div>
      </section>

      {/* First Launch */}
      <section>
        <h2 className="font-display text-2xl mb-4">Step 3: First Launch</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          After installation, launch OmniGaze from the desktop shortcut or Start menu.
          On first launch, you&apos;ll be prompted to:
        </p>
        <ul className="space-y-3 text-[var(--text-secondary)]">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">1</span>
            <span>Enter your license key (from registration) or start a trial</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">2</span>
            <span>Allow firewall access if prompted (required for network scanning)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--amber-glow)] text-[var(--amber-400)] flex items-center justify-center text-sm font-medium">3</span>
            <span>Configure your first scan credentials</span>
          </li>
        </ul>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="font-display text-2xl mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-500 mb-1">Antivirus Interference</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Some antivirus software may flag OmniGaze due to its network scanning capabilities.
                  Add an exception for the OmniGaze installation folder if you experience issues.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">.NET Runtime Missing</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              The installer includes .NET 8.0 Runtime, but if installation fails, you can download
              it separately from Microsoft&apos;s website.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
            <h3 className="font-medium mb-2">Silent Installation</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              For enterprise deployments, run: <code className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded">OmniGazeSetup.exe /S</code>
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h3 className="font-display text-lg mb-2">Next Steps</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Ready to activate OmniGaze? Continue to the activation guide.
        </p>
        <ButtonLink href="/docs/activation" variant="secondary">
          Activation Guide →
        </ButtonLink>
      </section>
    </div>
  );
}
