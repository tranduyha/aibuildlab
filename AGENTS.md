# AGENTS.md

Tài liệu này là luật làm việc cho Codex hoặc bất kỳ AI/dev nào tham gia project `aibuildlab`.

## 1. Bối cảnh project

`aibuildlab` là website **AI Hardware Affiliate SEO Utility Platform**.

Mục tiêu giai đoạn đầu:

- Xây dựng website SEO utility chạy tốt trên Cloudflare-first.
- Tập trung vào AI hardware, GPU, VRAM, local LLM, Stable Diffusion, AI workstation.
- Ưu tiên static/SSG, dữ liệu JSON trong repo, SEO technical tốt.
- Chưa làm SaaS, chưa làm login, chưa làm payment trong tháng 1.
- Chưa đưa Payload CMS/database production nếu chưa có task rõ ràng.

## 2. Kiến trúc hiện tại của project

Project đang dùng Next.js App Router với cấu trúc:

```txt
app/
  (frontend)/
    about/
      page.tsx
    projects/
    globals.css
    layout.tsx
    page.tsx
    sitemap.ts
    theme.css
  favicon.ico
  robots.ts

components/
  ArchitectureFlow.tsx
  Footer.tsx
  Header.tsx
  ProjectCard.tsx
  SectionHeading.tsx

data/
  navigation.json
  projects.json
  site-settings.json

lib/
  format.ts
  seo.ts

repositories/
  project.repository.ts
  site-settings.repository.ts

services/
  project.service.ts
  site-settings.service.ts

types/
public/
```

## 3. Quy tắc bắt buộc khi code

- Không tự ý tạo thư mục `src/`.
- Không tự ý đổi App Router sang Pages Router.
- Không tự ý di chuyển `app/(frontend)` nếu không có yêu cầu.
- Page public phải đặt trong `app/(frontend)/`.
- Component dùng chung đặt trong `components/`.
- Dữ liệu tĩnh đặt trong `data/`.
- Hàm SEO, metadata, format đặt trong `lib/`.
- Logic đọc dữ liệu đặt trong `repositories/`.
- Logic nghiệp vụ đặt trong `services/`.
- TypeScript types đặt trong `types/`.
- Ảnh public đặt trong `public/images/`.
- Không thêm Payload CMS, database, auth, payment trong tháng 1 nếu chưa có task rõ ràng.
- Ưu tiên static generation, SEO metadata, sitemap, robots và Cloudflare Pages compatibility.
- Không tạo hàng loạt page mỏng chỉ đổi tên keyword/GPU.
- Mỗi page SEO phải có giá trị thực: dữ liệu, bảng, FAQ, internal links, CTA phù hợp.

## 4. Data flow chuẩn

Luồng dữ liệu nên theo hướng:

```txt
data/*.json
→ repositories/*.repository.ts
→ services/*.service.ts
→ app/(frontend) pages/components
```

Không nên để nhiều page gọi trực tiếp JSON nếu logic có thể gom vào repository/service.

Ví dụ:

```txt
data/gpus.json
→ repositories/gpu.repository.ts
→ services/gpu.service.ts
→ app/(frontend)/gpu/[slug]/page.tsx
```

## 5. Quy tắc tạo page SEO

Khi tạo page SEO mới, cần kiểm tra:

- Có slug rõ ràng, thân thiện SEO.
- Có `metadata` hoặc helper SEO từ `lib/seo.ts`.
- Có title, description, H1 duy nhất.
- Có canonical nếu phù hợp.
- Có internal links tới tool/page liên quan.
- Có FAQ nếu nội dung đủ phù hợp.
- Có CTA nhưng không spam affiliate.
- Có mobile layout ổn.
- Có dữ liệu từ `data/` thông qua repository/service.
- Có `generateStaticParams` nếu là dynamic static page.
- Không tạo page rỗng hoặc page chỉ có đoạn text AI chung chung.

## 6. Quy tắc hình ảnh

Không được tải ảnh trực tiếp từ Google Images.

Chỉ được dùng ảnh từ:

- Ảnh tự tạo trong project.
- Pexels API.
- Unsplash API.
- Wikimedia Commons API.
- eBay Browse API.
- API/feed chính thức của affiliate program.
- Official press/media kit nếu điều khoản cho phép.

Mỗi ảnh tải về phải có metadata trong:

```txt
data/images/image-manifest.json
```

Mỗi ảnh phải có:

- `id`
- `local_path`
- `source`
- `source_url`
- `author`
- `license`
- `license_url`
- `downloaded_at`
- `alt_text`
- `used_in_pages`

Nếu không xác định được license, không được dùng ảnh đó.

## 7. Quy tắc Cloudflare-first

Trong tháng 1, ưu tiên:

- Next.js static/SSG.
- Cloudflare Pages deploy.
- Không phụ thuộc server runtime nếu chưa cần.
- Không dùng Node API/runtime phức tạp cho MVP.
- Nếu cần API nhẹ, cân nhắc Pages Functions/Workers sau.
- Không đưa database vào nếu dữ liệu JSON đủ dùng.

## 8. Quy trình làm việc hằng ngày

Trước khi code:

1. Đọc `AGENTS.md`.
2. Đọc `TASK_STATUS.md`.
3. Đọc `DAILY_LOG.md`.
4. Đọc `docs/ROADMAP_THANG_1_2.md`.
5. Xác định đúng task hôm nay.
6. Không tự ý nhảy sang task ngày sau nếu task hiện tại chưa pass checklist.

Sau khi code:

1. Chạy `npm run lint` nếu có.
2. Chạy `npm run build`.
3. Ghi lại lỗi nếu có.
4. Cập nhật `DAILY_LOG.md`.
5. Cập nhật `TASK_STATUS.md`.
6. Không báo hoàn thành nếu build/lint chưa chạy hoặc chưa ghi lý do không chạy được.

## 9. Quy tắc commit

Commit message nên ngắn và rõ:

```txt
docs: update execution roadmap
feat: add gpu data model
feat: add vram calculator page
fix: update sitemap generation
seo: add metadata for gpu pages
```

Không gom quá nhiều loại thay đổi vào một commit nếu không cần.

## 10. Những việc không được làm trong tháng 1

- Không làm SaaS dashboard.
- Không làm login/auth.
- Không làm payment/subscription.
- Không thêm Payload CMS production.
- Không thêm Postgres production.
- Không crawl/scrape ảnh từ Google Images.
- Không tạo 1.000 page bằng AI khi chưa có dữ liệu tốt.
- Không làm hệ thống affiliate phức tạp trước khi có traffic/index.
- Không đổi kiến trúc repo nếu không có lý do mạnh.
