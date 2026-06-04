# DAILY_LOG.md

Nhật ký làm việc hằng ngày của project `aibuildlab`.

## Cách ghi log

Mỗi phiên làm việc thêm một mục mới theo format:

```md
## YYYY-MM-DD

### Agent
Tên người/Codex thực hiện

### Planned Task
Task dự kiến làm

### Completed
- [ ] Việc 1
- [ ] Việc 2

### Checked
- [ ] npm run lint
- [ ] npm run build
- [ ] manual test

### Issues
- Không có
- Hoặc ghi lỗi cụ thể

### Files Changed
- path/file-1
- path/file-2

### Next Step
Việc nên làm tiếp theo
```

---

## 2026-06-04 - Day 10.7 Cloud GPU submenu discovery

### Agent
Codex

### Planned Task
Add Cloud GPU Providers as a submenu item under GPUs without adding another top-level header item.

### Completed
- [x] Added nested navigation support to `NavigationItem`.
- [x] Added a `GPUs` submenu in `data/navigation.json` with `Browse GPUs`, `Compare GPUs`, `Cloud GPU Providers`, and `Local AI Builds`.
- [x] Updated `MainNav` to render a desktop hover/focus submenu and mobile inline submenu using Tailwind utility classes.
- [x] Kept `Cloud GPU Providers` off the top-level header navigation.
- [x] Kept existing top-level `Compare`, `Builds`, `Guides`, and other working links.
- [x] Avoided pricing, ranking, affiliate, recommendation, benchmark, or provider-performance wording.

### Checked
- [x] Desktop header keeps the same top-level navigation structure.
- [x] GPU submenu opens on hover/focus on desktop.
- [x] Mobile menu shows submenu links inline under GPUs when the menu is expanded.
- [x] `/cloud-gpu` link is present in the exported navigation payload.
- [x] `npm run lint`
- [x] `npm run build`
- [x] Brand/domain hardcode scan in code directories.

### Issues
- No new issues. Existing Cloud GPU pages remain planning profiles, not rankings or recommendations.

### Files Changed
- `components/MainNav.tsx`
- `data/navigation.json`
- `types/site-settings.type.ts`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Continue with Day 11 or a broader navigation QA pass if more submenu groups are needed.

---

## 2026-05-26

### Agent
ChatGPT / User preparation

### Planned Task
Chuẩn hóa bộ tài liệu vận hành theo cấu trúc hiện tại của repo `aibuildlab`.

### Completed
- [x] Cập nhật quy tắc trong `AGENTS.md`.
- [x] Cập nhật trạng thái trong `TASK_STATUS.md`.
- [x] Cập nhật roadmap theo cấu trúc `app/(frontend)`, `components`, `data`, `lib`, `repositories`, `services`, `types`.
- [x] Cập nhật checklist nghiệm thu.

### Checked
- [ ] npm run lint
- [ ] npm run build
- [ ] manual test

### Issues
- Chưa chạy được lệnh trong repo local vì đây là bản tài liệu để copy vào project.

### Files Changed
- AGENTS.md
- TASK_STATUS.md
- DAILY_LOG.md
- docs/ROADMAP_THANG_1_2.md
- docs/CHECKLIST_NGHIEM_THU.md

### Next Step
Copy các file này vào root repo `aibuildlab`, sau đó chạy `npm run lint` và `npm run build`.

---

## 2026-05-26 - Image management system

### Agent
Codex

### Planned Task
Create a compliant local image workflow using Pexels API and manifest metadata.

### Completed
- [x] Created category directories under `public/images/` for hero, gpu, builds, guides, and tools.
- [x] Added `scripts/fetch-images.ts` with Pexels-only fetching and `.env.local` credential loading.
- [x] Added `npm run images:fetch`.
- [x] Downloaded one Pexels image per category into `public/images/`.
- [x] Recorded source, author, license, alt text, and usage metadata in `data/images/image-manifest.json`.
- [x] Confirmed `.env.local` is ignored by Git and is not tracked.

### Checked
- [x] `npm run images:fetch`
- [x] Re-running `npm run images:fetch -- --category hero --count 1` skips the existing manifest entry.
- [x] Running the script without `.env.local` exits safely with setup guidance.
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- `.env.local` is ignored and not tracked; keep real credentials only there and rotate any key shared elsewhere.
- Downloaded images are available as assets but are not yet rendered by public pages.

### Files Changed
- `package.json`
- `scripts/fetch-images.ts`
- `data/images/image-manifest.json`
- `public/images/*`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Connect selected manifest images to the homepage and upcoming GPU/build/guide/tool pages through the established data layer.

---

## 2026-05-26 - Day 2 data model

### Agent
Codex

### Planned Task
Create the initial AI Hardware SEO data layer without publishing unverified specifications.

### Completed
- [x] Read `docs/DATA_SOURCES.md` before creating hardware or model data.
- [x] Added 10 GPU, 8 AI model/use case, 5 comparison, 5 build, and 8 guide seed records.
- [x] Marked every new record as draft/low confidence/review required with empty sources.
- [x] Left unverified specs, benchmarks, VRAM estimates, verdicts, prices, and components as `null`.
- [x] Added 5 TypeScript model files and exported them from `types/index.ts`.
- [x] Added 5 repositories for static JSON queries.
- [x] Added 4 services with filtering and explicit unverified-data warnings.

### Checked
- [x] JSON parsed successfully and each new dataset has unique slugs.
- [x] Sensitive technical fields remain `null` unless source-backed.
- [x] No `src` directory was created.
- [x] `.env.local` remains ignored and is not tracked by Git.
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- Seed records are not suitable for public specification or recommendation pages until official/model-card sources are collected.
- VRAM calculator must not claim verified requirements until its estimation assumptions and source policy are documented.

### Files Changed
- `data/gpus.json`
- `data/ai-models.json`
- `data/comparisons.json`
- `data/builds.json`
- `data/guides.json`
- `types/gpu.ts`
- `types/ai-model.ts`
- `types/comparison.ts`
- `types/build.ts`
- `types/guide.ts`
- `types/index.ts`
- `repositories/gpu.repository.ts`
- `repositories/ai-model.repository.ts`
- `repositories/comparison.repository.ts`
- `repositories/build.repository.ts`
- `repositories/guide.repository.ts`
- `services/gpu.service.ts`
- `services/ai-model.service.ts`
- `services/comparison.service.ts`
- `services/build.service.ts`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 3 - implement the VRAM Calculator service and a page skeleton that clearly labels estimates as unverified until sourced.

---

## 2026-05-26 - Day 3 VRAM calculator

### Agent
Codex

### Planned Task
Create a VRAM estimate calculator service and SEO-ready tool page while centralizing site metadata configuration.

### Completed
- [x] Extended `data/site-settings.json` and `lib/seo.ts` so brand, site URL, title formatting, canonical URLs, and Open Graph metadata are configured centrally.
- [x] Updated existing page metadata to consume the shared SEO helper rather than duplicate brand/domain strings.
- [x] Added a typed VRAM estimation service using model size, quantization, context preset, and safety margin inputs.
- [x] Added an interactive `VramCalculator` client component without API calls or benchmark claims.
- [x] Added the static SEO page `/tools/vram-calculator` with explanatory content, estimate disclaimer, FAQ, related links, breadcrumb UI, and structured data.
- [x] Added FAQPage, WebApplication, and BreadcrumbList JSON-LD.
- [x] Added the tool route to navigation and sitemap.

### Checked
- [x] Calculator results are labelled as rough estimates with `confidence: "low"` and `needsReview: true`.
- [x] No benchmark or tokens-per-second data was introduced.
- [x] No `src` directory was created.
- [x] `.env.local` remains ignored and is not tracked by Git.
- [x] `npm run lint`
- [x] `npm run build` generated `/tools/vram-calculator` as a static route.
- [x] Local production request returned HTTP 200 with the configured page title and estimate disclaimer.

### Issues
- The calculator formula is an MVP planning heuristic and requires runtime-specific validation before recommendation use.
- Related guide/build links are intentionally future routes and will remain unavailable until those Day 4+ pages are implemented.
- GPU and AI model seed records remain draft/low confidence pending source verification.

### Files Changed
- `data/site-settings.json`
- `data/navigation.json`
- `types/site-settings.type.ts`
- `types/vram-calculator.ts`
- `types/index.ts`
- `lib/seo.ts`
- `services/vram-calculator.service.ts`
- `components/VramCalculator.tsx`
- `app/(frontend)/layout.tsx`
- `app/(frontend)/about/page.tsx`
- `app/(frontend)/projects/page.tsx`
- `app/(frontend)/projects/[slug]/page.tsx`
- `app/(frontend)/sitemap.ts`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - create a GPU profile page skeleton that only exposes source-verified fields and clearly withholds draft data.

---

## 2026-05-26 - Day 3.5 global shell and trust foundation

### Agent
Codex

### Planned Task
Standardize the global site shell, homepage, brand configuration, navigation, trust content, and enforce config-driven branding before creating GPU profile pages.

### Completed
- [x] Added mandatory brand/site config rules to `AGENTS.md` and refreshed its architecture outline.
- [x] Expanded site settings with text logo, short name, tagline, theme direction, editorial note, data disclaimer, affiliate disclosure, and purchase reminder.
- [x] Updated the SEO helper so brand suffixes and canonical URLs are generated from site settings.
- [x] Removed hardcoded brand suffixes from draft seed SEO titles to keep content records reusable.
- [x] Added a config-driven text `Logo` component and applied it to the shared header/footer.
- [x] Changed the shared layout to use Inter, a skip link, and a main content landmark.
- [x] Added a locally-authored SVG favicon/icon.
- [x] Updated navigation and header CTA around the primary VRAM calculator workflow.
- [x] Replaced the placeholder homepage with AI hardware positioning, utility CTA, planning sections, trust copy, and safe structured data.
- [x] Added `/gpu`, `/builds`, and `/guides` index placeholder pages so primary navigation links resolve.
- [x] Updated footer with config-driven editorial, disclosure, disclaimer, and verification messaging.
- [x] Updated sitemap and calculator related links to route through available section pages.

### Checked
- [x] Brand scan found current brand/short-name/domain values only in `data/site-settings.json` or allowed documentation/log locations.
- [x] No `src` directory was created.
- [x] `.env.local` remains ignored and is not tracked by Git.
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Production local HTTP checks returned `200` for `/`, `/tools/vram-calculator`, `/gpu`, `/builds`, `/guides`, and `/about`.
- [x] Homepage output includes the calculator CTA and affiliate disclosure.

### Issues
- GPU and model records remain draft data and cannot support published hardware claims yet.
- The VRAM calculator remains a planning estimate, not verified benchmark evidence.
- GPU/build/guide pages are section placeholders only until subsequent content tasks are completed.

### Files Changed
- `AGENTS.md`
- `data/site-settings.json`
- `data/navigation.json`
- `data/gpus.json`
- `data/ai-models.json`
- `data/comparisons.json`
- `data/builds.json`
- `data/guides.json`
- `types/site-settings.type.ts`
- `lib/seo.ts`
- `components/Logo.tsx`
- `components/Header.tsx`
- `components/Footer.tsx`
- `app/icon.svg`
- `app/(frontend)/layout.tsx`
- `app/(frontend)/globals.css`
- `app/(frontend)/theme.css`
- `app/(frontend)/page.tsx`
- `app/(frontend)/gpu/page.tsx`
- `app/(frontend)/builds/page.tsx`
- `app/(frontend)/guides/page.tsx`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `app/(frontend)/sitemap.ts`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - create a GPU profile page skeleton that consumes only source-reviewed fields and visibly protects users from draft data.

---

## 2026-05-26 - Day 3.6 visual image system

### Agent
Codex

### Planned Task
Add a compliant, performance-conscious visual system for the homepage and VRAM Calculator while keeping images manifest-driven and license-aware.

### Completed
- [x] Extended existing Pexels manifest records with category, dimensions, and review status.
- [x] Added typed image repository/service validation so page code does not hardcode asset paths.
- [x] Added reusable `SiteImage`, `HeroVisual`, and `VisualCard` components with alt text and safe SVG/CSS fallback behavior.
- [x] Rendered the licensed homepage hero image with attribution and a planning-only overlay.
- [x] Added visual topic and upcoming-data cards to make the homepage easier to scan.
- [x] Added a CSS/HTML input-to-VRAM-tier flow to the calculator page without benchmark or product claims.
- [x] Intentionally did not render the existing tools-category stock-chart photo because it does not represent VRAM calculation clearly.
- [x] Updated future Pexels fetch entries to retain the expanded manifest schema.

### Images Used
- `public/images/hero/pexels-hero-6804612.jpg` on `/` as the hero visual.
- `public/images/gpu/pexels-gpu-6385893.jpg` on `/` as a hardware-data supporting card.
- `public/images/builds/pexels-builds-13162096.jpg` on `/` as a build-guides supporting card.
- `public/images/guides/pexels-guides-12741843.jpg` on `/` as a research-guides supporting card.

