/**
 * ROI Calculator Assumptions
 *
 * Industry-standard assumptions with citations for transparent
 * and credible ROI calculations.
 */

import type { Assumption, AssumptionCategory, TierPricing, TierName, PyramidLayer } from './types';

// Default input values
export const defaultInputs = {
  annualRevenue: 100_000_000, // $100M
  employees: 500,
  itStaff: 15,
  servers: 200,
  manualDocHoursPerWeek: 10,
  incidentsPerMonth: 5,
  avgHoursPerIncident: 4,
  itHourlyRate: 85,
};

// Smart default calculations
export function getSmartDefaults(inputs: { servers: number; employees: number }) {
  return {
    applications: Math.round(inputs.servers * 3.5), // Gartner: avg 3.5 apps per server
    capabilities: 100, // Standard capability model
    valueStreams: 15, // Typical enterprise
    strategicInitiatives: 3, // Annual transformation projects
  };
}

// Tier pricing configuration
export const tierPricing: TierPricing[] = [
  {
    name: 'Community',
    monthlyPrice: 0,
    annualPrice: 0,
    serverLimit: 50,
    layers: ['infrastructure'],
  },
  {
    name: 'Starter',
    monthlyPrice: 99,
    annualPrice: 990,
    serverLimit: 200,
    layers: ['infrastructure', 'applications'],
  },
  {
    name: 'Professional',
    monthlyPrice: 349,
    annualPrice: 3490,
    serverLimit: 1000,
    layers: ['infrastructure', 'applications', 'capabilities'],
  },
  {
    name: 'Business',
    monthlyPrice: 799,
    annualPrice: 7990,
    serverLimit: 5000,
    layers: ['infrastructure', 'applications', 'capabilities', 'valueStreams'],
  },
  {
    name: 'Enterprise',
    monthlyPrice: null, // Contact sales
    annualPrice: null,
    serverLimit: Infinity,
    layers: ['infrastructure', 'applications', 'capabilities', 'valueStreams', 'strategy'],
  },
];

// Get tier by server count
export function getRecommendedTier(servers: number): TierName {
  if (servers <= 50) return 'Community';
  if (servers <= 200) return 'Starter';
  if (servers <= 1000) return 'Professional';
  if (servers <= 5000) return 'Business';
  return 'Enterprise';
}

// Get tier annual cost
export function getTierAnnualCost(tier: TierName): number {
  const tierInfo = tierPricing.find(t => t.name === tier);
  return tierInfo?.annualPrice ?? 15000; // Default for Enterprise
}

// Get layers unlocked by tier
export function getUnlockedLayers(tier: TierName): PyramidLayer[] {
  const tierInfo = tierPricing.find(t => t.name === tier);
  return tierInfo?.layers ?? ['infrastructure'];
}

