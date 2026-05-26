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

## 6. Lịch triển khai 30 ngày - bản chỉnh theo hướng monetization mới

Định hướng từ Day 4 trở đi được điều chỉnh theo mô hình:

```txt
AI hardware trước
→ Cloud GPU / AI infra affiliate
→ AI SaaS / software affiliate
→ SaaS/tool riêng dài hạn
```

Mục tiêu không còn chỉ là “hardware affiliate SEO site”, mà là:

```txt
Local AI Hardware + Cloud GPU + AI Tooling Affiliate Platform
```

### Nguyên tắc xuyên suốt từ Day 4

- Không tạo thư mục `src`.
- Không hardcode brand/domain.
- Không dùng Google Images.
- Không publish data seed như dữ liệu đã verify.
- Data chưa xác minh để `status: "draft"`, `needsReview: true`.
- Brand/site name/domain/disclosure lấy từ `data/site-settings.json`.
- Không gắn affiliate link thật nếu chưa có chương trình và disclosure rõ.
- Mỗi page phải phục vụ người dùng trước, SEO sau, affiliate sau cùng.

---

## 7. Định hướng monetization mới

Website sẽ kiếm tiền theo 3 tầng:

```txt
Tier 1: Hardware affiliate
Tier 2: Cloud GPU / VPS / AI infra affiliate
Tier 3: AI SaaS / software / dev tools affiliate
```

Phần cứng có buyer intent mạnh nhưng commission thường thấp. Cloud GPU, VPS, AI infra và AI SaaS có tiềm năng cao hơn vì có thể recurring hoặc spend-based commission, hợp với người dùng local AI, và dễ gắn vào nội dung “cloud vs local”.

Funnel mới:

```txt
Google Search
→ VRAM Calculator / GPU Guide
→ User biết cần bao nhiêu VRAM
→ Option A: mua GPU
→ Option B: thuê cloud GPU
→ Option C: dùng AI SaaS/software thay thế
→ affiliate click / email lead / saved build
```

Không định vị site là “hardware affiliate blog”. Định vị nên là:

```txt
A source-aware planning platform for GPU memory, local AI hardware, cloud GPU options, and AI workflow tools.
```

Nếu dùng brand `VRAM Forge`, tagline nên là:

```txt
Plan GPU memory, hardware, and tools for local AI workloads.
```

---

## 8. Roadmap chi tiết từ Day 4 đến Day 14

## Day 4 — GPU profile page skeleton

### Mục tiêu

Tạo nền cho các page GPU profile, dùng data từ `data/gpus.json`.

### Files dự kiến

```txt
app/(frontend)/gpu/page.tsx
app/(frontend)/gpu/[slug]/page.tsx
components/GpuCard.tsx
components/GpuSpecTable.tsx
components/GpuAiUseCaseSection.tsx
components/DataConfidenceBadge.tsx
```

### Yêu cầu

- Dùng repository/service, không đọc JSON trực tiếp trong page nếu có thể.
- Có `generateStaticParams`.
- Có `generateMetadata`.
- Không hardcode brand/domain.
- Không claim benchmark nếu chưa có nguồn.
- Với data `draft`/`needsReview`, hiển thị wording cẩn thận:
  - “Seed data”
  - “Needs verification”
  - “Specs should be verified before purchase”
- Không affiliate link thật ở Day 4 nếu chưa có program.

### SEO yêu cầu

Page `/gpu/[slug]` cần có:

- H1: tên GPU.
- Short description.
- Spec table.
- AI use case section.
- VRAM suitability section.
- Related links:
  - VRAM Calculator.
  - Related GPU comparisons.
  - Relevant build guides.
- FAQ ngắn nếu phù hợp.

### Definition of Done

- `/gpu` hiển thị danh sách GPU seed.
- `/gpu/[slug]` render được ít nhất 10 GPU.
- Không vỡ build.
- Không publish claim chưa verify.
- `npm run lint` pass hoặc lỗi ghi rõ.
- `npm run build` pass.
- `DAILY_LOG.md` và `TASK_STATUS.md` được cập nhật.

---

## Day 5 — GPU profile SEO upgrade

### Mục tiêu

Nâng GPU profile thành page có giá trị SEO hơn, không chỉ render data.

### Tasks

- Thêm section:
  - “Best for”.
  - “Local AI notes”.
  - “VRAM limitations”.
  - “When to choose cloud GPU instead”.
- Thêm disclaimer source-aware.
- Thêm internal links.
- Thêm FAQ section.
- Thêm Product/Article/Breadcrumb schema nếu phù hợp, nhưng không tạo claim giá/affiliate khi chưa có nguồn.

