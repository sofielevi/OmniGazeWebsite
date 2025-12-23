"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { getCurrentUser, UserInfo, ApiError } from "@/lib/api-client";
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const checkAuth = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const userData = await getCurrentUser();
      if (mountedRef.current) {
        setUser(userData);
        setIsLoading(false);
      }
    } catch (err) {
      if (!mountedRef.current) return;

      // Auth error - redirect to login
      if (err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 403)) {
        setIsRedirecting(true);
        router.push("/login");
        return;
      }

      // Other error (timeout, network, server) - show retry option
      setError(err instanceof Error ? err.message : "Failed to load. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    checkAuth();

    return () => {
      mountedRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--amber-400)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">
            {isRedirecting ? "Redirecting to login..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <AlertTriangle className="w-12 h-12 text-[var(--amber-400)] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            Connection Issue
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            {error}
          </p>
          <button
            onClick={checkAuth}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--amber-400)] text-[var(--bg-deep)] rounded-lg font-medium hover:bg-[var(--amber-500)] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--amber-400)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Extract tier name as string for display
  const tierName = user.tier?.displayName || user.tier?.name || "Community";

  return (
    <div className="min-h-screen bg-[var(--bg-deep)]">
      <Sidebar userTier={tierName} userEmail={user.email} />
      <main className="lg:pl-72">
        <div className="p-6 lg:p-8 pt-20 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
