"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UsageMeter, TierBadge } from "@/components/dashboard/stat-card";
import {
  getTeamInfo,
  inviteTeamMember,
  removeTeamMember,
  cancelInvite,
  getCurrentUser,
  TeamInfo,
  UserInfo,
  ApiError,
} from "@/lib/api-client";
import {
  Users,
  UserPlus,
  Mail,
  MoreVertical,
  Trash2,
  Crown,
  Shield,
  User,
  AlertTriangle,
  Lock,
  ArrowRight,
  Clock,
  X,
} from "lucide-react";

const TEAM_TIERS = ["Business", "Enterprise"];

export default function TeamPage() {
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);

        const userTierName = userData.tier?.displayName || userData.tier?.name || "Community";
        if (TEAM_TIERS.includes(userTierName)) {
          const team = await getTeamInfo();
          setTeamInfo(team);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to load team information");
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setInviteLoading(true);
    setInviteError("");

    try {
      await inviteTeamMember(inviteEmail.trim());
      // Refresh team info
      const team = await getTeamInfo();
      setTeamInfo(team);
      setInviteEmail("");
      setShowInviteModal(false);
    } catch (err) {
      if (err instanceof ApiError) {
        setInviteError(err.message);
      } else {
        setInviteError("Failed to send invitation");
      }
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;

    try {
      await removeTeamMember(memberId);
      const team = await getTeamInfo();
      setTeamInfo(team);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    }
  };

  const handleCancelInvite = async (email: string) => {
    try {
      await cancelInvite(email);
      const team = await getTeamInfo();
      setTeamInfo(team);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
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

  // Check if user has team access
  const tierDisplayName = user?.tier?.displayName || user?.tier?.name || "Community";
  const hasTeamAccess = user && TEAM_TIERS.includes(tierDisplayName);

  if (!hasTeamAccess) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
            Team
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Manage your team members and invitations.
          </p>
        </div>

        {/* Upgrade Notice */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--amber-400)]/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[var(--amber-400)]" />
          </div>
          <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-2">
            Team Management Requires Business+
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Upgrade to the Business or Enterprise plan to invite team members and
            collaborate with your organization.
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <TierBadge tier="Business" />
            <span className="text-[var(--text-muted)]">or</span>
            <TierBadge tier="Enterprise" />
          </div>
          <Button
            variant="primary"
            onClick={() => window.location.href = "/dashboard/subscription"}
          >
            View Upgrade Options
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Features Preview */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-4">
            Team Features Include
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Users, text: "Up to 25 team members (Business) or unlimited (Enterprise)" },
              { icon: Mail, text: "Invite members via email" },
              { icon: Shield, text: "Role-based access control" },
              { icon: Crown, text: "Admin management capabilities" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-[var(--text-secondary)]">
                <feature.icon className="w-5 h-5 text-[var(--text-muted)]" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
            Team
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Manage your team members and invitations.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowInviteModal(true)}>
          <UserPlus className="w-4 h-4" />
          Invite Member
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setError("");
              setIsLoading(true);
              getTeamInfo()
                .then(setTeamInfo)
                .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load"))
                .finally(() => setIsLoading(false));
            }}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Usage */}
      {teamInfo && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6">
          <UsageMeter
            label="Team Members"
            current={teamInfo.members.length}
            limit={teamInfo.memberLimit}
          />
        </div>
      )}

      {/* Team Members */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[var(--border-subtle)]">
          <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
            Team Members
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {teamInfo?.members.length || 0} members
          </p>
        </div>

        {!teamInfo || teamInfo.members.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3" />
            <h3 className="font-medium text-[var(--text-primary)] mb-1">
              No team members yet
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Invite team members to collaborate on OmniGaze.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--bg-elevated)]">
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Member
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Role
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Joined
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Last Active
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {teamInfo.members.map((member) => (
                <tr
                  key={member.id}
                  className="border-t border-[var(--border-subtle)]"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
                        <User className="w-5 h-5 text-[var(--text-muted)]" />
                      </div>
                      <div>
                        {member.name && (
                          <p className="font-medium text-[var(--text-primary)]">
                            {member.name}
                          </p>
                        )}
                        <p className="text-sm text-[var(--text-secondary)]">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <RoleBadge role={member.role} />
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {new Date(member.joinedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {member.lastActive
                      ? new Date(member.lastActive).toLocaleDateString()
                      : "Never"}
                  </td>
                  <td className="p-4 text-right">
                    {member.role !== "owner" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pending Invitations */}
      {teamInfo && teamInfo.pendingInvites.length > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[var(--border-subtle)]">
            <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Pending Invitations
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {teamInfo.pendingInvites.length} pending
            </p>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-[var(--bg-elevated)]">
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Email
                </th>
                <th className="text-left p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Sent
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {teamInfo.pendingInvites.map((invite) => (
                <tr
                  key={invite.email}
                  className="border-t border-[var(--border-subtle)]"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-500" />
                      </div>
                      <span className="text-[var(--text-primary)]">
                        {invite.email}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">
                    {new Date(invite.sentAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelInvite(invite.email)}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Invite Team Member
              </h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>

            <form onSubmit={handleInvite}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  required
                  disabled={inviteLoading}
                />
              </div>

              {inviteError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{inviteError}</p>
                </div>
              )}

              <p className="text-sm text-[var(--text-muted)] mb-6">
                An invitation email will be sent with instructions to join your team.
              </p>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowInviteModal(false)}
                  disabled={inviteLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={inviteLoading || !inviteEmail.trim()}
                >
                  {inviteLoading ? "Sending..." : "Send Invitation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function RoleBadge({ role }: { role: "owner" | "admin" | "member" }) {
  const config = {
    owner: {
      icon: Crown,
      color: "text-[var(--amber-400)] bg-[var(--amber-400)]/10",
      label: "Owner",
    },
    admin: {
      icon: Shield,
      color: "text-blue-400 bg-blue-400/10",
      label: "Admin",
    },
    member: {
      icon: User,
      color: "text-[var(--text-secondary)] bg-[var(--bg-elevated)]",
      label: "Member",
    },
  };

  const { icon: Icon, color, label } = config[role];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
