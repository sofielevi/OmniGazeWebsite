import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Visibility Quiz - Test Your Infrastructure Knowledge | OmniGaze",
  description:
    "Take our free 2-minute quiz and find out how well you understand your IT infrastructure. Get personalized recommendations.",
  keywords: [
    "IT visibility quiz",
    "infrastructure assessment",
    "CMDB maturity",
    "IT visibility test",
    "enterprise architecture quiz",
    "shadow IT assessment",
  ],
  openGraph: {
    title: "What's Your IT Visibility Score? - Free Quiz",
    description:
      "8 questions • 2 minutes • Free. Find out how well you understand your IT infrastructure.",
    url: "https://omnigaze.com/tools/visibility-quiz",
    images: [
      {
        url: "/og-visibility-quiz.png",
        width: 1200,
        height: 630,
        alt: "OmniGaze IT Visibility Quiz",
      },
    ],
  },
  alternates: {
    canonical: "https://omnigaze.com/tools/visibility-quiz",
  },
};

export default function VisibilityQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
