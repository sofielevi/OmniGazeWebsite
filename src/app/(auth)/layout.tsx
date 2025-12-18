import Link from "next/link";
import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Header */}
      <header className="py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-500)] flex items-center justify-center font-display font-bold text-[var(--bg-deep)] text-lg">
              OG
            </div>
            <span className="font-display text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--amber-400)] transition-colors">
              OmniGaze
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 px-6 text-center">
        <p className="text-sm text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()} OmniGaze. All rights reserved.
        </p>
      </footer>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{
            background: "radial-gradient(circle, var(--amber-500) 0%, transparent 70%)",
            top: "-200px",
            right: "-200px",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[150px] opacity-15"
          style={{
            background: "radial-gradient(circle, var(--pyramid-infrastructure) 0%, transparent 70%)",
            bottom: "-100px",
            left: "-100px",
          }}
        />
      </div>
    </div>
  );
}
