# Các task common dự án (CRM)

Thư mục này chứa các file mô tả **task thường gặp** trong dự án.

## Danh sách task

| File | Nội dung |
|------|----------|
| [01-task-ui-list-screen.md](01-task-ui-list-screen.md) | **UI – List screen**: màn danh sách (customer, order, lead), pattern fetch + loading + empty + link detail |
| [02-task-ui-detail-screen.md](02-task-ui-detail-screen.md) | **UI – Detail screen**: màn chi tiết theo ID, get by id, hiển thị thông tin + actions (Edit, Delete, Convert) |
| [03-task-ui-form-screen.md](03-task-ui-form-screen.md) | **UI – Form screen**: form Create/Edit, validate, POST hoặc PATCH, redirect sau khi lưu |
| [04-task-ui-dashboard.md](04-task-ui-dashboard.md) | **UI – Dashboard**: màn tổng quan, API stats, grid card KPI |
| [05-task-ui-pipeline.md](05-task-ui-pipeline.md) | **UI – Pipeline**: view cột theo stage, opportunity cards, chuyển stage (PATCH) |
| [06-task-endpoints.md](06-task-endpoints.md) | **Endpoint**: danh sách REST API theo resource (customers, orders, leads, opportunities, dashboard, pipeline-stages) |
| [07-task-ut.md](07-task-ut.md) | **UT**: viết unit test frontend (Jest + RTL) và backend (Jest + supertest, mock DB/cache) |

## Map task ↔ code trong project

| Task | Frontend | Backend |
|------|----------|---------|
| List screen | CustomerListScreen, OrderListScreen, LeadListScreen | GET /customers, /orders, /leads |
| Detail screen | CustomerDetailScreen, LeadDetailScreen | GET /customers/:id, /leads/:id, /customers/:id/tags, /customers/:id/history |
| Form screen | CustomerFormScreen, LeadFormScreen | POST, PATCH /customers, POST /leads |
| Dashboard | DashboardScreen | GET /dashboard/stats |
| Pipeline | PipelineScreen | GET /opportunities/pipeline, /pipeline-stages, PATCH /opportunities/:id/stage |
| Endpoints | api/*.js (customerApi, leadApi, …) | routes/*.route.js, controllers/*.controller.js |
| UT | __tests__/*.test.jsx, *.test.jsx | tests/*.test.js |
