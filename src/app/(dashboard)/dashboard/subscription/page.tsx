"use client";

import { useState, useEffect } from "react";
import { UsageMeter, TierBadge } from "@/components/dashboard/stat-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { getCurrentTier, getTiers, getStripePortalUrl, CurrentTierInfo, TierInfo } from "@/lib/api-client";
import { Check, X, ArrowRight, ExternalLink, Loader2 } from "lucide-react";

export default function SubscriptionPage() {
  const [currentTier, setCurrentTier] = useState<CurrentTierInfo | null>(null);
  const [allTiers, setAllTiers] = useState<TierInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [current, tiers] = await Promise.all([
          getCurrentTier(),
          getTiers(),
        ]);
        setCurrentTier(current);
        setAllTiers(tiers);
      } catch (error) {
        console.error("Failed to load subscription data:", error);
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
    } catch (error) {
      console.error("Failed to get billing portal:", error);
      // Fallback to billing page
      window.location.href = "/dashboard/billing";
    } finally {
      setIsLoadingPortal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-[var(--bg-elevated)] rounded w-48" />
        <div className="h-64 bg-[var(--bg-elevated)] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
          Subscription
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Manage your plan and usage.
        </p>
      </div>

      {/* Current plan */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Current Plan
              </h2>
              <TierBadge tier={currentTier?.displayName || "Community"} />
            </div>
            <p className="text-[var(--text-secondary)]">
              {currentTier?.monthlyPrice
                ? `$${currentTier.monthlyPrice}/month`
                : "Free forever"}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleManageBilling}
            disabled={isLoadingPortal}
          >
            {isLoadingPortal ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Manage Billing
                <ExternalLink className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Usage */}
        <div className="space-y-6 pt-6 border-t border-[var(--border-subtle)]">
          <UsageMeter
            label="Servers"
            current={currentTier?.usage?.servers || 0}
            limit={currentTier?.serverLimit || 50}
          />
          <UsageMeter
            label="Team Members"
            current={currentTier?.usage?.users || 1}
            limit={currentTier?.userLimit || 1}
          />
        </div>
      </div>

      {/* Available upgrades */}
      {currentTier?.availableUpgrades && currentTier.availableUpgrades.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-4">
            Upgrade Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTier.availableUpgrades.map((tier) => (
              <UpgradeCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      )}

      {/* All tiers comparison */}
      <div>
        <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-4">
          Compare All Plans
        </h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                    Feature
                  </th>
                  {allTiers.map((tier) => (
                    <th
                      key={tier.id}
                      className="text-center p-4 text-sm font-medium text-[var(--text-primary)]"
                    >
                      <TierBadge tier={tier.displayName} size="sm" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border-subtle)]">
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    Server Limit
                  </td>
                  {allTiers.map((tier) => (
                    <td
                      key={tier.id}
                      className="p-4 text-center text-sm text-[var(--text-primary)]"
                    >
                      {tier.serverLimit === -1 ? "Unlimited" : tier.serverLimit}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border-subtle)]">
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    User Limit
                  </td>
                  {allTiers.map((tier) => (
                    <td
                      key={tier.id}
                      className="p-4 text-center text-sm text-[var(--text-primary)]"
                    >
                      {tier.userLimit === -1 ? "Unlimited" : tier.userLimit}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[var(--border-subtle)]">
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    Monthly Price
                  </td>
                  {allTiers.map((tier) => (
                    <td
                      key={tier.id}
                      className="p-4 text-center text-sm text-[var(--text-primary)]"
                    >
                      {tier.monthlyPrice ? `$${tier.monthlyPrice}` : "Free"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Features included */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-4">
          Features Included
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentTier?.features?.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[var(--success)]" />
              <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpgradeCard({ tier }: { tier: TierInfo }) {
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-warm)] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <TierBadge tier={tier.displayName} />
      </div>
      <div className="mb-4">
        <span className="font-display text-3xl font-semibold text-[var(--text-primary)]">
          ${tier.monthlyPrice}
        </span>
        <span className="text-[var(--text-muted)]">/mo</span>
      </div>
      <ul className="space-y-2 mb-6">
        <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Check className="w-4 h-4 text-[var(--success)]" />
          {tier.serverLimit === -1 ? "Unlimited" : tier.serverLimit} servers
        </li>
        <li className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Check className="w-4 h-4 text-[var(--success)]" />
          {tier.userLimit === -1 ? "Unlimited" : tier.userLimit} users
        </li>
      </ul>
      <ButtonLink href={`/checkout?tier=${tier.name}`} variant="primary" className="w-full">
        Upgrade
        <ArrowRight className="w-4 h-4" />
      </ButtonLink>
    </div>
  );
}
