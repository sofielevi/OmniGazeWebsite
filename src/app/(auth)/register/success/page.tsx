"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { VerifyResponse } from "@/lib/api-client";
import { CheckCircle2, Copy, Check, Download, BookOpen, LayoutDashboard } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopyLicenseKey = async () => {
    if (!result?.licenseKey) return;

    try {
      await navigator.clipboard.writeText(result.licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = result.licenseKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!result) {
    return null; // Will redirect in useEffect
  }

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
              {result.tier} Tier
            </span>
          </div>
        </div>

        {/* License key */}
        <div className="bg-[var(--bg-elevated)] rounded-lg p-4">
          <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Your License Key
          </label>
          <div className="flex items-center gap-2">
            <code className="flex-1 font-mono text-lg text-[var(--amber-400)] bg-[var(--bg-deep)] px-3 py-2 rounded border border-[var(--border-subtle)]">
              {result.licenseKey}
            </code>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCopyLicenseKey}
              className="shrink-0"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[var(--success)]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Use this key to activate OmniGaze on your computer
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
