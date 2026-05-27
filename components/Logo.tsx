import Link from "next/link";

interface LogoProps {
  siteName: string;
  text: string;
  shortText: string;
}

export default function Logo({ siteName, text, shortText }: LogoProps) {
  const markText = shortText.trim().slice(0, 3).toUpperCase();

  return (
    <Link className="brand" href="/" aria-label={`Go to ${siteName} homepage`}>
      <span className="brand-mark" aria-hidden="true">
        <svg className="brand-chip" viewBox="0 0 44 44">
          <rect className="brand-chip-surface" x="5" y="5" width="34" height="34" rx="10" />
          <path className="brand-chip-pins" d="M15 2v4m7-4v4m7-4v4M15 38v4m7-4v4m7-4v4M2 15h4m-4 7h4m-4 7h4m32-14h4m-4 7h4m-4 7h4" />
          <path className="brand-chip-track" d="M12 13h20M12 32h20" />
          <text className="brand-chip-text" x="22" y="26" textAnchor="middle">
            {markText}
          </text>
        </svg>
      </span>
      <span className="brand-text">{text}</span>
    </Link>
  );
}