### Monetization chuẩn bị

Mỗi GPU page nên có placeholder CTA:

```txt
Option A: Compare local GPU options
Option B: Try a cloud GPU before buying
```

Chưa cần affiliate link thật.

### Definition of Done

- GPU page hữu ích hơn cho người dùng.
- Có cloud GPU bridge CTA.
- Có data confidence warning nếu cần.
- Build/lint pass.

---

## Day 6 — Comparison page skeleton

### Mục tiêu

Tạo page so sánh GPU từ `data/comparisons.json`.

### Files dự kiến

```txt
app/(frontend)/compare/page.tsx
app/(frontend)/compare/[slug]/page.tsx
components/ComparisonTable.tsx
components/ComparisonVerdict.tsx
components/ComparisonCta.tsx
```

### Yêu cầu

- Render tối thiểu 5 comparison seed.
- Không tự bịa benchmark.
- Nếu không có benchmark, chỉ so sánh specs/source-aware.
- Wording cẩn thận:
  - “Based on seed specs”.
  - “Verify before buying”.
  - “Actual AI performance depends on software/runtime”.

### SEO focus

```txt
/compare/rtx-3090-vs-rtx-4090-for-local-llm
/compare/rtx-3060-12gb-vs-rtx-4060-ti-16gb-for-ai
```

Cần có:

- H1 rõ intent.
- Comparison table.
- Verdict cautious.
- Use case recommendations.
- Related GPU links.
- Cloud GPU alternative section.

### Definition of Done

- `/compare` có list page.
- `/compare/[slug]` render được.
- Có verdict nhưng không claim quá chắc.
- Build/lint pass.

---

## Day 7 — Build landing page skeleton

### Mục tiêu

Tạo page build AI workstation từ `data/builds.json`.

### Files dự kiến

```txt
app/(frontend)/builds/page.tsx
app/(frontend)/builds/[slug]/page.tsx
components/BuildCard.tsx
components/BuildComponentList.tsx
components/BuildUseCaseSection.tsx
components/BuildAlternatives.tsx
```

### Yêu cầu

- Render 5 build seed.
- Không hardcode giá nếu chưa có source.
- Không affiliate link thật nếu chưa có program.
- Có alternative section:
  - “Buy local hardware”.
  - “Try cloud GPU first”.
  - “Use AI SaaS if you do not need full local control”.

### SEO focus

```txt
/builds/budget-local-ai-pc
/builds/stable-diffusion-creator-pc
/builds/local-llm-workstation
```

### Definition of Done

- Build pages render.
- Có CTA bridge sang cloud/SaaS nhưng không affiliate spam.
- Build/lint pass.

---

## Day 8 — Cloud GPU data model

### Mục tiêu

Thêm data layer cho Cloud GPU / AI infra affiliate tương lai.

### Files cần tạo

```txt
data/cloud-gpu-providers.json
types/cloud-gpu-provider.ts
repositories/cloud-gpu-provider.repository.ts
services/cloud-gpu-provider.service.ts
```

### Seed providers

Thêm seed data dạng draft cho:

- RunPod
- Vast.ai
- Lambda
- Paperspace
- DigitalOcean GPU
- Vultr GPU
- Modal
- Replicate

### Mỗi provider cần có

```txt
id
slug
name
shortDescription
seoTitle
seoDescription
providerType
useCases
pricingModel
affiliateStatus
affiliateProgramUrl
commissionNotes
status
needsReview
dataConfidence
sources
lastVerifiedAt
notes
```

### Quy tắc dữ liệu

- Không tự bịa commission.
- Nếu chưa verify affiliate program, để:
  - `affiliateStatus: "unknown"`
  - `needsReview: true`
- Không claim recurring nếu chưa có nguồn.
- Không hardcode affiliate link.

### Definition of Done

- Có data model cloud GPU.
- Có repository/service.
- Build/lint pass.
- Task status cập nhật.

---

## Day 9 — Cloud GPU vs Local GPU guide

### Mục tiêu

Tạo guide bridge đầu tiên giữa hardware và cloud affiliate.

### Files dự kiến

```txt
app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx
components/CloudVsLocalTable.tsx
components/DecisionMatrix.tsx
```

### Nội dung cần có

- Khi nào nên mua GPU local.
- Khi nào nên thuê cloud GPU.
- Cost factors:
  - upfront cost
  - electricity
  - utilization
  - setup time
  - privacy/control
  - scalability
- Không đưa giá cụ thể nếu chưa có nguồn.
- CTA:
  - Use VRAM Calculator.
  - Compare GPUs.
  - Explore cloud GPU options.

### SEO target

