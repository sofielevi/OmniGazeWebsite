import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Present Technical Risk to the Board | OmniGaze",
  description:
    "A practical guide for IT leaders and enterprise architects. Learn the 5 fatal mistakes, the 'So What' chain, and get a ready-to-use one-page board template. Based on McKinsey, Gartner, and NACD frameworks.",
  keywords: [
    "board presentation",
    "technical risk",
    "enterprise architecture",
    "CIO board",
    "technology risk reporting",
    "tech debt board",
    "FAIR risk quantification",
    "IT governance",
  ],
  openGraph: {
    title: "How to Present Technical Risk to the Board",
    description:
      "Stop losing credibility in the boardroom. A practical guide for translating technology risk into business language that boards understand and act on.",
    url: "https://omnigaze.com/resources/board-template",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "How to Present Technical Risk to the Board - OmniGaze Guide",
      },
    ],
  },
};

export default function BoardTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
