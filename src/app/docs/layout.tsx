import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import Link from "next/link";
import {
  BookOpen,
  Download,
  Key,
  Scan,
  Settings,
  Network,
  FileText,
  HelpCircle,
  Layers,
} from "lucide-react";

export const metadata = {
  title: {
    template: "%s | OmniGaze Docs",
    default: "Documentation",
  },
  description: "OmniGaze documentation, guides, and API reference.",
};

const navSections = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Overview", icon: BookOpen },
      { href: "/docs/installation", label: "Installation", icon: Download },
      { href: "/docs/activation", label: "Activation", icon: Key },
    ],
  },
  {
    title: "Core Features",
    items: [
      { href: "/docs/scanning", label: "Scanning", icon: Scan },
      { href: "/docs/credentials", label: "Credentials", icon: Settings },
      { href: "/docs/visualization", label: "Visualization", icon: Network },
    ],
  },
  {
    title: "Advanced",
    items: [
      { href: "/docs/architecture", label: "Architecture Mapping", icon: Layers },
      { href: "/docs/api", label: "API Reference", icon: FileText },
    ],
  },
  {
    title: "Resources",
    items: [
      { href: "/docs/changelog", label: "Changelog", icon: FileText },
      { href: "/docs/faq", label: "FAQ", icon: HelpCircle },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="lg:sticky lg:top-24 space-y-8">
                {navSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm">{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              <article className="prose prose-invert max-w-none">
                {children}
              </article>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
