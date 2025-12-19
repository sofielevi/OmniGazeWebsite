"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard, AuthError, AuthSuccess } from "@/components/auth/auth-card";
import { CodeInput } from "@/components/auth/code-input";
import { Button } from "@/components/ui/button";
import { verify, resendCode, ApiError } from "@/lib/api-client";
import { Loader2, Mail, ArrowLeft, RefreshCw } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Skip redirect check if already verified (prevents race condition)
    if (isVerified) return;

    // Get email and company name from session storage
    const storedEmail = sessionStorage.getItem("registerEmail");
    const storedCompanyName = sessionStorage.getItem("registerCompanyName");
    if (storedEmail && storedCompanyName) {
      setEmail(storedEmail);
      setCompanyName(storedCompanyName);
    } else {
      // Missing data, redirect to register
      router.push("/register");
    }
  }, [router, isVerified]);

  useEffect(() => {
    // Cooldown timer
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    // Auto-submit when code is complete
    if (code.length === 6) {
      handleVerify();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleVerify = async () => {
    if (code.length !== 6) return;

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      let result;

      if (apiUrl) {
        // Use real API - pass email, code, and company name
        result = await verify(email, code, companyName);
      } else {
        // Demo mode - accept any 6-char code
        result = {
          success: true,
          customerId: 123456,
          licenseKey: "DEMO0-DEMO0-DEMO0-DEMO0",
          tier: "community",
          email: email,
        };
      }

      // Mark as verified FIRST to prevent redirect race condition
      setIsVerified(true);

      // Store result for success page and clean up session storage
      sessionStorage.setItem("verifyResult", JSON.stringify(result));
      sessionStorage.removeItem("registerEmail");
      sessionStorage.removeItem("registerCompanyName");

      // Redirect to success page
      router.push("/register/success");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "INVALID_CODE") {
          setError("Invalid verification code. Please check and try again.");
        } else if (err.code === "CODE_EXPIRED") {
          setError("This code has expired. Please request a new one.");
        } else if (err.code === "MAX_ATTEMPTS") {
          setError("Too many failed attempts. Please request a new code.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
      setCode("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setError("");
    setSuccess("");
    setIsResending(true);

    try {
      await resendCode(email);
      setSuccess("A new verification code has been sent to your email.");
      setResendCooldown(60); // 60 second cooldown
      setCode("");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "RATE_LIMITED") {
          setError("Too many requests. Please wait a few minutes.");
          setResendCooldown(300); // 5 minute cooldown
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to resend code. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  if ((!email || !companyName) && !isVerified) {
    return null; // Will redirect in useEffect
  }

  // Show loading state while redirecting after verification
  if (isVerified) {
    return (
      <AuthCard
        title="Verification successful!"
        description="Redirecting to your account..."
        step={{ current: 2, total: 2 }}
      >
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--amber-400)]" />
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Check your email"
      description={`We sent a 6-character code to ${email}`}
      step={{ current: 2, total: 2 }}
    >
      <AuthError message={error} />
      <AuthSuccess message={success} />

      <div className="space-y-8">
        {/* Email icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[var(--amber-400)]/10 flex items-center justify-center">
            <Mail className="w-8 h-8 text-[var(--amber-400)]" />
          </div>
        </div>

        {/* Code input */}
        <CodeInput
          value={code}
          onChange={setCode}
          disabled={isLoading}
          autoFocus
        />

        {/* Verify button */}
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading || code.length !== 6}
          onClick={handleVerify}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </Button>

        {/* Resend code */}
        <div className="text-center">
          <p className="text-sm text-[var(--text-secondary)] mb-2">
            Didn&apos;t receive the code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending || resendCooldown > 0}
            className="inline-flex items-center gap-2 text-sm text-[var(--amber-400)] hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
          >
            {isResending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : resendCooldown > 0 ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Resend in {resendCooldown}s
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Resend code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Back to register */}
      <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Use a different email
        </Link>
      </div>
    </AuthCard>
  );
}
