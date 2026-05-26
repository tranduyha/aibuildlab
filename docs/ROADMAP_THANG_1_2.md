# ROADMAP_THANG_1_2.md

Roadmap triển khai project `aibuildlab` theo hướng **Cloudflare-first SEO Utility Platform**.

## 1. Định hướng tổng thể

`aibuildlab` là website tập trung vào:

- AI hardware.
- GPU cho local LLM.
- VRAM calculator.
- Stable Diffusion hardware.
- AI workstation.
- GPU comparison.
- AI PC build recommendation.
- Affiliate SEO về phần cứng/cloud GPU sau khi có traffic.

Giai đoạn đầu không làm SaaS ngay. Mục tiêu là tạo nền SEO utility có thể index, có tool thật, có dữ liệu tốt và có thể scale.

## 2. Kiến trúc repo hiện tại

Repo đang dùng cấu trúc:

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

Quy ước:

| Thư mục | Vai trò |
|---|---|
| `app/(frontend)/` | Public routes/pages |
| `components/` | UI components dùng chung |
| `data/` | JSON/static data |
| `lib/` | Helper SEO, format, util |
| `repositories/` | Đọc/lọc dữ liệu |
| `services/` | Business logic, calculator, recommendation |
| `types/` | TypeScript types |
| `public/` | Static assets |

Không dùng thư mục `src`.

## 3. Mục tiêu tháng 1

Cuối tháng 1 cần đạt:

```txt
Public MVP SEO utility site
+ Cloudflare Pages ready
+ 1 tool thật
+ 30 URL indexable
+ SEO technical cơ bản
+ dữ liệu nền GPU/AI model
+ quy trình handoff cho Codex/dev khác
```

## 4. Kết quả cần đạt cuối tháng 1

### Hạ tầng

- [ ] Project chạy được local bằng `npm run dev`.
- [ ] Build production pass bằng `npm run build`.
- [ ] Lint pass hoặc lỗi được ghi rõ.
- [ ] Có thể deploy Cloudflare Pages.
- [ ] Không phụ thuộc server/database cho MVP.

### SEO technical

- [ ] Có `app/robots.ts`.
- [ ] Có `app/(frontend)/sitemap.ts` hoặc sitemap phù hợp.
- [ ] Có metadata helper trong `lib/seo.ts`.
- [ ] Có canonical/meta title/meta description cho page chính.
- [ ] Có Open Graph cơ bản.
- [ ] Có cấu trúc internal link giữa homepage, tools, GPU, compare, builds, guides.
- [ ] Có affiliate disclosure/footer nếu bắt đầu dùng affiliate.

### Nội dung/page

- [ ] Homepage rõ định vị.
- [ ] Có `/tools/vram-calculator`.
- [ ] Có ít nhất 10 GPU profile pages.
- [ ] Có ít nhất 5 comparison pages.
- [ ] Có ít nhất 5 build landing pages.
- [ ] Có ít nhất 10 guide pages hoặc guide stubs chất lượng đủ index.
- [ ] Tổng tối thiểu 30 URL indexable.

### Dữ liệu

- [ ] Có `data/gpus.json`.
- [ ] Có `data/ai-models.json`.
- [ ] Có `data/comparisons.json`.
- [ ] Có `data/builds.json`.
- [ ] Có `data/guides.json`.
- [ ] Có `data/images/image-manifest.json`.
- [ ] Data có slug, title, description, SEO fields cơ bản.

### Handoff

- [ ] Có `AGENTS.md`.
- [ ] Có `TASK_STATUS.md`.
- [ ] Có `DAILY_LOG.md`.
- [ ] Có `docs/ROADMAP_THANG_1_2.md`.
- [ ] Có `docs/CHECKLIST_NGHIEM_THU.md`.
- [ ] Cuối mỗi ngày có cập nhật log và trạng thái.

## 5. Step triển khai tháng 1 theo cấu trúc hiện tại

### Step 1: Chuẩn hóa nền project hiện có

Không tạo lại project. Không tạo thư mục `src`.

Kết quả cần đạt:

- [ ] Project chạy được bằng `npm run dev`.
- [ ] Project build được bằng `npm run build`.
- [ ] Không có cấu trúc trùng lặp như `src/app`.
- [ ] `AGENTS.md` mô tả đúng kiến trúc thật.
- [ ] `TASK_STATUS.md` phản ánh trạng thái thật.

### Step 2: Tạo data cho AI Hardware SEO

Tạo thêm:

```txt
data/gpus.json
data/ai-models.json
data/comparisons.json
data/builds.json
data/guides.json
data/images/image-manifest.json
```

Gợi ý GPU ban đầu:

- RTX 3060 12GB
- RTX 4060 Ti 16GB
- RTX 4070
- RTX 4070 Ti Super
- RTX 4080 Super
- RTX 4090
- RTX 3090
- RX 7900 XTX
- RTX 5090 nếu có dữ liệu đáng tin
- Apple M-series nếu muốn mở rộng sau

### Step 3: Tạo types

Tạo thêm:

```txt
types/gpu.ts
types/ai-model.ts
types/comparison.ts
types/build.ts
types/guide.ts
types/image.ts
```

### Step 4: Tạo repositories

Tạo thêm:

```txt
repositories/gpu.repository.ts
repositories/ai-model.repository.ts
repositories/comparison.repository.ts
repositories/build.repository.ts
repositories/guide.repository.ts
repositories/image.repository.ts
```

Repository chỉ nên đọc/lọc data, không chứa UI.

Ví dụ function:

```txt
getAllGpus()
getGpuBySlug(slug)
getFeaturedGpus()
getAllComparisons()
getComparisonBySlug(slug)
getAllBuilds()
getBuildBySlug(slug)
```

