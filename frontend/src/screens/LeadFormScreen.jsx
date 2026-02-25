import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createLead } from '../api/leadApi';

export default function LeadFormScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [source, setSource] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    createLead({ name: name.trim(), email: email.trim() || undefined, phone: phone.trim() || undefined, company_name: company_name.trim() || undefined, source: source.trim() || undefined })
      .then((lead) => navigate(`/leads/${lead.id}`))
      .finally(() => setSaving(false));
  };

  return (
    <>
      <header className="page-header">
        <Link to="/leads" className="muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'inline-block' }}>← Lead</Link>
        <h1>Thêm lead</h1>
      </header>
      <div className="card" style={{ padding: '1.5rem', maxWidth: '420px' }}>
        <form onSubmit={handleSubmit}>
          <div className="detail-row" style={{ marginBottom: '1rem' }}>
            <label>Họ tên *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
          </div>
          <div className="detail-row" style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
          </div>
          <div className="detail-row" style={{ marginBottom: '1rem' }}>
            <label>Điện thoại</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
          </div>
          <div className="detail-row" style={{ marginBottom: '1rem' }}>
            <label>Công ty</label>
            <input type="text" value={company_name} onChange={(e) => setCompanyName(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
          </div>
          <div className="detail-row" style={{ marginBottom: '1rem' }}>
            <label>Nguồn</label>
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Website, Facebook..." style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Đang lưu...' : 'Tạo lead'}</button>
            <Link to="/leads" className="btn">Hủy</Link>
          </div>
        </form>
      </div>
    </>
  );
}
