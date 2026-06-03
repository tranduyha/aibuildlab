import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { buildService } from "@/services/build.service";
import { comparisonService } from "@/services/comparison.service";
import { projectService } from "@/services/project.service";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projectService.listProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
  }));
  const comparisonPages = comparisonService.getComparisonStaticParams().map(({ slug }) => ({
    url: `${SITE_URL}/compare/${slug}`,
    lastModified: new Date(),
  }));
  const buildPages = buildService.getBuildStaticParams().map(({ slug }) => ({
    url: `${SITE_URL}/builds/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/tools/vram-calculator`, lastModified: new Date() },
    { url: `${SITE_URL}/gpu`, lastModified: new Date() },
    { url: `${SITE_URL}/compare`, lastModified: new Date() },
    { url: `${SITE_URL}/builds`, lastModified: new Date() },
    { url: `${SITE_URL}/guides`, lastModified: new Date() },
    { url: `${SITE_URL}/guides/cloud-gpu-vs-local-gpu`, lastModified: new Date() },
    { url: `${SITE_URL}/projects`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    ...projectPages,
    ...comparisonPages,
    ...buildPages,
  ];
}
