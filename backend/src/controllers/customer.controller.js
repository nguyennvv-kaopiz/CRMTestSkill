const pool = require('../db/postgres');
const cache = require('../services/cache.service');

async function invalidateCustomerCache(id) {
  await cache.del('customers:list').catch(() => {});
  if (id) await cache.del(`customers:${id}`).catch(() => {});
}

async function getCustomers(req, res) {
  try {
    const cacheKey = 'customers:list';
    const cached = await cache.get(cacheKey).catch(() => null);
    if (cached) return res.json(cached);

    const { rows } = await pool.query('SELECT id, name, email FROM customers ORDER BY id');
    await cache.set(cacheKey, rows).catch(() => {});
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCustomerById(req, res) {
  try {
    const { id } = req.params;
    const cacheKey = `customers:${id}`;
    const cached = await cache.get(cacheKey).catch(() => null);
    if (cached) return res.json(cached);

    const { rows } = await pool.query('SELECT id, name, email FROM customers WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Customer not found' });
    const row = { ...rows[0], phone: rows[0].phone ?? null, company_id: rows[0].company_id ?? null, company_name: rows[0].company_name ?? null };
    await cache.set(cacheKey, row).catch(() => {});
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createCustomer(req, res) {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
    const { rows } = await pool.query(
      'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING id, name, email',
      [name, email]
    );
    await invalidateCustomerCache();
    res.status(201).json({ ...rows[0], phone: null, company_id: null });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email already exists' });
    res.status(500).json({ error: err.message });
  }
}

async function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const { name, email, phone, company_id } = req.body;
    const { rows } = await pool.query(
      'UPDATE customers SET name = COALESCE($2, name), email = COALESCE($3, email) WHERE id = $1 RETURNING id, name, email',
      [id, name ?? null, email ?? null]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Customer not found' });
    await invalidateCustomerCache(id);
    const row = rows[0];
    if (row.phone === undefined) row.phone = null;
    if (row.company_id === undefined) row.company_id = null;
    res.json(row);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email already exists' });
    res.status(500).json({ error: err.message });
  }
}

async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM customers WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Customer not found' });
    await invalidateCustomerCache(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCustomerTags(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT id, tag FROM customer_tags WHERE customer_id = $1 ORDER BY tag', [id]);
    res.json(rows);
  } catch (err) {
    if (err.code === '42P01' || err.message?.includes('customer_tags')) return res.json([]);
    res.status(500).json({ error: err.message });
  }
}

async function getInteractionHistory(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'SELECT id, type, note, created_at FROM interaction_history WHERE customer_id = $1 ORDER BY created_at DESC',
      [id]
    );
    res.json(rows);
  } catch (err) {
    if (err.code === '42P01' || err.message?.includes('interaction_history')) return res.json([]);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerTags,
  getInteractionHistory,
};
