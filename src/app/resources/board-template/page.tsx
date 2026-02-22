"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { ButtonLink, Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Copy,
  Download,
  FileText,
  Loader2,
  Send,
  Sparkles,
  TrendingDown,
  X,
} from "lucide-react";

type GateStatus = "idle" | "submitting" | "sent" | "error";

const tocItems = [
  { id: "what-you-get", label: "What you get" },
  { id: "the-problem", label: "The problem" },
  { id: "five-mistakes", label: "5 mistakes" },
  { id: "so-what-chain", label: "So What Chain" },
  { id: "metrics", label: "Metrics" },
  { id: "template", label: "The template" },
  { id: "ai-prompt", label: "AI prompt" },
  { id: "playbook", label: "Before you walk in" },
  { id: "evidence", label: "Proof" },
];

export default function BoardTemplatePage() {
  const [gateStatus, setGateStatus] = useState<GateStatus>("idle");
  const [email, setEmail] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [promptCopied, setPromptCopied] = useState(false);

  // Track active section for TOC highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    for (const item of tocItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  async function handleSendTemplate(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setGateStatus("submitting");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "resource_download",
          firstName: "",
          lastName: "",
          email: email.trim(),
          company: "",
          leadSource: "board_template_guide",
        }),
      });
    } catch {
      // Continue regardless
    }

    setGateStatus("sent");
  }

  return (
    <>
      <Header />

      <main className="pt-32 pb-20">
        {/* ==================== HERO ==================== */}
        <section className="container mx-auto px-6 max-w-4xl mb-6">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-wider bg-[var(--omnigaze-gold)]/10 text-[var(--omnigaze-gold)] rounded-full">
              Free Guide + Template
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
            How to Present Technical Risk{" "}
            <span className="gradient-text">to the Board</span>
          </h1>

          <div className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl space-y-4 mb-10">
            <p>
              You&apos;re on slide three. The CFO is checking her phone. The board
              chair just asked &ldquo;what does this mean in dollars?&rdquo; and
              you don&apos;t have the number ready.
            </p>
            <p>
              We&apos;ve watched this happen to smart, capable technology leaders
              who know their systems inside out. They walk out wondering why
              nobody seemed to care. The answer is almost always the same: they
              were speaking the wrong language.
            </p>
            <p className="text-[var(--text-primary)]">
              <strong>This guide will fix that.</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-card)] rounded-full border border-[var(--border-subtle)]">
              <FileText size={14} />
              12 min read
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-card)] rounded-full border border-[var(--border-subtle)]">
              <Download size={14} />
              One-page template included
            </span>
          </div>
        </section>

        {/* ==================== LAYOUT: TOC + ARTICLE ==================== */}
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">

            {/* Sticky TOC (desktop sidebar) */}
            <nav className="hidden lg:block">
              <div className="sticky top-32">
                <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-3">
                  In this guide
                </div>
                <ul className="space-y-1">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block text-sm py-1.5 pl-3 border-l-2 transition-colors ${
                          activeSection === item.id
                            ? "border-[var(--omnigaze-gold)] text-[var(--text-primary)]"
                            : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
                  <a
                    href="#download"
                    className="flex items-center gap-2 text-sm text-[var(--omnigaze-gold)] hover:underline"
                  >
                    <Download size={14} />
                    Get the template
                  </a>
                </div>
              </div>
            </nav>

            {/* Mobile TOC (horizontal scroll) */}
            <div className="lg:hidden mb-10 -mx-6 px-6 overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-max">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="px-3 py-1.5 text-xs text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full whitespace-nowrap hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ARTICLE */}
            <article className="max-w-3xl">

              {/* ==================== WHAT YOU GET ==================== */}
              <Sect id="what-you-get">
                <h2 className="font-display text-3xl md:text-4xl mb-6">
                  What you&apos;ll walk away with
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <WalkawayCard
                    icon="chain"
                    title="The 'So What' Chain"
                    desc="A 5-step framework for translating any technical finding into a board-ready business case."
                  />
                  <WalkawayCard
                    icon="template"
                    title="A one-page board template"
                    desc="Fill-in-the-blank template based on Gartner, NACD, and McKinsey frameworks. Ready to use."
                  />
                  <WalkawayCard
                    icon="mistakes"
                    title="The 5 mistakes to avoid"
                    desc="The patterns that consistently kill credibility, with specific alternatives for each one."
                  />
                  <WalkawayCard
                    icon="metrics"
                    title="Metrics that actually land"
                    desc="The 6 numbers boards respond to, and the ones you should stop using immediately."
                  />
                </div>

                <Takeaway>
                  Everything in this guide is based on published research from McKinsey,
                  Gartner, NACD, FAIR Institute, PwC, Deloitte, Forrester, BCG, and FTI Consulting,
                  plus real case studies from companies that got this right.
                </Takeaway>
              </Sect>

              {/* ==================== THE PROBLEM ==================== */}
              <Sect id="the-problem">
                <SectionLabel>The disconnect</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl mb-6">
                  Why most tech leaders lose the boardroom
                </h2>

                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  Let me give you three numbers.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <StatCard value="82%" label="of CISOs feel pressure to 'make things sound better' when presenting to boards" source="FTI Consulting" />
                  <StatCard value="60%" label="of executives say they can't quantify the benefits of individual technology investments" source="Deloitte / Harvard" />
                  <StatCard value="34%" label="of board directors say they're 'strongly aligned' with management on tech vulnerability" source="NACD 2024" />
                </div>

                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  You know your stuff. The board knows their stuff. The problem
                  is you&apos;re speaking different languages. You say &ldquo;unsupported
                  middleware&rdquo; and the CFO hears &ldquo;I need money for
                  something I don&apos;t understand.&rdquo;
                </p>

                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  That&apos;s fixable. Boards speak finance. So you need to speak finance.
                </p>

                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  McKinsey puts the number at{" "}
                  <strong className="text-[var(--text-primary)]">20-40% of your entire tech estate value</strong>.
                  Sit with that for a second. If your tech portfolio is worth $100M, up to $40M
                  of it is basically debt. And most boards have never seen that number
                  because nobody translated it for them.
                </p>

                <PullQuote
                  quote="It's only when you report to somebody who's not in technology that you realize how much you talk in jargon."
                  author="Stephen Bennett"
                  role="Group CISO, Domino's"
                />

                <p className="text-lg text-[var(--text-secondary)] mb-4">
                  We&apos;re just going to be bluntly honest: the technical detail
                  you love? The board doesn&apos;t want it. They want to know three
                  things: <strong className="text-[var(--text-primary)]">what&apos;s the risk, what&apos;s the cost,
                  and what do you need from us.</strong> Everything else goes in the appendix.
                </p>

                <Takeaway>
                  Boards speak finance. If you can&apos;t translate your technical
                  findings into dollars, time-to-market, or regulatory exposure,
                  you can&apos;t influence the conversation.
                </Takeaway>
              </Sect>

              {/* ==================== 5 MISTAKES ==================== */}
              <Sect id="five-mistakes">
                <SectionLabel>What goes wrong</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  The 5 mistakes that kill your credibility
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-10">
                  We&apos;ve seen all of these, sometimes in the same meeting.
                  Based on Gartner, NACD, FAIR Institute, and a lot of CIOs being
                  refreshingly honest about what went wrong.
                </p>

                {/* Mistake 1 */}
                <MistakeV2 number={1} title="You open with architecture, not impact">
                  <p className="text-lg text-[var(--text-secondary)] mb-4">
                    You have 15 minutes. Sometimes less. If slide one is a
                    systems diagram or a vulnerability summary, you&apos;ve already
                    signaled &ldquo;this is an IT thing&rdquo; and half the room
                    has mentally checked out.
                  </p>
                  <BeforeAfter
                    before="Here's our current architecture landscape and the 47 systems approaching end-of-life."
                    after="Our Nordic expansion timeline is at risk because the infrastructure can't scale. Here's the financial exposure."
                  />
                </MistakeV2>

                {/* Mistake 2 */}
                <MistakeV2 number={2} title="You speak IT, not business">
                  <p className="text-lg text-[var(--text-secondary)] mb-4">
                    FAIR Institute research puts it bluntly: boards &ldquo;don&apos;t
                    care about cybersecurity inherently and they are never going to.&rdquo;
                    When you say &ldquo;we need to modernize our middleware,&rdquo;
                    the board hears cost. When you say &ldquo;our legacy systems
                    add 15-60% to every IT dollar we spend,&rdquo; the board hears
                    waste. And waste is something they know how to fix.
                  </p>
                  <BeforeAfter
                    before="We need to modernize our middleware layer and migrate to a microservices architecture."
                    after="Every project we run costs 15-20% more than it should because of technical debt. That's roughly $4M per year in hidden overhead."
                  />
                </MistakeV2>

                {/* Mistake 3 */}
                <MistakeV2 number={3} title="You give a progress report instead of a risk report">
                  <p className="text-lg text-[var(--text-secondary)] mb-4">
                    &ldquo;We patched 94% of critical vulnerabilities this quarter.&rdquo;
                    That&apos;s an activity report. The board expects a risk report.
                    James Lam at FAIRCON22 said it clearly: &ldquo;Skip progress reports
                    on technical goals like patching. Directors want assurance you&apos;re
                    doing your job effectively, not hearing how you spent your time.&rdquo;
                  </p>
                  <BeforeAfter
                    before="We patched 94% of critical vulnerabilities and deployed the new EDR tool across all endpoints."
                    after="Our estimated annual cyber loss exposure dropped from $14M to $8.5M this quarter, driven by three targeted investments."
                  />
                </MistakeV2>

                {/* Mistake 4 */}
                <MistakeV2 number={4} title="You don't have a clear ask">
                  <p className="text-lg text-[var(--text-secondary)] mb-4">
                    This one is surprisingly common. You present 20 minutes of
                    information and then... nothing. No decision requested. No
                    budget ask. The board sees an information dump, and information
                    dumps get forgotten by the time lunch arrives.
                  </p>
                  <BeforeAfter
                    before="That concludes our technology risk overview. Happy to take any questions."
                    after="We're requesting $3M over 18 months to reduce this $12M annual exposure by 75%. We need board approval to proceed."
                  />
                </MistakeV2>

                {/* Mistake 5 */}
                <MistakeV2 number={5} title="You use fear instead of math">
                  <p className="text-lg text-[var(--text-secondary)] mb-4">
                    Scare tactics feel effective in the moment but they erode trust
                    every time you use them. And those heat maps with ordinal scales
                    (1-5 for probability, 1-5 for impact)? The FAIR Institute calls
                    it &ldquo;silly math.&rdquo; Board directors are often
                    finance-savvy. They spot flawed analysis.
                  </p>
                  <BeforeAfter
                    before="This is a critical risk. We're highly exposed and need to act immediately before it's too late."
                    after="There's a 12% annual probability of a breach affecting customer services, with estimated losses of $8-15M per event. Here's the mitigation plan."
                  />
                </MistakeV2>

                <Takeaway>
                  Every mistake has the same root cause: talking about technology
                  instead of business outcomes. The fix is always the same: translate
                  into dollars, risk, and decisions.
                </Takeaway>
              </Sect>

              {/* ==================== SO WHAT CHAIN ==================== */}
              <Sect id="so-what-chain">
                <SectionLabel>The framework</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  The &ldquo;So What&rdquo; Chain
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-4">
                  This is the single most useful thing in this guide. Before any
                  finding goes into a board presentation, run it through these five steps.
                  If you can&apos;t complete the chain, it doesn&apos;t belong on a slide. Put it in the appendix.
                </p>
                <p className="text-lg text-[var(--text-secondary)] mb-8">
                  Think of it as a translation layer. You start with something
                  technical and end with something a CFO would immediately understand.
                </p>

                {/* Visual chain */}
                <div className="relative mb-10">
                  {/* Connecting line */}
                  <div className="absolute left-5 top-8 bottom-8 w-px bg-gradient-to-b from-[var(--text-muted)] via-[var(--omnigaze-gold)] to-[var(--success)] hidden sm:block" />

                  <div className="space-y-3 sm:space-y-4">
                    <ChainStepV2
                      step={1}
                      label="Technical Fact"
                      example="37% of our application portfolio runs on unsupported frameworks."
                      color="var(--text-muted)"
                      hint="Start here. What did you find?"
                    />
                    <ChainStepV2
                      step={2}
                      label="Operational Impact"
                      example="These applications can't be patched against new vulnerabilities."
                      color="var(--text-muted)"
                      hint="So what happens operationally?"
                    />
                    <ChainStepV2
                      step={3}
                      label="Business Risk"
                      example="This exposes 4 of our 6 customer-facing services to breach."
                      color="var(--omnigaze-gold)"
                      hint="What does the business feel?"
                    />
                    <ChainStepV2
                      step={4}
                      label="Financial Exposure"
                      example="A breach here has an estimated annual loss of $12M."
                      color="var(--omnigaze-gold)"
                      hint="Put a dollar sign on it."
                    />
                    <ChainStepV2
                      step={5}
                      label="The Ask"
                      example="$3M over 18 months reduces this exposure by 75%."
                      color="var(--success)"
                      hint="What do you need them to decide?"
                      isAsk
                    />
                  </div>
                </div>

                <PullQuote
                  quote="Technology needs to move from a bottom-line discussion to a topline one. We need to move beyond strategic alignment to strategic engagement."
                  author="Bhaskar Ramachandran"
                  role="VP & CIO, PPG Industries; Board member, S&T Bancorp"
                />

                <Takeaway>
                  If you can complete the &ldquo;So What&rdquo; Chain for every finding,
                  you&apos;re already better prepared than 80% of the technology leaders
                  walking into boardrooms this quarter.
                </Takeaway>
              </Sect>

              {/* ==================== METRICS ==================== */}
              <Sect id="metrics">
                <SectionLabel>The numbers</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  Metrics that actually land
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-8">
                  We used to think the problem was having enough data. It&apos;s not.
                  The problem is presenting the <em>right</em> data. Based on FAIR
                  Institute, Gartner&apos;s Outcome-Driven Metrics, and McKinsey&apos;s
                  Tech Debt Score, here are the numbers boards actually respond to.
                </p>

                <h3 className="font-display text-lg mb-4 text-[var(--text-primary)]">
                  Use these
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  <MetricCardV2
                    title="Annualized Loss Expectancy"
                    desc="Your expected annual loss from specific risk categories, in dollars. The single most powerful number you can bring to a board."
                    source="FAIR Framework"
                  />
                  <MetricCardV2
                    title="Tech Debt as % of IT Balance Sheet"
                    desc="McKinsey benchmarks this at ~40%. When you tell a board that 40 cents of every tech dollar is debt, they pay attention."
                    source="McKinsey"
                  />
                  <MetricCardV2
                    title="Risk Reduction ROI"
                    desc="For every dollar you invest in mitigation, how many dollars of exposure do you eliminate? This is the language of investment committees."
                    source="FAIR / Gartner"
                  />
                  <MetricCardV2
                    title="Tech Debt Interest Rate"
                    desc="McKinsey found you pay an extra 10-20% on every project because of legacy systems. That's money you're burning every quarter."
                    source="McKinsey"
                  />
                  <MetricCardV2
                    title="Revenue at Risk"
                    desc="Which revenue streams depend on infrastructure with known vulnerabilities? Tie risk directly to the P&L line items the board already watches."
                    source="Gartner ODM"
                  />
                  <MetricCardV2
                    title="Time to Impact"
                    desc="When will this risk materialize if we do nothing? Boards plan in quarters. Give them a timeline they can act on."
                    source="NACD"
                  />
                </div>

                <h3 className="font-display text-lg mb-4 text-[var(--text-primary)]">
                  Stop using these
                </h3>
                <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 mb-4">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Patch compliance percentages",
                      "Number of tickets closed",
                      "Lines of code or debt units",
                      "Heat maps with 1-5 scales",
                      "Vulnerability counts without dollar context",
                      "Project milestone checklists",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-base text-[var(--text-muted)]">
                        <X size={16} className="text-red-400 flex-shrink-0 mt-1" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-4">
                    None of these are bad metrics. They&apos;re just wrong for a
                    board audience. Save them for your team reviews.
                  </p>
                </div>

                <Takeaway>
                  If a metric doesn&apos;t have a dollar sign or a probability attached to it,
                  think twice before putting it in front of the board.
                </Takeaway>
              </Sect>

              {/* ==================== TEMPLATE ==================== */}
              <Sect id="template">
                <SectionLabel>The deliverable</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  The one-page board template
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-4">
                  We built this by combining Gartner&apos;s 7-slide framework, NACD
                  governance principles, and McKinsey&apos;s tech debt balance sheet concept.
                  It gives the board everything they need on a single page.
                </p>
                <p className="text-lg text-[var(--text-secondary)] mb-8">
                  You can download it below. But here&apos;s a preview of what it looks like.
                </p>

                {/* Template preview */}
                <div className="bg-[var(--bg-card)] border-2 border-[var(--border-warm)] rounded-2xl overflow-hidden mb-8 shadow-[0_0_40px_var(--amber-glow)]">
                  {/* Template Header */}
                  <div className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] px-5 py-3 flex items-center justify-between">
                    <div>
                      <div className="font-display text-lg text-[var(--text-primary)]">
                        Technology Risk Report
                      </div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5">
                        [Company Name] / Board of Directors / [Quarter, Year]
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {["R", "A", "G"].map((c, i) => (
                        <span
                          key={c}
                          className="w-7 h-5 rounded text-[10px] font-bold flex items-center justify-center"
                          style={{
                            background: i === 1 ? "rgba(232, 160, 48, 0.2)" : "rgba(255,255,255,0.05)",
                            color: i === 1 ? "var(--omnigaze-gold)" : "var(--text-muted)",
                            border: i === 1 ? "1px solid var(--omnigaze-gold)" : "1px solid var(--border-subtle)",
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Template body */}
                  <div className="p-5 space-y-4 text-sm">
                    <TplRow n="1" title="Executive Summary" color="var(--omni-violet)">
                      &ldquo;Our technology risk exposure has [increased/decreased] by [$X / X%] since [date] due to [reason].&rdquo;
                    </TplRow>
                    <TplRow n="2" title="Top 3-5 Risks (Quantified)" color="var(--omnigaze-gold)">
                      <span className="inline-block mr-3">Risk / Exposure (ALE) / Probability / Trend / Mitigation status</span>
                      <span className="text-[var(--text-muted)] text-xs">[table format]</span>
                    </TplRow>
                    <TplRow n="3" title="Peer Benchmark" color="var(--signal-cyan)">
                      &ldquo;Our annual risk is $X. We invest $Y in mitigation. Peers invest ~$Z.&rdquo;
                    </TplRow>
                    <TplRow n="4" title="Investment vs. Risk Reduction" color="var(--soft-plasma-pink)">
                      Run vs. Grow vs. Transform allocation. Tech debt ratio. ROI of current mitigations.
                    </TplRow>
                    <TplRow n="5" title="Strategic Alignment" color="var(--omni-violet)">
                      How top risks map to strategic objectives. Which revenue streams are threatened.
                    </TplRow>
                    <TplRow n="6" title="The Ask" color="var(--omnigaze-gold)">
                      &ldquo;We request approval for $XM to reduce annual exposure by $YM over Z months.&rdquo;
                    </TplRow>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Gartner says no more than 7 slides, 15 minutes max. This template
                  gives you the structure. Your job is to fill in the numbers.
                </p>

                <Takeaway>
                  The hardest part isn&apos;t the template. It&apos;s having the data
                  to fill it in. If you don&apos;t know your tech debt ratio or your
                  annualized loss expectancy, start there.
                </Takeaway>
              </Sect>

              {/* ==================== AI PROMPT ==================== */}
              <Sect id="ai-prompt">
                <SectionLabel>Bonus</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  AI prompt: build your deck in minutes
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-4">
                  Once you have your data ready, paste this prompt into ChatGPT, Claude, or
                  whatever AI tool you use. It&apos;ll generate a first draft of your board
                  presentation using the framework from this guide.
                </p>
                <p className="text-lg text-[var(--text-secondary)] mb-8">
                  Replace the bracketed placeholders with your real numbers. The AI does the
                  structure and language. You bring the data and judgment.
                </p>

                <div className="relative bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] px-5 py-3">
                    <div className="flex items-center gap-2 text-[var(--omnigaze-gold)]">
                      <Sparkles size={16} />
                      <span className="font-display text-sm">Board Presentation Prompt</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(aiPromptText);
                        setPromptCopied(true);
                        setTimeout(() => setPromptCopied(false), 2000);
                      }}
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-[var(--omnigaze-gold)]/10 text-[var(--omnigaze-gold)] hover:bg-[var(--omnigaze-gold)]/20 transition-colors"
                    >
                      {promptCopied ? (
                        <>
                          <Check size={14} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copy prompt
                        </>
                      )}
                    </button>
                  </div>

                  {/* Prompt body */}
                  <div className="p-5 md:p-6">
                    <pre className="text-sm md:text-base text-[var(--text-secondary)] whitespace-pre-wrap font-mono leading-relaxed">
                      {aiPromptText}
                    </pre>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-muted)] mt-4">
                  Tip: attach any existing risk data, audit reports, or infrastructure summaries as context.
                  The more real data you feed in, the less you&apos;ll need to edit afterward.
                </p>

                <Takeaway>
                  The AI gives you speed. You bring the judgment. Review every number,
                  adjust the tone for your audience, and never present something you
                  can&apos;t defend in a follow-up question.
                </Takeaway>
              </Sect>

              {/* ==================== PLAYBOOK ==================== */}
              <Sect id="playbook">
                <SectionLabel>Tactical advice</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  Before you walk in
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-8">
                  The best board presentations are won before the meeting starts.
                  Shelley Leibowitz, who sits on the boards of E*TRADE and MassMutual
                  (and used to be CIO of the World Bank Group), says it well:
                  &ldquo;A lot of board interaction needs to happen outside the boardroom.&rdquo;
                </p>

                <div className="space-y-3 mb-8">
                  <PlaybookCard
                    n="01"
                    title="Pre-socialize everything"
                    desc="Share your key messages with the CEO and board chair before the meeting. Bad news should never be a surprise. If the board chair hears something for the first time in the meeting, you've already lost control of the narrative."
                  />
                  <PlaybookCard
                    n="02"
                    title="Prepare three versions"
                    desc="Board meetings run over. Always. Have a 15-minute version, a 10-minute version, and a 5-minute version. The 5-minute version is just your 'So What' Chain for the top risk, plus the ask."
                  />
                  <PlaybookCard
                    n="03"
                    title="Build the appendix, not the encyclopedia"
                    desc="High-level metrics on your slides. Detailed backup ready if someone asks. Never put detail on the slides themselves. If a director wants to drill down, they'll ask."
                  />
                  <PlaybookCard
                    n="04"
                    title="Find your board champion"
                    desc="Nearly half of S&P 500 boards now include members with technology backgrounds. Find the tech-savvy director and align on your strategy beforehand. They can help translate in real-time during the meeting."
                  />
                  <PlaybookCard
                    n="05"
                    title="Tell a journey, not a snapshot"
                    desc="Show trend lines over time so the board feels a continuous conversation. 'Last quarter we identified X. We invested Y. Here's the result.' Consistency builds trust faster than any single presentation."
                  />
                </div>

                {/* Watermelon warning */}
                <div className="bg-[var(--bg-card)] border border-[var(--omnigaze-gold)]/20 rounded-xl p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🍉</span>
                    <div>
                      <h4 className="font-display text-lg mb-2 text-[var(--text-primary)]">
                        Watch out for watermelon reporting
                      </h4>
                      <p className="text-base text-[var(--text-secondary)]">
                        Green on the outside, red on the inside. RAG status reports are
                        the most common board format and the most commonly gamed.
                        If your organization uses traffic lights, make sure any color change
                        comes with data and a remediation plan. Don&apos;t let optimism bias
                        paint everything green.
                      </p>
                    </div>
                  </div>
                </div>

                <Takeaway>
                  The presentation is the performance. The real work is everything
                  that happens before you walk into the room.
                </Takeaway>
              </Sect>

              {/* ==================== EVIDENCE ==================== */}
              <Sect id="evidence">
                <SectionLabel>Real results</SectionLabel>
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  Proof this works
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-8">
                  These aren&apos;t hypothetical examples. They&apos;re from published
                  McKinsey and FAIR Institute case studies.
                </p>

                <div className="space-y-4 mb-8">
                  <CaseCard
                    label="Insurance company"
                    what="Discovered tech debt was 15-60% of every IT dollar spent. A number that had never appeared in any business case."
                    result="CIO and CFO created a joint technology agenda. Fundamentally changed how investment decisions were made."
                    source="McKinsey"
                  />
                  <CaseCard
                    label="Banking group"
                    what="Board set up a dedicated technology subcommittee to review the tech debt transformation program."
                    result="Protected the capital for tech debt paydown so it survived leadership changes. That almost never happens."
                    source="McKinsey"
                  />
                  <CaseCard
                    label="ADP"
                    what="Built Key Risk Indicators using FAIR quantitative analysis."
                    result="When the board asks 'How are we doing?' they get a financial answer, not a progress report."
                    source="FAIR Institute"
                  />
                  <CaseCard
                    label="Forrester ERM study"
                    what="Firms without board-level ERM visibility were 20 percentage points more likely to suffer six or more critical risk events."
                    result="75% of enterprises experienced at least one critical risk event in the past year. Board visibility directly reduces catastrophic outcomes."
                    source="Forrester 2025"
                  />
                  <CaseCard
                    label="220-company study"
                    what="Companies in the top quintile for tech health showed 20% higher revenue growth."
                    result="Bottom-quintile companies were 40% more likely to have canceled IT modernization programs."
                    source="McKinsey TDS"
                  />
                </div>

                <Takeaway>
                  When you translate technology risk into financial language,
                  boards don&apos;t just listen. They act.
                </Takeaway>
              </Sect>

              {/* ==================== DOWNLOAD CTA ==================== */}
              <section className="my-16" id="download">
                <div className="bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] border border-[var(--border-warm)] rounded-2xl p-8 md:p-10">
                  {gateStatus === "sent" ? (
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-[var(--success)]/10 flex items-center justify-center mx-auto mb-5">
                        <Check className="w-7 h-7 text-[var(--success)]" />
                      </div>
                      <h3 className="font-display text-2xl mb-2">
                        You&apos;re all set
                      </h3>
                      <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
                        Use the button below to save this guide as a PDF, including
                        the one-page board template.
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <Button variant="primary" onClick={() => window.print()}>
                          <Download size={16} />
                          Save as PDF
                        </Button>
                        <ButtonLink href="/resources" variant="secondary">
                          More resources
                        </ButtonLink>
                      </div>
                    </div>
                  ) : (
                    <div className="md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-center">
                      <div>
                        <h3 className="font-display text-2xl mb-2">
                          Get the template + full guide as PDF
                        </h3>
                        <p className="text-[var(--text-secondary)] text-sm mb-1">
                          You&apos;ll get the one-page board template and this entire
                          guide in a clean, print-friendly format.
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mb-4 md:mb-0">
                          No spam, no sales sequence. Just the PDF.
                        </p>
                      </div>
                      <div>
                        <form onSubmit={handleSendTemplate} className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="bg-[var(--bg-deep)] border border-[var(--border-subtle)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--omnigaze-gold)] transition-colors min-w-[220px]"
                          />
                          <Button type="submit" variant="primary" disabled={gateStatus === "submitting"}>
                            {gateStatus === "submitting" ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Send size={14} />
                            )}
                            Send me the template
                          </Button>
                        </form>
                        <button
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              const url = window.location.href;
                              navigator.clipboard?.writeText(url);
                            }
                          }}
                          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] mt-2 transition-colors"
                        >
                          <Bookmark size={12} />
                          Or just bookmark this page
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* ==================== SOURCES ==================== */}
              <Sect id="sources">
                <h2 className="font-display text-xl mb-6">
                  Sources
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-[var(--text-muted)]">
                  {sourceList.map((s, i) => (
                    <div key={i} className="py-0.5">
                      <span className="text-[var(--text-secondary)]">{s.org}</span>
                      {" "}<span className="text-[var(--text-muted)]">{s.title}</span>
                    </div>
                  ))}
                </div>
              </Sect>

              {/* ==================== OMNIGAZE (subtle) ==================== */}
              <section className="mt-12 mb-8">
                <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-10">
                  <p className="text-lg text-[var(--text-secondary)] mb-4">
                    <strong className="text-[var(--text-primary)]">Full disclosure:</strong> We
                    built OmniGaze to solve the visibility problem that makes these board
                    conversations so hard in the first place. If you don&apos;t know your tech
                    debt ratio or can&apos;t map which business capabilities depend on which
                    infrastructure, that&apos;s the gap we close.
                  </p>
                  <p className="text-lg text-[var(--text-secondary)] mb-6">
                    But the guide above works regardless of what tools you use. That&apos;s the point.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <ButtonLink href="/features" variant="secondary" size="sm">
                      See what OmniGaze does
                    </ButtonLink>
                    <ButtonLink
                      href="https://cal.eu/sofielevi/30min"
                      variant="secondary"
                      size="sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Or just talk to me
                    </ButtonLink>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>
      </main>

      <Footer />

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          header, footer, nav, .no-print, [data-testid="header"], [data-testid="footer"] {
            display: none !important;
          }
          body {
            background: white !important;
            color: #1a1a1a !important;
            font-size: 11pt !important;
          }
          main { padding-top: 0 !important; }
          article { max-width: 100% !important; }
          * {
            color: #1a1a1a !important;
            border-color: #ddd !important;
            background: transparent !important;
          }
          h1, h2, h3, h4 { color: #000 !important; }
          .gradient-text {
            -webkit-text-fill-color: #000 !important;
            background: none !important;
          }
        }
      `}</style>
    </>
  );
}

/* ==================== COMPONENTS ==================== */

function Sect({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 md:mb-20 scroll-mt-32">
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm uppercase tracking-widest text-[var(--omnigaze-gold)] mb-3">
      {children}
    </div>
  );
}

function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-6 py-5 my-8">
      <div className="flex gap-3">
        <ArrowRight size={18} className="text-[var(--omnigaze-gold)] flex-shrink-0 mt-0.5" />
        <p className="text-base text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">Key takeaway: </strong>
          {children}
        </p>
      </div>
    </div>
  );
}

function PullQuote({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <blockquote className="my-10 pl-6 border-l-2 border-[var(--omnigaze-gold)]">
      <p className="font-display text-2xl md:text-3xl text-[var(--text-primary)] leading-relaxed mb-3">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="text-base text-[var(--text-muted)]">
        {author}, {role}
      </footer>
    </blockquote>
  );
}

function StatCard({ value, label, source }: { value: string; label: string; source: string }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 text-center">
      <div className="font-display text-4xl md:text-5xl text-[var(--omnigaze-gold)] mb-2">{value}</div>
      <p className="text-base text-[var(--text-secondary)] mb-2">{label}</p>
      <span className="text-sm text-[var(--text-muted)]">{source}</span>
    </div>
  );
}

function WalkawayCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const icons: Record<string, React.ReactNode> = {
    chain: <ArrowDown size={20} />,
    template: <FileText size={20} />,
    mistakes: <X size={20} />,
    metrics: <Check size={20} />,
  };
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <div className="w-9 h-9 rounded-lg bg-[var(--omnigaze-gold)]/10 flex items-center justify-center text-[var(--omnigaze-gold)] mb-3">
        {icons[icon]}
      </div>
      <h3 className="font-display text-lg mb-1.5 text-[var(--text-primary)]">{title}</h3>
      <p className="text-base text-[var(--text-muted)]">{desc}</p>
    </div>
  );
}

function MistakeV2({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <div className="flex items-start gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-400 text-sm font-bold flex-shrink-0 mt-0.5">
          {number}
        </span>
        <h3 className="font-display text-2xl text-[var(--text-primary)]">{title}</h3>
      </div>
      <div className="pl-11">{children}</div>
    </div>
  );
}

function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-4">
      <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-5">
        <div className="text-xs uppercase tracking-wider text-red-400 mb-2 font-medium">What they hear</div>
        <p className="text-base text-[var(--text-secondary)] italic">&ldquo;{before}&rdquo;</p>
      </div>
      <div className="bg-[var(--success)]/5 border border-[var(--success)]/10 rounded-lg p-5">
        <div className="text-xs uppercase tracking-wider text-[var(--success)] mb-2 font-medium">Say this instead</div>
        <p className="text-base text-[var(--text-secondary)] italic">&ldquo;{after}&rdquo;</p>
      </div>
    </div>
  );
}

function ChainStepV2({
  step, label, example, color, hint, isAsk,
}: {
  step: number; label: string; example: string; color: string; hint: string; isAsk?: boolean;
}) {
  return (
    <div className={`sm:pl-12 relative rounded-lg p-4 border ${
      isAsk
        ? "border-[var(--success)]/30 bg-[var(--success)]/5"
        : "border-[var(--border-subtle)] bg-[var(--bg-card)]"
    }`}>
      <span
        className="sm:absolute sm:left-0 sm:top-4 w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center mb-2 sm:mb-0"
        style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, color }}
      >
        {step}
      </span>
      <div className="text-xs uppercase tracking-wider mb-1" style={{ color }}>{label}</div>
      <p className="text-base text-[var(--text-primary)] mb-1">&ldquo;{example}&rdquo;</p>
      <p className="text-sm text-[var(--text-muted)] italic">{hint}</p>
    </div>
  );
}

function MetricCardV2({ title, desc, source }: { title: string; desc: string; source: string }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5">
      <h4 className="font-display text-lg mb-2 text-[var(--text-primary)]">{title}</h4>
      <p className="text-base text-[var(--text-secondary)] mb-2">{desc}</p>
      <span className="text-sm text-[var(--omnigaze-gold)]">{source}</span>
    </div>
  );
}

function TplRow({ n, title, color, children }: { n: string; title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-1 rounded-full flex-shrink-0" style={{ background: color }} />
      <div className="flex-1 min-w-0">
        <div className="font-display text-sm font-medium text-[var(--text-primary)] mb-1">{n}. {title}</div>
        <div className="text-sm text-[var(--text-muted)] italic truncate">{children}</div>
      </div>
    </div>
  );
}

function PlaybookCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
      <span className="text-2xl font-display text-[var(--omnigaze-gold)]/30 font-semibold flex-shrink-0 leading-none mt-1">{n}</span>
      <div>
        <h4 className="font-display text-lg mb-1.5 text-[var(--text-primary)]">{title}</h4>
        <p className="text-base text-[var(--text-secondary)]">{desc}</p>
      </div>
    </div>
  );
}

function CaseCard({ label, what, result, source }: { label: string; what: string; result: string; source: string }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-lg text-[var(--text-primary)]">{label}</span>
        <span className="text-sm text-[var(--omnigaze-gold)] bg-[var(--omnigaze-gold)]/10 px-2.5 py-0.5 rounded">{source}</span>
      </div>
      <div className="space-y-2 text-base">
        <div className="flex gap-2">
          <TrendingDown size={16} className="text-red-400 flex-shrink-0 mt-1" />
          <p className="text-[var(--text-secondary)]">{what}</p>
        </div>
        <div className="flex gap-2">
          <Check size={16} className="text-[var(--success)] flex-shrink-0 mt-1" />
          <p className="text-[var(--text-secondary)]">{result}</p>
        </div>
      </div>
    </div>
  );
}

/* ==================== DATA ==================== */

const aiPromptText = `You are helping me create a board-level technology risk presentation. Use the "So What" Chain framework: start with a technical fact, translate it to operational impact, then business risk, then financial exposure, then a clear ask.

