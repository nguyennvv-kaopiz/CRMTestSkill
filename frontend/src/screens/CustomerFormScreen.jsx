import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCustomerById, createCustomer, updateCustomer } from '../api/customerApi';

export default function CustomerFormScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company_id, setCompanyId] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    getCustomerById(id)
      .then((c) => {
        setName(c.name || '');
        setEmail(c.email || '');
        setPhone(c.phone || '');
        setCompanyId(c.company_id != null ? String(c.company_id) : '');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSaving(true);
    const payload = { name: name.trim(), email: email.trim(), phone: phone.trim() || undefined, company_id: company_id ? parseInt(company_id, 10) : undefined };
    (isEdit ? updateCustomer(id, payload) : createCustomer(payload))
      .then((c) => navigate(`/customers/${c.id}`))
      .finally(() => setSaving(false));
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <>
      <header className="page-header">
        <Link to={isEdit ? `/customers/${id}` : '/customers'} className="muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'inline-block' }}>← Khách hàng</Link>
        <h1>{isEdit ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng'}</h1>
      </header>
      <div className="card" style={{ padding: '1.5rem', maxWidth: '420px' }}>
        <form onSubmit={handleSubmit}>
          <div className="detail-row" style={{ marginBottom: '1rem' }}>
            <label>Họ tên *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
          </div>
          <div className="detail-row" style={{ marginBottom: '1rem' }}>
            <label>Email *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
          </div>
          <div className="detail-row" style={{ marginBottom: '1rem' }}>
            <label>Điện thoại</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
          </div>
          <div className="detail-row" style={{ marginBottom: '1rem' }}>
            <label>Company ID (tùy chọn)</label>
            <input type="number" value={company_id} onChange={(e) => setCompanyId(e.target.value)} placeholder="1, 2, 3..." style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', width: '100%' }} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Đang lưu...' : (isEdit ? 'Cập nhật' : 'Tạo')}</button>
            <Link to={isEdit ? `/customers/${id}` : '/customers'} className="btn">Hủy</Link>
          </div>
        </form>
      </div>
    </>
  );
}
