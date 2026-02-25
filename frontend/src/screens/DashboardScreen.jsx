import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../api/dashboardApi';

function formatMoney(n) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(Number(n));
}

export default function DashboardScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;

  const cards = [
    { label: 'Khách hàng', value: stats?.customers ?? 0, to: '/customers', sub: 'customers' },
    { label: 'Đơn hàng', value: stats?.orders ?? 0, to: '/orders', sub: 'orders' },
    { label: 'Doanh thu', value: formatMoney(stats?.revenue ?? 0), sub: 'revenue' },
    { label: 'Lead', value: stats?.leads ?? 0, to: '/leads', sub: `${stats?.leads_converted ?? 0} đã chuyển` },
    { label: 'Tỷ lệ chuyển đổi', value: `${stats?.conversion_rate ?? 0}%`, sub: 'Lead → Customer' },
    { label: 'Cơ hội', value: stats?.opportunities ?? 0, to: '/pipeline', sub: formatMoney(stats?.pipeline_weighted_value ?? 0) },
  ];

  return (
    <>
      <header className="page-header">
        <h1>Dashboard</h1>
        <p className="subtitle">Tổng quan bán hàng & CRM</p>
      </header>
      <div className="dashboard-grid">
        {cards.map((c) => (
          <div key={c.sub} className="card stat-card">
            {c.to ? <Link to={c.to} className="stat-card-link" /> : null}
            <div className="stat-value">{c.value}</div>
            <div className="stat-label">{c.label}</div>
            {c.sub && <div className="muted stat-sub">{c.sub}</div>}
          </div>
        ))}
      </div>
    </>
  );
}
