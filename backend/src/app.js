const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customer.route');
const orderRoutes = require('./routes/order.route');
const leadRoutes = require('./routes/lead.route');
const opportunityRoutes = require('./routes/opportunity.route');
const dashboardRoutes = require('./routes/dashboard.route');
const pipelineStageRoutes = require('./routes/pipelineStage.route');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) =>
  res.json({
    ok: true,
    hint: 'Nếu GET /customers/1/tags hoặc PATCH /customers/1 vẫn 404, hãy tắt server (Ctrl+C) rồi chạy lại: cd backend && npm start',
  })
);

app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/leads', leadRoutes);
app.use('/opportunities', opportunityRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/pipeline-stages', pipelineStageRoutes);

console.log('CRM backend: routes /customers (GET,POST,GET :id, PATCH :id, DELETE :id, GET :id/tags, GET :id/history), /leads, /opportunities, /pipeline-stages, /dashboard loaded');

module.exports = app;