### Checked
- [x] Parsed `data/images/image-manifest.json`, verified all five entries include required fields, and confirmed each local file exists.
- [x] Confirmed no Google Images asset or unknown-license image was introduced.
- [x] Confirmed current brand/domain strings do not appear hardcoded in `components/`, `app/(frontend)/`, `lib/`, `services/`, or `repositories/`.
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Production local checks returned HTTP 200 for `/`, `/tools/vram-calculator`, `/gpu`, `/builds`, `/guides`, and the homepage hero asset.
- [x] Production HTML includes the hero alt text and calculator visual workflow.

### Issues
- The tools-category downloaded image depicts market charts and is retained in the manifest but deliberately unused in UI; the calculator uses a more accurate internal visual.
- GPU and model data remain drafts; visual additions do not imply verified hardware recommendations.

### Files Changed
- `AGENTS.md`
- `data/images/image-manifest.json`
- `scripts/fetch-images.ts`
- `types/image.ts`
- `types/index.ts`
- `repositories/image.repository.ts`
- `services/image.service.ts`
- `components/SiteImage.tsx`
- `components/HeroVisual.tsx`
- `components/VisualCard.tsx`
- `app/(frontend)/page.tsx`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - create a GPU profile page skeleton that exposes only reviewed/source-backed data and reuses the image validation layer where appropriate.

---

## 2026-05-26 - Responsive navigation and screen QA

### Agent
Codex

### Planned Task
Audit shared pages at compact widths and fix navigation/layout overflow on small screens.

### Completed
- [x] Replaced the horizontally scrolling compact navigation with a collapsible menu button and accessible expansion state.
- [x] Preserved route-aware active navigation and close-on-select behavior for menu links.
- [x] Moved the compact-menu breakpoint to tablet width so the header CTA is not clipped.
- [x] Added very-small-screen CTA/logo treatment to keep the header within the viewport.
- [x] Added overflow and min-width guards for hero, calculator, cards, and content containers.
- [x] Changed the calculator workflow visual to a vertical layout on mobile.

### Checked
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Chrome headless screenshots reviewed at compact, tablet, and desktop widths for homepage.
- [x] Chrome headless screenshots reviewed for `/tools/vram-calculator` and `/about` at compact width.
- [x] Production local HTTP checks returned `200` for `/`, `/tools/vram-calculator`, `/gpu`, `/builds`, `/guides`, `/about`, and `/projects`.
- [x] Brand/domain scan remains clear in UI and business-code directories.

### Issues
- Chrome headless command-line screenshot mode clamps very narrow window sizes; the below-480px CSS branch was reviewed in code while 500px/tablet screenshots were used for visual QA.

### Files Changed
- `components/MainNav.tsx`
- `components/Header.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - create a GPU profile page skeleton after the shared responsive shell baseline.

---

## 2026-05-26 - Day 3.7 homepage refinement and logo improvement

### Agent
Codex

### Planned Task
Improve homepage density, trust presentation and visual identity without breaking config-driven branding or the responsive shell.

### Completed
- [x] Extended `AGENTS.md` with logo-mark rules requiring visible text and accessible brand naming from site config.
- [x] Replaced the placeholder-like logo badge with an internal SVG chip/circuit mark derived from configured short text.
- [x] Kept the brand text visible in the shared header/footer and passed configured site name for the logo aria-label.
- [x] Refreshed the internal SVG app icon to match the chip motif without introducing external assets.
- [x] Reduced excess hero spacing and increased the workstation visual footprint on desktop.
- [x] Tightened the planning overlay so it supports the image without covering it excessively.
- [x] Added lightweight trust chips immediately below the primary/secondary actions.
- [x] Added six distinct CSS-based mini visual treatments for homepage help cards.
- [x] Added a concise three-step `How it works` section linked to `/tools/vram-calculator`.

### Checked
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Production local HTTP checks returned `200` for `/`, `/tools/vram-calculator`, `/gpu`, `/builds`, `/guides`, and `/about`.
- [x] Homepage HTML contains trust chip copy, calculator CTA, and the new three-step workflow heading.
- [x] Chrome headless screenshots reviewed at compact, tablet and desktop widths for logo, hero, chips, visual hierarchy and responsive header.
- [x] Brand/domain scan found no hardcoded current brand literals in `components/`, `app/(frontend)/`, `lib/`, `services/`, or `repositories/`.
- [x] Confirmed no `src` directory, external logo asset or new dependency was introduced.

### Issues
- Hardware/model data remains draft and the homepage continues to avoid verified-product or benchmark claims until sourced records are available.

### Files Changed
- `AGENTS.md`
- `components/Logo.tsx`
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/VisualCard.tsx`
- `app/icon.svg`
- `app/(frontend)/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - create a GPU profile page skeleton that uses only source-reviewed fields and the shared trust/visual foundation.

---

## 2026-05-26 - End-of-day handoff

### Agent
Codex

### Planned Task
Chốt trạng thái cuối ngày và chuẩn hóa tài liệu handoff.

### Completed
- [x] Kiểm tra trạng thái code hiện tại.
- [x] Chạy `npm run lint`.
- [x] Chạy `npm run build`.
- [x] Cập nhật `AGENTS.md` với quy tắc dữ liệu seed/chưa xác minh.
- [x] Cập nhật `TASK_STATUS.md`.
- [x] Ghi next step cho ngày mai.

### Checked
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Manual review homepage bằng production local request và Chrome headless screenshot.
- [x] Manual review `/tools/vram-calculator` bằng production local request và compact screenshot.

### Issues
None.

### Files Changed
- `AGENTS.md`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - GPU profile page skeleton.

---

## 2026-05-27 - Cloudflare Pages static export and VRAM Forge branding

### Agent
Codex

### Planned Task
Configure Cloudflare Pages Static HTML Export and move public branding/domain to VRAM Forge through centralized site settings.

### Completed
- [x] Added `output: "export"` and `images.unoptimized: true` to `next.config.ts`.
- [x] Changed public site settings to `VRAM Forge` and `https://vramforge.com`, including logo, tagline and trust/disclosure content.
- [x] Removed the unused legacy repository identifier from public site settings; the repository URL remains documented in project handoff status.
- [x] Kept public metadata/canonical URLs config-driven by removing environment URL override behavior in `lib/seo.ts`.
- [x] Added metadata description fallback to site settings in the SEO helper.
- [x] Configured `robots.ts` and `sitemap.ts` as static metadata routes required by Next.js export.
- [x] Updated `.env.example` and `AGENTS.md` with the production brand/domain and Cloudflare Pages static export settings.
- [x] Confirmed no public brand/domain literal is hardcoded in UI, app-page, SEO, service or repository code.

### Checked
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Verified `out/` was generated.
- [x] Verified exported `robots.txt`, `sitemap.xml`, metadata, logo text and disclosure use `https://vramforge.com` / `VRAM Forge`.
- [x] Confirmed `.env.local` remains ignored and is not included in Git changes.

### Issues
- The first static export build reported that `/sitemap.xml` needed explicit static route configuration with `output: "export"`. This was fixed by exporting `dynamic = "force-static"` from sitemap and robots metadata routes; the final build passes.

### Files Changed
- `.env.example`
- `AGENTS.md`
- `TASK_STATUS.md`
- `DAILY_LOG.md`
- `next.config.ts`
- `data/site-settings.json`
- `types/site-settings.type.ts`
- `lib/seo.ts`
- `app/robots.ts`
- `app/(frontend)/sitemap.ts`

### Next Step
Day 4 - GPU profile page skeleton.

---

## 2026-05-27 - Favicon logo sync

### Agent
Codex

### Planned Task
Replace the default favicon with the VRAM Forge chip logo shown in the provided reference.

### Completed
- [x] Replaced the old starter favicon appearance with a light outlined chip mark and `VF` center label.
- [x] Updated `app/icon.svg` to match the existing config-driven header logo treatment.
- [x] Increased the `VF` scale in the header logo and favicon after review showed the original center text was too small relative to the chip.
- [x] Changed the favicon `VF` center to heavier vector strokes for better recognition at browser-tab sizes.
- [x] Increased the header logo mark to a bolder `14px` treatment and enlarged/darkened the favicon vector mark for stronger emphasis.
- [x] Generated a multi-size `app/favicon.ico` from the updated SVG so browsers do not keep rendering the starter icon.
- [x] Left header/footer logo rendering config-driven through `site-settings`.

### Checked
- [x] Reviewed a raster preview of the new chip icon.
- [x] Reviewed an enlarged rendering of the 16px favicon variant after increasing the center mark.
- [x] Reviewed the bolder large icon and updated 16px rendition before rebuilding the export.
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Verified the static export contains `out/favicon.ico` and `out/icon.svg`.

### Issues
None.

### Files Changed
- `app/icon.svg`
- `app/favicon.ico`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - GPU profile page skeleton.

---

## 2026-05-27 - Day 3.8 homepage and VRAM Calculator UX/SEO refinement

### Agent
Codex

### Planned Task
Improve usability, visual clarity, accessibility, trust and conversion paths on the homepage and VRAM Calculator without adding new product features.

### Completed
- [x] Verified the deployed preview exposed a repeated header CTA reading `Try VRAM Calculator Calculator`.
- [x] Removed dual responsive CTA text spans so the header link has one visible and accessible label: `Try VRAM Calculator`.
- [x] Increased logo mark contrast and wordmark weight while preserving config-driven text and compact header behavior.
- [x] Tightened homepage section spacing and reduced visual competition from the secondary hero action.
- [x] Replaced generic topic-card bars with lightweight SVG visuals representing each planning intent.
- [x] Placed the calculator immediately after its title/short description, ahead of extended SEO explanation and workflow content.
- [x] Added result badges and clearer planning minimum, tier and low-confidence validation hierarchy.
- [x] Updated warning wording to describe a rough estimate requiring runtime-specific validation and dependency on quantization, context length and KV cache.
- [x] Added next-step links from results to existing GPU and guide routes, with no affiliate links or non-existent target pages.

### Checked
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Verified `out/` is generated by the static export.
- [x] Verified exported HTML removes the duplicate CTA phrase and keeps one H1 on `/` and `/tools/vram-calculator`.
- [x] Verified required internal links and result CTAs exist in exported HTML.
- [x] Verified `/`, `/tools/vram-calculator`, `/gpu`, `/builds` and `/guides` return `200` from local static output.
- [x] Reviewed desktop and compact-width screenshots for homepage and calculator; reviewed the `<=480px` CSS handling for very narrow headers.
- [x] Confirmed restricted code directories contain no hardcoded public brand/domain literals.
- [x] Confirmed `.env.local` remains untracked.

### Issues
- The public preview still reflects the previously deployed build until these source changes are deployed.
- Chrome headless on this machine clamps very narrow screenshot layout behavior near `500px`; the narrower `<=480px` branch was verified in CSS.

### Files Changed
- `components/Header.tsx`
- `components/VisualCard.tsx`
- `components/VramCalculator.tsx`
- `services/vram-calculator.service.ts`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - GPU profile page skeleton.

---

## 2026-05-27 - Day 3.9 homepage help-card compact icon refinement

### Agent
Codex

### Planned Task
Refine only the six visuals in the homepage `What this site helps with` cards so they render as balanced technical icons instead of low horizontal banners.

### Completed
- [x] Reworked all six internal SVG glyphs on a square `48 x 48` canvas for memory, comparison, model network, image frame, workstation and cloud/local intent.
- [x] Changed the decorative marker container to a compact `56 x 56` block with subtle brand-aligned background and border treatment.
- [x] Removed redundant abbreviation text from each visual marker because the adjacent card heading already names its intent.
- [x] Removed obsolete `marker` prop/data entries after the text-free decorative icon treatment made them unused.
- [x] Preserved existing card copy, `Explore` links and responsive homepage grid behavior.
- [x] Kept visual elements decorative via `aria-hidden="true"` with no external icon asset or dependency.

### Checked
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Verified `out/` is generated by static export.
- [x] Verified exported homepage has six square SVG visual types and no former horizontal `120 x 38` glyph canvas.
- [x] Reviewed desktop and compact-width homepage screenshots; cards remain readable in three-column and one-column layouts.
- [x] Confirmed no `src` directory or external image/icon asset was introduced.

### Issues
None.

### Files Changed
- `components/VisualCard.tsx`
- `app/(frontend)/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - GPU profile page skeleton.

---

## 2026-05-27 - Day 3.10 homepage help-card horizontal visual refinement

### Agent
Codex

### Planned Task
Restore a stronger horizontal visual header for the six homepage help cards while keeping each icon proportional and technically distinct.

### Completed
- [x] Restored the full-width visual block treatment for the `What this site helps with` card set.
- [x] Reintroduced concise decorative labels for all six cards: `VRAM`, `GPU`, `LLM`, `IMG`, `BUILD` and `CLOUD`.
- [x] Kept the six individual SVG concepts from the compact-icon refinement, now anchored at a fixed square size on the right of each block.
- [x] Set the visual header to `78px` tall with a subtle background/border so it fills the card header without becoming a flat banner.
- [x] Preserved card titles, descriptions, `Explore` links, section heading and responsive grid behavior.
- [x] Kept the visual block `aria-hidden="true"` and introduced no new asset, dependency or public-site text.

### Checked
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Verified static export produces `out/`.
- [x] Verified exported homepage contains six horizontal labels and six square glyph canvases.
- [x] Reviewed desktop and compact-width homepage renders; the card visual headers fill the upper area cleanly without breaking the grid.
- [x] Confirmed no `src` directory or new external asset was introduced.

### Issues
None.

### Files Changed
- `components/VisualCard.tsx`
- `app/(frontend)/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - GPU profile page skeleton.