```txt
cloud gpu vs local gpu
rent gpu vs buy gpu
best way to run local llm
```

### Definition of Done

- Guide có ích, không spam affiliate.
- Có internal links tới calculator/GPU/build.
- Build/lint pass.

---

## Day 10 — Cloud GPU provider index + provider page skeleton

### Mục tiêu

Tạo trang cloud GPU provider để chuẩn bị affiliate tầng 2.

### Files dự kiến

```txt
app/(frontend)/cloud-gpu/page.tsx
app/(frontend)/cloud-gpu/[slug]/page.tsx
components/CloudGpuProviderCard.tsx
components/CloudGpuUseCaseSection.tsx
```

### Yêu cầu

- Render data từ `data/cloud-gpu-providers.json`.
- Không claim commission/price nếu chưa có nguồn.
- Có use case:
  - local LLM testing.
  - Stable Diffusion.
  - training/fine-tuning.
  - batch jobs.
  - serverless inference.
- Có disclaimer:
  - prices and availability change.
  - verify provider terms before use.

### Navigation

Cân nhắc thêm menu `Cloud GPU`, nhưng chỉ thêm nếu page đã đủ ổn.

### Definition of Done

- `/cloud-gpu` render.
- `/cloud-gpu/[slug]` render.
- Build/lint pass.

---

## Day 11 — AI SaaS / software tool data model

### Mục tiêu

Thêm data model để sau này monetization qua AI SaaS/software.

### Files cần tạo

```txt
data/ai-tools.json
types/ai-tool.ts
repositories/ai-tool.repository.ts
services/ai-tool.service.ts
```

### Tool categories

```txt
ai_coding
image_generation
video_generation
llm_api
agent_platform
vector_database
automation
seo_ai
productivity
```

### Mỗi tool cần có

```txt
id
slug
name
category
shortDescription
seoTitle
seoDescription
pricingModel
affiliateStatus
affiliateProgramUrl
recommendedPlacements
status
needsReview
dataConfidence
sources
lastVerifiedAt
notes
```

### Quy tắc

- Không tự bịa commission.
- Không tự claim “best” nếu chưa có review.
- Không add affiliate link chưa verify.
- Không biến site thành SaaS spam directory.

### Definition of Done

- Có data model AI tools.
- Có repository/service.
- Build/lint pass.

---

## Day 12 — AI software bridge guide

### Mục tiêu

Tạo guide đầu tiên nối từ local hardware sang AI SaaS/software.

### Guide đề xuất

```txt
/guides/local-ai-vs-ai-saas
```

### Nội dung

- Khi nào nên chạy AI local.
- Khi nào nên dùng AI SaaS.
- Tradeoff:
  - cost
  - privacy
  - setup time
  - quality
  - reliability
  - control
  - team workflow
- Internal links:
  - VRAM Calculator.
  - Cloud GPU vs Local GPU.
  - GPU guides.
  - AI tools index sau này.

### Definition of Done

- Guide hữu ích, cân bằng.
- Không affiliate spam.
- Build/lint pass.

---

## Day 13 — Monetization placement system

### Mục tiêu

Thêm hệ thống placement để sau này quản lý CTA/affiliate mà không hardcode lung tung.

### Files đề xuất

```txt
data/monetization-placements.json
types/monetization-placement.ts
repositories/monetization-placement.repository.ts
services/monetization-placement.service.ts
components/MonetizationCta.tsx
```

### Placement types

```txt
vram-calculator-result
gpu-profile-sidebar
comparison-verdict
build-page-components
cloud-vs-local-guide
ai-saas-guide
footer-disclosure
```

### Quy tắc

- Không affiliate link thật nếu chưa có program.
- Placement có thể là CTA trung lập:
  - “Compare local GPUs”.
  - “Try cloud GPU first”.
  - “Explore AI workflow tools”.
- Mọi affiliate CTA phải minh bạch.

### Definition of Done

- Có data placement.
- Có component CTA reusable.
- Không spam.
- Build/lint pass.

---

## Day 14 — SEO QA + internal link audit

### Mục tiêu

Kiểm tra toàn bộ nền site trước khi scale thêm.

### Kiểm tra

- Homepage.
- VRAM Calculator.
- GPU index/profile.
- Comparison pages.
- Build pages.
- Cloud GPU guide.
- Cloud GPU provider pages nếu có.
- AI SaaS bridge guide nếu có.

### Checklist

- H1 duy nhất.
- Metadata không trùng quá nhiều.
- Canonical đúng.
- Không hardcode brand/domain.
- Không 404 từ menu chính.
- Internal links rõ.
- Footer disclosure hiện.
- Data draft không bị claim như verified.
- Build pass.
- Lint pass.

