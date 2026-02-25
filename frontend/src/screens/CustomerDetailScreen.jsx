import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getCustomerById,
  getCustomerTags,
  getInteractionHistory,
  deleteCustomer,
} from '../api/customerApi';

function formatDate(d) {
  if (!d) return '—';
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(d));
}

export default function CustomerDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [tags, setTags] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getCustomerById(id)
      .then(setCustomer)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getCustomerTags(id).then(setTags).catch(() => setTags([]));
    getInteractionHistory(id).then(setHistory).catch(() => setHistory([]));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm('Xóa khách hàng này? Không thể hoàn tác.')) return;
    deleteCustomer(id).then(() => navigate('/customers'));
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (!customer) {
    return (
      <>
        <div className="empty">Không tìm thấy khách hàng.</div>
        <Link to="/customers">← Quay lại danh sách</Link>
      </>
    );
  }

  return (
    <>
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Link to="/customers" className="muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'inline-block' }}>← Khách hàng</Link>
          <h1>{customer.name}</h1>
          <p className="subtitle">Thông tin chi tiết</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to={`/customers/${id}/edit`} className="btn btn-primary">Chỉnh sửa</Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Xóa</button>
        </div>
      </header>
      <div className="card" style={{ padding: '1.5rem', maxWidth: '420px', marginBottom: '1rem' }}>
        <div className="detail-grid">
          <div className="detail-row">
            <label>ID</label>
            <span className="value"><span className="badge badge-id">#{customer.id}</span></span>
          </div>
          <div className="detail-row">
            <label>Họ tên</label>
            <span className="value">{customer.name}</span>
          </div>
          <div className="detail-row">
            <label>Email</label>
            <span className="value">{customer.email}</span>
          </div>
          <div className="detail-row">
            <label>Điện thoại</label>
            <span className="value">{customer.phone || '—'}</span>
          </div>
          <div className="detail-row">
            <label>Công ty</label>
            <span className="value">{customer.company_name || '—'}</span>
          </div>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="card" style={{ padding: '1rem', marginBottom: '1rem', maxWidth: '420px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Tag / Phân loại</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map((t) => (
              <span key={t.id} className="badge badge-id">{t.tag}</span>
            ))}
          </div>
        </div>
      )}
      {history.length > 0 && (
        <div className="card" style={{ padding: '1rem', maxWidth: '520px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Lịch sử tương tác</h3>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {history.map((h) => (
              <li key={h.id} style={{ marginBottom: '0.25rem' }}>
                <strong>{h.type}</strong> — {h.note} <span className="date">{formatDate(h.created_at)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
