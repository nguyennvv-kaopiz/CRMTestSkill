import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLeadById, convertLeadToCustomer } from '../api/leadApi';

const STATUS_LABEL = { new: 'Mới', contacted: 'Đã liên hệ', qualified: 'Tiềm năng', converted: 'Đã chuyển' };

export default function LeadDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getLeadById(id)
      .then(setLead)
      .finally(() => setLoading(false));
  }, [id]);

  const handleConvert = () => {
    if (!window.confirm('Chuyển lead này thành khách hàng?')) return;
    setConverting(true);
    convertLeadToCustomer(id)
      .then(({ customer }) => {
        navigate(`/customers/${customer.id}`);
      })
      .finally(() => setConverting(false));
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (!lead) return <div className="empty">Không tìm thấy lead.</div>;

  return (
    <>
      <header className="page-header">
        <Link to="/leads" className="muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'inline-block' }}>← Lead</Link>
        <h1>{lead.name}</h1>
        <p className="subtitle">{STATUS_LABEL[lead.status] || lead.status}</p>
      </header>
      <div className="card" style={{ padding: '1.5rem', maxWidth: '420px', marginBottom: '1rem' }}>
        <div className="detail-grid">
          <div className="detail-row">
            <label>ID</label>
            <span className="value"><span className="badge badge-id">#{lead.id}</span></span>
          </div>
          <div className="detail-row">
            <label>Email</label>
            <span className="value">{lead.email || '—'}</span>
          </div>
          <div className="detail-row">
            <label>Điện thoại</label>
            <span className="value">{lead.phone || '—'}</span>
          </div>
          <div className="detail-row">
            <label>Công ty</label>
            <span className="value">{lead.company_name || '—'}</span>
          </div>
          <div className="detail-row">
            <label>Nguồn</label>
            <span className="value">{lead.source || '—'}</span>
          </div>
        </div>
        {!lead.converted_customer_id && (
          <div className="form-actions">
            <button type="button" className="btn btn-primary" onClick={handleConvert} disabled={converting}>
              {converting ? 'Đang chuyển...' : 'Chuyển thành khách hàng'}
            </button>
          </div>
        )}
        {lead.converted_customer_id && (
          <p className="muted" style={{ marginTop: '1rem' }}>
            Đã chuyển → <Link to={`/customers/${lead.converted_customer_id}`}>Khách hàng #{lead.converted_customer_id}</Link>
          </p>
        )}
      </div>
    </>
  );
}
