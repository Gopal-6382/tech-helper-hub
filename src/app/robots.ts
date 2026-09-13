import { MetadataRoute } from "next";
import { siteConfig } from "@/frontend/config/site";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_APP_ENV === "production";

  return {
    rules: [
      {
        userAgent: "*",
        allow: isProduction ? "/" : [],
        disallow: isProduction
          ? ["/api/", "/dashboard/", "/(auth)/", "/admin/", "/settings/"]
          : "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
