"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandBlockProps {
  children: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CommandBlock({
  children,
  language = "bash",
  title,
  className,
}: CommandBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--border-subtle)] overflow-hidden my-4",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)]">
        <span className="text-xs text-[var(--text-muted)] font-mono">
          {title || language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 bg-[var(--bg-deep)] overflow-x-auto">
        <code className="text-sm font-mono text-[var(--text-primary)]">
          {children.trim()}
        </code>
      </pre>
    </div>
  );
}
