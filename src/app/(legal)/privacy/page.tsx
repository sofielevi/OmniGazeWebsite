import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section } from "@/components/marketing/section";
import {
  Shield,
  Database,
  Lock,
  Clock,
  UserCheck,
  Cookie,
  Scale,
  Mail,
  Server,
  CreditCard,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy - How We Protect Your Data",
  description:
    "OmniGaze privacy policy: learn how we collect, use, and protect your data. GDPR compliant. No tracking cookies. Your infrastructure data stays yours.",
  openGraph: {
    title: "Privacy Policy - OmniGaze",
    description: "Learn how OmniGaze protects your privacy and data.",
    url: "https://omnigaze.com/privacy",
  },
  alternates: {
    canonical: "https://omnigaze.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="pt-32">
        <Section>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--amber-400)]/10 mb-6">
                <Shield className="w-8 h-8 text-[var(--amber-400)]" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl mb-4">Privacy Policy</h1>
              <p className="text-[var(--text-secondary)] text-lg">
                Your data, your control. Last updated December 2025.
              </p>
            </div>

            {/* Quick Summary */}
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 text-center">
                <div className="text-2xl font-display text-[var(--amber-400)] mb-1">GDPR</div>
                <div className="text-sm text-[var(--text-secondary)]">Compliant</div>
              </div>
              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 text-center">
                <div className="text-2xl font-display text-[var(--success)] mb-1">Zero</div>
                <div className="text-sm text-[var(--text-secondary)]">Tracking Cookies</div>
              </div>
              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 text-center">
                <div className="text-2xl font-display text-[var(--text-primary)] mb-1">TLS</div>
                <div className="text-sm text-[var(--text-secondary)]">Encrypted</div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {/* Information We Collect */}
              <PolicyCard
                icon={Database}
                number="1"
                title="Information We Collect"
              >
                <p className="text-[var(--text-secondary)] mb-4">
                  We collect information you provide directly to us, such as when you create an account,
                  download our software, or contact us for support.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <InfoItem>Email address (registration)</InfoItem>
                  <InfoItem>License key (activation)</InfoItem>
                  <InfoItem>Usage data (features, errors)</InfoItem>
                  <InfoItem>Payment info (via Stripe)</InfoItem>
                </div>
              </PolicyCard>

              {/* How We Use Your Information */}
              <PolicyCard
                icon={UserCheck}
                number="2"
                title="How We Use Your Information"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <InfoItem>Provide and improve services</InfoItem>
                  <InfoItem>Send technical notices</InfoItem>
                  <InfoItem>Respond to your questions</InfoItem>
                  <InfoItem>Process payments</InfoItem>
                  <InfoItem>Detect and prevent fraud</InfoItem>
                </div>
              </PolicyCard>

              {/* Third-Party Services */}
              <PolicyCard
                icon={Server}
                number="3"
                title="Third-Party Services"
              >
                <p className="text-[var(--text-secondary)] mb-4">
                  We use trusted partners to provide our platform:
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <ServiceCard
                    icon={CreditCard}
                    name="Stripe"
                    description="Payment processing"
                    badge="PCI DSS"
                  />
                  <ServiceCard
                    icon={Server}
                    name="Microsoft Azure"
                    description="Cloud hosting"
                    badge="ISO 27001"
                  />
                  <ServiceCard
                    icon={Mail}
                    name="SendGrid"
                    description="Email delivery"
                    badge="SOC 2"
                  />
                </div>
              </PolicyCard>

              {/* Data Security */}
              <PolicyCard
                icon={Lock}
                number="4"
                title="Data Security"
              >
                <p className="text-[var(--text-secondary)]">
                  We implement appropriate technical and organizational measures to protect your personal
                  data against unauthorized access, alteration, disclosure, or destruction. All data
                  transmission is encrypted using TLS, and we regularly review our security practices.
                </p>
              </PolicyCard>

              {/* Data Retention */}
              <PolicyCard
                icon={Clock}
                number="5"
                title="Data Retention"
              >
                <p className="text-[var(--text-secondary)]">
                  We retain your personal data only for as long as necessary to fulfill the purposes
                  for which it was collected, including to satisfy legal, accounting, or reporting requirements.
                </p>
              </PolicyCard>

              {/* Your Rights */}
              <PolicyCard
                icon={UserCheck}
                number="6"
                title="Your Rights"
              >
                <p className="text-[var(--text-secondary)] mb-4">
                  Under GDPR and applicable laws, you have the right to:
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <RightBadge>Access your data</RightBadge>
                  <RightBadge>Correct inaccuracies</RightBadge>
                  <RightBadge>Request deletion</RightBadge>
                  <RightBadge>Object to processing</RightBadge>
                  <RightBadge>Data portability</RightBadge>
                  <RightBadge>Withdraw consent</RightBadge>
                </div>
              </PolicyCard>

              {/* Cookies and Storage */}
              <PolicyCard
                icon={Cookie}
                number="7"
                title="Cookies and Storage"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)] mb-2">Essential Cookies</h4>
                    <p className="text-[var(--text-secondary)] text-sm mb-3">
                      We use a single session cookie to maintain your login state. This cookie:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <InfoItem small>Set on login/verification</InfoItem>
                      <InfoItem small>HttpOnly (secure)</InfoItem>
                      <InfoItem small>Cleared on logout</InfoItem>
                      <InfoItem small>Session ID only</InfoItem>
                    </div>
                  </div>

                  <div className="border-t border-[var(--border-subtle)] pt-4">
                    <h4 className="font-medium text-[var(--text-primary)] mb-2">What We Don&apos;t Use</h4>
                    <div className="flex flex-wrap gap-2">
                      <NoBadge>Analytics cookies</NoBadge>
                      <NoBadge>Advertising cookies</NoBadge>
                      <NoBadge>Tracking pixels</NoBadge>
                      <NoBadge>Social media cookies</NoBadge>
                    </div>
                  </div>
                </div>
              </PolicyCard>

              {/* Governing Law */}
              <PolicyCard
                icon={Scale}
                number="8"
                title="Governing Law"
              >
                <p className="text-[var(--text-secondary)]">
                  This Privacy Policy is governed by the laws of Denmark and the European Union. For users
                  in the European Economic Area, we comply with GDPR requirements. The supervisory authority
                  for data protection matters is the Danish Data Protection Agency (Datatilsynet).
                </p>
              </PolicyCard>

              {/* Contact */}
              <PolicyCard
                icon={Mail}
                number="9"
                title="Contact Us"
              >
                <p className="text-[var(--text-secondary)]">
                  Questions about this Privacy Policy? Contact us at{" "}
                  <a href="mailto:privacy@omnigaze.com" className="text-[var(--amber-400)] hover:underline font-medium">
                    privacy@omnigaze.com
                  </a>
                </p>
              </PolicyCard>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

