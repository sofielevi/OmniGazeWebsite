"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TierBadge } from "@/components/dashboard/stat-card";
import { getBillingInfo, getCurrentTier, BillingInfo, CurrentTierInfo, ApiError } from "@/lib/api-client";
import {
  CreditCard,
  Receipt,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
} from "lucide-react";

export default function BillingPage() {
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [tier, setTier] = useState<CurrentTierInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [billing, tierData] = await Promise.all([
          getBillingInfo(),
          getCurrentTier(),
        ]);
        setBillingInfo(billing);
        setTier(tierData);
      } catch (err) {
        if (err instanceof ApiError) {
          // If no billing info (free tier), that's okay
          if (err.statusCode === 404) {
            setBillingInfo(null);
          } else {
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

  const handleManageBilling = () => {
    if (billingInfo?.stripePortalUrl) {
      window.open(billingInfo.stripePortalUrl, "_blank");
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
          Billing
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Manage your payment method and view invoices.
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

      {/* Payment Method */}
      {!isFreeUser && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[var(--amber-400)]" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Payment Method
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Your payment details are securely stored with Stripe
              </p>
            </div>
          </div>

          {billingInfo?.hasPaymentMethod ? (
            <div className="flex items-center justify-between p-4 bg-[var(--bg-elevated)] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-[var(--bg-deep)] rounded flex items-center justify-center text-sm font-medium text-[var(--text-secondary)]">
                  {billingInfo.cardBrand?.toUpperCase() || "CARD"}
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    •••• •••• •••• {billingInfo.cardLast4}
                  </p>
                  {billingInfo.nextBillingDate && (
                    <p className="text-sm text-[var(--text-muted)]">
                      Next billing: {new Date(billingInfo.nextBillingDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <Button variant="secondary" onClick={handleManageBilling}>
                Update
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-500 text-sm">
                No payment method on file. Add one to continue your subscription.
              </p>
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleManageBilling}
              >
                Add Payment Method
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Current Subscription */}
      {!isFreeUser && tier && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-4">
            Current Subscription
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-[var(--bg-elevated)] rounded-lg">
            <div className="flex items-center gap-3">
              <TierBadge tier={tier.displayName} size="lg" />
              <div>
                <p className="font-medium text-[var(--text-primary)]">
                  ${tier.monthlyPrice}/month
                </p>
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
        </div>
      )}

      {/* Invoice History */}
      {!isFreeUser && billingInfo && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  Invoice History
                </h2>
                <p className="text-sm text-[var(--text-muted)]">
                  Your billing history and invoices
                </p>
              </div>
              <Button variant="secondary" onClick={handleManageBilling}>
                View All in Stripe
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {billingInfo.invoices.length === 0 ? (
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