// Industry assumptions with citations
export const assumptions: Record<string, Assumption> = {
  // Gartner IT Budget Benchmarks
  itSpendAsPercentOfRevenue: {
    key: 'itSpendAsPercentOfRevenue',
    label: 'IT Spend as % of Revenue',
    value: 0.031,
    unit: '%',
    source: 'Gartner IT Budget Benchmark 2024',
    sourceUrl: 'https://www.gartner.com/en/information-technology/insights/it-budgets',
    description: 'Average IT spending across industries as percentage of revenue',
    editable: true,
    min: 0.01,
    max: 0.10,
  },
  cloudSpendAsPercentOfIT: {
    key: 'cloudSpendAsPercentOfIT',
    label: 'Cloud Spend as % of IT',
    value: 0.30,
    unit: '%',
    source: 'Gartner Cloud Spending Forecast 2024',
    description: 'Average cloud infrastructure spending as percentage of IT budget',
    editable: true,
    min: 0.10,
    max: 0.60,
  },

  // Labor costs
  fullyBurdenedFTECostPerHour: {
    key: 'fullyBurdenedFTECostPerHour',
    label: 'Fully Burdened FTE Cost/Hour',
    value: 85,
    unit: 'USD',
    source: 'US Bureau of Labor Statistics',
    sourceUrl: 'https://www.bls.gov/oes/',
    description: 'Average IT professional hourly cost including benefits and overhead',
    editable: true,
    min: 40,
    max: 200,
  },
  workingHoursPerYear: {
    key: 'workingHoursPerYear',
    label: 'Working Hours per Year',
    value: 2080,
    unit: 'hours',
    source: 'Standard work year calculation',
    description: '52 weeks × 40 hours',
    editable: false,
  },

  // Discovery & Documentation
  discoveryTimePerAsset: {
    key: 'discoveryTimePerAsset',
    label: 'Manual Discovery Time per Asset',
    value: 0.5,
    unit: 'hours',
    source: 'Gartner ITAM Research',
    description: 'Time to manually document a single server/VM',
    editable: true,
    min: 0.25,
    max: 2,
  },
  maintenanceTimePerAssetPerMonth: {
    key: 'maintenanceTimePerAssetPerMonth',
    label: 'CMDB Maintenance per Asset/Month',
    value: 0.25,
    unit: 'hours',
    source: 'Gartner CMDB Benchmark',
    description: 'Monthly time to keep asset documentation current',
    editable: true,
    min: 0.1,
    max: 1,
  },
  auditPrepHoursPerYear: {
    key: 'auditPrepHoursPerYear',
    label: 'Audit Preparation Hours/Year',
    value: 80,
    unit: 'hours',
    source: 'Deloitte IT Audit Survey',
    description: 'Annual time spent preparing for IT audits',
    editable: true,
    min: 20,
    max: 200,
  },
  auditPrepReduction: {
    key: 'auditPrepReduction',
    label: 'Audit Prep Time Reduction',
    value: 0.70,
    unit: '%',
    source: 'Forrester TEI Studies',
    description: 'Reduction in audit preparation time with automated discovery',
    editable: true,
    min: 0.3,
    max: 0.9,
  },

  // Applications
  avgAppsPerServer: {
    key: 'avgAppsPerServer',
    label: 'Applications per Server',
    value: 3.5,
    unit: 'apps',
    source: 'Gartner Application Portfolio Analysis',
    description: 'Average number of applications per server in enterprise environments',
    editable: true,
    min: 1,
    max: 10,
  },
  duplicateAppPercent: {
    key: 'duplicateAppPercent',
    label: 'Redundant Applications %',
    value: 0.15,
    unit: '%',
    source: 'Gartner Application Rationalization Study',
    description: 'Typical percentage of duplicate/redundant applications in portfolio',
    editable: true,
    min: 0.05,
    max: 0.30,
  },
  avgAppAnnualCost: {
    key: 'avgAppAnnualCost',
    label: 'Average App Annual Cost',
    value: 25000,
    unit: 'USD',
    source: 'Gartner Software Spend Benchmark',
    description: 'Average annual cost per business application (license + maintenance)',
    editable: true,
    min: 5000,
    max: 100000,
  },
  dependencyMappingHoursPerWeek: {
    key: 'dependencyMappingHoursPerWeek',
    label: 'Manual Dependency Tracking Hours/Week',
    value: 2,
    unit: 'hours',
    source: 'Forrester Infrastructure Survey',
    description: 'Time spent per IT staff member tracking application dependencies manually',
    editable: true,
    min: 0.5,
    max: 8,
  },

  // Incident management
  mttrReductionWithDependencyMap: {
    key: 'mttrReductionWithDependencyMap',
    label: 'MTTR Reduction with Dependency Mapping',
    value: 0.25,
    unit: '%',
    source: 'Forrester TEI Studies',
    description: 'Reduction in mean time to resolution with dependency visibility',
    editable: true,
    min: 0.10,
    max: 0.50,
  },
  avgIncidentsPerServerPerYear: {
    key: 'avgIncidentsPerServerPerYear',
    label: 'Incidents per Server/Year',
    value: 2.5,
    unit: 'incidents',
    source: 'Gartner ITSM Benchmark',
    description: 'Average number of incidents requiring investigation per server annually',
    editable: true,
    min: 0.5,
    max: 10,
  },

  // Security & Compliance
  avgVulnerabilitiesPerServer: {
    key: 'avgVulnerabilitiesPerServer',
    label: 'Vulnerabilities per Server',
    value: 12,
    unit: 'CVEs',
    source: 'Qualys TruRisk Research',
    description: 'Average known vulnerabilities per server requiring triage',
    editable: true,
    min: 5,
    max: 50,
  },
  triageTimePerVulnerability: {
    key: 'triageTimePerVulnerability',
    label: 'Vulnerability Triage Time',
    value: 0.5,
    unit: 'hours',
    source: 'Industry average',
    description: 'Time to assess and prioritize a single vulnerability',
    editable: true,
    min: 0.1,
    max: 2,
  },
  triageTimeReductionWithContext: {
    key: 'triageTimeReductionWithContext',
    label: 'Triage Time Reduction with Business Context',
    value: 0.60,
    unit: '%',
    source: 'Forrester Security Research',
    description: 'Reduction in triage time when vulnerability is tied to business capability',
    editable: true,
    min: 0.30,
    max: 0.80,
  },
  complianceHoursPerYear: {
    key: 'complianceHoursPerYear',
    label: 'Compliance Hours/Year',
    value: 500,
    unit: 'hours',
    source: 'Industry average for SOC2/ISO compliance',
    description: 'Annual hours spent on compliance documentation and reporting',
    editable: true,
    min: 100,
    max: 2000,
  },
  complianceReductionWithAutomation: {
    key: 'complianceReductionWithAutomation',
    label: 'Compliance Time Reduction',
    value: 0.50,
    unit: '%',
    source: 'Forrester Consulting',
    description: 'Reduction in compliance effort with automated EA documentation',
    editable: true,
    min: 0.20,
    max: 0.70,
  },

  // Cloud & Cost optimization
  cloudOverProvisioningPercent: {
    key: 'cloudOverProvisioningPercent',
    label: 'Cloud Over-Provisioning %',
    value: 0.30,
    unit: '%',
    source: 'McKinsey Digital',
    sourceUrl: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights',
    description: 'Typical cloud resource over-provisioning in enterprises',
    editable: true,
    min: 0.10,
    max: 0.40,
  },
  cloudOptimizationRealization: {
    key: 'cloudOptimizationRealization',
    label: 'Cloud Optimization Realization',
    value: 0.50,
    unit: '%',
    source: 'FinOps Foundation Benchmark',
    description: 'Percentage of identified savings typically realized',
    editable: true,
    min: 0.30,
    max: 0.80,
  },

  // Strategic value
  transformationProjectsPerYear: {
    key: 'transformationProjectsPerYear',
    label: 'Transformation Projects/Year',
    value: 3,
    unit: 'projects',
    source: 'Average enterprise',
    description: 'Number of major IT transformation projects annually',
    editable: true,
    min: 1,
    max: 10,
  },
  avgTransformationBudget: {
    key: 'avgTransformationBudget',
    label: 'Avg. Transformation Project Budget',
    value: 500000,
    unit: 'USD',
    source: 'Gartner Project Management Benchmark',
    description: 'Average budget for a major IT transformation initiative',
    editable: true,
    min: 100000,
    max: 5000000,
  },
  transformationSavingsWithEA: {
    key: 'transformationSavingsWithEA',
    label: 'Project Savings with EA Visibility',
    value: 0.05,
    unit: '%',
    source: 'McKinsey Digital Transformation',
    description: 'Cost reduction through better project scoping and prioritization',
    editable: true,
    min: 0.02,
    max: 0.15,
  },
  eaToolConsolidationSavings: {
    key: 'eaToolConsolidationSavings',
    label: 'EA Tool Consolidation Savings',
    value: 0.50,
    unit: '%',
    source: 'Gartner EA Tools Market Guide',
    description: 'Savings vs. standalone EA tools through platform consolidation',
    editable: true,
    min: 0.30,
    max: 0.70,
  },
};

