import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Access Your OmniGaze Account",
  description:
    "Sign in to your OmniGaze account using your license key. Access your dashboard, manage subscriptions, and view your infrastructure data.",
  openGraph: {
    title: "Login to OmniGaze",
    description: "Access your OmniGaze account and dashboard.",
    url: "https://omnigaze.com/login",
  },
  alternates: {
    canonical: "https://omnigaze.com/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
