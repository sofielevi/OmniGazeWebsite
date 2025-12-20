import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise - Custom Solutions for Large Organizations",
  description:
    "OmniGaze Enterprise: unlimited servers, unlimited users, SSO/SAML, dedicated support, on-premises deployment, and custom integrations. Built for scale.",
  keywords: [
    "OmniGaze enterprise",
    "enterprise infrastructure discovery",
    "large scale IT discovery",
    "enterprise CMDB",
    "on-premises deployment",
    "SSO SAML integration",
    "dedicated support",
  ],
  openGraph: {
    title: "OmniGaze Enterprise - Built for Scale",
    description:
      "Comprehensive infrastructure visibility for large organizations. Custom deployment, dedicated support, and enterprise-grade security.",
    url: "https://omnigaze.com/enterprise",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmniGaze Enterprise Solutions",
      },
    ],
  },
  alternates: {
    canonical: "https://omnigaze.com/enterprise",
  },
};

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