---

## 2026-05-27 - Day 3.11 homepage help-card visual sizing balance

### Agent
Codex

### Planned Task
Keep the restored horizontal help-card visual treatment while returning its footprint to the more compact original size.

### Completed
- [x] Reduced the six visual header blocks from `78px` back to the original `52px` height.
- [x] Restored the help-card minimum height from `225px` to `207px` so the section density matches the earlier layout.
- [x] Reduced each right-side SVG to a fixed `38px` square while retaining the six distinct icon concepts and left-side labels.
- [x] Kept the horizontal visual appearance, card copy, links, heading hierarchy and responsive grid unchanged.

### Checked
- [x] `npm run lint`.
- [x] `npm run build`.
- [x] Verified static export produces `out/`.
- [x] Verified exported homepage still renders six visual labels and six square SVG glyphs.
- [x] Reviewed desktop and compact homepage renders; cards are compact again and icons remain proportional.
- [x] Confirmed no `src` directory, external asset or new dependency was introduced.

### Issues
None.

### Files Changed
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 4 - GPU profile page skeleton.

---

## 2026-05-29 - Day 4 GPU profile page skeleton

### Agent
Codex

### Planned Task
Implement GPU profile page skeleton with static generation, draft-data safety wording, and SEO baseline for `/gpu` and `/gpu/[slug]`.

### Completed
- [x] Upgraded `/gpu` from placeholder to a seed GPU planning index rendered from `gpuService`.
- [x] Added reusable `GpuCard`, `GpuSpecTable`, and `DataConfidenceBadge` components.
- [x] Added dynamic route `app/(frontend)/gpu/[slug]/page.tsx` with `generateStaticParams`, `generateMetadata`, and `notFound()`.
- [x] Added breadcrumb UI, FAQ, related links, and safe JSON-LD (`BreadcrumbList`, `WebPage`) on GPU profile pages.
- [x] Added cautious seed/draft/confidence warning copy and avoided benchmark/recommendation claims.
- [x] Added GPU page styles for cards, badges, and mobile-safe spec table overflow handling.

### Checked
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output confirms `/gpu` static route and `/gpu/[slug]` SSG with all 10 seed GPU paths.
- [x] Verified no `src` directory was created.
- [x] Scanned `app/(frontend)`, `components`, `lib`, `services`, `repositories` for hardcoded brand/domain literals.

### Issues
- GPU specs remain mostly `null` by design because seed records are still draft and unverified.
- Profile pages intentionally show planning-oriented wording until source verification is completed.

### Files Changed
- `app/(frontend)/gpu/page.tsx`
- `app/(frontend)/gpu/[slug]/page.tsx`
- `components/GpuCard.tsx`
- `components/GpuSpecTable.tsx`
- `components/DataConfidenceBadge.tsx`
- `services/gpu.service.ts`
- `app/(frontend)/theme.css`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Day 5 - GPU profile SEO upgrade.

---

## 2026-05-29 - Day 4.5 install daily_data_update layer

### Agent
Codex

### Planned Task
Install `daily_data_update` data operations layer into the main repo without modifying existing seed core files.

### Completed
- [x] Copied `daily_data_update/data/source-registry.json` to `data/source-registry.json`.
- [x] Copied `daily_data_update/data/update-candidates/*.json` to `data/update-candidates/`.
- [x] Copied `daily_data_update/scripts/validate-data.ts` to `scripts/validate-data.ts`.
- [x] Copied `daily_data_update/scripts/generate-daily-data-report.ts` to `scripts/generate-daily-data-report.ts`.
- [x] Added package scripts: `data:validate` and `data:report`.
- [x] Added `tsx` as dev dependency to run data scripts.
- [x] Kept `data/gpus.json` and `data/ai-models.json` unchanged.

### Checked
- [x] `npm run data:validate`
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- `data:validate` reports 2 warnings: `data/calculator-assumptions.json` and `data/calculator-validation.json` are not present yet.

### Files Changed
- `data/source-registry.json`
- `data/update-candidates/*`
- `scripts/validate-data.ts`
- `scripts/generate-daily-data-report.ts`
- `package.json`
- `package-lock.json`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Day 4.6 - enrich first 10 GPU records with source-backed fields and keep unverified fields null.

---

## 2026-05-29 - Day 4.6 GPU enrichment (10 source-backed publishable profiles)

### Agent
Codex

### Planned Task
Enrich GPU records with source-backed fields so `/gpu` and `/gpu/[slug]` can render at least 10 publishable planning profiles with confidence metadata.

### Completed
- [x] Merged source-backed GPU fields into `data/gpus.json` from `daily_data_update/data/enriched-seeds/gpu-specs-source-backed.v2.json` by slug.
- [x] Added one additional source-backed record (`intel-arc-a770-16gb`) so the dataset now contains at least 10 publishable profiles while keeping draft records visible.
- [x] Added/normalized `sources[]`, `lastVerifiedAt`, `dataConfidence`, `needsReview`, and `status` for enriched records.
- [x] Updated published record notes to verification-first wording and kept draft warning semantics.
- [x] Extended `types/gpu.ts` for optional source-backed spec fields.
- [x] Updated `components/GpuSpecTable.tsx` to render additional verified spec fields with safe fallback wording.
- [x] Updated `repositories/gpu.repository.ts` so `/gpu` can prioritize source-backed profiles first while still including drafts.

### Checked
- [x] `npm run data:validate` (0 errors, 2 expected warnings for missing calculator files)
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- Data validation still warns that `data/calculator-assumptions.json` and `data/calculator-validation.json` are not present yet.

### Files Changed
- `data/gpus.json`
- `types/gpu.ts`
- `components/GpuSpecTable.tsx`
- `repositories/gpu.repository.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Day 5 - GPU profile SEO upgrade using enriched source-backed records.

---

## 2026-05-29 - Day 4.7 calculator data foundation

### Agent
Codex

### Planned Task
Make VRAM calculator source-aware and versioned by adding assumption/validation datasets and upgrading calculator logic to consume model/runtime/context profiles.

### Completed
- [x] Added `data/calculator-assumptions.json` from enriched seed.
- [x] Added `data/calculator-validation.json` from validation samples seed.
- [x] Added `types/calculator-assumption.ts` and `types/calculator-validation.ts`.
- [x] Added `repositories/calculator-assumption.repository.ts` and `services/calculator-assumption.service.ts`.
- [x] Upgraded `services/vram-calculator.service.ts` to consume exact model selection, quantization profile, context preset, runtime profile, and safety margin.
- [x] Extended calculator output with `assumptionVersion`, `warnings`, `assumptionsUsed`, and source-aware GPU matches.
- [x] Upgraded `components/VramCalculator.tsx` with exact AI model dropdown and runtime profile selection.
- [x] Updated type exports and VRAM calculator type model to match the new data foundation.

### Checked
- [x] `npm run data:validate` (0 errors, 0 warnings)
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- None.

### Files Changed
- `data/calculator-assumptions.json`
- `data/calculator-validation.json`
- `types/calculator-assumption.ts`
- `types/calculator-validation.ts`
- `types/vram-calculator.ts`
- `types/index.ts`
- `repositories/calculator-assumption.repository.ts`
- `services/calculator-assumption.service.ts`
- `services/vram-calculator.service.ts`
- `components/VramCalculator.tsx`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Day 4.8 - AI model enrichment for calculator-ready source-backed model options.

---

## 2026-05-29 - Day 4.8 and Day 4.9 model enrichment + calculator GPU matching

### Agent
Codex

### Planned Task
1) Enrich AI model records for calculator dropdown with source-backed fields. 2) Complete safe model-to-GPU matching UX for calculator results.

### Completed
- [x] Replaced `data/ai-models.json` with 8 source-backed calculator-eligible model profiles (LLM + image diffusion groups).
- [x] Added source-backed model fields: `developer`, `family/modelFamily`, `parameterCountB`, `contextLengthTokens` where sourced, `calculatorEligible`, `defaultCalculatorProfile`, `lastVerifiedAt`, `dataConfidence`, `sources`.
- [x] Extended `types/ai-model.ts` with optional calculator/model metadata fields.
- [x] Updated calculator assumption service to return grouped model options and profile-driven model sizes.
- [x] Updated VRAM service matching logic to split results into source-backed matches vs planning candidates.
- [x] Updated calculator UI with grouped model dropdown (`LLM`, `Image diffusion`, `Embedding / other`), explicit non-benchmark warning, source-backed/planning badges, and no-source-backed-match fallback message.
- [x] Added explanation block "How to read this estimate" and preserved internal links to `/gpu`, `/builds`, `/guides`.
- [x] Added styles for GPU match cards and badges.

### Checked
- [x] `npm run data:validate` (0 errors, 0 warnings)
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- None.

### Files Changed
- `data/ai-models.json`
- `types/ai-model.ts`
- `types/vram-calculator.ts`
- `services/calculator-assumption.service.ts`
- `services/vram-calculator.service.ts`
- `components/VramCalculator.tsx`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `app/(frontend)/theme.css`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Day 5 - GPU profile SEO upgrade with enriched GPU + model data.

---

## 2026-05-29 - Day 4.6-4.9 patch (GPU + AI model data depth)

### Agent
Codex

### Planned Task
Patch previous daily_data_update v2 result to satisfy new Day 4.6-4.9 depth requirements without reinstalling tooling.

### Completed
- [x] Audited current dataset and calculator flow before patching.
- [x] Confirmed GPU dataset already meets source-backed target: 11 total, 10 source-backed published/reviewed, 10 with usable `vramGb`.
- [x] Expanded `data/ai-models.json` from 8 to 16 source-backed model/use-case records.
- [x] Increased calculator-ready models to 10 records with `calculatorEligible: true`.
- [x] Kept exact model selection flow in calculator (model -> quantization -> runtime -> context -> safety margin -> estimate).
- [x] Kept GPU match output split into `Source-backed GPU matches` and `Planning-only GPU candidates` using GPU `vramGb`.
- [x] Preserved safe wording: planning estimate only, not benchmark/recommendation.

### Audit Snapshot (before patch)
- GPU total: `11`
- GPU source-backed published/reviewed: `10`
- GPU with usable `vramGb`: `10`
- AI model total: `8`
- AI model source-backed size/parameter basis: `6`
- AI model `calculatorEligible: true`: `8`
- Calculator exact model selection: `Yes`
- GPU matching based on source-backed `vramGb`: `Yes`

### Audit Snapshot (after patch)
- GPU total: `11`
- GPU source-backed published/reviewed: `10`
- GPU with usable `vramGb`: `10`
- AI model total: `16`
- AI model source-backed size/parameter basis: `10`
- AI model `calculatorEligible: true`: `10`

### Checked
- [x] `npm run data:validate` (0 errors, 0 warnings)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output confirms static `/gpu`, static `/tools/vram-calculator`, and SSG `/gpu/[slug]` paths.

### Issues
- Image generation models are present as planning profiles but remain non-eligible for exact calculator estimate mode until formula mode is explicitly implemented/validated.
- Estimates remain planning-oriented and not benchmark/performance claims.

### Files Changed
- `data/ai-models.json`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Day 5 - GPU profile SEO upgrade.

---

## 2026-05-29 - Day 4.10 source gap audit refresh

### Agent
Codex

### Planned Task
Audit current GPU/AI model/calculator data depth and track remaining source gaps without overwriting production records.

### Completed
- [x] Re-read required project + daily_data_update governance docs before changes.
- [x] Audited `data/gpus.json`, `data/ai-models.json`, and calculator flow/service status.
- [x] Confirmed targets remain satisfied: GPU source-backed count, AI model depth, calculator eligible count, exact-model matching flow.
- [x] Ran prompt workflow from `daily_data_update/prompts/10_SOURCE_GAP_AUDIT.md`.
- [x] Added `data/update-candidates/source-gap-candidates.json` with tracked missing/weak fields for next enrichment rounds.
- [x] Kept production data unchanged in this session (candidate-first gap tracking only).

### Audit Result (before source-gap file update)
- GPU total: `11`
- GPU with `vramGb`: `10`
- GPU with `sources[]`: `10`
- GPU source-backed/reviewed/published usable set: `10`
- AI model total: `16`
- AI model with `parameterCountB` or size class: `10`
- AI model `calculatorEligible: true`: `10`
- Calculator model mode: exact model selection by slug
- GPU matching: uses source-backed `vramGb` threshold
- Output includes: assumption version + warning

### Prompt Used
- `daily_data_update/prompts/10_SOURCE_GAP_AUDIT.md`

### Source Gaps Remaining
- Added `243` tracked gaps in candidate file, mainly:
- GPU: memory bus/bandwidth, compute field coverage per vendor, launch date/year, power fields, and safe price/availability placeholders.
- AI models: context/license/runtime/quantization metadata gaps and non-calculator model parameter-size gaps.

### Checked
- [x] `npm run data:validate` (0 errors, 0 warnings)
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- Gaps remain intentionally unresolved until next enrichment pass with source-backed evidence.
- Estimates remain planning-only and not benchmark claims.

### Files Changed
- `data/update-candidates/source-gap-candidates.json`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Day 4.x follow-up: run GPU/AI enrichment pass against tracked source gaps, then re-validate calculator coverage.

---

## 2026-05-29 - Day 4.11 GPU multi-source enrichment (official + AIB coverage)

### Agent
Codex

### Planned Task
Run prompt 10 then prompt 11 to improve GPU source coverage with official vendor first and AIB variant-specific enrichment where safe.

### Completed
- [x] Re-read required governance and source policy docs before data edits.
- [x] Ran source-gap audit flow (`daily_data_update/prompts/10_SOURCE_GAP_AUDIT.md`) for GPU fields.
- [x] Updated `data/update-candidates/source-gap-candidates.json` with post-enrichment GPU gaps.
- [x] Ran GPU multi-source enrichment flow (`daily_data_update/prompts/11_GPU_MULTI_SOURCE_ENRICHMENT.md`) on `data/gpus.json`.
- [x] Enriched 10 Month 1 GPU records with additional source-backed fields (official + AIB/database cross-check).
- [x] Added variant-specific source scope metadata for AIB-backed fields (MSI, PNY, Gigabyte, ASRock).
- [x] Kept unsupported fields (`benchmark`, `tokensPerSecond`, `price`, `availability`) as `null`.

### Audit Result Before Enrichment
- GPU records audited: `11`
- Source gaps written (GPU-only audit pass): `204`
- Core source-backed profiles already present: `10`

### Enrichment Summary
- GPU records enriched: `10`
- Added/expanded fields where source-backed:
- `memoryBusBit`, `memoryBandwidthGbps`, `baseClockGhz`, `boostClockGhz`
- `memorySpeedGbps`, `tgpWatts`, `tbpWatts`, `powerConsumptionWatts`
- `powerConnectors`
- AIB/manufacturer sources used in this patch:
- `MSI`, `PNY`, `Gigabyte`, `ASRock`
- Official vendor sources reinforced:
- `NVIDIA`, `AMD`, `Intel`

### Source Gaps Remaining
- Post-enrichment GPU source gaps: `134`
- Main remaining gaps:
- `launchDate` / `launchYear` not uniformly source-backed for all cards
- variant-only fields still missing for some cards (`cardDimensionsMm`, `displayOutputs`, some connector/PSU mappings)
- dynamic/unsafe fields intentionally null (`price`, `availability`, benchmark-derived fields)

### Checked
- [x] `npm run data:validate` (0 errors, 0 warnings)
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- None blocking build/lint/validation.

### Files Changed
- `data/gpus.json`
- `data/update-candidates/source-gap-candidates.json`
- `types/gpu.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Continue Day 4.x with focused AIB variant-field expansion (dimensions/outputs/connectors/PSU) and keep source-gap list current.

