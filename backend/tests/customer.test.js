const request = require('supertest');

jest.mock('../src/db/postgres', () => ({
  query: jest.fn().mockResolvedValue({
    rows: [{ id: 1, name: 'Alice', email: 'alice@example.com' }],
  }),
}));

jest.mock('../src/services/cache.service', () => ({
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
}));

const app = require('../src/app');

describe('GET /customers', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).toBe(200);
  });

  it('should return array of customers', async () => {
    const res = await request(app).get('/customers');
    expect(Array.isArray(res.body)).toBe(true);
  });
});
