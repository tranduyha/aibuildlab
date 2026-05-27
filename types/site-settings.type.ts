export interface NavigationItem {
  id: number;
  label: string;
  href: string;
}

export interface SiteSettings {
  name: string;
  shortName: string;
  siteUrl: string;
  domain: string;
  description: string;
  tagline: string;
  logo: {
    type: "text";
    text: string;
    shortText: string;
  };
  theme: {
    font: string;
    accent: string;
    radius: string;
  };
  trust: {
    editorialNote: string;
    dataDisclaimer: string;
    affiliateDisclosure: string;
    planningNote: string;
    purchaseReminder: string;
  };
  defaultOgImage: string | null;
  heroTitle: string;
  heroDescription: string;
  contactEmail: string;
}
