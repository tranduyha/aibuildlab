# PROMPT_MAU_CHO_CODEX.md

Dùng prompt này sau khi copy bộ file vào repo `aibuildlab`.

```txt
Đọc các file sau trước khi làm:
- AGENTS.md
- TASK_STATUS.md
- DAILY_LOG.md
- docs/ROADMAP_THANG_1_2.md
- docs/CHECKLIST_NGHIEM_THU.md

Repo hiện tại là:
https://github.com/tranduyha/aibuildlab.git

Project đã có kiến trúc:
- app/(frontend)
- components
- data
- lib
- repositories
- services
- types
- public

Yêu cầu bắt buộc:
1. Không tạo thư mục src.
2. Không tạo lại project.
3. Không đổi App Router.
4. Không di chuyển app/(frontend) nếu không cần.
5. Hãy thực hiện task hiện tại trong TASK_STATUS.md.
6. Nếu cần thêm page, thêm vào app/(frontend).
7. Nếu cần thêm data, thêm vào data.
8. Nếu cần logic đọc data, thêm vào repositories.
9. Nếu cần business logic, thêm vào services.
10. Không thêm SaaS, login, payment, Payload CMS, database trong tháng 1.
11. Không tải ảnh từ Google Images.
12. Sau khi xong, chạy npm run build và npm run lint nếu có.
13. Cập nhật DAILY_LOG.md và TASK_STATUS.md.
14. Không đánh dấu task hoàn thành nếu chưa test hoặc chưa ghi rõ lý do không test được.

Hôm nay hãy bắt đầu với task hiện tại trong TASK_STATUS.md.
```