// Group assumptions by category for display
export const assumptionCategories: AssumptionCategory[] = [
  {
    category: 'IT Budget & Labor',
    assumptions: [
      assumptions.itSpendAsPercentOfRevenue,
      assumptions.cloudSpendAsPercentOfIT,
      assumptions.fullyBurdenedFTECostPerHour,
      assumptions.workingHoursPerYear,
    ],
  },
  {
    category: 'Discovery & Documentation',
    assumptions: [
      assumptions.discoveryTimePerAsset,
      assumptions.maintenanceTimePerAssetPerMonth,
      assumptions.auditPrepHoursPerYear,
      assumptions.auditPrepReduction,
    ],
  },
  {
    category: 'Applications',
    assumptions: [
      assumptions.avgAppsPerServer,
      assumptions.duplicateAppPercent,
      assumptions.avgAppAnnualCost,
      assumptions.dependencyMappingHoursPerWeek,
    ],
  },
  {
    category: 'Incident Management',
    assumptions: [
      assumptions.avgIncidentsPerServerPerYear,
      assumptions.mttrReductionWithDependencyMap,
    ],
  },
  {
    category: 'Security & Compliance',
    assumptions: [
      assumptions.avgVulnerabilitiesPerServer,
      assumptions.triageTimePerVulnerability,
      assumptions.triageTimeReductionWithContext,
      assumptions.complianceHoursPerYear,
      assumptions.complianceReductionWithAutomation,
    ],
  },
  {
    category: 'Cloud Optimization',
    assumptions: [
      assumptions.cloudOverProvisioningPercent,
      assumptions.cloudOptimizationRealization,
    ],
  },
  {
    category: 'Strategic Value',
    assumptions: [
      assumptions.transformationProjectsPerYear,
      assumptions.avgTransformationBudget,
      assumptions.transformationSavingsWithEA,
      assumptions.eaToolConsolidationSavings,
    ],
  },
];

// Pyramid layer metadata
export const pyramidLayerInfo: Record<PyramidLayer, { name: string; color: string; tier: TierName }> = {
  infrastructure: {
    name: 'Infrastructure',
    color: '#1e3a8a', // Blue - bottom
    tier: 'Community',
  },
  applications: {
    name: 'Applications',
    color: '#b0a6fb',
    tier: 'Starter',
  },
  capabilities: {
    name: 'Business Capabilities',
    color: '#9d91f8',
    tier: 'Professional',
  },
  valueStreams: {
    name: 'Value Streams',
    color: '#8b7cf5',
    tier: 'Business',
  },
  strategy: {
    name: 'Strategy',
    color: '#7c6aef', // Purple - top
    tier: 'Enterprise',
  },
};
