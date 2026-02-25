# Task: Pipeline / Kanban (Màn hình pipeline cơ hội)

## Mô tả

Màn hình pipeline (sales stages): các cột theo giai đoạn (Qualified, Proposal, Won, Lost, …), mỗi cột chứa danh sách cơ hội (opportunity); có thể kéo thả hoặc nút để chuyển cơ hội sang stage khác.

## Khi nào dùng

- Quản lý cơ hội bán hàng theo giai đoạn.
- Cần view dạng cột (kanban) hoặc danh sách theo stage.

## Ví dụ trong project

| Màn hình | File | API | Ghi chú |
|----------|------|-----|--------|
| Pipeline | `frontend/src/screens/PipelineScreen.jsx` | `GET /opportunities/pipeline`, `GET /pipeline-stages`, `PATCH /opportunities/:id/stage` | Cột = stage, mỗi card = opportunity; nút chuyển stage |

## Pattern chung

1. **API pipeline**: trả về mảng stages, mỗi stage có `opportunities` (mảng).
2. **API stages**: danh sách stage (id, name, sort_order) để render nút "Chuyển sang X".
3. **Layout**: `.pipeline-columns` — mỗi cột một stage, trong cột nhiều `.pipeline-card`.
4. **Mỗi card**: tên opportunity, customer, số tiền, probability; nút/link chuyển stage (gọi PATCH :id/stage với stage_id).
5. **Sau khi chuyển**: gọi lại API pipeline để refresh.

## Backend

- `GET /opportunities/pipeline`: trả về `[{ id, name, sort_order, opportunities: [...] }]`.
- `GET /pipeline-stages`: trả về `[{ id, name, sort_order }]`.
- `PATCH /opportunities/:id/stage`: body `{ stage_id }`.

## Checklist

- [ ] API: get pipeline, get stages, move opportunity stage.
- [ ] Screen: state pipeline + stages, load cả hai khi mount.
- [ ] Render cột theo stage, card theo opportunity.
- [ ] Nút chuyển stage: gọi PATCH, sau đó reload pipeline.
- [ ] Format tiền, phần trăm trên card.
