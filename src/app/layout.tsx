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
  publisher: "OmniGaze",
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
    creator: "@omnigaze",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when ready
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

// JSON-LD structured data for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OmniGaze",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Windows",
  description:
    "Infrastructure discovery and enterprise architecture platform. Auto-discover servers, map dependencies, and bridge IT operations to strategic planning.",
  url: "https://omnigaze.com",
  offers: [
    {
      "@type": "Offer",
      name: "Community",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier with 50 servers",
    },
    {
      "@type": "Offer",
      name: "Starter",
      price: "99",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "99",
        priceCurrency: "USD",
        billingDuration: "P1M",
      },
      description: "200 servers, 3 users, 3D visualization",
    },
    {
      "@type": "Offer",
      name: "Professional",
      price: "349",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "349",
        priceCurrency: "USD",
        billingDuration: "P1M",
      },
      description: "1,000 servers, 10 users, API access",
    },
    {
      "@type": "Offer",
      name: "Business",
      price: "799",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "799",
        priceCurrency: "USD",
        billingDuration: "P1M",
      },
      description: "5,000 servers, 25 users, Azure discovery",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
  publisher: {
    "@type": "Organization",
    name: "OmniGaze",
    url: "https://omnigaze.com",
    logo: {
      "@type": "ImageObject",
      url: "https://omnigaze.com/logo.png",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "DK",
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OmniGaze",
  url: "https://omnigaze.com",
  logo: "https://omnigaze.com/logo.png",
  description:
    "OmniGaze provides infrastructure discovery and enterprise architecture solutions, connecting IT operations to strategic business value.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "Denmark",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "sales@omnigaze.com",
  },
  sameAs: [
    // Add social media links when available
    // "https://twitter.com/omnigaze",
    // "https://linkedin.com/company/omnigaze",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${sourceSerif.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
