"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-elevated)] border border-b-0 border-[var(--border-subtle)] rounded-t-lg">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-xs text-[var(--text-muted)] font-mono">
              {filename}
            </span>
          )}
          {language && !filename && (
            <span className="text-xs text-[var(--text-muted)] uppercase">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded hover:bg-[var(--bg-card)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          title="Copy code"
          data-testid="copy-code-button"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[var(--success)]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="p-4 bg-[var(--bg-deep)] border border-[var(--border-subtle)] rounded-b-lg overflow-x-auto">
        <code className="text-sm font-mono text-[var(--text-primary)]">
          {code}
        </code>
      </pre>
    </div>
  );
}
