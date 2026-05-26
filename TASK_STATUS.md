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
- [ ] Có Cloudflare Pages deploy.
- [x] Có global site shell, brand config và trust/disclosure foundation.
- [x] Có visual image layer dùng manifest, service validation và component fallback.

## Current Day

Day 3.7 - Completed: homepage UX/visual/trust refinement and logo improvement.

## Today Scope

- Chốt trạng thái cuối ngày và chuẩn hóa tài liệu handoff.
- Xác nhận lint/build, homepage và VRAM Calculator vẫn hoạt động sau Day 3.7.
- Ghi rõ quy tắc cho Day 4 mà không phát triển thêm feature.

## Done Today

- [x] Đã kiểm tra production local bằng `npm run start` sau build.
- [x] Đã chạy `npm run lint`.
- [x] Đã chạy `npm run build`.
- [x] Đã cập nhật `DAILY_LOG.md`.
- [x] Đã cập nhật `TASK_STATUS.md`.

## Last Completed Task

Homepage UX/visual/trust refinement, logo improvement, visual system, and documentation handoff.

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
