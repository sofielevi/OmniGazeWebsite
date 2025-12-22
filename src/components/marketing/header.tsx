"use client";

import Link from "@/components/ui/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-5 bg-gradient-to-b from-[var(--bg-deep)] to-transparent backdrop-blur-xl">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-600)] rounded-lg flex items-center justify-center font-semibold text-base text-[var(--bg-deep)] glow-amber">
              OG
            </div>
            <span className="font-display text-xl font-semibold text-[var(--text-primary)]">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm no-underline transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/register" variant="primary" size="md">
              Get Started Free
            </ButtonLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-64 mt-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-[var(--border-subtle)]">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm no-underline py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href="/register"
              variant="primary"
              size="md"
              className="mt-2"
            >
              Get Started Free
            </ButtonLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
