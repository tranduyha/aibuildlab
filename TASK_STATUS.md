# TASK_STATUS.md

File này là trạng thái vận hành hiện tại của project. Codex/dev khác phải đọc file này trước khi làm tiếp.

## Project

`aibuildlab`

## Repository

https://github.com/tranduyha/aibuildlab.git

## Current Phase

Month 1 - Cloudflare-first SEO Utility MVP

## Current Goal

Biến project hiện tại thành website **AI Hardware Affiliate SEO Utility Platform** bản MVP, có thể public trên Cloudflare Pages, có nền SEO technical tốt và có thể scale sang tháng 2.

## Current Architecture

Project hiện đang dùng cấu trúc:

```txt
app/(frontend)/
components/
data/
lib/
repositories/
services/
types/
public/
```

Không dùng thư mục `src`.

## Last Known Status

- [x] Repo đã được tạo.
- [x] Next.js App Router đã có.
- [x] Có `app/(frontend)`.
- [x] Có `components`.
- [x] Có `data`.
- [x] Có `lib`.
- [x] Có `repositories`.
- [x] Có `services`.
- [x] Có `types`.
- [x] Có `AGENTS.md`.
- [ ] Có roadmap/checklist đã đồng bộ hoàn toàn với cấu trúc hiện tại.
- [x] Có data GPU ban đầu dưới dạng seed draft.
- [x] Có data AI model ban đầu dưới dạng seed draft.
- [x] Có comparison seed records dạng draft.
- [x] Có build seed records dạng draft.
- [x] Có guide seed records dạng draft.
- [x] Có VRAM calculator estimate page skeleton.
- [x] Co GPU profile page (skeleton Day 4).
- [x] Có comparison page.
- [x] Có build landing page.
- [x] Có guide pages.
- [x] Có image manifest.
- [x] Có Cloudflare Pages preview deploy tại `https://vramforge.pages.dev/`.
- [x] Có global site shell, brand config và trust/disclosure foundation.
- [x] Có visual image layer dùng manifest, service validation và component fallback.

## Current Day

Day 14 - SEO QA, disclosure cleanup, guide hub polish, and monetization helper hardening (2026-06-04).

## Today Scope

- Finish the Day 14 foundation audit before Month 2 scaling.
- Do not create `/ai-tools` or any new SEO pages.
- Keep affiliate disclosure hidden while `affiliateDisclosureEnabled` is false.
- Polish `/guides` hub without changing published guide cards.
- Harden monetization placement helpers so unsafe placements cannot render.
- Keep sitemap, robots, navigation, footer, metadata, H1, schema, and source-claim safety clean.
- Run `npm run data:validate`, `npm run lint`, and `npm run build`.

## Month 2 Readiness

Cluster A - Hardware / GPU / VRAM:
- Data/source cleanup should start with the 51 existing GPU source-field mapping warnings.
- Model VRAM page candidates should wait for source-backed calculator/model data quality.
- GPU, comparison, and build expansion candidates should be chosen from verified source coverage first.

Cluster B - Cloud GPU / AI infra:
- Cloud GPU guide candidates can expand only after provider data review.
- Provider records need recurring verification for terms, billing model notes, referral status, and source field coverage.

Cluster C - AI SaaS / software bridge:
- AI tool data should be reviewed before any public `/ai-tools` route exists.
- `/ai-tools` should only be created after data and guide readiness are clear.
- AI workstation software stack guide is a candidate, but should remain planning-oriented and source-aware.

## Done Today

- [x] Created branch `affiliate-inline-fields` from `dev`.
- [x] Chose inline affiliate schema: `affiliate: { "url": null }`.
- [x] Added inline affiliate objects to `data/gpus.json`, `data/cloud-gpu-providers.json`, and `data/ai-tools.json`.
- [x] Kept all inline affiliate URLs as `null`; no live affiliate URL was added.
- [x] Used `siteSettings.trust.affiliateDisclosureEnabled` as the global affiliate display toggle.
- [x] Added `types/affiliate.ts` and exported the shared affiliate types.
- [x] Added `services/affiliate.service.ts` with disclosure + URL render guards.
- [x] Added reusable `components/AffiliateCta.tsx` with neutral CTA copy and configured disclosure text.
- [x] Added full/compact affiliate CTA variants with stable `data-affiliate-*` tracking attributes.
- [x] Wired affiliate CTA into GPU and Cloud GPU detail pages; it returns `null` while disclosure is off or URL is null.
- [x] Added conditional affiliate CTA placements to comparison and build detail pages using resolved GPU records.
- [x] Kept affiliate CTAs off homepage, index pages, nav, footer navigation, breadcrumbs, source lists, and calculator results.
- [x] Polished affiliate CTA spacing, button contrast, vertical rhythm, and visual treatment with dedicated theme classes.
- [x] Restored affiliate CTA grids on comparison/build pages to a responsive card layout with three cards per row on desktop instead of full-width stacked cards.
- [x] Rechecked `/cloud-gpu` and `/cloud-gpu/[slug]` rounded borders; the `/cloud-gpu` hero and source-aware notice keep their original radius, remaining cloud cards/panels match the affiliate CTA 16px radius, and CTA buttons stay at 10px.
- [x] Updated repository guards for Cloud GPU providers and AI tools to require inline affiliate config.
- [x] Updated `scripts/validate-data.ts` for inline affiliate shape, valid URL checks, and official/program URL separation.
- [x] Ran `npm run data:validate` with 0 errors and 41 existing unrelated GPU warnings.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Confirmed static output does not render affiliate CTA copy or `data-affiliate-*` attributes while URLs are null and disclosure is disabled.
- [x] Re-ran `npm run lint` and `npm run build` after CTA visual polish.
- [x] Re-ran `npm run lint` and `npm run build` after rounded-border alignment.

