"use client";

import { useState } from "react";
import { Linkedin, Mail, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export function ShareButtons({
  url,
  title,
  description,
  className = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, "_blank", "width=600,height=600");
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(
      `${description || title}\n\nRead more: ${url}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs text-[var(--text-muted)] mr-1">Share:</span>
      <button
        onClick={shareOnLinkedIn}
        className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--amber-400)] transition-colors duration-200"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </button>
      <button
        onClick={shareViaEmail}
        className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--amber-400)] transition-colors duration-200"
        aria-label="Share via email"
        title="Share via email"
      >
        <Mail size={16} />
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--amber-400)] transition-colors duration-200"
        aria-label={copied ? "Link copied!" : "Copy link"}
        title={copied ? "Link copied!" : "Copy link"}
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Link2 size={16} />}
      </button>
    </div>
  );
}
