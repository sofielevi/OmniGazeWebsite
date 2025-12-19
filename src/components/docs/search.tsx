"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Lock, ArrowRight, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { canAccessTier, getTierBadgeText, Tier } from "@/lib/docs-access";

interface SearchItem {
  label: string;
  href: string;
  section: string;
  tier: Tier;
  keywords?: string[];
}

// Search index - derived from navSections
const searchIndex: SearchItem[] = [
  // Getting Started
  { label: "Overview", href: "/docs", section: "Getting Started", tier: "community", keywords: ["home", "start", "introduction", "docs"] },
  { label: "Installation", href: "/docs/getting-started/installation", section: "Getting Started", tier: "community", keywords: ["install", "setup", "download", "requirements"] },
  { label: "Activation", href: "/docs/getting-started/activation", section: "Getting Started", tier: "community", keywords: ["activate", "license", "register", "key"] },
  { label: "First Scan", href: "/docs/getting-started/first-scan", section: "Getting Started", tier: "community", keywords: ["scan", "discover", "first", "quick start"] },

  // Infrastructure
  { label: "Asset Discovery", href: "/docs/infrastructure/discovery", section: "Infrastructure", tier: "community", keywords: ["assets", "discover", "find", "network"] },
  { label: "Network Scanning", href: "/docs/infrastructure/scanning", section: "Infrastructure", tier: "community", keywords: ["scan", "network", "ip", "range", "subnet"] },
  { label: "Server Details", href: "/docs/infrastructure/servers", section: "Infrastructure", tier: "community", keywords: ["server", "details", "info", "hardware", "software"] },
  { label: "3D Visualization", href: "/docs/infrastructure/3d-view", section: "Infrastructure", tier: "community", keywords: ["3d", "visualize", "diagram", "graph", "view"] },
  { label: "SQL Server", href: "/docs/infrastructure/sql", section: "Infrastructure", tier: "community", keywords: ["sql", "database", "db", "mssql"] },
  { label: "Clusters", href: "/docs/infrastructure/clusters", section: "Infrastructure", tier: "community", keywords: ["cluster", "failover", "ha", "high availability"] },

  // Security
  { label: "Security Overview", href: "/docs/security", section: "Security & Credentials", tier: "community", keywords: ["security", "credentials", "auth", "permissions"] },
  { label: "Route to Least Privilege", href: "/docs/security/credential-journey", section: "Security & Credentials", tier: "community", keywords: ["privilege", "security", "journey", "wmi", "winrm"] },
  { label: "WinRM Setup", href: "/docs/security/winrm-setup", section: "Security & Credentials", tier: "community", keywords: ["winrm", "setup", "configure", "powershell", "remote"] },
  { label: "Troubleshooting", href: "/docs/security/troubleshooting", section: "Security & Credentials", tier: "community", keywords: ["troubleshoot", "error", "fix", "problem", "issue"] },

  // Applications
  { label: "App Discovery", href: "/docs/applications/discovery", section: "Applications", tier: "starter", keywords: ["app", "application", "process", "discover"] },
  { label: "App Mapping", href: "/docs/applications/mapping", section: "Applications", tier: "starter", keywords: ["app", "mapping", "factsheet", "link"] },

  // Capabilities
  { label: "Business Capabilities", href: "/docs/capabilities/overview", section: "Capabilities", tier: "professional", keywords: ["capability", "business", "hierarchy"] },
  { label: "Capability Mapping", href: "/docs/capabilities/mapping", section: "Capabilities", tier: "professional", keywords: ["capability", "mapping", "link"] },

  // Advanced
  { label: "Architecture Mapping", href: "/docs/advanced/architecture", section: "Advanced", tier: "professional", keywords: ["architecture", "factsheet", "ea", "enterprise"] },
  { label: "Value Streams", href: "/docs/advanced/value-streams", section: "Advanced", tier: "business", keywords: ["value", "stream", "flow"] },

  // API
  { label: "REST API", href: "/docs/api/rest", section: "API Reference", tier: "professional", keywords: ["api", "rest", "endpoint", "http"] },
  { label: "OData Endpoints", href: "/docs/api/odata", section: "API Reference", tier: "professional", keywords: ["odata", "api", "query", "filter"] },
];

interface DocsSearchProps {
  userTier: Tier;
}

export function DocsSearch({ userTier }: DocsSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter results based on query
  const results = query.trim()
    ? searchIndex.filter((item) => {
        const searchStr = query.toLowerCase();
        const matchesLabel = item.label.toLowerCase().includes(searchStr);
        const matchesSection = item.section.toLowerCase().includes(searchStr);
        const matchesKeywords = item.keywords?.some((kw) =>
          kw.toLowerCase().includes(searchStr)
        );
        return matchesLabel || matchesSection || matchesKeywords;
      })
    : [];

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation in results
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        const item = results[selectedIndex];
        const hasAccess = canAccessTier(userTier, item.tier);
        if (hasAccess) {
          router.push(item.href);
          setIsOpen(false);
        }
      }
    },
    [results, selectedIndex, userTier, router]
  );

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--text-muted)] transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded">
          <Command className="w-3 h-3" />
          <span>K</span>
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50">
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
                <Search className="w-5 h-5 text-[var(--text-muted)]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[var(--bg-elevated)] rounded transition-colors"
                >
                  <X className="w-4 h-4 text-[var(--text-muted)]" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {query.trim() === "" ? (
                  <div className="px-4 py-8 text-center text-[var(--text-muted)]">
                    <p>Type to search documentation</p>
                    <p className="text-xs mt-1">
                      Use <kbd className="px-1 py-0.5 bg-[var(--bg-elevated)] rounded">↑</kbd>{" "}
                      <kbd className="px-1 py-0.5 bg-[var(--bg-elevated)] rounded">↓</kbd> to navigate,{" "}
                      <kbd className="px-1 py-0.5 bg-[var(--bg-elevated)] rounded">Enter</kbd> to select
                    </p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-[var(--text-muted)]">
                    <p>No results found for &quot;{query}&quot;</p>
                    <p className="text-xs mt-1">Try different keywords</p>
                  </div>
                ) : (
                  <ul className="py-2">
                    {results.map((item, index) => {
                      const hasAccess = canAccessTier(userTier, item.tier);
                      const badgeText = getTierBadgeText(item.tier);
                      const isSelected = index === selectedIndex;

                      return (
                        <li key={item.href}>
                          <button
                            onClick={() => {
                              if (hasAccess) {
                                router.push(item.href);
                                setIsOpen(false);
                              }
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                            disabled={!hasAccess}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                              isSelected
                                ? "bg-[var(--amber-400)]/10"
                                : "hover:bg-[var(--bg-elevated)]",
                              !hasAccess && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            {!hasAccess && (
                              <Lock className="w-4 h-4 text-[var(--text-muted)]" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "font-medium truncate",
                                    isSelected && hasAccess && "text-[var(--amber-400)]"
                                  )}
                                >
                                  {item.label}
                                </span>
                                {badgeText && !hasAccess && (
                                  <span className="text-xs px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded">
                                    {badgeText}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-[var(--text-muted)]">
                                {item.section}
                              </span>
                            </div>
                            {hasAccess && isSelected && (
                              <ArrowRight className="w-4 h-4 text-[var(--amber-400)]" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{results.length} results</span>
                  <span>Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
