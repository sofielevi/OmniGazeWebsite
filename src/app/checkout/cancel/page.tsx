"use client";

import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import {
  XCircle,
  ArrowLeft,
  MessageCircle,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Cancel Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[var(--text-muted)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-[var(--text-muted)]" />
            </div>
            <h1 className="font-display text-4xl font-medium mb-4">
              Checkout Cancelled
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              No worries! Your payment was not processed and you haven&apos;t been charged.
            </p>
          </div>

          {/* Options */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 mb-8">
            <h2 className="font-display text-xl font-medium mb-6">
              What would you like to do?
            </h2>

            <div className="space-y-4">
              {/* Try Again */}
              <Link
                href="/pricing"
                className="flex items-center gap-4 p-4 bg-[var(--bg-elevated)] rounded-xl hover:bg-[var(--bg-deep)] transition-colors group"
              >
                <div className="w-10 h-10 bg-[var(--amber-400)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-[var(--amber-400)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium group-hover:text-[var(--amber-400)] transition-colors">
                    Try a different plan
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Compare plans and choose the one that fits your needs
                  </p>
                </div>
              </Link>

              {/* Contact Sales */}
              <Link
                href="/contact"
                className="flex items-center gap-4 p-4 bg-[var(--bg-elevated)] rounded-xl hover:bg-[var(--bg-deep)] transition-colors group"
              >
                <div className="w-10 h-10 bg-[var(--amber-400)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[var(--amber-400)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium group-hover:text-[var(--amber-400)] transition-colors">
                    Talk to our team
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Get personalized help choosing the right plan for your organization
                  </p>
                </div>
              </Link>

              {/* FAQ */}
              <Link
                href="/docs/faq"
                className="flex items-center gap-4 p-4 bg-[var(--bg-elevated)] rounded-xl hover:bg-[var(--bg-deep)] transition-colors group"
              >
                <div className="w-10 h-10 bg-[var(--amber-400)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-[var(--amber-400)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium group-hover:text-[var(--amber-400)] transition-colors">
                    Have questions?
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Check our FAQ for answers about pricing, features, and more
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Free Tier Reminder */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 mb-8">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[var(--success)]/20 text-[var(--success)] text-xs rounded">
                FREE
              </span>
              Start with Community Tier
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Not ready to commit? Try OmniGaze free with up to 50 servers.
              No credit card required.
            </p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/download">
                Download Free Version
              </Link>
            </Button>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