---

## 2026-05-29 - Day 5 GPU profile SEO upgrade

### Agent
Codex

### Planned Task
Upgrade `/gpu` and `/gpu/[slug]` from Day 4 skeleton to richer SEO/UX pages using source-backed Day 4 data without adding unsupported claims.

### Completed
- [x] Audited current GPU profile implementation and source-backed dataset status before edits.
- [x] Upgraded `/gpu` into a source-aware hub with verified-first list, draft separation, and "how to use" planning steps.
- [x] Upgraded `/gpu/[slug]` with expanded sections: breadcrumb, planning summary, source-backed spec snapshot, planning fit, local AI notes, VRAM limitations, cloud-usage bridge, technical checklist, sources, FAQ, and related links.
- [x] Added safe structured data (`BreadcrumbList`, `WebPage`, `FAQPage`) on GPU detail pages.
- [x] Updated spec table logic to mark variant-specific AIB fields and preserve null fields as verification-needed.
- [x] Extended GPU source type with optional variant metadata fields to align type safety with current data.
- [x] Kept all content planning-oriented; did not add benchmark, tokens/s, image speed, price, availability, or affiliate recommendation claims.

### GPU Data Usage Summary
- Total GPU records: `11`
- Source-backed published/reviewed: `10`
- Records with `vramGb`: `10`
- Draft/low-confidence remaining: `1` (`rtx-4070-super`)
- AIB variant-specific data present and explicitly labeled in UI where used.

### Checked
- [x] `npm run data:validate` (0 errors, 0 warnings)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output confirms static `/gpu` and SSG `/gpu/[slug]` routes.

### Issues
- Some optional fields remain null (for example launch date/year, dimensions, display outputs on several cards) due to source gaps; UI now keeps these as verification-needed.
- Responsive behavior reviewed via code/CSS and build output in this run; no viewport screenshot QA was executed in this patch.

### Files Changed
- `types/gpu.ts`
- `components/GpuSpecTable.tsx`
- `components/DataConfidenceBadge.tsx`
- `app/(frontend)/gpu/page.tsx`
- `app/(frontend)/gpu/[slug]/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 5.x follow-up: GPU profile SEO content polish (source freshness, deeper FAQ intent coverage, and optional comparison-link integration where valid pages exist).

---

## 2026-05-29 - Day 5.1 GPU profile refinement before Day 6

### Agent
Codex

### Planned Task
Improve GPU profile UX, make spec rendering vendor-aware, strengthen calculator CTA, and reduce template-like copy without introducing unsupported claims.

### Completed
- [x] Refined `GpuSpecTable` to be vendor-aware and hide irrelevant fields by vendor.
- [x] Kept “Needs verification” only for relevant fields instead of showing irrelevant vendor rows.
- [x] Improved `/gpu` cards with compact VRAM, memory type, planning focus, and confidence visibility.
- [x] Added stronger CTA wording “Estimate VRAM before comparing this GPU” on profile page near planning/VRAM sections.
- [x] Made `/gpu/[slug]` copy more unique by using `vendor`, `architecture`, `vramGb`, `memoryType`, and `notes` where available.
- [x] Expanded source explanation for manufacturer/AIB + variant-specific semantics and non-universal field caution.
- [x] Preserved all Day 5 sections and trust-safe wording.

### Checked
- [x] `npm run data:validate` (0 errors, 0 warnings)
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- Some optional fields remain null due to unresolved source gaps (for example launch date/year, dimensions, display outputs on several cards).
- No benchmark/performance/price/availability claims were added in this refinement.

### Files Changed
- `components/GpuSpecTable.tsx`
- `components/GpuCard.tsx`
- `app/(frontend)/gpu/[slug]/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 6 - comparison page foundation using source-backed GPU profiles and calculator-aware positioning.

---

## 2026-05-29 - Day 5.2 final GPU page cleanup before Day 6

### Agent
Codex

### Planned Task
Apply small cleanup only on GPU pages before Day 6: tighten table notes, hide optional unverified fields, add VRAM-class planning FAQ note, and verify no debug issue badge in app UI.

### Completed
- [x] Shortened variant-specific note in `GpuSpecTable` to concise wording.
- [x] Moved long-form source/variant context to existing `Sources and data confidence` section.
- [x] Hid optional unverified fields (`cardDimensionsMm`, `displayOutputs`, `launchDate`, `launchYear`) from spec table.
- [x] Kept important planning fields (VRAM, memory type, memory bus, power/PSU-related fields) visible with verification status.
- [x] Added one VRAM-class-specific planning FAQ note for 12GB/16GB/24GB/32GB classes.
- [x] Searched app code and found no `1 issue`/debug badge overlay implementation.

### Checked
- [x] `npm run data:validate` (0 errors, 0 warnings)
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- No in-app debug issue badge found in code; reported red badge is likely browser extension/dev overlay context.
- Optional fields remain omitted when unverified by design.

### Files Changed
- `components/GpuSpecTable.tsx`
- `app/(frontend)/gpu/[slug]/page.tsx`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Ready to start Day 6 comparison page implementation.

---

## 2026-06-02 - Day 6 comparison page skeleton

### Agent
Codex

### Planned Task
Create source-aware comparison pages (`/compare` and `/compare/[slug]`) using repository/service flow with cautious planning wording and static export compatibility.

### Completed
- [x] Audited comparison and GPU datasets before implementation.
- [x] Added comparison repository/service helpers for static params, list items, and GPU slug resolution.
- [x] Created `/compare` hub page with at least 5 seed comparison cards, data confidence labels, and how-to workflow.
- [x] Created `/compare/[slug]` SSG page with `generateStaticParams`, `generateMetadata`, breadcrumb, quick summary, table, cautious verdict, cloud alternative section, related links, and FAQ.
- [x] Added components: `ComparisonCard`, `ComparisonTable`, `ComparisonVerdict`, `ComparisonCta`, `ComparisonSourceNotice`.
- [x] Added safe JSON-LD (`BreadcrumbList`, `WebPage`, `FAQPage`) for detail pages.
- [x] Updated sitemap with `/compare` and dynamic comparison URLs.
- [x] Added compare-specific styles with mobile-safe table container.
- [x] Fixed TypeScript mismatch by updating `Gpu.benchmark` type to `number | null` to match existing data.

### Audit Snapshot
- Total comparison records: `5`
- Valid slugs: `5`
- Comparison GPU targets: `10`
- Target GPU slugs found in `data/gpus.json`: `10/10`
- Comparison records marked draft/low confidence: `5/5`
- Comparison records with sources: `0/5`
- GPU records referenced by comparisons: `8`
- Referenced GPU records with sources: `7`

### Checked
- [x] `npm run data:validate` (0 errors, 51 warnings)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/compare` and 5 `/compare/[slug]` static paths.

### Issues
- `data:validate` still reports existing warnings in `data/gpus.json` for source-field mapping gaps; this task did not modify GPU source mappings.
- Comparison records are still draft and have no direct comparison-level sources, so verdicts remain planning-only.

### Files Changed
- `repositories/comparison.repository.ts`
- `services/comparison.service.ts`
- `types/gpu.ts`
- `components/ComparisonCard.tsx`
- `components/ComparisonTable.tsx`
- `components/ComparisonVerdict.tsx`
- `components/ComparisonCta.tsx`
- `components/ComparisonSourceNotice.tsx`
- `app/(frontend)/compare/page.tsx`
- `app/(frontend)/compare/[slug]/page.tsx`
- `app/(frontend)/sitemap.ts`
- `app/(frontend)/theme.css`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Day 7 - build landing page skeleton using source-aware planning structure.

---

## 2026-06-02 - Day 6.1 comparison UX and SEO integration refinement

### Agent
Codex

### Planned Task
Make `/compare` discoverable across the site and refine comparison UX/SEO before moving to Day 7.

### What Was Missing After Initial Day 6
- `/compare` existed and was in the sitemap, but it was not clearly discoverable from main navigation, homepage, GPU pages, calculator flow, or footer.
- `/compare` cards were useful as links but did not yet expose enough source-backed planning hints.
- `/compare/[slug]` pages had the required skeleton sections, but the above-the-fold summary and pair-specific FAQ needed refinement.

### Completed
- [x] Added `Compare` to config-driven navigation via `data/navigation.json`; header and footer now expose `/compare`.
- [x] Added homepage links to `/compare` in the topic grid and starting points.
- [x] Added a `/gpu` hub CTA: `Compare GPUs side by side`.
- [x] Added related comparison links on `/gpu/[slug]`, with safe fallback to `/compare`.
- [x] Added calculator links to `/compare` after VRAM estimate guidance.
- [x] Upgraded `/compare` hub with workflow cards, grouped comparison sections, intent labels, and source-aware GPU hints.
- [x] Upgraded comparison detail pages with quick summary cards, cautious verdict labels, CTA block, pair-specific FAQ, and richer source/confidence display.
- [x] Updated comparison table behavior so required un-sourced fields show `Needs verification` and mobile rows stack without horizontal overflow.

### Checked
- [x] `npm run data:validate` (0 errors, 51 warnings)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/compare` and 5 `/compare/[slug]` static paths.
- [x] Static export files exist for `/`, `/gpu`, `/tools/vram-calculator`, `/compare`, and all 5 comparison pages.
- [x] Sitemap includes `/compare` and all comparison detail URLs.
- [x] Brand/domain hardcode scan passed in `app`, `components`, `lib`, `services`, and `repositories`.
- [x] Confirmed no project-level `src` directory outside dependency folders.

### Issues
- `data:validate` still reports 51 existing warnings in `data/gpus.json` for source-field mapping gaps; this patch did not modify GPU data.
- Comparison records remain draft/low confidence and have no direct benchmark sources, so comparison pages stay planning-only.
- No price, availability, tokens/s, image speed, affiliate link, or buying recommendation was added.