CONTEXT ABOUT MY ORGANIZATION:
- Company: [Company name]
- Industry: [Industry]
- Annual IT budget: [$ amount]
- Number of servers/assets: [number]
- Board meeting date: [date]
- Time slot: [X minutes]

TOP 3 TECHNOLOGY RISKS I WANT TO PRESENT:

Risk 1: [Describe the technical finding, e.g. "37% of our applications run on unsupported frameworks"]
- Estimated financial exposure: [$ range or "unknown - help me estimate"]
- Business systems affected: [which revenue streams or operations]

Risk 2: [Describe the technical finding]
- Estimated financial exposure: [$ range or "unknown"]
- Business systems affected: [which systems]

Risk 3: [Describe the technical finding]
- Estimated financial exposure: [$ range or "unknown"]
- Business systems affected: [which systems]

MY ASK TO THE BOARD:
- Total investment requested: [$X over Y months]
- Expected risk reduction: [X% reduction in exposure]

INSTRUCTIONS:
1. Create a 6-section, one-page board report following this structure:
   - Executive Summary (2-3 sentences, lead with the headline risk change)
   - Top Risks table (Risk / Annual Loss Exposure / Probability / Trend / Status)
   - Peer Benchmark (compare our risk posture to industry averages)
   - Investment vs. Risk Reduction (show ROI of the proposed investment)
   - Strategic Alignment (map risks to our business objectives)
   - The Ask (specific approval request with timeline)