function PolicyCard({
  icon: Icon,
  number,
  title,
  children,
}: {
  icon: React.ElementType;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--amber-400)]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--amber-400)]" />
        </div>
        <div>
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Section {number}</span>
          <h2 className="font-display text-xl md:text-2xl">{title}</h2>
        </div>
      </div>
      <div className="pl-0 md:pl-14">
        {children}
      </div>
    </div>
  );
}

function InfoItem({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${small ? 'text-xs' : 'text-sm'} text-[var(--text-secondary)]`}>
      <div className="w-1.5 h-1.5 rounded-full bg-[var(--amber-400)]" />
      {children}
    </div>
  );
}

function RightBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-elevated)] rounded-lg text-sm text-[var(--text-secondary)]">
      <svg className="w-4 h-4 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {children}
    </div>
  );
}

function NoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-elevated)] rounded-full text-xs text-[var(--text-muted)]">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
      {children}
    </span>
  );
}

function ServiceCard({
  icon: Icon,
  name,
  description,
  badge,
}: {
  icon: React.ElementType;
  name: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="bg-[var(--bg-elevated)] rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-[var(--text-muted)]" />
        <span className="font-medium text-[var(--text-primary)]">{name}</span>
      </div>
      <p className="text-xs text-[var(--text-secondary)] mb-2">{description}</p>
      <span className="inline-block px-2 py-0.5 bg-[var(--success-muted)] text-[var(--success)] text-xs rounded">
        {badge}
      </span>
    </div>
  );
}
