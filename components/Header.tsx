import Link from "next/link";
import { siteSettingsService } from "@/services/site-settings.service";

export default function Header() {
  const settings = siteSettingsService.getSettings();
  const navigation = siteSettingsService.getNavigation();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label={`${settings.name} home`}>
          <span className="brand-mark">AI</span>
          <span>{settings.name}</span>
        </Link>
        <nav className="navigation" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.id} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="header-action" href={`mailto:${settings.contactEmail}`}>
          Contact
        </a>
      </div>
    </header>
  );
}