2. Use financial language throughout. No jargon, no acronyms without definition.
3. Every risk must have a dollar figure attached, even if estimated.
4. Keep it to one page. If I had to present this in 5 minutes, every word should earn its place.
5. Flag anything where my data seems incomplete and suggest what I should find out before the meeting.`;

const sourceList = [
  { org: "NACD", title: "Director's Handbook on Cyber-Risk Oversight, 2023" },
  { org: "NACD", title: "2024 Blue Ribbon Commission Report" },
  { org: "McKinsey", title: "Demystifying Digital Dark Matter (Tech Debt Score)" },
  { org: "McKinsey", title: "Tech Debt: Reclaiming Tech Equity" },
  { org: "McKinsey", title: "How Effective Boards Approach Technology Governance" },
  { org: "Gartner", title: "15-Minute, 7-Slide Board Presentation Framework" },
  { org: "Gartner", title: "Outcome-Driven Metrics (130 ODMs)" },
  { org: "FAIR Institute", title: "Factor Analysis of Information Risk (ISO standard)" },
  { org: "FAIR Institute", title: "FAIRCON22 Board Presentation Tips" },
  { org: "Deloitte", title: "The Tech-Forward Boardroom (Harvard Law Forum)" },
  { org: "PwC", title: "2025 Global Digital Trust Insights Survey" },
  { org: "PwC", title: "Nine Questions Boards Should Ask CIOs" },
  { org: "FTI Consulting", title: "CISO-C-Suite Communications Gap Study, 2023" },
  { org: "Forrester", title: "The State of Enterprise Risk Management, 2025" },
  { org: "BCG", title: "Mind the Tech Gap (2,700 executives, 13 countries)" },
  { org: "Harvard Law Forum", title: "Technology Leadership in the Boardroom, 2024" },
  { org: "Egon Zehnder", title: "Do Boards Need a Qualified Tech Expert?" },
  { org: "CSO Online", title: "CISO Reporting Lines & Board Communication" },
  { org: "SEC", title: "Cybersecurity Disclosure Rules (2023)" },
];
