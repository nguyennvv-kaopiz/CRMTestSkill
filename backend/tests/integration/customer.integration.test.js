const request = require('supertest');

jest.mock('../../src/db/postgres', () => ({
  query: jest.fn().mockImplementation((sql, params) => {
    if (params && params[0]) {
      return Promise.resolve({
        rows: [{ id: params[0], name: 'Test Customer', email: 'test@example.com' }],
      });
    }
    return Promise.resolve({
      rows: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
      ],
    });
  }),
}));

jest.mock('../../src/services/cache.service', () => ({
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
}));

const app = require('../../src/app');

describe('Customer API integration', () => {
  describe('GET /customers', () => {
    it('should return 200 and list of customers', async () => {
      const res = await request(app).get('/customers');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('email');
    });
  });

  describe('GET /customers/:id', () => {
    it('should return 200 and single customer when found', async () => {
      const res = await request(app).get('/customers/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(Number(res.body.id)).toBe(1);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
    });
  });
});
