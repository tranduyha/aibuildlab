import { siteSettingsService } from "@/services/site-settings.service";

const settings = siteSettingsService.getSettings();

export const SITE_NAME = settings.name;
export const SITE_DESCRIPTION = settings.description;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
