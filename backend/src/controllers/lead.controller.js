const pool = require('../db/postgres');

async function getLeads(req, res) {
  try {
    const { status } = req.query;
    let query = 'SELECT id, name, email, phone, company_name, status, source, converted_customer_id, created_at FROM leads WHERE 1=1';
    const params = [];
    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }
    query += ' ORDER BY id';
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getLeadById(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'SELECT id, name, email, phone, company_name, status, source, converted_customer_id, created_at FROM leads WHERE id = $1',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Lead not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createLead(req, res) {
  try {
    const { name, email, phone, company_name, status, source } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const { rows } = await pool.query(
      'INSERT INTO leads (name, email, phone, company_name, status, source) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, phone, company_name, status, source, created_at',
      [name, email || null, phone || null, company_name || null, status || 'new', source || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateLead(req, res) {
  try {
    const { id } = req.params;
    const { name, email, phone, company_name, status, source } = req.body;
    const { rows } = await pool.query(
      `UPDATE leads SET name = COALESCE($2, name), email = COALESCE($3, email), phone = COALESCE($4, phone),
       company_name = COALESCE($5, company_name), status = COALESCE($6, status), source = COALESCE($7, source)
       WHERE id = $1 RETURNING id, name, email, phone, company_name, status, source, created_at`,
      [id, name, email, phone, company_name, status, source]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Lead not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function convertToCustomer(req, res) {
  try {
    const { id } = req.params;
    const leadResult = await pool.query('SELECT * FROM leads WHERE id = $1', [id]);
    if (leadResult.rows.length === 0) return res.status(404).json({ error: 'Lead not found' });
    const lead = leadResult.rows[0];
    if (lead.converted_customer_id) return res.status(400).json({ error: 'Lead already converted' });

    const client = await pool.connect();
    try {
      const custResult = await client.query(
        'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING id, name, email, phone',
        [lead.name, lead.email || `lead-${lead.id}@converted.local`, lead.phone]
      );
      const customer = custResult.rows[0];
      await client.query('UPDATE leads SET status = $2, converted_customer_id = $3 WHERE id = $1', [
        id,
        'converted',
        customer.id,
      ]);
      res.json({ customer, lead_id: parseInt(id, 10) });
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getLeads, getLeadById, createLead, updateLead, convertToCustomer };
