# CHECKLIST_NGHIEM_THU.md

Checklist này dùng để đánh giá project `aibuildlab` sau mỗi ngày, mỗi tuần và cuối tháng 1.

## 1. Cách chấm điểm cuối tháng 1

Tổng điểm: 100.

| Nhóm | Điểm |
|---|---:|
| Kiến trúc code | 15 |
| Hạ tầng/build/deploy | 15 |
| SEO technical | 20 |
| Nội dung/page | 20 |
| Tool/data utility | 15 |
| Handoff/documentation | 15 |

Mức đánh giá:

```txt
85-100 điểm: MVP tốt, sẵn sàng scale tháng 2
70-84 điểm: đạt, nhưng cần fix backlog trước khi scale mạnh
50-69 điểm: public được nhưng chưa nên mở rộng nhiều page
Dưới 50 điểm: chưa đạt MVP, cần sửa nền trước
```

## 2. Checklist nghiệm thu kiến trúc code - 15 điểm

- [ ] Không có thư mục `src/` nếu project không dùng `src`.
- [ ] Page public nằm trong `app/(frontend)/`.
- [ ] Component dùng chung nằm trong `components/`.
- [ ] Dữ liệu tĩnh nằm trong `data/`.
- [ ] TypeScript types nằm trong `types/`.
- [ ] Logic đọc dữ liệu nằm trong `repositories/`.
- [ ] Logic nghiệp vụ nằm trong `services/`.
- [ ] Helper SEO nằm trong `lib/seo.ts`.
- [ ] Helper format nằm trong `lib/format.ts`.
- [ ] Không import JSON trực tiếp lung tung trong nhiều page nếu đã có repository/service.
- [ ] Dynamic route có `generateStaticParams` nếu cần SSG.
- [ ] Dynamic route có `generateMetadata`.
- [ ] Code không làm lệch kiến trúc Cloudflare-first.
- [ ] Không thêm database/auth/payment ngoài phạm vi tháng 1.
- [ ] `AGENTS.md` mô tả đúng kiến trúc thật.

Công cụ check:

```txt
VS Code Explorer
npm run build
npm run lint
manual code review
```

## 3. Checklist hạ tầng/build/deploy - 15 điểm

- [ ] `npm install` chạy được.
- [ ] `npm run dev` chạy được.
- [ ] `npm run build` pass.
- [ ] `npm run lint` pass hoặc lỗi được ghi rõ.
- [ ] Không có dependency thừa lớn không cần thiết.
- [ ] Không có API key bị commit.
- [ ] Có `.env.example` nếu cần API key.
- [ ] Có `.gitignore` đúng.
- [ ] Cloudflare Pages build được.
- [ ] Production URL mở được.
- [ ] Không lỗi hydration nghiêm trọng.
- [ ] Không lỗi console nghiêm trọng ở homepage.
- [ ] Không dùng Node runtime không tương thích Cloudflare nếu chưa có adapter.
- [ ] Không phụ thuộc database production.
- [ ] Có hướng dẫn deploy trong README hoặc docs.

Công cụ check:

```txt
npm run dev
npm run build
npm run lint
Cloudflare Pages dashboard
Chrome DevTools Console
```

## 4. Checklist SEO technical - 20 điểm

- [ ] Có `robots.ts`.
- [ ] Có sitemap.
- [ ] Sitemap chứa các URL chính.
- [ ] Không block nhầm page public.
- [ ] Homepage có title/description.
- [ ] Các page dynamic có title/description riêng.
- [ ] Có canonical nếu phù hợp.
- [ ] Có Open Graph cơ bản.
- [ ] Mỗi page chính có đúng một H1.
- [ ] URL slug sạch, dễ đọc.
- [ ] Có internal links giữa các silo.
- [ ] Có breadcrumb hoặc cấu trúc điều hướng rõ.
- [ ] Có FAQ section ở page phù hợp.
- [ ] Có schema nếu đã triển khai.
- [ ] Không có page mỏng dưới chuẩn.
- [ ] Không có duplicate title hàng loạt.
- [ ] Không có broken internal links nghiêm trọng.
- [ ] Mobile layout ổn.
- [ ] PageSpeed mobile không quá thấp.
- [ ] GSC verified và sitemap submitted sau khi public domain.

Công cụ check:

```txt
Google Search Console
PageSpeed Insights
Rich Results Test
Screaming Frog SEO Spider
Ahrefs Webmaster Tools nếu có
Browser DevTools
```

## 5. Checklist nội dung/page - 20 điểm

