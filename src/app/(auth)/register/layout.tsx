import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Create Your Free OmniGaze Account",
  description:
    "Create your free OmniGaze account. Start with 50 servers at no cost. Business email required. No credit card needed.",
  openGraph: {
    title: "Register for OmniGaze - Free Infrastructure Discovery",
    description:
      "Create your account and start discovering your infrastructure today. Free tier includes 50 servers.",
    url: "https://omnigaze.com/register",
  },
  alternates: {
    canonical: "https://omnigaze.com/register",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
