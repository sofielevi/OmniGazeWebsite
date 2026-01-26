/**
 * ROI Calculation Engine
 *
 * Calculates savings across all five pyramid layers based on
 * user inputs and industry assumptions.
 */

import type {
  CalculatorInputs,
  ROIResult,
  LayerSavings,
  SavingItem,
  PyramidLayer,
  TierName,
} from './types';
import {
  assumptions,
  defaultInputs,
  getSmartDefaults,
  getRecommendedTier,
  getTierAnnualCost,
  getUnlockedLayers,
  pyramidLayerInfo,
  tierPricing,
} from './assumptions';

// Helper to get assumption value (allows for custom overrides)
function a(key: keyof typeof assumptions, customAssumptions?: Partial<Record<string, number>>): number {
  if (customAssumptions?.[key] !== undefined) {
    return customAssumptions[key];
  }
  return assumptions[key].value;
}

/**
 * Calculate Infrastructure layer savings (Community tier)
 */
function calculateInfrastructureSavings(
  inputs: CalculatorInputs,
  customAssumptions?: Partial<Record<string, number>>
): LayerSavings {
  const { servers, itStaff } = inputs;
  const hourlyRate = inputs.itHourlyRate ?? a('fullyBurdenedFTECostPerHour', customAssumptions);

  const savings: SavingItem[] = [];

  // 1. Discovery time savings
  const discoveryTimeSaved = servers * a('discoveryTimePerAsset', customAssumptions);
  const discoverySavings = discoveryTimeSaved * hourlyRate;
  savings.push({
    type: 'Discovery Time Savings',
    description: 'Time saved from automated infrastructure discovery vs. manual documentation',
    amount: discoverySavings,
    formula: `${servers} servers × ${a('discoveryTimePerAsset', customAssumptions)} hrs × $${hourlyRate}/hr`,
    source: assumptions.discoveryTimePerAsset.source,
  });

  // 2. CMDB maintenance elimination
  const maintenanceTimeSaved = servers * a('maintenanceTimePerAssetPerMonth', customAssumptions) * 12;
  const maintenanceSavings = maintenanceTimeSaved * hourlyRate;
  savings.push({
    type: 'CMDB Maintenance Elimination',
    description: 'Annual time saved from not manually maintaining asset documentation',
    amount: maintenanceSavings,
    formula: `${servers} servers × ${a('maintenanceTimePerAssetPerMonth', customAssumptions)} hrs/mo × 12 mo × $${hourlyRate}/hr`,
    source: assumptions.maintenanceTimePerAssetPerMonth.source,
  });

  // 3. Audit preparation reduction
  const auditPrepSaved = a('auditPrepHoursPerYear', customAssumptions) * a('auditPrepReduction', customAssumptions);
  const auditSavings = auditPrepSaved * hourlyRate;
  savings.push({
    type: 'Audit Preparation Reduction',
    description: `${Math.round(a('auditPrepReduction', customAssumptions) * 100)}% reduction in annual audit preparation time`,
    amount: auditSavings,
    formula: `${a('auditPrepHoursPerYear', customAssumptions)} hrs × ${a('auditPrepReduction', customAssumptions) * 100}% × $${hourlyRate}/hr`,
    source: assumptions.auditPrepReduction.source,
  });

  const totalAnnual = savings.reduce((sum, s) => sum + s.amount, 0);
  const layerInfo = pyramidLayerInfo.infrastructure;

  return {
    layerId: 'infrastructure',
    layerName: layerInfo.name,
    color: layerInfo.color,
    tier: layerInfo.tier,
    tierPrice: getTierAnnualCost('Community'),
    savings,
    totalAnnual,
    isUnlocked: true, // Infrastructure is always unlocked (Community tier)
  };
}

/**
 * Calculate Applications layer savings (Starter tier)
 */
