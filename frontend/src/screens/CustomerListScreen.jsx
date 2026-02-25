import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCustomers } from '../api/customerApi';

export default function CustomerListScreen() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <>
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Khách hàng</h1>
          <p className="subtitle">Danh sách {customers.length} khách hàng</p>
        </div>
        <Link to="/customers/new" className="btn btn-primary">Thêm khách hàng</Link>
      </header>
      <div className="card card-fill">
        <div className="card-list">
          {customers.length === 0 ? (
            <div className="empty">
              <span className="empty-title">Chưa có khách hàng nào</span>
              <span>Thêm khách hàng để bắt đầu</span>
            </div>
          ) : (
            customers.map((c) => (
              <Link key={c.id} to={`/customers/${c.id}`} className="card-item">
                <span className="badge badge-id">#{c.id}</span>
                <strong>{c.name}</strong>
                <span className="muted">{c.email}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
