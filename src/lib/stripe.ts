/**
 * Stripe Configuration and Utilities
 * Uses Stripe Checkout for secure payment processing
 */

// Stripe Price IDs - these should match your Stripe Dashboard
// In production, these would come from environment variables
export const stripePriceIds = {
  starter: {
    monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY || 'price_starter_monthly',
    annual: process.env.STRIPE_PRICE_STARTER_ANNUAL || 'price_starter_annual',
  },
  professional: {
    monthly: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY || 'price_professional_monthly',
    annual: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL || 'price_professional_annual',
  },
  business: {
    monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY || 'price_business_monthly',
    annual: process.env.STRIPE_PRICE_BUSINESS_ANNUAL || 'price_business_annual',
  },
} as const;

export type TierName = keyof typeof stripePriceIds;
export type BillingCycle = 'monthly' | 'annual';

/**
 * Get the Stripe Price ID for a given tier and billing cycle
 */
export function getStripePriceId(tier: TierName, billingCycle: BillingCycle): string {
  const tierPrices = stripePriceIds[tier];
  if (!tierPrices) {
    throw new Error(`Invalid tier: ${tier}`);
  }
  return tierPrices[billingCycle];
}

/**
 * Tier display information
 */
export const tierDisplayInfo: Record<TierName, { name: string; description: string }> = {
  starter: {
    name: 'Starter',
    description: 'For small teams getting started with infrastructure discovery',
  },
  professional: {
    name: 'Professional',
    description: 'For growing teams needing advanced features and API access',
  },
  business: {
    name: 'Business',
    description: 'For operations teams with cloud infrastructure and compliance needs',
  },
};

/**
 * Check if a tier is valid for purchase (excludes Community and Enterprise)
 */
export function isPurchasableTier(tier: string): tier is TierName {
  return tier in stripePriceIds;
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate savings percentage for annual billing
 */
export function calculateAnnualSavings(monthlyPrice: number, annualPrice: number): number {
  const monthlyTotal = monthlyPrice * 12;
  const savings = ((monthlyTotal - annualPrice) / monthlyTotal) * 100;
  return Math.round(savings);
}
