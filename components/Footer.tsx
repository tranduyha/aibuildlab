import Link from "next/link";
import { siteSettingsService } from "@/services/site-settings.service";

export default function Footer() {
  const settings = siteSettingsService.getSettings();

  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <Link className="brand" href="/">
            <span className="brand-mark">AI</span>
            <span>{settings.name}</span>
          </Link>
          <p className="muted footer-description">{settings.description}</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
          <a href={settings.repositoryUrl} target="_blank" rel="noreferrer">
            GitHub repository
          </a>
        </div>
      </div>
    </footer>
  );
}
