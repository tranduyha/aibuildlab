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
    builds/
      page.tsx
    gpu/
      page.tsx
    guides/
      page.tsx
    projects/
    tools/vram-calculator/
      page.tsx
    globals.css
    layout.tsx
    page.tsx
    sitemap.ts
    theme.css
  favicon.ico
  icon.svg
  robots.ts

components/
  ArchitectureFlow.tsx
  Footer.tsx
  Header.tsx
  HeroVisual.tsx
  Logo.tsx
  MainNav.tsx
  ProjectCard.tsx
  SectionHeading.tsx
  SiteImage.tsx
  VisualCard.tsx
  VramCalculator.tsx

data/
  ai-models.json
  builds.json
  comparisons.json
  gpus.json
  guides.json
  images/
    image-manifest.json
  navigation.json
  projects.json
  site-settings.json

lib/
  format.ts
  seo.ts

repositories/
  ai-model.repository.ts
  build.repository.ts
  comparison.repository.ts
  gpu.repository.ts
  guide.repository.ts
  image.repository.ts
  project.repository.ts
  site-settings.repository.ts

services/
  ai-model.service.ts
  build.service.ts
  comparison.service.ts
  gpu.service.ts
  image.service.ts
  project.service.ts
  site-settings.service.ts
  vram-calculator.service.ts

types/
  image.ts
public/
  images/
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

## 5. Quy tắc brand/site config bắt buộc

Từ nay về sau, mọi text liên quan đến brand, website hoặc domain phải lấy từ config, không hardcode trong page, component hoặc helper.

Nguồn config chính:

- `data/site-settings.json`
- `repositories/site-settings.repository.ts`
- `services/site-settings.service.ts`
- `lib/seo.ts` nếu liên quan metadata, canonical hoặc Open Graph

Các giá trị phải lấy từ config:

- `siteSettings.name`
- `siteSettings.shortName`
- `siteSettings.logo.text`
- `siteSettings.logo.shortText`
- `siteSettings.tagline`
- `siteSettings.description`
- `siteSettings.siteUrl`
- `siteSettings.domain`
- `siteSettings.trust.editorialNote`
- `siteSettings.trust.dataDisclaimer`
- `siteSettings.trust.affiliateDisclosure`

Quy tắc logo/mark:

- Logo component phải nhận brand text, short text và accessible name từ site settings; không tự chứa fallback brand viết chết.
- SVG/CSS icon mark nội bộ được phép, nhưng chữ hiển thị trong mark phải xuất phát từ `siteSettings.logo.shortText` hoặc `siteSettings.shortName`.
- Header/footer/schema/metadata không được tự sao chép brand text thay cho config.

Không được hardcode trong `components/`, `app/(frontend)/`, `lib/`, `services/` hoặc `repositories/`:

- `"AI Build Lab"`
- `"ABL"`
- `"aibuildlab.com"`
- tên brand hiện tại
- short name hiện tại
- domain giả định
- affiliate disclosure có tên brand viết chết
- title suffix có tên brand viết chết
- Open Graph site name viết chết
- JSON-LD organization/site name viết chết

Ngoại lệ được phép:

- `data/site-settings.json`
- `docs/*`
- `DAILY_LOG.md`
- `TASK_STATUS.md`
- README hoặc tài liệu hướng dẫn
- test snapshot nếu có lý do rõ ràng

Ví dụ đúng:

```tsx
const siteSettings = getSiteSettings();
const title = buildPageTitle("VRAM Calculator for Local AI Models");

<Logo
  siteName={siteSettings.name}
  text={siteSettings.logo.text}
  shortText={siteSettings.logo.shortText}
/>

<footer>
  <p>{siteSettings.trust.affiliateDisclosure}</p>
</footer>
```

Ví dụ sai:

```tsx
<title>VRAM Calculator for Local AI Models | [hardcoded brand]</title>
<div>[hardcoded brand]</div>
<footer>[hardcoded brand] may earn a commission...</footer>
```

Trước khi kết thúc task, search trong code các chuỗi brand name, short name và domain hiện tại. Nếu chúng xuất hiện trong `components/`, `app/(frontend)/`, `lib/`, `services/` hoặc `repositories/`, phải sửa để lấy từ config.

