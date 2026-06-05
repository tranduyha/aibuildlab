import { getInlineAffiliateCtaModel } from "@/services/affiliate.service";
import type { AffiliateLinkConfig, SiteSettings } from "@/types";

interface AffiliateCtaProps {
  affiliate: AffiliateLinkConfig;
  ctaLabel?: string;
  entitySlug: string;
  entityType: "cloud-gpu-provider" | "gpu" | "ai-tool" | "build-gpu-candidate" | "comparison-gpu";
  merchant: string;
  placement: string;
  settings: SiteSettings;
  variant?: "full" | "compact";
}

export default function AffiliateCta({
  affiliate,
  ctaLabel = "Visit partner site",
  entitySlug,
  entityType,
  merchant,
  placement,
  settings,
  variant = "full",
}: AffiliateCtaProps) {
  const model = getInlineAffiliateCtaModel({ name: merchant, affiliate }, settings);

  if (!model) {
    return null;
  }

  if (variant === "compact") {
    return (
      <aside
        className="affiliate-cta affiliate-cta-compact"
        aria-label={`${model.merchant} partner link`}
      >
        <div>
          <p className="affiliate-cta-kicker">Partner link</p>
          <h3 className="affiliate-cta-title">{model.merchant}</h3>
        </div>
        <a
          className="affiliate-cta-button"
          data-affiliate-entity={entityType}
          data-affiliate-placement={placement}
          data-affiliate-slug={entitySlug}
          href={model.href}
          rel="nofollow sponsored noopener"
          target="_blank"
        >
          {ctaLabel} <span className="ml-2" aria-hidden="true">-&gt;</span>
        </a>
        <p className="affiliate-cta-disclosure">{model.disclosure}</p>
      </aside>
    );
  }

  return (
    <aside className="affiliate-cta" aria-label={`${model.merchant} partner link`}>
      <div className="affiliate-cta-copy">
        <p className="affiliate-cta-kicker">Partner link</p>
        <h2 className="affiliate-cta-title">{model.merchant}</h2>
        <p className="affiliate-cta-note">
          Use this after checking specs, compatibility, and current seller details.
        </p>
      </div>
      <a
        className="affiliate-cta-button"
        data-affiliate-entity={entityType}
        data-affiliate-placement={placement}
        data-affiliate-slug={entitySlug}
        href={model.href}
        rel="nofollow sponsored noopener"
        target="_blank"
      >
        {ctaLabel} <span className="ml-2" aria-hidden="true">-&gt;</span>
      </a>
      <p className="affiliate-cta-disclosure">{model.disclosure}</p>
    </aside>
  );
}
