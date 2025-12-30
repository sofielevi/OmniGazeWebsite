"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ConsentStatus = "pending" | "accepted" | "declined";

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted" || stored === "declined") {
      setStatus(stored);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setStatus("accepted");
    // Reload to activate GA
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setStatus("declined");
  };

  // Don't render on server or if already decided
  if (!mounted || status !== "pending") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-bg-card border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-secondary text-center sm:text-left">
          We use cookies to analyze site traffic and improve your experience.{" "}
          <Link href="/privacy" className="text-amber-400 hover:text-amber-300 underline">
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-amber-500 hover:bg-amber-400 text-black font-medium rounded transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
