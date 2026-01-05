import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator - What Does Your IT Darkness Cost? | OmniGaze",
  description:
    "Calculate the hidden cost of poor IT visibility. Free calculator showing potential savings with automated infrastructure discovery.",
  keywords: [
    "IT ROI calculator",
    "infrastructure costs",
    "CMDB ROI",
    "IT visibility cost",
    "shadow IT calculator",
    "enterprise architecture ROI",
  ],
  openGraph: {
    title: "What Does Your IT Darkness Cost? - Free ROI Calculator",
    description:
      "Calculate your organization's hidden IT costs in 2 minutes. Most underestimate by 3-5x.",
    url: "https://omnigaze.com/tools/roi-calculator",
    images: [
      {
        url: "/og-roi-calculator.png",
        width: 1200,
        height: 630,
        alt: "OmniGaze ROI Calculator",
      },
    ],
  },
  alternates: {
    canonical: "https://omnigaze.com/tools/roi-calculator",
  },
};

export default function ROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
