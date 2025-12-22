"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getLicenseKey, getActivations, LicenseActivation, ApiError } from "@/lib/api-client";
import { Key, Copy, Check, Monitor, AlertTriangle } from "lucide-react";

export default function LicensesPage() {
  const [licenseKey, setLicenseKey] = useState<string>("");
  const [activations, setActivations] = useState<LicenseActivation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        // Load license key and activations in parallel
        const [licenseResponse, activationsResponse] = await Promise.all([
          getLicenseKey(),
          getActivations().catch(() => ({ activations: [] })), // Don't fail if activations endpoint isn't ready
        ]);

        setLicenseKey(licenseResponse.licenseKey);
        setActivations(activationsResponse.activations);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
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
          Manage your license key and view activations.
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
              {activations.filter(a => a.isActive).length} active / {activations.length} total
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
                  First Seen
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Last Seen
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {activations.map((activation, index) => (
                <tr
                  key={`${activation.machineName}-${index}`}
                  className="border-t border-[var(--border-subtle)]"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-[var(--text-muted)]" />
                      <div>
                        <span className="font-medium text-[var(--text-primary)] block">
                          {activation.machineName}
                        </span>
                        {activation.applicationVersion && (
                          <span className="text-xs text-[var(--text-muted)]">
                            v{activation.applicationVersion}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {formatDate(activation.firstSeen)}
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {formatDateTime(activation.lastSeen)}
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
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activations.length > 0 && (
          <div className="p-4 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)]">
            <p className="text-xs text-[var(--text-muted)]">
              Machines are considered active if they have connected within the last 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