### Files Changed
- `data/navigation.json`
- `services/comparison.service.ts`
- `components/ComparisonCard.tsx`
- `components/ComparisonTable.tsx`
- `components/ComparisonVerdict.tsx`
- `components/ComparisonSourceNotice.tsx`
- `app/(frontend)/page.tsx`
- `app/(frontend)/gpu/page.tsx`
- `app/(frontend)/gpu/[slug]/page.tsx`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `app/(frontend)/compare/page.tsx`
- `app/(frontend)/compare/[slug]/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 7 - build landing page skeleton using source-aware planning structure.

---

## 2026-06-02 - Day 6.2 focused comparison page polish

### Agent
Codex

### Planned Task
Polish existing comparison pages to make them more useful, easier to scan, and stronger for SEO before Day 7 without rebuilding Day 6 or adding unsupported claims.

### Completed
- [x] Added a CSS/HTML `ComparisonHeroVisual` block for GPU A vs GPU B near the top of comparison detail pages.
- [x] Kept the visual block free of external images, brand logos, and unsupported performance claims.
- [x] Reworked `ComparisonTable` into grouped sections: Memory planning, Compute / architecture, Power planning, and Verification.
- [x] Replaced separate vendor-specific core rows with one `Core / execution units` row.
- [x] Hid irrelevant vendor-only rows and kept variant-specific notes short.
- [x] Strengthened `ComparisonVerdict` with cautious explanatory sentences based only on source-backed VRAM, bandwidth, and power fields.
- [x] Added pair-specific FAQ copy for all 5 comparison slugs and included the first pair-specific FAQ in JSON-LD.
- [x] Added `How to interpret this comparison` to each comparison detail page.
- [x] Updated comparison card GPU hints to avoid showing unsourced specs as source-backed hints.
- [x] Cleaned next-step labels to `RECOMMENDED NEXT STEP` and `NEXT STEP`.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing GPU source-field mapping warnings)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Brand/domain hardcode scan in `app`, `components`, `lib`, `services`, `repositories`
- [x] Confirmed no project-level `src` directory outside dependency/build folders
- [x] Confirmed static export generated `/compare` and all 5 `/compare/[slug]` pages

### Issues
- `data:validate` warnings remain from existing GPU source-field mapping gaps, especially unsourced draft/spec fields in `data/gpus.json`.
- No benchmark verdicts, price, availability, tokens/s, image speed, affiliate links, or purchase recommendations were added.

### Files Changed
- `components/ComparisonHeroVisual.tsx`
- `components/ComparisonTable.tsx`
- `components/ComparisonVerdict.tsx`
- `components/ComparisonCta.tsx`
- `services/comparison.service.ts`
- `app/(frontend)/compare/[slug]/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 7 - build landing page skeleton using source-aware planning structure.

---

## 2026-06-02 - Pre-Day 7 micro content and SEO cleanup

### Agent
Codex

### Planned Task
Apply a small content and SEO polish after Day 6.2 without rebuilding existing pages or adding unsupported claims.

### Completed
- [x] Replaced outdated homepage `Upcoming hardware data` messaging with current planning-page copy for GPU profiles and comparisons.
- [x] Softened shared status badges to `Planning draft`, `Benchmark evidence missing`, and `Source-backed GPU specs available`.
- [x] Softened GPU service warning wording while preserving verification requirements.
- [x] Cleaned comparison detail FAQ down to four non-duplicate questions: pair-specific, calculator, cloud GPU, and purchase-guidance disclaimer.
- [x] Updated comparison FAQ JSON-LD to match the cleaned FAQ set.
- [x] Removed `- Draft` from comparison detail metadata titles and WebPage schema titles at render time.
- [x] Updated calculator result actions to link clearly to GPU profiles and comparisons.
- [x] Removed `Best GPU` wording from calculator related links.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing GPU source-field mapping warnings)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Brand/domain hardcode scan in `app`, `components`, `lib`, `services`, `repositories`
- [x] Static output scan confirmed comparison metadata titles no longer include `- Draft`

### Issues
- Existing GPU source-field mapping warnings remain unchanged.
- Comparison pages remain planning guidance and do not include benchmark, price, availability, affiliate, tokens/s, image speed, or buying claims.

### Files Changed
- `app/(frontend)/page.tsx`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `app/(frontend)/gpu/page.tsx`
- `app/(frontend)/compare/page.tsx`
- `app/(frontend)/compare/[slug]/page.tsx`
- `components/DataConfidenceBadge.tsx`
- `components/VramCalculator.tsx`
- `components/ComparisonTable.tsx`
- `services/gpu.service.ts`
- `services/vram-calculator.service.ts`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 7 - build landing page skeleton using source-aware planning structure.

---

## 2026-06-02 - Day 7 build landing page skeleton

### Agent
Codex

### Planned Task
Create local AI workstation build planning hub and detail pages without adding exact parts, prices, affiliate links, benchmarks, tokens/s, FPS, image-speed, availability, or buying claims.

### Completed
- [x] Replaced `/builds` placeholder with a build planning hub listing 5 route cards.
- [x] Reworked `data/builds.json` into 5 Day 7 planning records: local LLM starter, 16GB VRAM local AI, high-VRAM workstation, image workflow, and cloud-vs-local planning.
- [x] Extended build types, repository, and service flow for static params, resolved GPU profiles, resolved comparison pages, and missing-link warnings.
- [x] Added `/builds/[slug]` SSG pages with `generateStaticParams`, `generateMetadata`, breadcrumb, one H1, planning badges, summary cards, who-for copy, checklist, GPU options, related comparisons, cloud checkpoint, FAQ, CTA, and safe JSON-LD.
- [x] Added build components: `BuildCard`, `BuildPlanningChecklist`, `BuildGpuOptions`, `BuildRelatedComparisons`, and `BuildCta`.
- [x] Added all build detail pages to sitemap.
- [x] Added responsive build page/card/checklist/CTA styling.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing GPU source-field mapping warnings)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/builds` and 5 `/builds/[slug]` static paths.
- [x] Static export contains `/builds.html` and all 5 detail HTML files.
- [x] Brand/domain hardcode scan passed in `app`, `components`, `lib`, `services`, and `repositories`.
- [x] Build-file unsupported-claim scan found only negative disclaimer wording.

### Issues
- Existing `data/gpus.json` source-field mapping warnings remain unchanged.
- Build pages are planning drafts and not benchmark-backed recommendations.
- No exact component list, price, availability, affiliate link, benchmark claim, tokens/s, FPS, image-speed claim, or buying recommendation was added.

### Files Changed
- `data/builds.json`
- `types/build.ts`
- `repositories/build.repository.ts`
- `services/build.service.ts`
- `components/BuildCard.tsx`
- `components/BuildPlanningChecklist.tsx`
- `components/BuildGpuOptions.tsx`
- `components/BuildRelatedComparisons.tsx`
- `components/BuildCta.tsx`
- `app/(frontend)/builds/page.tsx`
- `app/(frontend)/builds/[slug]/page.tsx`
- `app/(frontend)/sitemap.ts`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 7.x or Day 8 - continue with guide pages or source-backed build enrichment candidates before any purchase-oriented content.

---

## 2026-06-02 - Day 7.1 build page differentiation polish

### Agent
Codex

### Planned Task
Make build pages feel like full local AI workstation planning routes rather than GPU/Compare-style pages, without rebuilding Day 7 or adding unsupported hardware claims.

### Completed
- [x] Added `BuildPlanningStack` with Workload, VRAM tier, GPU planning class, System constraints, and Validation path.
- [x] Added Planning outcome sections to every `/builds/[slug]` page.
- [x] Reordered build detail pages so workload, summary, planning stack, system checklist, and build-specific notes appear before GPU planning options.
- [x] Expanded `BuildPlanningChecklist` into grouped system-level sections: Memory planning, GPU planning, Power and thermals, Storage and workflow, Runtime validation, and Evidence.
- [x] Added build-specific planning notes for starter, 16GB VRAM, high-VRAM, image workflow, and cloud-vs-local routes.
- [x] Added a Cloud vs Local decision framework with cloud-first and local-planning criteria, without provider pricing or recommendations.
- [x] Improved `/builds` with a `Choose a planning route` section and cards showing key build constraints plus GPU planning class.
- [x] Updated build-specific FAQ questions to avoid generic repetition.
- [x] Added compatibility disclaimer covering motherboard, case, PSU connector, cooling clearance, OS, driver, and runtime compatibility.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing GPU source-field mapping warnings)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/builds` and 5 `/builds/[slug]` static paths.
- [x] Brand/domain hardcode scan passed in `app`, `components`, `lib`, `services`, and `repositories`.
- [x] Confirmed forbidden schema types (`Product`, `Review`, `Offer`, `AggregateRating`) are not present in build output.
- [x] Confirmed static output includes Planning stack, Planning outcome, Choose a planning route, and Cloud vs local decision framework.

### Issues
- Existing `data/gpus.json` source-field mapping warnings remain unchanged.
- Build pages remain planning drafts and do not validate exact PC parts, price, availability, benchmark speed, tokens/s, FPS, image speed, affiliate offers, or buying recommendations.
- Output scans still find price/availability terms in safety disclaimers and footer transparency copy; no price/availability schema or offer markup was added.

### Files Changed
- `data/builds.json`
- `components/BuildCard.tsx`
- `components/BuildPlanningChecklist.tsx`
- `components/BuildPlanningStack.tsx`
- `app/(frontend)/builds/page.tsx`
- `app/(frontend)/builds/[slug]/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 7.2 or Day 8 - continue guide pages or source-backed enrichment candidates before any purchase-oriented build content.

---

## 2026-06-03 - Pre-Day 8 build UX cleanup

### Agent
Codex

### Planned Task
Polish `/builds` and `/builds/[slug]` UX before starting Day 8, without rebuilding the Build section or adding unsupported hardware claims.

### Completed
- [x] Reworked `BuildPlanningChecklist` into compact grouped cards with short summaries for Memory planning, GPU planning, Power and thermals, Storage and workflow, Runtime validation, and Evidence and testing.
- [x] Kept route-specific priority checks while making checklist content shorter and easier to scan.
- [x] Replaced repeated lower-section confidence badges in build, GPU, and comparison cards with lighter inline `Planning confidence` notes.
- [x] Kept the primary `DataConfidenceBadge` near the build detail hero.
- [x] Added visual markers to `BuildPlanningStack` for Workload, VRAM, GPU, System, and Validation flow.
- [x] Changed build detail GPU section heading to `GPU planning candidates` and used cautious planning copy.
- [x] Kept GPU candidates after planning stack, planning outcome, checklist, and build-specific notes.
- [x] Added route-aware FAQ sets so each build page has clearer unique intent coverage.
- [x] Softened build wording away from buy/buying language toward local hardware commitment and decision wording.
- [x] Improved build route/card/checklist/stack CSS for compact desktop grids and stacked mobile layout.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing GPU source-field mapping warnings)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Brand/domain hardcode scan in `app`, `components`, `lib`, `services`, `repositories`
- [x] Forbidden schema scan for `Product`, `Review`, `Offer`, and `AggregateRating` in build output
- [x] Static output scan confirmed build pages include `GPU planning candidates`, `Planning confidence`, route-specific checklist sections, and `Evidence and testing`
- [x] Static output scan confirmed build SEO titles do not append `Draft`

### Issues
- Existing `data/gpus.json` source-field mapping warnings remain unchanged.
- Build pages remain planning drafts and do not include exact parts, prices, affiliate links, speed claims, availability claims, benchmarks, tokens/s, image speed, or buying recommendations.

### Files Changed
- `app/(frontend)/builds/page.tsx`
- `app/(frontend)/builds/[slug]/page.tsx`
- `app/(frontend)/theme.css`
- `components/BuildCard.tsx`
- `components/BuildGpuOptions.tsx`
- `components/BuildPlanningChecklist.tsx`
- `components/BuildPlanningStack.tsx`
- `components/BuildRelatedComparisons.tsx`
- `data/builds.json`
- `services/build.service.ts`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 8 - Cloud GPU data model.

---

## 2026-06-03 - Day 8.3 cloud GPU provider dataset recovery

### Agent
Codex

### Planned Task
Safely recover and complete `data/cloud-gpu-providers.json` after the earlier Day 8.3 context interruption, without expanding into routes, UI, or data-layer code.

### Completed
- [x] Read the required project handoff docs, data policy docs, cloud GPU type file, package scripts, and validation script before editing data.
- [x] Confirmed `data/cloud-gpu-providers.json` was missing and recreated it at the expected path.
- [x] Added 8 provider records for `runpod`, `vast-ai`, `lambda`, `paperspace`, `digitalocean-gpu`, `vultr-cloud-gpu`, `modal`, and `replicate`.
- [x] Aligned every record to the current `CloudGpuProvider` schema, including `officialWebsiteUrl`, `pricingNotes`, `sources`, `lastVerifiedAt`, and `unsafeToPublishFields`.
- [x] Used cautious copy only and avoided placeholder text, demo text, unsupported superlatives, price snapshots, commission claims, and buying recommendations.
- [x] Marked unresolved referral states as `affiliateStatus: "unknown"` with null affiliate URL and commission notes.
- [x] Marked records `reviewed` with `dataConfidence: "medium"` only where official source coverage was enough for basic provider-type/pricing/referral verification.
- [x] Kept `needsReview: true` on all 8 providers because pricing scope, GPU availability, and program terms can change.
- [x] Ran a local schema guard for the cloud GPU dataset and confirmed all 8 records parse and match the enum/value expectations.

### Checked
- [x] Local schema/enum check for `data/cloud-gpu-providers.json` (`records=8`)
- [x] Prohibited-language scan for placeholder/demo/best/cheapest/fastest/recommended wording
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`; cloud GPU dataset is not yet covered by this validator)
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- `scripts/validate-data.ts` does not yet validate `data/cloud-gpu-providers.json`, so cloud GPU checks currently rely on the local schema guard plus lint/build.
- Existing 51 warnings remain in `data/gpus.json` and are unrelated to this task.
- The worktree already contained unrelated pending changes in `types/index.ts` and `types/cloud-gpu-provider.ts`; they were left untouched.

