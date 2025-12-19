/**
 * Docs Access Control
 * Handles tier-based access to documentation pages
 */

// Tier names as used in the API
export type Tier = 'community' | 'starter' | 'professional' | 'business' | 'enterprise';

// Tier hierarchy (index = access level, higher = more access)
const TIER_HIERARCHY: Tier[] = [
  'community',
  'starter',
  'professional',
  'business',
  'enterprise',
];

/**
 * Check if a user's tier can access content requiring a specific tier
 */
export function canAccessTier(userTier: string | null | undefined, requiredTier: Tier): boolean {
  if (!userTier) return false;

  const userLevel = TIER_HIERARCHY.indexOf(userTier.toLowerCase() as Tier);
  const requiredLevel = TIER_HIERARCHY.indexOf(requiredTier);

  // If tier not found, deny access
  if (userLevel === -1 || requiredLevel === -1) return false;

  return userLevel >= requiredLevel;
}

/**
 * Get display name for a tier (for badges)
 */
export function getTierDisplayName(tier: Tier): string {
  const names: Record<Tier, string> = {
    community: 'Community',
    starter: 'Starter',
    professional: 'Professional',
    business: 'Business',
    enterprise: 'Enterprise',
  };
  return names[tier] || tier;
}

/**
 * Get the minimum tier required text (e.g., "Pro+" for professional)
 */
export function getTierBadgeText(tier: Tier): string {
  const badges: Record<Tier, string> = {
    community: '',
    starter: 'Starter+',
    professional: 'Pro+',
    business: 'Business+',
    enterprise: 'Enterprise',
  };
  return badges[tier] || '';
}

// Documentation page metadata
export interface DocsPageMeta {
  title: string;
  description: string;
  requiredTier: Tier;
  section: string;
}
