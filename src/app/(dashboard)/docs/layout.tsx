"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Rocket,
  Server,
  Shield,
  AppWindow,
  Layers,
  Cpu,
  FileCode,
  ChevronLeft,
  ChevronRight,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser, UserInfo } from "@/lib/api-client";
import { canAccessTier, getTierBadgeText, Tier } from "@/lib/docs-access";
import { DocsSearch } from "@/components/docs";
import { ShareButtons } from "@/components/ui/share-buttons";

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  tier: Tier;
}

const navSections: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Overview", href: "/docs", icon: BookOpen, tier: "community" },
      { label: "Installation", href: "/docs/getting-started/installation", icon: Rocket, tier: "community" },
      { label: "SmartScreen", href: "/docs/getting-started/smartscreen", icon: Shield, tier: "community" },
      { label: "Activation", href: "/docs/getting-started/activation", icon: Rocket, tier: "community" },
      { label: "First Scan", href: "/docs/getting-started/first-scan", icon: Rocket, tier: "community" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { label: "Asset Discovery", href: "/docs/infrastructure/discovery", icon: Server, tier: "community" },
      { label: "Network Scanning", href: "/docs/infrastructure/scanning", icon: Server, tier: "community" },
      { label: "Server Details", href: "/docs/infrastructure/servers", icon: Server, tier: "community" },
      { label: "3D Visualization", href: "/docs/infrastructure/3d-view", icon: Server, tier: "community" },
    ],
  },
  {
    title: "Security & Credentials",
    items: [
      { label: "Overview", href: "/docs/security", icon: Shield, tier: "community" },
      { label: "Route to Least Privilege", href: "/docs/security/credential-journey", icon: Shield, tier: "community" },
      { label: "WinRM Setup", href: "/docs/security/winrm-setup", icon: Shield, tier: "community" },
      { label: "Troubleshooting", href: "/docs/security/troubleshooting", icon: Shield, tier: "community" },
    ],
  },
  {
    title: "Applications",
    items: [
      { label: "App Discovery", href: "/docs/applications/discovery", icon: AppWindow, tier: "starter" },
      { label: "App Mapping", href: "/docs/applications/mapping", icon: AppWindow, tier: "starter" },
    ],
  },
  {
    title: "Capabilities",
    items: [
      { label: "Business Capabilities", href: "/docs/capabilities/overview", icon: Layers, tier: "professional" },
      { label: "Capability Mapping", href: "/docs/capabilities/mapping", icon: Layers, tier: "professional" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { label: "Architecture Mapping", href: "/docs/advanced/architecture", icon: Cpu, tier: "professional" },
      { label: "Value Streams", href: "/docs/advanced/value-streams", icon: Cpu, tier: "business" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { label: "REST API", href: "/docs/api/rest", icon: FileCode, tier: "professional" },
      { label: "OData Endpoints", href: "/docs/api/odata", icon: FileCode, tier: "professional" },
    ],
  },
];

// Get breadcrumb info from pathname
function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const crumbs: { label: string; href: string }[] = [
    { label: "Docs", href: "/docs" },
  ];

  // Find current page in nav
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.href === pathname) {
        if (item.href !== "/docs") {
          crumbs.push({ label: section.title, href: section.items[0].href });
          crumbs.push({ label: item.label, href: item.href });
        }
        return crumbs;
      }
    }
  }

  return crumbs;
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => {});
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const userTier = (user?.tier?.name?.toLowerCase() || "community") as Tier;
  const breadcrumbs = getBreadcrumbs(pathname);

  const SidebarContent = () => (
    <>
      {/* Back to Dashboard */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-4 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Search */}
      <div className="mb-6">
        <DocsSearch userTier={userTier} />
      </div>

      {/* Navigation */}
      <nav className="space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium mb-2 px-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const hasAccess = canAccessTier(userTier, item.tier);
                const badgeText = getTierBadgeText(item.tier);

                return (
                  <li key={item.href}>
                    <Link
                      href={hasAccess ? item.href : "#"}
                      onClick={(e) => !hasAccess && e.preventDefault()}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-[var(--amber-400)]/10 text-[var(--amber-400)]"
                          : hasAccess
                          ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                          : "text-[var(--text-muted)] cursor-not-allowed"
                      )}
                    >
                      {!hasAccess && <Lock className="w-3 h-3" />}
                      <span>{item.label}</span>
                      {badgeText && !hasAccess && (
                        <span className="ml-auto text-xs bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded">
                          {badgeText}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-20 left-4 z-50 p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] lg:hidden"
        aria-label="Toggle docs menu"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
          "fixed inset-y-0 left-0 z-40 w-72 bg-[var(--bg-card)] border-r border-[var(--border-subtle)] transform transition-transform duration-300 lg:hidden overflow-y-auto p-4 pt-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-card)]/50 flex-shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto p-4">
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-6 py-8 pt-16 lg:pt-8">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 1 && (
            <nav className="flex items-center gap-1 text-sm text-[var(--text-muted)] mb-6">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3 h-3" />}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-[var(--text-secondary)]">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-[var(--text-primary)] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* BreadcrumbList Schema for SEO */}
          {breadcrumbs.length > 1 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://omnigaze.com" },
                    ...breadcrumbs.map((crumb, i) => ({
                      "@type": "ListItem",
                      position: i + 2,
                      name: crumb.label,
                      item: `https://omnigaze.com${crumb.href}`,
                    })),
                  ],
                }),
              }}
            />
          )}

          {/* Share Buttons */}
          <div className="flex justify-end mb-6">
            <ShareButtons
              url={`https://omnigaze.com${pathname}`}
              title={`OmniGaze Docs - ${breadcrumbs[breadcrumbs.length - 1]?.label || "Documentation"}`}
              description="OmniGaze documentation - infrastructure discovery, application mapping, and enterprise architecture."
            />
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
