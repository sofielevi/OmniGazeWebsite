/**
 * OmniGaze API Client
 * Handles all communication with api.omnigaze.com
 * Uses HttpOnly cookies for authentication (set by the API)
 *
 * When NEXT_PUBLIC_API_URL is not set, uses local mock API routes for development
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Check if we're using external API or local mock routes
const useLocalApi = !process.env.NEXT_PUBLIC_API_URL;

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface VerifyResponse {
  success: boolean;
  message: string;
  email: string;
  tier: TierInfo | null;
  features: string[];
  // Note: licenseKey is stored in HttpOnly cookie, not returned in response
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  email: string;
  tier: TierInfo | null;
}

export interface UserInfo {
  isAuthenticated: boolean;
  email: string;
  tier: TierInfo | null;
  serverCount: number;
  userCount: number;
  serverLimit: number;
  userLimit: number;
}

export interface TierInfo {
  id: number;
  name: string;
  displayName: string;
  description?: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  serverLimit: number;
  userLimit: number;
  features: string[];
  // UI-enriched fields (added client-side)
  featured?: boolean;
  cta?: string;
  ctaVariant?: 'primary' | 'secondary';
  disabledFeatures?: string[];
}

export interface CurrentTierInfo extends TierInfo {
  usage: {
    servers: number;
    users: number;
  };
  availableUpgrades: TierInfo[];
}

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Important: include cookies for auth
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Handle non-JSON responses
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    if (!response.ok) {
      throw new ApiError('Server error', response.status);
    }
    return {} as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || data.error || 'An error occurred',
      response.status,
      data.code
    );
  }

  return data;
}

// ============================================
// Public Website API Endpoints
// ============================================

/**
 * Check if an email is already registered
 */
export async function checkEmail(email: string): Promise<{ exists: boolean }> {
  const endpoint = useLocalApi
    ? `/api/auth/check-email?email=${encodeURIComponent(email)}`
    : `/api/website/check-email?email=${encodeURIComponent(email)}`;
  const response = await apiFetch<{ isRegistered: boolean }>(endpoint);
  // API returns { isRegistered }, client expects { exists }
  return { exists: response.isRegistered };
}

/**
 * Register a new user with email
 */
export async function register(email: string): Promise<RegisterResponse> {
  const endpoint = useLocalApi ? '/api/auth/register' : '/api/website/register';
  return apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ email, source: 'Website' }),
  });
}

/**
 * Verify email with 6-character code
 * Sets HttpOnly session cookie on success
 */
export async function verify(email: string, code: string): Promise<VerifyResponse> {
  const endpoint = useLocalApi ? '/api/auth/verify' : '/api/website/verify';
  return apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ email, code: code.toUpperCase() }),
  });
}

/**
 * Resend verification code
 */
export async function resendCode(email: string): Promise<RegisterResponse> {
  const endpoint = useLocalApi ? '/api/auth/resend' : '/api/website/resend';
  return apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/**
 * Login with license key
 * Sets HttpOnly session cookie on success
 */
export async function login(licenseKey: string): Promise<LoginResponse> {
  const endpoint = useLocalApi ? '/api/auth/login' : '/api/website/login';
  return apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ licenseKey }),
  });
}

/**
 * Logout - clears session cookie
 */
export async function logout(): Promise<void> {
  const endpoint = useLocalApi ? '/api/auth/logout' : '/api/website/logout';
  return apiFetch(endpoint, {
    method: 'POST',
  });
}

/**
 * Get current user info (requires auth)
 */
export async function getCurrentUser(): Promise<UserInfo> {
  const endpoint = useLocalApi ? '/api/auth/me' : '/api/website/me';
  return apiFetch(endpoint);
}

/**
 * Get current tier info with usage and upgrade options (requires auth)
 */
export async function getCurrentTier(): Promise<CurrentTierInfo> {
  const endpoint = useLocalApi ? '/api/auth/tier' : '/api/website/tier';
  return apiFetch(endpoint);
}

/**
 * Get all available tiers (public)
 */
export async function getTiers(): Promise<TierInfo[]> {
  const endpoint = useLocalApi ? '/api/auth/tiers' : '/api/Tier/All';
  return apiFetch(endpoint);
}

/**
 * Get license key for desktop client (requires auth)
 */
export async function getLicenseKey(): Promise<{ licenseKey: string }> {
  const endpoint = useLocalApi ? '/api/auth/license-key' : '/api/website/license-key';
  return apiFetch(endpoint);
}

// ============================================
// Billing API Endpoints
// ============================================

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  invoiceUrl?: string;
}

export interface BillingInfo {
  hasPaymentMethod: boolean;
  cardLast4?: string;
  cardBrand?: string;
  nextBillingDate?: string;
  invoices: Invoice[];
  stripePortalUrl: string;
}

/**
 * Get billing information (requires auth)
 */
export async function getBillingInfo(): Promise<BillingInfo> {
  return apiFetch('/api/website/billing');
}

/**
 * Get Stripe Customer Portal URL
 */
export async function getStripePortalUrl(): Promise<{ url: string }> {
  return apiFetch('/api/website/billing/portal');
}

// ============================================
// Team API Endpoints
// ============================================

export interface TeamMember {
  id: string;
  email: string;
  name?: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  lastActive?: string;
}

export interface TeamInfo {
  members: TeamMember[];
  pendingInvites: { email: string; sentAt: string }[];
  memberLimit: number;
}

/**
 * Get team information (requires auth, Business+ tier)
 */
export async function getTeamInfo(): Promise<TeamInfo> {
  return apiFetch('/api/website/team');
}

/**
 * Invite a team member (requires auth, Business+ tier)
 */
export async function inviteTeamMember(email: string): Promise<{ success: boolean }> {
  return apiFetch('/api/website/team/invite', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/**
 * Remove a team member (requires auth, Business+ tier)
 */
export async function removeTeamMember(memberId: string): Promise<{ success: boolean }> {
  return apiFetch(`/api/website/team/members/${memberId}`, {
    method: 'DELETE',
  });
}

/**
 * Cancel a pending invite (requires auth, Business+ tier)
 */
export async function cancelInvite(email: string): Promise<{ success: boolean }> {
  return apiFetch('/api/website/team/invite/cancel', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// ============================================
// Settings API Endpoints
// ============================================

export interface UserSettings {
  email: string;
  name?: string;
  company?: string;
  notifications: {
    productUpdates: boolean;
    securityAlerts: boolean;
    billingAlerts: boolean;
  };
}

/**
 * Get user settings (requires auth)
 */
export async function getUserSettings(): Promise<UserSettings> {
  return apiFetch('/api/website/settings');
}

/**
 * Update user settings (requires auth)
 */
export async function updateUserSettings(settings: Partial<UserSettings>): Promise<{ success: boolean }> {
  return apiFetch('/api/website/settings', {
    method: 'PATCH',
    body: JSON.stringify(settings),
  });
}

/**
 * Delete account (requires auth)
 */
export async function deleteAccount(): Promise<{ success: boolean }> {
  return apiFetch('/api/website/account', {
    method: 'DELETE',
  });
}

// ============================================
// Health Check
// ============================================

/**
 * Check API health
 */
export async function healthCheck(): Promise<{ status: string }> {
  return apiFetch('/api/website/health');
}
