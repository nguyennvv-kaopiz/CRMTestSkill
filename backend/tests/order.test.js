const request = require('supertest');

jest.mock('../src/db/postgres', () => ({
  query: jest.fn().mockResolvedValue({
    rows: [{ id: 1, customer_id: 1, total: 99.99, created_at: new Date() }],
  }),
}));

jest.mock('../src/services/cache.service', () => ({
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
}));

const app = require('../src/app');

describe('GET /orders', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
  });

  it('should return array of orders', async () => {
    const res = await request(app).get('/orders');
    expect(Array.isArray(res.body)).toBe(true);
  });
});