- [x] Confirmed `affiliateDisclosureEnabled` remains `false` and `affiliateDisclosure` text is retained in config.
- [x] Confirmed footer and homepage only render affiliate disclosure when `settings.trust.affiliateDisclosureEnabled === true`.
- [x] Polished `/guides` hub by replacing numbered guide-hub blocks with dot/label planning cards.
- [x] Added monetization placement `intent` and `disabled` status support.
- [x] Added `getMonetizationPlacementById`, `getSafePlacementsForRoute`, and `getEnabledPlacementForRoute` to the monetization placement repository.
- [x] Added `isPlacementSafeToRender`, `getPlacementCtaModel`, `getSafePlacementsForRoute`, and `getPlacementTypeLabel` to the monetization placement service.
- [x] Updated `MonetizationCta` to return `null` for unsafe placements.
- [x] Hardened `scripts/validate-data.ts` for monetization placement intent/status/href/CTA safety.
- [x] Removed `Offer` schema and price `0` from the VRAM Calculator schema.
- [x] Confirmed sitemap includes `/guides/local-ai-vs-ai-saas`, `/cloud-gpu`, and provider detail route generation.
- [x] Confirmed sitemap does not include `/ai-tools` and robots allows public routes.
- [x] Confirmed header top-level nav has no separate `Compare` or `Builds`; both remain under the `GPUs` submenu.
- [x] Confirmed Cloud GPU remains discoverable through header submenu and footer.
- [x] Confirmed footer keeps grouped `Plan`, `Hardware`, and `Learn` layout.
- [x] Confirmed key route templates have one H1 signal.
- [x] Confirmed no Product, Offer, Review, or AggregateRating schema remains in app/components/lib/services/repositories.
- [x] Confirmed current monetization helpers return 0 safe live CTA models because all placements remain reviewed/needs-review.
- [x] Ran `npm run data:validate` with 0 errors and 51 existing unrelated GPU warnings.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Added `data/monetization-placements.json` with 7 reviewed planning placements.
- [x] Added strict placement types in `types/monetization-placement.ts` and exported them from `types/index.ts`.
- [x] Added `repositories/monetization-placement.repository.ts`.
- [x] Added `services/monetization-placement.service.ts`.
- [x] Added reusable `components/MonetizationCta.tsx`.
- [x] Updated `scripts/validate-data.ts` to validate placement schema, enums, source mappings, internal-only hrefs, affiliateConfigured safety, unsafe field arrays, and blocked promotional wording.
- [x] Confirmed placements cover all planned placement types: `vram-calculator-result`, `gpu-profile-sidebar`, `comparison-verdict`, `build-page-components`, `cloud-vs-local-guide`, `ai-saas-guide`, and `footer-disclosure`.
- [x] Confirmed 0 external hrefs and 0 affiliate-configured placements.
- [x] Confirmed no public monetization route, nav link, or sitemap entry was created.
- [x] Ran `npm run data:validate` with 0 errors and 51 existing unrelated GPU warnings.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.
- [x] Audited Day 13 monetization placement scope: 7 placements, internal hrefs only, 0 external affiliate URLs, 0 affiliate-configured placements, no `/ai-tools` href, no broad `MonetizationCta` page insertion, and validator coverage confirmed.
- [x] Re-ran `npm run data:validate`, `npm run lint`, and `npm run build` for the Day 13 audit.

