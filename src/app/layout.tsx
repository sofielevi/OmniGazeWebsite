import type { Metadata } from "next";
import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OmniGaze - See Your Infrastructure Clearly",
    template: "%s | OmniGaze",
  },
  description: "Auto-discover your servers, map dependencies, and bridge the gap between IT operations and enterprise architecture. From infrastructure to strategy.",
  keywords: ["infrastructure discovery", "CMDB", "enterprise architecture", "IT visualization", "business capabilities", "value stream mapping", "server discovery", "network mapping"],
  authors: [{ name: "OmniGaze" }],
  creator: "OmniGaze",
  metadataBase: new URL("https://omnigaze.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omnigaze.com",
    siteName: "OmniGaze",
    title: "OmniGaze - From Servers to Strategy",
    description: "The only platform that connects infrastructure discovery to strategic business value. Applied Observability.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmniGaze - Applied Observability",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniGaze - Applied Observability",
    description: "From 10,000+ infrastructure assets to 1-4 strategic initiatives.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sourceSerif.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
