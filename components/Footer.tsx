import Link from "next/link";
import Logo from "@/components/Logo";
import { siteSettingsService } from "@/services/site-settings.service";

export default function Footer() {
  const settings = siteSettingsService.getSettings();
  const navigation = siteSettingsService
    .getNavigation()
    .filter((item) => item.href !== "/");
  const navigationEntries = new Map(
    navigation.flatMap((item) => [item, ...(item.children ?? [])]).map((item) => [item.href, item]),
  );
  const footerGroups = {
    plan: [
      { label: "VRAM Calculator", href: "/tools/vram-calculator" },
      { label: "Local AI Builds", href: "/builds" },
      { label: "Cloud GPU", href: "/cloud-gpu" },
    ],
    hardware: [
      { label: "Browse GPUs", href: "/gpu" },
      { label: "Compare GPUs", href: "/compare" },
    ],
    learn: [
      { label: "Guides", href: "/guides" },
      { label: "About", href: "/about" },
    ],
  } as const;

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo
            siteName={settings.name}
            text={settings.logo.text}
            shortText={settings.logo.shortText}
          />
          <p className="footer-tagline">{settings.tagline}</p>
          <p className="muted footer-description">{settings.trust.editorialNote}</p>
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          <h2>Explore</h2>
          <div className="flex flex-col gap-1.5">
            <div className="footer-links">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Plan</p>
              <div className="footer-links gap-0">
                {footerGroups.plan.map((item) => (
                  <Link
                    key={item.href}
                    href={navigationEntries.get(item.href)?.href ?? item.href}
                    className="text-sm leading-5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="footer-links">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Hardware</p>
              <div className="footer-links gap-0">
                {footerGroups.hardware.map((item) => (
                  <Link
                    key={item.href}
                    href={navigationEntries.get(item.href)?.href ?? item.href}
                    className="text-sm leading-5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="footer-links">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Learn</p>
              <div className="footer-links gap-0">
                {footerGroups.learn.map((item) => (
                  <Link
                    key={item.href}
                    href={navigationEntries.get(item.href)?.href ?? item.href}
                    className="text-sm leading-5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <div className="footer-trust">
          <h2>Transparency</h2>
          <p>{settings.trust.affiliateDisclosure}</p>
          <p>{settings.trust.dataDisclaimer}</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {settings.name}. {settings.trust.purchaseReminder}
        </p>
      </div>
    </footer>
  );
}
