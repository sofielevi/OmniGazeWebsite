import { MetadataRoute } from "next";

// Required for static export
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/checkout/",
        "/api/",
        "/verify/",
        "/register/success/",
      ],
    },
    sitemap: "https://omnigaze.com/sitemap.xml",
    host: "https://omnigaze.com",
  };
}
