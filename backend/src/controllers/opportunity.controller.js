const pool = require('../db/postgres');
const pipelineService = require('../services/pipeline.service');

async function getOpportunities(req, res) {
  try {
    const { stage_id } = req.query;
    let query = `SELECT o.id, o.name, o.customer_id, o.amount, o.stage_id, o.probability, o.expected_close_date, o.created_at, c.name AS customer_name, s.name AS stage_name
      FROM opportunities o JOIN customers c ON o.customer_id = c.id JOIN pipeline_stages s ON o.stage_id = s.id WHERE 1=1`;
    const params = [];
    if (stage_id) {
      params.push(stage_id);
      query += ` AND o.stage_id = $${params.length}`;
    }
    query += ' ORDER BY o.id';
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOpportunityById(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT o.id, o.name, o.customer_id, o.amount, o.stage_id, o.probability, o.expected_close_date, o.created_at, c.name AS customer_name, s.name AS stage_name
       FROM opportunities o JOIN customers c ON o.customer_id = c.id JOIN pipeline_stages s ON o.stage_id = s.id WHERE o.id = $1`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Opportunity not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createOpportunity(req, res) {
  try {
    const { name, customer_id, amount, stage_id, probability, expected_close_date } = req.body;
    if (!name || !customer_id) return res.status(400).json({ error: 'name and customer_id are required' });
    const { rows } = await pool.query(
      `INSERT INTO opportunities (name, customer_id, amount, stage_id, probability, expected_close_date)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, customer_id, amount, stage_id, probability, expected_close_date, created_at`,
      [
        name,
        customer_id,
        amount || 0,
        stage_id || 1,
        Math.min(100, Math.max(0, probability ?? 0)),
        expected_close_date || null,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateOpportunity(req, res) {
  try {
    const { id } = req.params;
    const { name, customer_id, amount, stage_id, probability, expected_close_date } = req.body;
    const { rows } = await pool.query(
      `UPDATE opportunities SET name = COALESCE($2, name), customer_id = COALESCE($3, customer_id), amount = COALESCE($4, amount),
       stage_id = COALESCE($5, stage_id), probability = COALESCE($6, probability), expected_close_date = COALESCE($7, expected_close_date)
       WHERE id = $1 RETURNING id, name, customer_id, amount, stage_id, probability, expected_close_date, created_at`,
      [id, name, customer_id, amount, stage_id, probability, expected_close_date]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Opportunity not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function moveStage(req, res) {
  try {
    const { id } = req.params;
    const { stage_id } = req.body;
    if (!stage_id) return res.status(400).json({ error: 'stage_id is required' });
    const ok = await pipelineService.moveOpportunity(id, stage_id);
    if (!ok) return res.status(404).json({ error: 'Opportunity not found' });
    const { rows } = await pool.query(
      'SELECT id, name, customer_id, amount, stage_id, probability, expected_close_date, created_at FROM opportunities WHERE id = $1',
      [id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPipeline(req, res) {
  try {
    const pipeline = await pipelineService.getPipeline();
    res.json(pipeline);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  moveStage,
  getPipeline,
};
