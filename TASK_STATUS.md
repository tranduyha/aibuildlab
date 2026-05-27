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
- [ ] Có GPU profile page.
- [ ] Có comparison page.
- [ ] Có build landing page.
- [ ] Có guide pages.
- [x] Có image manifest.
- [x] Có Cloudflare Pages preview deploy tại `https://vramforge.pages.dev/`.
- [x] Có global site shell, brand config và trust/disclosure foundation.
- [x] Có visual image layer dùng manifest, service validation và component fallback.

## Current Day

Day 3.11 - Completed: Homepage help-card visual sizing balance (2026-05-27).

## Today Scope

- Return the six horizontal help-card visual blocks to their earlier compact footprint.
- Preserve labels and proportional square SVG icons without increasing card height.
- Preserve the existing homepage content, links, responsive grid and static export behavior.

## Done Today

- [x] Đã kiểm tra production local bằng `npm run start` sau build.
- [x] Đã chạy `npm run lint`.
- [x] Đã chạy `npm run build`.
- [x] Đã cập nhật `DAILY_LOG.md`.
- [x] Đã cập nhật `TASK_STATUS.md`.

## Last Completed Task

Homepage help-card visual sizing balance.

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

## Open Limitations Before Day 4

- Dữ liệu GPU/AI model hiện chỉ là seed draft; specs và model facts chưa được xác minh từ source chính thức.
- Calculator là rough estimate theo giả định MVP, chưa phải benchmark hoặc hardware recommendation đã xác minh.
- GPU/build/guide index pages mới là placeholder; chưa có nội dung động/source-verified.
- Chưa có các GPU profile SEO pages động.

## Next Recommended Task

Day 4 - GPU profile page skeleton.

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

Day 4 - GPU profile page skeleton.

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

Day 4 - GPU profile page skeleton.

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

Day 4 - GPU profile page skeleton.

## Day 3.10 Homepage Help-Card Horizontal Visual Refinement Update - 2026-05-27

- [x] Restored a full-width, light-blue visual block above each of the six homepage help-card titles.
- [x] Added small left-side labels (`VRAM`, `GPU`, `LLM`, `IMG`, `BUILD`, `CLOUD`) and retained distinct compact square SVG glyphs on the right.
- [x] Sized the horizontal visual block to `78px` high while fixing each icon at `54px`, preventing stretch or flattened proportions.
- [x] Kept visual blocks decorative with `aria-hidden="true"` and made no changes to heading hierarchy or card destinations.
- [x] Reviewed exported homepage at desktop and compact widths; three-column desktop and single-column compact layouts remain readable.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and produced `out/`.

### Next Recommended Task

Day 4 - GPU profile page skeleton.

## Day 3.11 Homepage Help-Card Visual Sizing Update - 2026-05-27

- [x] Kept the full-width visual header and six decorative labels introduced in Day 3.10.
- [x] Returned the visual header height from `78px` to the original `52px` footprint and restored the card minimum height to `207px`.
- [x] Reduced each SVG icon to a fixed proportional `38px` square so it remains readable without stretching or enlarging the card.
- [x] Reviewed desktop and compact homepage renders; the visual header now fills the top of each card without making the card taller than necessary.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and produced `out/`.

### Next Recommended Task

Day 4 - GPU profile page skeleton.
