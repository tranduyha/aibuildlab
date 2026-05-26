export interface NavigationItem {
  id: number;
  label: string;
  href: string;
}

export interface SiteSettings {
  name: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  contactEmail: string;
  repositoryUrl: string;
}
