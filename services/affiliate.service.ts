import { siteSettingsService } from "@/services/site-settings.service";
import type { AffiliateCtaModel, AffiliateLinkConfig, SiteSettings } from "@/types";

interface AffiliateOwner {
  name: string;
  affiliate: AffiliateLinkConfig;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function canRenderAffiliateUrl(
  affiliate: AffiliateLinkConfig,
  settings: SiteSettings = siteSettingsService.getSettings(),
): boolean {
  return (
    settings.trust.affiliateDisclosureEnabled === true &&
    typeof affiliate.url === "string" &&
    affiliate.url.length > 0 &&
    isHttpUrl(affiliate.url)
  );
}

export function getInlineAffiliateCtaModel(
  owner: AffiliateOwner,
  settings: SiteSettings = siteSettingsService.getSettings(),
): AffiliateCtaModel | null {
  if (!canRenderAffiliateUrl(owner.affiliate, settings) || !owner.affiliate.url) {
    return null;
  }

  return {
    merchant: owner.name,
    href: owner.affiliate.url,
    disclosure: settings.trust.affiliateDisclosure,
  };
}

export const affiliateService = {
  canRenderAffiliateUrl,
  getInlineAffiliateCtaModel,
};
