# AIBUILDLAB ENV FILES

File cấu hình mẫu:

```txt
.env.example
```

## Cách dùng

1. Commit `.env.example` với các giá trị API key để trống.
2. Copy `.env.example` thành `.env.local`.
3. Điền key thật vào `.env.local`.
4. Đảm bảo `.env.local` nằm trong `.gitignore`.
5. Không đặt API key thật vào file mẫu hoặc tài liệu.

## Khuyến nghị giai đoạn đầu

Bạn chỉ cần đăng ký và điền:

```txt
PEXELS_API_KEY
```

Các API khác có thể để trống.

Chạy tải ảnh:

```sh
npm run images:fetch
npm run images:fetch -- --category hero --count 1
```

## Nguồn ảnh ưu tiên

1. Pexels API: ảnh minh họa chung.
2. Unsplash API: ảnh minh họa dự phòng.
3. Wikimedia Commons API: ảnh có license mở.
4. eBay Browse API: ảnh sản phẩm/linh kiện nếu dùng product data.
5. Amazon PA API: chỉ dùng sau khi được duyệt affiliate.

## Không dùng

Không tải ảnh trực tiếp từ Google Images.