### Files Changed
- `data/cloud-gpu-providers.json`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 8.4 - add the cloud GPU repository/service layer or validator coverage only if the next task explicitly asks for it.

---

## 2026-06-03 - Day 8.4 cloud GPU provider repository and service

### Agent
Codex

### Planned Task
Create the repository and service layer for `data/cloud-gpu-providers.json` without adding public routes, UI components, navigation, or sitemap entries.

### Completed
- [x] Read `AGENTS.md`, existing repository/service patterns, `types/cloud-gpu-provider.ts`, `data/cloud-gpu-providers.json`, `repositories/build.repository.ts`, and `services/build.service.ts`.
- [x] Added `repositories/cloud-gpu-provider.repository.ts` with safe shape validation and read-only filter helpers.
- [x] Added `services/cloud-gpu-provider.service.ts` with neutral list/detail helpers, warning helpers, affiliate notices, pricing notices, data-confidence helper, and build-intent matching.
- [x] Kept build-intent matching as source-aware discovery only, without ranking providers or creating recommendations.
- [x] Used required cautious wording for unknown affiliate status, low confidence, unknown pricing model, and missing exact pricing.
- [x] Avoided route, UI, navigation, and sitemap changes.

### Checked
- [x] `npm run lint`
- [x] `npm run build`

### Issues
- `scripts/validate-data.ts` still does not validate `data/cloud-gpu-providers.json`; no validator changes were made in this scope.
- Existing pending worktree changes in `data/cloud-gpu-providers.json`, `types/cloud-gpu-provider.ts`, and `types/index.ts` were preserved.

### Files Changed
- `repositories/cloud-gpu-provider.repository.ts`
- `services/cloud-gpu-provider.service.ts`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 8.5 - add cloud GPU data validation coverage or create a non-public integration check, depending on the next prompt.

---

## 2026-06-03 - Day 8.5 validate cloud GPU provider data model

### Agent
Codex

### Planned Task
Finish Day 8 safely by validating the Cloud GPU provider data/model/repository/service layer and updating handoff docs without creating public cloud GPU pages.

### Day 8 Task Summary
- Added `data/cloud-gpu-providers.json` with 8 cautious provider records.
- Added `types/cloud-gpu-provider.ts` and exported the types through `types/index.ts`.
- Added `repositories/cloud-gpu-provider.repository.ts`.
- Added `services/cloud-gpu-provider.service.ts`.
- Added validator coverage for `data/cloud-gpu-providers.json`.
- No `/cloud-gpu` public pages, nav entries, or sitemap entries were created.

### Completed
- [x] Read required project docs, package scripts, validator, cloud GPU data, cloud GPU type, repository, service, and sitemap before editing.
- [x] Extended `scripts/validate-data.ts` to include `data/cloud-gpu-providers.json`.
- [x] Added cloud provider checks for array shape, required fields, unique slugs, allowed enum values, source completeness, source field mappings, reviewed/published source requirements, unknown affiliate URL safety, commission note sourcing, unsupported exact pricing/availability fields, and unsupported superlative wording.
- [x] Updated validator source type whitelist for cloud GPU source roles already present in the type model: `pricing`, `affiliate`, `referral`, and `terms`.
- [x] Confirmed provider seed count: 8.
- [x] Confirmed provider records with official/source-backed source metadata: 8.
- [x] Confirmed all 8 reviewed records have `lastVerifiedAt` and at least 2 source-backed core fields mapped in `sources[].fields`.
- [x] Confirmed unknown affiliate records do not include affiliate links.
- [x] Confirmed no exact pricing fields, unsupported commission claims, unsupported availability claims, or provider recommendations were added.
- [x] Confirmed no `/cloud-gpu` route, `/cloud-gpu/[slug]` route, nav link, or sitemap entry exists.
- [x] Web/source access was available in the environment, but this Day 8.5 pass did not add new facts from the web; it validated the local source metadata recorded in the data file.

### Provider Snapshot
- Provider seed count: 8.
- Reviewed/source-backed providers: `runpod`, `vast-ai`, `lambda`, `paperspace`, `digitalocean-gpu`, `vultr-cloud-gpu`, `modal`, `replicate`.
- Draft providers: none.
- Referral verified providers: `runpod`, `digitalocean-gpu`, `vultr-cloud-gpu`.
- Affiliate status unknown providers: `vast-ai`, `lambda`, `paperspace`, `modal`, `replicate`.

### Fields Verified
- Core fields mapped through `sources[].fields`: `officialWebsiteUrl`, `providerType`, `useCases`, `pricingModel`, `affiliateStatus`, `affiliateProgramUrl`, and selected `notes`.
- Repository functions added: `getAllCloudGpuProviders`, `getCloudGpuProviderBySlug`, `getCloudGpuProviderSlugs`, `getCloudGpuProvidersByUseCase`, `getCloudGpuProvidersByType`, `getCloudGpuProvidersByAffiliateStatus`, `getDraftCloudGpuProviders`, `getReviewedCloudGpuProviders`, `getPublishedCloudGpuProviders`.
- Service functions added: `getCloudGpuProviderListItems`, `getCloudGpuProviderDetail`, `getCloudGpuProvidersForUseCase`, `getCloudGpuProviderWarnings`, `getCloudGpuProviderDataConfidence`, `getCloudGpuProviderAffiliateNotice`, `getCloudGpuProviderPricingNotice`, `getCloudGpuProvidersForBuildIntent`.

### Fields Left Unknown
- Exact prices are not stored.
- Availability and GPU inventory are not claimed.
- Commission amounts are not stored.
- `pricingNotes` remains null for all 8 providers.
- `commissionNotes` remains null for all 8 providers.
- `affiliateProgramUrl` remains null where `affiliateStatus` is `unknown`.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing GPU source-field mapping warnings unrelated to cloud GPU providers)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Safety audit for exact pricing, availability, commission, affiliate URL, and superlative/recommendation wording
- [x] Route/nav/sitemap audit for `/cloud-gpu`

### Data Limitations
- No public cloud GPU pages exist yet.
- Exact prices require a future timestamped/source-backed schema before storage.
- Availability should stay omitted unless tied to a timestamped official source.
- Affiliate status is only verified where official referral/affiliate sources exist.
- Provider discovery remains neutral and should not be rendered as ranking or recommendation copy.

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain and are unrelated to Day 8.

### Files Changed
- `scripts/validate-data.ts`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 9 - create the Cloud GPU vs Local GPU guide only after keeping cloud provider data source-aware and non-recommendational.

---

## 2026-06-03 - Day 9 cloud GPU vs local GPU guide

### Agent
Codex

### Planned Task
Create a source-aware guide at `/guides/cloud-gpu-vs-local-gpu` without creating `/cloud-gpu` provider pages, provider ranking, affiliate CTAs, or unsupported price and performance claims.

### Completed
- [x] Read the required project docs, cloud GPU data/model files, build pages, guide index, sitemap, and SEO helper before editing.
- [x] Added `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx` with one H1, unique metadata, breadcrumb UI, planning notice, quick-answer section, local vs cloud vs SaaS sections, qualitative cost factors, suggested workflow, CTA cards, FAQ, and JSON-LD for `WebPage`, `FAQPage`, and `BreadcrumbList`.
- [x] Added `components/CloudVsLocalTable.tsx` with a mobile-safe Local GPU vs Cloud GPU planning table covering upfront cost, recurring cost, setup time, privacy/control, scalability, maintenance, VRAM flexibility, availability risk, and best planning use.
- [x] Added `components/DecisionMatrix.tsx` with six cautious planning scenarios and next-step answers.
- [x] Updated `app/(frontend)/guides/page.tsx` from a simple placeholder into a guide hub that surfaces published planning guides and keeps internal guide routing consistent.
- [x] Updated `data/guides.json` so `cloud-gpu-vs-local-gpu` is a published medium-confidence planning guide with related internal routes only.
- [x] Updated `app/(frontend)/sitemap.ts` to include `/guides/cloud-gpu-vs-local-gpu`.
- [x] Updated `app/(frontend)/theme.css` to support guide cards, decision cards, factor/workflow lists, and guide-table layout reuse.
- [x] Kept cloud provider data usage neutral by limiting it to a provider-count note and not rendering provider cards or provider detail links.
- [x] Confirmed the guide links only to existing routes: `/tools/vram-calculator`, `/gpu`, `/compare`, `/builds`, and `/builds/cloud-vs-local-ai-build-planning`.
- [x] Confirmed no `/cloud-gpu` route, `/cloud-gpu/[slug]` route, nav entry, or sitemap entry was created.
- [x] Confirmed no provider ranking, affiliate links, exact pricing claims, availability claims, commission claims, benchmark claims, tokens/s claims, or image-speed claims were added.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/guides/cloud-gpu-vs-local-gpu` as a static route
- [x] Sitemap update includes `/guides/cloud-gpu-vs-local-gpu` and does not include `/cloud-gpu`

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to this guide task.
- The guide intentionally avoids provider ranking, exact pricing, availability, and buying advice, so Day 10 provider-page work still remains separate.

### Files Changed
- `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`
- `app/(frontend)/guides/page.tsx`
- `app/(frontend)/sitemap.ts`
- `app/(frontend)/theme.css`
- `components/CloudVsLocalTable.tsx`
- `components/DecisionMatrix.tsx`
- `data/guides.json`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 10 - create the Cloud GPU provider index and detail-page skeleton only if the next task explicitly allows public `/cloud-gpu` routes and keeps provider content non-recommendational.

---

## 2026-06-03 - Day 9.1 cloud GPU vs local GPU guide SEO polish

### Agent
Codex

### Planned Task
Upgrade `/guides/cloud-gpu-vs-local-gpu` from a correct MVP guide into a stronger SEO pillar page without creating public `/cloud-gpu` routes, provider ranking, affiliate CTAs, or unsupported price and performance claims.

### Completed
- [x] Re-read the required project docs plus the guide page, guide components, cloud provider data/service, sitemap, SEO helper, and theme styles before editing.
- [x] Strengthened the hero so the page immediately explains what decision it helps with, who it is for, and why workload frequency, VRAM uncertainty, privacy/control, and setup effort change the answer.
- [x] Added a `Quick verdict` block near the top covering local GPU planning, cloud GPU testing, and SaaS/API tool paths.
- [x] Expanded the guide with clearer sections for what the page compares, when local planning may make sense, when cloud testing may make sense, when SaaS/API tools may be simpler, and common mistakes to avoid.
- [x] Replaced the simple workflow list with a visual 5-step planning workflow linked to `/tools/vram-calculator`, `/gpu`, `/compare`, `/builds`, and `/builds/cloud-vs-local-ai-build-planning`.
- [x] Strengthened the `Continue planning` CTA section so the VRAM Calculator is the primary next step and the supporting routes are easier to scan.
- [x] Reworked the cloud provider data note into a trust-focused explanation for why provider ranking is intentionally not public yet.
- [x] Expanded FAQ answers to 2-3 useful sentences each while keeping all wording cautious and source-aware.
- [x] Upgraded `components/CloudVsLocalTable.tsx` with clearer intro copy, improved table readability, and an added `Storage and data movement` planning row.
- [x] Upgraded `components/DecisionMatrix.tsx` so every scenario now includes `Planning direction` and `Next step`, and added the model-validation scenario.
- [x] Improved guide-related CSS in `app/(frontend)/theme.css` for body-copy readability, section hierarchy, card spacing, responsive CTA layouts, mobile-safe table behavior, and cleaner decision-matrix presentation.
- [x] Confirmed `/builds/cloud-vs-local-ai-build-planning` exists before linking to it.
- [x] Confirmed no `/cloud-gpu` route, `/cloud-gpu/[slug]` route, nav entry, or sitemap entry was created.
- [x] Confirmed no provider ranking, affiliate links, exact pricing claims, availability claims, commission claims, benchmark claims, tokens/s claims, image-speed claims, or provider performance claims were added.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/guides/cloud-gpu-vs-local-gpu`
- [x] Internal links checked for `/tools/vram-calculator`, `/gpu`, `/compare`, `/builds`, and `/builds/cloud-vs-local-ai-build-planning`
- [x] Sitemap still includes `/guides/cloud-gpu-vs-local-gpu` and does not include `/cloud-gpu`

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to this guide polish task.
- The guide remains planning guidance only and intentionally does not include provider ranking, exact cost comparisons, availability tracking, or buying advice.

