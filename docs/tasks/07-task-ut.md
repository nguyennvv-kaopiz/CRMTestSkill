# Task: Unit Test (UT)

## Mô tả

Viết unit test cho frontend (component, hook, API) và backend (controller, route): dùng Jest; frontend thêm React Testing Library (RTL); backend dùng supertest để test HTTP.

## Khi nào dùng

- Cần test component React (render, click, form submit).
- Cần test API endpoint (status code, response body).
- Cần test service/utility (logic thuần).

---

## Frontend (React + Vite)

### Cấu hình

- **Test runner:** Jest.
- **File:** `frontend/jest.config.js`, `frontend/jest.setup.js`, `frontend/babel.config.js`.
- **Thư viện:** `@testing-library/react`, `@testing-library/jest-dom`.

### Đặt file test

- Cùng thư mục component: `ComponentName.test.jsx`.
- Hoặc thư mục `__tests__`: `__tests__/App.test.jsx`.

### Pattern test component

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render title', () => {
    render(<BrowserRouter><MyComponent /></BrowserRouter>);
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });

  it('should handle click', () => {
    const onSave = jest.fn();
    render(<MyComponent onSave={onSave} />);
    fireEvent.click(screen.getByRole('button', { name: /lưu/i }));
    expect(onSave).toHaveBeenCalled();
  });
});
```

### Test có router

- Bọc component trong `<BrowserRouter>` khi render.
- Route dùng `useParams` / `useNavigate`: có thể mock hoặc dùng `MemoryRouter` với `initialEntries`.

### Mock API (axios)

- `vi.mock('../api/customerApi')` hoặc `jest.mock(...)`.
- Mock trả về Promise resolve với data mẫu.

### Chạy test

```bash
cd frontend
npm test
```

### Ví dụ trong project

- `frontend/__tests__/App.test.jsx`: test App render nav (Dashboard, Khách hàng, Lead, Pipeline, Đơn hàng).

---

## Backend (Node + Express)

### Cấu hình

- **Test runner:** Jest.
- **File:** `backend/jest.config.js`.
- **Thư viện:** `supertest` (request vào app Express).

### Mock DB / Redis

- Tránh gọi thật Postgres/Redis khi chạy test: mock `pool` (pg) và `cache` (Redis).
- Ví dụ: `jest.mock('../src/db/postgres', () => ({ query: jest.fn().mockResolvedValue({ rows: [...] }) }))`.

### Pattern test endpoint

```javascript
const request = require('supertest');
jest.mock('../src/db/postgres', () => ({ query: jest.fn().mockResolvedValue({ rows: [{ id: 1, name: 'Test' }] }) }));
jest.mock('../src/services/cache.service', () => ({ get: jest.fn().mockResolvedValue(null), set: jest.fn(), del: jest.fn() }));

const app = require('../src/app');

describe('GET /customers', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).toBe(200);
  });
  it('should return array', async () => {
    const res = await request(app).get('/customers');
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

### Test POST/PATCH

- `request(app).post('/customers').send({ name: 'A', email: 'a@b.com' })`.
- Kiểm tra `res.statusCode` (201, 200) và `res.body` (id, name, email).

### Chạy test

```bash
cd backend
npm test
```

### Ví dụ trong project

- `backend/tests/customer.test.js`: GET /customers → 200, body là array.
- `backend/tests/order.test.js`: GET /orders → 200.
- `backend/tests/integration/customer.integration.test.js`: GET /customers, GET /customers/:id với mock DB.

---

## Checklist chung

- [ ] Frontend: Jest + RTL cấu hình xong, có ít nhất 1 test component hoặc App.
- [ ] Backend: Jest + supertest, mock db/cache, có test cho các route chính (list, get by id).
- [ ] Test không phụ thuộc DB/Redis thật (mock).
- [ ] CI (nếu có): chạy `npm test` ở cả frontend và backend.
