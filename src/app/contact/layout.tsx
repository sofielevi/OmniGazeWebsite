import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sales - Get a Quote or Book a Demo",
  description:
    "Contact the OmniGaze team for pricing, quotes, or to schedule a personalized demo. We respond within 1 business day.",
  openGraph: {
    title: "Contact OmniGaze - Get a Quote or Book a Demo",
    description:
      "Get pricing for OmniGaze plans or schedule a 30-minute demo with our team.",
    url: "https://omnigaze.com/contact",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact OmniGaze",
      },
    ],
  },
  alternates: {
    canonical: "https://omnigaze.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
