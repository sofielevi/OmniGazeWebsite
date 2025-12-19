"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard, AuthError } from "@/components/auth/auth-card";
import { Input, Checkbox } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register, checkEmail, ApiError } from "@/lib/api-client";
import { Mail, ArrowRight, Loader2, Building2 } from "lucide-react";

// Personal/free email domains that are not allowed
const BLOCKED_EMAIL_DOMAINS = new Set([
  // Major free email providers
  "gmail.com", "googlemail.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.fr", "yahoo.de", "yahoo.es", "yahoo.it", "yahoo.ca", "yahoo.com.au",
  "outlook.com", "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.es", "hotmail.it",
  "live.com", "live.co.uk", "live.fr", "live.de", "live.nl",
  "msn.com",
  "aol.com", "aol.co.uk",
  "icloud.com", "me.com", "mac.com",
  "protonmail.com", "protonmail.ch", "proton.me", "pm.me",
  "zoho.com", "zohomail.com",
  "mail.com", "email.com",
  "gmx.com", "gmx.net", "gmx.de", "gmx.at", "gmx.ch",
  "yandex.com", "yandex.ru",
  "mail.ru", "inbox.ru", "list.ru", "bk.ru",
  "fastmail.com", "fastmail.fm",
  "tutanota.com", "tutanota.de", "tutamail.com", "tuta.io",
  "hushmail.com",
  "mailfence.com",
  "qq.com", "163.com", "126.com", "sina.com",
  "naver.com", "daum.net", "hanmail.net",
  "web.de", "t-online.de", "freenet.de",
  "orange.fr", "free.fr", "sfr.fr", "laposte.net",
  "libero.it", "virgilio.it", "tin.it",
  "wp.pl", "onet.pl", "interia.pl",
  "rediffmail.com", "inbox.com",
  "att.net", "sbcglobal.net", "bellsouth.net",
  "comcast.net", "verizon.net", "cox.net", "charter.net",
  // Temporary/disposable email domains
  "tempmail.com", "temp-mail.org", "guerrillamail.com", "mailinator.com",
  "10minutemail.com", "throwaway.email", "fakeinbox.com", "sharklasers.com",
]);

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companyError, setCompanyError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isBusinessEmail = (email: string): { valid: boolean; message?: string } => {
    if (!email) return { valid: false, message: "Email is required" };

    const atIndex = email.lastIndexOf("@");
    if (atIndex <= 0 || atIndex >= email.length - 1) {
      return { valid: false, message: "Invalid email address" };
    }

    const domain = email.substring(atIndex + 1).toLowerCase();

    if (BLOCKED_EMAIL_DOMAINS.has(domain)) {
      return {
        valid: false,
        message: "Please use your company email address. Personal email providers are not accepted for business accounts.",
      };
    }

    return { valid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setCompanyError("");

    // Client-side validation
    if (!companyName.trim()) {
      setCompanyError("Company name is required");
      return;
    }

    if (companyName.trim().length < 2) {
      setCompanyError("Company name must be at least 2 characters");
      return;
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Check if business email
    const businessCheck = isBusinessEmail(email);
    if (!businessCheck.valid) {
      setEmailError(businessCheck.message || "Invalid email domain");
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
        await register(email, companyName.trim());
      }

      // Store email and company name for verify page and redirect
      sessionStorage.setItem("registerEmail", email);
      sessionStorage.setItem("registerCompanyName", companyName.trim());
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
        sessionStorage.setItem("registerCompanyName", companyName.trim());
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
          type="text"
          name="companyName"
          label="Company name"
          placeholder="Acme Corporation"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            setCompanyError("");
          }}
          error={companyError}
          disabled={isLoading}
          autoFocus
          autoComplete="organization"
        />

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
          disabled={isLoading || !email || !companyName.trim() || !acceptedTerms}
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

      {/* Company email notice */}
      <div className="mt-6 p-4 bg-[var(--bg-elevated)] rounded-lg">
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-[var(--amber-400)] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
              Company Email Required
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              OmniGaze is designed for businesses. Please register with your company email address.
              Personal email providers (Gmail, Yahoo, Outlook, etc.) are not accepted.
            </p>
          </div>
        </div>
      </div>

      {/* Features reminder */}
      <div className="mt-4 p-3 border border-[var(--border-subtle)] rounded-lg">
        <p className="text-xs text-[var(--text-muted)] text-center">
          Free Community tier includes: Auto-discovery, 50 servers, 2D visualization, and more
        </p>
      </div>
    </AuthCard>
  );
}