Mục tiêu: đổi brand/domain chỉ cần sửa `data/site-settings.json`, không phải sửa từng page hoặc component.

## 6. Quy tắc tạo page SEO

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

## 7. Quy tắc hình ảnh

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

Page/component phải lấy ảnh hiển thị thông qua `repositories/image.repository.ts` và `services/image.service.ts`; không rải đường dẫn asset riêng lẻ trong UI.

Component dùng ảnh thật phải có `alt_text` từ manifest và fallback an toàn khi ảnh thiếu metadata hoặc đang cần review.

## 8. Quy tắc dữ liệu seed và dữ liệu chưa xác minh

- Không trình bày dữ liệu hardware hoặc AI chưa xác minh như thông tin chắc chắn hay khuyến nghị mua hàng.
- Trước khi điền specs, benchmark, giá hoặc thông tin model có tính xác nhận, phải đọc `docs/DATA_SOURCES.md`.
- Seed data chưa được xác minh phải giữ `status: "draft"`, `needsReview: true`, `dataConfidence: "low"`, `sources: []` và `lastVerifiedAt: null`.
- Field chưa có nguồn đáng tin phải để `null`; không tự bịa VRAM, core count, power, benchmark, tokens/s, giá hoặc model requirement.
- Page public dùng dữ liệu draft phải có wording thận trọng và không biến estimate thành claim đã verified.

## 9. Quy tắc Cloudflare-first

Trong tháng 1, ưu tiên:

- Next.js static/SSG.
- Cloudflare Pages deploy.
- Không phụ thuộc server runtime nếu chưa cần.
- Không dùng Node API/runtime phức tạp cho MVP.
- Nếu cần API nhẹ, cân nhắc Pages Functions/Workers sau.
- Không đưa database vào nếu dữ liệu JSON đủ dùng.

## 10. Quy trình làm việc hằng ngày

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

## 11. Quy tắc commit

Commit message nên ngắn và rõ:

```txt
docs: update execution roadmap
feat: add gpu data model
feat: add vram calculator page
fix: update sitemap generation
seo: add metadata for gpu pages
```

Không gom quá nhiều loại thay đổi vào một commit nếu không cần.

## 12. Những việc không được làm trong tháng 1

- Không làm SaaS dashboard.
- Không làm login/auth.
- Không làm payment/subscription.
- Không thêm Payload CMS production.
- Không thêm Postgres production.
- Không crawl/scrape ảnh từ Google Images.
- Không tạo 1.000 page bằng AI khi chưa có dữ liệu tốt.
- Không làm hệ thống affiliate phức tạp trước khi có traffic/index.
- Không đổi kiến trúc repo nếu không có lý do mạnh.

## 13. Production domain và Cloudflare Pages deployment

- Production domain: `vramforge.com`.
- Public brand: `VRAM Forge`.
- Brand và domain public vẫn phải lấy từ `data/site-settings.json` thông qua repository/service/helper; không hardcode trong UI hoặc SEO helper.
- Cloudflare Pages production branch: `publish`.
- Cloudflare Pages framework preset: `Next.js (Static HTML Export)`.
- Cloudflare Pages build command: `npm run build`.
- Cloudflare Pages output directory: `out`.
- Site tĩnh hiện tại không dùng Worker, Wrangler, OpenNext hoặc SSR runtime.

## Daily data update rules

Với task liên quan data research, source gap, enrichment hoặc calculator matching, bắt buộc đọc `daily_data_update/README.md` và các docs liên quan trước khi sửa data.

Luồng dữ liệu research chuẩn:
`daily_data_update` / external research → `data/update-candidates/*.json` → verified enrichment → `data/*.json` → repositories → services → pages/components.

Không ghi dữ liệu mới thẳng vào data public nếu chưa có source hợp lệ, field-level mapping trong `sources[]`, `lastVerifiedAt`, và `npm run data:validate` pass.

Field còn thiếu nguồn phải giữ `null`, ghi source gap/candidate, và UI phải hiển thị “Needs verification” hoặc omit field đó. Không được tự bịa GPU specs, AI model facts, benchmark, giá, availability, tokens/s, image speed hoặc buying recommendation.