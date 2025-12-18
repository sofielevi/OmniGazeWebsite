"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StatCard, UsageMeter, TierBadge } from "@/components/dashboard/stat-card";
import { ButtonLink } from "@/components/ui/button";
import { getCurrentUser, getCurrentTier, UserInfo, CurrentTierInfo } from "@/lib/api-client";
import {
  Server,
  Users,
  Download,
  Key,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Headphones,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [tier, setTier] = useState<CurrentTierInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [userData, tierData] = await Promise.all([
          getCurrentUser(),
          getCurrentTier(),
        ]);
        setUser(userData);
        setTier(tierData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-[var(--bg-elevated)] rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 bg-[var(--bg-elevated)] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
          Welcome back
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Here&apos;s an overview of your OmniGaze account.
        </p>
      </div>

      {/* Tier banner */}
      <div className="bg-gradient-to-r from-[var(--pyramid-infrastructure)]/20 to-[var(--amber-400)]/10 border border-[var(--border-subtle)] rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <TierBadge tier={user?.tier || "Community"} size="lg" />
              <span className="text-sm text-[var(--text-muted)]">Current Plan</span>
            </div>
            <p className="text-[var(--text-secondary)]">
              {tier?.availableUpgrades && tier.availableUpgrades.length > 0
                ? "Upgrade to unlock more features and capacity."
                : "You're on our highest tier. Thank you!"}
            </p>
          </div>
          {tier?.availableUpgrades && tier.availableUpgrades.length > 0 && (
            <ButtonLink href="/dashboard/subscription" variant="primary">
              <Sparkles className="w-4 h-4" />
              Upgrade Plan
            </ButtonLink>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Servers"
          value={tier?.usage?.servers || 0}
          subtitle={`of ${tier?.serverLimit === -1 ? "unlimited" : tier?.serverLimit || 50} limit`}
          icon={Server}
        />
        <StatCard
          title="Team Members"
          value={tier?.usage?.users || 1}
          subtitle={`of ${tier?.userLimit === -1 ? "unlimited" : tier?.userLimit || 1} limit`}
          icon={Users}
        />
        <StatCard
          title="Plan"
          value={user?.tier || "Community"}
          subtitle={tier?.monthlyPrice ? `$${tier.monthlyPrice}/mo` : "Free"}
          icon={Key}
        />
        <StatCard
          title="Status"
          value={user?.isActive ? "Active" : "Inactive"}
          subtitle="License status"
          icon={Server}
        />
      </div>

      {/* Usage meters */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-6">
          Usage Overview
        </h2>
        <div className="space-y-6">
          <UsageMeter
            label="Servers Discovered"
            current={tier?.usage?.servers || 0}
            limit={tier?.serverLimit || 50}
          />
          <UsageMeter
            label="Team Members"
            current={tier?.usage?.users || 1}
            limit={tier?.userLimit || 1}
          />
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            href="/download"
            icon={Download}
            title="Download OmniGaze"
            description="Get the desktop application"
          />
          <QuickActionCard
            href="/dashboard/licenses"
            icon={Key}
            title="View License Key"
            description="Copy your activation key"
          />
          <QuickActionCard
            href="/docs"
            icon={BookOpen}
            title="Documentation"
            description="Get started guides"
          />
          <QuickActionCard
            href="mailto:support@omnigaze.com"
            icon={Headphones}
            title="Get Support"
            description="Contact our team"
            external
          />
        </div>
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  external?: boolean;
}

function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
  external,
}: QuickActionCardProps) {
  const Component = external ? "a" : Link;

  return (
    <Component
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 hover:border-[var(--border-warm)] transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--amber-400)]" />
        </div>
        <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--amber-400)] transition-colors" />
      </div>
      <h3 className="font-medium text-[var(--text-primary)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </Component>
  );
}