- [x] Added `app/(frontend)/guides/local-ai-vs-ai-saas/page.tsx`.
- [x] Added a published guide record for `local-ai-vs-ai-saas` in `data/guides.json`.
- [x] Added `/guides/local-ai-vs-ai-saas` to `app/(frontend)/sitemap.ts`.
- [x] Updated the guides hub so published guide topic labels are route-aware.
- [x] Used the Day 11 AI tool data layer only as source-aware planning context, not as a public `/ai-tools` index.
- [x] Added WebPage, BreadcrumbList, and FAQPage schema only.
- [x] Confirmed no `/ai-tools` nav link was added.
- [x] Ran `npm run data:validate` with 0 errors and 51 existing unrelated GPU warnings.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`; build output includes `/guides/local-ai-vs-ai-saas`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Increased Cloud GPU provider card grid spacing from `gap-5` to `gap-6`.
- [x] Updated provider card title headers to stay on one line with `truncate whitespace-nowrap`.
- [x] Added `min-w-0` to provider cards so one-line truncation works inside responsive grids.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Created `data/ai-tools.json` with 12 source-aware AI tool records.
- [x] Added strict AI tool types in `types/ai-tool.ts` and exported them from `types/index.ts`.
- [x] Added `repositories/ai-tool.repository.ts` with all requested repository functions.
- [x] Added `services/ai-tool.service.ts` with all requested source-aware notice and model functions.
- [x] Updated `scripts/validate-data.ts` to validate AI tool schema, enums, sources, affiliate URL rules, duplicate slugs, and blocked promotional wording.
- [x] Confirmed 12/12 records use official source-backed fields and `lastVerifiedAt`.
- [x] Confirmed 12/12 records keep `affiliateStatus: "unknown"` and `affiliateProgramUrl: null`.
- [x] Confirmed exact prices, availability, commission terms, rankings, ratings, benchmarks, and recommendations are not stored.
- [x] Confirmed no public `/ai-tools` route, sitemap entry, or nav link was created.
- [x] Ran `npm run data:validate` with 0 errors and 51 existing unrelated GPU warnings.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Updated `components/MainNav.tsx` so the parent submenu caret remains an upward arrow.
- [x] Removed open-state up/down rotation behavior.
- [x] Added a subtle vertical hover/focus movement on the caret.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Updated `components/MainNav.tsx` so the mobile `GPUs` parent button gets a hover/focus background like other menu items.
- [x] Updated mobile submenu child links so hover/focus uses the same subtle background instead of staying transparent.
- [x] Adjusted the parent label/caret layout so the arrow stays vertically centered with the text.
- [x] Updated hamburger-width `.nav-link` CSS in `app/(frontend)/theme.css` to use flex alignment.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Updated `components/MainNav.tsx` so mobile hamburger menu shows the `GPUs` submenu immediately when the menu opens.
- [x] Removed the separate mobile submenu toggle behavior from the `GPUs` parent item.
- [x] Restyled mobile submenu links to match parent menu links more closely without separate background blocks.
- [x] Re-centered the parent caret vertically by giving it a slightly larger alignment box.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Reset `.nav-link` button styling so the `GPUs` parent button matches normal nav links at desktop and hamburger widths.
- [x] Reset the open submenu state when the main hamburger menu is closed.
- [x] Checked later responsive CSS blocks for `.navigation` overrides after the hamburger menu rules.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Changed the wrapper between `Plan`, `Hardware`, and `Learn` groups from `gap-3` to `gap-2`.
- [x] Confirmed footer CSS stacks `footer-grid` to one column below `900px`.
- [x] Confirmed existing link spacing remains compact at `gap-0.5`.
- [x] Confirmed `Cloud GPU` appears once in the homepage footer export.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Reduced footer grid top/bottom padding in `app/(frontend)/theme.css`.
- [x] Reduced footer bottom copyright padding in `app/(frontend)/theme.css`.
- [x] Tightened vertical spacing between `Explore` groups and child links in `components/Footer.tsx`.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Changed `Explore` grouped links from a three-column grid to one vertical column.
- [x] Kept `Plan`, `Hardware`, and `Learn` group headings with child links directly underneath.
- [x] Kept existing footer link style and navigation targets.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Changed `Explore` groups to vertical blocks: `Plan`, `Hardware`, and `Learn`.
- [x] Moved each group link list directly under its group heading.
- [x] Changed `Hardware` link text from `GPUs` to `Browse GPUs` while keeping `/gpu`.
- [x] Reused the existing `footer-links` style so footer links match the original footer treatment more closely.
- [x] Confirmed `Cloud GPU` appears once in the homepage footer export.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Adjusted `Explore` group labels, link color, and spacing to feel closer to the surrounding footer sections.
- [x] Changed the `Learn` group so `About` sits on its own line below `Guides`.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Updated `components/Footer.tsx` so `Explore` uses grouped `Plan`, `Hardware`, and `Learn` sections with inline desktop links.
- [x] Kept grouped footer links compact on desktop and wrapping cleanly on smaller screens.
- [x] Kept brand/about footer text and transparency/source-aware text unchanged.
- [x] Confirmed `Cloud GPU` remains present once in the footer link groups.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Kept footer groups as `Plan`, `Hardware`, and `Learn`.
- [x] Adjusted `components/Footer.tsx` so grouped links use a lighter, more original-looking footer link treatment.
- [x] Kept link navigation and hover behavior on footer `a` tags.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Replaced the single long footer `Explore` list in `components/Footer.tsx` with grouped `Plan`, `Hardware`, and `Learn` sections.
- [x] Removed the temporary `footerExtraLinks` pattern because `Cloud GPU` is now part of the grouped footer.
- [x] Kept brand/about footer description unchanged.
- [x] Kept transparency/source-aware text unchanged.
- [x] Confirmed `Cloud GPU` appears once in the homepage footer export.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Removed top-level `Compare` and `Builds` from `data/navigation.json`.
- [x] Kept `Compare GPUs` and `Local AI Builds` under the `GPUs` submenu.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Read `AGENTS.md`, `TASK_STATUS.md`, `DAILY_LOG.md`, `docs/ROADMAP_THANG_1_2.md`, `components/Header.tsx`, `components/MainNav.tsx`, `data/navigation.json`, `/cloud-gpu`, `/gpu`, `/compare`, and `/builds` route files before editing.
- [x] Added nested `children` support to `NavigationItem`.
- [x] Added the recommended `GPUs` submenu in `data/navigation.json`: `Browse GPUs` to `/gpu`, `Compare GPUs` to `/compare`, `Cloud GPU Providers` to `/cloud-gpu`, and `Local AI Builds` to `/builds`.
- [x] Updated `MainNav` to render a desktop hover/focus submenu and mobile inline submenu using Tailwind utility classes only for the new submenu treatment.
- [x] Kept `Cloud GPU Providers` out of the top-level header navigation.
- [x] Preserved existing top-level links for Home, Tools, GPUs, Compare, Builds, Guides, and About.
- [x] Confirmed `/cloud-gpu` remains present in the static build output.
- [x] Confirmed no current brand/domain hardcode appears in `components/`, `app/(frontend)/`, `lib/`, `services/`, or `repositories/`.
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`; build output includes `/cloud-gpu` and `/cloud-gpu/[slug]` with 8 generated paths.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Confirmed `/cloud-gpu` renders cleanly with 8 provider cards from `cloudGpuProviderService.getCloudGpuProviderListItems()`.
- [x] Confirmed `/cloud-gpu/[slug]` renders 8 source-aware provider planning profiles with facts, grouped notices, sources, FAQ, related links, static params, metadata, and invalid-slug `notFound()` handling.
- [x] Polished provider cards by replacing heavy status badges with one subtle status/confidence line and keeping CTA buttons aligned at the bottom.
- [x] Polished `/cloud-gpu` hero copy to explain provider planning, VRAM-first context, no ranking, and no pricing-table intent.
- [x] Updated use-case count labels from bare numbers to provider-count labels.
- [x] Updated `CloudGpuProviderCta` so `Estimate VRAM first` is the primary CTA and guide/build links remain secondary.
- [x] Centered detail-page hero title, summary, and status pills while keeping facts and notices aligned for scanning.
- [x] Added a concise `How to use this profile` section to provider detail pages.
- [x] Added a footer Explore link to `/cloud-gpu` without adding Cloud GPU to the main nav.
- [x] Confirmed `/guides` and `/guides/cloud-gpu-vs-local-gpu` still link safely to `/cloud-gpu`.
- [x] Confirmed sitemap output includes `/cloud-gpu` and all 8 provider detail URLs.
- [x] Confirmed every provider slug from `data/cloud-gpu-providers.json` has a generated static detail page.
- [x] Confirmed `/cloud-gpu/runpod`, `/cloud-gpu/vast-ai`, `/cloud-gpu/lambda`, `/cloud-gpu/modal`, and `/cloud-gpu/replicate` export successfully.
- [x] Confirmed `/guides`, `/guides/cloud-gpu-vs-local-gpu`, `/tools/vram-calculator`, and `/builds` export successfully.
- [x] Confirmed unknown `affiliateStatus` providers do not have affiliate program URLs.
- [x] Confirmed no current brand/domain hardcode appears in `components/`, `app/(frontend)/`, `lib/`, `services/`, or `repositories/`.
- [x] Confirmed no `Product`, `Review`, `Offer`, `AggregateRating`, price, or availability schema was added.
- [x] Confirmed no provider ranking, exact price claims, current GPU availability claims, commission or recurring commission claims, affiliate spam, benchmark claims, tokens/s claims, or image-speed claims were added.
- [x] Ran `npm run data:validate` (0 errors, 51 existing GPU warnings unrelated to Day 10.5 Cloud GPU polish).
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`; build output includes `/cloud-gpu` and `/cloud-gpu/[slug]` with 8 generated paths.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Removed remaining outdated future/unpublished provider-page wording from Cloud GPU guide integration areas.
- [x] Updated `/guides/cloud-gpu-vs-local-gpu` workflow step 4 so `Review Cloud GPU provider profiles` is a safe secondary link to `/cloud-gpu`.
- [x] Updated the Cloud GPU guide provider note to state that source-aware provider profiles are now available as planning references.
- [x] Replaced the simple `/guides` related route link with a visible `Cloud GPU provider profiles` card and description.
- [x] Confirmed footer Explore includes `Cloud GPU` linking to `/cloud-gpu`; main nav remains unchanged.
- [x] Confirmed `/cloud-gpu` use-case counts use provider-count labels.
- [x] Confirmed guide source/output no longer says provider pages are future, unpublished, or planned later.
- [x] Ran `npm run data:validate` (0 errors, 51 existing GPU warnings unrelated to Day 10.6).
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`; build output includes `/cloud-gpu` and `/cloud-gpu/[slug]` with 8 generated paths.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

