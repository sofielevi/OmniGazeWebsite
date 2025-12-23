"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard, AuthError } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, ApiError } from "@/lib/api-client";
import { Key, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [licenseKey, setLicenseKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [keyError, setKeyError] = useState("");

  const formatLicenseKey = (value: string) => {
    // Remove non-alphanumeric characters and convert to uppercase
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    // Format as XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX (6 groups of 8)
    const parts = [];
    for (let i = 0; i < cleaned.length && i < 48; i += 8) {
      parts.push(cleaned.slice(i, i + 8));
    }
    return parts.join("-");
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatLicenseKey(e.target.value);
    setLicenseKey(formatted);
    setKeyError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setKeyError("");

    // Client-side validation
    const cleanKey = licenseKey.replace(/-/g, "");
    if (!cleanKey) {
      setKeyError("License key is required");
      return;
    }

    if (cleanKey.length !== 48) {
      setKeyError("Please enter a valid license key");
      return;
    }

    setIsLoading(true);

    try {
      await login(licenseKey);

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "INVALID_LICENSE" || err.statusCode === 401) {
          setKeyError("Invalid license key. Please check and try again.");
        } else if (err.code === "LICENSE_EXPIRED") {
          setError("This license has expired. Please renew your subscription.");
        } else if (err.code === "RATE_LIMITED") {
          setError("Too many attempts. Please try again in a few minutes.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      description="Enter your license key to access your account."
    >
      <AuthError message={error} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          name="licenseKey"
          label="License Key"
          placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
          value={licenseKey}
          onChange={handleKeyChange}
          error={keyError}
          disabled={isLoading}
          autoFocus
          autoComplete="off"
          className="font-mono tracking-wide text-sm"
          hint="Find your license key in the OmniGaze app or your welcome email"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <Key className="w-5 h-5" />
              Sign In
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] space-y-4">
        <div className="text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--amber-400)] hover:underline font-medium"
            >
              Register for free
            </Link>
          </p>
        </div>

      </div>

      {/* Info box */}
      <div className="mt-6 p-4 bg-[var(--bg-elevated)] rounded-lg">
        <p className="text-xs text-[var(--text-muted)] text-center">
          Your license key was emailed to you when you registered, and is also displayed in the OmniGaze desktop application.
        </p>
      </div>
    </AuthCard>
  );
}
