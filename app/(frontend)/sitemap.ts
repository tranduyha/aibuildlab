import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { cloudGpuProviderRepository } from "@/repositories/cloud-gpu-provider.repository";
import { gpuRepository } from "@/repositories/gpu.repository";
import { aiModelService } from "@/services/ai-model.service";
import { buildService } from "@/services/build.service";
import { comparisonService } from "@/services/comparison.service";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const gpuPages = gpuRepository.getAllGpus().map((gpu) => ({
    url: `${SITE_URL}/gpu/${gpu.slug}`,
    lastModified: gpu.lastVerifiedAt ? new Date(gpu.lastVerifiedAt) : new Date(),
  }));
  const comparisonPages = comparisonService.getComparisonStaticParams().map(({ slug }) => ({
    url: `${SITE_URL}/compare/${slug}`,
    lastModified: new Date(),
  }));
  const buildPages = buildService.getBuildStaticParams().map(({ slug }) => ({
    url: `${SITE_URL}/builds/${slug}`,
    lastModified: new Date(),
  }));
  const cloudGpuProviderPages = cloudGpuProviderRepository.getCloudGpuProviderSlugs().map((slug) => ({
    url: `${SITE_URL}/cloud-gpu/${slug}`,
    lastModified: new Date(),
  }));
  const modelVramPages = aiModelService.listModelVramPages().map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: page.model.lastVerifiedAt ? new Date(page.model.lastVerifiedAt) : new Date(),
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/tools/vram-calculator`, lastModified: new Date() },
    { url: `${SITE_URL}/gpu`, lastModified: new Date() },
    { url: `${SITE_URL}/compare`, lastModified: new Date() },
    { url: `${SITE_URL}/builds`, lastModified: new Date() },
    { url: `${SITE_URL}/cloud-gpu`, lastModified: new Date() },
    { url: `${SITE_URL}/guides`, lastModified: new Date() },
    { url: `${SITE_URL}/guides/cloud-gpu-vs-local-gpu`, lastModified: new Date() },
    { url: `${SITE_URL}/guides/image-generation-vram-planning`, lastModified: new Date() },
    { url: `${SITE_URL}/guides/local-ai-vs-ai-saas`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    ...gpuPages,
    ...comparisonPages,
    ...buildPages,
    ...cloudGpuProviderPages,
    ...modelVramPages,
  ];
}
