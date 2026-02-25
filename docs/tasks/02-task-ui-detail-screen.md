# Task: Detail Screen (Màn hình chi tiết)

## Mô tả

Màn hình xem chi tiết một bản ghi theo ID (từ route params): gọi API get by id, hiển thị thông tin, có thể có nút Edit/Delete hoặc action đặc thù (vd Convert lead → customer).

## Khi nào dùng

- Cần màn xem chi tiết một entity (customer, lead, order, …).
- Route dạng `/resource/:id`.

## Ví dụ trong project

| Màn hình | File | API | Ghi chú |
|----------|------|-----|--------|
| Chi tiết khách hàng | `frontend/src/screens/CustomerDetailScreen.jsx` | `GET /customers/:id`, `GET /customers/:id/tags`, `GET /customers/:id/history` | Form detail + tags + lịch sử, nút Chỉnh sửa / Xóa |
| Chi tiết lead | `frontend/src/screens/LeadDetailScreen.jsx` | `GET /leads/:id` | Nút "Chuyển thành khách hàng" |

## Pattern chung

1. **Route**: `/resource/:id` (vd `/customers/1`).
2. **State**: `item` (object hoặc null), `loading` (boolean).
3. **useParams()**: lấy `id` từ URL.
4. **useEffect**: khi có `id` gọi API get by id, set item, tắt loading.
5. **Loading**: hiển thị "Đang tải..." khi `loading`.
6. **Not found**: khi không có `item` (sau khi load xong) hiển thị "Không tìm thấy" + link quay lại.
7. **Content**: layout detail (label + value), có thể có section con (tags, history).
8. **Actions**: link "← Quay lại", nút Edit (link form), Delete (confirm + gọi API), hoặc action đặc thù (Convert).

## Cấu trúc gợi ý

- Breadcrumb / link back (vd "← Khách hàng").
- Tiêu đề (tên hoặc ID).
- Card thông tin: các dòng label + value.
- (Tùy chọn) Các block phụ: tags, lịch sử tương tác.
- Nút hành động: Chỉnh sửa, Xóa, Convert, …

## Checklist

- [ ] API: get by id (vd `getCustomerById(id)`).
- [ ] Screen: useParams, state item/loading, useEffect với id.
- [ ] Xử lý loading và not found.
- [ ] Hiển thị đủ field cần thiết (detail grid / rows).
- [ ] Link back, nút Edit/Delete hoặc action đặc thù.
