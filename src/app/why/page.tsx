import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Why We Built This | OmniGaze",
  description:
    "Two co-founders, one vision. Morten spent years building enterprise software. Sofie spent years selling it. We both kept seeing the same gap: nobody had a clear picture of what was actually running.",
  keywords: [
    "enterprise architecture",
    "IT visibility",
    "infrastructure discovery",
    "OmniGaze founders",
    "system observability",
    "enterprise decision making",
  ],
  openGraph: {
    title: "Why We Built This | OmniGaze",
    description:
      "Two co-founders, one vision. We both kept seeing the same gap: nobody had a clear picture of what was actually running.",
    url: "https://omnigaze.com/why",
    type: "article",
    images: [
      {
        url: "/images/og-image.png",
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
      "Two co-founders, one vision. We both kept seeing the same gap: nobody had a clear picture of what was actually running.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "https://omnigaze.com/why",
  },
};

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-16 py-6 border-l-2 border-[var(--amber-400)] pl-8 md:pl-10">
      <p className="font-display text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed">
        &ldquo;{children}&rdquo;
      </p>
    </blockquote>
  );
}

function SectionDivider() {
  return <div className="my-20 md:my-24" />;
}

export default function WhyPage() {
  return (
    <>
      <Header />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 max-w-3xl mb-24">
          <div className="text-center mb-12 animate-fade-up">
            <span className="text-xs uppercase tracking-widest text-[var(--amber-400)] mb-4 block">
              The thinking behind OmniGaze
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
              Why We Built This
            </h1>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
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
        <article className="container mx-auto px-6 max-w-[680px] text-lg leading-[1.7]">
          {/* Section 1: The Problem We Kept Seeing */}
          <section>
            <p className="text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed mb-6">
              Most complex systems don&apos;t fail because people lack intelligence or effort.
            </p>
            <p className="text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed mb-10">
              They fail because the system becomes hard to see.
            </p>

            <div className="space-y-6 text-[var(--text-secondary)]">
              <p>
                Morten spent years building software for enterprises — defense, healthcare,
                transportation. Complex environments where things have to work.
              </p>
              <p>
                What he kept running into wasn&apos;t a lack of skill. It was a lack of visibility.
                Teams making decisions about systems they couldn&apos;t fully observe. Dependencies
                that only existed in someone&apos;s head. Architecture diagrams that stopped being
                accurate the week after they were drawn.
              </p>
              <p>
                Sofie spent years selling enterprise software across Europe. Hundreds of companies.
                Different industries, different sizes, different problems they thought they had.
              </p>
              <p>
                But underneath, the same thing kept showing up: nobody had a clear picture of
                what was actually running.
              </p>
              <p>
                The infrastructure knowledge lived in the heads of two people who&apos;d been there
                since 2007. The architecture diagrams were from a project that finished eighteen
                months ago. The dependency maps existed, sort of, in a spreadsheet that nobody
                fully trusted.
              </p>
              <p>
                We came at this from opposite directions — one building systems, one selling into
                them. We saw the same gap.
              </p>
            </div>

            <PullQuote>
              Nobody had a clear picture of what was actually running.
            </PullQuote>
          </section>

          <SectionDivider />

          {/* Section 2: How We Met */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-10 text-[var(--text-primary)]">
              How We Met
            </h2>

            <div className="space-y-6 text-[var(--text-secondary)]">
              <p>
                Morten was one of Sofie&apos;s customers. That&apos;s the short version.
              </p>
              <p>
                The longer version: he&apos;d been building OmniGaze on the side for years.
                Started in 2016. What began as a way to solve his own frustration — needing
                to understand infrastructure that was poorly documented — kept growing into
                something bigger.
              </p>
              <p>
                When he showed Sofie a demo, she recognized it immediately.
              </p>
              <p>
                Every company she&apos;d tried to sell to had the same underlying problem.
                They wanted to modernize, adopt new technology, improve security, demonstrate
                compliance. And they couldn&apos;t, because they didn&apos;t know what they
                were working with. They didn&apos;t have a current state.
              </p>
              <p>
                Morten had built a tool that created that current state automatically.
              </p>
              <p>
                A few years later, he quit his job and said: if we&apos;re going to do this
                for real, it&apos;s now. So Sofie quit hers too. That was 2023.
              </p>
            </div>
          </section>

          {/* Visual Break - Network Diagram */}
          <div className="my-20 -mx-6 md:mx-0">
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden">
              <Image
                src="/images/hero-network.png"
                alt="Infrastructure to strategy visualization"
                fill
                className="object-cover object-center opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-deep)]/60 via-transparent to-[var(--bg-deep)]/60" />
            </div>
          </div>

          {/* Section 3: What We Actually Believe */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-10 text-[var(--text-primary)]">
              What We Actually Believe
            </h2>

            <div className="space-y-6 text-[var(--text-secondary)]">
              <p>
                We started with one idea we kept coming back to:
              </p>
              <p className="text-[var(--text-primary)] text-xl font-display">
                You cannot control what you cannot see.
              </p>
              <p>
                Before you can govern anything, you need to know what&apos;s actually there.
                Before you can transform, you need a map of where you are now. Before you can
                promise compliance, you need to be able to show it.
              </p>
              <p>
                This sounds so obvious it&apos;s almost embarrassing to say out loud. But most
                organizations skip it.
              </p>
              <p>
                They start transformation programs without a shared view of the current state.
                They&apos;re adopting AI agents right now without knowing what systems those
                agents will interact with. They tell the board risk is managed, and then spend
                three weeks scrambling when someone asks for proof.
              </p>
              <p>
                The gap between &ldquo;we think we know&rdquo; and &ldquo;we can actually
                demonstrate&rdquo; — that&apos;s where the real risk sits.
              </p>
              <p>
                In most places we&apos;ve seen, that gap is wider than anyone wants to admit.
              </p>
            </div>

            <PullQuote>
              The gap between &lsquo;we think we know&rsquo; and &lsquo;we can actually
              demonstrate&rsquo; — that&apos;s where the real risk sits.
            </PullQuote>
          </section>

          <SectionDivider />

          {/* Section 4: What We Built */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-10 text-[var(--text-primary)]">
              What We Built
            </h2>

            <div className="space-y-6 text-[var(--text-secondary)]">
              <p>
                OmniGaze auto-discovers infrastructure. Servers, services, dependencies.
                No agents required on every machine.
              </p>
              <p>
                It connects what it finds to architecture planning. So you can go from 10,000
                assets at the bottom up to strategic initiatives at the top.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                One view. From servers to strategy.
              </p>
              <p>
                We made it deployable on-premise because the organizations that need this most
                usually can&apos;t send their infrastructure data to someone else&apos;s cloud.
                Air-gap ready. Your data stays yours.
              </p>
              <p>
                Morten&apos;s been building this for eight years now. More than 600,000 lines
                of code. It&apos;s not a side project anymore.
              </p>
              <p>
                We made it fast. Setup in minutes. Useful in hours. Not &ldquo;you&apos;ll see
                value in Q3 after the consultants finish.&rdquo;
              </p>
            </div>

            <PullQuote>
              One view. From servers to strategy.
            </PullQuote>
          </section>

          <SectionDivider />

          {/* Section 5: Who This Is For */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-10 text-[var(--text-primary)]">
              Who This Is For
            </h2>

            <div className="space-y-6 text-[var(--text-secondary)]">
              <p>
                If you&apos;re an enterprise architect being asked to govern systems you&apos;ve
                never fully mapped — this is for you.
              </p>
              <p>
                If you&apos;re an infrastructure lead who knows something is fragile but
                can&apos;t prove it to anyone with budget — this is for you.
              </p>
              <p>
                If you&apos;re a CTO or CIO and you&apos;re tired of finding out about
                dependencies the hard way, after something breaks — this is for you.
              </p>
              <p className="text-[var(--text-primary)] font-medium text-xl mt-10">
                You&apos;re not failing. You&apos;re working without visibility.
              </p>
              <p className="text-[var(--text-primary)]">
                That&apos;s fixable.
              </p>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="mt-24">
            <div className="relative bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] border border-[var(--border-warm)] rounded-2xl p-10 md:p-14 text-center overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,var(--amber-glow),transparent)] pointer-events-none" />

              <h2 className="font-display text-2xl md:text-3xl mb-6 relative z-10">
                See what you&apos;re working with.
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
                No sales calls. No payment required. 50 servers free.
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
