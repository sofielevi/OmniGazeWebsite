"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { getTiers, TierInfo } from "@/lib/api-client";
import { isPurchasableTier, formatPrice, BillingCycle } from "@/lib/stripe";
import {
  Check,
  CreditCard,
  Shield,
  ArrowLeft,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tierParam = searchParams.get("tier");
  const cycleParam = searchParams.get("cycle") as BillingCycle | null;

  const [billingCycle, setBillingCycle] = useState<BillingCycle>(cycleParam || "monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTiers, setIsFetchingTiers] = useState(true);
  const [error, setError] = useState("");
  const [tiers, setTiers] = useState<TierInfo[]>([]);

  // Fetch tiers from API
  useEffect(() => {
    async function fetchTiers() {
      try {
        const apiTiers = await getTiers();
        if (apiTiers && apiTiers.length > 0) {
          setTiers(apiTiers);
        }
      } catch (err) {
        console.error("Failed to fetch tiers:", err);
        setError("Unable to load pricing information.");
      } finally {
        setIsFetchingTiers(false);
      }
    }
    fetchTiers();
  }, []);

  // Find the tier from API data
  const tier = tiers.find((t) => t.name.toLowerCase() === tierParam?.toLowerCase());

  // Validate tier is purchasable
  const isValidTier = tierParam && isPurchasableTier(tierParam.toLowerCase());

  useEffect(() => {
    if (cycleParam && (cycleParam === "monthly" || cycleParam === "annual")) {
      setBillingCycle(cycleParam);
    }
  }, [cycleParam]);

  const handleCheckout = async () => {
    if (!tier || !isValidTier) return;

    setIsLoading(true);
    setError("");

    try {
      // Use tier ID from API
      const tierId = tier.id;

      if (!tierId) {
        throw new Error("Invalid tier selected");
      }

      // Call the OmniGaze API checkout endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${apiUrl}/api/website/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          tierId,
          billingCycle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  // Loading state while fetching tiers
  if (isFetchingTiers) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-lg mx-auto px-6 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-[var(--amber-400)] mx-auto mb-6" />
            <p className="text-[var(--text-secondary)]">Loading pricing...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Invalid tier (after loading completes)
  if (!tier || !isValidTier) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-lg mx-auto px-6 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-medium mb-4">
              Invalid Plan Selected
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
              The plan you selected is not available for online purchase.
              Please choose from our available plans.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onClick={() => router.push("/pricing")}>
                <ArrowLeft className="w-4 h-4" />
                View Plans
              </Button>
              <Button variant="primary" onClick={() => router.push("/contact")}>
                Contact Sales
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const price = billingCycle === "monthly" ? tier.monthlyPrice : tier.annualPrice;
  const monthlyEquivalent = billingCycle === "annual" && tier.annualPrice
    ? Math.round(tier.annualPrice / 12)
    : (tier.monthlyPrice ?? 0);

  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to pricing
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8">
              <h1 className="font-display text-2xl font-medium mb-6">
                Order Summary
              </h1>

              {/* Plan details */}
              <div className="border-b border-[var(--border-subtle)] pb-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[var(--text-primary)]">
                    {tier.displayName} Plan
                  </span>
                  <span className="text-[var(--amber-400)] font-medium">
                    {formatPrice(price || 0)}
                    <span className="text-[var(--text-muted)] font-normal">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </span>
                </div>
                {billingCycle === "annual" && tier.monthlyPrice && (
                  <p className="text-sm text-[var(--text-muted)]">
                    {formatPrice(monthlyEquivalent)}/month when billed annually
                  </p>
                )}
              </div>

              {/* Billing cycle toggle */}
              <div className="mb-6">
                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                  Billing Cycle
                </label>
                <div className="flex bg-[var(--bg-elevated)] p-1 rounded-lg">
                  <button
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      billingCycle === "monthly"
                        ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                    onClick={() => setBillingCycle("monthly")}
                  >
                    Monthly
                  </button>
                  <button
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      billingCycle === "annual"
                        ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                    onClick={() => setBillingCycle("annual")}
                  >
                    Annual
                    <span className="px-1.5 py-0.5 bg-[var(--success)]/20 text-[var(--success)] text-xs rounded">
                      Save 17%
                    </span>
                  </button>
                </div>
              </div>

              {/* Features included */}
              <div>
                <h3 className="text-sm text-[var(--text-secondary)] mb-3">
                  Includes:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-[var(--success)]" />
                    Up to {tier.serverLimit.toLocaleString()} servers
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-[var(--success)]" />
                    {tier.userLimit} team members
                  </li>
                  {tier.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                    >
                      <Check className="w-4 h-4 text-[var(--success)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-8">
              <h2 className="font-display text-2xl font-medium mb-6">
                Complete Your Order
              </h2>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-[var(--border-subtle)] pt-4 mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[var(--text-secondary)]">
                    Total due today
                  </span>
                  <span className="font-display text-2xl font-medium text-[var(--text-primary)]">
                    {formatPrice(price || 0)}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  Billed {billingCycle === "monthly" ? "monthly" : "annually"}
                </p>
              </div>

              {/* Checkout button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center mb-4"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecting to checkout...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Complete Purchase
                  </>
                )}
              </Button>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Secure checkout
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  Powered by Stripe
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-[var(--text-muted)] text-center mt-6">
                By completing your purchase, you agree to our{" "}
                <Link href="/terms" className="text-[var(--amber-400)] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[var(--amber-400)] hover:underline">
                  Privacy Policy
                </Link>
                . You can cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--amber-400)]" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
