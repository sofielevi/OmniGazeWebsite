import { Download, FileCode, FileText, FileArchive } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadCardProps {
  name: string;
  description: string;
  href: string;
  size?: string;
  version?: string;
  type?: "script" | "document" | "archive";
  className?: string;
}

const typeIcons = {
  script: FileCode,
  document: FileText,
  archive: FileArchive,
};

export function DownloadCard({
  name,
  description,
  href,
  size,
  version,
  type = "script",
  className,
}: DownloadCardProps) {
  const Icon = typeIcons[type];

  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 my-4",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-[var(--amber-400)]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-medium text-[var(--text-primary)] mb-1">
            {name}
          </h4>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            {description}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={href}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--amber-400)] text-[var(--bg-deep)] font-medium text-sm hover:bg-[var(--amber-500)] transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
            {(version || size) && (
              <span className="text-xs text-[var(--text-muted)]">
                {version && `v${version}`}
                {version && size && " · "}
                {size}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
