import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { projectService } from "@/services/project.service";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projectService.listProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/projects`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    ...projectPages,
  ];
}
