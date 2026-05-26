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
