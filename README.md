# Test CRM Project (Sync Rules MCP Demo)

Project test đầy đủ input để kiểm thử **Sync Rules MCP**: khi IDE gọi MCP tool với thông tin từ project này, AI agent scan skill database sẽ trả về các skill khớp (react, list/detail screen, node, postgres, redis, aws, unit_test, integration test, docker, v.v.).

## Tech stack

- **Frontend:** React, React Router, Axios, Vite
- **Backend:** Node.js, Express
- **Database:** Postgres (SQL)
- **Caching:** Redis
- **Cloud:** AWS (aws-sdk dùng cho S3/SES khi cần)
- **Testing:** Jest, React Testing Library (frontend), Supertest (backend), unit test + integration test
- **Công cụ:** Docker, Figma (thiết kế UI), review code

## Domain

**CRM (Customer Relationship Management):** quản lý khách hàng, đơn hàng, lead và cơ hội bán hàng.

- **Customer:** danh sách, chi tiết, thêm/sửa/xóa; tag, lịch sử tương tác; liên kết Company, Contact.
- **Order:** danh sách đơn hàng theo khách hàng.
- **Lead:** khách tiềm năng, chuyển Lead → Customer.
- **Opportunity:** cơ hội bán hàng theo pipeline (Qualified, Proposal, Negotiation, Won, Lost).
- **Dashboard:** tổng quan doanh thu, tỷ lệ chuyển đổi, pipeline.

## Cấu trúc

```
test_crm_project/
├── frontend/          # React – list screen, detail screen
├── backend/           # Node + Express – Postgres, Redis, endpoint
├── docker-compose.yml # Postgres, Redis, backend, frontend
├── Dockerfile.backend
├── Dockerfile.frontend
└── README.md
```

## Task thường gặp

- UI: list screen (Customer, Order), detail screen (Customer)
- Endpoint: GET /customers, GET /customers/:id, GET /orders, GET /orders/:id
- Unit test (Jest), integration test (Supertest)
- Review code, Docker, cloud (AWS)

## Chạy local

### Chỉ infrastructure (Postgres + Redis)

```bash
docker-compose up -d postgres redis
```

### Backend

```bash
cd backend
npm install
# Set DATABASE_URL, REDIS_URL nếu cần
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Test

```bash
# Backend (mock Postgres/Redis)
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Chạy full stack với Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Postgres: localhost:5434
- Redis: localhost:6379
