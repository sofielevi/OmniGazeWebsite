/**
 * ROI Calculator Types
 *
 * Type definitions for the OmniGaze ROI Calculator that calculates
 * savings across all five pyramid layers.
 */

// Pyramid layers that map to OmniGaze tiers
export type PyramidLayer =
  | 'infrastructure'
  | 'applications'
  | 'capabilities'
  | 'valueStreams'
  | 'strategy';

// Tier names matching pricing
export type TierName =
  | 'Community'
  | 'Starter'
  | 'Professional'
  | 'Business'
  | 'Enterprise';

// User inputs for the calculator
export interface CalculatorInputs {
  // Core business inputs
  annualRevenue: number;
  employees: number;
  itStaff: number;
  servers: number;

  // Optional - will use smart defaults if not provided
  applications?: number;
  capabilities?: number;
  valueStreams?: number;
  strategicInitiatives?: number;

  // Current tooling assessment
  hasExistingCMDB?: boolean;
  hasEATool?: boolean;
  manualDocHoursPerWeek?: number;
  incidentsPerMonth?: number;
  avgHoursPerIncident?: number;
  itHourlyRate?: number;
}

// A single saving item with attribution
export interface SavingItem {
  type: string;
  description: string;
  amount: number;
  formula: string;
  source: string;
  sourceUrl?: string;
}

// Savings for a single pyramid layer
export interface LayerSavings {
  layerId: PyramidLayer;
  layerName: string;
  color: string;
  tier: TierName;
  tierPrice: number;
  savings: SavingItem[];
  totalAnnual: number;
  isUnlocked: boolean;
}

// Complete ROI calculation result
export interface ROIResult {
  // Summary metrics
  totalAnnualSavings: number;
  totalUnlockedSavings: number;

  // Tier recommendation
  recommendedTier: TierName;
  tierAnnualCost: number;

  // ROI metrics
  netSavings: number;
  roiPercent: number;
  paybackMonths: number;

  // Per-layer breakdown
  layers: LayerSavings[];

  // Input echo for sharing
  inputs: CalculatorInputs;
}

// Assumption with citation
export interface Assumption {
  key: string;
  label: string;
  value: number;
  unit: string;
  source: string;
  sourceUrl?: string;
  description: string;
  editable: boolean;
  min?: number;
  max?: number;
}

// Category of assumptions
export interface AssumptionCategory {
  category: string;
  assumptions: Assumption[];
}

// Tier pricing info
export interface TierPricing {
  name: TierName;
  monthlyPrice: number | null;
  annualPrice: number | null;
  serverLimit: number;
  layers: PyramidLayer[];
}

// Email gate status
export interface GateStatus {
  isUnlocked: boolean;
  email?: string;
  unlockedAt?: Date;
}
