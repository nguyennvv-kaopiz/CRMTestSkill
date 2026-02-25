# Task: Endpoints (REST API)

## Mô tả

Định nghĩa và implement các endpoint backend cho từng resource: GET list, GET by id, POST create, PATCH/PUT update, DELETE; và các endpoint đặc thù (tags, history, convert, pipeline, stats).

## Base URL

- Development: `http://localhost:3001`
- Frontend dùng biến env: `VITE_API_URL`

---

## Customers

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/customers` | Danh sách khách hàng |
| POST | `/customers` | Tạo khách hàng (body: name, email, phone?, company_id?) |
| GET | `/customers/:id` | Chi tiết một khách hàng |
| PATCH | `/customers/:id` | Cập nhật (body: name?, email?, phone?, company_id?) |
| PUT | `/customers/:id` | Cập nhật (giống PATCH) |
| DELETE | `/customers/:id` | Xóa khách hàng |
| GET | `/customers/:id/tags` | Danh sách tag của khách hàng |
| GET | `/customers/:id/history` | Lịch sử tương tác (call, email, meeting) |

**File backend:** `backend/src/routes/customer.route.js`, `backend/src/controllers/customer.controller.js`

---

## Orders

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/orders` | Danh sách đơn hàng |
| GET | `/orders/:id` | Chi tiết một đơn hàng |

**File backend:** `backend/src/routes/order.route.js`, `backend/src/controllers/order.controller.js`

---

## Leads

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/leads` | Danh sách lead (query: status?) |
| POST | `/leads` | Tạo lead (body: name, email?, phone?, company_name?, status?, source?) |
| GET | `/leads/:id` | Chi tiết lead |
| PUT | `/leads/:id` | Cập nhật lead |
| POST | `/leads/:id/convert` | Chuyển lead thành khách hàng |

**File backend:** `backend/src/routes/lead.route.js`, `backend/src/controllers/lead.controller.js`

---

## Opportunities

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/opportunities` | Danh sách cơ hội (query: stage_id?) |
| GET | `/opportunities/pipeline` | Pipeline: stages + opportunities theo cột (đặt route này trước /:id) |
| POST | `/opportunities` | Tạo cơ hội (body: name, customer_id, amount?, stage_id?, probability?, expected_close_date?) |
| GET | `/opportunities/:id` | Chi tiết cơ hội |
| PUT | `/opportunities/:id` | Cập nhật cơ hội |
| PATCH | `/opportunities/:id/stage` | Chuyển stage (body: stage_id) |

**File backend:** `backend/src/routes/opportunity.route.js`, `backend/src/controllers/opportunity.controller.js`, `backend/src/services/pipeline.service.js`

---

## Pipeline stages

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/pipeline-stages` | Danh sách giai đoạn pipeline (id, name, sort_order) |

**File backend:** `backend/src/routes/pipelineStage.route.js`, `backend/src/controllers/pipelineStage.controller.js`

---

## Dashboard

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/dashboard/stats` | Thống kê: customers, orders, revenue, leads, conversion_rate, opportunities, pipeline_weighted_value |

**File backend:** `backend/src/routes/dashboard.route.js`, `backend/src/controllers/dashboard.controller.js`

---

## Health

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/health` | Kiểm tra server sống, trả về `{ ok: true }` |

---

## Ghi chú khi implement endpoint

- Route **cụ thể** (vd `/:id/tags`, `/pipeline`) đặt **trước** route **chung** (vd `/:id`) để tránh match nhầm.
- Dùng try/catch trong controller, trả 400/404/409/500 và message rõ ràng.
- CORS đã bật trong app; frontend gọi từ origin khác (vd localhost:3000) vẫn được.