- [x] Read `app/(frontend)/guides/page.tsx`, `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`, `components/CloudVsLocalTable.tsx`, `components/DecisionMatrix.tsx`, `DAILY_LOG.md`, `TASK_STATUS.md`, and guide-related CSS before polishing.
- [x] Improved guide-detail readability with slightly larger guide copy, looser line-height, and clearer scan patterns for primary sections, table text, decision cards, CTA cards, provider note, and FAQ-adjacent content.
- [x] Strengthened visual hierarchy in `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx` by marking Quick verdict, Cloud GPU vs Local GPU planning table, Decision matrix, Suggested planning workflow, and Continue planning as clearer primary sections.
- [x] Strengthened the `Continue planning` CTA area so `Use VRAM Calculator` remains the primary next step and secondary routes are visually distinct but still easy to use.
- [x] Upgraded `components/CloudVsLocalTable.tsx` with a mobile-only stacked-card fallback to remove cramped table reading on small screens while keeping the desktop table.
- [x] Improved `/guides` hub card UX in `app/(frontend)/guides/page.tsx` with published/topic labels, stronger guide-card treatment, and `Read guide →` action text.
- [x] Added a clearly marked `Planned guide topics` section on `/guides` without creating any fake linked routes.
- [x] Updated `app/(frontend)/theme.css` to support featured guide cards, planned-topic cards, primary-section hierarchy, stronger CTA emphasis, and mobile-safe cloud-vs-local cards.
- [x] Tightened workflow and CTA action sizing in `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx` and `app/(frontend)/theme.css` so actions align at the bottom, buttons feel lighter, and the cloud-test card uses a muted planned-later label instead of an empty action area.
- [x] Updated workflow action labels to shorter CTA text: `Open calculator →`, `Review profiles →`, `Compare GPUs →`, `Open builds →`, and `View build route →`.
- [x] Changed the `Continue planning` desktop CTA layout to a more balanced 2x2 grid and kept `Use VRAM Calculator` as the clear primary CTA.
- [x] Redesigned `Suggested planning workflow` in `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx` into a balanced 2-row responsive card grid using Tailwind utility classes in JSX instead of the previous 5-card single-row layout.
- [x] Added a 6th `Recommended next step` workflow card and kept it slightly more prominent without making the section visually heavy.
- [x] Kept workflow actions bottom-aligned with small utility-styled buttons and preserved the muted non-clickable cloud-provider label.
- [x] Removed visible 01/02/03 numbering from the `Quick verdict` section and changed it into three compact verdict cards.
- [x] Changed local GPU and cloud GPU reason sections from 6 numbered cards each into 2-column checklist-style cards with subtle dot markers.
- [x] Changed `How to think about the tradeoff` from numbered cards into principle cards with subtle bar markers.
- [x] Confirmed `Decision matrix` and `Suggested planning workflow` remain the only numbered guide sections where numbering supports the user flow.
- [x] Confirmed `/builds/cloud-vs-local-ai-build-planning` exists before linking to it.
- [x] Confirmed the guide still has one H1, unique metadata, `WebPage` + `FAQPage` + `BreadcrumbList` JSON-LD, and internal links to `/tools/vram-calculator`, `/gpu`, `/compare`, `/builds`, and `/builds/cloud-vs-local-ai-build-planning`.
- [x] Ran `npm run data:validate` (0 errors, 51 existing GPU warnings unrelated to Day 9).
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Updated `DAILY_LOG.md`.
- [x] Updated `TASK_STATUS.md`.

