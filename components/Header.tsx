import Link from "next/link";
import Logo from "@/components/Logo";
import MainNav from "@/components/MainNav";
import { siteSettingsService } from "@/services/site-settings.service";

export default function Header() {
  const settings = siteSettingsService.getSettings();
  const navigation = siteSettingsService.getNavigation();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo
          siteName={settings.name}
          text={settings.logo.text}
          shortText={settings.logo.shortText}
        />
        <MainNav items={navigation} />
        <Link className="header-action" href="/tools/vram-calculator">
          <span className="header-action-long">Try VRAM Calculator</span>
          <span className="header-action-short">Calculator</span>
        </Link>
      </div>
    </header>
  );
}
