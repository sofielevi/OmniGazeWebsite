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
 * Download button with cache-busting timestamp.
 * Combined with .htaccess no-cache headers on the server,
 * this ensures users always download the latest installer.
 */
export function DownloadButton({ className, size = "lg", children }: DownloadButtonProps) {
  const handleDownload = () => {
    // Add timestamp to force browser to request fresh file
    // Server-side .htaccess should also set no-cache headers
    const timestamp = Date.now();
    window.location.href = `${siteConfig.download.url}?t=${timestamp}`;
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