### Step 5: Tạo services

Tạo thêm:

```txt
services/gpu.service.ts
services/ai-model.service.ts
services/comparison.service.ts
services/build.service.ts
services/vram-calculator.service.ts
```

Service chứa logic nghiệp vụ:

- Tính VRAM cần thiết.
- Gợi ý GPU theo model AI.
- Tạo verdict comparison.
- Gợi ý build theo budget/use case.

### Step 6: Tạo pages SEO chính

Tạo trong:

```txt
app/(frontend)/tools/vram-calculator/page.tsx
app/(frontend)/gpu/[slug]/page.tsx
app/(frontend)/compare/[slug]/page.tsx
app/(frontend)/builds/[slug]/page.tsx
app/(frontend)/guides/[slug]/page.tsx
```

Dynamic pages cần:

- `generateStaticParams`
- `generateMetadata`
- fallback/notFound nếu slug không tồn tại
- internal links
- mobile-friendly layout

### Step 7: Tạo component hỗ trợ SEO utility

Có thể thêm:

```txt
components/SeoHero.tsx
components/SpecTable.tsx
components/ComparisonTable.tsx
components/FaqSection.tsx
components/AffiliateDisclosure.tsx
components/InternalLinkGrid.tsx
components/VramCalculator.tsx
components/GpuCard.tsx
components/BuildCard.tsx
```

### Step 8: Hoàn thiện VRAM Calculator

MVP calculator cần cho phép user chọn:

- Model size: 7B, 8B, 13B, 32B, 70B.
- Quantization: FP16, 8-bit, 4-bit.
- Context length: basic/medium/large.
- Safety margin.

Kết quả cần hiển thị:

- VRAM ước tính.
- GPU phù hợp.
- Cảnh báo nếu thấp VRAM.
- Link sang GPU profile/build page liên quan.

### Step 9: Tạo 30 URL indexable đầu tiên

Gợi ý cơ cấu:

```txt
1 homepage
1 VRAM calculator
10 GPU profile pages
5 comparison pages
5 build landing pages
8-10 guide pages
```

### Step 10: SEO technical và QA

Kiểm tra:

- sitemap có URL mới.
- robots không block nhầm.
- metadata không bị trùng quá nhiều.
- page có H1.
- page không lỗi 404.
- build pass.
- mobile layout ổn.

### Step 11: Deploy Cloudflare Pages

Sau khi local build ổn:

- Kết nối GitHub repo với Cloudflare Pages.
- Build command: `npm run build`.
- Output tùy cấu hình Next/Cloudflare adapter nếu dùng.
- Kiểm tra production URL.
- Submit sitemap vào Google Search Console sau khi có domain.

## 6. Lịch triển khai 30 ngày

### Ngày 1-3: Chuẩn hóa nền

- Đồng bộ docs theo cấu trúc thật.
- Kiểm tra build/lint.
- Chuẩn hóa README.
- Tạo data skeleton.

### Ngày 4-7: Data layer

- Tạo data GPU.
- Tạo data AI model.
- Tạo types.
- Tạo repositories.
- Tạo services cơ bản.

### Ngày 8-12: Tool đầu tiên

- Tạo VRAM Calculator UI.
- Tạo service tính toán.
- Tạo page `/tools/vram-calculator`.
- Thêm metadata/internal links.

### Ngày 13-18: GPU pages

- Tạo dynamic route `/gpu/[slug]`.
- Render spec table.
- Render AI use case.
- Render recommended models.
- Tạo 10 GPU pages.

### Ngày 19-22: Comparison pages

- Tạo `/compare/[slug]`.
- Tạo bảng so sánh.
- Tạo verdict.
- Tạo 5 comparison pages.

### Ngày 23-25: Build pages

- Tạo `/builds/[slug]`.
- Tạo 5 build landing pages.
- Mỗi page có use case, budget, component list, CTA.

### Ngày 26-27: Guides

- Tạo `/guides/[slug]`.
- Tạo 8-10 guide pages chất lượng.
- Liên kết guide → tool → GPU → build.

### Ngày 28: SEO QA

- Check sitemap.
- Check robots.
- Check metadata.
- Check broken links.
- Check PageSpeed cơ bản.
- Check mobile.

### Ngày 29: Cloudflare deploy

- Deploy Cloudflare Pages.
- Kiểm tra production URL.
- Fix lỗi build/deploy nếu có.

### Ngày 30: Tổng kết và nghiệm thu

- Chấm checklist.
- Cập nhật `TASK_STATUS.md`.
- Cập nhật `DAILY_LOG.md`.
- Tạo backlog tháng 2.

## 7. Hướng tháng 2

Chỉ sang tháng 2 khi tháng 1 đạt tối thiểu:

- Build pass.
- Production site chạy ổn.
- Có 25-30 URL indexable.
- Có VRAM calculator dùng được.
- Có data GPU cơ bản.
- Có sitemap/robots/metadata.
- Có handoff docs.

### Mục tiêu tháng 2

- Tăng từ 30 URL lên 100-150 URL chất lượng.
- Mở rộng GPU database.
- Mở rộng AI model database.
- Tạo thêm comparison pages.
- Tạo thêm build pages.
- Cải thiện VRAM Calculator.
- Thêm click tracking nội bộ đơn giản.
- Chuẩn bị affiliate link thật nếu có chương trình phù hợp.
- Phân tích Google Search Console nếu đã có dữ liệu.
- Tối ưu internal links.

### Không nên làm trong tháng 2

- Chưa làm SaaS dashboard.
- Chưa làm login nếu chưa có nhu cầu rõ.
- Chưa làm payment.
- Chưa tạo hàng nghìn page AI mỏng.
- Chưa thêm Payload/Postgres nếu data JSON vẫn đủ.
