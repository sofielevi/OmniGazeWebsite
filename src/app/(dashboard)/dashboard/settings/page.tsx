"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input, Checkbox } from "@/components/ui/input";
import {
  getUserSettings,
  updateUserSettings,
  deleteAccount,
  logout,
  UserSettings,
  ApiError,
} from "@/lib/api-client";
import {
  User,
  Bell,
  Trash2,
  AlertTriangle,
  Check,
  Loader2,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [productUpdates, setProductUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [billingAlerts, setBillingAlerts] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getUserSettings();
        setSettings(data);
        setName(data.name || "");
        setCompany(data.company || "");
        setProductUpdates(data.notifications.productUpdates);
        setSecurityAlerts(data.notifications.securityAlerts);
        setBillingAlerts(data.notifications.billingAlerts);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load settings");
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      await updateUserSettings({
        name: name.trim() || undefined,
        company: company.trim() || undefined,
      });
      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save settings");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      await updateUserSettings({
        notifications: {
          productUpdates,
          securityAlerts,
          billingAlerts,
        },
      });
      setSuccess("Notification preferences updated");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save notification preferences");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch {
      // Redirect anyway
      router.push("/login");
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") return;

    setIsDeleting(true);
    try {
      await deleteAccount();
      router.push("/");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to delete account");
      }
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-[var(--bg-elevated)] rounded w-48" />
        <div className="h-64 bg-[var(--bg-elevated)] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
          Settings
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Manage your account preferences.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-4 flex items-center gap-3">
          <Check className="w-5 h-5 text-[var(--success)]" />
          <p className="text-[var(--success)]">{success}</p>
        </div>
      )}

      {/* Profile Section */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
            <User className="w-5 h-5 text-[var(--amber-400)]" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Profile
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Your personal information
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={settings?.email || ""}
              disabled
              className="bg-[var(--bg-elevated)] opacity-60"
            />
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Email cannot be changed. Contact support if needed.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Display Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Company
            </label>
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company name"
            />
          </div>

          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </form>
      </div>

      {/* Notifications Section */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[var(--amber-400)]" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Notifications
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Manage email notification preferences
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            checked={productUpdates}
            onChange={(e) => setProductUpdates(e.target.checked)}
            label="Product updates and announcements"
          />
          <Checkbox
            checked={securityAlerts}
            onChange={(e) => setSecurityAlerts(e.target.checked)}
            label="Security alerts and notifications"
          />
          <Checkbox
            checked={billingAlerts}
            onChange={(e) => setBillingAlerts(e.target.checked)}
            label="Billing and subscription alerts"
          />

          <Button
            variant="secondary"
            onClick={handleSaveNotifications}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </div>
      </div>

      {/* Session Section */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--amber-400)]/10 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-[var(--amber-400)]" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Session
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Manage your login session
            </p>
          </div>
        </div>

        <Button variant="secondary" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="bg-[var(--bg-card)] border border-red-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Danger Zone
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Irreversible actions
            </p>
          </div>
        </div>

        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg mb-4">
          <h3 className="font-medium text-red-400 mb-1">Delete Account</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
        </div>

        <Button
          variant="secondary"
          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </Button>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Delete Account
              </h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-4">
              This will permanently delete your OmniGaze account, including:
            </p>

            <ul className="text-sm text-[var(--text-secondary)] space-y-1 mb-6 ml-4">
              <li>• Your license key and all activations</li>
              <li>• Your subscription and billing history</li>
              <li>• All team members (if applicable)</li>
              <li>• All account data and preferences</li>
            </ul>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Type DELETE to confirm
              </label>
              <Input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="DELETE"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation("");
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== "DELETE" || isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Account"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
