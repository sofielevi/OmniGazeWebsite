import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free EA Templates - Application Portfolio, Infrastructure Inventory | OmniGaze",
  description:
    "Download free Excel templates for Enterprise Architecture: Application Portfolio Tracker, Infrastructure Inventory, Dependency Matrix and Business Capability Map.",
  keywords: [
    "EA templates",
    "application portfolio template",
    "infrastructure inventory excel",
    "dependency mapping template",
    "business capability map template",
    "CMDB template",
    "free IT templates",
  ],
  openGraph: {
    title: "Free EA Starter Kit - 4 Excel Templates",
    description:
      "Download free templates for Application Portfolio, Infrastructure Inventory, Dependency Mapping and Business Capabilities. Used by 5,000+ IT professionals.",
    url: "https://omnigaze.com/resources/templates",
    images: [
      {
        url: "/og-templates.png",
        width: 1200,
        height: 630,
        alt: "OmniGaze EA Starter Kit Templates",
      },
    ],
  },
  alternates: {
    canonical: "https://omnigaze.com/resources/templates",
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
