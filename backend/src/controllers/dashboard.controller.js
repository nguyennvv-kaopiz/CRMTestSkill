const pool = require('../db/postgres');

async function safeQuery(query, params = [], def = { count: 0, revenue: 0, total: 0, converted: 0, weighted_value: 0 }) {
  try {
    const { rows } = await pool.query(query, params);
    return rows[0] || def;
  } catch (err) {
    if (err.code === '42P01') return def;
    throw err;
  }
}

async function getStats(req, res) {
  try {
    const customersRes = await safeQuery('SELECT COUNT(*) AS count FROM customers', [], { count: '0' });
    const ordersRes = await safeQuery('SELECT COUNT(*) AS count, COALESCE(SUM(total), 0) AS revenue FROM orders', [], { count: '0', revenue: 0 });
    const leadsRes = await safeQuery('SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE status = $1) AS converted FROM leads', ['converted'], { total: '0', converted: '0' });
    const oppRes = await safeQuery(
      'SELECT COUNT(*) AS count, COALESCE(SUM(amount * probability / 100.0), 0) AS weighted_value FROM opportunities o JOIN pipeline_stages s ON o.stage_id = s.id WHERE s.name != $1',
      ['Lost'],
      { count: '0', weighted_value: 0 }
    );

    const customers = parseInt(customersRes.count, 10) || 0;
    const orderCount = parseInt(ordersRes.count, 10) || 0;
    const revenue = parseFloat(ordersRes.revenue) || 0;
    const totalLeads = parseInt(leadsRes.total, 10) || 0;
    const convertedLeads = parseInt(leadsRes.converted, 10) || 0;
    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
    const opportunityCount = parseInt(oppRes.count, 10) || 0;
    const weightedPipeline = parseFloat(oppRes.weighted_value) || 0;

    res.json({
      customers,
      orders: orderCount,
      revenue,
      leads: totalLeads,
      leads_converted: convertedLeads,
      conversion_rate: conversionRate,
      opportunities: opportunityCount,
      pipeline_weighted_value: weightedPipeline,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getStats };
