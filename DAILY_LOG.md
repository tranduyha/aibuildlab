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