## Last Completed Task

Day 13 created the neutral monetization placement system and passed data validation, lint, and build.

## Open Limitations

- No public `/ai-tools` pages yet.
- Exact AI tool prices are not stored unless source-backed and intentionally added later.
- AI tool availability is not claimed.
- Affiliate/referral links are not configured yet.
- No AI tool recommendations yet.
- Monetization placements are not wired into live pages yet.
- Placement hrefs are internal only while affiliate links remain unconfigured.
- Provider pages are planning profiles, not rankings.
- Exact prices are not stored unless timestamped/source-backed.
- Availability is not claimed.
- Affiliate/referral links are only shown if verified from official source.
- No provider recommendations yet.
- Existing `npm run data:validate` warnings remain in `data/gpus.json` and are unrelated to Cloud GPU provider pages.

## Current Handoff Note

- Day 10 Cloud GPU provider pages are complete and static/export compatible.
- Day 12 guide `/guides/local-ai-vs-ai-saas` is live in the static build and linked from the guides hub and sitemap.
- The Day 12 guide compares local AI, cloud GPU validation, and AI SaaS/API tools without affiliate links, commission claims, exact prices, availability claims, rankings, benchmarks, Product schema, Offer schema, Review schema, or recommendations.
- Day 12 checks passed: `npm run data:validate` with 0 errors and 51 existing unrelated GPU warnings, `npm run lint`, and `npm run build`.
- Day 13 monetization placement system is complete with 7 reviewed internal planning placements and no affiliate-configured placements.
- `data/monetization-placements.json` covers all planned placement types: `vram-calculator-result`, `gpu-profile-sidebar`, `comparison-verdict`, `build-page-components`, `cloud-vs-local-guide`, `ai-saas-guide`, and `footer-disclosure`.
- `repositories/monetization-placement.repository.ts`, `services/monetization-placement.service.ts`, and `components/MonetizationCta.tsx` are available for future wiring.
- `scripts/validate-data.ts` now validates monetization placement schema, enums, source fields, internal hrefs, affiliateConfigured safety, unsafe field arrays, and blocked promotional wording.
- Day 13 checks passed: `npm run data:validate` with 0 errors and 51 existing unrelated GPU warnings, `npm run lint`, and `npm run build`.
- Day 11 AI tool data layer is complete with 12 source-aware planning records across AI coding, productivity, LLM API, agent platform, video generation, automation, and vector database categories.
- `data/ai-tools.json` has 12 reviewed records, all `needsReview: true`, all `dataConfidence: "medium"`, all `affiliateStatus: "unknown"`, and all `affiliateProgramUrl: null`.
- AI tool exact pricing, availability, commission terms, rankings, ratings, benchmarks, and recommendations are not stored.
- `repositories/ai-tool.repository.ts` provides all requested accessors, including slug, category, affiliate status, draft/reviewed/published, and category listing.
- `services/ai-tool.service.ts` provides source-aware warnings, affiliate notices, pricing notices, placement notices, category labels, pricing labels, list items, and detail models.
- `scripts/validate-data.ts` validates `data/ai-tools.json` schema, required fields, enum values, source field mappings, duplicate slugs, affiliate URL safety, unsafe field arrays, and blocked promotional wording.
- No `/ai-tools` public route, sitemap entry, or nav link exists yet.
- Day 11 checks passed: `npm run data:validate` with 0 errors and 51 existing unrelated GPU warnings, `npm run lint`, and `npm run build`.
- Cloud GPU provider cards now use wider `gap-6` spacing and one-line truncated provider name headers.
- Day 11.1 checks passed: `npm run lint` and `npm run build`.
- `/cloud-gpu` is the provider hub and `/cloud-gpu/[slug]` generates 8 provider planning profiles.
- `generateStaticParams()` uses provider slugs from the repository, and `generateMetadata()` uses provider SEO fields through the service.
- Invalid provider slugs resolve through the service as null and the dynamic page calls `notFound()`.
- Provider detail pages show facts, grouped notices, sources, FAQ, and safe related planning links.
- `app/(frontend)/sitemap.ts` includes `/cloud-gpu` and all provider detail URLs from repository slugs.
- `/guides/cloud-gpu-vs-local-gpu`, `/guides`, and the grouped footer Explore area link safely to `/cloud-gpu`.
- Main nav now has a `GPUs` submenu with `Browse GPUs`, `Compare GPUs`, `Cloud GPU Providers`, and `Local AI Builds`; `Compare` and `Builds` are no longer separate top-level navigation items.
- Desktop submenu opens on hover/focus; mobile menu shows submenu links inline under `GPUs`.
- Cloud GPU data audit: 8 providers, 8 reviewed, 0 draft, 8 with official source-type coverage, 5 with `affiliateStatus: unknown`, 3 with `referral_verified` or `available_verified`, 0 missing `lastVerifiedAt`, and 8 with `unsafeToPublishFields`.
- Footer Explore now uses grouped `Plan`, `Hardware`, and `Learn` sections instead of a single long list.
- Footer Explore now renders links inline on desktop within each group and wraps cleanly on smaller widths, with hover retained on footer links.
- `Explore` now uses vertical group blocks with links directly under `Plan`, `Hardware`, and `Learn`; `Hardware` uses `Browse GPUs` for `/gpu`.
- `Explore` groups now stack in a single vertical column instead of three columns.
- Footer top/bottom padding and `Explore` group gaps are now tighter for a more compact footer.
- Footer responsive CSS stacks the main footer grid below `900px`; browser screenshot check was not run because Chrome/Edge headless was not available in PATH.
- Header hamburger menu now resets nested submenu state on close, and `.nav-link` button styling is normalized for responsive menu widths.
- Mobile hamburger menu now shows the `GPUs` submenu immediately, with child links styled flatter and closer to parent links.
- Mobile `GPUs` parent and submenu child links now show matching hover/focus backgrounds, and the parent caret is flex-centered with the label.
- The `GPUs` parent caret remains an upward arrow and uses subtle vertical hover/focus motion instead of open-state rotation.
- Day 10.20 checks passed: `npm run lint` and `npm run build`.

