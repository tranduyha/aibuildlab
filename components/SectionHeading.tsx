import Link from "next/link";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = "View all",
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {href && <Link href={href}>{linkLabel} &rarr;</Link>}
    </div>
  );
}
