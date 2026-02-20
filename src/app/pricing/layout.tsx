import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Plans That Grow With You",
  description:
    "OmniGaze plans: Free Community tier with 50 servers. Contact sales for paid tier pricing across Starter, Professional, Business, and Enterprise plans.",
  keywords: [
    "OmniGaze pricing",
    "infrastructure discovery pricing",
    "CMDB software cost",
    "enterprise architecture pricing",
    "IT asset management pricing",
    "free infrastructure discovery",
    "server discovery pricing",
  ],
  openGraph: {
    title: "OmniGaze Pricing - Start Free, Scale When Ready",
    description:
      "Choose the right OmniGaze plan: Free tier with 50 servers, or contact sales to unlock more capacity and features.",
    url: "https://omnigaze.com/pricing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmniGaze Pricing Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniGaze Pricing - Free Tier Available",
    description:
      "Start free with 50 servers. Contact sales to unlock 3D visualization, API access, and enterprise features.",
  },
  alternates: {
    canonical: "https://omnigaze.com/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