### Files Changed
- `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`
- `components/CloudVsLocalTable.tsx`
- `components/DecisionMatrix.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 10 can proceed if the next prompt explicitly allows public `/cloud-gpu` route work while keeping provider content source-aware, non-rank-based, and free of unsupported price or performance claims.

---

## 2026-06-03 - Day 9.2 final polish for guides SEO UX

### Agent
Codex

### Planned Task
Polish `/guides` and `/guides/cloud-gpu-vs-local-gpu` for final readability, hierarchy, CTA strength, and guide-hub quality before Day 10 without rewriting the guide or creating `/cloud-gpu` pages.

### Completed
- [x] Re-read the guide hub, guide detail page, cloud-vs-local components, and handoff docs before editing.
- [x] Increased guide-detail readability with slightly larger copy and more relaxed line-height across hero support text, section leads, table text, decision copy, CTA cards, provider note, and list-based planning content.
- [x] Strengthened visual hierarchy so `Quick verdict`, `Cloud GPU vs local GPU planning table`, `Decision matrix`, `Suggested planning workflow`, and `Continue planning` feel like primary sections instead of blending with secondary content.
- [x] Kept secondary sections lighter so the page feels easier to scan and less same-card-heavy.
- [x] Added a mobile-only stacked-card fallback to `components/CloudVsLocalTable.tsx` so the cloud-vs-local comparison stays readable on small screens without horizontal overflow.
- [x] Kept the desktop comparison table intact for wider screens.
- [x] Strengthened the `Continue planning` CTA section so `Use VRAM Calculator` is the clear primary next step while Builds, Compare, and Cloud vs Local build planning stay secondary.
- [x] Improved `/guides` with a stronger featured published-guide card, category/status labels, and `Read guide →` action text.
- [x] Added a clearly marked `Planned guide topics` section to `/guides` without creating public routes or fake guide links.
- [x] Updated guide-related CSS to support featured guide cards, primary-section hierarchy, stronger CTA treatment, planned-topic cards, and the mobile stacked-card comparison layout.
- [x] Confirmed no `/cloud-gpu` route, `/cloud-gpu/[slug]` route, nav entry, or sitemap entry was created.
- [x] Confirmed no provider ranking, affiliate links, exact pricing claims, availability claims, commission claims, benchmark claims, tokens/s claims, image-speed claims, or best/cheapest/fastest wording were introduced.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/guides` and `/guides/cloud-gpu-vs-local-gpu`
- [x] Cloud-vs-local comparison keeps a desktop table and a mobile stacked-card fallback

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to this guide-polish task.
- The guide and guide hub remain planning-oriented and intentionally avoid provider ranking, exact pricing, availability tracking, affiliate links, or buying advice.

### Files Changed
- `app/(frontend)/guides/page.tsx`
- `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`
- `components/CloudVsLocalTable.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 10 is in a stronger place now, but public `/cloud-gpu` route work should still only start if the next task explicitly allows source-aware provider pages without ranking, affiliate pressure, or unsupported price and performance claims.

---

## 2026-06-03 - Day 9.2 workflow and CTA alignment polish

### Agent
Codex

### Planned Task
Polish the workflow and CTA card alignment on `/guides/cloud-gpu-vs-local-gpu` so the section feels more balanced and premium without changing guide scope or introducing `/cloud-gpu` links.

### Completed
- [x] Shortened workflow and CTA button labels so the action area feels lighter and more consistent.
- [x] Updated workflow cards to use consistent bottom-aligned actions with smaller button sizing and balanced card heights.
- [x] Replaced the empty action area on `Test cloud if uncertain` with a muted non-clickable `Provider pages planned later` label.
- [x] Kept the build-validation workflow card with a secondary route action while aligning both actions more cleanly.
- [x] Changed the desktop `Continue planning` card layout to a more balanced 2x2 grid.
- [x] Kept `Use VRAM Calculator` as the visually strongest CTA and softened the secondary CTA buttons.
- [x] Confirmed no `/cloud-gpu` links, provider ranking, affiliate links, exact price claims, availability claims, commission claims, benchmark claims, tokens/s claims, or image-speed claims were added.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/guides/cloud-gpu-vs-local-gpu`

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to this alignment-polish pass.

### Files Changed
- `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`
- `app/(frontend)/theme.css`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
The guide UI is now better balanced for Day 10, but public cloud-provider route work should still wait for an explicit task that preserves source-aware and non-rank-based constraints.

---

## 2026-06-03 - Day 9.2 workflow 2-row redesign

### Agent
Codex

### Planned Task
Redesign the `Suggested planning workflow` section on `/guides/cloud-gpu-vs-local-gpu` from a cramped 5-card single row into a balanced 2-row responsive workflow layout.

### Completed
- [x] Confirmed Tailwind utilities are available in the repo through `@import "tailwindcss"` in `app/(frontend)/globals.css`.
- [x] Reworked the workflow section directly in `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx` using Tailwind utility classes only, without adding CSS files, CSS modules, or inline style blocks.
- [x] Replaced the previous 5-card horizontal layout with a responsive grid: 1 column on mobile, 2 columns on tablet, and 3 columns on desktop.
- [x] Added the 6th workflow card: `Recommended next step`.
- [x] Kept each workflow card as a flex column with bottom-aligned actions for more consistent card height and cleaner scanning.
- [x] Preserved the no-link cloud-testing card behavior with a muted `Provider pages planned later` label instead of a broken action.
- [x] Kept both local-build actions only on the build-validation card and preserved the existing route check intent.
- [x] Confirmed no `/cloud-gpu` route or link was added and no affiliate, ranking, pricing, availability, commission, benchmark, tokens/s, or image-speed claims were introduced.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/guides/cloud-gpu-vs-local-gpu`

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to this workflow redesign pass.

### Files Changed
- `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
The workflow section is now in a stronger desktop/tablet/mobile layout for Day 10, while cloud-provider routing and monetization constraints remain unchanged.

---

## 2026-06-03 - Day 9.3 reduce repeated numbered guide blocks

### Agent
Codex

### Planned Task
Polish `/guides/cloud-gpu-vs-local-gpu` so the guide feels less repetitive and more premium by reducing repeated numbered-card patterns while preserving SEO content and safety constraints.

### Completed
- [x] Removed visible numbering from the `Quick verdict` cards and kept them as three compact verdict cards.
- [x] Changed the local GPU and cloud GPU reason sections from numbered cards into two-column checklist-style cards with subtle dot markers.
- [x] Changed `How to think about the tradeoff` from numbered cards into principle cards with subtle visual markers.
- [x] Kept numbering only where it helps scanning and sequencing: `Decision matrix` and `Suggested planning workflow`.
- [x] Confirmed `Suggested planning workflow` remains a responsive 6-card layout: 3 columns on desktop, 2 columns on tablet, and 1 column on mobile.
- [x] Confirmed the cloud-testing workflow card does not link to `/cloud-gpu` and uses the muted `Provider pages planned later` label.
- [x] Confirmed the cloud-vs-local table uses a desktop table and mobile stacked cards without showing both layouts at the same breakpoint.
- [x] Confirmed `Continue planning` remains balanced with `Use VRAM Calculator` as the primary CTA and supporting routes as secondary CTAs.
- [x] Confirmed no `/cloud-gpu` route, `/cloud-gpu` link, provider ranking, affiliate link, exact price claim, availability claim, commission claim, benchmark claim, tokens/s claim, or image-speed claim was added.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Safety scan for `/cloud-gpu` links, provider ranking, affiliate, pricing, availability, commission, benchmark, tokens/s, and image-speed wording

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to Day 9.3.
- The guide remains planning guidance only and intentionally avoids provider ranking, exact pricing, availability tracking, affiliate links, or buying advice.

### Files Changed
- `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 10 route/provider work should only begin if the next task explicitly allows public `/cloud-gpu` pages and keeps the provider experience source-aware, non-ranking, and free of unsupported pricing or performance claims.

---

## 2026-06-03 - Day 10.1 Cloud GPU data audit and reusable components

### Agent
Codex

### Planned Task
Audit Cloud GPU provider data and create reusable provider UI components for Day 10 pages without creating public Cloud GPU routes yet.

### Completed
- [x] Read the required project docs, daily data update rules, Cloud GPU data/model/repository/service files, existing component patterns, and `package.json`.
- [x] Created `CloudGpuProviderCard` for neutral provider summaries using service list items.
- [x] Created `CloudGpuProviderFacts` for official website, provider type, pricing model, affiliate status, verification date, data confidence, status, and transparent referral reference display.
- [x] Created `CloudGpuProviderNotice` using the Cloud GPU service warning, affiliate notice, and pricing notice helpers with deduped notices in one calm block.
- [x] Created `CloudGpuProviderCta` with safe planning links only.
- [x] Used Tailwind utility classes only in the new components and added no CSS files, CSS modules, styled-components, inline style blocks, logos, or external images.
- [x] Confirmed no `/cloud-gpu` or `/cloud-gpu/[slug]` route directory was created.
- [x] Confirmed no provider ranking, exact pricing, availability, commission, benchmark, tokens/s, image-speed, or affiliate-heavy CTA copy was added.

### Data Audit
- Provider count: 8.
- Reviewed provider count: 8.
- Draft provider count: 0.
- Providers with `official` source entries: 5 (`runpod`, `lambda`, `paperspace`, `digitalocean-gpu`, `vultr-cloud-gpu`).
- Providers with `affiliateStatus: unknown`: 5 (`vast-ai`, `lambda`, `paperspace`, `modal`, `replicate`).
- Providers with `referral_verified` or `available_verified`: 3 (`runpod`, `digitalocean-gpu`, `vultr-cloud-gpu`).
- Providers with missing `lastVerifiedAt`: 0.
- Providers with `unsafeToPublishFields`: 8.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Brand/domain hardcode scan in `components/`, `app/(frontend)/`, `lib/`, `services/`, and `repositories/`
- [x] Route audit confirmed no public `/cloud-gpu` route exists yet

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to Day 10.1.
- Cloud GPU provider pages are still intentionally uncreated; the new components are preparation for Day 10.2.

### Files Changed
- `components/CloudGpuProviderCard.tsx`
- `components/CloudGpuProviderFacts.tsx`
- `components/CloudGpuProviderNotice.tsx`
- `components/CloudGpuProviderCta.tsx`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 10.2 - create source-aware Cloud GPU provider pages only when the next prompt explicitly allows `/cloud-gpu` routes, while preserving non-ranking, no-exact-price, no-availability-claim, and non-affiliate-heavy safeguards.

---

## 2026-06-03 - Day 10.2 Cloud GPU provider hub

### Agent
Codex

### Planned Task
Create the public `/cloud-gpu` provider hub page using Day 8 provider data and Day 10.1 reusable components without creating provider detail routes.

### Completed
- [x] Created `app/(frontend)/cloud-gpu/page.tsx`.
- [x] Used `cloudGpuProviderService.getCloudGpuProviderListItems()` instead of reading JSON directly in the page.
- [x] Added unique metadata, canonical URL, breadcrumb UI, one H1, source-aware intro, provider count, provider cards, source/data notice, how-to-use cards, neutral use-case categories, CTA section, FAQ, and safe JSON-LD.
- [x] Rendered 8 provider cards with `CloudGpuProviderCard`.
- [x] Kept provider profile CTAs as non-links on the hub because `/cloud-gpu/[slug]` is not created yet.
- [x] Updated `CloudGpuProviderCard` to support both future detail links and current non-link hub rendering.
- [x] Updated `CloudGpuProviderNotice` to support a hub-level notice list while preserving provider-specific notice behavior.
- [x] Updated `CloudGpuProviderCta` so the hub can show only the requested external planning links.
- [x] Added `/cloud-gpu` to the sitemap and did not add provider detail URLs.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/cloud-gpu` as a static route
- [x] Exported HTML contains all 8 provider names
- [x] Exported HTML does not include `/cloud-gpu/{slug}` provider detail links
- [x] Sitemap includes `/cloud-gpu`
- [x] Confirmed no `/cloud-gpu/[slug]` route directory exists
- [x] Source scan confirmed no `Product`, `Review`, `Offer`, `AggregateRating`, price, or availability schema was added
- [x] Brand/domain hardcode scan in `components/`, `app/(frontend)/`, `lib/`, `services/`, and `repositories/`

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to Day 10.2.
- Provider detail pages are intentionally not created yet; hub cards show `View planning profile` as a non-link state until Day 10.3 explicitly creates detail routes.

### Files Changed
- `app/(frontend)/cloud-gpu/page.tsx`
- `app/(frontend)/sitemap.ts`
- `components/CloudGpuProviderCard.tsx`
- `components/CloudGpuProviderNotice.tsx`
- `components/CloudGpuProviderCta.tsx`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 10.3 - create source-aware `/cloud-gpu/[slug]` provider detail pages only if explicitly requested, while preserving non-ranking, no exact price, no availability claim, and non-affiliate-heavy safeguards.

---

## 2026-06-03 - Day 10.3 Cloud GPU provider detail pages

### Agent
Codex

### Planned Task
Create source-aware Cloud GPU provider planning profiles at `/cloud-gpu/[slug]`.