function calculateApplicationsSavings(
  inputs: CalculatorInputs,
  customAssumptions?: Partial<Record<string, number>>
): LayerSavings {
  const { servers, itStaff, incidentsPerMonth, avgHoursPerIncident } = inputs;
  const hourlyRate = inputs.itHourlyRate ?? a('fullyBurdenedFTECostPerHour', customAssumptions);
  const applications = inputs.applications ?? Math.round(servers * a('avgAppsPerServer', customAssumptions));

  const savings: SavingItem[] = [];

  // 1. Application rationalization savings
  const duplicateApps = applications * a('duplicateAppPercent', customAssumptions);
  const rationalizationSavings = duplicateApps * a('avgAppAnnualCost', customAssumptions) * 0.10; // Conservative: only 10% realized first year
  savings.push({
    type: 'Application Rationalization',
    description: 'Cost savings from identifying and eliminating redundant applications',
    amount: rationalizationSavings,
    formula: `${applications} apps × ${a('duplicateAppPercent', customAssumptions) * 100}% redundant × $${a('avgAppAnnualCost', customAssumptions)} × 10% realized`,
    source: assumptions.duplicateAppPercent.source,
  });

  // 2. Dependency mapping time savings
  const depMappingTimeSaved = itStaff * a('dependencyMappingHoursPerWeek', customAssumptions) * 52;
  const depMappingSavings = depMappingTimeSaved * hourlyRate;
  savings.push({
    type: 'Dependency Mapping Automation',
    description: 'Time saved from automated application dependency discovery',
    amount: depMappingSavings,
    formula: `${itStaff} staff × ${a('dependencyMappingHoursPerWeek', customAssumptions)} hrs/wk × 52 wks × $${hourlyRate}/hr`,
    source: assumptions.dependencyMappingHoursPerWeek.source,
  });

  // 3. Incident resolution improvement (MTTR reduction)
  const monthlyIncidents = incidentsPerMonth ?? Math.round(servers * a('avgIncidentsPerServerPerYear', customAssumptions) / 12);
  const incidentHours = avgHoursPerIncident ?? 4;
  const mttrReduction = a('mttrReductionWithDependencyMap', customAssumptions);
  const incidentTimeSaved = monthlyIncidents * 12 * incidentHours * mttrReduction;
  const incidentSavings = incidentTimeSaved * hourlyRate;
  savings.push({
    type: 'Faster Incident Resolution',
    description: `${Math.round(mttrReduction * 100)}% MTTR reduction with dependency visibility`,
    amount: incidentSavings,
    formula: `${monthlyIncidents}/mo × 12 × ${incidentHours} hrs × ${mttrReduction * 100}% × $${hourlyRate}/hr`,
    source: assumptions.mttrReductionWithDependencyMap.source,
  });

  const totalAnnual = savings.reduce((sum, s) => sum + s.amount, 0);
  const layerInfo = pyramidLayerInfo.applications;

  return {
    layerId: 'applications',
    layerName: layerInfo.name,
    color: layerInfo.color,
    tier: layerInfo.tier,
    tierPrice: getTierAnnualCost('Starter'),
    savings,
    totalAnnual,
    isUnlocked: false,
  };
}

/**
 * Calculate Business Capabilities layer savings (Professional tier)
 */