- `/guides/cloud-gpu-vs-local-gpu` now has clearer primary-section hierarchy, larger guide copy, and a mobile-safe cloud-vs-local stacked-card fallback under small widths.
- `/guides` now presents the published guide card as a stronger entry point and includes a clearly marked non-linked planned-topics block.
- Quick verdict, local GPU reasons, cloud GPU reasons, and tradeoff principles no longer repeat the same large numbered-card pattern.
- Workflow cards now align their bottom actions consistently, and the no-link cloud-testing card uses a muted planned-later label so the row no longer feels visually broken.
- The workflow section now uses a 3-column x 2-row desktop layout, 2-column tablet fallback, and 1-column mobile stack through Tailwind utilities in the page file.
- `Continue planning` now balances better on desktop with a 2x2 card layout and smaller, lighter secondary CTA buttons.

## Done

- [x] Global layout đã có Header/Footer.
- [x] Homepage đã có hero, CTA và visual.
- [x] VRAM Calculator page đã có.
- [x] Brand/logo text lấy từ config.
- [x] `AGENTS.md` đã có rule brand config.
- [x] Không hardcode brand/domain ngoài config/docs/log.
- [x] Không tạo thư mục `src`.
- [x] Không thêm database/auth/payment/Payload.
- [x] `npm run lint` pass.
- [x] `npm run build` pass.

## Day 3.7 Homepage Refinement Update - 2026-05-26

- [x] Cập nhật `AGENTS.md` để enforce logo/mark/accessibility lấy brand text từ site config.
- [x] Thay badge logo cũ bằng SVG chip/circuit mark nội bộ trong `components/Logo.tsx`.
- [x] Logo dùng `settings.name`, `settings.logo.text`, `settings.logo.shortText`; aria-label cấu hình theo site name.
- [x] Đồng bộ `app/icon.svg` bằng chip mark generic không tải asset bên ngoài.
- [x] Giảm spacing dư của hero/home sections và tăng kích thước hero visual trên desktop.
- [x] Thu gọn overlay workflow để giữ ảnh rõ hơn đồng thời vẫn nêu đây là estimate.
- [x] Thêm bốn trust chips ngay dưới CTA.
- [x] Làm sáu mini visual card khác nhau bằng CSS/SVG nhẹ, không dùng logo hãng hoặc icon library.
- [x] Thêm section `How it works` ba bước với link về VRAM Calculator.
- [x] Xác nhận homepage vẫn có một H1, internal links chính và wording không tạo benchmark claim.
- [x] Kiểm tra visual homepage ở compact/tablet/desktop; menu responsive và CTA không vỡ.
- [x] Scan code xác nhận không có brand/domain hardcode trong code directories.
- [x] Chạy `npm run lint` và `npm run build` thành công.

## Responsive Shell Update - 2026-05-26

- [x] Thay navigation trượt ngang trên màn nhỏ bằng menu đóng/mở có `aria-expanded`.
- [x] Giữ active state theo route và đóng menu khi người dùng chọn link.
- [x] Chuyển sang menu compact từ tablet width để header/CTA không bị cắt.
- [x] Rút gọn CTA và ẩn logo text ở điện thoại rất hẹp để tránh overflow.
- [x] Thêm layout guards cho hero, calculator, cards và placeholder content.
- [x] Xếp flow VRAM theo chiều dọc trên mobile thay vì bắt buộc cuộn ngang.
- [x] Kiểm tra trực quan homepage, tool page và about page ở viewport nhỏ/tablet/desktop bằng Chrome headless.
- [x] Kiểm tra production local cho `/`, `/tools/vram-calculator`, `/gpu`, `/builds`, `/guides`, `/about`, `/projects`.
- [x] Chạy `npm run lint` và `npm run build` thành công sau khi sửa responsive.

## Day 3.6 Visual Image Update - 2026-05-26

- [x] Bổ sung `types/image.ts`, `repositories/image.repository.ts` và `services/image.service.ts`.
- [x] Chuẩn hóa manifest với `category`, kích thước và `needsReview`; chỉ render asset qua validation service.
- [x] Tạo `SiteImage` dùng `next/image` với alt text và SVG/CSS fallback an toàn.
- [x] Tạo `HeroVisual` cho homepage với ảnh hero Pexels hợp lệ, attribution và planning overlay.
- [x] Tạo `VisualCard` cho các silo/use case và khu vực hardware data sắp phát triển.
- [x] Nâng cấp homepage bằng hero image, visual topic cards, calculator flow và supporting image cards.
- [x] Nâng cấp `/tools/vram-calculator` bằng flow minh họa input-to-tier không dùng benchmark claim.
- [x] Không dùng ảnh tools có nội dung biểu đồ chứng khoán làm visual calculator vì không phù hợp intent.
- [x] Cập nhật script fetch để entry ảnh mới ghi đủ category/review/dimension fields.
- [x] Kiểm tra manifest hợp lệ, file asset tồn tại và không có nguồn Google Images.
- [x] Scan code xác nhận không có brand/domain hardcode trong code directories.
- [x] Xác nhận production local cho `/`, `/tools/vram-calculator`, `/gpu`, `/builds`, `/guides` và hero asset trả HTTP 200.

