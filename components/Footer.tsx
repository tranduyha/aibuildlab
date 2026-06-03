import Link from "next/link";
import Logo from "@/components/Logo";
import { siteSettingsService } from "@/services/site-settings.service";

const footerExtraLinks = [
  { label: "Cloud GPU", href: "/cloud-gpu" },
] as const;

export default function Footer() {
  const settings = siteSettingsService.getSettings();
  const navigation = siteSettingsService
    .getNavigation()
    .filter((item) => item.href !== "/");

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
          <div className="footer-links">
            {navigation.map((item) => (
              <Link key={item.id} href={item.href}>
                {item.label}
              </Link>
            ))}
            {footerExtraLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
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