### Definition of Done

- Site nền đủ ổn để bước sang scale content.
- Có backlog rõ cho Month 2.
- TASK_STATUS cập nhật.

---

## 9. Month 2 — Roadmap điều chỉnh

## Mục tiêu Month 2

Thay vì chỉ scale hardware pages, Month 2 chia 3 cụm:

```txt
Cluster A: Hardware / GPU / VRAM
Cluster B: Cloud GPU / AI infra
Cluster C: AI SaaS / software bridge
```

### Cluster A — Hardware / GPU / VRAM

Tạo thêm:

- 20 GPU profile pages.
- 20 comparison pages.
- 10 AI build pages.
- 10 model VRAM requirement pages.

Ví dụ:

```txt
/guides/best-gpu-for-local-llm
/guides/best-gpu-for-stable-diffusion
/gpu/rtx-3090-for-ai
/gpu/rtx-4090-for-ai
/compare/rtx-3090-vs-rtx-4090-for-local-llm
/models/llama-3-1-8b-vram-requirements
```

### Cluster B — Cloud GPU / AI infra

Tạo:

```txt
/cloud-gpu
/cloud-gpu/runpod
/cloud-gpu/vast-ai
/cloud-gpu/lambda
/guides/cloud-gpu-vs-local-gpu
/guides/best-cloud-gpu-for-local-llm
/guides/cheapest-way-to-run-llama-70b
```

CTA hợp lý:

```txt
Try cloud GPU before buying hardware
```

Không spam affiliate.

### Cluster C — AI SaaS / software bridge

Tạo:

```txt
/ai-tools
/ai-tools/ai-coding
/ai-tools/image-generation
/ai-tools/llm-api
/guides/local-ai-vs-ai-saas
/guides/best-ai-tools-for-local-ai-users
/guides/ai-workstation-software-stack
```

CTA hợp lý:

```txt
If you do not need full local control, compare hosted AI tools.
```

---

## 10. Domain/brand guidance

Nếu đổi sang `VRAMForge.com`, cập nhật duy nhất ở:

```txt
data/site-settings.json
```

Gợi ý config:

```json
{
  "name": "VRAM Forge",
  "shortName": "VF",
  "domain": "vramforge.com",
  "siteUrl": "https://vramforge.com",
  "description": "Estimate VRAM needs, compare GPUs, and plan local or cloud AI workflows.",
  "tagline": "Plan GPU memory, hardware, and tools for local AI workloads."
}
```

Không sửa hardcode trong component/page.

---

## 11. Prompt mẫu cho Day 4

```txt
Đọc:
- AGENTS.md
- TASK_STATUS.md
- DAILY_LOG.md
- docs/ROADMAP_THANG_1_2.md
- docs/DATA_SOURCES.md

Hôm nay thực hiện Day 4 - GPU profile page skeleton.

Yêu cầu:
1. Không tạo thư mục src.
2. Không hardcode brand/domain.
3. Không thêm database/auth/payment/Payload.
4. Không dùng data draft như dữ liệu đã verify.
5. Dùng data/gpus.json thông qua repository/service.
6. Tạo /gpu và /gpu/[slug].
7. Có generateStaticParams và generateMetadata.
8. Có GpuCard, GpuSpecTable, DataConfidenceBadge nếu cần.
9. Có internal links tới VRAM Calculator.
10. Có section “When to consider cloud GPU instead” nhưng chưa affiliate spam.
11. Chạy npm run lint và npm run build.
12. Cập nhật DAILY_LOG.md và TASK_STATUS.md.
```

---

## 12. Definition of Done tổng cho phase Day 4-14

Phase này được coi là ổn khi có:

- GPU profile pages.
- Comparison pages.
- Build pages.
- Cloud GPU data model.
- Cloud GPU vs Local GPU guide.
- AI tools/software data model.
- Local AI vs AI SaaS bridge guide.
- Monetization placement system.
- Internal link audit.
- Không hardcode brand/domain.
- Không affiliate spam.
- Không claim data chưa verify.
- Build/lint pass.
- Handoff docs cập nhật đầy đủ.

---

## 13. Ghi chú quan trọng

Không nên vội gắn affiliate link thật trước khi:

- page đủ trust
- data có nguồn
- CTA đúng intent
- disclosure đầy đủ
- user flow rõ

Thứ tự đúng:

```txt
Tool hữu ích
→ data có nguồn
→ page SEO tốt
→ internal link
→ cloud/software bridge
→ affiliate CTA
→ conversion optimization
```

Không đi theo hướng:

```txt
page mỏng
→ affiliate link sớm
→ spam CTA
→ mất trust
```