function calculateCapabilitiesSavings(
  inputs: CalculatorInputs,
  customAssumptions?: Partial<Record<string, number>>
): LayerSavings {
  const { servers, annualRevenue } = inputs;
  const hourlyRate = inputs.itHourlyRate ?? a('fullyBurdenedFTECostPerHour', customAssumptions);
  const itBudget = annualRevenue * a('itSpendAsPercentOfRevenue', customAssumptions);

  const savings: SavingItem[] = [];

  // 1. Vulnerability prioritization savings
  const totalVulns = servers * a('avgVulnerabilitiesPerServer', customAssumptions);
  const triageTimeWithoutContext = totalVulns * a('triageTimePerVulnerability', customAssumptions);
  const triageTimeSaved = triageTimeWithoutContext * a('triageTimeReductionWithContext', customAssumptions);
  const vulnSavings = triageTimeSaved * hourlyRate;
  savings.push({
    type: 'Vulnerability Prioritization',
    description: `${Math.round(a('triageTimeReductionWithContext', customAssumptions) * 100)}% faster triage with business capability context`,
    amount: vulnSavings,
    formula: `${totalVulns} vulns × ${a('triageTimePerVulnerability', customAssumptions)} hrs × ${a('triageTimeReductionWithContext', customAssumptions) * 100}% × $${hourlyRate}/hr`,
    source: assumptions.triageTimeReductionWithContext.source,
  });

  // 2. Compliance automation savings
  const complianceTimeSaved = a('complianceHoursPerYear', customAssumptions) * a('complianceReductionWithAutomation', customAssumptions);
  const complianceSavings = complianceTimeSaved * hourlyRate;
  savings.push({
    type: 'Compliance Automation',
    description: `${Math.round(a('complianceReductionWithAutomation', customAssumptions) * 100)}% reduction in compliance documentation effort`,
    amount: complianceSavings,
    formula: `${a('complianceHoursPerYear', customAssumptions)} hrs × ${a('complianceReductionWithAutomation', customAssumptions) * 100}% × $${hourlyRate}/hr`,
    source: assumptions.complianceReductionWithAutomation.source,
  });

  // 3. Cost allocation accuracy (2% of IT budget better allocated)
  const costAllocationSavings = itBudget * 0.02;
  savings.push({
    type: 'Cost Allocation Accuracy',
    description: 'Savings from accurate IT cost attribution to business capabilities',
    amount: costAllocationSavings,
    formula: `$${(itBudget / 1000000).toFixed(1)}M IT budget × 2% better allocation`,
    source: 'Industry benchmark: improved cost visibility',
  });

  const totalAnnual = savings.reduce((sum, s) => sum + s.amount, 0);
  const layerInfo = pyramidLayerInfo.capabilities;

  return {
    layerId: 'capabilities',
    layerName: layerInfo.name,
    color: layerInfo.color,
    tier: layerInfo.tier,
    tierPrice: getTierAnnualCost('Professional'),
    savings,
    totalAnnual,
    isUnlocked: false,
  };
}

/**
 * Calculate Value Streams layer savings (Business tier)
 */
function calculateValueStreamsSavings(
  inputs: CalculatorInputs,
  customAssumptions?: Partial<Record<string, number>>
): LayerSavings {
  const { annualRevenue } = inputs;
  const hourlyRate = inputs.itHourlyRate ?? a('fullyBurdenedFTECostPerHour', customAssumptions);
  const itBudget = annualRevenue * a('itSpendAsPercentOfRevenue', customAssumptions);
  const cloudSpend = itBudget * a('cloudSpendAsPercentOfIT', customAssumptions);

  const savings: SavingItem[] = [];

  // 1. Cloud optimization savings
  const overProvisioning = cloudSpend * a('cloudOverProvisioningPercent', customAssumptions);
  const cloudSavings = overProvisioning * a('cloudOptimizationRealization', customAssumptions);
  savings.push({
    type: 'Cloud Cost Optimization',
    description: 'Savings from identifying over-provisioned cloud resources tied to value streams',
    amount: cloudSavings,
    formula: `$${(cloudSpend / 1000000).toFixed(1)}M cloud × ${a('cloudOverProvisioningPercent', customAssumptions) * 100}% over-provisioned × ${a('cloudOptimizationRealization', customAssumptions) * 100}% realized`,
    source: assumptions.cloudOverProvisioningPercent.source,
  });

  // 2. Strategic alignment / better project prioritization
  const projectBudget = a('avgTransformationBudget', customAssumptions) * a('transformationProjectsPerYear', customAssumptions);
  const alignmentSavings = projectBudget * a('transformationSavingsWithEA', customAssumptions);
  savings.push({
    type: 'Strategic Alignment',
    description: `${Math.round(a('transformationSavingsWithEA', customAssumptions) * 100)}% savings through better project prioritization`,
    amount: alignmentSavings,
    formula: `${a('transformationProjectsPerYear', customAssumptions)} projects × $${(a('avgTransformationBudget', customAssumptions) / 1000).toFixed(0)}K × ${a('transformationSavingsWithEA', customAssumptions) * 100}%`,
    source: assumptions.transformationSavingsWithEA.source,
  });

  // 3. Change impact analysis time savings
  const changeRequestsPerYear = 50; // Reasonable estimate
  const changeAnalysisTimeSaved = changeRequestsPerYear * 2 * 0.5; // 2 hours reduced by 50%
  const changeAnalysisSavings = changeAnalysisTimeSaved * hourlyRate;
  savings.push({
    type: 'Change Impact Analysis',
    description: 'Time saved understanding change impact across value streams',
    amount: changeAnalysisSavings,
    formula: `50 changes/yr × 2 hrs × 50% saved × $${hourlyRate}/hr`,
    source: 'Industry average change analysis',
  });

  const totalAnnual = savings.reduce((sum, s) => sum + s.amount, 0);
  const layerInfo = pyramidLayerInfo.valueStreams;

  return {
    layerId: 'valueStreams',
    layerName: layerInfo.name,
    color: layerInfo.color,
    tier: layerInfo.tier,
    tierPrice: getTierAnnualCost('Business'),
    savings,
    totalAnnual,
    isUnlocked: false,
  };
}

