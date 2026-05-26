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
- [ ] Có VRAM calculator.
- [ ] Có GPU profile page.
- [ ] Có comparison page.
- [ ] Có build landing page.
- [ ] Có guide pages.
- [x] Có image manifest.
- [ ] Có Cloudflare Pages deploy.

## Current Day

Day 2 - Data model ban đầu cho AI Hardware SEO.

## Today Scope

- Tạo seed JSON cho GPU, AI models, comparisons, builds và guides.
- Tạo TypeScript types, repositories và services theo data flow hiện tại.
- Giữ tất cả dữ liệu chưa xác minh ở trạng thái `draft`, confidence `low`.
- Không public thông số, benchmark, VRAM estimate hoặc giá chưa có nguồn.

## Done Today

- [ ] Đã kiểm tra project chạy được bằng `npm run dev`.
- [x] Đã chạy `npm run lint`.
- [x] Đã chạy `npm run build`.
- [x] Đã cập nhật `DAILY_LOG.md`.
- [x] Đã cập nhật `TASK_STATUS.md`.

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

- Dữ liệu GPU/AI model hiện chỉ là seed draft; specs và model facts chưa được xác minh từ source chính thức.
- Chưa có benchmark hoặc VRAM estimate đã xác minh để đưa ra recommendation public.
- Ảnh Pexels mẫu chưa được nối vào UI/page public.
- Chưa có trang VRAM calculator.
- Chưa có các page SEO động.

## Next Recommended Task

Day 3 - VRAM Calculator service + page skeleton.

## Notes for Next Agent

- Không tạo thư mục `src`.
- Giữ nguyên kiến trúc hiện tại.
- Mọi page public đặt trong `app/(frontend)`.
- Mọi data tĩnh đặt trong `data`.
- Logic đọc data đặt trong `repositories`.
- Logic nghiệp vụ đặt trong `services`.
- Nếu task chưa pass build/lint, không đánh dấu hoàn thành.
- Cập nhật file này ở cuối mỗi phiên làm việc.
