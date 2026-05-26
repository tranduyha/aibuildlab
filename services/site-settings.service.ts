import { siteSettingsRepository } from "@/repositories/site-settings.repository";

export const siteSettingsService = {
  getNavigation() {
    return siteSettingsRepository.getNavigation();
  },

  getSettings() {
    return siteSettingsRepository.getSettings();
  },
};