/**
 * Calculate Strategy layer savings (Enterprise tier)
 */
function calculateStrategySavings(
  inputs: CalculatorInputs,
  customAssumptions?: Partial<Record<string, number>>
): LayerSavings {
  const { hasEATool } = inputs;

  const savings: SavingItem[] = [];

  // 1. EA tool consolidation (if they have existing EA tools)
  const existingEAToolCost = hasEATool ? 50000 : 0; // Estimate for LeanIX/Ardoq
  const consolidationSavings = existingEAToolCost * a('eaToolConsolidationSavings', customAssumptions);
  if (consolidationSavings > 0) {
    savings.push({
      type: 'EA Tool Consolidation',
      description: `${Math.round(a('eaToolConsolidationSavings', customAssumptions) * 100)}% savings vs. standalone EA tools`,
      amount: consolidationSavings,
      formula: `$${existingEAToolCost} current EA tool × ${a('eaToolConsolidationSavings', customAssumptions) * 100}%`,
      source: assumptions.eaToolConsolidationSavings.source,
    });
  }

  // 2. Executive decision acceleration
  const decisionAccelerationValue = 25000; // Conservative value per strategic decision accelerated
  const strategicDecisions = 4; // Per year
  const decisionSavings = decisionAccelerationValue * strategicDecisions;
  savings.push({
    type: 'Executive Decision Acceleration',
    description: 'Value from faster strategic decisions with AI-powered insights',
    amount: decisionSavings,
    formula: `${strategicDecisions} strategic decisions × $${decisionAccelerationValue} value each`,
    source: 'BiZZdesign EA Business Case Framework',
  });

  // 3. M&A due diligence (amortized)
  const maDueDiligenceSavings = 30000; // Amortized per year (assuming M&A every 3 years)
  savings.push({
    type: 'M&A Due Diligence Acceleration',
    description: '30% reduction in M&A IT due diligence with automated discovery',
    amount: maDueDiligenceSavings,
    formula: 'Amortized: $100K savings per M&A ÷ 3 years',
    source: 'M&A consulting cost reduction studies',
  });

  const totalAnnual = savings.reduce((sum, s) => sum + s.amount, 0);
  const layerInfo = pyramidLayerInfo.strategy;

  return {
    layerId: 'strategy',
    layerName: layerInfo.name,
    color: layerInfo.color,
    tier: layerInfo.tier,
    tierPrice: 15000, // Enterprise estimate
    savings,
    totalAnnual,
    isUnlocked: false,
  };
}

/**
 * Main ROI calculation function
 */
