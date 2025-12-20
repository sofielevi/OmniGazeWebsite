import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section } from "@/components/marketing/section";

export const metadata = {
  title: "Privacy Policy | OmniGaze",
  description: "OmniGaze privacy policy - how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="pt-32">
        <Section>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl mb-4">Privacy Policy</h1>
            <p className="text-[var(--text-secondary)] mb-8">
              Last updated: December 2025
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4">1. Information We Collect</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We collect information you provide directly to us, such as when you create an account,
                  download our software, or contact us for support.
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Email address (for account registration and communications)</li>
                  <li>License key (for software activation)</li>
                  <li>Usage data (feature usage, error reports)</li>
                  <li>Payment information (processed securely by Stripe)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">2. How We Use Your Information</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Process payments and send billing information</li>
                  <li>Detect and prevent fraud and abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">3. Data Security</h2>
                <p className="text-[var(--text-secondary)]">
                  We implement appropriate technical and organizational measures to protect your personal
                  data against unauthorized access, alteration, disclosure, or destruction. All data
                  transmission is encrypted using TLS, and we regularly review our security practices.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">4. Data Retention</h2>
                <p className="text-[var(--text-secondary)]">
                  We retain your personal data only for as long as necessary to fulfill the purposes
                  for which it was collected, including to satisfy legal, accounting, or reporting requirements.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">5. Your Rights</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">6. Cookies and Storage</h2>
                <h3 className="font-display text-lg mb-2 mt-4">Essential Cookies</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  We use a single session cookie to maintain your login state when you access your account
                  dashboard. This cookie:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2 mb-4">
                  <li>Is set when you log in or verify your email</li>
                  <li>Is HttpOnly (cannot be read by JavaScript for security)</li>
                  <li>Is cleared when you log out</li>
                  <li>Contains only a session identifier, not personal data</li>
                </ul>
                <p className="text-[var(--text-secondary)] mb-4">
                  This cookie is strictly necessary for authentication and does not require consent under
                  GDPR/ePrivacy regulations.
                </p>
                <h3 className="font-display text-lg mb-2 mt-4">Session Storage</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  During registration, we temporarily store your email in your browser&apos;s session storage
                  to facilitate the verification process. This data is automatically cleared after
                  verification completes.
                </p>
                <h3 className="font-display text-lg mb-2 mt-4">What We Do Not Use</h3>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Analytics or tracking cookies</li>
                  <li>Advertising cookies</li>
                  <li>Third-party tracking pixels</li>
                  <li>Social media cookies</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">7. Contact Us</h2>
                <p className="text-[var(--text-secondary)]">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@omnigaze.com" className="text-[var(--amber-400)] hover:underline">
                    privacy@omnigaze.com
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
