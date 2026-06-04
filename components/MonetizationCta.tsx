import Link from "next/link";
import type { MonetizationPlacementListItem } from "@/services/monetization-placement.service";

interface MonetizationCtaProps {
  item: MonetizationPlacementListItem;
}

const toneClasses = {
  disclosure: "border-slate-200 bg-slate-50 text-slate-700",
  neutral: "border-slate-200 bg-white text-slate-900",
  primary: "border-sky-700 bg-sky-700 text-white",
  secondary: "border-slate-200 bg-white text-slate-900",
} as const;

export default function MonetizationCta({ item }: MonetizationCtaProps) {
  const { placement, disclosure } = item;
  const toneClass = toneClasses[placement.tone];

  return (
    <aside className={`rounded-lg border p-5 shadow-sm ${toneClass}`} aria-label={placement.title}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Planning CTA</p>
      <h2 className="mt-2 text-lg font-semibold tracking-normal">{placement.title}</h2>
      <p className="mt-2 text-sm leading-6 opacity-85">{placement.description}</p>
      {placement.href ? (
        <Link
          className="mt-4 inline-flex w-fit items-center rounded-md border border-current px-3 py-2 text-sm font-semibold transition hover:opacity-80"
          href={placement.href}
        >
          {placement.ctaLabel} <span className="ml-2" aria-hidden="true">-&gt;</span>
        </Link>
      ) : (
        <span className="mt-4 inline-flex w-fit items-center rounded-md border border-current px-3 py-2 text-sm font-semibold opacity-80">
          {placement.ctaLabel}
        </span>
      )}
      <p className="mt-3 text-xs leading-5 opacity-75">{disclosure}</p>
    </aside>
  );
}
