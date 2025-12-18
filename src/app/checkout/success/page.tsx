"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Download,
  ArrowRight,
  Mail,
  Loader2,
  Key,
} from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking session status
    // In production, this would verify the session with Stripe
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-lg mx-auto px-6 text-center">
            <Loader2 className="w-16 h-16 text-[var(--amber-400)] mx-auto mb-6 animate-spin" />
            <h1 className="font-display text-3xl font-medium mb-4">
              Confirming your order...
            </h1>
            <p className="text-[var(--text-secondary)]">
              Please wait while we verify your payment.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[var(--success)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[var(--success)]" />
            </div>
            <h1 className="font-display text-4xl font-medium mb-4">
              Welcome to OmniGaze!
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              Your trial has started. You&apos;re all set to discover your infrastructure.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8 mb-8">
            <h2 className="font-display text-xl font-medium mb-6">
              Next Steps
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[var(--amber-400)]/20 rounded-full flex items-center justify-center">
                  <span className="text-[var(--amber-400)] font-medium text-sm">1</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-[var(--amber-400)]" />
                    <h3 className="font-medium">Check your email</h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    We&apos;ve sent a confirmation email with your receipt and license details.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[var(--amber-400)]/20 rounded-full flex items-center justify-center">
                  <span className="text-[var(--amber-400)] font-medium text-sm">2</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Download className="w-4 h-4 text-[var(--amber-400)]" />
                    <h3 className="font-medium">Download OmniGaze</h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Get the installer for Windows and run the setup wizard.
                  </p>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/download">
                      <Download className="w-4 h-4" />
                      Download Now
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[var(--amber-400)]/20 rounded-full flex items-center justify-center">
                  <span className="text-[var(--amber-400)] font-medium text-sm">3</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Key className="w-4 h-4 text-[var(--amber-400)]" />
                    <h3 className="font-medium">Activate your license</h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Use the license key from your email or find it in your account dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trial Info */}
          <div className="bg-[var(--amber-400)]/10 border border-[var(--amber-400)]/30 rounded-xl p-6 mb-8">
            <h3 className="font-medium text-[var(--amber-400)] mb-2">
              14-Day Free Trial
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Your trial starts today and you won&apos;t be charged until it ends.
              You can cancel anytime from your account dashboard or by contacting support.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/docs">
                View Documentation
              </Link>
            </Button>
          </div>

          {/* Support */}
          <p className="text-center text-sm text-[var(--text-muted)] mt-8">
            Need help getting started?{" "}
            <Link href="/contact" className="text-[var(--amber-400)] hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--amber-400)]" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
