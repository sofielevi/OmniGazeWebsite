"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getLicenseKey, ApiError } from "@/lib/api-client";
import { Key, Copy, Check, Monitor, RefreshCw, AlertTriangle } from "lucide-react";

interface Activation {
  id: string;
  machineName: string;
  activatedAt: string;
  lastSeen: string;
  isActive: boolean;
}

export default function LicensesPage() {
  const [licenseKey, setLicenseKey] = useState<string>("");
  const [activations, setActivations] = useState<Activation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const { licenseKey: key } = await getLicenseKey();
        setLicenseKey(key);

        // Mock activations for now - would come from API
        setActivations([
          {
            id: "1",
            machineName: "WORKSTATION-01",
            activatedAt: "2024-12-01T10:00:00Z",
            lastSeen: "2024-12-18T09:30:00Z",
            isActive: true,
          },
        ]);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load license information");
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = licenseKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-[var(--bg-elevated)] rounded w-48" />
        <div className="h-48 bg-[var(--bg-elevated)] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
          Licenses
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Manage your license key and activations.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* License key card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-[var(--amber-400)]" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Your License Key
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Use this key to activate OmniGaze
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-xl text-[var(--amber-400)] bg-[var(--bg-deep)] px-4 py-3 rounded-lg border border-[var(--border-subtle)] tracking-wider">
            {licenseKey || "Loading..."}
          </code>
          <Button variant="secondary" onClick={handleCopy} disabled={!licenseKey}>
            {copied ? (
              <>
                <Check className="w-5 h-5 text-[var(--success)]" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-[var(--text-muted)] mt-3">
          Keep this key secure. It provides access to your OmniGaze account and data.
        </p>
      </div>

      {/* Activations */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Activations
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Machines where OmniGaze is activated
              </p>
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              {activations.length} / 3 activations used
            </div>
          </div>
        </div>

        {activations.length === 0 ? (
          <div className="p-8 text-center">
            <Monitor className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3" />
            <h3 className="font-medium text-[var(--text-primary)] mb-1">
              No activations yet
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Download and install OmniGaze to activate your license.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--bg-elevated)]">
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Machine
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Activated
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Last Seen
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Status
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {activations.map((activation) => (
                <tr
                  key={activation.id}
                  className="border-t border-[var(--border-subtle)]"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-[var(--text-muted)]" />
                      <span className="font-medium text-[var(--text-primary)]">
                        {activation.machineName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {new Date(activation.activatedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {new Date(activation.lastSeen).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        activation.isActive
                          ? "bg-[var(--success)]/10 text-[var(--success)]"
                          : "bg-[var(--text-muted)]/10 text-[var(--text-muted)]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          activation.isActive
                            ? "bg-[var(--success)]"
                            : "bg-[var(--text-muted)]"
                        }`}
                      />
                      {activation.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">
                      Deactivate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Regenerate key section */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-[var(--text-primary)] mb-1">
              Regenerate License Key
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Generate a new license key. This will deactivate all existing installations
              and you&apos;ll need to re-enter the new key in OmniGaze.
            </p>
            <Button variant="secondary">
              <RefreshCw className="w-4 h-4" />
              Regenerate Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
