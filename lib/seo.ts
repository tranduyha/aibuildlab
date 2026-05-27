import type { Metadata } from "next";
import { siteSettingsService } from "@/services/site-settings.service";

export interface BuildMetadataInput {
  title?: string;
  description?: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
}

export function getSiteSettings() {
  return siteSettingsService.getSettings();
}

export function buildPageTitle(pageTitle?: string): string {
  const { name } = getSiteSettings();
  return pageTitle ? `${pageTitle} | ${name}` : name;
}

export function buildCanonicalUrl(path: string): string {
  const { siteUrl } = getSiteSettings();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteUrl).toString();
}

export const buildCanonicalPath = buildCanonicalUrl;

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: BuildMetadataInput): Metadata {
  const settings = getSiteSettings();
  const pageTitle = buildPageTitle(title);
  const pageDescription = description ?? settings.description;
  const canonicalUrl = buildCanonicalUrl(path);
  const socialImage = image ?? settings.defaultOgImage;

  return {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type,
      url: canonicalUrl,
      siteName: settings.name,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

const settings = getSiteSettings();

export const SITE_NAME = settings.name;
export const SITE_DESCRIPTION = settings.description;
export const SITE_URL = settings.siteUrl;
