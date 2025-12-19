"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/support");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-[var(--text-secondary)]">Redirecting...</p>
    </div>
  );
}
