"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { getCurrentUser, UserInfo } from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import "../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch {
        // Not authenticated, redirect to login
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--amber-400)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
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
