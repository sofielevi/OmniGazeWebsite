import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download OmniGaze for Windows - Free Infrastructure Discovery",
  description:
    "Request your free OmniGaze Community license for Windows 10, 11, and Server 2016+. Agentless infrastructure discovery, network scanning, and 3D visualization. Up to 50 servers free.",
  keywords: [
    "download OmniGaze",
    "infrastructure discovery software",
    "free CMDB tool",
    "network discovery Windows",
    "IT asset management download",
    "server discovery tool",
    "agentless scanning software",
  ],
  openGraph: {
    title: "Download OmniGaze - Free Infrastructure Discovery for Windows",
    description:
      "Get OmniGaze free. Auto-discover servers, map dependencies, visualize in 3D. No agents required. Windows 10, 11, Server 2016+.",
    url: "https://omnigaze.com/download",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Download OmniGaze for Windows",
      },
    ],
  },
  alternates: {
    canonical: "https://omnigaze.com/download",
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
