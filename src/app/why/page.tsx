import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Why We Built This",
  description:
    "Most complex systems don't fail because people lack intelligence or effort. They fail because the system becomes hard to see. Here's why we built OmniGaze.",
  keywords: [
    "enterprise architecture philosophy",
    "IT visibility",
    "infrastructure complexity",
    "digital transformation",
    "system observability",
    "enterprise decision making",
  ],
  openGraph: {
    title: "Why We Built This | OmniGaze",
    description:
      "Most complex systems don't fail because people lack intelligence or effort. They fail because the system becomes hard to see. Here's why we built OmniGaze.",
    url: "https://omnigaze.com/why",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Why We Built OmniGaze",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why We Built This | OmniGaze",
    description:
      "Most complex systems don't fail because people lack intelligence or effort. They fail because the system becomes hard to see.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://omnigaze.com/why",
  },
};

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-12 py-8 border-l-2 border-[var(--amber-400)] pl-8 md:pl-12">
      <p className="font-display text-2xl md:text-3xl text-[var(--text-primary)] leading-relaxed italic">
        {children}
      </p>
    </blockquote>
  );
}

function Divider() {
  return (
    <div className="my-16 flex justify-center">
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--border-warm)] to-transparent" />
    </div>
  );
}

export default function WhyPage() {
  return (
    <>
      <Header />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 max-w-3xl mb-20">
          <div className="text-center mb-12 animate-fade-up">
            <span className="text-xs uppercase tracking-widest text-[var(--amber-400)] mb-4 block">
              The thinking behind OmniGaze
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
              Why We Built This
            </h1>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image
              src="/images/why-hero.png"
              alt="Complexity emerging into clarity"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent opacity-60" />
          </div>
        </section>

        {/* Content */}
        <article className="container mx-auto px-6 max-w-[720px]">
          {/* Section 1: The Problem */}
          <section className="mb-8">
            <p className="text-lg md:text-xl text-[var(--text-primary)] leading-relaxed mb-6">
              Most complex systems don&apos;t fail because people lack intelligence or effort.
            </p>
            <p className="text-lg md:text-xl text-[var(--text-primary)] leading-relaxed mb-8">
              They fail because the system becomes hard to see.
            </p>
            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                Inside large organizations, complexity accumulates quietly. Tools multiply.
                Processes thicken. Dependencies spread. Each addition makes sense in isolation.
                Together, they create something no single person can hold in their head.
              </p>
              <p>
                People compensate with activity. More meetings. More documentation. More dashboards.
                More tools to manage the other tools.
              </p>
              <p>
                Clarity continues to erode.
              </p>
              <p>
                This isn&apos;t a failure of discipline. It&apos;s a structural problem. The system
                outgrows the ability to observe it. And once that happens, every decision carries
                hidden risk.
              </p>
            </div>

            <PullQuote>
              You can&apos;t coordinate what you can&apos;t see. You can&apos;t govern what you
              can&apos;t map. You can&apos;t control what you don&apos;t understand.
            </PullQuote>
          </section>

          <Divider />

          {/* Section 2: Why Existing Tools Make It Worse */}
          <section className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl mb-8 text-[var(--text-primary)]">
              Why Existing Tools Make It Worse
            </h2>
            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                The standard response to complexity is more tooling.
              </p>
              <p>
                Infrastructure monitoring. Application performance management. Configuration databases.
                Architecture repositories. Security scanners. Compliance platforms.
              </p>
              <p>
                Each one solves a real problem. Each one creates another silo.
              </p>
              <p>
                The infrastructure team has their view. The architects have theirs. Security has a
                different lens entirely. The CIO sees dashboards that aggregate fragments of
                each—but the fragments don&apos;t connect.
              </p>
              <p>
                So when someone asks a simple question—&ldquo;What depends on this system?&rdquo;
                or &ldquo;What&apos;s the blast radius if this fails?&rdquo; or &ldquo;Are we
                compliant across these environments?&rdquo;—the answer requires archaeology.
              </p>
              <p>
                Hours spent reconciling spreadsheets. Days chasing down owners. Weeks rebuilding
                context that should already exist.
              </p>
            </div>

            <PullQuote>
              The tools that were supposed to create clarity have created fragmentation instead.
            </PullQuote>

            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                This is not a technology problem. It&apos;s a design problem. The tools weren&apos;t
                built to connect. They were built to serve their own domain.
              </p>
            </div>
          </section>

          <Divider />

          {/* Section 3: The Principle */}
          <section className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl mb-8 text-[var(--text-primary)]">
              The Principle
            </h2>
            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                We started with a simple belief:
              </p>
            </div>

            <PullQuote>
              You cannot control what you cannot see.
            </PullQuote>

            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                Before you can optimize, you need to understand what exists. Before you can govern,
                you need to know what&apos;s running. Before you can transform, you need a map of
                where you are.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Visibility is not a feature. It&apos;s a prerequisite.
              </p>
              <p>
                This sounds obvious. But most organizations skip it. They jump to transformation
                initiatives without a shared view of the current state. They adopt AI agents without
                knowing what systems those agents will touch. They promise compliance without being
                able to demonstrate it.
              </p>
              <p>
                The gap between &ldquo;we think we know&rdquo; and &ldquo;we can actually show&rdquo;
                is where risk accumulates.
              </p>
              <p>
                That gap is what we set out to close.
              </p>
            </div>
          </section>

          {/* Visual Break - Clarity Image */}
          <div className="my-16 -mx-6 md:mx-0">
            <div className="relative aspect-[4/1] rounded-xl overflow-hidden">
              <Image
                src="/images/why-clarity.png"
                alt="Fragmentation transforming into unity"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-deep)]/40 via-transparent to-[var(--bg-deep)]/40" />
            </div>
          </div>

          {/* Section 4: What Usable Clarity Means */}
          <section className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl mb-8 text-[var(--text-primary)]">
              What Usable Clarity Means
            </h2>
            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                Clarity alone isn&apos;t enough. It has to be usable.
              </p>
              <p>
                Usable means: accessible to the people who need it, when they need it, without
                requiring a PhD in the tooling.
              </p>
              <p>
                Usable means: the infrastructure team and the enterprise architects can look at the
                same system and have a conversation grounded in shared reality.
              </p>
              <p>
                Usable means: you can answer the board&apos;s question about risk exposure without a
                two-week data-gathering exercise.
              </p>
              <p>
                Usable means: it works under real constraints—limited time, distributed teams,
                incomplete information, shifting priorities.
              </p>
              <p>
                We&apos;ve seen too many platforms that promise visibility but deliver complexity.
                Dashboards that require dedicated analysts to interpret. Data models that only the
                vendor understands. Implementations that take eighteen months before anyone sees value.
              </p>
              <p>
                That&apos;s not clarity. That&apos;s a new form of opacity.
              </p>
            </div>

            <PullQuote>
              Usable clarity reduces cognitive load. It makes responsibility possible. It lets
              people act with confidence instead of guessing.
            </PullQuote>
          </section>

          <Divider />

          {/* Section 5: How This Shaped OmniGaze */}
          <section className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl mb-8 text-[var(--text-primary)]">
              How This Shaped OmniGaze
            </h2>
            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                OmniGaze exists because we kept running into the same wall.
              </p>
              <p>
                Organizations wanted to modernize, adopt AI, improve security posture, demonstrate
                compliance—and they couldn&apos;t, because they didn&apos;t have a clear view of
                what they were working with.
              </p>
              <p>
                The infrastructure knowledge lived in the heads of people who&apos;d been there for
                twenty years. The architecture diagrams were eighteen months out of date. The
                dependency maps were incomplete or wrong.
              </p>
              <p>
                So we built something different.
              </p>
              <p>
                A platform that auto-discovers infrastructure—servers, services, dependencies—without
                requiring agents on every machine. That connects infrastructure reality to architecture
                planning. That spans from 10,000+ assets up to strategic initiatives.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                One view. From servers to strategy.
              </p>
              <p>
                We designed it for organizations that can&apos;t afford to upload their data to
                external clouds. We made it deployable on-premise, air-gap ready, because the
                enterprises that need this most are often the ones with the strictest security
                requirements.
              </p>
              <p>
                And we made it usable. Not &ldquo;usable after six months of training.&rdquo;
                Usable now. Setup in minutes. Value in hours.
              </p>
            </div>

            <PullQuote>
              Clarity that takes a year to achieve isn&apos;t clarity. It&apos;s a roadmap to a
              destination that&apos;s already moved.
            </PullQuote>
          </section>

          <Divider />

          {/* Section 6: Closing */}
          <section className="mb-16">
            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              <p>
                We didn&apos;t build OmniGaze because the market needed another tool.
              </p>
              <p>
                We built it because the people responsible for complex systems deserve to see what
                they&apos;re responsible for.
              </p>
              <p>
                Enterprise architects who are asked to govern systems they&apos;ve never fully mapped.
                Infrastructure leads who know something is fragile but can&apos;t prove it. CIOs who
                have to answer for risk they can&apos;t quantify.
              </p>
              <p>
                These people aren&apos;t failing. They&apos;re operating without visibility.
              </p>
              <p className="text-[var(--text-primary)] text-lg font-medium">
                That&apos;s what we&apos;re here to change.
              </p>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="mt-20">
            <div className="relative bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] border border-[var(--border-warm)] rounded-2xl p-10 md:p-14 text-center overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,var(--amber-glow),transparent)] pointer-events-none" />

              <h2 className="font-display text-2xl md:text-3xl mb-6 relative z-10">
                Ready to see your systems clearly?
              </h2>

              <div className="flex flex-wrap justify-center gap-4 mb-6 relative z-10">
                <ButtonLink href="/features" variant="secondary" size="lg">
                  Explore Features
                </ButtonLink>
                <ButtonLink href="/register" variant="primary" size="lg">
                  Start Free
                  <ArrowRight size={16} />
                </ButtonLink>
              </div>

              <p className="text-sm text-[var(--text-muted)] relative z-10">
                No sales calls required. No payment required. 50 servers free forever.
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