export function calculateROI(
  inputs: CalculatorInputs,
  customAssumptions?: Partial<Record<string, number>>
): ROIResult {
  // Apply smart defaults for missing optional fields
  const smartDefaults = getSmartDefaults(inputs);
  const fullInputs: CalculatorInputs = {
    ...defaultInputs,
    ...inputs,
    applications: inputs.applications ?? smartDefaults.applications,
    capabilities: inputs.capabilities ?? smartDefaults.capabilities,
    valueStreams: inputs.valueStreams ?? smartDefaults.valueStreams,
    strategicInitiatives: inputs.strategicInitiatives ?? smartDefaults.strategicInitiatives,
  };

  // Calculate savings for each layer
  const infrastructureLayer = calculateInfrastructureSavings(fullInputs, customAssumptions);
  const applicationsLayer = calculateApplicationsSavings(fullInputs, customAssumptions);
  const capabilitiesLayer = calculateCapabilitiesSavings(fullInputs, customAssumptions);
  const valueStreamsLayer = calculateValueStreamsSavings(fullInputs, customAssumptions);
  const strategyLayer = calculateStrategySavings(fullInputs, customAssumptions);

  // Get recommended tier based on server count
  const recommendedTier = getRecommendedTier(fullInputs.servers);
  const unlockedLayers = getUnlockedLayers(recommendedTier);

  // Update isUnlocked status for each layer
  const layers: LayerSavings[] = [
    { ...infrastructureLayer, isUnlocked: unlockedLayers.includes('infrastructure') },
    { ...applicationsLayer, isUnlocked: unlockedLayers.includes('applications') },
    { ...capabilitiesLayer, isUnlocked: unlockedLayers.includes('capabilities') },
    { ...valueStreamsLayer, isUnlocked: unlockedLayers.includes('valueStreams') },
    { ...strategyLayer, isUnlocked: unlockedLayers.includes('strategy') },
  ];

  // Calculate totals
  const totalAnnualSavings = layers.reduce((sum, l) => sum + l.totalAnnual, 0);
  const totalUnlockedSavings = layers
    .filter(l => l.isUnlocked)
    .reduce((sum, l) => sum + l.totalAnnual, 0);

  const tierAnnualCost = getTierAnnualCost(recommendedTier);
  const netSavings = totalUnlockedSavings - tierAnnualCost;
  const roiPercent = tierAnnualCost > 0 ? ((totalUnlockedSavings / tierAnnualCost) - 1) * 100 : 0;
  const paybackMonths = tierAnnualCost > 0 ? (tierAnnualCost / (totalUnlockedSavings / 12)) : 0;

  return {
    totalAnnualSavings,
    totalUnlockedSavings,
    recommendedTier,
    tierAnnualCost,
    netSavings,
    roiPercent,
    paybackMonths,
    layers,
    inputs: fullInputs,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(num));
}

/**
 * Calculate what-if for different tiers
 */
export function calculateTierComparison(inputs: CalculatorInputs): Array<{
  tier: TierName;
  annualCost: number;
  totalSavings: number;
  netSavings: number;
  roiPercent: number;
  paybackMonths: number;
}> {
  const result = calculateROI(inputs);

  return tierPricing.map(tier => {
    const unlockedLayers = getUnlockedLayers(tier.name);
    const tierSavings = result.layers
      .filter(l => unlockedLayers.includes(l.layerId))
      .reduce((sum, l) => sum + l.totalAnnual, 0);

    const tierCost = tier.annualPrice ?? 15000;
    const net = tierSavings - tierCost;
    const roi = tierCost > 0 ? ((tierSavings / tierCost) - 1) * 100 : 0;
    const payback = tierCost > 0 ? (tierCost / (tierSavings / 12)) : 0;

    return {
      tier: tier.name,
      annualCost: tierCost,
      totalSavings: tierSavings,
      netSavings: net,
      roiPercent: roi,
      paybackMonths: payback,
    };
  });
}