## Day 3.5 Site Shell Update - 2026-05-26

- [x] Mở rộng `data/site-settings.json` với short name, text logo, tagline, theme và trust/disclosure copy.
- [x] Sửa SEO helper để title suffix được build từ site name trong config thay vì lưu brand trong page/data.
- [x] Xóa brand suffix hardcode khỏi `seoTitle` seed records; page tương lai phải ghép bằng helper.
- [x] Tạo `components/Logo.tsx` và dùng logo text từ config trong header/footer.
- [x] Chuẩn hóa layout dùng font Inter, skip link và `main#main-content`.
- [x] Tạo favicon nội bộ `app/icon.svg`, không tải asset logo/icon bên ngoài.
- [x] Cập nhật navigation và CTA header hướng tới VRAM calculator.
- [x] Thay homepage placeholder bằng landing page định vị AI hardware planning, CTA và trust sections.
- [x] Thêm placeholder pages `/gpu`, `/builds`, `/guides` để navigation chính không tạo 404.
- [x] Footer hiển thị editorial note, affiliate disclosure và hardware disclaimer từ config.
- [x] Cập nhật `AGENTS.md` với quy tắc brand/site config bắt buộc.
- [x] Scan code xác nhận literal brand/domain chỉ còn trong `data/site-settings.json` hoặc documentation/log cho phép.
- [x] Xác nhận production local cho `/`, `/tools/vram-calculator`, `/gpu`, `/builds`, `/guides`, `/about` trả HTTP 200.

## Day 3 VRAM Calculator Update - 2026-05-26

- [x] Bổ sung site URL, title template và OG fallback vào `data/site-settings.json`.
- [x] Mở rộng `lib/seo.ts` với `getSiteSettings`, `buildPageTitle`, `buildCanonicalPath`, `buildMetadata`.
- [x] Cập nhật metadata các trang hiện hữu để giảm hardcode brand/domain.
- [x] Tạo `types/vram-calculator.ts`.
- [x] Tạo `services/vram-calculator.service.ts` với estimate logic và warning confidence thấp.
- [x] Tạo `components/VramCalculator.tsx` dạng client component tương tác.
- [x] Tạo route `/tools/vram-calculator`.
- [x] Thêm canonical/Open Graph metadata, breadcrumb UI, FAQ, JSON-LD và related links.
- [x] Thêm route tool vào navigation và sitemap.
- [x] Xác nhận route được static render khi `npm run build`.
- [x] Xác nhận production local route trả HTTP 200 với title/disclaimer đúng.

## Day 2 Data Layer Update - 2026-05-26

- [x] Tạo `data/gpus.json` với 10 GPU seed records.
- [x] Tạo `data/ai-models.json` với 8 AI model/use case seed records.
- [x] Tạo `data/comparisons.json` với 5 draft comparisons.
- [x] Tạo `data/builds.json` với 5 draft builds.
- [x] Tạo `data/guides.json` với 8 draft guides.
- [x] Tạo 5 type files tương ứng trong `types/`.
- [x] Tạo 5 repositories đọc/lọc dữ liệu tĩnh.
- [x] Tạo 4 services có warning/guard cho dữ liệu chưa xác minh.
- [x] Xác nhận JSON hợp lệ, slug duy nhất trong từng dataset.
- [x] Xác nhận không có thư mục `src` và `.env.local` không được Git track.

Tất cả Day 2 records hiện là seed data:

```txt
status: draft
needsReview: true
dataConfidence: low
sources: []
lastVerifiedAt: null
```

## Image System Update - 2026-05-26

- [x] Tạo các thư mục `public/images/hero`, `gpu`, `builds`, `guides`, `tools`.
- [x] Tạo/ghi dữ liệu `data/images/image-manifest.json`.
- [x] Thêm `scripts/fetch-images.ts` đọc `PEXELS_API_KEY` từ `.env.local`.
- [x] Thêm command `npm run images:fetch`.
- [x] Tải một ảnh Pexels hợp lệ cho mỗi category và ghi metadata/license.
- [x] Xác nhận `.env.local` đang bị Git ignore.

## Blockers

None.

## Open Limitations Before Day 8

- Estimates are planning-oriented and not benchmark/performance claims.
- Image generation model matching remains planning-only unless a dedicated validated image-estimate mode is implemented.
- Price/availability/affiliate product mapping is not implemented in this patch scope.

## Next Recommended Task

Day 8 - Cloud GPU data model.

## Notes for Next Agent

- Không tạo thư mục `src`.
- Giữ nguyên kiến trúc hiện tại.
- Mọi page public đặt trong `app/(frontend)`.
- Mọi data tĩnh đặt trong `data`.
- Logic đọc data đặt trong `repositories`.
- Logic nghiệp vụ đặt trong `services`.
- Không hardcode brand/domain; lấy brand/site text từ site settings qua repository/service/helper.
- Không dùng Google Images; ảnh thật phải có metadata/license trong image manifest.
- Không publish data draft hoặc estimate như dữ liệu đã verify.
- Không làm comparison/build page trước khi GPU profile skeleton ổn.
- Nếu task chưa pass build/lint, không đánh dấu hoàn thành.
- Cập nhật file này ở cuối mỗi phiên làm việc.

Day 4 dự kiến gồm:

- `app/(frontend)/gpu/page.tsx` nếu cần nâng từ placeholder.
- `app/(frontend)/gpu/[slug]/page.tsx`.
- `components/GpuCard.tsx`.
- `components/GpuSpecTable.tsx`.
- `components/GpuAiUseCaseSection.tsx` nếu cần.
- Dùng `data/gpus.json` thông qua repository/service.
- Có `generateStaticParams` và `generateMetadata`.
- Không publish claim chưa verify; dữ liệu draft chỉ render với wording thận trọng.

