import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { ButtonLink } from "@/components/ui/button";
import { Mail, FileText, HelpCircle, Building2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact & Support - Get Help with OmniGaze",
  description:
    "Contact the OmniGaze team for sales inquiries, technical support, and partnership opportunities. Response within 24 hours on business days.",
  keywords: [
    "OmniGaze support",
    "OmniGaze contact",
    "infrastructure discovery help",
    "technical support",
    "sales inquiry",
  ],
  openGraph: {
    title: "Contact & Support - OmniGaze",
    description:
      "Get in touch with the OmniGaze team. Sales inquiries, technical support, and partnership opportunities.",
    url: "https://omnigaze.com/support",
  },
  alternates: {
    canonical: "https://omnigaze.com/support",
  },
};

const helpfulLinks = [
  {
    icon: FileText,
    title: "Documentation",
    description: "Guides, tutorials, and API reference",
    href: "/docs",
  },
  {
    icon: HelpCircle,
    title: "Getting Started",
    description: "Installation and first scan walkthrough",
    href: "/docs/getting-started/installation",
  },
  {
    icon: Building2,
    title: "Enterprise",
    description: "Custom solutions for large organizations",
    href: "/enterprise",
  },
];

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-6xl font-medium mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Questions, feedback, or just want to say hello? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Email Card */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-2xl p-8 md:p-12 text-center mb-16">
            <div className="w-16 h-16 bg-[var(--amber-400)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-[var(--amber-400)]" />
            </div>
            <h2 className="font-display text-2xl font-medium mb-3">
              Email Us
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              For sales inquiries, support questions, or partnership opportunities
            </p>
            <a
              href="mailto:sales@omnigaze.com"
              className="inline-flex items-center gap-2 text-2xl md:text-3xl font-display text-[var(--amber-400)] hover:text-[var(--amber-300)] transition-colors"
            >
              sales@omnigaze.com
            </a>
            <p className="text-sm text-[var(--text-muted)] mt-6">
              We typically respond within 24 hours on business days
            </p>
          </div>

          {/* Helpful Links */}
          <div className="mb-16">
            <h2 className="font-display text-xl font-medium mb-6 text-center">
              Helpful Resources
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {helpfulLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--border-warm)] transition-all"
                >
                  <link.icon className="w-6 h-6 text-[var(--amber-400)] mb-3" />
                  <h3 className="font-medium mb-1 group-hover:text-[var(--amber-400)] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="text-center text-[var(--text-secondary)]">
            <p className="text-sm">
              OmniGaze is proudly built in Denmark
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
