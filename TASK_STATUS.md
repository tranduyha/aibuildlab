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
- [ ] Có data GPU ban đầu.
- [ ] Có data AI model ban đầu.
- [ ] Có VRAM calculator.
- [ ] Có GPU profile page.
- [ ] Có comparison page.
- [ ] Có build landing page.
- [ ] Có guide pages.
- [x] Có image manifest.
- [ ] Có Cloudflare Pages deploy.

## Current Day

Day 1 - Chuẩn hóa repo và tài liệu vận hành theo kiến trúc thật.

## Today Scope

- Kiểm tra cấu trúc repo hiện tại.
- Đồng bộ `AGENTS.md`, `TASK_STATUS.md`, `DAILY_LOG.md`, `docs/ROADMAP_THANG_1_2.md`, `docs/CHECKLIST_NGHIEM_THU.md`.
- Không tạo lại project.
- Không tạo thư mục `src`.
- Không di chuyển code lớn nếu chưa cần.
- Chuẩn bị hướng triển khai data model cho AI hardware SEO.

## Done Today

- [ ] Đã kiểm tra project chạy được bằng `npm run dev`.
- [x] Đã chạy `npm run lint`.
- [x] Đã chạy `npm run build`.
- [x] Đã cập nhật `DAILY_LOG.md`.
- [x] Đã cập nhật `TASK_STATUS.md`.

## Image System Update - 2026-05-26

- [x] Tạo các thư mục `public/images/hero`, `gpu`, `builds`, `guides`, `tools`.
- [x] Tạo/ghi dữ liệu `data/images/image-manifest.json`.
- [x] Thêm `scripts/fetch-images.ts` đọc `PEXELS_API_KEY` từ `.env.local`.
- [x] Thêm command `npm run images:fetch`.
- [x] Tải một ảnh Pexels hợp lệ cho mỗi category và ghi metadata/license.
- [x] Xác nhận `.env.local` đang bị Git ignore.

## Blockers

- Chưa có dữ liệu GPU/AI model chính thức.
- Ảnh Pexels mẫu chưa được nối vào UI/page public.
- Chưa có trang VRAM calculator.
- Chưa có các page SEO động.

## Next Recommended Task

Day 2 - Tạo data model ban đầu cho GPUs, AI models, comparisons, builds, guides và image manifest theo kiến trúc hiện tại.

## Notes for Next Agent

- Không tạo thư mục `src`.
- Giữ nguyên kiến trúc hiện tại.
- Mọi page public đặt trong `app/(frontend)`.
- Mọi data tĩnh đặt trong `data`.
- Logic đọc data đặt trong `repositories`.
- Logic nghiệp vụ đặt trong `services`.
- Nếu task chưa pass build/lint, không đánh dấu hoàn thành.
- Cập nhật file này ở cuối mỗi phiên làm việc.
