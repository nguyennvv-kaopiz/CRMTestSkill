# Task: Form Screen (Màn hình form Create / Edit)

## Mô tả

Màn hình form tạo mới hoặc chỉnh sửa bản ghi: input fields, validate (required), submit gọi POST (create) hoặc PATCH/PUT (update), sau khi thành công redirect (vd sang detail).

## Khi nào dùng

- Thêm mới entity (Create).
- Sửa entity đã có (Edit), route thường là `/resource/new` và `/resource/:id/edit`.

## Ví dụ trong project

| Màn hình | File | API Create | API Update | Ghi chú |
|----------|------|-------------|------------|--------|
| Form khách hàng | `frontend/src/screens/CustomerFormScreen.jsx` | `POST /customers` | `PATCH /customers/:id` | Dùng chung 1 component cho create & edit (check `id` từ params) |
| Form lead | `frontend/src/screens/LeadFormScreen.jsx` | `POST /leads` | — | Chỉ tạo mới |

## Pattern chung

1. **Route**: `/resource/new` (create), `/resource/:id/edit` (edit).
2. **State**: từng field (name, email, …), `loading`/`saving` (boolean).
3. **Edit**: useEffect khi có `id` gọi API get by id, set giá trị vào state.
4. **Submit**: preventDefault, validate (required), gọi create hoặc update API, sau đó `navigate` sang detail hoặc list.
5. **Button**: "Tạo" / "Cập nhật" (hoặc "Lưu"), disable khi `saving`.
6. **Hủy**: link quay lại list hoặc detail.

## Form fields gợi ý

- Input text, email, number.
- Label + input, có thể dùng layout `.detail-row` (label trên, input dưới).
- Required: validate trước khi gọi API (vd `if (!name || !email) return`).

## Checklist

- [ ] API: create (POST), update (PATCH/PUT), (edit) get by id.
- [ ] Screen: state theo từng field, saving, useEffect load khi edit.
- [ ] Submit handler: validate, gọi API, navigate on success.
- [ ] Nút Hủy / link back.
- [ ] (Tùy chọn) Hiển thị lỗi từ server (409, 400, …).
