import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section, SectionHeader } from "@/components/marketing/section";
import { ButtonLink } from "@/components/ui/button";
import {
  Calculator,
  Eye,
  FileText,
  ChevronRight
} from "lucide-react";

export const metadata = {
  title: "Free Resources - Tools & Guides | OmniGaze",
  description:
    "Free IT resources: ROI calculator, visibility assessment quiz, and more. Tools to help you understand and optimize your IT landscape.",
  keywords: [
    "IT resources",
    "infrastructure tools",
    "free IT assessment",
    "ROI calculator",
  ],
};

const resources = [
  {
    title: "How to Present Technical Risk to the Board",
    description: "Stop losing credibility in the boardroom. A practical framework for translating technology risk into the language boards understand and act on.",
    icon: FileText,
    href: "/resources/board-template",
    cta: "Read the Guide",
    stats: "Free guide + template",
  },
  {
    title: "ROI Calculator",
    description: "Calculate the hidden cost of poor IT visibility. Find out what your 'IT darkness' costs your organization.",
    icon: Calculator,
    href: "/tools/roi-calculator",
    cta: "Calculate Now",
    stats: "Free tool",
  },
  {
    title: "IT Visibility Quiz",
    description: "Take our 2-minute quiz to find out how well you understand your IT infrastructure compared to others.",
    icon: Eye,
    href: "/tools/visibility-quiz",
    cta: "Take the Quiz",
    stats: "8 questions",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />

      <main className="pt-32">
        <Section>
          <SectionHeader
            label="Free Resources"
            title="Tools for Your IT Journey"
            description="Free resources to understand, document, and optimize your IT infrastructure."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource) => (
              <div
                key={resource.href}
                className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)] hover:border-[var(--amber-400)]/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--amber-400)]/20 flex items-center justify-center text-[var(--amber-400)] mb-6 group-hover:scale-110 transition-transform">
                  <resource.icon size={28} />
                </div>

                <div className="text-xs text-[var(--amber-400)] mb-2">
                  {resource.stats}
                </div>

                <h3 className="font-display text-xl mb-3">
                  {resource.title}
                </h3>

                <p className="text-[var(--text-secondary)] text-sm mb-6">
                  {resource.description}
                </p>

                <ButtonLink href={resource.href} variant="secondary" className="w-full">
                  {resource.cta}
                  <ChevronRight size={16} />
                </ButtonLink>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section className="bg-[var(--bg-card)]">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl mb-4">
              Ready to Automate?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              These tools give you a great starting point. OmniGaze automates the entire process and keeps your data up to date.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonLink href="/register" variant="primary" size="lg">
                Start Free
              </ButtonLink>
              <ButtonLink href="/features" variant="secondary" size="lg">
                See All Features
              </ButtonLink>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
