export const siteConfig = {
  name: "OmniGaze",
  tagline: "Applied Observability",
  description: "Auto-discover your servers, map dependencies, and bridge the gap between IT operations and enterprise architecture.",
  url: "https://omnigaze.com",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.omnigaze.com",

  // Download configuration - update when releasing new versions
  download: {
    version: "3.1.2",
    buildNumber: "1436",
    releaseDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    fileSize: "97 MB",
    // Primary download URL - staging site for now
    url: "https://fingerscrossed.omnigaze.com/install/OmniGazeSetup.exe",
    // Fallback to Portal API if available
    fallbackUrl: "https://portal.omnigaze.com/api/download/installer",
    // System requirements
    requirements: {
      os: ["Windows 10 (64-bit)", "Windows 11", "Windows Server 2016+"],
      processor: "2 GHz dual-core or better (x64)",
      memory: "4 GB RAM minimum, 8 GB recommended",
      disk: "500 MB available space",
    },
  },

  links: {
    docs: "/docs",
    pricing: "/pricing",
    features: "/features",
    download: "/download",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
  },

  nav: [
    { label: "Features", href: "/features" },
    { label: "Why", href: "/why" },
    { label: "Pricing", href: "/pricing" },
    { label: "My Account", href: "/dashboard" },
  ],

  footer: {
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs/api/rest" },
      { label: "Team", href: "/team" },
      { label: "Support", href: "/support" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    copyright: `© ${new Date().getFullYear()} OmniGaze. Built with care in Denmark.`,
  },

  stats: [
    { value: "10min", label: "Setup Time" },
    { value: "50+", label: "Free Servers" },
    { value: "Zero", label: "Agents Required" },
  ],
};

// Pyramid layer configuration - core differentiator
export const pyramidLayers = [
  {
    id: "strategy",
    name: "Strategy",
    count: "1-4 initiatives",
    color: "#7c6aef",
    features: ["AI Insights", "Executive Dashboards", "Custom Reporting"],
    tier: "Enterprise",
  },
  {
    id: "value-streams",
    name: "Value Streams",
    count: "10-20 value streams",
    ratio: "5:1",
    color: "#8b7cf5",
    features: ["Value Stream Mapping", "Azure Cloud Discovery", "SSO (EntraId)"],
    tier: "Business",
  },
  {
    id: "capabilities",
    name: "Business Capabilities",
    count: "100-200 capabilities",
    ratio: "20:1",
    color: "#9d91f8",
    features: [
      "Vulnerability Detection (risks aggregated to capabilities)",
      "Cost Aggregation to Capabilities",
      "KPIs on Business Capabilities",
      "Compliance Frameworks (ISO27001)",
      "OData API",
    ],
    tier: "Professional",
  },
  {
    id: "applications",
    name: "Applications",
    count: "1,000-2,000 applications",
    ratio: "5:1",
    color: "#b0a6fb",
    features: [
      "Process Discovery → Logical Applications",
      "Software Inventory",
      "3D Visualization",
      "Scheduled Scans",
    ],
    tier: "Starter",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    count: "10,000+ assets",
    ratio: "10:1",
    color: "#1e3a8a",
    features: [
      "Network Discovery",
      "Asset Inventory",
      "100,000+ Running Software Discovered",
      "CMDB",
      "Tag Management",
    ],
    tier: "Community",
  },
];

// Pricing tiers
export const pricingTiers = [
  {
    id: "community",
    name: "Community",
    displayName: "Community",
    description: "Free Forever",
    monthlyPrice: 0,
    annualPrice: 0,
    serverLimit: 50,
    userLimit: 1,
    features: [
      "Network discovery",
      "Asset inventory",
      "Server diagram (2D)",
      "Tag management",
    ],
    disabledFeatures: ["Process mapping", "API access"],
    cta: "Download Free",
    ctaVariant: "secondary" as const,
  },
  {
    id: "starter",
    name: "Starter",
    displayName: "Starter",
    description: "Small Teams",
    monthlyPrice: 99,
    annualPrice: 990,
    serverLimit: 200,
    userLimit: 3,
    features: [
      "Everything in Community",
      "Process discovery → Applications",
      "Software inventory",
      "3D visualization",
      "Connection analysis",
      "Scheduled scans",
      "CSV export",
    ],
    cta: "Start 14-Day Trial",
    ctaVariant: "secondary" as const,
  },
  {
    id: "professional",
    name: "Professional",
    displayName: "Professional",
    description: "Growing Teams",
    monthlyPrice: 349,
    annualPrice: 3490,
    serverLimit: 1000,
    userLimit: 10,
    features: [
      "Everything in Starter",
      "OData API access",
      "Vulnerability detection (aggregated to capabilities)",
      "Cost aggregation to capabilities",
      "KPIs on capabilities",
      "Compliance (ISO27001)",
      "AD/LDAP sync",
    ],
    featured: true,
    cta: "Start 14-Day Trial",
    ctaVariant: "primary" as const,
  },
  {
    id: "business",
    name: "Business",
    displayName: "Business",
    description: "Operations",
    monthlyPrice: 799,
    annualPrice: 7990,
    serverLimit: 5000,
    userLimit: 25,
    features: [
      "Everything in Professional",
      "Azure cloud discovery",
      "CIS compliance",
      "SQL Server analysis",
      "SSO (EntraId)",
      "Priority support",
    ],
    cta: "Start 14-Day Trial",
    ctaVariant: "secondary" as const,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    displayName: "Enterprise",
    description: "Full Platform",
    monthlyPrice: null,
    annualPrice: null,
    serverLimit: -1, // Unlimited
    userLimit: -1,   // Unlimited
    features: [
      "Everything in Business",
      "FactSheets (EA)",
      "LeanIX integration",
      "ServiceNow sync",
      "AI-powered insights",
      "Dedicated CSM",
    ],
    cta: "Contact Sales",
    ctaVariant: "secondary" as const,
  },
];
