import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { ButtonLink } from "@/components/ui/button";
import { Home, Search, FileQuestion, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* 404 Visual */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <span className="font-display text-[150px] md:text-[200px] font-bold text-[var(--bg-elevated)] leading-none select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[var(--amber-400)]/10 flex items-center justify-center">
                  <FileQuestion className="w-12 h-12 text-[var(--amber-400)]" />
                </div>
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-medium mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 mb-8">
            <h2 className="font-display text-lg font-medium mb-4">
              Popular Destinations
            </h2>
            <div className="grid gap-3">
              <QuickLink
                href="/"
                icon={Home}
                title="Homepage"
                description="Start from the beginning"
              />
              <QuickLink
                href="/features"
                icon={Search}
                title="Features"
                description="Explore what OmniGaze can do"
              />
              <QuickLink
                href="/docs"
                icon={BookOpen}
                title="Documentation"
                description="Guides and tutorials"
              />
              <QuickLink
                href="/pricing"
                icon={ArrowRight}
                title="Plans"
                description="Find the right plan"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/" variant="primary" size="lg">
              <Home className="w-5 h-5" />
              Back to Home
            </ButtonLink>
            <ButtonLink href="/support" variant="secondary" size="lg">
              Contact Support
            </ButtonLink>
          </div>

          {/* Search suggestion */}
          <p className="text-center text-sm text-[var(--text-muted)] mt-8">
            Looking for something specific?{" "}
            <Link href="/docs" className="text-[var(--amber-400)] hover:underline">
              Browse our documentation
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function QuickLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-deep)] transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[var(--amber-400)]" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-[var(--text-primary)] group-hover:text-[var(--amber-400)] transition-colors">
          {title}
        </div>
        <div className="text-sm text-[var(--text-secondary)]">{description}</div>
      </div>
      <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--amber-400)] transition-colors" />
    </Link>
  );
}
