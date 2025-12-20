import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section } from "@/components/marketing/section";

export const metadata = {
  title: "Terms of Service - OmniGaze License Agreement",
  description:
    "OmniGaze terms of service and license agreement. Understand your rights and obligations when using OmniGaze infrastructure discovery software.",
  openGraph: {
    title: "Terms of Service - OmniGaze",
    description: "OmniGaze terms of service and license agreement.",
    url: "https://omnigaze.com/terms",
  },
  alternates: {
    canonical: "https://omnigaze.com/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="pt-32">
        <Section>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl mb-4">Terms of Service</h1>
            <p className="text-[var(--text-secondary)] mb-8">
              Last updated: December 2025
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4">1. Acceptance of Terms</h2>
                <p className="text-[var(--text-secondary)]">
                  By accessing or using OmniGaze software and services, you agree to be bound by these
                  Terms of Service. If you do not agree to these terms, do not use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">2. License Grant</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Download and install the OmniGaze software</li>
                  <li>Use the software in accordance with your subscription tier</li>
                  <li>Access features and server limits as specified in your plan</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">3. Subscription and Payment</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Paid subscriptions are billed in advance on a monthly or annual basis. You agree to pay
                  all fees associated with your subscription tier.
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Prices are subject to change with 30 days notice</li>
                  <li>Upgrades are prorated; downgrades require contacting support</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">4. Acceptable Use</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Reverse engineer, decompile, or disassemble the software</li>
                  <li>Share or transfer your license key to unauthorized parties</li>
                  <li>Use the software to violate any applicable laws</li>
                  <li>Attempt to circumvent license restrictions or security measures</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">5. Intellectual Property</h2>
                <p className="text-[var(--text-secondary)]">
                  OmniGaze and all related trademarks, logos, and content are the property of OmniGaze.
                  Nothing in these Terms grants you any right to use our trademarks or branding.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">6. Disclaimer of Warranties</h2>
                <p className="text-[var(--text-secondary)]">
                  THE SOFTWARE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. WE DO NOT WARRANT
                  THAT THE SOFTWARE WILL BE UNINTERRUPTED OR ERROR-FREE.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">7. Limitation of Liability</h2>
                <p className="text-[var(--text-secondary)]">
                  IN NO EVENT SHALL OMNIGAZE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR
                  CONSEQUENTIAL DAMAGES ARISING OUT OF YOUR USE OF THE SOFTWARE.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">8. Termination</h2>
                <p className="text-[var(--text-secondary)]">
                  We may terminate or suspend your access to our services at any time for violation of
                  these Terms. Upon termination, your license to use the software will immediately cease.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">9. Governing Law and Jurisdiction</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of Denmark,
                  without regard to its conflict of law provisions. Any disputes arising under these Terms
                  shall be subject to the exclusive jurisdiction of the courts of Denmark.
                </p>
                <p className="text-[var(--text-secondary)]">
                  For users in the European Union, nothing in these Terms affects your statutory rights
                  as a consumer under applicable EU law.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">10. Changes to Terms</h2>
                <p className="text-[var(--text-secondary)]">
                  We reserve the right to modify these Terms at any time. We will notify you of material
                  changes by email or by posting a notice on our website at least 30 days before the changes
                  take effect. Your continued use of the services after the changes take effect constitutes
                  acceptance of the revised Terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">11. Contact</h2>
                <p className="text-[var(--text-secondary)]">
                  For questions about these Terms, contact us at{" "}
                  <a href="mailto:legal@omnigaze.com" className="text-[var(--amber-400)] hover:underline">
                    legal@omnigaze.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