## Static Export and Branding Configuration Update - 2026-05-27

- [x] Official public brand is `VRAM Forge`; production domain is `vramforge.com`.
- [x] `data/site-settings.json` now owns public name, logo text, URL, tagline and trust/disclosure copy.
- [x] `next.config.ts` uses `output: "export"` and `images.unoptimized: true` for Cloudflare Pages static output.
- [x] SEO canonical URLs and metadata read the configured production URL instead of local environment overrides.
- [x] `robots.txt` and `sitemap.xml` metadata routes are forced static for Next.js export compatibility.
- [x] Cloudflare Pages settings: branch `publish`, preset `Next.js (Static HTML Export)`, command `npm run build`, output `out`.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and created `out/`.
- [x] `.env.local` remains ignored and was not modified or added to Git changes.

### Resolved During Verification

- Initial static export build failed because `/sitemap.xml` lacked explicit static metadata route configuration under Next.js 16. Added `dynamic = "force-static"` to sitemap and robots routes; the subsequent build passed.

### Next Recommended Task

Day 5 - GPU profile SEO upgrade.

## Favicon Logo Sync Update - 2026-05-27

- [x] Replaced the starter triangle favicon with the VRAM Forge chip mark.
- [x] Updated `app/icon.svg` to the light outlined `VF` logo treatment matching the configured header mark.
- [x] Enlarged the `VF` mark in the shared logo and converted the favicon letters to heavier vector strokes for clearer small-size rendering.
- [x] Increased the logo mark again to `14px`/heavier weight and expanded the favicon vector lettering with darker contrast after visual review.
- [x] Regenerated `app/favicon.ico` from the logo SVG at favicon sizes for browser compatibility.
- [x] Kept header/footer logo text sourced from `data/site-settings.json` through existing component props.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and exported the updated icon files to `out/`.

## Day 3.8 Homepage and Calculator Refinement Update - 2026-05-27

- [x] Removed duplicated responsive text nodes from the header CTA; the exported link now reads only `Try VRAM Calculator`.
- [x] Strengthened the config-driven logo mark contrast and brand text weight without increasing header height.
- [x] Reduced homepage section spacing slightly and softened the secondary hero CTA relative to the primary calculator CTA.
- [x] Replaced placeholder-like card symbols with six lightweight SVG visuals for memory, comparison, model, image, workstation and local/cloud intent.
- [x] Moved the interactive calculator directly below its short hero introduction so inputs and results appear before long explanatory content.
- [x] Strengthened estimate hierarchy with status badges, clear minimum/tier/confidence labeling and runtime-validation wording.
- [x] Added result next-step links to available `/gpu` and `/guides` routes without affiliate links or dead routes.
- [x] Confirmed homepage/calculator each render one H1 and retain required internal links, FAQ, disclosure and config-driven schema/metadata behavior.
- [x] Reviewed desktop and compact (`500px`) static renders; the `<=480px` CSS branch keeps the chip mark and full CTA while hiding the wordmark for space.
- [x] Verified `/`, `/tools/vram-calculator`, `/gpu`, `/builds` and `/guides` return HTTP `200` from local static output.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and produced `out/`.

### Next Recommended Task

Day 5 - GPU profile SEO upgrade.

## Day 3.9 Homepage Help-Card Icon Refinement Update - 2026-05-27

- [x] Replaced stretched `120 x 38` banner glyphs with compact `48 x 48` SVG drawings inside `56 x 56` visual blocks.
- [x] Removed redundant decorative abbreviation text from the visual marker while keeping card titles and `Explore` links intact.
- [x] Removed obsolete visual-marker abbreviation props from homepage card data after the decorative treatment no longer used them.
- [x] Kept distinct icon intent for VRAM memory, GPU comparison, model network, image generation, workstation and cloud/local planning.
- [x] Kept icons decorative with `aria-hidden="true"` and introduced no icon library or external asset.
- [x] Reviewed exported homepage at desktop and compact widths; the three-column and one-column card layouts remain intact.
- [x] Confirmed generated homepage contains six square glyphs and no former horizontal glyph viewBox.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and produced `out/`.

### Next Recommended Task

Day 5 - GPU profile SEO upgrade.

## Day 3.10 Homepage Help-Card Horizontal Visual Refinement Update - 2026-05-27

- [x] Restored a full-width, light-blue visual block above each of the six homepage help-card titles.
- [x] Added small left-side labels (`VRAM`, `GPU`, `LLM`, `IMG`, `BUILD`, `CLOUD`) and retained distinct compact square SVG glyphs on the right.
- [x] Sized the horizontal visual block to `78px` high while fixing each icon at `54px`, preventing stretch or flattened proportions.
- [x] Kept visual blocks decorative with `aria-hidden="true"` and made no changes to heading hierarchy or card destinations.
- [x] Reviewed exported homepage at desktop and compact widths; three-column desktop and single-column compact layouts remain readable.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and produced `out/`.

### Next Recommended Task

Day 5 - GPU profile SEO upgrade.

## Day 3.11 Homepage Help-Card Visual Sizing Update - 2026-05-27

- [x] Kept the full-width visual header and six decorative labels introduced in Day 3.10.
- [x] Returned the visual header height from `78px` to the original `52px` footprint and restored the card minimum height to `207px`.
- [x] Reduced each SVG icon to a fixed proportional `38px` square so it remains readable without stretching or enlarging the card.
- [x] Reviewed desktop and compact homepage renders; the visual header now fills the top of each card without making the card taller than necessary.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and produced `out/`.

### Next Recommended Task

Day 5 - GPU profile SEO upgrade.