- [ ] Homepage thể hiện rõ định vị AI Hardware SEO Utility.
- [ ] Có `/tools/vram-calculator`.
- [ ] Có ít nhất 10 GPU profile pages.
- [ ] Có ít nhất 5 comparison pages.
- [ ] Có ít nhất 5 build landing pages.
- [ ] Có ít nhất 8-10 guide pages.
- [ ] Tổng ít nhất 25-30 URL indexable.
- [ ] Mỗi GPU page có specs cơ bản.
- [ ] Mỗi GPU page có AI use case.
- [ ] Mỗi comparison page có bảng so sánh.
- [ ] Mỗi comparison page có verdict.
- [ ] Mỗi build page có budget/use case rõ.
- [ ] Mỗi guide có internal links.
- [ ] Không có lorem ipsum.
- [ ] Không có nội dung AI chung chung vô nghĩa.
- [ ] Có CTA phù hợp, không spam.
- [ ] Có affiliate disclosure nếu có affiliate link.
- [ ] Nội dung tiếng Anh/định vị quốc tế nếu target global.
- [ ] Data có nguồn hoặc ghi chú nếu cần.
- [ ] Có kế hoạch mở rộng tháng 2.

Công cụ check:

```txt
Manual review
Sitemap
Browser
Screaming Frog
GSC sau khi index
```

## 6. Checklist tool/data utility - 15 điểm

- [ ] Có `data/gpus.json`.
- [ ] Có `data/ai-models.json`.
- [ ] Có `data/comparisons.json`.
- [ ] Có `data/builds.json`.
- [ ] Có `data/guides.json`.
- [ ] Có `data/images/image-manifest.json`.
- [ ] Data có slug duy nhất.
- [ ] Data không lỗi JSON.
- [ ] Có TypeScript type tương ứng.
- [ ] Có repository đọc data.
- [ ] Có service xử lý logic.
- [ ] VRAM Calculator chạy được.
- [ ] Calculator có input rõ ràng.
- [ ] Calculator có output hữu ích.
- [ ] Calculator link sang page liên quan.

Công cụ check:

```txt
npm run build
manual test
JSON validator
TypeScript compiler
browser test
```

## 7. Checklist handoff/documentation - 15 điểm

- [ ] Có `AGENTS.md`.
- [ ] Có `TASK_STATUS.md`.
- [ ] Có `DAILY_LOG.md`.
- [ ] Có `docs/ROADMAP_THANG_1_2.md`.
- [ ] Có `docs/CHECKLIST_NGHIEM_THU.md`.
- [ ] Có README mô tả cách chạy project.
- [ ] Có prompt mẫu cho Codex nếu cần.
- [ ] Mỗi ngày có log việc đã làm.
- [ ] Mỗi ngày có ghi lỗi/blocker.
- [ ] Mỗi ngày có ghi task tiếp theo.
- [ ] Codex/dev sau đọc `TASK_STATUS.md` là biết làm tiếp.
- [ ] Không để roadmap bị sửa lung tung mỗi ngày.
- [ ] Daily log không thay cho task status.
- [ ] Có backlog tháng 2.
- [ ] Có tiêu chí pass/fail rõ.

Công cụ check:

```txt
Manual review
Git diff
README
DAILY_LOG.md
TASK_STATUS.md
```

## 8. Điều kiện được bước sang tháng 2

Chỉ nên scale tháng 2 nếu đạt tối thiểu:

- [ ] Tổng điểm nghiệm thu >= 70/100.
- [ ] `npm run build` pass.
- [ ] Production site chạy ổn.
- [ ] Có ít nhất 25-30 URL indexable.
- [ ] Có VRAM Calculator hoạt động.
- [ ] Có sitemap/robots/meta cơ bản.
- [ ] Có data GPU/AI model ban đầu.
- [ ] Có handoff docs đầy đủ.
- [ ] Không có blocker nghiêm trọng về kiến trúc.

Nếu chưa đạt, đầu tháng 2 phải fix nền trước, chưa nên tạo thêm nhiều page.

## 9. Checklist cuối mỗi ngày

Cuối mỗi ngày, Codex/dev phải hoàn thành:

- [ ] Ghi việc đã làm vào `DAILY_LOG.md`.
- [ ] Cập nhật `TASK_STATUS.md`.
- [ ] Ghi rõ lệnh đã chạy: `npm run lint`, `npm run build`.
- [ ] Ghi rõ lỗi còn lại.
- [ ] Ghi task tiếp theo.
- [ ] Không đánh dấu done nếu chưa test.
