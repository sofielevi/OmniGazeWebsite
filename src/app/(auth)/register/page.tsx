"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard, AuthError } from "@/components/auth/auth-card";
import { Input, Checkbox } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register, checkEmail, ApiError } from "@/lib/api-client";
import { Mail, ArrowRight, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    // Client-side validation
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms and privacy policy");
      return;
    }

    setIsLoading(true);

    try {
      // Check if API is configured
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (apiUrl) {
        // Use real API
        const { exists } = await checkEmail(email);
        if (exists) {
          setEmailError("This email is already registered. Try logging in instead.");
          setIsLoading(false);
          return;
        }
        await register(email);
      }

      // Store email for verify page and redirect
      sessionStorage.setItem("registerEmail", email);
      router.push("/verify");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "EMAIL_EXISTS") {
          setEmailError("This email is already registered. Try logging in instead.");
        } else if (err.code === "RATE_LIMITED") {
          setError("Too many attempts. Please try again in a few minutes.");
        } else {
          setError(err.message);
        }
      } else {
        // If API not configured, just proceed
        sessionStorage.setItem("registerEmail", email);
        router.push("/verify");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      description="Start with 50 free servers. No credit card required."
      step={{ current: 1, total: 2 }}
    >
      <AuthError message={error} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          name="email"
          label="Work email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          error={emailError}
          disabled={isLoading}
          autoFocus
          autoComplete="email"
        />

        <Checkbox
          name="terms"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          label={
            <>
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-[var(--amber-400)] hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[var(--amber-400)] hover:underline"
              >
                Privacy Policy
              </Link>
            </>
          }
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading || !email || !acceptedTerms}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending verification...
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              Continue with Email
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--amber-400)] hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Features reminder */}
      <div className="mt-6 p-4 bg-[var(--bg-elevated)] rounded-lg">
        <p className="text-xs text-[var(--text-muted)] text-center">
          Free Community tier includes: Auto-discovery, 50 servers, 2D visualization, and more
        </p>
      </div>
    </AuthCard>
  );
}
