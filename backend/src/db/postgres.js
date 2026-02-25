const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://crm:crm@localhost:5434/crm',
});

module.exports = pool;
