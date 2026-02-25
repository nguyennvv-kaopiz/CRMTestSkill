# Task: Dashboard (Màn hình tổng quan)

## Mô tả

Màn hình tổng quan hiển thị các chỉ số (KPIs), thống kê: gọi API stats một lần, render các card/số liệu, có thể link sang từng module (customers, orders, leads, …).

## Khi nào dùng

- Cần màn trang chủ / tổng quan sau khi đăng nhập.
- Hiển thị doanh thu, số lượng đơn, số khách hàng, tỷ lệ chuyển đổi, v.v.

## Ví dụ trong project

| Màn hình | File | API | Ghi chú |
|----------|------|-----|--------|
| Dashboard CRM | `frontend/src/screens/DashboardScreen.jsx` | `GET /dashboard/stats` | Nhiều card: customers, orders, revenue, leads, conversion rate, opportunities |

## Pattern chung

1. **State**: `stats` (object hoặc null), `loading`.
2. **useEffect**: gọi API stats khi mount, set stats.
3. **Loading**: "Đang tải..." khi chưa có data.
4. **Cards**: map từng chỉ số → card (value lớn, label, subtitle); có thể bọc card trong Link sang route tương ứng.
5. **Layout**: grid (vd `dashboard-grid`) để card trải đều.

## API stats gợi ý

Backend trả về một object chứa nhiều field, ví dụ:

- `customers`, `orders`, `revenue`
- `leads`, `leads_converted`, `conversion_rate`
- `opportunities`, `pipeline_weighted_value`

Format số: tiền (VND), phần trăm (%), số nguyên.

## Checklist

- [ ] API: GET /dashboard/stats (hoặc tương đương).
- [ ] Screen: state stats, loading, gọi API trong useEffect.
- [ ] Grid layout cho nhiều card.
- [ ] Mỗi card: value, label, (tùy chọn) link sang list/detail.
- [ ] Xử lý lỗi / fallback khi API lỗi (vd stats null → hiển thị 0 hoặc thông báo).
