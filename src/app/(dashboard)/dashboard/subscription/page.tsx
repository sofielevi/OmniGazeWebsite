"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect old /dashboard/subscription to /dashboard
export default function SubscriptionRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return null;
}
