import navigationData from "@/data/navigation.json";
import settingsData from "@/data/site-settings.json";
import type { NavigationItem, SiteSettings } from "@/types";

export const siteSettingsRepository = {
  getNavigation(): NavigationItem[] {
    return navigationData as NavigationItem[];
  },

  getSettings(): SiteSettings {
    return settingsData as SiteSettings;
  },
};
