"use client";

import { siteConfig } from "@/config/site";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  className?: string;
  size?: "md" | "lg";
  children?: React.ReactNode;
}

/**
 * Download button that adds a fresh timestamp to bust browser cache.
 * This ensures users always download the latest installer, even if
 * they have a cached version from a previous download.
 */
export function DownloadButton({ className, size = "lg", children }: DownloadButtonProps) {
  const handleDownload = () => {
    // Add timestamp to URL to bypass any browser/proxy caching
    const timestamp = Date.now();
    const downloadUrl = `${siteConfig.download.url}?v=${siteConfig.download.buildNumber}&t=${timestamp}`;
    window.location.href = downloadUrl;
  };

  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={handleDownload}
      className={cn(
        `inline-flex items-center justify-center gap-2
        font-mono font-medium rounded-lg
        transition-all duration-300 cursor-pointer
        bg-gradient-to-br from-[var(--amber-400)] to-[var(--amber-500)]
        text-[var(--bg-deep)] glow-amber
        hover:translate-y-[-2px]
        hover:shadow-[0_8px_30px_var(--amber-glow)]
        active:translate-y-0`,
        sizes[size],
        className
      )}
    >
      {children || (
        <>
          <Download className="w-5 h-5" />
          Download Installer
        </>
      )}
    </button>
  );
}
