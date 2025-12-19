import { NextResponse } from 'next/server';

/**
 * Mock /api/auth/tiers endpoint for local development
 * Returns all active pricing tiers with features
 *
 * In production, this would be handled by the real API at api.omnigaze.com/api/website/tiers
 * Data matches the database seed values from OmniGazeSelfService
 */
export async function GET() {
  // Mock tier data matching database seed values
  const tiers = [
    {
      id: 1,
      name: 'Community',
      displayName: 'Community',
      description: 'Perfect for personal projects and small environments',
      monthlyPrice: 0,
      annualPrice: 0,
      serverLimit: 50,
      userLimit: 1,
      features: [
        'Network discovery',
        'Asset inventory',
        'Server diagram (2D)',
        'Tag management',
      ],
    },
    {
      id: 2,
      name: 'Starter',
      displayName: 'Starter',
      description: 'For small teams getting started with infrastructure visibility',
      monthlyPrice: 99,
      annualPrice: 990,
      serverLimit: 200,
      userLimit: 3,
      features: [
        'Everything in Community',
        'Process discovery',
        'Process diagram',
        '3D visualization',
        'Scheduled scans',
        'CSV export',
      ],
    },
    {
      id: 3,
      name: 'Professional',
      displayName: 'Professional',
      description: 'For growing teams that need deeper insights',
      monthlyPrice: 349,
      annualPrice: 3490,
      serverLimit: 1000,
      userLimit: 10,
      features: [
        'Everything in Starter',
        'OData API access',
        'Vulnerability scanning',
        'SSL certificate tracking',
        'Software inventory',
        'AD/LDAP sync',
      ],
    },
    {
      id: 4,
      name: 'Business',
      displayName: 'Business',
      description: 'For operations teams managing complex environments',
      monthlyPrice: 799,
      annualPrice: 7990,
      serverLimit: 5000,
      userLimit: 25,
      features: [
        'Everything in Professional',
        'Azure cloud discovery',
        'Intune integration',
        'CIS compliance benchmarks',
        'SQL Server analysis',
        'SSO (Azure AD / Entra ID)',
      ],
    },
    {
      id: 5,
      name: 'Enterprise',
      displayName: 'Enterprise',
      description: 'Full platform with enterprise architecture capabilities',
      monthlyPrice: null,
      annualPrice: null,
      serverLimit: -1, // Unlimited
      userLimit: -1,   // Unlimited
      features: [
        'Everything in Business',
        'FactSheets (EA)',
        'Business capabilities',
        'Logical architecture diagram',
        'LeanIX integration',
        'ServiceNow sync',
        'AI-powered insights',
      ],
    },
  ];

  return NextResponse.json(tiers);
}
