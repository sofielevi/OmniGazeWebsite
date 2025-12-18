import { FileText, Sparkles, Bug, Wrench } from "lucide-react";

export const metadata = {
  title: "Changelog",
  description: "OmniGaze release notes and version history.",
};

export default function ChangelogPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl font-medium mb-4">Changelog</h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Release notes and version history for OmniGaze.
        </p>
      </div>

      {/* Latest Release */}
      <ReleaseCard
        version="2.5.0"
        date="December 2024"
        isLatest
        features={[
          "New 3D visualization engine with improved performance",
          "Azure cloud resource discovery (Business+ tiers)",
          "Scheduled scan improvements with email notifications",
          "SSH key authentication support for Linux targets",
        ]}
        improvements={[
          "50% faster network scanning for large ranges",
          "Improved WMI connection reliability",
          "Better handling of disconnected/offline servers",
          "Updated user interface with dark mode refinements",
        ]}
        fixes={[
          "Fixed memory leak during extended scans",
          "Resolved issue with special characters in hostnames",
          "Fixed CSV export encoding for non-ASCII characters",
          "Corrected timezone handling in scan timestamps",
        ]}
      />

      <ReleaseCard
        version="2.4.2"
        date="November 2024"
        improvements={[
          "Performance optimizations for diagrams with 500+ nodes",
          "Improved error messages for credential failures",
        ]}
        fixes={[
          "Fixed crash when scanning servers with very long hostnames",
          "Resolved issue with license validation on air-gapped networks",
          "Fixed duplicate entries in process scan results",
        ]}
      />

      <ReleaseCard
        version="2.4.1"
        date="October 2024"
        fixes={[
          "Hotfix for database migration issue affecting upgrades from v2.3.x",
          "Fixed Windows Server 2012 R2 compatibility issue",
        ]}
      />

      <ReleaseCard
        version="2.4.0"
        date="October 2024"
        features={[
          "Process diagram view showing inter-process communication",
          "SSL certificate tracking and expiration alerts",
          "Custom tagging system for servers and applications",
          "OData API now available for Professional tier",
        ]}
        improvements={[
          "Redesigned settings interface",
          "Better auto-layout algorithms for 2D diagrams",
          "Improved handling of VMware virtual machines",
        ]}
        fixes={[
          "Fixed issue with SSH connections on non-standard ports",
          "Resolved memory usage spike during large exports",
        ]}
      />

      <ReleaseCard
        version="2.3.0"
        date="August 2024"
        features={[
          "Linux server discovery via SSH",
          "Application dependency mapping",
          "Export to Excel with multiple worksheets",
          "Saved views and bookmarks",
        ]}
        improvements={[
          "Faster startup time",
          "Reduced memory footprint",
          "Better support for Windows Server Core",
        ]}
        fixes={[
          "Fixed various UI rendering issues",
          "Resolved credential storage encryption issue",
        ]}
      />

      <ReleaseCard
        version="2.2.0"
        date="June 2024"
        features={[
          "3D visualization mode",
          "Server grouping by subnet",
          "Bulk credential testing",
        ]}
        improvements={[
          "Improved scan progress reporting",
          "Better handling of firewalled hosts",
        ]}
        fixes={[
          "Fixed diagram export at high resolutions",
          "Resolved issue with domain credential parsing",
        ]}
      />

      <ReleaseCard
        version="2.1.0"
        date="April 2024"
        features={[
          "Concurrent scanning for faster discovery",
          "Service detection and mapping",
          "Network connection visualization",
        ]}
      />

      <ReleaseCard
        version="2.0.0"
        date="February 2024"
        features={[
          "Complete rewrite with new architecture",
          "Modern user interface",
          "Improved scanning engine",
          "New licensing system",
        ]}
      />

      {/* Older versions notice */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 text-center">
        <p className="text-[var(--text-muted)]">
          For release notes prior to version 2.0, please contact support.
        </p>
      </div>
    </div>
  );
}

function ReleaseCard({
  version,
  date,
  isLatest,
  features,
  improvements,
  fixes,
}: {
  version: string;
  date: string;
  isLatest?: boolean;
  features?: string[];
  improvements?: string[];
  fixes?: string[];
}) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-display text-2xl">v{version}</h2>
        {isLatest && (
          <span className="px-2 py-0.5 bg-[var(--success)]/20 text-[var(--success)] text-xs font-medium rounded">
            Latest
          </span>
        )}
        <span className="text-[var(--text-muted)] ml-auto">{date}</span>
      </div>

      <div className="space-y-4">
        {features && features.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-[var(--amber-400)] mb-2">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-medium text-sm">New Features</h3>
            </div>
            <ul className="space-y-1">
              {features.map((item, i) => (
                <li key={i} className="text-sm text-[var(--text-secondary)] pl-6">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {improvements && improvements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Wrench className="w-4 h-4" />
              <h3 className="font-medium text-sm">Improvements</h3>
            </div>
            <ul className="space-y-1">
              {improvements.map((item, i) => (
                <li key={i} className="text-sm text-[var(--text-secondary)] pl-6">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {fixes && fixes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <Bug className="w-4 h-4" />
              <h3 className="font-medium text-sm">Bug Fixes</h3>
            </div>
            <ul className="space-y-1">
              {fixes.map((item, i) => (
                <li key={i} className="text-sm text-[var(--text-secondary)] pl-6">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
