import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
