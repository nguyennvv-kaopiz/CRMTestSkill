const pool = require('../db/postgres');

async function getStages() {
  try {
    const { rows } = await pool.query('SELECT id, name, sort_order FROM pipeline_stages ORDER BY sort_order');
    return rows;
  } catch (err) {
    if (err.code === '42P01' || err.message?.includes('pipeline_stages')) return [];
    throw err;
  }
}

async function getPipeline() {
  const stages = await getStages();
  const pipeline = stages.map((s) => ({ ...s, opportunities: [] }));

  try {
    const { rows } = await pool.query(
      `SELECT o.id, o.name, o.customer_id, o.amount, o.stage_id, o.probability, o.expected_close_date, o.created_at, c.name AS customer_name
       FROM opportunities o JOIN customers c ON o.customer_id = c.id ORDER BY o.created_at`
    );
    for (const opp of rows) {
      const col = pipeline.find((p) => p.id === opp.stage_id);
      if (col) col.opportunities.push(opp);
    }
  } catch (err) {
    if (err.code !== '42P01' && !err.message?.includes('opportunities')) throw err;
  }
  return pipeline;
}

async function moveOpportunity(opportunityId, newStageId) {
  const { rowCount } = await pool.query(
    'UPDATE opportunities SET stage_id = $2 WHERE id = $1',
    [opportunityId, newStageId]
  );
  return rowCount > 0;
}

module.exports = { getStages, getPipeline, moveOpportunity };
