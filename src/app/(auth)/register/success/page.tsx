"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { ButtonLink } from "@/components/ui/button";
import { VerifyResponse } from "@/lib/api-client";
import { CheckCircle2, Download, BookOpen, LayoutDashboard } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const [result, setResult] = useState<VerifyResponse | null>(null);

  useEffect(() => {
    // Get verification result from session storage
    const storedResult = sessionStorage.getItem("verifyResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
      sessionStorage.removeItem("verifyResult");
    } else {
      // No result stored, redirect to register
      router.push("/register");
    }
  }, [router]);

  if (!result) {
    return null; // Will redirect in useEffect
  }

  const tierName = result.tier?.displayName || result.tier?.name || "Community";

  return (
    <AuthCard title="Welcome to OmniGaze!">
      <div className="space-y-8">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[var(--success)]/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[var(--success)]" />
          </div>
        </div>

        {/* Confirmation message */}
        <div className="text-center">
          <p className="text-[var(--text-secondary)]">
            Your account has been created successfully.
          </p>
          <p className="text-[var(--text-secondary)] mt-1">
            Email: <span className="text-[var(--text-primary)]">{result.email}</span>
          </p>
        </div>

        {/* Tier badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--pyramid-infrastructure)]/20 border border-[var(--pyramid-infrastructure)]/30 rounded-full">
            <span className="text-sm font-medium text-[var(--pyramid-infrastructure)]">
              {tierName} Tier
            </span>
          </div>
        </div>

        {/* Info about license key */}
        <div className="bg-[var(--bg-elevated)] rounded-lg p-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Your license key has been sent to your email. You can also find it in your{" "}
            <a href="/dashboard/licenses" className="text-[var(--amber-400)] hover:underline">
              dashboard
            </a>.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <ButtonLink
            href="/download"
            variant="primary"
            size="lg"
            className="w-full"
          >
            <Download className="w-5 h-5" />
            Download OmniGaze
          </ButtonLink>

          <div className="grid grid-cols-2 gap-3">
            <ButtonLink
              href="/docs"
              variant="secondary"
            >
              <BookOpen className="w-4 h-4" />
              Quick Start
            </ButtonLink>
            <ButtonLink
              href="/dashboard"
              variant="secondary"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </ButtonLink>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-[var(--bg-elevated)] rounded-lg p-4">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
            Next Steps
          </h3>
          <ol className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[var(--amber-400)]/20 text-[var(--amber-400)] text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              Download and install OmniGaze
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[var(--amber-400)]/20 text-[var(--amber-400)] text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              Enter your license key when prompted
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[var(--amber-400)]/20 text-[var(--amber-400)] text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              Run your first infrastructure scan
            </li>
          </ol>
        </div>
      </div>
    </AuthCard>
  );
}
