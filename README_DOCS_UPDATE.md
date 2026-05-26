# README_DOCS_UPDATE.md

Bộ file này đã được chỉnh theo cấu trúc hiện tại của repo `aibuildlab`.

## File cần copy vào root project

```txt
AGENTS.md
TASK_STATUS.md
DAILY_LOG.md
docs/ROADMAP_THANG_1_2.md
docs/CHECKLIST_NGHIEM_THU.md
docs/PROMPT_MAU_CHO_CODEX.md
```

## Lưu ý quan trọng

Project hiện tại không dùng `src/`.

Codex/dev phải giữ cấu trúc:

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

## Sau khi copy

Chạy:

```bash
npm run lint
npm run build
```

Sau đó cập nhật:

```txt
DAILY_LOG.md
TASK_STATUS.md
```
