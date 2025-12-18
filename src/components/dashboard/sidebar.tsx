"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CreditCard,
  Key,
  Receipt,
  Users,
  Settings,
  Download,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/api-client";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  tier?: string; // Minimum tier required
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  { label: "Licenses", href: "/dashboard/licenses", icon: Key },
  { label: "Billing", href: "/dashboard/billing", icon: Receipt },
  { label: "Team", href: "/dashboard/team", icon: Users, tier: "Business" },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  userTier?: string;
  userEmail?: string;
}

export function Sidebar({ userTier = "Community", userEmail = "" }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch {
      // Still redirect on error
      window.location.href = "/login";
    }
  };

  const tierOrder = ["Community", "Starter", "Professional", "Business", "Enterprise"];
  const userTierIndex = tierOrder.indexOf(userTier);

  const canAccessItem = (item: NavItem) => {
    if (!item.tier) return true;
    const requiredIndex = tierOrder.indexOf(item.tier);
    return userTierIndex >= requiredIndex;
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-[var(--border-subtle)]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-500)] flex items-center justify-center font-display font-bold text-[var(--bg-deep)] text-lg">
            OG
          </div>
          <span className="font-display text-xl font-medium text-[var(--text-primary)]">
            OmniGaze
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const hasAccess = canAccessItem(item);

          return (
            <Link
              key={item.href}
              href={hasAccess ? item.href : "#"}
              onClick={(e) => !hasAccess && e.preventDefault()}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-[var(--amber-400)]/10 text-[var(--amber-400)]"
                  : hasAccess
                  ? "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] cursor-not-allowed opacity-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {!hasAccess && (
                <span className="ml-auto text-xs bg-[var(--bg-elevated)] px-2 py-0.5 rounded">
                  {item.tier}+
                </span>
              )}
            </Link>
          );
        })}

        {/* Download link */}
        <Link
          href="/download"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Download className="w-5 h-5" />
          <span className="font-medium">Download</span>
          <ExternalLink className="w-4 h-4 ml-auto" />
        </Link>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-[var(--border-subtle)]">
        {/* Tier badge */}
        <div className="mb-4 px-4">
          <div className="text-xs text-[var(--text-muted)] mb-1">Current Plan</div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--pyramid-infrastructure)]/20 border border-[var(--pyramid-infrastructure)]/30 rounded-full">
            <span className="text-sm font-medium text-[var(--pyramid-infrastructure)]">
              {userTier}
            </span>
          </div>
        </div>

        {/* User info */}
        <div className="px-4 mb-4">
          <div className="text-sm text-[var(--text-primary)] truncate">
            {userEmail || "user@example.com"}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] lg:hidden"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-[var(--bg-card)] border-r border-[var(--border-subtle)] flex flex-col transform transition-transform duration-300 lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 bg-[var(--bg-card)] border-r border-[var(--border-subtle)]">
        <SidebarContent />
      </aside>
    </>
  );
}
