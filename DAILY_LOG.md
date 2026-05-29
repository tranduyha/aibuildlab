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
