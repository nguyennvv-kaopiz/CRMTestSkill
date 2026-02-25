# Task: List Screen (Màn hình danh sách)

## Mô tả

Xây dựng màn hình hiển thị danh sách bản ghi (entity) dạng list/table: fetch API, hiển thị loading/empty, link sang detail hoặc action.

## Khi nào dùng

- Cần màn danh sách cho một resource (customer, order, lead, …).
- Hiển thị dạng card list hoặc bảng (table), có phân trang hoặc không.

## Ví dụ trong project

| Màn hình | File | API | Ghi chú |
|----------|------|-----|--------|
| Khách hàng | `frontend/src/screens/CustomerListScreen.jsx` | `GET /customers` | Card list, link `/customers/:id` |
| Đơn hàng | `frontend/src/screens/OrderListScreen.jsx` | `GET /orders` | Bảng (table), format tiền & ngày |
| Lead | `frontend/src/screens/LeadListScreen.jsx` | `GET /leads` | Card list + badge status, link `/leads/:id` |

## Pattern chung

1. **State**: `list` (mảng), `loading` (boolean).
2. **useEffect**: gọi API khi mount, set list, tắt loading.
3. **Loading**: render "Đang tải..." khi `loading`.
4. **Empty**: khi `list.length === 0` hiển thị empty state (khung + text).
5. **List**: map từng item → link (detail) hoặc row (table), hiển thị id, tên, vài field chính.
6. **Header**: tiêu đề trang + subtitle (số lượng) + nút thêm (nếu có).

## Cấu trúc thư mục gợi ý

```
frontend/src/
  screens/
    XxxListScreen.jsx
  api/
    xxxApi.js   # getXxxs()
```

## Checklist

- [ ] API client: hàm get list (vd `getCustomers()`).
- [ ] Screen: state list, loading, gọi API trong useEffect.
- [ ] UI: header (title + count), loading, empty, list (card hoặc table).
- [ ] Link từ item sang detail (vd `/customers/:id`).
- [ ] (Tùy chọn) Nút "Thêm" dẫn sang form create.
