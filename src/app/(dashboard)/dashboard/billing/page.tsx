"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TierBadge } from "@/components/dashboard/stat-card";
import { getBillingInfo, getCurrentTier, getStripePortalUrl, BillingInfo, CurrentTierInfo, ApiError } from "@/lib/api-client";
import {
  Receipt,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Calendar,
  CreditCard,
  Zap,
  Loader2,
} from "lucide-react";

export default function BillingPage() {
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [tier, setTier] = useState<CurrentTierInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [billing, tierData] = await Promise.all([
          getBillingInfo().catch(() => null), // Don't fail if billing info not available yet
          getCurrentTier(),
        ]);
        setBillingInfo(billing);
        setTier(tierData);
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.statusCode !== 404) {
            setError(err.message);
          }
        } else {
          setError("Failed to load billing information");
        }
        // Still try to load tier info
        try {
          const tierData = await getCurrentTier();
          setTier(tierData);
        } catch {
          // Ignore secondary error
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleManageBilling = async () => {
    setIsLoadingPortal(true);
    try {
      const result = await getStripePortalUrl();
      if (result.url) {
        window.open(result.url, "_blank");
      }
    } catch (err) {
      console.error("Failed to open billing portal:", err);
      setError("Unable to open billing portal. Please try again.");
    } finally {
      setIsLoadingPortal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-[var(--bg-elevated)] rounded w-48" />
        <div className="h-48 bg-[var(--bg-elevated)] rounded-xl" />
      </div>
    );
  }

  const isFreeUser = tier?.monthlyPrice === 0 || tier?.monthlyPrice === null;
  const subscription = billingInfo?.subscription;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
          Billing
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          View your subscription and invoices.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Free tier notice */}
      {isFreeUser && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-[var(--amber-400)]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  Community Plan
                </h2>
                <TierBadge tier="Community" size="sm" />
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                You&apos;re on the free Community plan. No billing information required.
              </p>
              <Button
                variant="primary"
                onClick={() => window.location.href = "/dashboard/subscription"}
              >
                View Upgrade Options
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Current Subscription */}
      {!isFreeUser && tier && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[var(--amber-400)]" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Current Subscription
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Your active plan and billing details
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Plan Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-[var(--bg-elevated)] rounded-lg">
              <div className="flex items-center gap-3">
                <TierBadge tier={tier.displayName} size="lg" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--text-primary)]">
                      ${subscription?.billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice}
                      <span className="text-[var(--text-muted)] font-normal">
                        /{subscription?.billingCycle === 'annual' ? 'year' : 'month'}
                      </span>
                    </p>
                    {subscription?.status === 'trialing' && (
                      <span className="px-2 py-0.5 bg-[var(--amber-400)]/20 text-[var(--amber-400)] text-xs rounded-full font-medium">
                        Trial
                      </span>
                    )}
                    {subscription?.status === 'active' && (
                      <span className="px-2 py-0.5 bg-[var(--success)]/20 text-[var(--success)] text-xs rounded-full font-medium">
                        Active
                      </span>
                    )}
                    {subscription?.status === 'past_due' && (
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full font-medium">
                        Past Due
                      </span>
                    )}
                    {subscription?.cancelAtPeriodEnd && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded-full font-medium">
                        Cancels Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">
                    {tier.serverLimit === -1 ? "Unlimited" : tier.serverLimit} servers,{" "}
                    {tier.userLimit === -1 ? "unlimited" : tier.userLimit} users
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => window.location.href = "/dashboard/subscription"}
              >
                Change Plan
              </Button>
            </div>

            {/* Billing Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Next Billing */}
              {billingInfo?.nextBillingDate && (
                <div className="p-4 bg-[var(--bg-elevated)] rounded-lg">
                  <div className="flex items-center gap-2 text-[var(--text-muted)] mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Next Billing Date</span>
                  </div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {new Date(billingInfo.nextBillingDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  {billingInfo.nextBillingAmount !== undefined && (
                    <p className="text-sm text-[var(--text-muted)]">
                      ${(billingInfo.nextBillingAmount / 100).toFixed(2)} will be charged
                    </p>
                  )}
                </div>
              )}

              {/* Trial Info */}
              {subscription?.status === 'trialing' && subscription.trialEnd && (
                <div className="p-4 bg-[var(--amber-400)]/10 border border-[var(--amber-400)]/30 rounded-lg">
                  <div className="flex items-center gap-2 text-[var(--amber-400)] mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Trial Period</span>
                  </div>
                  <p className="font-medium text-[var(--text-primary)]">
                    Ends {new Date(subscription.trialEnd).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    You won&apos;t be charged until trial ends
                  </p>
                </div>
              )}

              {/* Billing Cycle */}
              {subscription?.billingCycle && (
                <div className="p-4 bg-[var(--bg-elevated)] rounded-lg">
                  <div className="flex items-center gap-2 text-[var(--text-muted)] mb-1">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">Billing Cycle</span>
                  </div>
                  <p className="font-medium text-[var(--text-primary)] capitalize">
                    {subscription.billingCycle}
                  </p>
                  {subscription.billingCycle === 'annual' && (
                    <p className="text-sm text-[var(--success)]">
                      Saving 17% vs monthly
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Manage in Stripe */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <Button variant="secondary" onClick={handleManageBilling}>
                Manage Subscription in Stripe
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice History */}
      {!isFreeUser && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-[var(--amber-400)]" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                    Invoices
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    Download your billing history
                  </p>
                </div>
              </div>
              {billingInfo?.stripePortalUrl && (
                <Button variant="secondary" onClick={handleManageBilling}>
                  View All
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {!billingInfo?.invoices || billingInfo.invoices.length === 0 ? (
            <div className="p-8 text-center">
              <Receipt className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3" />
              <h3 className="font-medium text-[var(--text-primary)] mb-1">
                No invoices yet
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Your invoices will appear here after your first payment.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--bg-elevated)]">
                  <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                    Date
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                    Description
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                    Amount
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                    Status
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody>
                {billingInfo.invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-t border-[var(--border-subtle)]"
                  >
                    <td className="p-4 text-sm text-[var(--text-primary)]">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm text-[var(--text-secondary)]">
                      {invoice.description}
                    </td>
                    <td className="p-4 text-sm font-medium text-[var(--text-primary)]">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: invoice.currency,
                      }).format(invoice.amount / 100)}
                    </td>
                    <td className="p-4">
                      <InvoiceStatusBadge status={invoice.status} />
                    </td>
                    <td className="p-4 text-right">
                      {invoice.invoiceUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(invoice.invoiceUrl, "_blank")}
                        >
                          <Download className="w-4 h-4" />
                          PDF
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Need Help */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-2">
          Need Help?
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          Questions about your billing or need to make changes to your subscription?
        </p>
        <Button
          variant="secondary"
          onClick={() => window.location.href = "mailto:billing@omnigaze.com"}
        >
          Contact Billing Support
        </Button>
      </div>
    </div>
  );
}

function InvoiceStatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const config = {
    paid: {
      icon: CheckCircle,
      color: "text-[var(--success)] bg-[var(--success)]/10",
      label: "Paid",
    },
    pending: {
      icon: Clock,
      color: "text-yellow-500 bg-yellow-500/10",
      label: "Pending",
    },
    failed: {
      icon: XCircle,
      color: "text-red-400 bg-red-400/10",
      label: "Failed",
    },
  };

  const { icon: Icon, color, label } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
