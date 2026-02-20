import Link from "@/components/ui/link";
import { siteConfig } from "@/config/site";
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--border-subtle)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {siteConfig.footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-sm no-underline transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/omnigaze/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--omnigaze-gold)] transition-colors duration-200"
              aria-label="Follow OmniGaze on LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[var(--text-muted)] text-xs">
            {siteConfig.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
