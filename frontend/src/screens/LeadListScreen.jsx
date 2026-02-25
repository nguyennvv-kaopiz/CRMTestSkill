import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLeads } from '../api/leadApi';

const STATUS_LABEL = { new: 'Mới', contacted: 'Đã liên hệ', qualified: 'Tiềm năng', converted: 'Đã chuyển' };

export default function LeadListScreen() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeads()
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <>
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Lead</h1>
          <p className="subtitle">Khách tiềm năng — {leads.length} lead</p>
        </div>
        <Link to="/leads/new" className="btn btn-primary">Thêm lead</Link>
      </header>
      <div className="card card-fill">
        <div className="card-list">
          {leads.length === 0 ? (
            <div className="empty">
              <span className="empty-title">Chưa có lead nào</span>
              <span>Thêm lead để bắt đầu</span>
            </div>
          ) : (
            leads.map((l) => (
              <Link key={l.id} to={`/leads/${l.id}`} className="card-item">
                <span className="badge badge-id">#{l.id}</span>
                <strong>{l.name}</strong>
                <span className="muted">{l.email || l.company_name || '—'}</span>
                <span className="badge" style={{ marginLeft: 'auto', background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                  {STATUS_LABEL[l.status] || l.status}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