### Completed
- [x] Created `app/(frontend)/cloud-gpu/[slug]/page.tsx`.
- [x] Added `generateStaticParams()` from `cloudGpuProviderRepository.getCloudGpuProviderSlugs()`.
- [x] Added `generateMetadata()` from provider `seoTitle` and `seoDescription` through `cloudGpuProviderService.getCloudGpuProviderDetail()`.
- [x] Added `notFound()` handling for invalid provider slugs.
- [x] Rendered 8 provider detail pages from the existing Cloud GPU provider data.
- [x] Added hero, planning fit, provider facts, notices, profile scope, sources, CTA, and FAQ sections.
- [x] Used `CloudGpuProviderFacts`, `CloudGpuProviderNotice`, and `CloudGpuProviderCta`.
- [x] Updated `CloudGpuProviderFacts` to use safe external links and to avoid repeating planning notices on detail pages.
- [x] Re-enabled hub card links now that provider detail pages exist.
- [x] Added all provider detail URLs to `app/(frontend)/sitemap.ts`.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/cloud-gpu/[slug]` with 8 generated paths
- [x] `/cloud-gpu/runpod`, `/cloud-gpu/vast-ai`, and `/cloud-gpu/lambda` exported successfully
- [x] Invalid slug lookup returns null and no invalid static export file exists
- [x] Sitemap includes all 8 provider detail URLs
- [x] Source scan confirmed no `Product`, `Review`, `Offer`, `AggregateRating`, price, or availability schema was added
- [x] Brand/domain hardcode scan in `components/`, `app/(frontend)`, `lib`, `services`, and `repositories`

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to Day 10.3.
- Provider detail pages are planning profiles only; they intentionally avoid ranking, exact cost display, current GPU capacity claims, performance claims, and affiliate-heavy CTAs.

### Files Changed
- `app/(frontend)/cloud-gpu/[slug]/page.tsx`
- `app/(frontend)/cloud-gpu/page.tsx`
- `app/(frontend)/sitemap.ts`
- `components/CloudGpuProviderFacts.tsx`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 10.4 - refine Cloud GPU internal linking and QA only if explicitly requested, while preserving source-aware, non-ranking, no exact price, no availability claim, and non-affiliate-heavy safeguards.

---

## 2026-06-03 - Day 10.4 Cloud GPU final integration and validation

### Agent
Codex

### Planned Task
Finish Day 10 safely after the Cloud GPU hub and provider detail pages were created, including sitemap integration, safe internal links, final safety checks, validation, and documentation updates.

### Completed
- [x] Confirmed `/cloud-gpu` exists as a static/export-compatible Cloud GPU provider hub.
- [x] Confirmed `/cloud-gpu/[slug]` exists with 8 generated provider planning profiles.
- [x] Confirmed `generateStaticParams()` uses provider slugs from `cloudGpuProviderRepository`.
- [x] Confirmed `generateMetadata()` uses provider SEO fields through `cloudGpuProviderService`.
- [x] Confirmed invalid slug lookup returns null and the dynamic route uses `notFound()`.
- [x] Confirmed provider cards render from service/repository data.
- [x] Confirmed provider detail pages show facts, grouped notices, sources, FAQ, and safe related links.
- [x] Confirmed `app/(frontend)/sitemap.ts` includes `/cloud-gpu` and all provider detail routes from repository slugs.
- [x] Added one safe `/cloud-gpu` link to `/guides/cloud-gpu-vs-local-gpu` using `Review Cloud GPU provider profiles` wording.
- [x] Updated the Cloud GPU provider note in the guide so it no longer says provider pages are unpublished.
- [x] Added `/cloud-gpu` as a related planning route on `/guides` without creating a duplicate guide card.
- [x] Kept main navigation and footer navigation unchanged because the header is already full and footer links share the same navigation config.

### Provider Page Count
- Provider count: 8.
- Generated detail pages: 8 (`runpod`, `vast-ai`, `lambda`, `paperspace`, `digitalocean-gpu`, `vultr-cloud-gpu`, `modal`, `replicate`).

### Components Created
- `components/CloudGpuProviderCard.tsx`
- `components/CloudGpuProviderFacts.tsx`
- `components/CloudGpuProviderNotice.tsx`
- `components/CloudGpuProviderCta.tsx`

### Data Audit Summary
- Provider count: 8.
- Reviewed provider count: 8.
- Draft provider count: 0.
- Providers with official source-type coverage: 8.
- Providers with `affiliateStatus: unknown`: 5.
- Providers with `referral_verified` or `available_verified`: 3.
- Providers with missing `lastVerifiedAt`: 0.
- Providers with `unsafeToPublishFields`: 8.

### Safety Checks
- [x] No provider ranking was added.
- [x] No exact provider price claims were added.
- [x] No current provider availability claims were added.
- [x] No commission or recurring commission claims were added.
- [x] No affiliate-heavy CTA copy was added.
- [x] Unknown `affiliateStatus` providers do not expose affiliate program URLs.
- [x] Verified referral links remain transparent references, not primary CTA buttons.
- [x] No benchmark, tokens/s, or image-speed claims were added.
- [x] No `Product`, `Review`, `Offer`, `AggregateRating`, price, or availability schema was added.
- [x] Warnings are grouped through `CloudGpuProviderNotice` and not repeated in provider facts on detail pages.
- [x] Provider sources are shown on detail pages.
- [x] No current brand/domain hardcode appears in `components/`, `app/(frontend)/`, `lib/`, `services/`, or `repositories/`.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Build output includes `/cloud-gpu`
- [x] Build output includes `/cloud-gpu/[slug]` with 8 generated paths
- [x] `/cloud-gpu/runpod`, `/cloud-gpu/vast-ai`, and `/cloud-gpu/lambda` exported successfully
- [x] Every provider slug has a generated page
- [x] `/guides/cloud-gpu-vs-local-gpu` exported successfully
- [x] `/tools/vram-calculator` and `/builds` exported successfully
- [x] Sitemap output includes `/cloud-gpu` and all 8 provider detail URLs

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to Cloud GPU provider pages.
- Provider pages are planning profiles, not rankings.
- Exact prices are not stored unless timestamped/source-backed.
- Availability is not claimed.
- Affiliate/referral links are only shown if verified from official source.
- No provider recommendations are made yet.

### Files Changed
- `app/(frontend)/cloud-gpu/page.tsx`
- `app/(frontend)/cloud-gpu/[slug]/page.tsx`
- `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`
- `app/(frontend)/guides/page.tsx`
- `app/(frontend)/sitemap.ts`
- `components/CloudGpuProviderCard.tsx`
- `components/CloudGpuProviderFacts.tsx`
- `components/CloudGpuProviderNotice.tsx`
- `components/CloudGpuProviderCta.tsx`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Next Step
Day 11 can begin from a complete Day 10 Cloud GPU provider-page foundation, with provider pages still source-aware, non-ranking, and free of unsupported pricing, availability, performance, or affiliate claims.

---

## 2026-06-03 - Day 10.5 Cloud GPU polish and validation

### Agent
Codex

### Planned Task
Audit and polish the completed Cloud GPU hub, provider detail pages, related guide links, footer discovery, sitemap, and safety constraints so Day 10 feels more trustworthy and less like a thin provider directory.

### Completed
- [x] Polished `/cloud-gpu` provider cards by replacing multiple visible status badges with one subtle status/confidence line.
- [x] Kept provider-card CTAs aligned at the bottom and readable with a clearer button treatment.
- [x] Updated `/cloud-gpu` hero copy to frame the page as provider planning after VRAM estimation, not a ranking page, pricing table, or buying recommendation.
- [x] Updated use-case category counts so they read as provider-count labels instead of bare numbers.
- [x] Updated `CloudGpuProviderCta` so `Estimate VRAM first` is the primary CTA and guide/build links remain secondary.
- [x] Centered provider detail hero title, summary, and status pills so the hero text aligns visually with the detail content below.
- [x] Added a concise `How to use this profile` section to provider detail pages.
- [x] Kept provider facts, notices, source trail, FAQ, and related links visible on detail pages.
- [x] Added a footer Explore link to `/cloud-gpu` while leaving the main nav unchanged.
- [x] Confirmed `/guides` and `/guides/cloud-gpu-vs-local-gpu` still provide safe internal paths to `/cloud-gpu`.

### Provider Page Count
- Provider count: 8.
- Generated detail pages: 8 (`runpod`, `vast-ai`, `lambda`, `paperspace`, `digitalocean-gpu`, `vultr-cloud-gpu`, `modal`, `replicate`).

### Sitemap Result
- `/cloud-gpu` is present in `out/sitemap.xml`.
- All 8 `/cloud-gpu/[slug]` routes are present in `out/sitemap.xml`.

### Internal Discovery
- Footer Explore links include `/cloud-gpu`.
- `/guides` includes a related planning route to `/cloud-gpu`.
- `/guides/cloud-gpu-vs-local-gpu` includes one safe `/cloud-gpu` link using provider-profile wording.
- Main nav remains unchanged.

### Safety Audit
- [x] No provider ranking was added.
- [x] No exact provider price claims were added.
- [x] No current provider availability claims were added.
- [x] No commission or recurring commission claims were added.
- [x] No affiliate-heavy CTA copy was added.
- [x] Unknown `affiliateStatus` providers do not expose affiliate program URLs.
- [x] Verified referral links remain transparent references, not primary CTA buttons.
- [x] No benchmark, tokens/s, or image-speed claims were added.
- [x] No `Product`, `Review`, `Offer`, `AggregateRating`, price, or availability schema was added.
- [x] Provider sources remain visible on detail pages.
- [x] No current brand/domain hardcode appears in `components/`, `app/(frontend)/`, `lib/`, `services/`, or `repositories/`.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] `/cloud-gpu` exported successfully
- [x] `/cloud-gpu/runpod`, `/cloud-gpu/vast-ai`, `/cloud-gpu/lambda`, `/cloud-gpu/modal`, and `/cloud-gpu/replicate` exported successfully
- [x] Every provider slug has a generated detail page
- [x] `/guides`, `/guides/cloud-gpu-vs-local-gpu`, `/tools/vram-calculator`, and `/builds` exported successfully
- [x] Invalid provider slug is not generated

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to Cloud GPU provider pages.
- Provider pages remain planning profiles, not rankings.
- Exact prices are not stored unless timestamped/source-backed.
- Availability is not claimed.
- Affiliate/referral links are only shown if verified from official source and remain secondary transparency references.
- No provider recommendations are made yet.

### Files Changed
- `app/(frontend)/cloud-gpu/page.tsx`
- `app/(frontend)/cloud-gpu/[slug]/page.tsx`
- `components/CloudGpuProviderCard.tsx`
- `components/CloudGpuProviderCta.tsx`
- `components/Footer.tsx`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Quality Estimate
- Before polish: 8.4 / 10.
- After polish: 9.5 / 10.

### Next Step
Day 11 can proceed with Day 10 Cloud GPU pages now passing route, sitemap, internal discovery, safety, data validation, lint, and build checks.

---

## 2026-06-03 - Day 10.6 Cloud GPU final integration fix

### Agent
Codex

### Planned Task
Fix outdated guide, hub, footer, and Cloud GPU link copy after `/cloud-gpu` and `/cloud-gpu/[slug]` are public.

### Completed
- [x] Confirmed `/guides/cloud-gpu-vs-local-gpu` no longer says provider pages are future, unpublished, or planned later.
- [x] Updated the `Test cloud if uncertain` workflow step so `Review Cloud GPU provider profiles` is a safe secondary link to `/cloud-gpu`.
- [x] Updated guide provider-note copy to say Cloud GPU provider profiles are now available as source-aware planning references.
- [x] Replaced the simple `/guides` related route link with a visible `Cloud GPU provider profiles` card and description.
- [x] Kept the footer Explore `Cloud GPU` link to `/cloud-gpu`.
- [x] Confirmed `/cloud-gpu` use-case counts use clear provider-count labels.
- [x] Confirmed sitemap still includes `/cloud-gpu` and all 8 provider detail routes.

### Safety Checks
- [x] No provider ranking was added.
- [x] No `best`, `cheapest`, `fastest`, or `recommended provider` wording was added.
- [x] No exact provider price claims were added.
- [x] No current provider availability claims were added.
- [x] No affiliate CTA spam was added.
- [x] No `Product`, `Offer`, `Review`, or `AggregateRating` schema was added.
- [x] Unknown `affiliateStatus` providers still do not expose affiliate program URLs.

### Checked
- [x] `npm run data:validate` (0 errors, 51 existing warnings in `data/gpus.json`)
- [x] `npm run lint`
- [x] `npm run build`
- [x] Source scan for outdated Cloud GPU future/unpublished copy
- [x] Sitemap/output check for `/cloud-gpu` and all provider slugs
- [x] Footer/output check for `/cloud-gpu`

### Issues
- Existing 51 `data/gpus.json` source-field mapping warnings remain unchanged and are unrelated to Cloud GPU provider pages.
- Provider pages remain planning profiles, not rankings.
- Exact prices are not stored unless timestamped/source-backed.
- Availability is not claimed.
- Affiliate/referral links are only shown if verified from official source and remain secondary transparency references.

### Files Changed
- `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`
- `app/(frontend)/guides/page.tsx`
- `TASK_STATUS.md`
- `DAILY_LOG.md`

### Quality Estimate
- Final Day 10 score: 9.6 / 10.

### Next Step
Day 11 can proceed with Day 10 Cloud GPU pages live, linked, source-aware, and free of stale future-page copy.
