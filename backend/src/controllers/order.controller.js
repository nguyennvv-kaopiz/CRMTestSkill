const pool = require('../db/postgres');
const cache = require('../services/cache.service');

async function getOrders(req, res) {
  try {
    const cacheKey = 'orders:list';
    const cached = await cache.get(cacheKey).catch(() => null);
    if (cached) return res.json(cached);

    const { rows } = await pool.query('SELECT id, customer_id, total, created_at FROM orders ORDER BY id');
    await cache.set(cacheKey, rows).catch(() => {});
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const cacheKey = `orders:${id}`;
    const cached = await cache.get(cacheKey).catch(() => null);
    if (cached) return res.json(cached);

    const { rows } = await pool.query('SELECT id, customer_id, total, created_at FROM orders WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    await cache.set(cacheKey, rows[0]).catch(() => {});
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getOrders, getOrderById };
