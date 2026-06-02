import Link from "next/link";

export default function ComparisonCta() {
  return (
    <section className="tool-section related-section">
      <p className="eyebrow">Next step</p>
      <h2>Continue planning with related tools</h2>
      <div className="related-links">
        <Link href="/tools/vram-calculator">
          Start with VRAM Calculator <span>&rarr;</span>
        </Link>
        <Link href="/gpu">
          Review GPU profiles <span>&rarr;</span>
        </Link>
        <Link href="/builds">
          Explore build planning pages <span>&rarr;</span>
        </Link>
        <Link href="/guides">
          Read practical guides <span>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
