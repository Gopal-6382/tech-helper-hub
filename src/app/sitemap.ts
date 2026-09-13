import { MetadataRoute } from "next";
import { siteConfig } from "@/frontend/config/site";

// Optional: Fetch dynamic database routes (e.g., public profiles, articles, categories)
async function getDynamicRoutes() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/public/professionals`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );

    if (!res.ok) return [];

    const items: Array<{ id: string; updatedAt: string }> = await res.json();

    return items.map((item) => ({
      url: `${siteConfig.url}/professionals/${item.id}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch dynamic sitemap routes:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/professionals`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Fetch dynamic content routes
  const dynamicRoutes = await getDynamicRoutes();

  return [...staticRoutes, ...dynamicRoutes];
}
