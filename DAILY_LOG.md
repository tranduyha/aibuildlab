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
